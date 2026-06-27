"use client";

import { useEffect, useState } from "react";

export function PWAInstall() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferred || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-white border-2 border-purple-200 rounded-2xl shadow-xl px-5 py-4 max-w-xs">
      <p className="font-bold text-gray-900 text-sm mb-1">Install Random Stuff</p>
      <p className="text-xs text-gray-500 mb-3">Offline excuses. Anytime. Anywhere.</p>
      <div className="flex gap-2">
        <button
          onClick={async () => {
            await deferred.prompt();
            setDeferred(null);
          }}
          className="text-xs font-bold bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700"
        >
          Install
        </button>
        <button onClick={() => setDismissed(true)} className="text-xs text-gray-400 hover:text-gray-600 px-2">
          No thanks
        </button>
      </div>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}
