"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

// Drop your GIFs into public/bread/ named bread1.gif … bread9.gif
const GIFS = Array.from({ length: 9 }, (_, i) => `/bread/bread${i + 1}.gif`);

export default function BreadPage() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + GIFS.length) % GIFS.length);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex flex-col">
      <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col flex-1 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="text-7xl mb-3 inline-block"
          >
            🍞
          </motion.div>
          <h1 className="text-5xl font-black text-amber-900 tracking-tight">Almighty Bread</h1>
          <p className="text-amber-700 mt-2">The holiest of baked goods. Falling over. As it was written.</p>
        </div>

        {/* GIF viewer */}
        <div className="relative flex-1 flex flex-col items-center justify-center">
          <div className="relative w-full overflow-hidden rounded-3xl border-4 border-amber-300 shadow-2xl bg-amber-100" style={{ minHeight: 360 }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.img
                key={index}
                src={GIFS[index]}
                alt={`Bread GIF ${index + 1}`}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full object-contain max-h-[480px]"
              />
            </AnimatePresence>
          </div>

          {/* Counter */}
          <p className="mt-4 text-amber-600 font-bold text-sm tracking-widest">
            {index + 1} / {GIFS.length}
          </p>

          {/* Nav buttons */}
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-full bg-amber-200 hover:bg-amber-300 active:scale-90 flex items-center justify-center transition-all shadow"
            >
              <ChevronLeft size={22} className="text-amber-800" />
            </button>
            <button
              onClick={() => go(1)}
              className="w-12 h-12 rounded-full bg-amber-200 hover:bg-amber-300 active:scale-90 flex items-center justify-center transition-all shadow"
            >
              <ChevronRight size={22} className="text-amber-800" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
