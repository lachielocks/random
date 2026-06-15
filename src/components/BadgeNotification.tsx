"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useBadges } from "@/context/BadgeContext";

export function BadgeNotification() {
  const { newBadge, clearNew } = useBadges();

  useEffect(() => {
    if (!newBadge) return;
    const id = setTimeout(clearNew, 4000);
    return () => clearTimeout(id);
  }, [newBadge, clearNew]);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {newBadge && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="bg-white border-2 border-purple-200 rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 max-w-xs pointer-events-auto"
          >
            <span className="text-4xl">{newBadge.emoji}</span>
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-purple-500 uppercase tracking-widest mb-0.5">
                <Trophy size={11} /> Badge Unlocked!
              </div>
              <div className="font-bold text-gray-900 text-sm">{newBadge.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">{newBadge.description}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
