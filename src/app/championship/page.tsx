"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ChampionshipPage() {
  const [count, setCount] = useState<number | null>(null);
  const [floaters, setFloaters] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("clicks")
      .select("count")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setCount(Number(data.count));
        setLoading(false);
      });
  }, []);

  const handleClick = useCallback(async () => {
    setCount((c) => (c ?? 0) + 1);
    setFloaters((f) => [...f, Date.now()]);

    const { data } = await supabase.rpc("increment_clicks");
    if (data !== null) setCount(Number(data));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex flex-col">
      <div className="max-w-2xl mx-auto px-6 py-12 w-full flex flex-col flex-1">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Trophy size={64} className="text-yellow-500 mx-auto mb-2" />
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">Button Click Championship</h1>
            <p className="text-gray-500 mt-3 text-lg">Global counter. No purpose. Just:</p>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-4 border-yellow-300 rounded-3xl px-12 py-8 shadow-xl"
          >
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Clicks</p>
            {loading ? (
              <div className="h-16 w-48 bg-gray-100 rounded-xl animate-pulse mx-auto" />
            ) : (
              <AnimatePresence mode="wait">
                <motion.p
                  key={count}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl font-black text-gray-900 tabular-nums"
                >
                  {(count ?? 0).toLocaleString()}
                </motion.p>
              </AnimatePresence>
            )}
          </motion.div>

          {/* The Button */}
          <div className="relative">
            {floaters.map((id) => (
              <motion.span
                key={id}
                initial={{ opacity: 1, y: 0, x: Math.random() * 40 - 20 }}
                animate={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.8 }}
                onAnimationComplete={() =>
                  setFloaters((f) => f.filter((x) => x !== id))
                }
                className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-500 font-black text-xl pointer-events-none"
              >
                +1
              </motion.span>
            ))}
            <motion.button
              onClick={handleClick}
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.04 }}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-2xl px-16 py-6 rounded-2xl shadow-lg transition-colors active:shadow-sm"
            >
              CLICK
            </motion.button>
          </div>

          <p className="text-gray-400 text-sm">Every click is recorded. Forever. For no reason.</p>
        </div>
      </div>
    </main>
  );
}
