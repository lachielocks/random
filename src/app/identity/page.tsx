"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, Clipboard, ClipboardCheck, UserRound } from "lucide-react";
import { firstNames, lastNames, nicknames, occupations, nemeses, powers, hobbies } from "@/data/identities";

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }

interface Identity {
  firstName: string;
  lastName: string;
  nickname: string;
  occupation: string;
  nemesis: string;
  power: string;
  hobby: string;
}

function generate(): Identity {
  return {
    firstName: pick(firstNames),
    lastName: pick(lastNames),
    nickname: pick(nicknames),
    occupation: pick(occupations),
    nemesis: pick(nemeses),
    power: pick(powers),
    hobby: pick(hobbies),
  };
}

export default function IdentityPage() {
  const [identity, setIdentity] = useState<Identity>(() => generate());
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const next = useCallback(() => {
    setIdentity(generate());
    setKey((k) => k + 1);
  }, []);

  const fullName = `${identity.firstName} "${identity.nickname}" ${identity.lastName}`;

  const copy = useCallback(() => {
    const text = [
      `Name: ${fullName}`,
      `Occupation: ${identity.occupation}`,
      `Nemesis: ${identity.nemesis}`,
      `Secret power: ${identity.power}`,
      `Hobby: ${identity.hobby}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [identity, fullName]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full mx-auto text-center">
          <div className="inline-block bg-white border-2 border-indigo-200 rounded-full px-4 py-1 mb-6 shadow-sm">
            <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase">You Are Now</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 tracking-tight">Identity Generator</h1>
          <p className="text-gray-500 mb-10 text-lg">A new you. Equally unqualified, but with a better nickname.</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-indigo-100 overflow-hidden mb-8"
            >
              {/* ID card header */}
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-8 py-6 text-white text-left">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                    <UserRound size={32} className="text-white" />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Official Identity Card</p>
                    <h2 className="text-2xl font-black leading-tight">{identity.firstName} &ldquo;{identity.nickname}&rdquo; {identity.lastName}</h2>
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="divide-y-2 divide-gray-50 text-left">
                {[
                  { label: "Occupation", value: identity.occupation },
                  { label: "Nemesis", value: identity.nemesis },
                  { label: "Secret Power", value: identity.power },
                  { label: "Hobby", value: identity.hobby },
                ].map(({ label, value }) => (
                  <div key={label} className="px-8 py-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-gray-800 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={next}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-indigo-200 transition-colors duration-150"
            >
              <RefreshCw size={18} /> New Identity
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={copy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors duration-150"
            >
              {copied ? <><ClipboardCheck size={18} /> Copied!</> : <><Clipboard size={18} /> Copy ID</>}
            </motion.button>
          </div>
          <p className="mt-6 text-sm text-gray-400 italic">Not legally binding. Probably.</p>
        </div>
      </div>
    </main>
  );
}
