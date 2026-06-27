"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  hint?: string;
}

export const ALL_BADGES: Record<string, Badge> = {
  banana:                { id: "banana",                name: "Banana Republic",           emoji: "🍌", description: "You found the banana page.", hint: "Fruit URLs exist." },
  secret:                  { id: "secret",                  name: "Secret Agent",              emoji: "🕵️", description: "You found the secret.", hint: "Some pages aren't on the menu." },
  "totally-not-a-secret":  { id: "totally-not-a-secret",  name: "Definitely Not Suspicious", emoji: "👀", description: "Nothing to see here.", hint: "It's totally not a secret." },
  "council-of-ducks":      { id: "council-of-ducks",      name: "Council Member",            emoji: "🦆", description: "You have been initiated into the Council.", hint: "The ducks know things." },
  konami:                  { id: "konami",                  name: "Retro Gamer",               emoji: "🎮", description: "You entered the Konami code.", hint: "↑↑↓↓←→←→BA" },
  "duck-typist":           { id: "duck-typist",           name: "Duck Whisperer",            emoji: "🦆", description: "You typed 'duck' on the homepage.", hint: "Quack at the homepage." },
  explorer:                { id: "explorer",                name: "Completionist",             emoji: "🗺️", description: "You visited every public tool.", hint: "See them all." },
  "speed-finder":          { id: "speed-finder",          name: "Eagle Eye",                 emoji: "👁️", description: "Found the invisible button in under 10 seconds.", hint: "Speed matters." },
  "click-centurion":       { id: "click-centurion",       name: "Click Centurion",           emoji: "💯", description: "100 clicks in the championship.", hint: "Click with conviction." },
  "worse-dark":            { id: "worse-dark",            name: "Survivor",                  emoji: "🌑", description: "Survived 30 seconds of Worse Dark Mode.", hint: "Embrace the chaos." },
  "quiz-master":           { id: "quiz-master",           name: "Self-Aware",                emoji: "🪞", description: "You discovered which tool you are.", hint: "Know thyself." },
  "conspiracy-theorist":   { id: "conspiracy-theorist",   name: "Conspiracy Theorist",       emoji: "🧵", description: "You connected the dots. All of them.", hint: "Red string required." },
  "certified-random":      { id: "certified-random",      name: "Certified Random",          emoji: "🎲", description: "Spun the roulette 5 times.", hint: "Let fate navigate." },
  "order-seeker":          { id: "order-seeker",          name: "Order Seeker",              emoji: "📜", description: "Visited excuses, facts, then duck — in order.", hint: "Sequence matters." },
  "fake-404":              { id: "fake-404",              name: "Lost Explorer",             emoji: "🚧", description: "You found a page that claims to be a 404.", hint: "Not all 404s are lost." },
  "terminal-secrets":      { id: "terminal-secrets",      name: "Root Access",               emoji: "💻", description: "Discovered hidden terminal commands.", hint: "Type help in the terminal." },
};

const STORAGE_KEY = "random-stuff-badges";

function readBadges(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeBadges(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore quota / private mode
  }
}

interface BadgeContextValue {
  unlockedIds: string[];
  unlock: (id: string) => boolean;
  has: (id: string) => boolean;
  newBadge: Badge | null;
  clearNew: () => void;
  hydrated: boolean;
}

const BadgeContext = createContext<BadgeContextValue>({
  unlockedIds: [],
  unlock: () => false,
  has: () => false,
  newBadge: null,
  clearNew: () => {},
  hydrated: false,
});

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const pendingUnlocks = useRef<string[]>([]);

  const unlock = useCallback((id: string): boolean => {
    if (!ALL_BADGES[id]) return false;

    if (!hydrated) {
      const stored = readBadges();
      if (stored.includes(id)) return false;
      if (!pendingUnlocks.current.includes(id)) {
        pendingUnlocks.current.push(id);
        const next = [...stored, id];
        writeBadges(next);
        setUnlockedIds(next);
      }
      setNewBadge((current) => current ?? ALL_BADGES[id] ?? null);
      return true;
    }

    let wasNew = false;
    setUnlockedIds((prev) => {
      if (prev.includes(id)) return prev;
      wasNew = true;
      const next = [...prev, id];
      writeBadges(next);
      return next;
    });

    if (wasNew) {
      setNewBadge((current) => current ?? ALL_BADGES[id] ?? null);
    }
    return wasNew;
  }, [hydrated]);

  const has = useCallback((id: string) => unlockedIds.includes(id), [unlockedIds]);

  const clearNew = useCallback(() => setNewBadge(null), []);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const stored = readBadges();
    setUnlockedIds(stored);
    setHydrated(true);

    if (pendingUnlocks.current.length > 0) {
      const toAdd = pendingUnlocks.current.filter((id) => !stored.includes(id) && ALL_BADGES[id]);
      pendingUnlocks.current = [];
      if (toAdd.length > 0) {
        const next = [...stored, ...toAdd];
        writeBadges(next);
        setUnlockedIds(next);
        setNewBadge(ALL_BADGES[toAdd[toAdd.length - 1]] ?? null);
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) unlock(id);
    };
    window.addEventListener("badge-unlock", handler);
    return () => window.removeEventListener("badge-unlock", handler);
  }, [unlock]);

  return (
    <BadgeContext.Provider value={{ unlockedIds, unlock, has, newBadge, clearNew, hydrated }}>
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadges() {
  return useContext(BadgeContext);
}
