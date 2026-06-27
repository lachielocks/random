"use client";

import { useState, useCallback } from "react";
import { GeneratorPage, pick } from "@/components/GeneratorPage";
import { species, namePrefixes, nameCores, nameSuffixes, personalities, stats } from "@/data/pets";

function randStat() { return Math.floor(Math.random() * 100) + 1; }

function generate() {
  const name = `${pick(namePrefixes)} ${pick(nameCores)} ${pick(nameSuffixes)}`;
  const statMap = Object.fromEntries(stats.map((s) => [s, randStat()]));
  return {
    name,
    species: pick(species),
    personality: pick(personalities),
    stats: statMap,
    ability: pick(["Snack Sense", "Chaos Aura", "Printer Intimidation", "Vibe Detection", "Bread Alignment", "Duck Diplomacy"]),
  };
}

export default function PetPage() {
  const [pet, setPet] = useState(() => generate());
  const [key, setKey] = useState(0);

  const regen = useCallback(() => {
    setPet(generate());
    setKey((k) => k + 1);
  }, []);

  const copyText = () =>
    `${pet.name}\nSpecies: ${pet.species}\nPersonality: ${pet.personality}\nAbility: ${pet.ability}\n${stats.map((s) => `${s}: ${pet.stats[s]}/100`).join("\n")}`;

  return (
    <GeneratorPage
      href="/pet"
      badge="Pokémon But Worse™"
      badgeColor="text-orange-600 border-orange-200"
      title="Random Pet Generator"
      subtitle="Name, species, stats. Lightweight Pokémon energy."
      gradient="from-orange-50 via-pink-50 to-rose-50"
      buttonLabel="Adopt Pet"
      buttonClass="bg-orange-500 hover:bg-orange-600 shadow-orange-200"
      cardBorder="border-orange-200"
      footerNote="No actual pets were harmed. Some were mildly inconvenienced."
      onGenerate={regen}
      onCopy={copyText}
      render={() => (
        <div key={key} className="space-y-4">
          <div className="text-center">
            <p className="text-5xl mb-2">🐾</p>
            <p className="text-2xl font-black text-gray-900">{pet.name}</p>
            <p className="text-gray-500">{pet.species}</p>
          </div>
          <div className="bg-orange-50 rounded-xl px-4 py-2 text-sm text-orange-800 text-center">
            {pet.personality} · Ability: <strong>{pet.ability}</strong>
          </div>
          <div className="space-y-2">
            {stats.map((s) => (
              <div key={s}>
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                  <span>{s}</span><span>{pet.stats[s]}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full" style={{ width: `${pet.stats[s]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );
}
