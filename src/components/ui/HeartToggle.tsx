"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeartToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const HeartToggle: React.FC<HeartToggleProps> = ({ enabled, onToggle }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={cn(
        "p-3 rounded-full transition-all duration-500 shadow-md",
        enabled 
          ? "bg-pink-base text-white ring-4 ring-rose-200" 
          : "bg-white text-slate-500 ring-2 ring-slate-200/80"
      )}
      title={enabled ? "Disable hearts" : "Enable hearts"}
    >
      {enabled ? <Heart size={20} fill="currentColor" /> : <HeartOff size={20} />}
    </motion.button>
  );
};
