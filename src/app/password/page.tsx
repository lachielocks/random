"use client";

import { useState, useCallback } from "react";
import { GeneratorPage, pick } from "@/components/GeneratorPage";
import { bases, suffixes, personalBits, terriblePatterns, securityRatings } from "@/data/passwords";

function generatePassword(): { password: string; rating: string } {
  const pattern = pick(terriblePatterns);
  const year = String(2020 + Math.floor(Math.random() * 7));
  const password = pattern
    .replace("{base}", pick(bases))
    .replace("{suffix}", pick(suffixes))
    .replace("{personal}", pick(personalBits))
    .replace("{year}", year)
    .replace("CompanyName", pick(["Acme", "Corp", "Tech", "Global"]));
  return { password, rating: pick(securityRatings) };
}

export default function PasswordPage() {
  const [data, setData] = useState(() => generatePassword());
  const [key, setKey] = useState(0);

  const regen = useCallback(() => {
    setData(generatePassword());
    setKey((k) => k + 1);
  }, []);

  return (
    <GeneratorPage
      href="/password"
      badge="Security Nightmare™"
      badgeColor="text-red-600 border-red-200"
      title="Terrible Password Generator"
      subtitle="Password123! but worse. Security experts hate this one trick."
      gradient="from-red-50 via-orange-50 to-amber-50"
      buttonLabel="Generate Password"
      buttonClass="bg-red-500 hover:bg-red-600 shadow-red-200"
      cardBorder="border-red-200"
      footerNote="Do not use these. Seriously. The Council of Ducks is watching."
      onGenerate={regen}
      onCopy={() => data.password}
      render={() => (
        <div key={key} className="text-center">
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">Your New Password</p>
          <p className="text-3xl sm:text-4xl font-black text-gray-900 font-mono break-all mb-6">{data.password}</p>
          <div className="bg-red-50 border-2 border-red-100 rounded-2xl px-4 py-3">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Security Rating</p>
            <p className="text-red-700 font-semibold text-sm">{data.rating}</p>
          </div>
        </div>
      )}
    />
  );
}
