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
          ? "bg-pink-base text-white ring-4 ring-pink-light" 
          : "bg-white text-pink-soft ring-2 ring-pink-soft/20"
      )}
      title={enabled ? "Disable hearts" : "Enable hearts"}
    >
      {enabled ? <Heart size={20} fill="currentColor" /> : <HeartOff size={20} />}
    </motion.button>
  );
};
