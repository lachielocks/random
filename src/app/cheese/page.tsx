"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, RefreshCw } from "lucide-react";
import { cheeses, flavorNotes, textures, pairings, conclusions } from "@/data/cheeses";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReview(cheese: string) {
  const note1 = pick(flavorNotes);
  const note2 = pick(flavorNotes.filter((n) => n !== note1));
  const texture = pick(textures);
  const pairing = pick(pairings);
  const conclusion = pick(conclusions);
  return {
    cheese,
    review: `The ${cheese} presents itself with ${note1} and an unexpected undercurrent of ${note2}. It has ${texture}, and the finish lingers in a way that suggests the cheese has more to say but is choosing restraint. Best paired with ${pairing}. ${conclusion}`,
  };
}

function generateNew(currentCheese?: string) {
  const pool = currentCheese ? cheeses.filter((c) => c !== currentCheese) : cheeses;
  return generateReview(pick(pool));
}

export default function CheesePage() {
  const [{ cheese, review }, setData] = useState(() => generateNew());
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [key, setKey] = useState(0);

  const next = useCallback(() => {
    setData((prev) => generateNew(prev.cheese));
    setKey((k) => k + 1);
    setRating(0);
    setHovered(0);
  }, []);

  const handleRate = useCallback((r: number) => {
    setRating(r);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-lime-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full mx-auto text-center">
          <div className="inline-block bg-white border-2 border-yellow-300 rounded-full px-4 py-1 mb-6 shadow-sm">
            <span className="text-xs font-bold text-yellow-600 tracking-widest uppercase">Pompous Cheese Reviews</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">Cheese Rating Scale</h1>
          <p className="text-gray-500 mb-10 text-lg">{cheeses.length} cheeses. Infinite opinions.</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-yellow-100 p-8 sm:p-10 mb-8"
            >
              <div className="text-5xl mb-4">🧀</div>
              <h2 className="text-3xl font-black text-gray-900 mb-5">{cheese}</h2>
              <p className="text-gray-600 leading-relaxed text-base italic text-left">&ldquo;{review}&rdquo;</p>

              {/* Stars */}
              <div className="mt-6 pt-6 border-t-2 border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Rating</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleRate(s)}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(0)}
                      className="transition-transform hover:scale-125"
                      aria-label={`Rate ${s} stars`}
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          s <= (hovered || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-400 mt-2 italic"
                  >
                    {rating === 1 && "Bold of you to rate a cheese this low in public."}
                    {rating === 2 && "The cheese notes your reservations with quiet dignity."}
                    {rating === 3 && "A diplomatic assessment. The cheese respects this."}
                    {rating === 4 && "The cheese is pleased. Not effusive about it, but pleased."}
                    {rating === 5 && "A perfect score. The cheese will remember this."}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={next}
            className="flex items-center justify-center gap-2 mx-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-yellow-200 transition-colors duration-150"
          >
            <RefreshCw size={18} /> Next Cheese
          </motion.button>
        </div>
      </div>
    </main>
  );
}
