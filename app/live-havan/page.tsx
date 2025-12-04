"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { havanMantras, getMantraByIndex, getTotalMantras } from "@/lib/havan-mantras";

// Fire Sound Generator (inline for client-side use)
class FireSoundPlayer {
  private audioContext: AudioContext | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private isPlaying = false;

  private generateFireAudio(): Float32Array {
    const SAMPLE_RATE = 44100;
    const DURATION_SECONDS = 10;
    const NUM_SAMPLES = SAMPLE_RATE * DURATION_SECONDS;

    // Generate brown noise
    const brownNoise = new Float32Array(NUM_SAMPLES);
    let lastValue = 0;
    for (let i = 0; i < NUM_SAMPLES; i++) {
      const white = Math.random() * 2 - 1;
      lastValue = (lastValue + 0.02 * white) / 1.02;
      brownNoise[i] = lastValue * 3.5 * 0.3;
    }

    // Generate crackles
    const crackles = new Float32Array(NUM_SAMPLES);
    const windowSize = Math.floor(SAMPLE_RATE / 20);
    for (let window = 0; window < NUM_SAMPLES; window += windowSize) {
      if (Math.random() < 0.15) {
        const intensity = 0.3 + Math.random() * 0.7;
        const length = Math.floor(windowSize * (0.1 + Math.random() * 0.5));
        let decay = intensity;
        for (let i = 0; i < length && window + i < NUM_SAMPLES; i++) {
          crackles[window + i] = (Math.random() * 2 - 1) * decay * 0.8;
          decay *= 0.995;
        }
      }
    }

    // Generate rumble
    const rumble = new Float32Array(NUM_SAMPLES);
    for (let i = 0; i < NUM_SAMPLES; i++) {
      const t = i / SAMPLE_RATE;
      const f1 = Math.sin(2 * Math.PI * 80 * t);
      const f2 = Math.sin(2 * Math.PI * 120 * t) * 0.5;
      const f3 = Math.sin(2 * Math.PI * 40 * t) * 0.7;
      const modulation = 0.8 + 0.2 * Math.sin(2 * Math.PI * 0.3 * t);
      rumble[i] = (f1 + f2 + f3) * 0.15 * modulation * 0.4;
    }

    // Mix
    const mixed = new Float32Array(NUM_SAMPLES);
    for (let i = 0; i < NUM_SAMPLES; i++) {
      mixed[i] = Math.tanh(brownNoise[i] + crackles[i] + rumble[i]);
    }

    // Apply loop fades
    const fadeLength = Math.floor(SAMPLE_RATE * 0.5);
    for (let i = 0; i < fadeLength; i++) {
      const fade = i / fadeLength;
      mixed[i] *= fade;
      mixed[NUM_SAMPLES - 1 - i] *= fade;
    }

    return mixed;
  }

  async initialize(): Promise<void> {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 0.4;

    const samples = this.generateFireAudio();
    this.audioBuffer = this.audioContext.createBuffer(1, samples.length, 44100);
    this.audioBuffer.getChannelData(0).set(samples);
  }

  async play(): Promise<void> {
    if (!this.audioContext || !this.audioBuffer || !this.gainNode) {
      await this.initialize();
    }

    if (this.isPlaying) return;

    if (this.audioContext!.state === "suspended") {
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

// CSS Keyframes as a style component
const FireAnimationStyles = () => (
  <style jsx global>{`
    @keyframes flicker {
      0%,
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      25% {
        opacity: 0.85;
        transform: scale(1.02) translateY(-2px);
      }
      50% {
        opacity: 0.95;
        transform: scale(0.98) translateY(-1px);
      }
      75% {
        opacity: 0.9;
        transform: scale(1.01) translateY(-3px);
      }
    }

    @keyframes flame-dance {
      0%,
      100% {
        transform: scaleY(1) scaleX(1);
      }
      33% {
        transform: scaleY(1.1) scaleX(0.95);
      }
      66% {
        transform: scaleY(0.95) scaleX(1.05);
      }
    }

    @keyframes ember-rise {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-100px) scale(0.3);
      }
    }

    @keyframes glow-pulse {
      0%,
      100% {
        box-shadow: 0 0 60px 30px rgba(255, 100, 0, 0.4),
          0 0 100px 60px rgba(255, 50, 0, 0.2),
          0 0 140px 90px rgba(255, 0, 0, 0.1);
      }
      50% {
        box-shadow: 0 0 80px 40px rgba(255, 100, 0, 0.5),
          0 0 120px 80px rgba(255, 50, 0, 0.3),
          0 0 160px 100px rgba(255, 0, 0, 0.15);
      }
    }

    @keyframes mantra-glow {
      0%,
      100% {
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5),
          0 0 20px rgba(255, 215, 0, 0.3), 0 0 30px rgba(255, 100, 0, 0.2);
      }
      50% {
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
          0 0 40px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 100, 0, 0.3);
      }
    }

    @keyframes quote-shimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    @keyframes border-glow {
      0%,
      100% {
        border-color: rgba(255, 100, 0, 0.5);
        box-shadow: inset 0 0 20px rgba(255, 100, 0, 0.1);
      }
      50% {
        border-color: rgba(255, 150, 0, 0.8);
        box-shadow: inset 0 0 30px rgba(255, 100, 0, 0.2);
      }
    }

    .flame-container {
      animation: flicker 0.5s ease-in-out infinite;
    }

    .flame-inner {
      animation: flame-dance 0.7s ease-in-out infinite;
    }

    .fire-glow {
      animation: glow-pulse 2s ease-in-out infinite;
    }

    .mantra-text {
      animation: mantra-glow 3s ease-in-out infinite;
    }

    .quote-decoration {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 215, 0, 0.3) 50%,
        transparent 100%
      );
      background-size: 200% 100%;
      animation: quote-shimmer 3s linear infinite;
    }

    .havan-border {
      animation: border-glow 2s ease-in-out infinite;
    }
  `}</style>
);

// Ember particle component with fixed duration to prevent hydration mismatch
const Ember = ({ delay, left, duration }: { delay: number; left: number; duration: number }) => (
  <div
    className="absolute w-1 h-1 rounded-full bg-orange-400"
    style={{
      left: `${left}%`,
      bottom: "40%",
      animation: `ember-rise ${duration}s ease-out infinite`,
      animationDelay: `${delay}s`,
      opacity: 0.8,
    }}
  />
);

// Precomputed ember positions to prevent hydration mismatch
const EMBER_CONFIG = [
  { delay: 0.0, left: 35, duration: 2.5 },
  { delay: 0.4, left: 42, duration: 3.2 },
  { delay: 0.7, left: 55, duration: 2.8 },
  { delay: 1.1, left: 38, duration: 3.5 },
  { delay: 1.4, left: 62, duration: 2.3 },
  { delay: 1.8, left: 48, duration: 3.8 },
  { delay: 2.1, left: 33, duration: 2.6 },
  { delay: 2.5, left: 58, duration: 3.1 },
  { delay: 2.8, left: 45, duration: 2.9 },
  { delay: 3.2, left: 52, duration: 3.4 },
  { delay: 3.5, left: 40, duration: 2.7 },
  { delay: 3.9, left: 65, duration: 3.0 },
  { delay: 4.2, left: 36, duration: 3.6 },
  { delay: 4.6, left: 50, duration: 2.4 },
  { delay: 4.9, left: 60, duration: 3.3 },
];

// Fire SVG Component
const FireAnimation = ({ isActive }: { isActive: boolean }) => {

  if (!isActive) {
    return (
      <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
          <span className="text-gray-500 text-lg">Awaiting Ignition</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-64 h-80 mx-auto">
      {/* Embers rising */}
      {EMBER_CONFIG.map((ember, i) => (
        <Ember key={i} delay={ember.delay} left={ember.left} duration={ember.duration} />
      ))}

      {/* Fire glow base */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full fire-glow"
        style={{ backgroundColor: "rgba(255, 50, 0, 0.3)" }}
      />

      {/* Main fire SVG */}
      <div className="flame-container absolute bottom-0 left-1/2 -translate-x-1/2">
        <svg
          width="200"
          height="280"
          viewBox="0 0 200 280"
          className="flame-inner"
        >
          {/* Outer flame - red/orange */}
          <defs>
            <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="30%" stopColor="#ff6600" />
              <stop offset="60%" stopColor="#ff9900" />
              <stop offset="100%" stopColor="#ffcc00" />
            </linearGradient>
            <linearGradient id="innerFlame" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ff9900" />
              <stop offset="50%" stopColor="#ffcc00" />
              <stop offset="100%" stopColor="#ffffcc" />
            </linearGradient>
            <linearGradient id="coreFlame" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffff00" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer flame */}
          <path
            d="M100,20
               C120,60 160,100 150,160
               C145,200 130,230 100,260
               C70,230 55,200 50,160
               C40,100 80,60 100,20"
            fill="url(#flameGradient)"
            filter="url(#fireGlow)"
          />

          {/* Middle flame */}
          <path
            d="M100,50
               C115,80 140,110 135,155
               C130,185 120,210 100,235
               C80,210 70,185 65,155
               C60,110 85,80 100,50"
            fill="url(#innerFlame)"
          />

          {/* Inner core */}
          <path
            d="M100,90
               C110,110 125,130 120,160
               C117,180 110,195 100,210
               C90,195 83,180 80,160
               C75,130 90,110 100,90"
            fill="url(#coreFlame)"
          />

          {/* Flickering tips */}
          <path
            d="M80,40 C85,20 90,35 85,55"
            fill="url(#flameGradient)"
            opacity="0.7"
            style={{ animation: "flicker 0.3s ease-in-out infinite" }}
          />
          <path
            d="M120,40 C115,20 110,35 115,55"
            fill="url(#flameGradient)"
            opacity="0.7"
            style={{
              animation: "flicker 0.4s ease-in-out infinite",
              animationDelay: "0.15s",
            }}
          />
        </svg>
      </div>

      {/* Havan kund (fire pit) base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48">
        <svg width="192" height="60" viewBox="0 0 192 60">
          {/* Kund shape */}
          <path
            d="M10,10 L40,50 L152,50 L182,10 Z"
            fill="#8b4513"
            stroke="#a0522d"
            strokeWidth="2"
          />
          {/* Inner decoration */}
          <path
            d="M30,15 L50,45 L142,45 L162,15 Z"
            fill="none"
            stroke="#d2691e"
            strokeWidth="1"
          />
          {/* Sacred symbols */}
          <text
            x="96"
            y="35"
            textAnchor="middle"
            fill="#ffd700"
            fontSize="12"
            fontFamily="serif"
          >
            ॐ
          </text>
        </svg>
      </div>
    </div>
  );
};

// Mantra Display Component
const MantraDisplay = ({
  mantra,
  isActive,
  cycleCount,
}: {
  mantra: (typeof havanMantras)[0];
  isActive: boolean;
  cycleCount: number;
}) => {
  if (!isActive) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">
          Start the Havan to begin the sacred chanting
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-8 px-4">
      <div className="mb-2 text-sm text-orange-400">
        Mantra {(cycleCount % getTotalMantras()) + 1} of {getTotalMantras()}
        {cycleCount >= getTotalMantras() && (
          <span className="ml-2 text-amber-500">
            (Cycle {Math.floor(cycleCount / getTotalMantras()) + 1})
          </span>
        )}
      </div>

      <div
        className="mantra-text text-3xl md:text-4xl font-bold text-amber-400 mb-4"
        style={{ fontFamily: "serif" }}
      >
        {mantra.sanskrit}
      </div>

      <div className="text-xl md:text-2xl text-orange-300 mb-4 tracking-wider">
        {mantra.transliteration}
      </div>

      <div className="text-gray-400 text-sm md:text-base max-w-lg mx-auto italic">
        &ldquo;{mantra.meaning}&rdquo;
      </div>
    </div>
  );
};

// Main Page Component
export default function LiveHavanPage() {
  const [isHavanActive, setIsHavanActive] = useState(false);
  const [currentMantraIndex, setCurrentMantraIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);

  const fireSoundRef = useRef<FireSoundPlayer | null>(null);
  const mantraTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize fire sound player
  useEffect(() => {
    fireSoundRef.current = new FireSoundPlayer();
    return () => {
      if (fireSoundRef.current) {
        fireSoundRef.current.stop();
      }
      if (mantraTimerRef.current) {
        clearTimeout(mantraTimerRef.current);
      }
    };
  }, []);

  // Mantra progression
  const progressMantra = useCallback(() => {
    const currentMantra = getMantraByIndex(currentMantraIndex);
    mantraTimerRef.current = setTimeout(() => {
      setCurrentMantraIndex((prev) => (prev + 1) % getTotalMantras());
      setCycleCount((prev) => prev + 1);
    }, currentMantra.duration * 1000);
  }, [currentMantraIndex]);

  useEffect(() => {
    if (isHavanActive) {
      progressMantra();
    }
    return () => {
      if (mantraTimerRef.current) {
        clearTimeout(mantraTimerRef.current);
      }
    };
  }, [isHavanActive, currentMantraIndex, progressMantra]);

  // Handle volume changes
  useEffect(() => {
    if (fireSoundRef.current) {
      fireSoundRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const startHavan = async () => {
    setIsHavanActive(true);
    if (fireSoundRef.current && !isMuted) {
      await fireSoundRef.current.play();
    }
  };

  const stopHavan = () => {
    setIsHavanActive(false);
    if (fireSoundRef.current) {
      fireSoundRef.current.stop();
    }
    if (mantraTimerRef.current) {
      clearTimeout(mantraTimerRef.current);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (fireSoundRef.current) {
      if (!isMuted) {
        fireSoundRef.current.setVolume(0);
      } else if (isHavanActive) {
        fireSoundRef.current.setVolume(volume);
        fireSoundRef.current.play();
      }
    }
  };

  const currentMantra = getMantraByIndex(currentMantraIndex);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <FireAnimationStyles />
      <Header />

      <main className="flex-grow">
        {/* Hero Quote Section */}
        <section className="py-12 md:py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Decorated Quote */}
            <div className="relative mb-4">
              <div className="quote-decoration absolute inset-0 h-1 top-0 rounded-full" />
              <h1
                className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest py-6"
                style={{
                  background:
                    "linear-gradient(135deg, #ffd700 0%, #ff8c00 25%, #ff4500 50%, #ff8c00 75%, #ffd700 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(255, 100, 0, 0.3)",
                }}
              >
                &ldquo;DO A YAGNA, NOT A LAGNA&rdquo;
              </h1>
              <div className="quote-decoration absolute inset-0 h-1 bottom-0 top-auto rounded-full" />
            </div>

            {/* Attribution */}
            <p
              className="text-lg md:text-xl text-amber-400 tracking-wide"
              style={{
                fontFamily: "serif",
                fontStyle: "italic",
              }}
            >
              — Shiva Yogi
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-500" />
              <span className="text-2xl text-orange-400">🔥</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-500" />
            </div>
          </div>
        </section>

        {/* Main Havan Section */}
        <section className="py-8 md:py-16 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Fire Animation Container */}
            <div
              className={`rounded-2xl border-2 p-8 mb-8 transition-all duration-500 ${
                isHavanActive
                  ? "havan-border border-orange-500 bg-gradient-to-b from-gray-900/80 to-gray-950"
                  : "border-gray-700 bg-gray-900/30"
              }`}
            >
              <FireAnimation isActive={isHavanActive} />

              {/* Mantra Display */}
              <MantraDisplay
                mantra={currentMantra}
                isActive={isHavanActive}
                cycleCount={cycleCount}
              />
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-6">
              {/* Main Start/Stop Button */}
              <button
                onClick={isHavanActive ? stopHavan : startHavan}
                className={`px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  isHavanActive
                    ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg shadow-red-500/30"
                    : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/30"
                }`}
              >
                {isHavanActive ? "Stop Havan" : "Start Havan"}
              </button>

              {/* Audio Controls */}
              <div className="flex items-center gap-4 bg-gray-900/50 rounded-full px-6 py-3 border border-gray-700">
                <button
                  onClick={toggleMute}
                  className="text-2xl hover:scale-110 transition-transform"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-32 accent-orange-500"
                  disabled={isMuted}
                />

                <span className="text-sm text-gray-400 w-12">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Stats */}
              {isHavanActive && (
                <div className="flex gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-amber-400">
                      {cycleCount}
                    </div>
                    <div className="text-sm text-gray-500">Mantras Chanted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">
                      {Math.floor(cycleCount / getTotalMantras())}
                    </div>
                    <div className="text-sm text-gray-500">Complete Cycles</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 px-6 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
              About the Sacred Havan
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900/30 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-3">
                  What is Havan?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Havan (also known as Yagna or Homa) is a sacred fire ritual
                  from Vedic tradition. It involves making offerings into a
                  consecrated fire while chanting mantras. The fire represents
                  Agni, the divine messenger who carries offerings to the gods.
                </p>
              </div>

              <div className="bg-gray-900/30 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-3">
                  The Power of Mantras
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Each mantra contains sacred vibrations that purify the
                  atmosphere and the practitioner&apos;s consciousness. The
                  sound &ldquo;SVAHA&rdquo; at the end signifies the offering
                  being made to the fire, surrendering ego and attachments.
                </p>
              </div>

              <div className="bg-gray-900/30 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-3">
                  Infinite Practice
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  This digital Havan is designed for infinite practice. The
                  mantras cycle continuously, allowing you to immerse in the
                  sacred vibrations for as long as you wish. Each cycle deepens
                  your connection to the divine fire.
                </p>
              </div>

              <div className="bg-gray-900/30 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-3">
                  Yagna vs Lagna
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  As Shiva Yogi says, &ldquo;Do a Yagna, not a Lagna.&rdquo;
                  Yagna represents selfless action and spiritual practice, while
                  Lagna (marriage/attachment) represents worldly bondage. Choose
                  the path of transformation through sacred fire.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
