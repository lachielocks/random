const VISITS_KEY = "random-stuff-visits";
const ORDER_KEY = "random-stuff-visit-order";
const ROULETTE_KEY = "random-stuff-roulette-count";

export function getVisitedTools(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(VISITS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function recordVisit(href: string): string[] {
  const path = href.replace(/\/$/, "") || "/";
  const visited = getVisitedTools();
  if (visited.includes(path)) return visited;
  const next = [...visited, path];
  try {
    localStorage.setItem(VISITS_KEY, JSON.stringify(next));
    const order: string[] = JSON.parse(localStorage.getItem(ORDER_KEY) ?? "[]");
    order.push(path);
    localStorage.setItem(ORDER_KEY, JSON.stringify(order.slice(-50)));
  } catch {
    // ignore
  }
  return next;
}

export function getVisitOrder(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ORDER_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function getRouletteCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    return Number(localStorage.getItem(ROULETTE_KEY) ?? "0");
  } catch {
    return 0;
  }
}

export function incrementRouletteCount(): number {
  const next = getRouletteCount() + 1;
  try {
    localStorage.setItem(ROULETTE_KEY, String(next));
  } catch {
    // ignore
  }
  return next;
}
