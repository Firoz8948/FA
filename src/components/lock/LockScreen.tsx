"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PasswordInput } from "./PasswordInput";
import { HintMessage } from "./HintMessage";
import { SuccessPopup } from "./SuccessPopup";
import { PASSWORDS } from "@/constants/passwords";
import { X, Heart } from "lucide-react";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handlePasswordSubmit = React.useCallback((input: string) => {
    if (input === "1234") {
      setIsSpecial(true);
      setError(false);
      setErrorMessage("");
      return;
    }

    if (input === "6163") {
      setIsSuccess(true);
      setError(false);
      setErrorMessage("");
      setTimeout(() => {
        onUnlock();
      }, 2000);
    } else {
      setError(true);
      setErrorMessage("Galat hai challll");
      setAttempts((prev) => prev + 1);
      // Let the PasswordInput component clear the pin, 
      // but we wait a bit to reset the error state here too.
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 1500);
    }
  }, [onUnlock]);

  React.useEffect(() => {
    if (attempts > 0) {
      const entry = PASSWORDS.find(p => p.password === "6163");
      if (entry) setHint(entry.hint);
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
          <h1 className="text-5xl font-bold text-pink-deep drop-shadow-sm font-alice">
            Hello Beautiful ❤️
          </h1>
          <p className="text-pink-soft text-2xl font-cardo italic">
            Enter our special code to enter
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <PasswordInput onComplete={handlePasswordSubmit} error={error} />
          <AnimatePresence>
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-pink-rose font-bold font-cardo"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        <HintMessage message={hint} />
      </motion.div>

      {/* Special Popup for 1234 */}
      <AnimatePresence>
        {isSpecial && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-pink-deep/20 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl border-2 border-dashed border-pink-soft/40 text-center"
            >
              <button
                onClick={() => setIsSpecial(false)}
                className="absolute top-4 right-4 p-2 text-pink-soft hover:text-pink-base transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex justify-center mb-6">
                <Heart className="w-12 h-12 fill-pink-base text-pink-base animate-bounce" />
              </div>

              <h2 className="text-3xl font-alice text-pink-deep mb-4">Baby I wanna marry you</h2>
              <p className="text-xl font-cardo italic text-pink-soft">Aur webite ke liye thoda sabar kar be</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Decorative Hearts */}
      <div className="absolute top-10 left-10 text-slate-300/30 -rotate-12 pointer-events-none">
        <Heart className="w-24 h-24 fill-current" />
      </div>
      <div className="absolute bottom-20 right-10 text-slate-300/30 rotate-12 pointer-events-none">
        <Heart className="w-32 h-32 fill-current" />
      </div>
    </div>
  );
};
