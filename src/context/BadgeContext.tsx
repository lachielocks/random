"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const ALL_BADGES: Record<string, Badge> = {
  banana: { id: "banana", name: "Banana Republic", emoji: "🍌", description: "You found the banana page." },
  secret: { id: "secret", name: "Secret Agent", emoji: "🕵️", description: "You found the secret." },
  "totally-not-a-secret": { id: "totally-not-a-secret", name: "Definitely Not Suspicious", emoji: "👀", description: "Nothing to see here." },
  "council-of-ducks": { id: "council-of-ducks", name: "Council Member", emoji: "🦆", description: "You have been initiated into the Council." },
};

interface BadgeContextValue {
  unlocked: Set<string>;
  unlock: (id: string) => void;
  newBadge: Badge | null;
  clearNew: () => void;
}

const BadgeContext = createContext<BadgeContextValue>({
  unlocked: new Set(),
  unlock: () => {},
  newBadge: null,
  clearNew: () => {},
});

const STORAGE_KEY = "random-stuff-badges";

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      setUnlocked(new Set(stored));
    } catch {
      // ignore
    }
  }, []);

  const unlock = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {}
      const badge = ALL_BADGES[id];
      if (badge) setNewBadge(badge);
      return next;
    });
  }, []);

  const clearNew = useCallback(() => setNewBadge(null), []);

  return (
    <BadgeContext.Provider value={{ unlocked, unlock, newBadge, clearNew }}>
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadges() {
  return useContext(BadgeContext);
}
