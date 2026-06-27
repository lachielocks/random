"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { ALL_BADGES } from "@/context/BadgeContext";

interface Props {
  unlockedIds: string[];
  onClose: () => void;
}

export function BadgeModal({ unlockedIds, onClose }: Props) {
  const badges = Object.values(ALL_BADGES);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl border-2 border-purple-100 w-full max-w-sm overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b-2 border-gray-100">
            <div>
              <h2 className="font-black text-gray-900 text-xl">Secret Badges</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                {unlockedIds.length}/{badges.length} found
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Badge list */}
          <ul className="divide-y-2 divide-gray-50">
            {badges.map((badge) => {
              const found = unlockedIds.includes(badge.id);
              return (
                <li
                  key={badge.id}
                  className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                    found ? "" : "opacity-40"
                  }`}
                >
                  <span className="text-3xl shrink-0">
                    {found ? badge.emoji : <Lock size={24} className="text-gray-400 mt-1" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${found ? "text-gray-900" : "text-gray-400"}`}>
                      {found ? badge.name : "???"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                      {found ? badge.description : "Keep exploring to find this one."}
                    </p>
                  </div>
                  {found && (
                    <span className="shrink-0 text-xs font-bold text-green-500 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                      Found
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {unlockedIds.length < badges.length && (
            <div className="px-6 py-4 bg-purple-50 border-t-2 border-purple-100">
              <p className="text-xs text-purple-500 text-center font-medium mb-2">
                Hints: type &ldquo;duck&rdquo; on the homepage · ↑↑↓↓←→←→BA · visit every tool · try /definitely-404
              </p>
              <p className="text-xs text-purple-400 text-center">
                Terminal: type &ldquo;ducks&rdquo; or &ldquo;bread&rdquo; · Find the invisible button fast · Spin roulette 5×
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
