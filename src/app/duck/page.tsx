"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Radio } from "lucide-react";

function duckUrl(seed: number) {
  return `https://random-d.uk/api/v2/random?t=${seed}`;
}

interface DuckData {
  url: string;
  message?: string;
}

const DUCK_MESSAGES = [
  "Quack.", "Quack quack.", "QUACK.", "...quack.", "quack?",
  "*judgmental quacking*", "*splashing intensifies*", "no comment.",
  "*stares into the distance*", "quack quack quack.",
  "*ruffles feathers aggressively*", "quaaaack.",
];

const COUNCIL_MESSAGES = [
  "CLASSIFIED: Council meeting in progress. Quack quietly.",
  "The Council has convened. Your presence has been noted.",
  "TOP SECRET: Bread orientation discussed. Verdict: upright.",
  "Council decree: more clicks required. Visit /championship.",
];

export default function DuckPage() {
  const [duck, setDuck] = useState<DuckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [key, setKey] = useState(0);
  const [councilMode, setCouncilMode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const quack = useCallback(() => {
    if (!soundOn) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 300 + Math.random() * 200;
      osc.type = "sawtooth";
      gain.gain.value = 0.1;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // audio not available
    }
  }, [soundOn]);

  const loadDuck = useCallback(async () => {
    setLoading(true);
    const isCouncil = Math.random() < 0.08;
    setCouncilMode(isCouncil);
    try {
      const res = await fetch("https://random-d.uk/api/v2/random");
      const data = await res.json();
      setDuck({
        url: data.url,
        message: isCouncil
          ? COUNCIL_MESSAGES[Math.floor(Math.random() * COUNCIL_MESSAGES.length)]
          : DUCK_MESSAGES[Math.floor(Math.random() * DUCK_MESSAGES.length)],
      });
      setCount((c) => c + 1);
      setKey((k) => k + 1);
      quack();
    } catch {
      setDuck({
        url: `https://random-d.uk/api/v1/random?t=${Date.now()}`,
        message: DUCK_MESSAGES[Math.floor(Math.random() * DUCK_MESSAGES.length)],
      });
    }
    setLoading(false);
  }, [quack]);

  // Load on mount and auto-refresh every 8s
  useEffect(() => {
    loadDuck();
    const id = setInterval(loadDuck, 8000);
    return () => clearInterval(id);
  }, [loadDuck]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex flex-col">
      <div className="px-6 pt-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
        <span className="text-xs text-gray-400">{count} duck{count !== 1 ? "s" : ""} observed</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-lg w-full mx-auto text-center">
          {/* Cam header */}
          <div className="inline-flex items-center gap-2 bg-white border-2 border-red-200 rounded-full px-4 py-1 mb-6 shadow-sm">
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <Radio size={12} className="text-red-500" />
            <span className="text-xs font-bold text-red-500 tracking-widest uppercase">LIVE · DUCK CAM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">Duck Cam</h1>
          <p className="text-gray-500 mb-8 text-lg">Not a camera. Just ducks.</p>

          {/* Camera frame */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 mb-2 aspect-video">
            {/* Corner markers */}
            {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-4 h-4 border-2 border-white/40`} />
            ))}

            {/* Timestamp overlay */}
            <div className="absolute top-3 left-3 z-10 text-white text-xs font-mono opacity-70" style={{ fontFamily: "monospace" }}>
              {new Date().toLocaleTimeString()} · DUCK-CAM-01
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-4xl"
                >
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🦆
                  </motion.span>
                </motion.div>
              ) : duck ? (
                <motion.div
                  key={key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={duck.url}
                    alt="A duck"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23374151' width='400' height='300'/%3E%3Ctext fill='white' font-size='80' x='50%25' y='55%25' text-anchor='middle'%3E🦆%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Duck quote */}
          <AnimatePresence mode="wait">
            {duck && !loading && (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-gray-500 italic text-sm mb-6 h-5"
              >
                Duck says: &ldquo;{duck.message}&rdquo;
              </motion.p>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={loadDuck}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-sky-200 transition-colors duration-150"
            >
              🦆 Next Duck
            </motion.button>
            <button
              onClick={() => setSoundOn((s) => !s)}
              className={`text-sm font-bold px-4 py-3 rounded-2xl border-2 transition-colors ${soundOn ? "bg-sky-100 border-sky-300 text-sky-700" : "bg-white border-gray-200 text-gray-400"}`}
            >
              {soundOn ? "🔊 Quack ON" : "🔇 Quack OFF"}
            </button>
          </div>
          {councilMode && (
            <p className="mt-4 text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse">
              ⚠ Council footage detected
            </p>
          )}
          <p className="mt-4 text-xs text-gray-400 italic">Auto-refreshes every 8 seconds. Ducks provided by random-d.uk.</p>
        </div>
      </div>
    </main>
  );
}
