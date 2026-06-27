import {
  ArrowRight, BookOpen, Brain, Terminal, Cookie, Dice6, Star,
  MessageSquareWarning, Scroll, Waves, UserRound, Monitor, MousePointer, Bird, Wheat, Trophy,
  Briefcase, Calendar, Key, Mail, Cloud, Lightbulb, Languages, Grid3x3, PawPrint, GitBranch,
  Dices, Search, HelpCircle,
} from "lucide-react";
import type { ElementType } from "react";
import { dailyIndex } from "@/lib/daily-seed";

export interface Tool {
  href: string;
  Icon: ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
  border: string;
  hidden?: boolean;
}

export const tools: Tool[] = [
  { href: "/excuses",    Icon: BookOpen,             title: "School Excuse Generator",   description: "Professionally crafted excuses for not doing your homework.",       color: "from-yellow-400 to-orange-500",  bg: "bg-yellow-50 hover:bg-yellow-100", border: "border-yellow-200" },
  { href: "/facts",      Icon: Brain,                title: "Useless Facts",             description: "Facts you'll never need but will never forget.",                    color: "from-blue-400 to-cyan-500",      bg: "bg-blue-50 hover:bg-blue-100",     border: "border-blue-200" },
  { href: "/hacker",     Icon: Terminal,             title: "Fake Hacker Mode",          description: "Chaos mode: type random keys. Terminal mode: actually hack stuff.", color: "from-green-500 to-emerald-700",  bg: "bg-green-50 hover:bg-green-100",   border: "border-green-200" },
  { href: "/fortune",    Icon: Cookie,               title: "Fortune Cookie Machine",    description: "Crack open a cookie. Receive wisdom you didn't ask for.",           color: "from-amber-400 to-yellow-500",   bg: "bg-amber-50 hover:bg-amber-100",   border: "border-amber-200" },
  { href: "/decisions",  Icon: Dice6,                title: "Random Decision Maker",     description: "Add your options. Let fate decide. Blame fate.",                    color: "from-violet-500 to-purple-600",  bg: "bg-violet-50 hover:bg-violet-100", border: "border-violet-200" },
  { href: "/cheese",     Icon: Star,                 title: "Cheese Rating Scale",       description: "Pompous reviews of cheeses. Rate them on a rigorous scale.",        color: "from-yellow-500 to-lime-500",    bg: "bg-lime-50 hover:bg-lime-100",     border: "border-lime-200" },
  { href: "/complaints", Icon: MessageSquareWarning, title: "Complaint Generator",       description: "Formally articulate your grievances about printers and queues.",    color: "from-red-400 to-rose-500",       bg: "bg-red-50 hover:bg-red-100",       border: "border-red-200" },
  { href: "/history",    Icon: Scroll,               title: "Fake History Facts",          description: "Plausible. Detailed. Completely made up. Do not cite in essays.",   color: "from-stone-500 to-amber-700",    bg: "bg-stone-50 hover:bg-stone-100",   border: "border-stone-200" },
  { href: "/vibe",       Icon: Waves,                title: "Vibe Checker",              description: "What's your vibe today? The machine knows.",                        color: "from-pink-400 to-fuchsia-500",   bg: "bg-pink-50 hover:bg-pink-100",     border: "border-pink-200" },
  { href: "/identity",   Icon: UserRound,            title: "Identity Generator",        description: 'You are now Lachlan "The Ferocious Turnip" Smith. Professional Escalator Tester.', color: "from-indigo-500 to-blue-600", bg: "bg-indigo-50 hover:bg-indigo-100", border: "border-indigo-200" },
  { href: "/loading",    Icon: Monitor,              title: "Fake OS Screens",           description: "Windows updates, BSODs, macOS, Ubuntu, BIOS. All fake. Very convincing.", color: "from-gray-600 to-gray-900", bg: "bg-gray-50 hover:bg-gray-100",     border: "border-gray-200" },
  { href: "/button",     Icon: MousePointer,         title: "Find the Invisible Button", description: "The whole page is blank. There's a button somewhere. Good luck.", color: "from-rose-400 to-pink-600",   bg: "bg-rose-50 hover:bg-rose-100",     border: "border-rose-200" },
  { href: "/duck",       Icon: Bird,                 title: "Duck Cam",                  description: "Not a real camera. Just ducks. They change occasionally.",          color: "from-sky-400 to-blue-500",       bg: "bg-sky-50 hover:bg-sky-100",       border: "border-sky-200" },
  { href: "/championship", Icon: Trophy,             title: "Button Click Championship", description: "Global counter. No purpose. Just clicks. Every one recorded forever.", color: "from-yellow-400 to-amber-500", bg: "bg-yellow-50 hover:bg-yellow-100", border: "border-yellow-200" },
  { href: "/bread",      Icon: Wheat,                title: "Almighty Bread",            description: "The bread falling over GIF. And many more. All hail bread.",         color: "from-amber-400 to-orange-500",   bg: "bg-amber-50 hover:bg-amber-100",   border: "border-amber-200" },
  { href: "/corporate",  Icon: Briefcase,            title: "Corporate Buzzword Generator", description: "Mission statements, OKRs, and synergy slides that mean nothing.", color: "from-slate-500 to-zinc-700",     bg: "bg-slate-50 hover:bg-slate-100",   border: "border-slate-200" },
  { href: "/meeting",    Icon: Calendar,             title: "Meeting Invite Generator",  description: "Calendar invites for meetings that should have been emails.",       color: "from-teal-400 to-cyan-600",      bg: "bg-teal-50 hover:bg-teal-100",     border: "border-teal-200" },
  { href: "/password",   Icon: Key,                  title: "Terrible Password Generator", description: "Password123! but worse. Security experts hate this one trick.",   color: "from-red-500 to-orange-600",     bg: "bg-red-50 hover:bg-red-100",       border: "border-red-200" },
  { href: "/apology",    Icon: Mail,                 title: "Formal Apology Generator",  description: "I regret to inform you that I ate your sandwich. Professionally.", color: "from-purple-400 to-violet-600",  bg: "bg-purple-50 hover:bg-purple-100", border: "border-purple-200" },
  { href: "/weather",    Icon: Cloud,                title: "Fake Weather Forecast",     description: "Partly cloudy with a 40% chance of existential dread.",             color: "from-sky-300 to-indigo-500",     bg: "bg-sky-50 hover:bg-sky-100",       border: "border-sky-200" },
  { href: "/invention",  Icon: Lightbulb,            title: "Useless Invention Patent",  description: "Patent descriptions for gadgets nobody needs.",                     color: "from-amber-500 to-yellow-600",   bg: "bg-amber-50 hover:bg-amber-100",   border: "border-amber-200" },
  { href: "/translator", Icon: Languages,            title: "British ↔ American Translator", description: "Queue → line. Plus nonsense regional variants.",              color: "from-blue-500 to-red-500",       bg: "bg-blue-50 hover:bg-blue-100",     border: "border-blue-200" },
  { href: "/bingo",      Icon: Grid3x3,              title: "Meeting Bingo",             description: "Printable bingo cards for corporate meetings.",                     color: "from-emerald-400 to-green-600",  bg: "bg-emerald-50 hover:bg-emerald-100", border: "border-emerald-200" },
  { href: "/pet",        Icon: PawPrint,             title: "Random Pet Generator",      description: "Name, species, stats. Lightweight Pokémon energy.",                 color: "from-orange-400 to-pink-500",    bg: "bg-orange-50 hover:bg-orange-100", border: "border-orange-200" },
  { href: "/conspiracy", Icon: GitBranch,            title: "Conspiracy Board",          description: "Connect random facts with red string. It all makes sense.",         color: "from-red-600 to-gray-800",       bg: "bg-red-50 hover:bg-red-100",       border: "border-red-200" },
  { href: "/quiz",       Icon: HelpCircle,           title: "Which Tool Are You?",       description: "5 silly questions. Discover your true random-tool identity.",       color: "from-fuchsia-400 to-purple-600", bg: "bg-fuchsia-50 hover:bg-fuchsia-100", border: "border-fuchsia-200" },
];

export const publicToolPaths = tools.map((t) => t.href);

export function getToolOfTheDay(): Tool {
  return tools[dailyIndex(tools.length, "tool-of-day")];
}

// Re-export icons used on homepage extras
export { ArrowRight, Dices, Search };
