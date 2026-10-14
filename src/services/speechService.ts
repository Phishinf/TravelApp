// Text-to-speech reader built on the Web Speech API (speechSynthesis)
export type SpeechState = 'idle' | 'playing' | 'paused';

// Elements whose text is UI chrome rather than reading content
const SKIP_SELECTOR =
  'button, input, textarea, select, option, svg, kbd, script, style, noscript, [aria-hidden="true"], [data-tts-skip]';

const INLINE_DISPLAYS = new Set(['inline', 'inline-block', 'inline-flex', 'inline-grid', 'contents']);

// Chrome silently stops long utterances, so keep each chunk short
const MAX_CHUNK_LENGTH = 180;

const VOICE_KEY = 'tts-voice-uri';
const RATE_KEY = 'tts-rate';
const DIALECT_KEY = 'tts-dialect';

export type Dialect = 'cantonese' | 'mandarin';

// Cantonese voices are tagged zh-HK / yue; Mandarin ones zh-TW / zh-CN
const CANTONESE_LANGS = ['yue', 'zh-HK', 'zh-MO'];
const LANG_PRIORITY: Record<Dialect, string[]> = {
  cantonese: [...CANTONESE_LANGS, 'zh-TW', 'zh-CN', 'zh'],
  mandarin: ['zh-TW', 'zh-CN', 'zh-SG', 'zh-HK', 'zh'],
};
const FALLBACK_LANG: Record<Dialect, string> = { cantonese: 'zh-HK', mandarin: 'zh-TW' };

export interface VoiceOption {
  uri: string;
  label: string;
  lang: string;
  quality: 'premium' | 'enhanced' | 'standard';
  isCantonese: boolean;
}

const readPref = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writePref = (key: string, value: string | null) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // storage unavailable (private mode etc.) — preference just won't persist
  }
};

const normLang = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-');

const isCantoneseVoice = (v: SpeechSynthesisVoice) =>
  CANTONESE_LANGS.some((l) => normLang(v).startsWith(l)) || /cantonese|粵|粤/i.test(v.name);

// Websites can't use Siri voices, so the best available are Apple's downloadable
// Premium / Enhanced system voices (e.g. com.apple.voice.premium.zh-TW.Meijia).
const qualityOf = (v: SpeechSynthesisVoice): VoiceOption['quality'] => {
  const id = `${v.voiceURI} ${v.name}`.toLowerCase();
  if (id.includes('premium')) return 'premium';
  if (id.includes('enhanced') || id.includes('增強')) return 'enhanced';
  return 'standard';
};

const scoreVoice = (v: SpeechSynthesisVoice, dialect: Dialect): number => {
  const priority = LANG_PRIORITY[dialect];
  const langRank = isCantoneseVoice(v) && dialect === 'cantonese' ? 0 : priority.findIndex((l) => normLang(v).startsWith(l));
  if (langRank < 0) return -1;
  const quality = { premium: 30, enhanced: 20, standard: 0 }[qualityOf(v)];
  const uri = v.voiceURI.toLowerCase();
  const vendor = uri.startsWith('com.apple.voice') ? 10 : /google|microsoft.*online|natural/i.test(v.name) ? 8 : 0;
  // Apple's novelty/legacy engines sound robotic
  const penalty = uri.includes('eloquence') || uri.includes('speech.synthesis.voice') ? 15 : 0;
  return (priority.length - langRank) * 100 + quality + vendor + (v.localService ? 1 : 0) - penalty;
};

class SpeechService {
  private queue: string[] = [];
  private index = 0;
  private state: SpeechState = 'idle';
  private listeners = new Set<(state: SpeechState) => void>();
  private session = 0;
  private voices: SpeechSynthesisVoice[] = [];
  private voiceListeners = new Set<() => void>();
  private voiceURI: string | null = readPref(VOICE_KEY);
  private rate = Number(readPref(RATE_KEY)) || 1;
  private dialect: Dialect = readPref(DIALECT_KEY) === 'mandarin' ? 'mandarin' : 'cantonese';

  constructor() {
    if (!this.isSupported()) return;
    const load = () => {
      this.voices = window.speechSynthesis.getVoices();
      this.voiceListeners.forEach((cb) => cb());
    };
    load();
    // Safari and Chrome populate voices asynchronously
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
  }

  public subscribeVoices(cb: () => void): () => void {
    this.voiceListeners.add(cb);
    return () => {
      this.voiceListeners.delete(cb);
    };
  }

  private rankedVoices(): SpeechSynthesisVoice[] {
    return this.voices
      .filter((v) => scoreVoice(v, this.dialect) >= 0)
      .sort((a, b) => scoreVoice(b, this.dialect) - scoreVoice(a, this.dialect));
  }

  // Chinese voices, best first for the current dialect
  public getVoiceOptions(): VoiceOption[] {
    return this.rankedVoices().map((v) => {
      const quality = qualityOf(v);
      const cantonese = isCantoneseVoice(v);
      const tag = quality === 'premium' ? '・高品質' : quality === 'enhanced' ? '・增強' : '';
      const dialectTag = cantonese ? '粵語' : '國語';
      return {
        uri: v.voiceURI,
        label: `${dialectTag}｜${v.name.replace(/\s*\((premium|enhanced)\)/i, '')} (${normLang(v)})${tag}`,
        lang: normLang(v),
        quality,
        isCantonese: cantonese,
      };
    });
  }

  public getDialect(): Dialect {
    return this.dialect;
  }

  // Switching dialect resets an explicit voice, since the voice decides the language spoken
  public setDialect(dialect: Dialect) {
    this.dialect = dialect;
    writePref(DIALECT_KEY, dialect);
    this.setVoice(null);
    this.voiceListeners.forEach((cb) => cb());
  }

  public hasCantoneseVoice(): boolean {
    return this.voices.some(isCantoneseVoice);
  }

  // null = automatic (best available)
  public getSelectedVoiceURI(): string | null {
    return this.voiceURI;
  }

  public setVoice(uri: string | null) {
    this.voiceURI = uri;
    writePref(VOICE_KEY, uri);
  }

  public getRate(): number {
    return this.rate;
  }

  public setRate(rate: number) {
    this.rate = rate;
    writePref(RATE_KEY, String(rate));
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public subscribe(cb: (state: SpeechState) => void): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public getState(): SpeechState {
    return this.state;
  }

  private setState(state: SpeechState) {
    this.state = state;
    this.listeners.forEach((cb) => cb(state));
  }

  // Collect readable text from an element, one entry per visual block
  public extractText(root: HTMLElement): string {
    const blocks: string[] = [];
    let currentBlock: Element | null = null;
    let buffer = '';

    const blockOf = (el: Element): Element => {
      let node: Element | null = el;
      while (node && node !== root) {
        if (!INLINE_DISPLAYS.has(getComputedStyle(node).display)) return node;
        node = node.parentElement;
      }
      return root;
    };

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent || !node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
        if (parent.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
        if (parent.getClientRects().length === 0) return NodeFilter.FILTER_REJECT; // hidden
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const block = blockOf(node.parentElement!);
      if (block !== currentBlock && buffer.trim()) {
        blocks.push(buffer.trim());
        buffer = '';
      }
      currentBlock = block;
      buffer += node.textContent!.replace(/\s+/g, ' ');
    }
    if (buffer.trim()) blocks.push(buffer.trim());

    return blocks.join('\n');
  }

  private splitIntoChunks(text: string): string[] {
    const chunks: string[] = [];
    for (const line of text.split(/\n+/)) {
      // Split after Chinese / English sentence punctuation
      const sentences = line.match(/[^。！？!?；;.]+[。！？!?；;.]*/g) || [line];
      let chunk = '';
      for (const sentence of sentences) {
        if ((chunk + sentence).length > MAX_CHUNK_LENGTH && chunk) {
          chunks.push(chunk.trim());
          chunk = '';
        }
        chunk += sentence;
        while (chunk.length > MAX_CHUNK_LENGTH) {
          chunks.push(chunk.slice(0, MAX_CHUNK_LENGTH));
          chunk = chunk.slice(MAX_CHUNK_LENGTH);
        }
      }
      if (chunk.trim()) chunks.push(chunk.trim());
    }
    return chunks.filter((c) => /[\p{L}\p{N}]/u.test(c));
  }

  private pickVoice(): SpeechSynthesisVoice | undefined {
    if (!this.voices.length) this.voices = window.speechSynthesis.getVoices();
    const chosen = this.voiceURI && this.voices.find((v) => v.voiceURI === this.voiceURI);
    if (chosen) return chosen;
    return this.rankedVoices()[0];
  }

  public speak(text: string) {
    if (!this.isSupported()) return;
    this.stop();
    this.queue = this.splitIntoChunks(text);
    this.index = 0;
    if (this.queue.length === 0) return;
    this.session++;
    this.setState('playing');
    this.speakNext(this.session);
  }

  private speakNext(session: number) {
    if (session !== this.session) return;
    if (this.index >= this.queue.length) {
      this.setState('idle');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(this.queue[this.index]);
    const voice = this.pickVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || FALLBACK_LANG[this.dialect];
    utterance.rate = this.rate;

    utterance.onend = () => {
      if (session !== this.session) return;
      this.index++;
      this.speakNext(session);
    };
    utterance.onerror = (e) => {
      if (session !== this.session || e.error === 'interrupted' || e.error === 'canceled') return;
      console.warn('Speech error:', e.error);
      this.index++;
      this.speakNext(session);
    };

    window.speechSynthesis.speak(utterance);
  }

  public pause() {
    if (this.state !== 'playing') return;
    window.speechSynthesis.pause();
    this.setState('paused');
  }

  public resume() {
    if (this.state !== 'paused') return;
    window.speechSynthesis.resume();
    this.setState('playing');
  }

  public stop() {
    if (!this.isSupported()) return;
    this.session++;
    this.queue = [];
    this.index = 0;
    window.speechSynthesis.cancel();
    if (this.state !== 'idle') this.setState('idle');
  }
}

export const speechService = new SpeechService();
