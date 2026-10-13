// Text-to-speech reader built on the Web Speech API (speechSynthesis)
export type SpeechState = 'idle' | 'playing' | 'paused';

// Elements whose text is UI chrome rather than reading content
const SKIP_SELECTOR =
  'button, input, textarea, select, option, svg, kbd, script, style, noscript, [aria-hidden="true"], [data-tts-skip]';

const INLINE_DISPLAYS = new Set(['inline', 'inline-block', 'inline-flex', 'inline-grid', 'contents']);

// Chrome silently stops long utterances, so keep each chunk short
const MAX_CHUNK_LENGTH = 180;

class SpeechService {
  private queue: string[] = [];
  private index = 0;
  private state: SpeechState = 'idle';
  private listeners = new Set<(state: SpeechState) => void>();
  private session = 0;

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
    const voices = window.speechSynthesis.getVoices();
    const preferred = ['zh-TW', 'zh-HK', 'zh-CN', 'zh'];
    for (const lang of preferred) {
      const voice = voices.find((v) => v.lang.replace('_', '-').startsWith(lang));
      if (voice) return voice;
    }
    return undefined;
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
    utterance.lang = voice?.lang || 'zh-TW';
    utterance.rate = 1;

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
