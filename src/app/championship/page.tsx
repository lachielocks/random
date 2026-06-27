"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, Zap } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { useBadges } from "@/context/BadgeContext";

const MILESTONES = [100, 500, 1000, 5000, 10000, 50000, 100000];

const SEASONS = [
  { name: "Season 1: The Beginning", emoji: "🌱" },
  { name: "Season 2: Acceleration", emoji: "⚡" },
  { name: "Season 3: The Great Clickening", emoji: "🔥" },
  { name: "Season 4: Eternal Click", emoji: "♾️" },
];

function getSeason(count: number) {
  if (count < 1000) return SEASONS[0];
  if (count < 10000) return SEASONS[1];
  if (count < 50000) return SEASONS[2];
  return SEASONS[3];
}

export default function ChampionshipPage() {
  const { unlock } = useBadges();
  const [count, setCount] = useState<number | null>(null);
  const [floaters, setFloaters] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [burstMode, setBurstMode] = useState(false);
  const [cps, setCps] = useState(0);
  const clickTimes = useRef<number[]>([]);
  const localClicks = useRef(0);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) { setLoading(false); return; }
    sb
      .from("clicks")
      .select("count")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setCount(Number(data.count));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      clickTimes.current = clickTimes.current.filter((t) => now - t < 1000);
      setCps(clickTimes.current.length);
    }, 200);
    return () => clearInterval(id);
  }, []);

  const handleClick = useCallback(async () => {
    const now = Date.now();
    clickTimes.current.push(now);

    setCount((c) => {
      const next = (c ?? 0) + 1;
      const hit = MILESTONES.find((m) => m === next);
      if (hit) setMilestone(`🎉 Milestone: ${hit.toLocaleString()} clicks!`);
      return next;
    });
    setFloaters((f) => [...f, Date.now()]);

    localClicks.current++;
    if (localClicks.current >= 100) unlock("click-centurion");

    const sb = getSupabase();
    if (sb) {
      const { data } = await sb.rpc("increment_clicks");
      if (data !== null) setCount(Number(data));
    }
  }, [unlock]);

  const season = getSeason(count ?? 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex flex-col">
      <div className="max-w-2xl mx-auto px-6 py-12 w-full flex flex-col flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
            <Trophy size={64} className="text-yellow-500 mx-auto mb-2" />
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">Button Click Championship</h1>
            <p className="text-gray-500 mt-3 text-lg">{season.emoji} {season.name}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border-4 border-yellow-300 rounded-3xl px-12 py-8 shadow-xl w-full">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Clicks</p>
            {loading ? (
              <div className="h-16 w-48 bg-gray-100 rounded-xl animate-pulse mx-auto" />
            ) : (
              <AnimatePresence mode="wait">
                <motion.p key={count} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl font-black text-gray-900 tabular-nums">
                  {(count ?? 0).toLocaleString()}
                </motion.p>
              </AnimatePresence>
            )}
            {cps > 0 && <p className="text-sm text-amber-600 font-bold mt-2">{cps} clicks/sec</p>}
          </motion.div>

          <AnimatePresence>
            {milestone && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-lg font-bold text-amber-700 bg-amber-100 px-6 py-3 rounded-2xl" onAnimationComplete={() => setTimeout(() => setMilestone(null), 3000)}>
                {milestone}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <button
              onClick={() => setBurstMode((b) => !b)}
              className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border-2 transition-colors ${burstMode ? "bg-orange-500 text-white border-orange-500" : "bg-white border-gray-200 text-gray-600"}`}
            >
              <Zap size={14} /> Burst Mode {burstMode ? "ON" : "OFF"}
            </button>
          </div>

          <div className="relative">
            {floaters.map((id) => (
              <motion.span key={id} initial={{ opacity: 1, y: 0, x: Math.random() * 40 - 20 }} animate={{ opacity: 0, y: -60 }} transition={{ duration: 0.8 }} onAnimationComplete={() => setFloaters((f) => f.filter((x) => x !== id))} className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-500 font-black text-xl pointer-events-none">
                +1
              </motion.span>
            ))}
            <motion.button
              onClick={handleClick}
              whileTap={{ scale: burstMode ? 0.88 : 0.93 }}
              whileHover={{ scale: burstMode ? 1.08 : 1.04 }}
              className={`font-black text-2xl px-16 py-6 rounded-2xl shadow-lg transition-colors active:shadow-sm ${burstMode ? "bg-orange-500 hover:bg-orange-600 text-white animate-pulse" : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"}`}
            >
              {burstMode ? "BURST CLICK" : "CLICK"}
            </motion.button>
          </div>

          <p className="text-gray-400 text-sm">Every click is recorded. Forever. For no reason.</p>
          <p className="text-gray-300 text-xs italic">The Council of Ducks approves of your dedication.</p>
        </div>
      </div>
    </main>
  );
}
