"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shuffle, Clipboard, ClipboardCheck } from "lucide-react";
import { bingoPhrases } from "@/data/bingo";

function generateCard(): string[] {
  const shuffled = [...bingoPhrases].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 25);
}

export default function BingoPage() {
  const [card, setCard] = useState(() => generateCard());
  const [copied, setCopied] = useState(false);

  const regen = useCallback(() => setCard(generateCard()), []);

  const copy = useCallback(() => {
    const text = "MEETING BINGO\n" + card.map((p, i) => `${i + 1}. ${p}`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [card]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="max-w-lg w-full mx-auto text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Meeting Bingo</h1>
          <p className="text-gray-500 mb-8">Someone says &ldquo;synergy&rdquo; — drink water, you&apos;re at work.</p>

          <div className="grid grid-cols-5 gap-1.5 mb-8">
            {card.map((phrase, i) => (
              <motion.div
                key={`${i}-${phrase}`}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square flex items-center justify-center p-1 rounded-lg border-2 text-[9px] sm:text-[10px] font-semibold leading-tight ${
                  i === 12
                    ? "bg-emerald-500 text-white border-emerald-600"
                    : "bg-white border-emerald-200 text-gray-700"
                }`}
              >
                {i === 12 ? "FREE" : phrase}
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <motion.button whileTap={{ scale: 0.96 }} onClick={regen} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl">
              <Shuffle size={18} /> New Card
            </motion.button>
            <motion.button whileTap={{ scale: 0.96 }} onClick={copy} className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-2xl">
              {copied ? <><ClipboardCheck size={18} /> Copied!</> : <><Clipboard size={18} /> Copy</>}
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
}
