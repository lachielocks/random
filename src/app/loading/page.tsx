"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Maximize2 } from "lucide-react";

type OS = "windows-update" | "windows-bsod" | "macos" | "ubuntu" | "bios" | "windows-xp";

const OS_OPTIONS: { id: OS; label: string }[] = [
  { id: "windows-update", label: "Windows 11 Update" },
  { id: "windows-bsod",   label: "Blue Screen" },
  { id: "macos",          label: "macOS" },
  { id: "ubuntu",         label: "Ubuntu" },
  { id: "bios",           label: "BIOS POST" },
  { id: "windows-xp",    label: "Windows XP" },
];

const DURATIONS = [
  { label: "1 min",  secs: 60 },
  { label: "5 min",  secs: 300 },
  { label: "10 min", secs: 600 },
  { label: "30 min", secs: 1800 },
  { label: "1 hour", secs: 3600 },
];

// Eased progress: fast start, crawl at end — mirrors real update behaviour
function easedPct(elapsed: number, total: number): number {
  const t = Math.min(elapsed / total, 1);
  // Piecewise: sprint to 30%, slow walk to 94%, crawl to 99%, snap to 100
  if (t < 0.25)  return (t / 0.25) * 30;
  if (t < 0.75)  return 30 + ((t - 0.25) / 0.50) * 64;
  if (t < 0.97)  return 94 + ((t - 0.75) / 0.22) * 5;
  if (t < 1)     return 99 + ((t - 0.97) / 0.03) * 0.9;
  return 100;
}

// ── Windows 11 Update ────────────────────────────────────────────
function WindowsUpdate({ durationSecs }: { durationSecs: number }) {
  const start = useRef(Date.now());
  const [pct, setPct] = useState(0);

  useEffect(() => {
    start.current = Date.now();
    setPct(0);
    const id = setInterval(() => {
      const elapsed = (Date.now() - start.current) / 1000;
      setPct(easedPct(elapsed, durationSecs));
    }, 250);
    return () => clearInterval(id);
  }, [durationSecs]);

  const phase =
    pct >= 100 ? "Restarting…" :
    pct > 66   ? "Configuring your system" :
    pct > 30   ? "Installing — Stage 1 of 3" :
                 "Downloading update";

  return (
    <div className="w-full h-full bg-[#1c1c1c] flex flex-col items-center justify-center text-white select-none"
      style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <svg width="64" height="64" viewBox="0 0 88 88" fill="none" className="mb-10 opacity-95">
        <rect x="0"  y="0"  width="40" height="40" fill="white" rx="2"/>
        <rect x="48" y="0"  width="40" height="40" fill="white" rx="2"/>
        <rect x="0"  y="48" width="40" height="40" fill="white" rx="2"/>
        <rect x="48" y="48" width="40" height="40" fill="white" rx="2"/>
      </svg>
      <p className="text-[22px] font-light mb-1 tracking-tight">{phase}</p>
      {pct < 100 && (
        <p className="text-[64px] font-semibold leading-none mb-6" style={{ fontVariantNumeric: "tabular-nums" }}>
          {Math.floor(pct)}%
        </p>
      )}
      <div className="relative w-8 h-8 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-white/15" />
        <motion.div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white"
          animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      </div>
      <p className="text-sm text-white/40 max-w-xs text-center leading-relaxed">
        {pct >= 100 ? "Your PC will restart shortly." : "Keep your PC on. This will take a few minutes."}
      </p>
    </div>
  );
}

// ── Windows 11 BSOD ──────────────────────────────────────────────
function WindowsBSOD({ durationSecs }: { durationSecs: number }) {
  const start = useRef(Date.now());
  const [pct, setPct] = useState(0);
  const stopCodes = [
    "PENGUIN_STEALING_ALGORITHM","IRQL_NOT_LESS_OR_EQUALLY_VALID",
    "UNEXPECTED_GOOSE_EXCEPTION","BANANA_SECURITY_BREACH",
    "COUNCIL_OF_DUCKS_VIOLATION","PAGE_FAULT_IN_CHEESE_AREA",
    "PRINTER_REFUSES_TO_COOPERATE","CRITICAL_BISCUIT_FAILURE",
    "KERNEL_DATA_INPAGE_ERROR","MEMORY_MANAGEMENT_CONSPIRACY",
  ];
  const [code] = useState(() => stopCodes[Math.floor(Math.random() * stopCodes.length)]);

  useEffect(() => {
    start.current = Date.now();
    setPct(0);
    const id = setInterval(() => {
      const elapsed = (Date.now() - start.current) / 1000;
      setPct(easedPct(elapsed, durationSecs));
    }, 250);
    return () => clearInterval(id);
  }, [durationSecs]);

  return (
    <div className="w-full h-full flex flex-col justify-center px-[10%] text-white select-none"
      style={{ background: "#0046AD", fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <p className="text-[80px] leading-none mb-6" style={{ fontWeight: 200 }}>:(</p>
      <p className="text-[20px] font-light mb-8 max-w-xl leading-snug">
        Your PC ran into a problem and needs to restart. We&apos;re just collecting some
        error info, and then we&apos;ll restart for you.
      </p>
      <p className="text-[52px] font-light mb-8" style={{ fontVariantNumeric: "tabular-nums" }}>
        {Math.floor(pct)}% complete
      </p>
      <div className="flex gap-8 items-start">
        <div className="w-24 h-24 bg-white shrink-0 p-1.5">
          <div className="w-full h-full grid grid-cols-7 gap-px">
            {Array.from({ length: 49 }).map((_, i) => (
              <div key={i} className={
                [0,1,2,3,4,5,6,7,13,14,20,21,22,23,24,25,26,27,28,34,35,41,42,43,44,45,46,47,48].includes(i) || Math.random() > 0.55
                  ? "bg-black" : "bg-white"
              } />
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
function MacOS({ durationSecs }: { durationSecs: number }) {
  const start = useRef(Date.now());
  const [pct, setPct] = useState(0);

  useEffect(() => {
    start.current = Date.now();
    setPct(0);
    const id = setInterval(() => {
      const elapsed = (Date.now() - start.current) / 1000;
      setPct(easedPct(elapsed, durationSecs));
    }, 250);
    return () => clearInterval(id);
  }, [durationSecs]);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center select-none">
      <svg width="80" height="96" viewBox="0 0 56 68" fill="white" className="mb-14 opacity-90">
        <path d="M48.8 35.4c-.1-7.8 6.4-11.6 6.7-11.8-3.7-5.3-9.4-6-11.4-6.1-4.8-.5-9.5 2.9-11.9 2.9-2.5 0-6.3-2.8-10.3-2.7-5.3.1-10.2 3.1-12.9 7.8C3.6 34.2 7.2 48 12.5 54.9c2.6 3.7 5.7 7.9 9.8 7.7 4-.2 5.5-2.5 10.3-2.5 4.8 0 6.1 2.5 10.3 2.4 4.3-.1 7-3.8 9.6-7.6 3-4.3 4.3-8.5 4.3-8.7-.1 0-8-3-8-10.8zM41 11.8C43.2 9.1 44.7 5.4 44.3 1.7c-3.3.1-7.3 2.2-9.6 4.9-2.1 2.4-3.9 6.2-3.4 9.9 3.6.3 7.3-1.9 9.7-4.7z"/>
      </svg>
      {pct >= 100 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-white/30 text-xs tracking-widest uppercase"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
          macOS Sequoia
        </motion.p>
      ) : (
        <div className="w-[320px] h-[4px] bg-white/15 rounded-full overflow-hidden">
          <div className="h-full bg-white/85 rounded-full transition-none" style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
}

// ── Ubuntu ───────────────────────────────────────────────────────
function Ubuntu({ durationSecs }: { durationSecs: number }) {
  const bootLines = [
    { text: "[  0.000000] Booting Linux on physical CPU 0x0000000000 [0x610f0000]", cls: "text-[#aaa]" },
    { text: "[  0.000000] Linux version 6.8.0-45-generic (buildd@lcy02-amd64-017)", cls: "text-[#aaa]" },
    { text: "[  0.168432] ACPI: RSDP 0x00000000000F05B0 000024 (v02 BOCHS)", cls: "text-[#aaa]" },
    { text: "[  0.521876] PCI: Using configuration type 1 for base access", cls: "text-[#aaa]" },
    { text: "[  1.023456] USB 3.0 root hub registered", cls: "text-[#aaa]" },
    { text: "[  1.234567] NET: Registered PF_INET6 protocol family", cls: "text-[#aaa]" },
    { text: "[  1.789012] systemd[1]: Reached target Basic System.", cls: "text-cyan-400" },
    { text: "[ OK ] Started Update UTMP about System Boot/Shutdown.", cls: "text-green-400" },
    { text: "[ OK ] Started Network Time Synchronization.", cls: "text-green-400" },
    { text: "[ OK ] Reached target Network.", cls: "text-cyan-400" },
    { text: "[ OK ] Started OpenSSH Server Daemon.", cls: "text-green-400" },
    { text: "[ OK ] Started Network Manager.", cls: "text-green-400" },
    { text: "[ OK ] Started CUPS Scheduler.", cls: "text-green-400" },
    { text: "[ OK ] Reached target Graphical Interface.", cls: "text-cyan-400" },
    { text: "[ OK ] Started GNOME Display Manager.", cls: "text-green-400" },
    { text: "         Starting Ubuntu 24.04 LTS...", cls: "text-white" },
  ];

  // Boot text takes 30% of duration, then show splash
  const textDuration = durationSecs * 0.3;
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSplash, setShowSplash] = useState(false);
  const [dotIdx, setDotIdx] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    setShowSplash(false);
    const intervalMs = (textDuration * 1000) / bootLines.length;
    let i = 0;
    const lineId = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= bootLines.length) {
        clearInterval(lineId);
        setTimeout(() => setShowSplash(true), 300);
      }
    }, intervalMs);
    const dotId = setInterval(() => setDotIdx((n) => (n + 1) % 5), 400);
    return () => { clearInterval(lineId); clearInterval(dotId); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationSecs]);

  if (showSplash) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center select-none" style={{ background: "#300a24" }}>
        <div className="relative w-20 h-20 mb-8">
          {[0,1,2].map((i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180);
            return <div key={i} className="absolute w-6 h-6 rounded-full bg-[#E95420]"
              style={{ left: 40 + 28 * Math.cos(angle) - 12, top: 40 + 28 * Math.sin(angle) - 12 }} />;
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
    <div className="w-full h-full bg-black overflow-hidden p-4 select-none"
      style={{ fontFamily: "monospace", fontSize: "11px", color: "#ccc" }}>
      {bootLines.slice(0, visibleCount).map((line, i) => (
        <div key={i} className={line.cls}>{line.text}</div>
      ))}
      <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block text-white">_</motion.span>
    </div>
  );
}

// ── BIOS POST ────────────────────────────────────────────────────
function BIOS({ durationSecs }: { durationSecs: number }) {
  const allLines: { text: string; cls?: string }[] = [
    { text: "ASUS UEFI BIOS Utility — EZ Mode v3402", cls: "text-white" },
    { text: "Copyright (C) American Megatrends International LLC.", cls: "text-white" },
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
    { text: "" },
    { text: "USB Device(s):  USB Keyboard, USB Mouse, USB Hub" },
    { text: "" },
    { text: "Verifying DMI Pool Data .................", cls: "text-white" },
    { text: "UPDATE SUCCESS.", cls: "text-green-400" },
    { text: "" },
    { text: "0176: System Security — The System has been tampered with.", cls: "text-yellow-400" },
    { text: "0637-0148: Alert! PENGUIN array controller has failed.", cls: "text-yellow-400" },
    { text: "0637-0149: Alert! BANANA_SECURITY module is offline.", cls: "text-yellow-400" },
    { text: "" },
    { text: "Boot Priority:" },
    { text: "  1. UEFI: WD_BLACK SN850X 2TB" },
    { text: "  2. UEFI: USB" },
    { text: "  3. Network: PXE IPv4" },
    { text: "" },
    { text: "Press DEL or F2 to enter SETUP", cls: "text-cyan-400" },
    { text: "Press F8 to enter Boot Menu", cls: "text-cyan-400" },
    { text: "" },
    { text: "Loading OS...", cls: "text-white" },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const intervalMs = (durationSecs * 1000) / allLines.length;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= allLines.length) clearInterval(id);
    }, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationSecs]);

  return (
    <div className="w-full h-full bg-[#00007f] p-4 select-none"
      style={{ fontFamily: "monospace", fontSize: "13px" }}>
      {allLines.slice(0, visibleCount).map((line, i) => (
        <div key={i} className={line.cls ?? "text-[#aaaaaa]"}>{line.text || " "}</div>
      ))}
      {visibleCount < allLines.length && (
        <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block text-white">█</motion.span>
      )}
    </div>
  );
}

// ── Windows XP ───────────────────────────────────────────────────
function WindowsXP() {
  const [barPos, setBarPos] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setBarPos((p) => (p + 1) % 14), 110);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none"
      style={{ background: "linear-gradient(180deg, #1c5a96 0%, #0f2f5a 100%)" }}>
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-1">
          <div className="grid grid-cols-2 gap-0.5 w-12 h-12 rounded-sm overflow-hidden">
            <div className="bg-red-500" /><div className="bg-green-500" />
            <div className="bg-blue-500" /><div className="bg-yellow-400" />
          </div>
          <div>
            <p className="text-white text-4xl font-thin tracking-tight leading-none"
              style={{ fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif" }}>
              Microsoft<sup className="text-sm">®</sup>
            </p>
            <p className="text-white text-5xl font-bold leading-tight"
              style={{ fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif" }}>
              Windows<span className="text-[#ff6600] italic ml-2">XP</span>
            </p>
            <p className="text-white/60 text-xs mt-0.5" style={{ fontFamily: "Tahoma, sans-serif" }}>Professional</p>
          </div>
        </div>
      </div>
      <div className="w-64 h-5 rounded-full overflow-hidden border border-white/20 bg-[#0a2a5a]">
        <div className="w-full h-full flex">
          {Array.from({ length: 14 }).map((_, i) => {
            const active = (i - barPos + 14) % 14 < 4;
            return (
              <div key={i} className="flex-1 h-full rounded-sm mx-px transition-colors duration-100"
                style={{ background: active ? "linear-gradient(180deg, #76b4e8 0%, #2f6bbf 50%, #0c3b8a 100%)" : "transparent" }} />
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

type OSProps = { durationSecs: number };
const OS_COMPONENTS: Record<OS, React.ComponentType<OSProps>> = {
  "windows-update": WindowsUpdate,
  "windows-bsod":   WindowsBSOD,
  "macos":          MacOS,
  "ubuntu":         Ubuntu,
  "bios":           BIOS,
  "windows-xp":     WindowsXP,
};

// ── Main ─────────────────────────────────────────────────────────
export default function LoadingPage() {
  const [os, setOs] = useState<OS>("windows-update");
  const [renderKey, setRenderKey] = useState(0);
  const [durationSecs, setDurationSecs] = useState(300); // 5 min default
  const [fullscreen, setFullscreen] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  const launch = useCallback(() => {
    setFullscreen(true);
    setRenderKey((k) => k + 1); // restart animation when going fullscreen
    // Request true browser fullscreen on the container element
    setTimeout(() => {
      screenRef.current?.requestFullscreen().catch(() => {});
    }, 50);
  }, []);

  const exitFs = useCallback(() => {
    setFullscreen(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  // Esc key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") exitFs(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [exitFs]);

  // Sync with browser fullscreen exit (user presses Esc natively)
  useEffect(() => {
    const h = () => { if (!document.fullscreenElement) setFullscreen(false); };
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  const switchOs = useCallback((id: OS) => {
    setOs(id);
    setRenderKey((k) => k + 1);
  }, []);

  const OsComponent = OS_COMPONENTS[os];

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="px-6 pt-6 flex items-center gap-3 shrink-0">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back
        </Link>
        <span className="text-gray-700 text-sm">/ Fake OS Screens</span>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
        {/* Preview */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-black"
            style={{ aspectRatio: "16/9" }}>
            <AnimatePresence mode="wait">
              <motion.div key={renderKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="w-full h-full">
                <OsComponent durationSecs={durationSecs} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* OS tabs */}
          <div className="flex flex-wrap gap-2">
            {OS_OPTIONS.map((o) => (
              <button key={o.id} onClick={() => switchOs(o.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  os === o.id ? "bg-white text-gray-900" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="lg:w-64 shrink-0 space-y-4">
          {/* Update duration */}
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <h3 className="font-bold text-sm text-gray-300 mb-3">Update duration</h3>
            <p className="text-xs text-gray-500 mb-3 leading-snug">
              How long the &ldquo;update&rdquo; takes to complete
            </p>
            <div className="grid grid-cols-3 gap-2">
              {DURATIONS.map((d) => (
                <button key={d.secs}
                  onClick={() => { setDurationSecs(d.secs); setRenderKey((k) => k + 1); }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    durationSecs === d.secs ? "bg-white text-gray-900" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fullscreen */}
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <h3 className="font-bold text-sm text-gray-300 mb-3 flex items-center gap-2">
              <Maximize2 size={13} /> Fullscreen
            </h3>
            <button onClick={launch}
              className="w-full bg-white hover:bg-gray-100 active:scale-95 text-gray-900 font-bold py-3 rounded-xl transition-all text-sm">
              Launch Fullscreen
            </button>
            <p className="text-xs text-gray-600 mt-2 text-center">Press Esc to exit</p>
          </div>

          <p className="text-xs text-gray-700 text-center px-2 leading-relaxed">
            Set the duration, pick your OS, and launch fullscreen on someone else&apos;s computer.
          </p>
        </div>
      </div>

      {/* True fullscreen overlay — this div is what requestFullscreen() targets */}
      <div
        ref={screenRef}
        className={`${fullscreen ? "fixed inset-0 z-[9999]" : "hidden"}`}
      >
        {fullscreen && (
          <>
            <OsComponent durationSecs={durationSecs} />
            <button
              onClick={exitFs}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-white/0 hover:bg-white/20 text-white/0 hover:text-white transition-all"
              title="Exit fullscreen (Esc)"
            >
              ✕
            </button>
          </>
        )}
      </div>
    </main>
  );
}
