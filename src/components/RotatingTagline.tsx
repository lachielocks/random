"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const taglines = [
  "The internet's least necessary tools.",
  "Random stuff. Surprisingly useful. Sometimes.",
  "A collection of things nobody asked for.",
  "Built because I was bored.",
  "Questionable tools since 2026.",
];

export function RotatingTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % taglines.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="text-xl text-gray-500 text-center"
        >
          {taglines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
