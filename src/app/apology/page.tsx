"use client";

import { useState, useCallback } from "react";
import { GeneratorPage, pick } from "@/components/GeneratorPage";
import { offences, openings, bodies, closings } from "@/data/apologies";

const names = ["Colleague", "Friend", "Manager", "Sandwich Owner", "IT Department", "Humanity"];

function generate() {
  const offence = pick(offences);
  const body = pick(bodies).replace("{offence}", offence);
  return {
    opening: pick(openings).replace("{name}", pick(names)),
    body,
    closing: pick(closings),
    signoff: pick(["A Regretful Human", "Former Sandwich Thief", "Your Apologetic Colleague", "Someone Who Should Know Better"]),
  };
}

export default function ApologyPage() {
  const [letter, setLetter] = useState(() => generate());
  const [key, setKey] = useState(0);

  const regen = useCallback(() => {
    setLetter(generate());
    setKey((k) => k + 1);
  }, []);

  const copyText = () => `${letter.opening}\n\n${letter.body}\n\n${letter.closing}\n${letter.signoff}`;

  return (
    <GeneratorPage
      href="/apology"
      badge="Sincerely Regretful™"
      badgeColor="text-purple-600 border-purple-200"
      title="Formal Apology Generator"
      subtitle="I regret to inform you that I ate your sandwich. Professionally."
      gradient="from-purple-50 via-violet-50 to-fuchsia-50"
      buttonLabel="Generate Apology"
      buttonClass="bg-purple-500 hover:bg-purple-600 shadow-purple-200"
      cardBorder="border-purple-200"
      footerNote="Legally binding in zero jurisdictions."
      onGenerate={regen}
      onCopy={copyText}
      render={() => (
        <div key={key} className="space-y-4 text-gray-700 leading-relaxed">
          <p className="font-semibold">{letter.opening}</p>
          <p>{letter.body}</p>
          <p className="pt-4">{letter.closing}<br />{letter.signoff}</p>
        </div>
      )}
    />
  );
}
