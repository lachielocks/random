"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cookie, Shuffle, Clipboard, ClipboardCheck } from "lucide-react";
import { fortunes } from "@/data/fortunes";
import { dailyPick } from "@/lib/daily-seed";

function getRandom(current: string) {
  const pool = fortunes.filter((f) => f !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function FortunePage() {
  const [fortune, setFortune] = useState(() => dailyPick(fortunes, "fortune"));
  const [key, setKey] = useState(0);
  const [cracked, setCracked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDaily, setIsDaily] = useState(true);

  const crack = useCallback(() => {
    setCracked(true);
  }, []);

  const next = useCallback(() => {
    setFortune((prev) => getRandom(prev));
    setKey((k) => k + 1);
    setCracked(false);
    setIsDaily(false);
    setTimeout(() => setCracked(true), 50);
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(fortune).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fortune]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full mx-auto text-center">
          <div className="inline-block bg-white border-2 border-amber-200 rounded-full px-4 py-1 mb-6 shadow-sm">
            <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Wisdom Awaits</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">Fortune Cookie Machine</h1>
          <p className="text-gray-500 mb-12 text-lg">
            {fortunes.length} fortunes. {isDaily && <span className="text-amber-600 font-semibold">Today&apos;s fortune is the same for everyone.</span>}
          </p>

          {/* Cookie */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {!cracked ? (
                <motion.button
                  key="cookie"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={crack}
                  className="group flex flex-col items-center gap-3 mx-auto cursor-pointer"
                  aria-label="Crack the fortune cookie"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-200 to-yellow-400 flex items-center justify-center shadow-xl border-4 border-amber-300"
                  >
                    <Cookie size={56} className="text-amber-700" />
                  </motion.div>
                  <span className="text-sm font-semibold text-amber-700 group-hover:text-amber-900 transition-colors">Click to crack open</span>
                </motion.button>
              ) : (
                <motion.div
                  key="fortune"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative bg-white rounded-3xl shadow-xl border-2 border-amber-100 p-8 sm:p-10"
                >
                  <div className="absolute top-5 left-6 text-7xl text-amber-50 font-serif leading-none select-none" aria-hidden>&ldquo;</div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed z-10"
                    >
                      {fortune}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {cracked && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={next}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-amber-200 transition-colors duration-150"
              >
                <Shuffle size={18} /> Another Fortune
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={copy}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors duration-150"
              >
                {copied ? <><ClipboardCheck size={18} /> Copied!</> : <><Clipboard size={18} /> Copy</>}
              </motion.button>
            </motion.div>
          )}

          {!cracked && (
            <p className="text-sm text-gray-400 italic mt-4">Your fortune awaits. Crack it open.</p>
          )}
        </div>
      </div>
    </main>
  );
}
