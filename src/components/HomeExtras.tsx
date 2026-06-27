"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Dices, Search, Moon } from "lucide-react";
import { tools, getToolOfTheDay } from "@/lib/tools";
import { useBadges } from "@/context/BadgeContext";
import { incrementRouletteCount } from "@/lib/visits";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];

export function HomeExtras() {
  const router = useRouter();
  const { unlock } = useBadges();
  const [search, setSearch] = useState("");
  const [searchMsg, setSearchMsg] = useState("");
  const [worseDark, setWorseDark] = useState(false);
  const [worseDarkSecs, setWorseDarkSecs] = useState(0);
  const konamiIdx = useRef(0);
  const duckBuffer = useRef("");
  const toolOfDay = getToolOfTheDay();

  // Konami code
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIdx.current]) {
        konamiIdx.current++;
        if (konamiIdx.current === KONAMI.length) {
          unlock("konami");
          konamiIdx.current = 0;
        }
      } else {
        konamiIdx.current = 0;
      }

      // Duck typing
      if (e.key.length === 1) {
        duckBuffer.current = (duckBuffer.current + e.key.toLowerCase()).slice(-4);
        if (duckBuffer.current === "duck") {
          unlock("duck-typist");
          duckBuffer.current = "";
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [unlock]);

  // Worse dark mode timer
  useEffect(() => {
    if (!worseDark) return;
    const id = setInterval(() => {
      setWorseDarkSecs((s) => {
        const next = s + 1;
        if (next >= 30) unlock("worse-dark");
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [worseDark, unlock]);

  useEffect(() => {
    if (worseDark) {
      document.documentElement.classList.add("worse-dark");
    } else {
      document.documentElement.classList.remove("worse-dark");
      setWorseDarkSecs(0);
    }
    return () => document.documentElement.classList.remove("worse-dark");
  }, [worseDark]);

  const roulette = useCallback(() => {
    const t = tools[Math.floor(Math.random() * tools.length)];
    const count = incrementRouletteCount();
    if (count >= 5) unlock("certified-random");
    router.push(t.href);
  }, [router, unlock]);

  const badSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim().toLowerCase();
    if (!q) {
      setSearchMsg("Please enter something to misunderstand.");
      return;
    }
    // Intentionally bad: pick random tool
    const t = tools[Math.floor(Math.random() * tools.length)];
    setSearchMsg(`No results for "${search}". Sending you to ${t.title} instead.`);
    setTimeout(() => router.push(t.href), 1200);
  }, [search, router]);

  return (
    <div className="mb-12 space-y-6">
      {/* Tool of the day */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">Tool of the Day</p>
          <p className="font-black text-gray-900 text-lg">{toolOfDay.title}</p>
          <p className="text-gray-500 text-sm">{toolOfDay.description}</p>
        </div>
        <Link
          href={toolOfDay.href}
          className="shrink-0 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-3 rounded-xl transition-colors"
        >
          Open <ArrowRight size={14} />
        </Link>
      </motion.div>

      {/* Controls row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={roulette}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-800 font-bold px-5 py-3 rounded-2xl transition-colors"
        >
          <Dices size={18} /> Random Tool Roulette
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setWorseDark((d) => !d)}
          className={`flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-2xl border-2 transition-colors ${
            worseDark
              ? "bg-purple-900 text-yellow-300 border-yellow-500 animate-pulse"
              : "bg-white border-gray-200 hover:border-gray-400 text-gray-700"
          }`}
        >
          <Moon size={18} /> {worseDark ? `Worse Dark (${30 - worseDarkSecs}s)` : "Worse Dark Mode (cursed)"}
        </motion.button>
      </div>

      {/* Bad search */}
      <form onSubmit={badSearch} className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSearchMsg(""); }}
          placeholder="Search tools... (results not guaranteed)"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-purple-400"
        />
        {searchMsg && (
          <p className="text-sm text-purple-600 mt-2 font-medium">{searchMsg}</p>
        )}
      </form>
    </div>
  );
}
