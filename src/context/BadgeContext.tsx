"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const ALL_BADGES: Record<string, Badge> = {
  banana:               { id: "banana",               name: "Banana Republic",          emoji: "🍌", description: "You found the banana page." },
  secret:               { id: "secret",               name: "Secret Agent",             emoji: "🕵️", description: "You found the secret." },
  "totally-not-a-secret":{ id: "totally-not-a-secret", name: "Definitely Not Suspicious", emoji: "👀", description: "Nothing to see here." },
  "council-of-ducks":   { id: "council-of-ducks",     name: "Council Member",           emoji: "🦆", description: "You have been initiated into the Council." },
};

interface BadgeContextValue {
  unlockedIds: string[];
  unlock: (id: string) => void;
  newBadge: Badge | null;
  clearNew: () => void;
}

const BadgeContext = createContext<BadgeContextValue>({
  unlockedIds: [],
  unlock: () => {},
  newBadge: null,
  clearNew: () => {},
});

const STORAGE_KEY = "random-stuff-badges";

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      setUnlockedIds(stored);
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const unlock = useCallback((id: string) => {
    if (!loaded) return;
    setUnlockedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    // Trigger newBadge notification separately — never inside a state updater
    setNewBadge((current) => {
      if (current) return current; // don't overwrite an unread badge
      const badge = ALL_BADGES[id];
      return badge ?? null;
    });
  }, [loaded]);

  const clearNew = useCallback(() => setNewBadge(null), []);

  return (
    <BadgeContext.Provider value={{ unlockedIds, unlock, newBadge, clearNew }}>
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadges() {
  return useContext(BadgeContext);
}
