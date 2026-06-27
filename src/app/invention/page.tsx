"use client";

import { useState, useCallback } from "react";
import { GeneratorPage, pick } from "@/components/GeneratorPage";
import {
  inventionNames, abstracts, problems, solutions, capabilities, annoyances, actions, fields,
} from "@/data/inventions";

function fill(template: string) {
  return template
    .replace("{problem}", pick(problems))
    .replace("{solution}", pick(solutions))
    .replace("{capability}", pick(capabilities))
    .replace("{annoyance}", pick(annoyances))
    .replace("{action}", pick(actions))
    .replace("{field}", pick(fields));
}

function generate() {
  const name = pick(inventionNames);
  const patentNo = `US${Math.floor(Math.random() * 9000000) + 1000000}B2`;
  return {
    name,
    patentNo,
    abstract: fill(pick(abstracts)),
    claims: [
      `A method comprising the steps of ${pick(actions)}.`,
      `The method of claim 1, wherein the user is not required to ${pick(annoyances)}.`,
      `A system for ${pick(capabilities)} in the field of ${pick(fields)}.`,
    ],
  };
}

export default function InventionPage() {
  const [patent, setPatent] = useState(() => generate());
  const [key, setKey] = useState(0);

  const regen = useCallback(() => {
    setPatent(generate());
    setKey((k) => k + 1);
  }, []);

  const copyText = () =>
    `PATENT ${patent.patentNo}\n${patent.name}\n\nABSTRACT\n${patent.abstract}\n\nCLAIMS\n${patent.claims.map((c, i) => `${i + 1}. ${c}`).join("\n")}`;

  return (
    <GeneratorPage
      href="/invention"
      badge="Patent Pending™"
      badgeColor="text-amber-600 border-amber-200"
      title="Useless Invention Patent"
      subtitle="Patent descriptions for gadgets nobody needs."
      gradient="from-amber-50 via-yellow-50 to-orange-50"
      buttonLabel="File Patent"
      buttonClass="bg-amber-500 hover:bg-amber-600 shadow-amber-200"
      cardBorder="border-amber-200"
      footerNote="Not actually patented. The bread reorientation device is real though."
      onGenerate={regen}
      onCopy={copyText}
      render={() => (
        <div key={key} className="space-y-4">
          <div>
            <p className="text-xs font-mono text-amber-500 mb-1">{patent.patentNo}</p>
            <p className="text-2xl font-black text-gray-900">{patent.name}</p>
          </div>
          <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center text-5xl border-2 border-dashed border-gray-300">
            [FIG. 1 — DIAGRAM UNAVAILABLE]
          </div>
          <div>
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Abstract</p>
            <p className="text-gray-700 text-sm leading-relaxed">{patent.abstract}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Claims</p>
            <ol className="space-y-1 text-sm text-gray-600 list-decimal list-inside">
              {patent.claims.map((c, i) => <li key={i}>{c}</li>)}
            </ol>
          </div>
        </div>
      )}
    />
  );
}
