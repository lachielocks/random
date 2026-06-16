"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, BookOpen, Brain, Terminal, Cookie, Dice6, Star,
  MessageSquareWarning, Scroll, Waves, Medal, UserRound, Monitor, MousePointer, Bird, Wheat, Trophy,
} from "lucide-react";
import { RotatingTagline } from "@/components/RotatingTagline";
import { BadgeModal } from "@/components/BadgeModal";
import { useBadges, ALL_BADGES } from "@/context/BadgeContext";

const tools = [
  { href: "/excuses",   Icon: BookOpen,            title: "School Excuse Generator", description: "Professionally crafted excuses for not doing your homework.",       color: "from-yellow-400 to-orange-500",  bg: "bg-yellow-50 hover:bg-yellow-100", border: "border-yellow-200" },
  { href: "/facts",     Icon: Brain,               title: "Useless Facts",           description: "Facts you'll never need but will never forget.",                    color: "from-blue-400 to-cyan-500",      bg: "bg-blue-50 hover:bg-blue-100",     border: "border-blue-200"   },
  { href: "/hacker",    Icon: Terminal,            title: "Fake Hacker Mode",        description: "Chaos mode: type random keys. Terminal mode: actually hack stuff.", color: "from-green-500 to-emerald-700",  bg: "bg-green-50 hover:bg-green-100",   border: "border-green-200"  },
  { href: "/fortune",   Icon: Cookie,              title: "Fortune Cookie Machine",  description: "Crack open a cookie. Receive wisdom you didn't ask for.",           color: "from-amber-400 to-yellow-500",   bg: "bg-amber-50 hover:bg-amber-100",   border: "border-amber-200"  },
  { href: "/decisions", Icon: Dice6,               title: "Random Decision Maker",   description: "Add your options. Let fate decide. Blame fate.",                    color: "from-violet-500 to-purple-600",  bg: "bg-violet-50 hover:bg-violet-100", border: "border-violet-200" },
  { href: "/cheese",    Icon: Star,                title: "Cheese Rating Scale",     description: "Pompous reviews of cheeses. Rate them on a rigorous scale.",        color: "from-yellow-500 to-lime-500",    bg: "bg-lime-50 hover:bg-lime-100",     border: "border-lime-200"   },
  { href: "/complaints",Icon: MessageSquareWarning,title: "Complaint Generator",     description: "Formally articulate your grievances about printers and queues.",    color: "from-red-400 to-rose-500",       bg: "bg-red-50 hover:bg-red-100",       border: "border-red-200"    },
  { href: "/history",   Icon: Scroll,              title: "Fake History Facts",      description: "Plausible. Detailed. Completely made up. Do not cite in essays.",   color: "from-stone-500 to-amber-700",    bg: "bg-stone-50 hover:bg-stone-100",   border: "border-stone-200"  },
  { href: "/vibe",      Icon: Waves,               title: "Vibe Checker",            description: "What's your vibe today? The machine knows.",                        color: "from-pink-400 to-fuchsia-500",   bg: "bg-pink-50 hover:bg-pink-100",     border: "border-pink-200"   },
  { href: "/identity",  Icon: UserRound,           title: "Identity Generator",      description: 'You are now Lachlan "The Ferocious Turnip" Smith. Professional Escalator Tester.', color: "from-indigo-500 to-blue-600", bg: "bg-indigo-50 hover:bg-indigo-100", border: "border-indigo-200" },
  { href: "/loading",   Icon: Monitor,             title: "Fake OS Screens",         description: "Windows updates, BSODs, macOS, Ubuntu, BIOS. All fake. Very convincing.", color: "from-gray-600 to-gray-900", bg: "bg-gray-50 hover:bg-gray-100",     border: "border-gray-200"   },
  { href: "/button",    Icon: MousePointer,        title: "Find the Invisible Button", description: "The whole page is blank. There's a button somewhere. Good luck.", color: "from-rose-400 to-pink-600",   bg: "bg-rose-50 hover:bg-rose-100",     border: "border-rose-200"   },
  { href: "/duck",      Icon: Bird,                title: "Duck Cam",                description: "Not a real camera. Just ducks. They change occasionally.",          color: "from-sky-400 to-blue-500",       bg: "bg-sky-50 hover:bg-sky-100",       border: "border-sky-200"    },
  { href: "/championship", Icon: Trophy,             title: "Button Click Championship", description: "Global counter. No purpose. Just clicks. Every one recorded forever.", color: "from-yellow-400 to-amber-500", bg: "bg-yellow-50 hover:bg-yellow-100", border: "border-yellow-200" },
  { href: "/bread",     Icon: Wheat,               title: "Almighty Bread",          description: "The bread falling over GIF. And many more. All hail bread.",         color: "from-amber-400 to-orange-500",   bg: "bg-amber-50 hover:bg-amber-100",   border: "border-amber-200"  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const { unlockedIds } = useBadges();
  const [showBadges, setShowBadges] = useState(false);
  const totalBadges = Object.keys(ALL_BADGES).length;
  const foundCount = unlockedIds.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-block bg-white border-2 border-purple-200 rounded-2xl px-6 py-2 mb-6 shadow-sm">
            <span className="text-sm font-semibold text-purple-600 tracking-widest uppercase">A collection of</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">Random Stuff</h1>
          <RotatingTagline />
          {foundCount > 0 && (
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

        <footer className="text-center mt-20 text-gray-400 text-sm">
          Made with questionable priorities.{" "}
          <span className="text-gray-300">Psst — there are hidden pages out there.</span>
        </footer>
      </div>
    </main>
  );
}
