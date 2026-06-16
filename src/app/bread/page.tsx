"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";

const GIPHY_KEY = "dc6zaTOxFJmzC";

const SEARCHES = [
  "bread falling over",
  "toast falling butter side down",
  "bread meme funny",
  "toast spinning",
  "sourdough bread",
  "garlic bread meme",
];

interface GifResult {
  id: string;
  url: string;
  title: string;
}

async function fetchGifs(query: string, limit = 4): Promise<GifResult[]> {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&rating=g`
  );
  if (!res.ok) return [];
  const json = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.data ?? []).map((d: any) => ({
    id: d.id,
    url: d.images?.downsized_medium?.url ?? d.images?.original?.url ?? "",
    title: d.title ?? query,
  }));
}

export default function BreadPage() {
  const [gifs, setGifs] = useState<GifResult[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const results = await Promise.all(
      SEARCHES.map((q) => fetchGifs(q, 3))
    );
    const all = results.flat().filter((g) => g.url);
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    setGifs(all);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>

        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="text-8xl mb-4 inline-block"
          >
            🍞
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-5xl font-black text-amber-900 mb-2 tracking-tight"
          >
            Almighty Bread
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-amber-700 text-lg"
          >
            The holiest of baked goods. Falling over. As it was written.
          </motion.p>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-full transition-all shadow-md"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            {loading ? "Loading bread…" : "More bread"}
          </button>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-amber-100 animate-pulse"
                style={{ height: 220 }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {gifs.map((gif) => (
              <motion.div
                key={gif.id}
                variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                className="break-inside-avoid rounded-2xl overflow-hidden border-2 border-amber-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={gif.url}
                  alt={gif.title}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && gifs.length === 0 && (
          <div className="text-center py-20 text-amber-600">
            <p className="text-5xl mb-4">😢</p>
            <p className="font-bold text-xl">The bread has left the building.</p>
            <p className="text-sm mt-2">Giphy may be sleeping. Try again?</p>
          </div>
        )}

        <p className="text-center text-amber-400 text-xs mt-12">
          Powered by Giphy. We are not responsible for any bread-related enlightenment.
        </p>
      </div>
    </main>
  );
}
