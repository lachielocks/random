"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { excuses } from "@/data/excuses";
import { gamerExcuses } from "@/data/gamer-excuses";

type Tab = "school" | "gamer";

const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: "school", label: "School", emoji: "📝" },
  { id: "gamer", label: "Gamer", emoji: "🎮" },
];

const config = {
  school: {
    badge: "Official Excuse Generator™",
    badgeColor: "text-orange-500 border-orange-200",
    title: "School Excuse Generator",
    subtitle: "Professionally crafted excuses for not doing your homework.",
    buttonLabel: "🎲 Generate Excuse",
    buttonClass: "bg-orange-500 hover:bg-orange-600 shadow-orange-200",
    cardBorder: "border-orange-100",
    gradient: "from-yellow-50 via-orange-50 to-red-50",
    footerNote: "We take no responsibility for the consequences of using these excuses.",
    pool: excuses,
  },
  gamer: {
    badge: "Pro Gamer Excuses™",
    badgeColor: "text-green-600 border-green-200",
    title: "Gamer Excuse Generator",
    subtitle: "It wasn't your fault. It never is.",
    buttonLabel: "🎮 Generate Excuse",
    buttonClass: "bg-green-500 hover:bg-green-600 shadow-green-200",
    cardBorder: "border-green-100",
    gradient: "from-green-50 via-emerald-50 to-teal-50",
    footerNote: "Lag is always a valid excuse. Always.",
    pool: gamerExcuses,
  },
};

function getRandom(pool: string[], current: string): string {
  const filtered = pool.filter((e) => e !== current);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function ExcusesPage() {
  const [tab, setTab] = useState<Tab>("school");
  const [excuse, setExcuse] = useState<string>(() => {
    const p = excuses;
    return p[Math.floor(Math.random() * p.length)];
  });
  const [excuseKey, setExcuseKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const switchTab = useCallback((t: Tab) => {
    setTab(t);
    const pool = config[t].pool;
    setExcuse(pool[Math.floor(Math.random() * pool.length)]);
    setExcuseKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    const pool = config[tab].pool;
    setExcuse((prev) => getRandom(pool, prev));
    setExcuseKey((k) => k + 1);
  }, [tab]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(excuse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [excuse]);

  const cfg = config[tab];

  return (
    <main className={`min-h-screen bg-gradient-to-br ${cfg.gradient} flex flex-col transition-all duration-500`}>
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full mx-auto text-center">
          {/* Tabs */}
          <div className="inline-flex bg-white border-2 border-gray-200 rounded-2xl p-1 mb-8 gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                className={`relative px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  tab === t.id ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-gray-100 rounded-xl"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative">{t.emoji} {t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Badge */}
              <div className={`inline-block bg-white border-2 ${cfg.badgeColor} rounded-full px-4 py-1 mb-6 shadow-sm`}>
                <span className={`text-xs font-bold ${cfg.badgeColor.split(" ")[0]} tracking-widest uppercase`}>
                  {cfg.badge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">
                {cfg.title}
              </h1>
              <p className="text-gray-500 mb-10 text-lg">
                {cfg.subtitle}{" "}
                <span className="text-gray-400 text-base">{cfg.pool.length} to choose from.</span>
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Excuse card */}
          <div className={`relative bg-white rounded-3xl shadow-xl border-2 ${cfg.cardBorder} p-8 sm:p-12 mb-8 min-h-[140px] flex items-center justify-center`}>
            <div className="absolute top-6 left-8 text-7xl text-gray-50 font-serif leading-none select-none" aria-hidden>
              &ldquo;
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={excuseKey}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="relative text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed z-10"
              >
                {excuse}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={next}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 ${cfg.buttonClass} text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg transition-colors duration-150`}
            >
              {cfg.buttonLabel}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={copy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors duration-150"
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </motion.button>
          </div>

          <p className="mt-8 text-sm text-gray-400 italic">{cfg.footerNote}</p>
        </div>
      </div>

      {/* Full list */}
      <section className="bg-white border-t-2 border-gray-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
            All {cfg.pool.length} {cfg.title.replace(" Generator", "")} Excuses
          </h2>
          <ol className="space-y-3 list-none">
            {cfg.pool.map((e, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                <span className="shrink-0 w-8 text-right text-gray-300 font-mono pt-0.5">{i + 1}.</span>
                <span>{e}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
