"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

type OS = "windows-update" | "windows-bsod" | "macos" | "ubuntu" | "bios";

const OS_OPTIONS: { id: OS; label: string }[] = [
  { id: "windows-update", label: "Windows Update" },
  { id: "windows-bsod", label: "Blue Screen" },
  { id: "macos", label: "macOS" },
  { id: "ubuntu", label: "Ubuntu" },
  { id: "bios", label: "BIOS" },
];

// ── Windows Update ──────────────────────────────────────────────
function WindowsUpdate() {
  const [pct, setPct] = useState(12);
  const [phase, setPhase] = useState<"updating" | "installing" | "configuring">("updating");
  const [timeLeft, setTimeLeft] = useState("28 minutes");

  useEffect(() => {
    const times = ["28 minutes", "43 minutes", "11 minutes", "2 hours", "6 minutes", "About a minute"];
    let timeIdx = 0;
    const timeInterval = setInterval(() => {
      timeIdx = (timeIdx + 1) % times.length;
      setTimeLeft(times[timeIdx]);
    }, 7000);

    const pctInterval = setInterval(() => {
      setPct((p) => {
        if (p >= 100) return 100;
        if (p < 30) return p + Math.random() * 1.2;
        if (p < 60) return p + Math.random() * 2.5;
        if (p < 88) return p + Math.random() * 0.4;
        if (p < 95) return p + Math.random() * 1.8;
        return Math.min(p + 0.1, 99);
      });
    }, 300);

    return () => { clearInterval(pctInterval); clearInterval(timeInterval); };
  }, []);

  useEffect(() => {
    if (pct > 35 && phase === "updating") setPhase("installing");
    if (pct > 75 && phase === "installing") setPhase("configuring");
  }, [pct, phase]);

  const phaseLabel = {
    updating: "Updating your PC",
    installing: "Installing updates",
    configuring: "Configuring your system",
  }[phase];

  return (
    <div className="w-full h-full bg-[#0078d4] flex flex-col items-center justify-center text-white select-none">
      {/* Windows logo */}
      <div className="mb-10 opacity-90">
        <svg width="72" height="72" viewBox="0 0 88 88" fill="none">
          <rect x="0" y="0" width="42" height="42" fill="white" />
          <rect x="46" y="0" width="42" height="42" fill="white" />
          <rect x="0" y="46" width="42" height="42" fill="white" />
          <rect x="46" y="46" width="42" height="42" fill="white" />
        </svg>
      </div>
      <p className="text-2xl font-light mb-2">{phaseLabel}</p>
      <p className="text-6xl font-semibold mb-6">{Math.floor(pct)}%</p>
      {/* Spinner dots */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-white"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <p className="text-sm opacity-70">Don&apos;t turn off your PC.</p>
      <p className="text-xs opacity-50 mt-2">Estimated time: {timeLeft}</p>
    </div>
  );
}

// ── Blue Screen ──────────────────────────────────────────────────
function WindowsBSOD() {
  const [pct, setPct] = useState(0);
  const codes = [
    "PENGUIN_STEALING_ALGORITHM",
    "IRQL_NOT_LESS_OR_EQUALLY_VALID",
    "UNEXPECTED_GOOSE_EXCEPTION",
    "BANANA_SECURITY_BREACH",
    "COUNCIL_OF_DUCKS_VIOLATION",
    "PAGE_FAULT_IN_CHEESE_AREA",
    "PRINTER_REFUSES_TO_COOPERATE",
    "CRITICAL_BISCUIT_FAILURE",
  ];
  const [code] = useState(() => codes[Math.floor(Math.random() * codes.length)]);

  useEffect(() => {
    const id = setInterval(() => setPct((p) => Math.min(p + 1, 100)), 180);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-[#0946aa] flex flex-col justify-center px-16 text-white select-none" style={{ fontFamily: "monospace" }}>
      <p className="text-8xl mb-8">:(</p>
      <p className="text-2xl font-bold mb-6">Your PC ran into a problem and needs to restart.<br />We&apos;re just collecting some error info, and then we&apos;ll restart for you.</p>
      <p className="text-5xl font-bold mb-8">{pct}% complete</p>
      <p className="text-sm opacity-70 mb-1">For more information about this issue and possible fixes, visit:</p>
      <p className="text-sm underline mb-6">https://www.windows.com/stopcode</p>
      <p className="text-sm opacity-70">If you call a support person, give them this info:</p>
      <p className="text-sm font-bold mt-1">Stop code: {code}</p>
    </div>
  );
}

// ── macOS ────────────────────────────────────────────────────────
function MacOS() {
  const [barWidth, setBarWidth] = useState(8);

  useEffect(() => {
    const id = setInterval(() => {
      setBarWidth((w) => {
        if (w >= 100) return 100;
        if (w < 40) return w + Math.random() * 1.5;
        if (w < 75) return w + Math.random() * 0.6;
        return w + Math.random() * 0.3;
      });
    }, 250);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center select-none">
      {/* Apple logo */}
      <div className="text-white mb-10 opacity-90">
        <svg width="72" height="88" viewBox="0 0 56 68" fill="currentColor">
          <path d="M48.8 35.4c-.1-7.8 6.4-11.6 6.7-11.8-3.7-5.3-9.4-6-11.4-6.1-4.8-.5-9.5 2.9-11.9 2.9-2.5 0-6.3-2.8-10.3-2.7-5.3.1-10.2 3.1-12.9 7.8C3.6 34.2 7.2 48 12.5 54.9c2.6 3.7 5.7 7.9 9.8 7.7 4-.2 5.5-2.5 10.3-2.5 4.8 0 6.1 2.5 10.3 2.4 4.3-.1 7-3.8 9.6-7.6 3-4.3 4.3-8.5 4.3-8.7-.1 0-8-3-8-10.8zM41 11.8C43.2 9.1 44.7 5.4 44.3 1.7c-3.3.1-7.3 2.2-9.6 4.9-2.1 2.4-3.9 6.2-3.4 9.9 3.6.3 7.3-1.9 9.7-4.7z" />
        </svg>
      </div>
      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white/80 rounded-full"
          style={{ width: `${barWidth}%` }}
          transition={{ duration: 0.25 }}
        />
      </div>
      <p className="text-white/40 text-xs mt-8">macOS Sonoma</p>
    </div>
  );
}

// ── Ubuntu ───────────────────────────────────────────────────────
function Ubuntu() {
  const [dotIdx, setDotIdx] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  const bootLines = [
    "[  0.000000] Linux version 6.5.0-44-generic",
    "[  0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.5.0-44-generic",
    "[  0.198432] ACPI: RSDP 0x00000000000F05B0 000024 (v02 BOCHS )",
    "[  0.521876] PCI: Using configuration type 1 for base access",
    "[  1.234567] usb 1-1: new high-speed USB device number 2",
    "[  2.345678] NET: Registered PF_INET protocol family",
    "[  3.456789] systemd[1]: Starting Ubuntu...",
    "[  4.123456] Started NetworkManager.",
    "[  4.567890] Started CUPS Printing Service.",
    "[  5.012345] Reached target Graphical Interface.",
  ];

  useEffect(() => {
    const dotId = setInterval(() => setDotIdx((i) => (i + 1) % 5), 500);
    let lineIdx = 0;
    const lineId = setInterval(() => {
      if (lineIdx < bootLines.length) {
        setLines((l) => [...l, bootLines[lineIdx]]);
        lineIdx++;
      }
    }, 600);
    return () => { clearInterval(dotId); clearInterval(lineId); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full bg-[#300a24] flex flex-col select-none" style={{ fontFamily: "monospace" }}>
      {/* Boot text */}
      <div className="flex-1 p-6 overflow-hidden text-white/70 text-xs leading-relaxed">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      {/* Ubuntu boot screen bottom */}
      <div className="flex flex-col items-center pb-16 pt-4">
        {/* Ubuntu logo dots */}
        <div className="relative w-16 h-16 mb-6">
          {[0, 1, 2].map((i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180);
            const x = 32 + 22 * Math.cos(angle);
            const y = 32 + 22 * Math.sin(angle);
            return (
              <div
                key={i}
                className="absolute w-5 h-5 rounded-full bg-[#E95420]"
                style={{ left: x - 10, top: y - 10 }}
              />
            );
          })}
        </div>
        <p className="text-white font-bold text-2xl mb-6">Ubuntu</p>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                i === dotIdx ? "bg-white" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BIOS ─────────────────────────────────────────────────────────
function BIOS() {
  const allLines = [
    "PhoenixBIOS 4.0 Release 6.0",
    "Copyright 1985-2024 Phoenix Technologies Ltd.",
    "",
    "CPU: Intel(R) Core(TM) i9-14900K CPU @ 3.20GHz",
    "Memory Test: 32768 MB OK",
    "",
    "Detecting Primary Master... ST2000DM008-2FR102",
    "Detecting Primary Slave... None",
    "Detecting Secondary Master... ASUS BW-16D1HT",
    "Detecting Secondary Slave... None",
    "",
    "Press DEL to enter SETUP, F12 for Boot Menu",
    "",
    "Initializing USB controllers.. Done.",
    "USB Mass Storage Devices: 1",
    "",
    "0637-0148: Alert! PENGUIN array has failed.",
    "0637-0149: Alert! Banana Security Module offline.",
    "0637-0150: Alert! Duck Council not responding.",
    "",
    "Verifying DMI Pool Data................. Done",
    "Boot from CD/DVD : No bootable disc.",
    "Boot from USB: No bootable device.",
    "Boot from Network: PXE-E61: Media test failure.",
    "",
    "DISK BOOT FAILURE, INSERT SYSTEM DISK AND PRESS ENTER",
  ];

  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < allLines.length) {
        setVisibleLines((l) => [...l, allLines[i]]);
        i++;
      }
    }, 140);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full bg-black text-[#aaaaaa] p-6 select-none" style={{ fontFamily: "monospace", fontSize: "14px", lineHeight: "1.6" }}>
      {visibleLines.map((line, i) => (
        <div
          key={i}
          className={
            line.includes("Alert!") ? "text-yellow-400" :
            line.includes("FAILURE") || line.includes("failed") ? "text-red-500" :
            line.startsWith("Phoenix") || line.startsWith("Copyright") ? "text-white" :
            ""
          }
        >
          {line || " "}
        </div>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block"
      >
        _
      </motion.span>
    </div>
  );
}

const OS_COMPONENTS: Record<OS, React.ComponentType> = {
  "windows-update": WindowsUpdate,
  "windows-bsod": WindowsBSOD,
  "macos": MacOS,
  "ubuntu": Ubuntu,
  "bios": BIOS,
};

export default function LoadingPage() {
  const [os, setOs] = useState<OS>("windows-update");
  const [renderKey, setRenderKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const switchOs = useCallback((id: OS) => {
    setOs(id);
    setRenderKey((k) => k + 1);
  }, []);

  const OsComponent = OS_COMPONENTS[os];

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col">
      {!fullscreen && (
        <div className="px-6 pt-6 flex items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back
          </Link>
          <span className="text-gray-600 text-sm">Fake OS Loading Screens</span>
        </div>
      )}

      {/* Screen */}
      <div
        className={`${fullscreen ? "fixed inset-0 z-50" : "mx-6 my-4 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl"} flex-1`}
        style={fullscreen ? {} : { aspectRatio: "16/9", maxHeight: "60vh" }}
      >
        <div className="w-full h-full" style={fullscreen ? { position: "absolute", inset: 0 } : {}}>
          <AnimatePresence mode="wait">
            <motion.div
              key={renderKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <OsComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      {!fullscreen && (
        <div className="px-6 pb-8">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {OS_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => switchOs(o.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  os === o.id
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => setFullscreen(true)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline"
            >
              Go fullscreen (press Escape to exit)
            </button>
          </div>
        </div>
      )}

      {fullscreen && (
        <button
          onClick={() => setFullscreen(false)}
          className="fixed top-4 right-4 z-[60] bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors backdrop-blur"
          onKeyDown={(e) => e.key === "Escape" && setFullscreen(false)}
        >
          ESC
        </button>
      )}
    </main>
  );
}
