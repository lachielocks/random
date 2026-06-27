/** Deterministic daily seed — same result for everyone on a given day. */
export function dailySeed(extra = ""): number {
  const d = new Date();
  const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}${extra}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function dailyPick<T>(items: T[], extra = ""): T {
  return items[dailySeed(extra) % items.length];
}

export function dailyIndex(count: number, extra = ""): number {
  return dailySeed(extra) % count;
}
