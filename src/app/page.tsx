"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Medal } from "lucide-react";
import { RotatingTagline } from "@/components/RotatingTagline";
import { BadgeModal } from "@/components/BadgeModal";
import { HomeExtras } from "@/components/HomeExtras";
import { useBadges, ALL_BADGES } from "@/context/BadgeContext";
import { tools, ArrowRight } from "@/lib/tools";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.03, duration: 0.3, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const { unlockedIds, hydrated } = useBadges();
  const [showBadges, setShowBadges] = useState(false);
  const totalBadges = Object.keys(ALL_BADGES).length;
  const foundCount = hydrated ? unlockedIds.length : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-block bg-white border-2 border-purple-200 rounded-2xl px-6 py-2 mb-6 shadow-sm">
            <span className="text-sm font-semibold text-purple-600 tracking-widest uppercase">A collection of</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">Random Stuff</h1>
          <RotatingTagline />

          {hydrated && foundCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowBadges(true)}
              className="mt-6 inline-flex items-center gap-2 bg-purple-100 hover:bg-purple-200 active:scale-95 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full transition-all cursor-pointer"
            >
              <Medal size={14} /> {foundCount}/{totalBadges} secret badges found
            </motion.button>
          )}

          {showBadges && (
            <BadgeModal unlockedIds={unlockedIds} onClose={() => setShowBadges(false)} />
          )}
        </div>

        <HomeExtras />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div key={tool.href} custom={i} variants={cardVariants} initial="hidden" animate="show">
              <Link href={tool.href} className={`group relative flex flex-col p-6 rounded-2xl border-2 ${tool.border} ${tool.bg} transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <tool.Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-gray-700">{tool.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{tool.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Open <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <footer className="text-center mt-20 text-gray-400 text-sm space-y-1">
          <p>Made with questionable priorities.</p>
          <p className="text-gray-300">Psst — there are hidden pages out there. Try typing &ldquo;duck&rdquo;. Or ↑↑↓↓←→←→BA.</p>
          <p className="text-gray-300">
            <Link href="/sitemap" className="hover:text-gray-500 transition-colors">Sitemap</Link>
            {" · "}
            <Link href="/definitely-404" className="hover:text-gray-500 transition-colors">404</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
