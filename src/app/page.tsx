"use client";

import { useState } from "react";
import { LockScreen } from "@/components/lock/LockScreen";
import { HomePage } from "@/components/home/HomePage";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { useHearts } from "@/hooks/useHearts";
import { AppState } from "@/types";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("locked");
  const { enabled: heartsEnabled, toggleHearts } = useHearts();

  const handleUnlock = () => {
    setAppState("unlocked");
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <FloatingHearts enabled={heartsEnabled} />
      
      {appState === "locked" ? (
        <LockScreen onUnlock={handleUnlock} />
      ) : (
        <HomePage heartsEnabled={heartsEnabled} onToggleHearts={toggleHearts} />
      )}
    </main>
  );
}
