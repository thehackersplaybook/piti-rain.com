/**
 * Havan Audio Generator
 * Generates procedural fire crackling sounds using the Web Audio API
 * This script creates audio data that simulates a sacred fire burning
 *
 * Run with: npx ts-node scripts/generate-havan-audio.ts
 * Or import the functions directly in the browser
 */

// Audio generation constants
const SAMPLE_RATE = 44100;
const DURATION_SECONDS = 10; // Loop length
const NUM_SAMPLES = SAMPLE_RATE * DURATION_SECONDS;

// Fire sound characteristics
const CRACKLE_FREQUENCY = 0.15; // Probability of crackle per sample window
const BASE_RUMBLE_FREQ = 80; // Hz - low rumble of fire
const CRACKLE_DECAY = 0.995; // How fast crackles fade

/**
 * Generate white noise
 */
function generateWhiteNoise(): Float32Array {
  const noise = new Float32Array(NUM_SAMPLES);
  for (let i = 0; i < NUM_SAMPLES; i++) {
    noise[i] = Math.random() * 2 - 1;
  }
  return noise;
}

/**
 * Generate brown noise (more bass-heavy, like fire rumble)
 */
function generateBrownNoise(): Float32Array {
  const noise = new Float32Array(NUM_SAMPLES);
  let lastValue = 0;
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const white = Math.random() * 2 - 1;
    lastValue = (lastValue + (0.02 * white)) / 1.02;
    noise[i] = lastValue * 3.5; // Amplify
  }
  return noise;
}

/**
 * Generate crackle sounds
 */
function generateCrackles(): Float32Array {
  const crackles = new Float32Array(NUM_SAMPLES);
  const windowSize = Math.floor(SAMPLE_RATE / 20); // 50ms windows

  for (let window = 0; window < NUM_SAMPLES; window += windowSize) {
    if (Math.random() < CRACKLE_FREQUENCY) {
      // Generate a crackle burst
      const intensity = 0.3 + Math.random() * 0.7;
      const length = Math.floor(windowSize * (0.1 + Math.random() * 0.5));
      let decay = intensity;

      for (let i = 0; i < length && window + i < NUM_SAMPLES; i++) {
        const impulse = (Math.random() * 2 - 1) * decay;
        crackles[window + i] = impulse;
        decay *= CRACKLE_DECAY;
      }
    }
  }

  return crackles;
}

/**
 * Generate low rumble (base fire sound)
 */
function generateRumble(): Float32Array {
  const rumble = new Float32Array(NUM_SAMPLES);

  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    // Multiple low frequencies for organic sound
    const f1 = Math.sin(2 * Math.PI * BASE_RUMBLE_FREQ * t);
    const f2 = Math.sin(2 * Math.PI * (BASE_RUMBLE_FREQ * 1.5) * t) * 0.5;
    const f3 = Math.sin(2 * Math.PI * (BASE_RUMBLE_FREQ * 0.5) * t) * 0.7;
    // Add subtle variation
    const modulation = 0.8 + 0.2 * Math.sin(2 * Math.PI * 0.3 * t);
    rumble[i] = (f1 + f2 + f3) * 0.15 * modulation;
  }

  return rumble;
}

/**
 * Mix all components together
 */
function mixAudio(components: Float32Array[]): Float32Array {
  const mixed = new Float32Array(NUM_SAMPLES);

  for (let i = 0; i < NUM_SAMPLES; i++) {
    let sum = 0;
    for (const component of components) {
      sum += component[i];
    }
    // Soft clipping
    mixed[i] = Math.tanh(sum);
  }

  return mixed;
}

/**
 * Apply fade in/out for seamless looping
 */
function applyLoopFades(audio: Float32Array): Float32Array {
  const fadeLength = Math.floor(SAMPLE_RATE * 0.5); // 500ms fade

  for (let i = 0; i < fadeLength; i++) {
    const fade = i / fadeLength;
    audio[i] *= fade;
    audio[NUM_SAMPLES - 1 - i] *= fade;
  }

  return audio;
}

/**
 * Generate complete fire audio
 */
export function generateFireAudio(): Float32Array {
  const brownNoise = generateBrownNoise();
  const crackles = generateCrackles();
  const rumble = generateRumble();

  // Weight the components
  for (let i = 0; i < NUM_SAMPLES; i++) {
    brownNoise[i] *= 0.3;
    crackles[i] *= 0.8;
    rumble[i] *= 0.4;
  }

  const mixed = mixAudio([brownNoise, crackles, rumble]);
  return applyLoopFades(mixed);
}

/**
 * Create an AudioBuffer from Float32Array (for browser use)
 */
export function createAudioBuffer(audioContext: AudioContext, samples: Float32Array): AudioBuffer {
  const buffer = audioContext.createBuffer(1, samples.length, SAMPLE_RATE);
  buffer.getChannelData(0).set(samples);
  return buffer;
}

/**
 * Web Audio API Fire Sound Player
 * Use this class in the browser to play the fire sounds
 */
export class FireSoundPlayer {
  private audioContext: AudioContext | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private isPlaying = false;

  async initialize(): Promise<void> {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 0.5;

    // Generate the fire audio
    const samples = generateFireAudio();
    this.audioBuffer = createAudioBuffer(this.audioContext, samples);
  }

  async play(): Promise<void> {
    if (!this.audioContext || !this.audioBuffer || !this.gainNode) {
      await this.initialize();
    }

    if (this.isPlaying) return;

    // Resume context if suspended
    if (this.audioContext!.state === 'suspended') {
      await this.audioContext!.resume();
    }

    this.sourceNode = this.audioContext!.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.loop = true;
    this.sourceNode.connect(this.gainNode!);
    this.sourceNode.start();
    this.isPlaying = true;
  }

  stop(): void {
    if (this.sourceNode && this.isPlaying) {
      this.sourceNode.stop();
      this.sourceNode.disconnect();
      this.sourceNode = null;
      this.isPlaying = false;
    }
  }

  setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

// Export constants for reference
export const AUDIO_CONFIG = {
  sampleRate: SAMPLE_RATE,
  durationSeconds: DURATION_SECONDS,
  crackleFrequency: CRACKLE_FREQUENCY,
  baseRumbleFreq: BASE_RUMBLE_FREQ,
};
