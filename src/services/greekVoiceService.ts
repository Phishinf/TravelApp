// Greek pronunciation (speechSynthesis, el-GR) and speech capture (SpeechRecognition, el-GR)
import { speechService } from './speechService';

const GREEK_LANG = 'el-GR';

// Minimal typing for the Web Speech recognition API (not in lib.dom for all targets)
interface RecognitionAlternative {
  transcript: string;
  confidence: number;
}
interface RecognitionResultEvent {
  results: ArrayLike<ArrayLike<RecognitionAlternative> & { isFinal: boolean }>;
}
interface Recognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type RecognitionCtor = new () => Recognition;

const getRecognitionCtor = (): RecognitionCtor | undefined => {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition || w.webkitSpeechRecognition;
};

// Lowercase, strip accents/punctuation and unify final sigma so spoken and written forms compare fairly
export const normalizeGreek = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ς/g, 'σ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const levenshtein = (a: string, b: string): number => {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
};

// 0–100 similarity between two Greek strings
export const greekSimilarity = (a: string, b: string): number => {
  const x = normalizeGreek(a);
  const y = normalizeGreek(b);
  if (!x || !y) return 0;
  const longest = Math.max(x.length, y.length);
  return Math.round((1 - levenshtein(x, y) / longest) * 100);
};

export interface ListenHandlers {
  onInterim?: (text: string) => void;
  onFinal: (alternatives: string[]) => void;
  onError: (message: string) => void;
  onEnd: () => void;
}

const ERROR_MESSAGES: Record<string, string> = {
  'not-allowed': '未獲麥克風權限，請在瀏覽器網址列允許使用麥克風。',
  'service-not-allowed': '瀏覽器不允許語音辨識，請改用 Chrome、Edge 或 Safari。',
  'no-speech': '沒有聽到聲音，請靠近麥克風再試一次。',
  'audio-capture': '找不到麥克風裝置。',
  network: '語音辨識需要網絡連線，請檢查網絡後再試。',
  'language-not-supported': '此瀏覽器不支援希臘語辨識。',
};

class GreekVoiceService {
  private recognition: Recognition | null = null;

  public canSpeak(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public canListen(): boolean {
    return !!getRecognitionCtor();
  }

  public hasGreekVoice(): boolean {
    return this.canSpeak() && window.speechSynthesis.getVoices().some((v) => v.lang.replace('_', '-').startsWith('el'));
  }

  private pickGreekVoice(): SpeechSynthesisVoice | undefined {
    const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.replace('_', '-').startsWith('el'));
    const rank = (v: SpeechSynthesisVoice) => {
      const id = `${v.voiceURI} ${v.name}`.toLowerCase();
      return (id.includes('premium') ? 30 : id.includes('enhanced') ? 20 : 0) + (/google|natural|online/.test(id) ? 8 : 0);
    };
    return voices.sort((a, b) => rank(b) - rank(a))[0];
  }

  public speak(text: string, rate = 0.9, onEnd?: () => void) {
    if (!this.canSpeak()) return;
    speechService.stop();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.pickGreekVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || GREEK_LANG;
    utterance.rate = rate;
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (this.canSpeak()) window.speechSynthesis.cancel();
  }

  public listen(handlers: ListenHandlers) {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      handlers.onError('此瀏覽器不支援語音辨識，請改用 Chrome、Edge 或 Safari。');
      handlers.onEnd();
      return;
    }
    this.stopListening();
    speechService.stop();
    this.stopSpeaking();

    const rec = new Ctor();
    rec.lang = GREEK_LANG;
    rec.interimResults = true;
    rec.maxAlternatives = 3;
    rec.continuous = false;

    rec.onresult = (e) => {
      const results = Array.from(e.results);
      const last = results[results.length - 1];
      if (!last) return;
      if (last.isFinal) {
        handlers.onFinal(Array.from(last).map((alt) => alt.transcript));
      } else {
        handlers.onInterim?.(results.map((r) => r[0]?.transcript ?? '').join(' '));
      }
    };
    rec.onerror = (e) => {
      if (e.error === 'aborted') return;
      handlers.onError(ERROR_MESSAGES[e.error] || `語音辨識錯誤：${e.error}`);
    };
    rec.onend = () => {
      if (this.recognition === rec) this.recognition = null;
      handlers.onEnd();
    };

    this.recognition = rec;
    try {
      rec.start();
    } catch {
      handlers.onError('無法啟動麥克風，請稍後再試。');
      handlers.onEnd();
    }
  }

  public stopListening() {
    this.recognition?.stop();
  }
}

export const greekVoiceService = new GreekVoiceService();
