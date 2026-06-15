"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { excuses } from "@/data/excuses";

function getRandomExcuse(current: string): string {
  const pool = excuses.filter((e) => e !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function ExcusesPage() {
  const [excuse, setExcuse] = useState<string>(() => excuses[Math.floor(Math.random() * excuses.length)]);
  const [animating, setAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  const next = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setExcuse((prev) => getRandomExcuse(prev));
      setAnimating(false);
    }, 200);
  }, [animating]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(excuse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [excuse]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex flex-col">
      {/* Nav */}
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full mx-auto text-center">
          {/* Badge */}
          <div className="inline-block bg-white border-2 border-orange-200 rounded-full px-4 py-1 mb-6 shadow-sm">
            <span className="text-xs font-bold text-orange-500 tracking-widest uppercase">Official Excuse Generator™</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            School Excuse Generator
          </h1>
          <p className="text-gray-500 mb-12 text-lg">
            Professionally crafted excuses for not doing your homework.{" "}
            <span className="text-gray-400 text-base">{excuses.length} to choose from.</span>
          </p>

          {/* Excuse card */}
          <div
            className={`relative bg-white rounded-3xl shadow-xl border-2 border-orange-100 p-8 sm:p-12 mb-8 transition-all duration-200 ${
              animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Decorative quote mark */}
            <div className="absolute top-6 left-8 text-7xl text-orange-100 font-serif leading-none select-none" aria-hidden>
              &ldquo;
            </div>
            <p className="relative text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed z-10">
              {excuse}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={next}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-orange-200 transition-all duration-150"
            >
              🎲 Generate Excuse
            </button>
            <button
              onClick={copy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-all duration-150"
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-400 italic">
            We take no responsibility for the consequences of using these excuses.
          </p>
        </div>
      </div>

      {/* Footer list of all excuses */}
      <section className="bg-white border-t-2 border-orange-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
            All {excuses.length} Excuses
          </h2>
          <ol className="space-y-3 list-none">
            {excuses.map((e, i) => (
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
