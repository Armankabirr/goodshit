class SoundEngine {
  private ctx: AudioContext | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private enabled = false;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.startAmbient();
      this.playTick(520);
    } else {
      this.stopAmbient();
    }
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private startAmbient(): void {
    const ctx = this.ensureContext();
    if (!ctx || this.droneOsc) return;

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(65.41, ctx.currentTime); // Low C2 warm hum

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    this.droneOsc = osc;
    this.droneGain = gain;
  }

  private stopAmbient(): void {
    if (!this.ctx || !this.droneOsc || !this.droneGain) return;
    const now = this.ctx.currentTime;
    this.droneGain.gain.cancelScheduledValues(now);
    this.droneGain.gain.setValueAtTime(Math.max(this.droneGain.gain.value, 0.0001), now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    const oscToStop = this.droneOsc;
    setTimeout(() => {
      try {
        oscToStop.stop();
        oscToStop.disconnect();
      } catch {
        // ignore already stopped
      }
    }, 280);
    this.droneOsc = null;
    this.droneGain = null;
  }

  public playTick(freq = 360): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.65, now + 0.045);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.055);
  }
}

export const soundEngine = new SoundEngine();
