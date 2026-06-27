"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Dice6, RotateCcw, History, Weight } from "lucide-react";

interface Option {
  text: string;
  weight: number;
}

const HISTORY_KEY = "random-stuff-decisions";

function loadHistory(): string[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]"); } catch { return []; }
}

function saveHistory(winner: string) {
  try {
    const h = [winner, ...loadHistory().filter((w) => w !== winner)].slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
    return h;
  } catch { return []; }
}

function weightedPick(options: Option[]): number {
  const total = options.reduce((s, o) => s + o.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < options.length; i++) {
    r -= options[i].weight;
    if (r <= 0) return i;
  }
  return options.length - 1;
}

export default function DecisionsPage() {
  const [options, setOptions] = useState<Option[]>([]);
  const [input, setInput] = useState("");
  const [weight, setWeight] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(loadHistory()); }, []);

  const addOption = useCallback(() => {
    const val = input.trim();
    if (!val || options.some((o) => o.text === val)) return;
    setOptions((prev) => [...prev, { text: val, weight: Math.max(1, Math.min(10, weight)) }]);
    setInput("");
    setWinner(null);
    inputRef.current?.focus();
  }, [input, options, weight]);

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
        const finalIdx = weightedPick(options);
        setFlashIndex(finalIdx);
        setTimeout(() => {
          const w = options[finalIdx].text;
          setWinner(w);
          setFlashIndex(null);
          setSpinning(false);
          setHistory(saveHistory(w));
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
            <p className="text-gray-500 text-lg">Add options with weights. Fate is biased. Blame fate.</p>
          </div>

          <div className="flex gap-2 mb-2">
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addOption()} placeholder="Add an option..." className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition-colors" />
            <div className="flex items-center gap-1 bg-white border-2 border-gray-200 rounded-2xl px-3">
              <Weight size={14} className="text-purple-400" />
              <input type="number" min={1} max={10} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-10 text-center font-bold text-purple-600 focus:outline-none" />
            </div>
            <motion.button whileTap={{ scale: 0.93 }} onClick={addOption} disabled={!input.trim()} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white font-bold px-5 py-3 rounded-2xl transition-colors">
              <Plus size={18} />
            </motion.button>
          </div>
          <p className="text-xs text-gray-400 mb-4">Weight 1–10: higher = more likely to win. Fate can be bribed.</p>

          <AnimatePresence>
            {options.length > 0 && (
              <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 mb-6">
                {options.map((opt, i) => (
                  <motion.li key={opt.text} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className={`flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all duration-150 ${flashIndex === i ? "bg-purple-500 border-purple-500 text-white scale-105" : winner === opt.text ? "bg-green-50 border-green-400 text-green-800" : "bg-white border-gray-200 text-gray-700"}`}>
                    <span className="font-semibold">{opt.text} <span className="text-xs opacity-60">×{opt.weight}</span></span>
                    {!spinning && winner !== opt.text && (
                      <button onClick={() => remove(i)} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                    )}
                    {winner === opt.text && <span className="text-green-600 text-sm font-bold">✓ CHOSEN</span>}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {winner && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="bg-white rounded-3xl border-2 border-green-200 p-6 mb-6 text-center shadow-lg">
                <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">The Decision Has Been Made</p>
                <p className="text-3xl font-black text-gray-900">{winner}</p>
                <p className="text-sm text-gray-400 mt-2 italic">Congratulations. This is no longer your responsibility.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <motion.button whileTap={{ scale: 0.96 }} onClick={decide} disabled={options.length < 2 || spinning} className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-2xl text-lg shadow-lg shadow-purple-200 transition-colors duration-150">
              <Dice6 size={20} className={spinning ? "animate-spin" : ""} />
              {spinning ? "Deciding..." : options.length < 2 ? "Add 2+ options" : "DECIDE"}
            </motion.button>
            {(winner || options.length > 0) && (
              <motion.button whileTap={{ scale: 0.96 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} onClick={() => { reset(); setOptions([]); }} className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-500 font-semibold px-5 py-4 rounded-2xl border-2 border-gray-200 transition-colors">
                <RotateCcw size={18} />
              </motion.button>
            )}
            {history.length > 0 && (
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => setShowHistory((s) => !s)} className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-500 font-semibold px-5 py-4 rounded-2xl border-2 border-gray-200 transition-colors">
                <History size={18} />
              </motion.button>
            )}
          </div>

          {showHistory && history.length > 0 && (
            <div className="mt-4 bg-white rounded-2xl border-2 border-gray-200 p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Past Decisions</p>
              <ul className="space-y-1">{history.map((h, i) => <li key={i} className="text-sm text-gray-600">{h}</li>)}</ul>
            </div>
          )}

          {options.length === 0 && (
            <p className="text-center text-sm text-gray-400 italic mt-6">Add at least two options. The machine needs something to work with.</p>
          )}
        </div>
      </div>
    </main>
  );
}
