"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

type LineKind = "text" | "progress" | "success" | "warn" | "error" | "divider";

interface Line {
  id: number;
  kind: LineKind;
  text: string;
  progress?: number; // 0-100
}

const MESSAGES: string[] = [
  "ACCESSING MAINFRAME",
  "DOWNLOADING PENGUINS",
  "ENHANCING BANANA SECURITY",
  "BYPASSING FIREWALL",
  "REROUTING THROUGH MOSCOW",
  "COMPILING NONSENSE",
  "UPLOADING CONFUSION",
  "HACKING THE PLANET",
  "DECRYPTING CHEESE DATABASE",
  "CONTACTING THE COUNCIL OF DUCKS",
  "DEPLOYING COUNTERMEASURES",
  "INITIATING PROTOCOL 47",
  "REVERSING THE POLARITY",
  "TRIANGULATING SIGNAL",
  "OVERRIDING SAFETY PROTOCOLS",
  "INSTALLING BACKDOOR",
  "EXFILTRATING SPREADSHEETS",
  "CRACKING 128-BIT ENCRYPTION",
  "INJECTING VARIABLES",
  "SPOOFING MAC ADDRESS",
  "BRUTE FORCING PASSWORD",
  "CLONING HARD DRIVE",
  "WIPING LOGS",
  "EXECUTING PAYLOAD",
  "ESTABLISHING SECURE TUNNEL",
  "PROXYING THROUGH SEVENTEEN COUNTRIES",
  "BOUNCING SIGNAL OFF SATELLITE",
  "ALLOCATING RAM",
  "DEFRAGMENTING INTRUSION",
  "CONVERTING TO HEX",
  "MINING CRYPTOCURRENCY",
  "SCRAPING DARK WEB",
  "INITIALISING SELF-DESTRUCT SEQUENCE",
  "REWRITING HISTORY",
  "SIMULATING QUANTUM ENTANGLEMENT",
  "INCREASING CLOCK SPEED",
  "OVERCLOCKING CPU",
  "SEIZING CONTROL OF TRAFFIC LIGHTS",
  "DISABLING CCTV CAMERAS",
  "OPENING ALL GARAGE DOORS SIMULTANEOUSLY",
  "DOWNLOADING MORE RAM",
  "HACKING THE GIBSON",
  "ACCESSING THE MAINFRAME'S MAINFRAME",
  "DISABLING CAPS LOCK",
  "REPROGRAMMING SMART FRIDGE",
  "TAKING CONTROL OF ROOMBA ARMY",
  "UPLOADING VIRUS TO ALIEN SPACECRAFT",
  "CALCULATING TRAJECTORY",
  "PIGGYBACKING ON NASA SIGNAL",
  "INTERCEPTING SATELLITE UPLINK",
  "DECODING TRANSMISSION",
  "DEPLOYING HONEYPOT",
  "EXITING SIMULATION",
  "CRACKING NUCLEAR LAUNCH CODES",
  "ACCESSING RESTRICTED DATABASE",
  "ERASING DIGITAL FOOTPRINT",
  "REWRITING KERNEL",
  "REDIRECTING POWER GRID",
  "SIPHONING WIFI FROM NEIGHBOURS",
  "ACTIVATING SLEEPER AGENTS",
  "INITIATING HANDSHAKE",
  "SYNCHRONISING WATCHES",
  "BREAKING RSA ENCRYPTION",
  "FORGING DIGITAL SIGNATURE",
  "SPAWNING WORKER THREADS",
  "PURGING CACHE",
  "FLUSHING DNS",
  "PINGING GOOGLE",
  "TRACEROUTING THE SHADOW REALM",
  "SENDING ANONYMOUS TIP",
  "FABRICATING EVIDENCE",
  "PLANTING FALSE FLAG",
  "COVERING TRACKS",
  "GENERATING PLAUSIBLE DENIABILITY",
  "EXECUTING MAN-IN-THE-MIDDLE ATTACK",
  "POISONING ARP TABLE",
  "FORGING PACKETS",
  "JAMMING FREQUENCIES",
  "SPINNING UP DOCKER CONTAINERS",
  "CONTAINERISING SECRETS",
  "ORCHESTRATING KUBERNETES CLUSTER",
  "DEPLOYING MICROSERVICES",
  "POPULATING BLOCKCHAIN",
  "MINTING NFT OF YOUR PASSWORDS",
  "FEEDING PASSWORDS TO NEURAL NETWORK",
  "TRAINING MODEL ON SENSITIVE DATA",
  "GENERATING DEEPFAKE",
  "SYNTHESISING VOICE",
  "CLONING IDENTITY",
  "ASSUMING DIRECT CONTROL",
  "ROUTING AROUND CENSORSHIP",
  "ESTABLISHING VPN",
  "ONIONISING PACKETS",
  "GOING DARK",
  "ENTERING STEALTH MODE",
  "DISABLING TELEMETRY",
  "CLEARING COOKIES",
  "INCOGNITO MODE ACTIVATED",
  "DELETING BROWSER HISTORY",
  "BURNING PHONE",
  "SMASHING HARD DRIVE WITH HAMMER",
  "THROWING LAPTOP INTO RIVER",
  "GOING OFF-GRID",
];

const SUCCESS: string[] = [
  "ACCESS GRANTED",
  "FIREWALL BYPASSED",
  "ENCRYPTION BROKEN",
  "MAINFRAME COMPROMISED",
  "SYSTEM OWNED",
  "ROOT ACCESS OBTAINED",
  "BACKDOOR INSTALLED",
  "OBJECTIVE COMPLETE",
  "DOWNLOAD COMPLETE",
  "IDENTITY CONFIRMED",
  "CONNECTION ESTABLISHED",
];

const WARNINGS: string[] = [
  "INTRUSION DETECTED — REROUTING",
  "HONEYPOT DETECTED — EVADING",
  "TRACE INITIATED — ACCELERATING",
  "FIREWALL ADAPTING — OVERRIDING",
  "ANTIVIRUS DETECTED — DISGUISING",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function progressBar(pct: number): string {
  const filled = Math.round(pct / 5);
  return "█".repeat(filled) + "░".repeat(20 - filled);
}

let idCounter = 0;
function nextId() { return ++idCounter; }

export default function HackerPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [started, setStarted] = useState(false);
  const [keyCount, setKeyCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const usedMessages = useRef(new Set<string>());

  const addLine = useCallback(() => {
    const roll = Math.random();

    let newLine: Line;

    if (roll < 0.55) {
      // plain status message
      const available = MESSAGES.filter((m) => !usedMessages.current.has(m));
      const pool = available.length > 0 ? available : MESSAGES;
      const msg = pickRandom(pool);
      usedMessages.current.add(msg);
      if (usedMessages.current.size >= MESSAGES.length) usedMessages.current.clear();
      newLine = { id: nextId(), kind: "text", text: `> ${msg}...` };
    } else if (roll < 0.78) {
      // progress bar
      const pct = Math.floor(Math.random() * 91) + 10;
      const msg = pickRandom(MESSAGES);
      newLine = { id: nextId(), kind: "progress", text: msg, progress: pct };
    } else if (roll < 0.88) {
      // success
      newLine = { id: nextId(), kind: "success", text: `✓ ${pickRandom(SUCCESS)}` };
    } else if (roll < 0.96) {
      // warning
      newLine = { id: nextId(), kind: "warn", text: `⚠ ${pickRandom(WARNINGS)}` };
    } else {
      // divider
      newLine = { id: nextId(), kind: "divider", text: "─".repeat(52) };
    }

    setLines((prev) => [...prev.slice(-120), newLine]);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      setStarted(true);
      setKeyCount((k) => k + 1);
      addLine();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [addLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <main className="min-h-screen bg-black flex flex-col text-green-400" style={{ fontFamily: "monospace" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-900 bg-black/80 sticky top-0 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-green-600 hover:text-green-400 transition-colors"
          style={{ fontFamily: "monospace" }}
        >
          <ArrowLeft size={12} /> EXIT TERMINAL
        </Link>
        <div className="flex items-center gap-3 text-xs text-green-700">
          <Terminal size={12} />
          <span>KEYSTROKES: <span className="text-green-400">{keyCount}</span></span>
          <span className="text-green-900">|</span>
          <span>STATUS: <span className={started ? "text-green-400" : "text-green-800"}>
            {started ? "HACKING..." : "STANDBY"}
          </span></span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="flex-1 px-4 py-4 overflow-y-auto text-sm leading-relaxed">
        {/* Boot header */}
        <div className="text-green-600 text-xs mb-4 space-y-0.5">
          <p>HACKTERM v4.2.0 — ULTRA HACKER EDITION</p>
          <p>KERNEL: linux-hacker-6.6.6-ultra</p>
          <p>SECURITY LEVEL: MAXIMUM</p>
          <p>{"─".repeat(52)}</p>
        </div>

        {!started && (
          <div className="mt-16 text-center space-y-3">
            <p className="text-green-500 text-lg animate-pulse">[ START TYPING TO BEGIN HACKING ]</p>
            <p className="text-green-800 text-xs">any key will do. it doesn&apos;t matter which one.</p>
          </div>
        )}

        <div className="space-y-0.5">
          {lines.map((line) => {
            if (line.kind === "text") {
              return (
                <p key={line.id} className="text-green-400 text-sm">
                  {line.text}
                </p>
              );
            }
            if (line.kind === "progress") {
              return (
                <p key={line.id} className="text-cyan-400 text-sm">
                  [{progressBar(line.progress!)}] {line.progress}% {line.text}
                </p>
              );
            }
            if (line.kind === "success") {
              return (
                <p key={line.id} className="text-green-300 font-bold text-sm">
                  {line.text}
                </p>
              );
            }
            if (line.kind === "warn") {
              return (
                <p key={line.id} className="text-yellow-400 text-sm">
                  {line.text}
                </p>
              );
            }
            if (line.kind === "error") {
              return (
                <p key={line.id} className="text-red-400 text-sm">
                  {line.text}
                </p>
              );
            }
            if (line.kind === "divider") {
              return (
                <p key={line.id} className="text-green-900 text-sm">
                  {line.text}
                </p>
              );
            }
          })}
        </div>

        {started && (
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5 align-middle" />
        )}

        <div ref={bottomRef} />
      </div>
    </main>
  );
}
