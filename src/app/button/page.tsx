"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";

function newPosition() {
  return {
    x: 10 + Math.random() * 78,
    y: 15 + Math.random() * 70,
  };
}

export default function ButtonPage() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [found, setFound] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestClicks, setBestClicks] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setPos(newPosition());
  }, []);

  useEffect(() => {
    if (found) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [found, startTime]);

  const handlePageClick = useCallback(() => {
    if (!found) setClicks((c) => c + 1);
  }, [found]);

  const handleFind = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (found) return;
    const time = Math.floor((Date.now() - startTime) / 1000);
    setFound(true);
    setElapsed(time);
    setBestTime((b) => (b === null || time < b ? time : b));
    setBestClicks((b) => (b === null || clicks + 1 < b ? clicks + 1 : b));
  }, [found, startTime, clicks]);

  const reset = useCallback(() => {
    setFound(false);
    setClicks(0);
    setElapsed(0);
    setPos(newPosition());
  }, []);

  const formatTime = (s: number) => s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;

  return (
    <main
      className="min-h-screen bg-white relative overflow-hidden cursor-default select-none"
      onClick={handlePageClick}
    >
      {/* Minimal top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 pt-5 z-10 pointer-events-none">
        <Link
          href="/"
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-gray-500 transition-colors"
        >
          <ArrowLeft size={12} /> back
        </Link>
        <div className="flex items-center gap-4 text-xs text-gray-200">
          <span>{clicks} clicks</span>
          <span>{formatTime(elapsed)}</span>
          {bestTime !== null && (
            <span className="flex items-center gap-1">
              <Trophy size={11} /> {formatTime(bestTime)} / {bestClicks} clicks
            </span>
          )}
        </div>
      </div>

      {/* Invisible button */}
      {!found && (
        <button
          onClick={handleFind}
          style={{
            position: "absolute",
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: 48,
            height: 48,
            transform: "translate(-50%, -50%)",
            opacity: 0,
            cursor: "default",
            border: "none",
            background: "none",
            padding: 0,
          }}
          aria-label="The button"
        />
      )}

      {/* Hint text — very subtle */}
      {!found && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-gray-200 text-lg font-semibold mb-2">There&apos;s a button somewhere.</p>
          <p className="text-gray-200 text-sm">Find it.</p>
        </div>
      )}

      {/* Found! */}
      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Confetti-ish */}
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  background: ["#f59e0b", "#6366f1", "#10b981", "#ef4444", "#3b82f6", "#ec4899"][i % 6],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ y: -20, opacity: 1, rotate: 0, scale: 1 }}
                animate={{ y: 200 + Math.random() * 200, opacity: 0, rotate: Math.random() * 360, scale: 0.3 }}
                transition={{ duration: 1.5 + Math.random(), delay: Math.random() * 0.3, ease: "easeIn" }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-center px-8"
            >
              <p className="text-6xl mb-4">🎉</p>
              <h1 className="text-4xl font-black text-gray-900 mb-2">You found it!</h1>
              <p className="text-gray-500 mb-1">{clicks + 1} click{clicks === 0 ? "" : "s"} · {formatTime(elapsed)}</p>
              {bestClicks !== null && (
                <p className="text-sm text-gray-400 mb-6">
                  Best: {formatTime(bestTime!)} in {bestClicks} click{bestClicks === 1 ? "" : "s"}
                </p>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); reset(); }}
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold px-8 py-3 rounded-2xl transition-colors"
              >
                Play again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
