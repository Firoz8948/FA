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
  const [pin, setPin] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (pin.length === 4 && !isSubmitting) {
      setIsSubmitting(true);
      onComplete(pin);
    } else if (pin.length < 4) {
      setIsSubmitting(false);
    }
  }, [pin, onComplete, isSubmitting]);

  useEffect(() => {
    if (error && pin.length === 4) {
      const timer = setTimeout(() => {
        setPin("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [error, pin.length]);

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* PIN Dots */}
      <div className="flex gap-4">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            animate={error && pin.length === 4 ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={cn(
              "w-4 h-4 rounded-full border-2 border-pink-soft transition-all duration-300",
              pin.length > index ? "bg-pink-base scale-125 shadow-[0_0_10px_rgba(190,18,60,0.35)]" : "bg-transparent"
            )}
          />
        ))}
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <motion.button
            key={num}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleKeyPress(num.toString())}
            className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm border border-pink-light flex items-center justify-center text-2xl font-bold text-pink-deep hover:bg-pink-light/50 transition-colors"
          >
            {num}
          </motion.button>
        ))}
        <button className="w-16 h-16" /> {/* Placeholder */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleKeyPress("0")}
          className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm border border-pink-light flex items-center justify-center text-2xl font-bold text-pink-deep hover:bg-pink-light/50 transition-colors"
        >
          0
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBackspace}
          className="w-16 h-16 rounded-full flex items-center justify-center text-pink-soft hover:text-pink-deep transition-colors"
        >
          <Heart className="w-8 h-8 fill-current" />
        </motion.button>
      </div>
    </div>
  );
};
