// Web Audio API melody player for devotional hymns
class AudioSynthService {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTimeout: number | null = null;
  private onPlaybackStateChange: ((playing: boolean, noteIndex?: number) => void) | null = null;

  private noteFreqs: Record<string, number> = {
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99,
    'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99,
    'G5': 783.99, 'A5': 880.00, 'B5': 987.77, 'C6': 1046.50
  };

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setListener(cb: (playing: boolean, noteIndex?: number) => void) {
    this.onPlaybackStateChange = cb;
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      window.clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    if (this.onPlaybackStateChange) {
      this.onPlaybackStateChange(false);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public playNote(noteName: string, durationSeconds: number = 0.8) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const freq = this.noteFreqs[noteName] || 440;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm organ-like tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle harmonic overtone for sacred church organ feeling
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);
      gain2.gain.setValueAtTime(0.08, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + durationSeconds);
      osc2.stop(now + durationSeconds);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  public playMelody(notes: { note: string; dur: number }[], bpm: number = 70) {
    this.stop();
    this.isPlaying = true;
    this.initContext();

    if (this.onPlaybackStateChange) {
      this.onPlaybackStateChange(true, 0);
    }

    const beatDuration = 60 / bpm; // duration of 1 beat in seconds
    let currentIndex = 0;

    const playNext = () => {
      if (!this.isPlaying || currentIndex >= notes.length) {
        this.stop();
        return;
      }

      const item = notes[currentIndex];
      const durationSec = item.dur * beatDuration;

      this.playNote(item.note, durationSec * 0.95);
      if (this.onPlaybackStateChange) {
        this.onPlaybackStateChange(true, currentIndex);
      }

      currentIndex++;
      this.currentTimeout = window.setTimeout(playNext, durationSec * 1000);
    };

    playNext();
  }
}

export const audioSynthService = new AudioSynthService();
