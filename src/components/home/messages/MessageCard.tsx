"use client";

import React from "react";
import { motion } from "framer-motion";
import { Message } from "@/types";
import { cn } from "@/lib/utils";

export const MessageCard: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: message.id % 2 === 0 ? 1 : -1 }}
      className={cn(
        "p-8 rounded-[2rem] shadow-lg border-2 flex flex-col gap-4 text-center relative overflow-hidden",
        message.color === "pink" && "bg-pink-light/30 border-pink-soft text-pink-deep",
        message.color === "rose" && "bg-white border-pink-rose/20 text-pink-rose",
        message.color === "deep" && "bg-pink-base/10 border-pink-base/30 text-pink-deep",
        message.color === "soft" && "bg-white border-pink-soft/30 text-pink-soft"
      )}
    >
      <div className="text-4xl">{message.emoji}</div>
      <p className="text-2xl leading-relaxed">
        "{message.text}"
      </p>
      
      {/* Decorative element */}
      <div className="absolute top-2 right-4 opacity-10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </motion.div>
  );
};
