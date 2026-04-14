"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  onComplete: (password: string) => void;
  error?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ onComplete, error }) => {
  const [password, setPassword] = useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount to fix hydration issues with autoFocus attribute
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setPassword("");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (password.trim()) {
      onComplete(password.toLowerCase());
    }
  };

  const clear = () => setPassword("");
  const back = () => setPassword(prev => prev.slice(0, -1));

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[320px] md:max-w-sm px-2 md:px-4" suppressHydrationWarning>
      <form onSubmit={handleSubmit} className="w-full relative">
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type password..."
            suppressHydrationWarning
            className={cn(
              "w-full h-14 md:h-16 px-6 bg-white/50 backdrop-blur-md rounded-3xl border-2 transition-all duration-300 text-center text-lg md:text-xl font-cardo text-pink-deep placeholder:text-pink-soft/40 outline-none",
              error ? "border-rose-400 shadow-[0_0_20px_rgba(251,113,133,0.3)]" : "border-pink-light focus:border-pink-base focus:shadow-[0_10px_30px_rgba(190,18,60,0.1)]"
            )}
          />
        </motion.div>
      </form>

      <div className="grid grid-cols-3 gap-2 md:gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clear}
          className="h-12 md:h-14 rounded-2xl bg-white/40 border border-pink-light text-pink-deep font-alice text-xs md:text-sm uppercase tracking-wider hover:bg-pink-light/20 transition-all font-bold"
        >
          Clear
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={back}
          className="h-12 md:h-14 rounded-2xl bg-white/40 border border-pink-light text-pink-deep flex items-center justify-center hover:bg-pink-light/20 transition-all font-alice text-xs md:text-sm uppercase tracking-wider font-bold"
        >
          Cut
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSubmit()}
          className="h-12 md:h-14 rounded-2xl bg-pink-base border border-pink-deep/20 text-white font-alice text-xs md:text-sm uppercase tracking-wider shadow-lg shadow-pink-base/20 hover:bg-pink-deep transition-all font-bold"
        >
          Enter
        </motion.button>
      </div>
    </div>
  );
};
