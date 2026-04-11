"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PasswordInput } from "./PasswordInput";
import { HintMessage } from "./HintMessage";
import { SuccessPopup } from "./SuccessPopup";
import { PASSWORDS } from "@/constants/passwords";
import { AppState } from "@/types";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const handlePasswordSubmit = React.useCallback((input: string) => {
    const matched = PASSWORDS.find((p) => p.password === input);

    if (matched) {
      setIsSuccess(true);
      setError(false);
      setTimeout(() => {
        onUnlock();
      }, 2000);
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
      setTimeout(() => setError(false), 500);
    }
  }, [onUnlock]);

  React.useEffect(() => {
    if (attempts > 0) {
      const randomHint = PASSWORDS[(attempts - 1) % PASSWORDS.length].hint;
      setHint(randomHint);
    }
  }, [attempts]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-200/80 via-stone-100 to-white">
      <SuccessPopup isVisible={isSuccess} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full flex flex-col items-center gap-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-pink-deep drop-shadow-sm">
            Hello Beautiful 🌸
          </h1>
          <p className="text-pink-soft text-2xl">
            Enter our special code to enter
          </p>
        </div>

        <PasswordInput onComplete={handlePasswordSubmit} error={error} />
        
        <HintMessage message={hint} />
      </motion.div>

      {/* Decorative Hearts */}
      <div className="absolute top-10 left-10 text-slate-300/50 -rotate-12">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 text-slate-300/50 rotate-12">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </div>
  );
};
