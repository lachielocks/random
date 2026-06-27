"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shuffle, GitBranch } from "lucide-react";
import { facts } from "@/data/facts";
import { conspiracyConnectors, conspiracyEndings } from "@/data/conspiracy";
import { pick } from "@/components/GeneratorPage";
import { useBadges } from "@/context/BadgeContext";

function generateBoard() {
  const shuffled = [...facts].sort(() => Math.random() - 0.5);
  const nodes = shuffled.slice(0, 4);
  const connections = nodes.slice(0, -1).map((_, i) => ({
    from: nodes[i],
    connector: pick(conspiracyConnectors),
    to: nodes[i + 1],
  }));
  return { nodes, connections, conclusion: pick(conspiracyEndings) };
}

export default function ConspiracyPage() {
  const { unlock } = useBadges();
  const [board, setBoard] = useState(() => generateBoard());
  const [generated, setGenerated] = useState(false);

  const regen = useCallback(() => {
    setBoard(generateBoard());
    setGenerated(true);
    unlock("conspiracy-theorist");
  }, [unlock]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-950 via-gray-900 to-black flex flex-col text-white">
      <div className="px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-red-300 hover:text-red-100 transition-colors">
          <ArrowLeft size={14} /> Back to Random Stuff
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="max-w-2xl w-full mx-auto text-center">
          <GitBranch size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-black mb-2">Conspiracy Board</h1>
          <p className="text-red-300/70 mb-10">Connect random facts with red string. It all makes sense.</p>

          {generated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-gray-900/80 border-2 border-red-800 rounded-2xl p-8 mb-8 text-left"
            >
              {/* Red string lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <line x1="20%" y1="25%" x2="80%" y2="45%" stroke="#ef4444" strokeWidth="2" />
                <line x1="80%" y1="45%" x2="30%" y2="70%" stroke="#ef4444" strokeWidth="2" />
                <line x1="30%" y1="70%" x2="70%" y2="85%" stroke="#ef4444" strokeWidth="2" />
              </svg>

              <div className="relative space-y-6">
                {board.nodes.map((node, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-gray-800 border border-red-700 rounded-xl px-4 py-3 text-sm text-gray-200"
                  >
                    📌 {node}
                  </motion.div>
                ))}
                <div className="pt-4 border-t border-red-900">
                  {board.connections.map((c, i) => (
                    <p key={i} className="text-red-400 text-xs mb-2 italic">
                      &ldquo;{c.from.slice(0, 40)}...&rdquo; {c.connector} &ldquo;{c.to.slice(0, 40)}...&rdquo;
                    </p>
                  ))}
                </div>
                <p className="text-red-300 font-bold text-center pt-4">{board.conclusion}</p>
              </div>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={regen}
            className="flex items-center justify-center gap-2 mx-auto bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-2xl text-lg"
          >
            <Shuffle size={18} /> {generated ? "New Conspiracy" : "Connect the Dots"}
          </motion.button>
        </div>
      </div>
    </main>
  );
}
