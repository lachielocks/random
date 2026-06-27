"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordVisit, getVisitedTools, getVisitOrder } from "@/lib/visits";
import { publicToolPaths } from "@/lib/tools";
import { useBadges } from "@/context/BadgeContext";
import { getSupabase } from "@/lib/supabase";

export function VisitTracker() {
  const pathname = usePathname();
  const { unlock, hydrated } = useBadges();

  useEffect(() => {
    if (!pathname || pathname === "/") return;

    recordVisit(pathname);

    // Analytics (fire and forget, client-only)
    const sb = getSupabase();
    if (sb) sb.from("page_views").insert({ path: pathname }).then(() => {});

    if (!hydrated) return;

    const visited = getVisitedTools();
    const allVisited = publicToolPaths.every((p) => visited.includes(p));
    if (allVisited) unlock("explorer");

    const order = getVisitOrder();
    const last3 = order.slice(-3);
    if (last3.join(",") === "/excuses,/facts,/duck") {
      unlock("order-seeker");
    }
  }, [pathname, unlock, hydrated]);

  return null;
}
