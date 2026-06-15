"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RotatingTagline } from "@/components/RotatingTagline";
import { useBadges, ALL_BADGES } from "@/context/BadgeContext";

const tools = [
  {
    href: "/excuses",
    emoji: "📝",
    title: "School Excuse Generator",
    description: "Generate increasingly ridiculous excuses for not doing your homework. Completely useless. Completely necessary.",
    color: "from-yellow-400 to-orange-500",
    bg: "bg-yellow-50 hover:bg-yellow-100",
    border: "border-yellow-200",
  },
  {
    href: "/facts",
    emoji: "🧠",
    title: "Useless Facts",
    description: "Facts that will fill your brain with things you'll never need but also never forget.",
    color: "from-blue-400 to-cyan-500",
    bg: "bg-blue-50 hover:bg-blue-100",
    border: "border-blue-200",
  },
];

const comingSoon = [
  { emoji: "🎲", title: "Random Decision Maker", description: "Let fate decide so you don't have to." },
  { emoji: "🔮", title: "Fortune Cookie Machine", description: "Wisdom you didn't ask for but definitely needed." },
  { emoji: "🧀", title: "Cheese Rating Scale", description: "Rank cheeses on an entirely subjective scale." },
  { emoji: "😤", title: "Complaint Generator", description: "Articulate your feelings about absolutely anything." },
  { emoji: "📜", title: "Fake History Facts", description: "Plausible but entirely made up historical trivia." },
  { emoji: "🌈", title: "Vibe Checker", description: "What's your vibe today? This tool knows." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const { unlocked } = useBadges();
  const totalBadges = Object.keys(ALL_BADGES).length;
  const foundCount = unlocked.size;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white border-2 border-purple-200 rounded-2xl px-6 py-2 mb-6 shadow-sm">
            <span className="text-sm font-semibold text-purple-600 tracking-widest uppercase">A collection of</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Random Stuff
          </h1>
          <RotatingTagline />

          {/* Badge counter */}
          {foundCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full"
            >
              🏅 {foundCount}/{totalBadges} secret badges found
            </motion.div>
          )}
        </div>

        {/* Live tools */}
        <section className="mb-14">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-1">Available now</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.href}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="show"
              >
                <Link
                  href={tool.href}
                  className={`group relative flex flex-col p-6 rounded-2xl border-2 ${tool.border} ${tool.bg} transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                    {tool.emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-gray-700">{tool.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{tool.description}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                    Open <span className="ml-1 group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coming soon */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-1">Coming eventually, probably</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-dashed border-gray-200 opacity-60"
              >
                <span className="text-2xl mt-0.5">{item.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-700 text-sm">{item.title}</h3>
                  <p className="text-gray-400 text-xs mt-0.5 leading-snug">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center mt-20 text-gray-400 text-sm">
          Made with questionable priorities.{" "}
          <span className="text-gray-300">Psst — there are hidden pages out there.</span>
        </footer>
      </div>
    </main>
  );
}
