import type { Tool } from "@/lib/tools";

export interface QuizQuestion {
  question: string;
  options: { label: string; toolHref: string; weight: number }[];
}

export const questions: QuizQuestion[] = [
  {
    question: "It's Sunday night. You are:",
    options: [
      { label: "Crafting an elaborate excuse", toolHref: "/excuses", weight: 3 },
      { label: "Reading useless facts", toolHref: "/facts", weight: 3 },
      { label: "Clicking a button for no reason", toolHref: "/championship", weight: 2 },
      { label: "Staring at ducks", toolHref: "/duck", weight: 2 },
    ],
  },
  {
    question: "Your ideal superpower is:",
    options: [
      { label: "Fake hacking the mainframe", toolHref: "/hacker", weight: 3 },
      { label: "A new identity every day", toolHref: "/identity", weight: 3 },
      { label: "Knowing everyone's vibe", toolHref: "/vibe", weight: 2 },
      { label: "Finding invisible buttons", toolHref: "/button", weight: 2 },
    ],
  },
  {
    question: "At a party you are:",
    options: [
      { label: "Rating the cheese platter", toolHref: "/cheese", weight: 3 },
      { label: "Making up history", toolHref: "/history", weight: 3 },
      { label: "Filing a formal complaint about the music", toolHref: "/complaints", weight: 2 },
      { label: "Checking the vibe", toolHref: "/vibe", weight: 1 },
    ],
  },
  {
    question: "Your toxic trait is:",
    options: [
      { label: "Letting fate decide everything", toolHref: "/decisions", weight: 3 },
      { label: "Sending meeting invites", toolHref: "/meeting", weight: 3 },
      { label: "Connecting unrelated facts", toolHref: "/conspiracy", weight: 2 },
      { label: "Using terrible passwords", toolHref: "/password", weight: 2 },
    ],
  },
  {
    question: "Your legacy will be:",
    options: [
      { label: "A fortune cookie quote", toolHref: "/fortune", weight: 2 },
      { label: "A global click count", toolHref: "/championship", weight: 3 },
      { label: "Bread memes", toolHref: "/bread", weight: 3 },
      { label: "A conspiracy board", toolHref: "/conspiracy", weight: 2 },
    ],
  },
];

export const resultDescriptions: Record<string, string> = {
  "/excuses": "You are the School Excuse Generator. Professionally crafted, morally flexible.",
  "/facts": "You are Useless Facts. True, unnecessary, unforgettable.",
  "/hacker": "You are Fake Hacker Mode. ACCESS GRANTED. (not really)",
  "/fortune": "You are the Fortune Cookie Machine. Wisdom you didn't ask for.",
  "/decisions": "You are the Decision Maker. Fate's spokesperson.",
  "/cheese": "You are the Cheese Rating Scale. Pompous. Rigorous. Correct.",
  "/complaints": "You are the Complaint Generator. The printer wronged you.",
  "/history": "You are Fake History. Plausible. Cited in zero essays.",
  "/vibe": "You are the Vibe Checker. You know. You always knew.",
  "/identity": "You are the Identity Generator. Lachlan 'The Ferocious Turnip' Smith.",
  "/loading": "You are Fake OS Screens. Updating... 47%... forever.",
  "/button": "You are the Invisible Button. Hidden. Elusive. Found eventually.",
  "/duck": "You are Duck Cam. Not a camera. Just ducks.",
  "/championship": "You are the Click Championship. No purpose. Just clicks.",
  "/bread": "You are Almighty Bread. All hail.",
  "/corporate": "You are Corporate Buzzwords. Synergistic. Scalable. Empty.",
  "/meeting": "You are a Meeting Invite. Could have been an email.",
  "/password": "You are a Terrible Password. Cracked in 0.003 seconds.",
  "/apology": "You are a Formal Apology. Sincere. Inadequate.",
  "/weather": "You are Fake Weather. 40% chance of existential dread.",
  "/invention": "You are a Useless Patent. Nobody asked for this.",
  "/translator": "You are the Translator. Queue = line. Chaos ensues.",
  "/bingo": "You are Meeting Bingo. Someone just said 'synergy'.",
  "/pet": "You are a Random Pet. Chaotic good. Snack-driven.",
  "/conspiracy": "You are the Conspiracy Board. Red string required.",
  "/quiz": "You are this quiz. Very meta. Well done.",
};

export function computeResult(answers: number[]): string {
  const scores: Record<string, number> = {};
  questions.forEach((q, qi) => {
    const idx = answers[qi];
    if (idx === undefined) return;
    const opt = q.options[idx];
    if (!opt) return;
    scores[opt.toolHref] = (scores[opt.toolHref] ?? 0) + opt.weight;
  });
  let best = "/facts";
  let bestScore = -1;
  for (const [href, score] of Object.entries(scores)) {
    if (score > bestScore) {
      best = href;
      bestScore = score;
    }
  }
  return best;
}

export function getToolTitle(href: string, tools: Tool[]): string {
  return tools.find((t) => t.href === href)?.title ?? "Random Stuff";
}
