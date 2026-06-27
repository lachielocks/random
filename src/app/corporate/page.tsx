"use client";

import { useState, useCallback } from "react";
import { GeneratorPage, pick } from "@/components/GeneratorPage";
import {
  adjectives, nouns, verbs, missionTemplates, okrObjectives, okrKeyResults,
} from "@/data/buzzwords";

function fill(template: string) {
  return template
    .replace("{verb}", pick(verbs))
    .replace("{verb2}", pick(verbs))
    .replace("{adj}", pick(adjectives))
    .replace("{adj2}", pick(adjectives))
    .replace("{noun}", pick(nouns))
    .replace("{noun2}", pick(nouns));
}

interface CorpOutput {
  mission: string;
  okr: string;
  buzzphrase: string;
}

function generate(): CorpOutput {
  return {
    mission: fill(pick(missionTemplates)),
    okr: `Objective: ${pick(okrObjectives)}\nKey Results:\n• ${pick(okrKeyResults)}\n• ${pick(okrKeyResults)}\n• ${pick(okrKeyResults)}`,
    buzzphrase: `${pick(verbs)} ${pick(adjectives)} ${pick(nouns)} to ${pick(verbs)} ${pick(nouns)}`,
  };
}

export default function CorporatePage() {
  const [out, setOut] = useState<CorpOutput>(() => generate());
  const [key, setKey] = useState(0);

  const regen = useCallback(() => {
    setOut(generate());
    setKey((k) => k + 1);
  }, []);

  const copyText = () => `MISSION STATEMENT\n${out.mission}\n\nOKRs\n${out.okr}\n\nBUZZPHRASE\n${out.buzzphrase}`;

  return (
    <GeneratorPage
      href="/corporate"
      badge="Synergy Certified™"
      badgeColor="text-slate-600 border-slate-200"
      title="Corporate Buzzword Generator"
      subtitle="Mission statements, OKRs, and synergy slides that mean nothing."
      gradient="from-slate-50 via-zinc-50 to-gray-50"
      buttonLabel="Generate Synergy"
      buttonClass="bg-slate-700 hover:bg-slate-800 shadow-slate-200"
      cardBorder="border-slate-200"
      footerNote="Not approved by any board of directors. Or ducks."
      onGenerate={regen}
      onCopy={copyText}
      render={() => (
        <div key={key} className="space-y-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mission Statement</p>
            <p className="text-gray-800 leading-relaxed font-medium">{out.mission}</p>
          </div>
          <div className="pt-4 border-t-2 border-gray-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Q3 OKRs</p>
            <pre className="text-gray-700 text-sm whitespace-pre-wrap font-sans">{out.okr}</pre>
          </div>
          <div className="pt-4 border-t-2 border-gray-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Elevator Pitch</p>
            <p className="text-gray-800 italic">&ldquo;{out.buzzphrase}&rdquo;</p>
          </div>
        </div>
      )}
    />
  );
}
