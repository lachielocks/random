"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useBadges, ALL_BADGES } from "@/context/BadgeContext";

interface Props {
  badgeId: string;
  title: string;
  description: string;
  flavourText: string[];
  bg: string;
}

export function SecretPage({ badgeId, title, description, flavourText, bg }: Props) {
  const { unlock, unlocked } = useBadges();
  const [show, setShow] = useState(false);
  const badge = ALL_BADGES[badgeId];
  const alreadyHad = unlocked.has(badgeId);

  useEffect(() => {
    unlock(badgeId);
    const id = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(id);
  }, [badgeId, unlock]);

  return (
    <main className={`min-h-screen ${bg} flex flex-col items-center justify-center px-6 py-16`}>
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="text-8xl mb-6"
        >
          {badge?.emoji ?? "🤫"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          {show && !alreadyHad && (
            <div className="inline-block bg-white border-2 border-purple-200 rounded-full px-4 py-1 mb-5 shadow-sm">
              <span className="text-xs font-bold text-purple-500 tracking-widest uppercase">
                🏅 Badge Unlocked: {badge?.name}
              </span>
            </div>
          )}
          {show && alreadyHad && (
            <div className="inline-block bg-white border-2 border-gray-200 rounded-full px-4 py-1 mb-5 shadow-sm">
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                Already found this one.
              </span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">{title}</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{description}</p>

          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-10 text-left space-y-3 shadow-sm">
            {flavourText.map((line, i) => (
              <p key={i} className="text-gray-500 text-sm leading-relaxed">{line}</p>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back to Random Stuff
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
