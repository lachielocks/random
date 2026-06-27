"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { questions, computeResult, resultDescriptions, getToolTitle } from "@/data/quiz";
import { tools } from "@/lib/tools";
import { useBadges } from "@/context/BadgeContext";

export default function QuizPage() {
  const { unlock } = useBadges();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const resultHref = done ? computeResult(answers) : null;
  const resultTool = resultHref ? tools.find((t) => t.href === resultHref) : null;

  const pick = useCallback((optionIdx: number) => {
    const next = [...answers, optionIdx];
    setAnswers(next);
    if (step >= questions.length - 1) {
      setDone(true);
      unlock("quiz-master");
    } else {
      setStep((s) => s + 1);
    }
  }, [answers, step, unlock]);

  const reset = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setDone(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50 flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full mx-auto text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Which Tool Are You?</h1>
          <p className="text-gray-500 mb-10">5 silly questions. Discover your true random-tool identity.</p>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border-2 border-fuchsia-200 p-8 shadow-xl"
              >
                <p className="text-xs font-bold text-fuchsia-500 uppercase tracking-widest mb-4">
                  Question {step + 1} of {questions.length}
                </p>
                <p className="text-xl font-bold text-gray-900 mb-6">{questions[step].question}</p>
                <div className="space-y-3">
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => pick(i)}
                      className="w-full text-left px-5 py-4 rounded-2xl border-2 border-gray-200 hover:border-fuchsia-400 hover:bg-fuchsia-50 transition-colors font-semibold text-gray-700"
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : resultHref && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border-2 border-fuchsia-200 p-8 shadow-xl"
              >
                <p className="text-6xl mb-4">{resultTool ? "🪞" : "🎲"}</p>
                <p className="text-xs font-bold text-fuchsia-500 uppercase tracking-widest mb-2">You are</p>
                <h2 className="text-3xl font-black text-gray-900 mb-4">{getToolTitle(resultHref, tools)}</h2>
                <p className="text-gray-600 mb-8">{resultDescriptions[resultHref] ?? "Mysteriously random."}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {resultTool && (
                    <Link href={resultHref} className="inline-flex items-center justify-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold px-6 py-3 rounded-2xl">
                      Visit Your Tool <ArrowRight size={16} />
                    </Link>
                  )}
                  <button onClick={reset} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-2xl hover:bg-gray-50">
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
