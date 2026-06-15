"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shuffle, Clipboard, ClipboardCheck, MessageSquareWarning } from "lucide-react";
import { complaints } from "@/data/complaints";

function getRandom(current: string) {
  const pool = complaints.filter((c) => c.complaint !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function ComplaintsPage() {
  const [{ subject, complaint }, setData] = useState(() => complaints[Math.floor(Math.random() * complaints.length)]);
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const next = useCallback(() => {
    setData((prev) => getRandom(prev.complaint));
    setKey((k) => k + 1);
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(`RE: ${subject}\n\n${complaint}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [subject, complaint]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full mx-auto text-center">
          <div className="inline-block bg-white border-2 border-red-200 rounded-full px-4 py-1 mb-6 shadow-sm">
            <span className="text-xs font-bold text-red-500 tracking-widest uppercase">Grievances, Formally Expressed</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">Complaint Generator</h1>
          <p className="text-gray-500 mb-10 text-lg">
            Articulating feelings about things that definitely deserve it.{" "}
            <span className="text-gray-400 text-base">{complaints.length} complaints.</span>
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-red-100 p-8 sm:p-10 mb-8 text-left"
            >
              {/* Memo header */}
              <div className="border-b-2 border-gray-100 pb-4 mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquareWarning size={14} className="text-red-400" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Formal Complaint</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900">RE: {subject}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{complaint}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={next}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-red-200 transition-colors duration-150"
            >
              <Shuffle size={18} /> Next Complaint
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={copy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors duration-150"
            >
              {copied ? <><ClipboardCheck size={18} /> Copied!</> : <><Clipboard size={18} /> Copy</>}
            </motion.button>
          </div>
          <p className="mt-6 text-sm text-gray-400 italic">All complaints are reasonable. Some more than others.</p>
        </div>
      </div>

      {/* Full list */}
      <section className="bg-white border-t-2 border-red-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
            All {complaints.length} Complaints
          </h2>
          <ol className="space-y-5 list-none">
            {complaints.map((c, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span className="shrink-0 w-8 text-right text-gray-300 font-mono pt-0.5 text-sm">{i + 1}.</span>
                <div>
                  <span className="font-bold text-gray-700 text-sm">RE: {c.subject} — </span>
                  <span className="text-gray-500 text-sm">{c.complaint}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
