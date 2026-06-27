"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lightbulb, Shuffle, Clipboard, ClipboardCheck } from "lucide-react";
import { facts } from "@/data/facts";
import { dailyPick } from "@/lib/daily-seed";

function getRandom(current: string): string {
  const pool = facts.filter((f) => f !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function FactsPage() {
  const [fact, setFact] = useState(() => dailyPick(facts, "fact"));
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDaily, setIsDaily] = useState(true);

  const next = useCallback(() => {
    setFact((prev) => getRandom(prev));
    setKey((k) => k + 1);
    setIsDaily(false);
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(fact).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fact]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full mx-auto text-center">
          <div className="inline-block bg-white border-2 border-blue-200 rounded-full px-4 py-1 mb-6 shadow-sm">
            <span className="text-xs font-bold text-blue-500 tracking-widest uppercase">100% Certified Useless</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">Useless Facts</h1>
          <p className="text-gray-500 mb-12 text-lg">
            Things that are true. Things you didn&apos;t need to know.{" "}
            <span className="text-gray-400 text-base">{facts.length} facts waiting.</span>
            {isDaily && <span className="block text-blue-600 font-semibold text-base mt-1">Today&apos;s fact is the same for everyone. The Council approves.</span>}
          </p>

          {/* Fact card */}
          <div className="relative bg-white rounded-3xl shadow-xl border-2 border-blue-100 p-8 sm:p-12 mb-8 overflow-hidden min-h-[160px] flex items-center justify-center">
            <Lightbulb size={80} className="absolute top-4 left-4 text-blue-50" />
            <AnimatePresence mode="wait">
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="relative text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed z-10"
              >
                {fact}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={next}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-blue-200 transition-colors duration-150"
            >
              <Shuffle size={18} /> Another Fact
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={copy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors duration-150"
            >
              {copied ? <><ClipboardCheck size={18} /> Copied!</> : <><Clipboard size={18} /> Copy</>}
            </motion.button>
          </div>

          <p className="mt-8 text-sm text-gray-400 italic">
            These facts are real. We&apos;re as surprised as you are.
          </p>
        </div>
      </div>

      {/* All facts list */}
      <section className="bg-white border-t-2 border-blue-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">All {facts.length} Facts</h2>
          <ol className="space-y-3 list-none">
            {facts.map((f, i) => (
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
