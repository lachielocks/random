"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Dice6, RotateCcw } from "lucide-react";

export default function DecisionsPage() {
  const [options, setOptions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addOption = useCallback(() => {
    const val = input.trim();
    if (!val || options.includes(val)) return;
    setOptions((prev) => [...prev, val]);
    setInput("");
    setWinner(null);
    inputRef.current?.focus();
  }, [input, options]);

  const remove = useCallback((i: number) => {
    setOptions((prev) => prev.filter((_, idx) => idx !== i));
    setWinner(null);
  }, []);

  const decide = useCallback(() => {
    if (options.length < 2 || spinning) return;
    setWinner(null);
    setSpinning(true);

    let count = 0;
    const total = 18;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * options.length);
      setFlashIndex(idx);
      count++;
      if (count >= total) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * options.length);
        setFlashIndex(finalIdx);
        setTimeout(() => {
          setWinner(options[finalIdx]);
          setFlashIndex(null);
          setSpinning(false);
        }, 400);
      }
    }, 80 + Math.min(count * 8, 120));
  }, [options, spinning]);

  const reset = useCallback(() => {
    setWinner(null);
    setFlashIndex(null);
    setSpinning(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-white border-2 border-purple-200 rounded-full px-4 py-1 mb-4 shadow-sm">
              <span className="text-xs font-bold text-purple-500 tracking-widest uppercase">Not Your Problem Anymore</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">Decision Maker</h1>
            <p className="text-gray-500 text-lg">Add your options. Let fate decide. Blame fate.</p>
          </div>

          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addOption()}
              placeholder="Add an option..."
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={addOption}
              disabled={!input.trim()}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white font-bold px-5 py-3 rounded-2xl transition-colors"
            >
              <Plus size={18} />
            </motion.button>
          </div>

          {/* Options list */}
          <AnimatePresence>
            {options.length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2 mb-6"
              >
                {options.map((opt, i) => (
                  <motion.li
                    key={opt}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all duration-150 ${
                      flashIndex === i
                        ? "bg-purple-500 border-purple-500 text-white scale-105"
                        : winner === opt
                        ? "bg-green-50 border-green-400 text-green-800"
                        : "bg-white border-gray-200 text-gray-700"
                    }`}
                  >
                    <span className="font-semibold">{opt}</span>
                    {!spinning && winner !== opt && (
                      <button onClick={() => remove(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    )}
                    {winner === opt && <span className="text-green-600 text-sm font-bold">✓ CHOSEN</span>}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-3xl border-2 border-green-200 p-6 mb-6 text-center shadow-lg"
              >
                <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">The Decision Has Been Made</p>
                <p className="text-3xl font-black text-gray-900">{winner}</p>
                <p className="text-sm text-gray-400 mt-2 italic">Congratulations. This is no longer your responsibility.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={decide}
              disabled={options.length < 2 || spinning}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-2xl text-lg shadow-lg shadow-purple-200 transition-colors duration-150"
            >
              <Dice6 size={20} className={spinning ? "animate-spin" : ""} />
              {spinning ? "Deciding..." : options.length < 2 ? "Add 2+ options" : "DECIDE"}
            </motion.button>
            {(winner || options.length > 0) && (
              <motion.button
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => { reset(); setOptions([]); }}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-500 font-semibold px-5 py-4 rounded-2xl border-2 border-gray-200 transition-colors"
              >
                <RotateCcw size={18} />
              </motion.button>
            )}
          </div>

          {options.length === 0 && (
            <p className="text-center text-sm text-gray-400 italic mt-6">
              Add at least two options. The machine needs something to work with.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
