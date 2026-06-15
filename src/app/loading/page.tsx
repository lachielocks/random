"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Timer, Maximize2, X } from "lucide-react";

type OS = "windows-update" | "windows-bsod" | "macos" | "ubuntu" | "bios" | "windows-xp";

const OS_OPTIONS: { id: OS; label: string }[] = [
  { id: "windows-update", label: "Windows 11 Update" },
  { id: "windows-bsod",   label: "Blue Screen" },
  { id: "macos",          label: "macOS" },
  { id: "ubuntu",         label: "Ubuntu" },
  { id: "bios",           label: "BIOS POST" },
  { id: "windows-xp",    label: "Windows XP" },
];

// ── Windows 11 Update ────────────────────────────────────────────
function WindowsUpdate() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState(0);
  // Phases: 0 = downloading, 1 = installing, 2 = configuring, 3 = restarting
  const phases = ["Downloading updates", "Installing — Stage 1 of 3", "Configuring system", "Restarting…"];

  useEffect(() => {
    // Realistic progression: fast to ~30, slow to ~65, crawl to ~99, then snap
    const id = setInterval(() => {
      setPct((p) => {
        if (p >= 100) return 100;
        if (p < 30)  return Math.min(p + 0.9 + Math.random() * 1.2, 100);
        if (p < 65)  return Math.min(p + 0.3 + Math.random() * 0.5, 100);
        if (p < 94)  return Math.min(p + 0.12 + Math.random() * 0.2, 100);
        if (p < 99)  return Math.min(p + 0.04, 100);
        return 100;
      });
    }, 200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (pct >= 100) setPhase(3);
    else if (pct > 66) setPhase(2);
    else if (pct > 30) setPhase(1);
    else setPhase(0);
  }, [pct]);

  return (
    <div className="w-full h-full bg-[#1c1c1c] flex flex-col items-center justify-center text-white select-none" style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      {/* Windows logo */}
      <svg width="64" height="64" viewBox="0 0 88 88" fill="none" className="mb-10 opacity-95">
        <rect x="0"  y="0"  width="40" height="40" fill="white" rx="2"/>
        <rect x="48" y="0"  width="40" height="40" fill="white" rx="2"/>
        <rect x="0"  y="48" width="40" height="40" fill="white" rx="2"/>
        <rect x="48" y="48" width="40" height="40" fill="white" rx="2"/>
      </svg>

      <p className="text-[22px] font-light mb-1 tracking-tight">{phases[phase]}</p>
      {pct < 100 && (
        <p className="text-[68px] font-semibold leading-none mb-6" style={{ fontVariantNumeric: "tabular-nums" }}>
          {Math.floor(pct)}%
        </p>
      )}

      {/* Ring spinner */}
      <div className="relative w-8 h-8 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <p className="text-sm text-white/50 max-w-xs text-center leading-relaxed">
        {pct >= 100
          ? "Your PC will restart shortly."
          : "Keep your PC on. This will take a few minutes."}
      </p>
    </div>
  );
}

// ── Windows 11 BSOD ──────────────────────────────────────────────
function WindowsBSOD() {
  const [pct, setPct] = useState(0);
  const stopCodes = [
    "PENGUIN_STEALING_ALGORITHM",
    "IRQL_NOT_LESS_OR_EQUALLY_VALID",
    "UNEXPECTED_GOOSE_EXCEPTION",
    "BANANA_SECURITY_BREACH",
    "COUNCIL_OF_DUCKS_VIOLATION",
    "PAGE_FAULT_IN_CHEESE_AREA",
    "PRINTER_REFUSES_TO_COOPERATE",
    "CRITICAL_BISCUIT_FAILURE",
    "KERNEL_DATA_INPAGE_ERROR",
    "MEMORY_MANAGEMENT_CONSPIRACY",
  ];
  const [code] = useState(() => stopCodes[Math.floor(Math.random() * stopCodes.length)]);

  useEffect(() => {
    const id = setInterval(() => setPct((p) => Math.min(p + 0.6 + Math.random() * 0.4, 100)), 200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col justify-center px-[10%] text-white select-none"
      style={{ background: "#0046AD", fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      <p className="text-[80px] leading-none mb-6" style={{ fontWeight: 200 }}>:(</p>
      <p className="text-[20px] font-light mb-8 max-w-xl leading-snug">
        Your PC ran into a problem and needs to restart. We&apos;re just collecting some
        error info, and then we&apos;ll restart for you.
      </p>
      <p className="text-[52px] font-light mb-8" style={{ fontVariantNumeric: "tabular-nums" }}>
        {Math.floor(pct)}% complete
      </p>

      {/* Fake QR code */}
      <div className="flex gap-8 items-start">
        <div className="w-24 h-24 bg-white shrink-0 p-1.5">
          <div className="w-full h-full grid grid-cols-7 gap-px">
            {Array.from({ length: 49 }).map((_, i) => (
              <div
                key={i}
                className={`${
                  [0,1,2,3,4,5,6,7,13,14,20,21,22,23,24,25,26,27,28,34,35,41,42,43,44,45,46,47,48].includes(i)
                    ? "bg-black" : Math.random() > 0.5 ? "bg-black" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="text-white/70 text-sm leading-relaxed max-w-sm">
          <p className="mb-1">For more information about this issue and possible fixes, visit:</p>
          <p className="underline mb-4 text-white">https://www.windows.com/stopcode</p>
          <p className="mb-1">If you call a support person, give them this info:</p>
          <p className="font-bold text-white">Stop code: {code}</p>
        </div>
      </div>
    </div>
  );
}

// ── macOS ────────────────────────────────────────────────────────
function MacOS() {
  const [barPct, setBarPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setBarPct((p) => {
        if (p >= 100) { setDone(true); return 100; }
        if (p < 45) return Math.min(p + 0.7 + Math.random() * 1.0, 100);
        if (p < 80) return Math.min(p + 0.25 + Math.random() * 0.4, 100);
        return Math.min(p + 0.08 + Math.random() * 0.15, 100);
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center select-none">
      {/* Apple logo */}
      <svg width="80" height="96" viewBox="0 0 56 68" fill="white" className="mb-14 opacity-90">
        <path d="M48.8 35.4c-.1-7.8 6.4-11.6 6.7-11.8-3.7-5.3-9.4-6-11.4-6.1-4.8-.5-9.5 2.9-11.9 2.9-2.5 0-6.3-2.8-10.3-2.7-5.3.1-10.2 3.1-12.9 7.8C3.6 34.2 7.2 48 12.5 54.9c2.6 3.7 5.7 7.9 9.8 7.7 4-.2 5.5-2.5 10.3-2.5 4.8 0 6.1 2.5 10.3 2.4 4.3-.1 7-3.8 9.6-7.6 3-4.3 4.3-8.5 4.3-8.7-.1 0-8-3-8-10.8zM41 11.8C43.2 9.1 44.7 5.4 44.3 1.7c-3.3.1-7.3 2.2-9.6 4.9-2.1 2.4-3.9 6.2-3.4 9.9 3.6.3 7.3-1.9 9.7-4.7z"/>
      </svg>

      {!done ? (
        /* Progress bar — thin, centred, slightly rounded */
        <div className="w-[320px] h-[4px] bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/85 rounded-full"
            style={{ width: `${barPct}%` }}
          />
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/30 text-xs tracking-widest uppercase"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          macOS Sequoia
        </motion.p>
      )}
    </div>
  );
}

// ── Ubuntu ───────────────────────────────────────────────────────
function Ubuntu() {
  const allBootLines = [
    "[ OK ] Started Dispatch Password Requests to Console Directory Watch.",
    "[  0.000000] Booting Linux on physical CPU 0x0000000000 [0x610f0000]",
    "[  0.000000] Linux version 6.8.0-45-generic (buildd@lcy02-amd64-017)",
    "[  0.168432] ACPI: RSDP 0x00000000000F05B0 000024 (v02 BOCHS )",
    "[  0.521876] PCI: Using configuration type 1 for base access",
    "[  0.694210] clocksource: tsc-early: mask: 0xffffffffffffffff",
    "[  1.023456] USB 3.0 root hub registered",
    "[  1.234567] NET: Registered PF_INET6 protocol family",
    "[  1.456789] systemd[1]: Detected virtualization kvm.",
    "[  1.789012] systemd[1]: Reached target Basic System.",
    "[ OK ] Started Update UTMP about System Boot/Shutdown.",
    "[ OK ] Started Network Time Synchronization.",
    "[ OK ] Reached target Network.",
    "[ OK ] Started OpenSSH Server Daemon.",
    "[ OK ] Started Accounts Service.",
    "[ OK ] Started Network Manager.",
    "[ OK ] Started CUPS Scheduler.",
    "[ OK ] Started Snap Daemon.",
    "[ OK ] Reached target Graphical Interface.",
    "[ OK ] Started GNOME Display Manager.",
    "         Starting Ubuntu 24.04 LTS...",
  ];

  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showSplash, setShowSplash] = useState(false);
  const [dotIdx, setDotIdx] = useState(0);

  useEffect(() => {
    let i = 0;
    const lineId = setInterval(() => {
      if (i < allBootLines.length) {
        setVisibleLines((l) => [...l, allBootLines[i]]);
        i++;
      } else {
        clearInterval(lineId);
        setTimeout(() => setShowSplash(true), 300);
      }
    }, 120);
    return () => clearInterval(lineId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setInterval(() => setDotIdx((n) => (n + 1) % 5), 400);
    return () => clearInterval(id);
  }, []);

  if (showSplash) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center select-none" style={{ background: "#300a24" }}>
        <div className="relative w-20 h-20 mb-8">
          {[0, 1, 2].map((i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180);
            return (
              <div key={i} className="absolute w-6 h-6 rounded-full bg-[#E95420]"
                style={{ left: 40 + 28 * Math.cos(angle) - 12, top: 40 + 28 * Math.sin(angle) - 12 }} />
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-[#E95420]" />
          </div>
        </div>
        <p className="text-white text-2xl font-light mb-8" style={{ fontFamily: "Ubuntu, system-ui, sans-serif" }}>Ubuntu</p>
        <div className="flex gap-2">
          {[0,1,2,3,4].map((i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === dotIdx ? "bg-white" : "bg-white/20"}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black overflow-hidden p-4 select-none" style={{ fontFamily: "monospace", fontSize: "11px", color: "#ccc" }}>
      <div className="space-y-px">
        {visibleLines.map((line, i) => (
          <div key={i} className={
            line.startsWith("[ OK ]") ? "text-green-400" :
            line.includes("Starting") ? "text-white" :
            line.includes("Reached target") ? "text-cyan-400" :
            "text-[#aaa]"
          }>{line}</div>
        ))}
        <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block text-white">_</motion.span>
      </div>
    </div>
  );
}

// ── BIOS POST ────────────────────────────────────────────────────
function BIOS() {
  const allLines: { text: string; color?: string }[] = [
    { text: "ASUS UEFI BIOS Utility - EZ Mode", color: "text-white" },
    { text: "Copyright (C) American Megatrends International LLC.", color: "text-white" },
    { text: "" },
    { text: "BIOS Version: 3402  Build Date: 06/13/2024  ID: 8888AA" },
    { text: "Processor: Intel(R) Core(TM) i9-14900K CPU @ 3.20GHz" },
    { text: "Speed: 3200MHz  Count: 24  Microcode: 129" },
    { text: "Memory Size: 32768MB  Memory Frequency: 5600MHz" },
    { text: "" },
    { text: "Initializing USB Controllers.. Done." },
    { text: "Initializing NVME Controllers.. Done." },
    { text: "" },
    { text: "SATA Port 1: WD_BLACK SN850X 2TB NVMe SSD (2000.4GB)" },
    { text: "SATA Port 2: ASUS BW-16D1HT (ATAPI)" },
    { text: "SATA Port 3: Not Detected" },
    { text: "SATA Port 4: Not Detected" },
    { text: "" },
    { text: "USB Device(s):  USB Keyboard, USB Mouse, USB Hub" },
    { text: "" },
    { text: "Verifying DMI Pool Data ", color: "text-white" },
    { text: "UPDATE SUCCESS." , color: "text-green-400" },
    { text: "" },
    { text: "0176: System Security - The System has been tampered with.", color: "text-yellow-400" },
    { text: "0637-0148: Alert! PENGUIN array controller has failed.", color: "text-yellow-400" },
    { text: "0637-0149: Alert! BANANA_SECURITY module is offline.", color: "text-yellow-400" },
    { text: "" },
    { text: "Boot Priority:" },
    { text: "  1. UEFI: WD_BLACK SN850X 2TB" },
    { text: "  2. UEFI: USB" },
    { text: "  3. Network: PXE IPv4" },
    { text: "" },
    { text: "Press DEL or F2 to enter SETUP", color: "text-cyan-400" },
    { text: "Press F8 to enter Boot Menu", color: "text-cyan-400" },
    { text: "" },
    { text: "Loading OS...", color: "text-white" },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setVisibleCount((n) => {
        if (n >= allLines.length) { clearInterval(id); return n; }
        return n + 1;
      });
    }, 110);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full bg-[#00007f] p-4 select-none" style={{ fontFamily: "monospace", fontSize: "13px" }}>
      {allLines.slice(0, visibleCount).map((line, i) => (
        <div key={i} className={line.color ?? "text-[#aaaaaa]"}>{line.text || " "}</div>
      ))}
      {visibleCount < allLines.length && (
        <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block text-white">█</motion.span>
      )}
    </div>
  );
}

// ── Windows XP ───────────────────────────────────────────────────
function WindowsXP() {
  const [barPos, setBarPos] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBarPos((p) => (p + 1) % 14);
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center select-none"
      style={{ background: "linear-gradient(180deg, #1c5a96 0%, #0f2f5a 100%)" }}
    >
      {/* Windows XP logo */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-1">
          {/* XP flag */}
          <div className="grid grid-cols-2 gap-0.5 w-12 h-12 rounded-sm overflow-hidden">
            <div className="bg-red-500" />
            <div className="bg-green-500" />
            <div className="bg-blue-500" />
            <div className="bg-yellow-400" />
          </div>
          <div>
            <p className="text-white text-4xl font-thin tracking-tight leading-none" style={{ fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif" }}>Microsoft<sup className="text-sm">®</sup></p>
            <p className="text-white text-5xl font-bold leading-tight" style={{ fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif" }}>Windows<span className="text-[#ff6600] italic ml-2">XP</span></p>
            <p className="text-white/60 text-xs mt-0.5" style={{ fontFamily: "Tahoma, sans-serif" }}>Professional</p>
          </div>
        </div>
      </div>

      {/* Marquee loading bar */}
      <div className="w-64 h-5 rounded-full overflow-hidden border border-white/20 bg-[#0a2a5a]">
        <div className="w-full h-full flex">
          {Array.from({ length: 14 }).map((_, i) => {
            const active = (i - barPos + 14) % 14 < 4;
            return (
              <div
                key={i}
                className="flex-1 h-full rounded-sm mx-px transition-colors duration-100"
                style={{ background: active ? "linear-gradient(180deg, #76b4e8 0%, #2f6bbf 50%, #0c3b8a 100%)" : "transparent" }}
              />
            );
          })}
        </div>
      </div>

      <p className="text-white/40 text-xs mt-6" style={{ fontFamily: "Tahoma, sans-serif" }}>
        Copyright © Microsoft Corporation
      </p>
    </div>
  );
}

// ── OS map ────────────────────────────────────────────────────────
const OS_COMPONENTS: Record<OS, React.ComponentType> = {
  "windows-update": WindowsUpdate,
  "windows-bsod": WindowsBSOD,
  "macos": MacOS,
  "ubuntu": Ubuntu,
  "bios": BIOS,
  "windows-xp": WindowsXP,
};

// ── Main page ─────────────────────────────────────────────────────
export default function LoadingPage() {
  const [os, setOs] = useState<OS>("windows-update");
  const [renderKey, setRenderKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  // Timer state
  const [timerMode, setTimerMode] = useState<"off" | "delay" | "clock">("off");
  const [delayMins, setDelayMins] = useState(5);
  const [clockTime, setClockTime] = useState(""); // HH:MM
  const [countdown, setCountdown] = useState<number | null>(null); // seconds remaining
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const launch = useCallback(() => {
    setFullscreen(true);
    // Try browser fullscreen (works if this is triggered by user gesture chain)
    try {
      document.documentElement.requestFullscreen?.();
    } catch { /* ignore */ }
  }, []);

  const exitFullscreen = useCallback(() => {
    setFullscreen(false);
    setCountdown(null);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    try { document.exitFullscreen?.(); } catch { /* ignore */ }
  }, []);

  // Keyboard escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") exitFullscreen(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [exitFullscreen]);

  // Browser fullscreen exit sync
  useEffect(() => {
    const handler = () => { if (!document.fullscreenElement) setFullscreen(false); };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    let seconds = 0;
    if (timerMode === "delay") {
      seconds = delayMins * 60;
    } else if (timerMode === "clock" && clockTime) {
      const [h, m] = clockTime.split(":").map(Number);
      const now = new Date();
      const target = new Date();
      target.setHours(h, m, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      seconds = Math.max(0, Math.round((target.getTime() - now.getTime()) / 1000));
    }
    if (seconds <= 0) { launch(); return; }
    setCountdown(seconds);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c === null || c <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          launch();
          return null;
        }
        return c - 1;
      });
    }, 1000);
  }, [timerMode, delayMins, clockTime, launch]);

  const cancelTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setCountdown(null);
  }, []);

  const switchOs = useCallback((id: OS) => {
    setOs(id);
    setRenderKey((k) => k + 1);
  }, []);

  const OsComponent = OS_COMPONENTS[os];

  const formatCountdown = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
    return `${m}:${String(sec).padStart(2,"0")}`;
  };

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black">
        <OsComponent />
        <button
          onClick={exitFullscreen}
          className="fixed top-3 right-3 z-[10000] bg-white/10 hover:bg-white/25 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur transition-colors opacity-0 hover:opacity-100"
          title="Exit (Esc)"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="px-6 pt-6 flex items-center gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back
        </Link>
        <span className="text-gray-700 text-sm">/ Fake OS Screens</span>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
        {/* Preview */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-black" style={{ aspectRatio: "16/9" }}>
            <AnimatePresence mode="wait">
              <motion.div key={renderKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="w-full h-full">
                <OsComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* OS selector */}
          <div className="flex flex-wrap gap-2">
            {OS_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => switchOs(o.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  os === o.id ? "bg-white text-gray-900" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls panel */}
        <div className="lg:w-72 shrink-0 flex flex-col gap-4">
          {/* Launch now */}
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <h3 className="font-bold text-sm text-gray-300 mb-3 flex items-center gap-2">
              <Maximize2 size={14} /> Fullscreen
            </h3>
            <button
              onClick={launch}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Launch Now
            </button>
            <p className="text-xs text-gray-600 mt-2 text-center">Press Esc to exit</p>
          </div>

          {/* Timer */}
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <h3 className="font-bold text-sm text-gray-300 mb-3 flex items-center gap-2">
              <Timer size={14} /> Timed Launch
            </h3>

            {/* Mode tabs */}
            <div className="flex rounded-xl bg-gray-800 p-1 gap-1 mb-4">
              {(["delay", "clock"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setTimerMode(m); cancelTimer(); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    timerMode === m ? "bg-white text-gray-900" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {m === "delay" ? "In X minutes" : "At time"}
                </button>
              ))}
            </div>

            {timerMode === "delay" && (
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={delayMins}
                  onChange={(e) => setDelayMins(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 bg-gray-800 border border-gray-700 text-white text-center rounded-lg px-2 py-2 text-sm font-bold focus:outline-none focus:border-gray-500"
                />
                <span className="text-gray-400 text-sm">minute{delayMins !== 1 ? "s" : ""} from now</span>
              </div>
            )}

            {timerMode === "clock" && (
              <div className="mb-4">
                <input
                  type="time"
                  value={clockTime}
                  onChange={(e) => setClockTime(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-gray-500"
                />
                <p className="text-xs text-gray-600 mt-1">Launches at this time (next occurrence)</p>
              </div>
            )}

            {countdown !== null ? (
              <div className="space-y-2">
                <div className="bg-gray-800 rounded-xl py-3 text-center">
                  <p className="text-xs text-gray-500 mb-0.5">Launching in</p>
                  <p className="text-2xl font-black tabular-nums text-white">{formatCountdown(countdown)}</p>
                </div>
                <button
                  onClick={cancelTimer}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={startTimer}
                disabled={timerMode === "clock" && !clockTime}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Set Timer
              </button>
            )}
          </div>

          <p className="text-xs text-gray-700 text-center leading-relaxed px-2">
            Use the timer to automatically launch the screen in fullscreen — ideal for leaving on someone&apos;s computer.
          </p>
        </div>
      </div>
    </main>
  );
}
