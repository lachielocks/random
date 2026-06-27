"use client";

import { useState, useCallback } from "react";
import { GeneratorPage, pick } from "@/components/GeneratorPage";
import { conditions, phenomena, temperatures, wind, advice } from "@/data/weather";
import { dailyPick } from "@/lib/daily-seed";

function generateDaily() {
  return {
    condition: dailyPick(conditions, "weather-cond"),
    phenomenon: dailyPick(phenomena, "weather-phen"),
    temp: dailyPick(temperatures, "weather-temp"),
    wind: dailyPick(wind, "weather-wind"),
    tip: dailyPick(advice, "weather-tip"),
    isDaily: true,
  };
}

function generateRandom() {
  return {
    condition: pick(conditions),
    phenomenon: pick(phenomena),
    temp: pick(temperatures),
    wind: pick(wind),
    tip: pick(advice),
    isDaily: false,
  };
}

export default function WeatherPage() {
  const [forecast, setForecast] = useState(() => generateDaily());
  const [key, setKey] = useState(0);

  const regen = useCallback(() => {
    setForecast(generateRandom());
    setKey((k) => k + 1);
  }, []);

  const copyText = () =>
    `FORECAST: ${forecast.condition}\n${forecast.phenomenon}\nTemp: ${forecast.temp}\nWind: ${forecast.wind}\nAdvice: ${forecast.tip}`;

  return (
    <GeneratorPage
      href="/weather"
      badge="Meteorological Nonsense™"
      badgeColor="text-sky-600 border-sky-200"
      title="Fake Weather Forecast"
      subtitle="Partly cloudy with a 40% chance of existential dread."
      gradient="from-sky-50 via-indigo-50 to-violet-50"
      buttonLabel="New Forecast"
      buttonClass="bg-sky-500 hover:bg-sky-600 shadow-sky-200"
      cardBorder="border-sky-200"
      footerNote={forecast.isDaily ? "Today's forecast is the same for everyone. Solidarity." : "Random forecast. Emotionally unreliable."}
      onGenerate={regen}
      onCopy={copyText}
      render={() => (
        <div key={key} className="space-y-4">
          {forecast.isDaily && (
            <span className="inline-block text-xs font-bold text-sky-500 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full mb-2">
              TODAY&apos;S FORECAST
            </span>
          )}
          <p className="text-3xl font-black text-gray-900">{forecast.condition}</p>
          <p className="text-gray-600 text-lg">{forecast.phenomenon}</p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-gray-100 text-sm">
            <div><span className="text-gray-400 font-bold uppercase text-xs">Feels like</span><p className="text-gray-700 font-semibold">{forecast.temp}</p></div>
            <div><span className="text-gray-400 font-bold uppercase text-xs">Wind</span><p className="text-gray-700 font-semibold">{forecast.wind}</p></div>
          </div>
          <div className="bg-sky-50 rounded-2xl px-4 py-3 text-sm text-sky-800">
            <span className="font-bold">Advice: </span>{forecast.tip}
          </div>
        </div>
      )}
    />
  );
}
