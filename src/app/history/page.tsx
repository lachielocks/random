"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shuffle, Clipboard, ClipboardCheck, Scroll } from "lucide-react";
import { fakeHistory } from "@/data/fake-history";

function getRandom(current: string) {
  const pool = fakeHistory.filter((f) => f !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function HistoryPage() {
  const [fact, setFact] = useState(() => fakeHistory[Math.floor(Math.random() * fakeHistory.length)]);
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const next = useCallback(() => {
    setFact((prev) => getRandom(prev));
    setKey((k) => k + 1);
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(fact).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fact]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full mx-auto text-center">
          <div className="inline-block bg-white border-2 border-stone-300 rounded-full px-4 py-1 mb-6 shadow-sm">
            <span className="text-xs font-bold text-stone-500 tracking-widest uppercase">Definitely Real History</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">Fake History Facts</h1>
          <p className="text-gray-500 mb-10 text-lg">
            Plausible. Detailed. Completely made up.{" "}
            <span className="text-gray-400 text-base">{fakeHistory.length} facts.</span>
          </p>

          <div className="relative bg-white rounded-3xl shadow-xl border-2 border-stone-200 p-8 sm:p-12 mb-8 min-h-[160px] flex items-center justify-center overflow-hidden">
            <Scroll size={100} className="absolute right-4 top-4 text-stone-50" />
            <AnimatePresence mode="wait">
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="relative text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed z-10"
              >
                {fact}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={next}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-600 hover:bg-stone-700 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-stone-200 transition-colors duration-150"
            >
              <Shuffle size={18} /> Next Fact
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={copy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors duration-150"
            >
              {copied ? <><ClipboardCheck size={18} /> Copied!</> : <><Clipboard size={18} /> Copy</>}
            </motion.button>
          </div>
          <p className="text-sm text-gray-400 italic">These facts are not real. Please do not cite them in essays.</p>
        </div>
      </div>

      {/* All facts */}
      <section className="bg-white border-t-2 border-stone-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
            All {fakeHistory.length} Fake Facts
          </h2>
          <ol className="space-y-3 list-none">
            {fakeHistory.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                <span className="shrink-0 w-8 text-right text-gray-300 font-mono pt-0.5">{i + 1}.</span>
                <span>{f}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
