"use client";

import React from "react";
import { motion } from "framer-motion";
import { Message } from "@/types";
import { cn } from "@/lib/utils";
import { Heart, Sparkles, Flower2, Wind } from "lucide-react";

export const MessageCard: React.FC<{ message: Message }> = ({ message }) => {
  const getIcon = (emoji: string) => {
    switch (emoji) {
      case "💖": return <Heart className="w-10 h-10 fill-pink-base text-pink-base" />;
      case "✨": return <Sparkles className="w-10 h-10 text-pink-soft" />;
      case "🌸": return <Flower2 className="w-10 h-10 text-pink-base" />;
      case "🦋": return <span className="text-4xl">🦋</span>;
      default: return <span className="text-4xl">{emoji}</span>;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: message.id % 2 === 0 ? 0.5 : -0.5 }}
      className={cn(
        "p-8 rounded-[2rem] shadow-sm border border-pink-soft/10 flex flex-col gap-5 text-center relative overflow-hidden h-full min-h-[220px] justify-center",
        "bg-pink-light/30 backdrop-blur-sm"
      )}
    >
      <div className="flex justify-center flex-shrink-0 mb-2">
        {getIcon(message.emoji)}
      </div>
      <p className="text-xl md:text-2xl leading-relaxed text-pink-deep font-alice font-medium">
        "{message.text}"
      </p>
      
      {/* Decorative background heart */}
      <div className="absolute -bottom-4 -right-4 opacity-5 text-pink-base">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </motion.div>
  );
};
