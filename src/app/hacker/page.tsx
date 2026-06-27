"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, Zap } from "lucide-react";

// ─── CHAOS MODE ────────────────────────────────────────────────────────────────

const MESSAGES: string[] = [
  "ACCESSING MAINFRAME", "DOWNLOADING PENGUINS", "ENHANCING BANANA SECURITY",
  "BYPASSING FIREWALL", "REROUTING THROUGH MOSCOW", "COMPILING NONSENSE",
  "UPLOADING CONFUSION", "HACKING THE PLANET", "DECRYPTING CHEESE DATABASE",
  "CONTACTING THE COUNCIL OF DUCKS", "DEPLOYING COUNTERMEASURES",
  "INITIATING PROTOCOL 47", "REVERSING THE POLARITY", "TRIANGULATING SIGNAL",
  "OVERRIDING SAFETY PROTOCOLS", "INSTALLING BACKDOOR", "EXFILTRATING SPREADSHEETS",
  "CRACKING 128-BIT ENCRYPTION", "INJECTING VARIABLES", "SPOOFING MAC ADDRESS",
  "BRUTE FORCING PASSWORD", "CLONING HARD DRIVE", "WIPING LOGS",
  "EXECUTING PAYLOAD", "ESTABLISHING SECURE TUNNEL",
  "PROXYING THROUGH SEVENTEEN COUNTRIES", "BOUNCING SIGNAL OFF SATELLITE",
  "ALLOCATING RAM", "DEFRAGMENTING INTRUSION", "CONVERTING TO HEX",
  "MINING CRYPTOCURRENCY", "SCRAPING DARK WEB", "INITIALISING SELF-DESTRUCT",
  "REWRITING HISTORY", "SIMULATING QUANTUM ENTANGLEMENT", "INCREASING CLOCK SPEED",
  "SEIZING CONTROL OF TRAFFIC LIGHTS", "DISABLING CCTV CAMERAS",
  "OPENING ALL GARAGE DOORS SIMULTANEOUSLY", "DOWNLOADING MORE RAM",
  "HACKING THE GIBSON", "ACCESSING THE MAINFRAME'S MAINFRAME",
  "REPROGRAMMING SMART FRIDGE", "TAKING CONTROL OF ROOMBA ARMY",
  "UPLOADING VIRUS TO ALIEN SPACECRAFT", "PIGGYBACKING ON NASA SIGNAL",
  "INTERCEPTING SATELLITE UPLINK", "DECODING TRANSMISSION",
  "CRACKING NUCLEAR LAUNCH CODES", "ERASING DIGITAL FOOTPRINT",
  "REDIRECTING POWER GRID", "SIPHONING WIFI FROM NEIGHBOURS",
  "ACTIVATING SLEEPER AGENTS", "BREAKING RSA ENCRYPTION",
  "SPAWNING WORKER THREADS", "FLUSHING DNS", "PINGING GOOGLE",
  "TRACEROUTING THE SHADOW REALM", "FABRICATING EVIDENCE",
  "COVERING TRACKS", "GENERATING PLAUSIBLE DENIABILITY",
  "EXECUTING MAN-IN-THE-MIDDLE ATTACK", "POISONING ARP TABLE",
  "JAMMING FREQUENCIES", "SPINNING UP DOCKER CONTAINERS",
  "ORCHESTRATING KUBERNETES CLUSTER", "MINTING NFT OF YOUR PASSWORDS",
  "FEEDING PASSWORDS TO NEURAL NETWORK", "GENERATING DEEPFAKE",
  "ASSUMING DIRECT CONTROL", "GOING DARK", "ENTERING STEALTH MODE",
  "CLEARING COOKIES", "INCOGNITO MODE ACTIVATED", "BURNING PHONE",
];

const SUCCESS = ["ACCESS GRANTED","FIREWALL BYPASSED","ENCRYPTION BROKEN","MAINFRAME COMPROMISED","SYSTEM OWNED","ROOT ACCESS OBTAINED","BACKDOOR INSTALLED","OBJECTIVE COMPLETE","DOWNLOAD COMPLETE","CONNECTION ESTABLISHED"];
const WARNINGS = ["INTRUSION DETECTED — REROUTING","HONEYPOT DETECTED — EVADING","TRACE INITIATED — ACCELERATING","FIREWALL ADAPTING — OVERRIDING","ANTIVIRUS DETECTED — DISGUISING"];

type ChaosLine = { id: number; kind: "text" | "progress" | "success" | "warn" | "divider"; text: string; progress?: number };
let _id = 0;

function bar(pct: number) { return "█".repeat(Math.round(pct / 5)) + "░".repeat(20 - Math.round(pct / 5)); }
function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }

function ChaosMode() {
  const [lines, setLines] = useState<ChaosLine[]>([]);
  const [started, setStarted] = useState(false);
  const [keyCount, setKeyCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const used = useRef(new Set<string>());

  const addLine = useCallback(() => {
    const r = Math.random();
    let line: ChaosLine;
    if (r < 0.55) {
      const pool = MESSAGES.filter((m) => !used.current.has(m));
      const msg = pick(pool.length > 0 ? pool : MESSAGES);
      used.current.add(msg);
      if (used.current.size >= MESSAGES.length) used.current.clear();
      line = { id: ++_id, kind: "text", text: `> ${msg}...` };
    } else if (r < 0.78) {
      line = { id: ++_id, kind: "progress", text: pick(MESSAGES), progress: 10 + Math.floor(Math.random() * 91) };
    } else if (r < 0.88) {
      line = { id: ++_id, kind: "success", text: `✓ ${pick(SUCCESS)}` };
    } else if (r < 0.96) {
      line = { id: ++_id, kind: "warn", text: `⚠ ${pick(WARNINGS)}` };
    } else {
      line = { id: ++_id, kind: "divider", text: "─".repeat(52) };
    }
    setLines((prev) => [...prev.slice(-120), line]);
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

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  return (
    <div className="flex-1 px-4 py-4 overflow-y-auto text-sm leading-relaxed">
      <div className="text-green-600 text-xs mb-4 space-y-0.5">
        <p>HACKTERM CHAOS v4.2.0 — TYPE ANYTHING</p>
        <p>KEYSTROKES: <span className="text-green-400">{keyCount}</span> · STATUS: <span className={started ? "text-green-400" : "text-green-800"}>{started ? "HACKING..." : "STANDBY"}</span></p>
        <p>{"─".repeat(52)}</p>
      </div>
      {!started && (
        <div className="mt-16 text-center">
          <p className="text-green-500 text-lg animate-pulse">[ START TYPING TO BEGIN HACKING ]</p>
          <p className="text-green-800 text-xs mt-2">any key will do. the planet won&apos;t hack itself.</p>
        </div>
      )}
      <div className="space-y-0.5">
        {lines.map((l) => {
          if (l.kind === "text") return <p key={l.id} className="text-green-400">{l.text}</p>;
          if (l.kind === "progress") return <p key={l.id} className="text-cyan-400">[{bar(l.progress!)}] {l.progress}% {l.text}</p>;
          if (l.kind === "success") return <p key={l.id} className="text-green-300 font-bold">{l.text}</p>;
          if (l.kind === "warn") return <p key={l.id} className="text-yellow-400">{l.text}</p>;
          return <p key={l.id} className="text-green-900">{l.text}</p>;
        })}
      </div>
      {started && <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5 align-middle" />}
      <div ref={bottomRef} />
    </div>
  );
}

// ─── TERMINAL MODE ─────────────────────────────────────────────────────────────

type TLine = { type: "prompt" | "input" | "output" | "error" | "success" | "info"; text: string };

const FS: Record<string, string> = {
  "README.md": "# HACKTERM\nYou found the readme. There's nothing else here.\n\nGo hack something.",
  "classified.txt": "CLASSIFIED — EYES ONLY\n\nThe mainframe password is: password123\n\nPlease delete this file after reading.\n(do not delete this file)",
  "totally_legal_hack_tools.zip": "[binary data — 47.3 GB]\n\nContents: definitely legal software (trust us)",
  "passwords_definitely_not_real.txt": "facebook: password\ngmail: password1\nwork: Password1!\nnhs: password\nbank: iloveyou\n\n(These are not real. Hopefully.)",
  "penguin_army_plans.docx": "PENGUIN ARMY — STRATEGIC OVERVIEW\n\nPhase 1: Infiltrate the fish supply chain.\nPhase 2: ???\nPhase 3: Global waddling dominance.\n\nTimeline: Ongoing.",
  "mainframe_access.sh": "#!/bin/bash\n# Definitely accesses the mainframe\necho 'Accessing mainframe...'\nsleep 3\necho 'Just kidding, it\\'s a script that does nothing.'",
  "council_memo.txt": "COUNCIL OF DUCKS — INTERNAL MEMO\n\nRe: Bread orientation\nStatus: Ongoing concern\n\nThe cheese database has been compromised.\nVisit /the-council-of-ducks for initiation.\n\nQuack.",
  ".bash_history": "sudo rm -rf /\nls\nls -la\ncd ..\npwd\ncat classified.txt\nducks\nbread\ngoogle how to hack\ngoogle is hacking illegal\nclear",
};

const PROCESSES = [
  "  PID   USER     CMD",
  "    1   root     /sbin/init",
  "  337   root     /usr/sbin/sshd -D",
  "  842   root     nginx: master process",
  " 1204   root     python3 mainframe_access.py",
  " 1337   root     ./totally_legal_hack_tools",
  " 2048   root     penguin_army_coordinator --silent",
  " 9999   root     bash",
];

function processCommand(cmd: string, cwd: string, setCwd: (d: string) => void): TLine[] {
  const raw = cmd.trim();
  if (!raw) return [];
  const [prog, ...args] = raw.split(/\s+/);

  switch (prog) {
    case "help":
      return [
        { type: "output", text: "Available commands:" },
        { type: "output", text: "  help         show this help" },
        { type: "output", text: "  ls [-la]     list files" },
        { type: "output", text: "  cat <file>   read a file" },
        { type: "output", text: "  cd <dir>     change directory" },
        { type: "output", text: "  pwd          current directory" },
        { type: "output", text: "  whoami       identity check" },
        { type: "output", text: "  ps           running processes" },
        { type: "output", text: "  ping <host>  network check" },
        { type: "output", text: "  ifconfig     network interfaces" },
        { type: "output", text: "  neofetch     system info" },
        { type: "output", text: "  hack <target> initiate hack" },
        { type: "output", text: "  sudo <cmd>   run as superuser" },
        { type: "output", text: "  date         current date/time" },
        { type: "output", text: "  echo <text>  print text" },
        { type: "output", text: "  history      command history" },
        { type: "output", text: "  clear        clear terminal" },
        { type: "output", text: "  exit         exit terminal" },
        { type: "info",   text: "  ducks        contact the council" },
        { type: "info",   text: "  bread        hail bread" },
      ];

    case "whoami":
      return [{ type: "success", text: "root" }, { type: "output", text: "(obviously)" }];

    case "pwd":
      return [{ type: "output", text: `/home/root/${cwd === "~" ? "" : cwd}`.replace(/\/$/, "") || "/home/root" }];

    case "ls": {
      const detailed = args.includes("-la") || args.includes("-l") || args.includes("-a");
      if (detailed) {
        return [
          { type: "output", text: "total 94722" },
          { type: "output", text: "drwxr-xr-x  2 root root     4096 Jun 15 03:47 ." },
          { type: "output", text: "drwxr-xr-x 18 root root     4096 Jun 15 03:47 .." },
          { type: "output", text: "-rw-------  1 root root      512 Jun 15 03:47 .bash_history" },
          { type: "output", text: "-rw-r--r--  1 root root      847 Jun 14 22:13 README.md" },
          { type: "info",   text: "-rw-------  1 root root    16384 Jun 15 01:23 classified.txt" },
          { type: "output", text: "-rw-r--r--  1 root root 96935936 Jun 13 19:52 totally_legal_hack_tools.zip" },
          { type: "info",   text: "-rw-------  1 root root      256 Jun 14 22:00 passwords_definitely_not_real.txt" },
          { type: "output", text: "-rw-r--r--  1 root root     1024 Jun 15 02:34 penguin_army_plans.docx" },
          { type: "output", text: "-rwxr-xr-x  1 root root      128 Jun 15 03:00 mainframe_access.sh" },
        ];
      }
      return [
        { type: "output", text: "README.md  classified.txt  totally_legal_hack_tools.zip" },
        { type: "output", text: "passwords_definitely_not_real.txt  penguin_army_plans.docx  mainframe_access.sh" },
      ];
    }

    case "cat": {
      const file = args[0];
      if (!file) return [{ type: "error", text: "cat: missing operand" }];
      const content = FS[file];
      if (!content) return [{ type: "error", text: `cat: ${file}: No such file or directory` }];
      return content.split("\n").map((line) => ({ type: "output" as const, text: line }));
    }

    case "cd": {
      const dir = args[0] || "~";
      if (dir === "..") {
        setCwd("~");
        return [];
      }
      if (dir === "/" ) { setCwd("/"); return []; }
      setCwd(dir === "~" ? "~" : dir);
      return [];
    }

    case "ps":
      return PROCESSES.map((p) => ({ type: "output" as const, text: p }));

    case "ping": {
      const host = args[0] || "google.com";
      return [
        { type: "output", text: `PING ${host}: 56 data bytes` },
        { type: "output", text: `64 bytes from ${host}: icmp_seq=0 ttl=57 time=12.4 ms` },
        { type: "output", text: `64 bytes from ${host}: icmp_seq=1 ttl=57 time=11.8 ms` },
        { type: "output", text: `64 bytes from ${host}: icmp_seq=2 ttl=57 time=4823.2 ms` },
        { type: "error",  text: `Request timeout for icmp_seq 3` },
        { type: "output", text: `--- ${host} ping statistics ---` },
        { type: "output", text: `4 packets transmitted, 3 received, 25.0% packet loss` },
      ];
    }

    case "ifconfig":
      return [
        { type: "output", text: "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500" },
        { type: "output", text: "        inet 192.168.1.337  netmask 255.255.255.0  broadcast 192.168.1.255" },
        { type: "output", text: "        inet6 fe80::1337:dead:beef:cafe  prefixlen 64  scopeid 0x20<link>" },
        { type: "output", text: "        ether de:ad:be:ef:13:37  txqueuelen 1000  (Ethernet)" },
        { type: "output", text: "" },
        { type: "output", text: "lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536" },
        { type: "output", text: "        inet 127.0.0.1  netmask 255.0.0.0" },
      ];

    case "neofetch":
      return [
        { type: "success", text: "         .---.         root@hackterm" },
        { type: "success", text: "        /     \\        ─────────────" },
        { type: "success", text: "       | () () |       OS: HackOS 6.6.6-ultra" },
        { type: "success", text: "        \\  ^  /        Host: Definitely a Real Computer" },
        { type: "success", text: "         |||||         Kernel: linux-hacker-6.6.6" },
        { type: "success", text: "         |||||         Uptime: 13 days, 7 hours" },
        { type: "success", text: "                       Shell: bash 5.2.21 (hacked edition)" },
        { type: "success", text: "                       CPU: Intel Core i9-99999K @ ∞GHz" },
        { type: "success", text: "                       Memory: ∞ MB / ∞ MB" },
        { type: "success", text: "                       Disk: 100% full of secrets" },
      ];

    case "hack": {
      const target = args[0] || "mainframe";
      return [
        { type: "output", text: `Initiating hack sequence on: ${target}` },
        { type: "output", text: "Scanning for vulnerabilities..." },
        { type: "output", text: "[████████████████████] 100% SCAN COMPLETE" },
        { type: "output", text: "Vulnerabilities found: 47 (CRITICAL)" },
        { type: "output", text: "Exploiting CVE-2024-99999 (PENGUIN_OVERFLOW)..." },
        { type: "output", text: "[████████████████████] 100%" },
        { type: "success", text: `✓ ${target} has been hacked. Congratulations.` },
        { type: "output", text: "Please use this power responsibly." },
        { type: "output", text: "(We are legally required to say that.)" },
      ];
    }

    case "sudo": {
      const subcmd = args.join(" ");
      if (subcmd.includes("rm -rf /") || subcmd.includes("rm -rf/*")) {
        return [
          { type: "output", text: "nice try." },
          { type: "output", text: "(you are already root, this would have worked, but we caught it)" },
        ];
      }
      return [
        { type: "output", text: `sudo: executing: ${subcmd || "(nothing)"}` },
        { type: "success", text: "Permission granted. You are already root." },
        { type: "output", text: "(This changes nothing about your life.)" },
      ];
    }

    case "date":
      return [{ type: "output", text: new Date().toString() }];

    case "echo":
      return [{ type: "output", text: args.join(" ") || "" }];

    case "history":
      return [
        { type: "output", text: "    1  sudo rm -rf /" },
        { type: "output", text: "    2  ls" },
        { type: "output", text: "    3  ls -la" },
        { type: "output", text: "    4  cat classified.txt" },
        { type: "output", text: "    5  google how to hack" },
        { type: "output", text: "    6  google is hacking illegal" },
        { type: "output", text: "    7  clear" },
      ];

    case "exit":
      return [
        { type: "error", text: "There is no exit." },
        { type: "output", text: "You are already home." },
      ];

    case "matrix":
      return [
        { type: "success", text: "Wake up, Neo..." },
        { type: "success", text: "The Matrix has you." },
        { type: "success", text: "Follow the white rabbit." },
        { type: "output", text: "01001000 01100001 01100011 01101011" },
        { type: "output", text: "(nothing actually happened. sorry.)" },
      ];

    case "ducks":
      return [
        { type: "success", text: "CONTACTING COUNCIL OF DUCKS..." },
        { type: "output", text: "Signal established. Quack quack." },
        { type: "output", text: "Council says: visit /the-council-of-ducks" },
        { type: "output", text: "Also try /duck for live surveillance footage." },
        { type: "info",   text: ">>> SECRET COMMAND DISCOVERED <<<" },
      ];

    case "bread":
      return [
        { type: "success", text: "ALL HAIL BREAD" },
        { type: "output", text: "Bread orientation: SUBOPTIMAL" },
        { type: "output", text: "Recommended action: visit /bread immediately" },
        { type: "output", text: "The cheese database sends its regards." },
        { type: "info",   text: ">>> SECRET COMMAND DISCOVERED <<<" },
      ];

    case "man": {
      const topic = args[0];
      if (!topic) return [{ type: "error", text: "What manual page do you want?" }];
      return [
        { type: "output", text: `MAN(1)                   User Commands                  MAN(1)` },
        { type: "output", text: "" },
        { type: "output", text: `NAME: ${topic} — ${topic} does things, some of them intentional` },
        { type: "output", text: "" },
        { type: "output", text: "DESCRIPTION: Documentation is for people who didn't write the code." },
        { type: "output", text: "             Figure it out." },
        { type: "output", text: "" },
        { type: "output", text: "BUGS: Several. Known. Being addressed." },
        { type: "output", text: "      (They are not being addressed.)" },
      ];
    }

    case "clear":
      return [{ type: "prompt", text: "__CLEAR__" }];

    default:
      return [{ type: "error", text: `${prog}: command not found. Type 'help' for available commands.` }];
  }
}

function TerminalMode() {
  const [history, setHistory] = useState<TLine[]>([
    { type: "success", text: "HACKTERM v4.2.0 — INTERACTIVE MODE" },
    { type: "output", text: 'Type "help" to see what you can do here.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [cwd, setCwd] = useState("~");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const secretFound = useRef(false);

  // Badge unlock for secret commands
  const checkSecrets = useCallback((cmd: string) => {
    const c = cmd.trim().toLowerCase();
    if (["ducks", "bread"].includes(c) && !secretFound.current) {
      secretFound.current = true;
      // unlock via window event — TerminalMode can't easily use hook without making whole thing client
      try {
        const stored: string[] = JSON.parse(localStorage.getItem("random-stuff-badges") ?? "[]");
        if (!stored.includes("terminal-secrets")) {
          localStorage.setItem("random-stuff-badges", JSON.stringify([...stored, "terminal-secrets"]));
          window.dispatchEvent(new CustomEvent("badge-unlock", { detail: "terminal-secrets" }));
        }
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = useCallback(() => {
    const cmd = input.trim();
    setHistory((h) => [
      ...h,
      { type: "prompt", text: `root@hackterm:${cwd}# ${cmd}` },
    ]);

    if (cmd) {
      checkSecrets(cmd);
      setCmdHistory((h) => [cmd, ...h.slice(0, 49)]);
      const results = processCommand(cmd, cwd, setCwd);

      if (results.some((r) => r.text === "__CLEAR__")) {
        setHistory([]);
      } else {
        setHistory((h) => [...h, ...results]);
      }
    }

    setInput("");
    setHistIdx(-1);
  }, [input, cwd, checkSecrets]);

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { submit(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.min(i + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? "");
        return next;
      });
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : cmdHistory[next]);
        return next;
      });
    }
  }, [submit, cmdHistory]);

  const lineColor: Record<TLine["type"], string> = {
    prompt: "text-green-300",
    input:  "text-green-400",
    output: "text-green-400",
    success:"text-cyan-400",
    error:  "text-red-400",
    info:   "text-yellow-400",
  };

  return (
    <div
      className="flex-1 flex flex-col px-4 py-4 overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto mb-2 space-y-0.5 text-sm leading-relaxed">
        {history.map((line, i) => (
          <div key={i} className={lineColor[line.type]} style={{ fontFamily: "monospace" }}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 shrink-0" style={{ fontFamily: "monospace" }}>
        <span className="text-green-500 text-sm whitespace-nowrap">root@hackterm:{cwd}#</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 bg-transparent text-green-400 text-sm outline-none caret-green-400"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

type Mode = "chaos" | "terminal";

export default function HackerPage() {
  const [mode, setMode] = useState<Mode>("chaos");

  return (
    <main className="min-h-screen bg-black flex flex-col text-green-400" style={{ fontFamily: "monospace" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-900 bg-black/80 sticky top-0 z-10 shrink-0">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-green-600 hover:text-green-400 transition-colors">
          <ArrowLeft size={12} /> EXIT TERMINAL
        </Link>
        {/* Mode toggle */}
        <div className="inline-flex bg-green-950 border border-green-800 rounded-lg p-0.5 gap-0.5">
          {([["chaos", "CHAOS", Zap], ["terminal", "TERMINAL", Terminal]] as const).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                mode === id ? "bg-green-600 text-black" : "text-green-600 hover:text-green-400"
              }`}
            >
              <Icon size={11} /> {label}
            </button>
          ))}
        </div>
      </div>

      {mode === "chaos" ? <ChaosMode /> : <TerminalMode />}
    </main>
  );
}
