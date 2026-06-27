"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shuffle, Clipboard, ClipboardCheck } from "lucide-react";
import { useState, useCallback, ReactNode } from "react";

interface GeneratorPageProps {
  href: string;
  badge?: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  gradient: string;
  buttonLabel: string;
  buttonClass: string;
  cardBorder: string;
  footerNote?: string;
  render: () => ReactNode;
  onGenerate: () => void;
  onCopy?: () => string;
}

export function GeneratorPage({
  href,
  badge,
  badgeColor,
  title,
  subtitle,
  gradient,
  buttonLabel,
  buttonClass,
  cardBorder,
  footerNote,
  render,
  onGenerate,
  onCopy,
}: GeneratorPageProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    if (!onCopy) return;
    navigator.clipboard.writeText(onCopy()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [onCopy]);

  return (
    <main className={`min-h-screen bg-gradient-to-br ${gradient} flex flex-col`}>
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full mx-auto text-center">
          {badge && (
            <div className={`inline-block bg-white border-2 rounded-full px-4 py-1 mb-6 shadow-sm ${badgeColor}`}>
              <span className="text-xs font-bold tracking-widest uppercase">{badge}</span>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">{title}</h1>
          <p className="text-gray-500 mb-10 text-lg">{subtitle}</p>

          <div className={`bg-white rounded-3xl shadow-xl border-2 ${cardBorder} p-8 sm:p-10 mb-8 text-left`}>
            {render()}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onGenerate}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg transition-colors duration-150 ${buttonClass}`}
            >
              <Shuffle size={18} /> {buttonLabel}
            </motion.button>
            {onCopy && (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={copy}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors duration-150"
              >
                {copied ? <><ClipboardCheck size={18} /> Copied!</> : <><Clipboard size={18} /> Copy</>}
              </motion.button>
            )}
          </div>

          {footerNote && (
            <p className="text-sm text-gray-400 italic mt-6">{footerNote}</p>
          )}
        </div>
      </div>
    </main>
  );
}

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }
export { pick };
