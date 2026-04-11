"use client";

import React from "react";
import { HeartToggle } from "./HeartToggle";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  heartsEnabled: boolean;
  onToggleHearts: () => void;
  timerText: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  heartsEnabled, 
  onToggleHearts,
  timerText
}) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-20 px-6 z-40 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-pink-light/50"
    >
      <div
        className="bg-pink-base h-11 shrink-0 rounded-xl flex items-center justify-center gap-1 px-3 shadow-lg shadow-pink-base/30"
        aria-label="F heart A"
      >
        <span className="font-bold text-xl leading-none text-white">F</span>
        <Heart
          className="h-5 w-5 shrink-0 fill-red-500 stroke-red-500 text-red-500"
          strokeWidth={2}
          aria-hidden
        />
        <span className="font-bold text-xl leading-none text-white">A</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-pink-soft font-bold">Together for</span>
          <span className="text-sm font-bold text-pink-deep">{timerText}</span>
        </div>
        
        <HeartToggle enabled={heartsEnabled} onToggle={onToggleHearts} />
      </div>
    </motion.nav>
  );
};
