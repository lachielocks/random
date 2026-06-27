"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Waves, RefreshCw } from "lucide-react";
import { vibes } from "@/data/vibes";
import { dailyPick, dailyIndex } from "@/lib/daily-seed";

function getRandom(current: string) {
  const pool = vibes.filter((v) => v.vibe !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

const gradients = [
  "from-pink-50 via-rose-50 to-orange-50",
  "from-violet-50 via-purple-50 to-fuchsia-50",
  "from-cyan-50 via-sky-50 to-blue-50",
  "from-emerald-50 via-teal-50 to-cyan-50",
  "from-amber-50 via-yellow-50 to-lime-50",
];

export default function VibePage() {
  const [data, setData] = useState(() => dailyPick(vibes, "vibe"));
  const [key, setKey] = useState(0);
  const [gradientIdx, setGradientIdx] = useState(() => dailyIndex(gradients.length, "vibe-grad"));
  const [checked, setChecked] = useState(false);
  const [isDaily, setIsDaily] = useState(true);

  const check = useCallback(() => {
    setChecked(true);
  }, []);

  const recheck = useCallback(() => {
    setData((prev) => getRandom(prev.vibe));
    setKey((k) => k + 1);
    setGradientIdx((i) => (i + 1) % gradients.length);
    setChecked(false);
    setIsDaily(false);
    setTimeout(() => setChecked(true), 50);
  }, []);

  return (
    <main className={`min-h-screen bg-gradient-to-br ${gradients[gradientIdx]} flex flex-col transition-all duration-700`}>
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full mx-auto text-center">
          <div className="inline-block bg-white border-2 border-pink-200 rounded-full px-4 py-1 mb-6 shadow-sm">
            <span className="text-xs font-bold text-pink-500 tracking-widest uppercase">Today&apos;s Forecast</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">Vibe Checker</h1>
          <p className="text-gray-500 mb-12 text-lg">
            {vibes.length} vibes. {isDaily && <span className="text-pink-600 font-semibold">Today&apos;s vibe is shared globally.</span>}
          </p>

          <AnimatePresence mode="wait">
            {!checked ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={check}
                  className="w-40 h-40 rounded-full bg-white border-4 border-pink-200 shadow-2xl flex flex-col items-center justify-center gap-2 mx-auto hover:shadow-pink-200 transition-shadow"
                >
                  <Waves size={40} className="text-pink-400" />
                  <span className="text-sm font-bold text-pink-500">Check Vibe</span>
                </motion.button>
                <p className="text-gray-400 text-sm mt-6 italic">Press the button. The vibes will reveal themselves.</p>
              </motion.div>
            ) : (
              <motion.div
                key={`result-${key}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="mb-8"
              >
                <div className="bg-white rounded-3xl shadow-xl border-2 border-pink-100 p-8 sm:p-10 text-left">
                  <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-3">Today&apos;s Vibe</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5 leading-snug">{data.vibe}</h2>
                  <p className="text-gray-600 leading-relaxed mb-5">{data.description}</p>
                  <div className="pt-5 border-t-2 border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Recommendation</p>
                    <p className="text-gray-700 font-medium">{data.recommendation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {checked && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.96 }}
              onClick={recheck}
              className="flex items-center justify-center gap-2 mx-auto bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-pink-200 transition-colors duration-150"
            >
              <RefreshCw size={18} /> Recheck Vibes
            </motion.button>
          )}
        </div>
      </div>
    </main>
  );
}
