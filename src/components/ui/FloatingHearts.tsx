"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartData {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingHearts: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [hearts, setHearts] = useState<HeartData[]>([]);

  useEffect(() => {
    if (!enabled) {
      setHearts([]);
      return;
    }

    const interval = setInterval(() => {
      const newHeart: HeartData = {
        id: Date.now(),
        x: Math.random() * 100,
        size: Math.random() * (40 - 15) + 15,
        duration: Math.random() * (10 - 5) + 5,
        delay: Math.random() * 2,
      };

      setHearts((prev) => [...prev.slice(-30), newHeart]);
    }, 600);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "110vh", opacity: 0, x: `${heart.x}vw` }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.4, 0.4, 0],
              x: `${heart.x + (Math.random() - 0.5) * 10}vw`
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.duration, 
              delay: heart.delay,
              ease: "linear" 
            }}
            className="absolute text-rose-400"
          >
            <Heart 
              size={heart.size} 
              fill="currentColor" 
              className="drop-shadow-md opacity-25"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
