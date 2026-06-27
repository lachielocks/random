"use client";

import { useState, useCallback } from "react";
import { GeneratorPage, pick } from "@/components/GeneratorPage";
import { pairs, nonsenseBritish, nonsenseAmerican } from "@/data/translator";

type Direction = "to-american" | "to-british";

function generate(direction: Direction) {
  const pair = pick(pairs);
  if (direction === "to-american") {
    return { input: pair.british, output: pair.american, note: pair.note, direction };
  }
  return { input: pair.american, output: pair.british, note: pair.note, direction };
}

export default function TranslatorPage() {
  const [dir, setDir] = useState<Direction>("to-american");
  const [result, setResult] = useState(() => generate("to-american"));
  const [key, setKey] = useState(0);

  const regen = useCallback(() => {
    setResult(generate(dir));
    setKey((k) => k + 1);
  }, [dir]);

  const flip = useCallback(() => {
    const newDir = dir === "to-american" ? "to-british" : "to-american";
    setDir(newDir);
    setResult(generate(newDir));
    setKey((k) => k + 1);
  }, [dir]);

  return (
    <GeneratorPage
      href="/translator"
      badge="Diplomatic Incident™"
      badgeColor="text-blue-600 border-blue-200"
      title="British ↔ American Translator"
      subtitle="Queue → line. Plus nonsense regional variants."
      gradient="from-blue-50 via-white to-red-50"
      buttonLabel="Translate"
      buttonClass="bg-blue-600 hover:bg-blue-700 shadow-blue-200"
      cardBorder="border-blue-200"
      footerNote={`Bonus: "${pick(nonsenseBritish)}" ≈ "${pick(nonsenseAmerican)}"`}
      onGenerate={regen}
      onCopy={() => `${result.input} → ${result.output}`}
      render={() => (
        <div key={key}>
          <div className="flex justify-center mb-6">
            <button
              onClick={flip}
              className="text-sm font-bold text-blue-600 bg-blue-50 border-2 border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              {dir === "to-american" ? "🇬🇧 → 🇺🇸 British to American" : "🇺🇸 → 🇬🇧 American to British"}
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Input</p>
              <p className="text-2xl font-black text-gray-900">{result.input}</p>
            </div>
            <p className="text-3xl text-gray-300">→</p>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Output</p>
              <p className="text-2xl font-black text-blue-700">{result.output}</p>
            </div>
          </div>
          {result.note && (
            <p className="text-sm text-gray-500 italic text-center mt-6 pt-4 border-t-2 border-gray-100">
              Note: {result.note}
            </p>
          )}
        </div>
      )}
    />
  );
}
