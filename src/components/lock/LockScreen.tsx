"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PasswordInput } from "./PasswordInput";
import { SuccessPopup } from "./SuccessPopup";
import { PASSWORDS, HINTS } from "@/constants/passwords";
import { Heart } from "lucide-react";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [hint, setHint] = useState<string>(HINTS[0]);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handlePasswordSubmit = React.useCallback((input: string) => {
    const isCorrect = PASSWORDS.some(p => p.toLowerCase() === input.toLowerCase());

    if (isCorrect) {
      setIsSuccess(true);
      setError(false);
      setTimeout(() => {
        onUnlock();
      }, 2000);
    } else {
      setError(true);
      setAttempts((prev) => {
        const nextAttempts = prev + 1;
        const hintIndex = Math.min(nextAttempts, HINTS.length - 1);
        setHint(HINTS[hintIndex]);
        return nextAttempts;
      });
      
      setTimeout(() => {
        setError(false);
      }, 800);
    }
  }, [onUnlock]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-200/80 via-stone-100 to-white overflow-hidden">
      <SuccessPopup isVisible={isSuccess} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full flex flex-col items-center gap-10"
      >
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-5xl font-bold text-pink-deep drop-shadow-sm font-alice"
          >
            Happy 365 Days of US
          </motion.h1>
          <p className="text-pink-soft text-xl md:text-2xl font-cardo italic">
            I Knew, you will come back
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <p className="text-pink-deep font-alice uppercase tracking-widest text-sm font-bold opacity-60">
            Guess the password
          </p>
          <PasswordInput onComplete={handlePasswordSubmit} error={error} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={hint}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-light/30 text-center max-w-[340px] shadow-sm relative"
            >
              <p className="text-pink-deep/80 font-cardo italic text-sm md:text-base leading-relaxed">
                <span className="text-pink-base font-bold not-italic font-alice inline-block mr-1">Hint:</span>
                {hint}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Decorative Hearts */}
      <div className="absolute top-10 left-10 text-pink-light/40 -rotate-12 pointer-events-none">
        <Heart className="w-24 h-24 fill-current" />
      </div>
      <div className="absolute bottom-20 right-10 text-pink-light/40 rotate-12 pointer-events-none">
        <Heart className="w-32 h-32 fill-current" />
      </div>
    </div>
  );
};
