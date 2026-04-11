"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Flower {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export const FlowerSection: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const newFlower: Flower = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      rotation: Math.random() * 360,
      scale: Math.random() * (1.5 - 0.8) + 0.8,
    };
    
    setFlowers((prev) => [...prev, newFlower]);
    
    // Auto remove after animation
    setTimeout(() => {
      setFlowers((prev) => prev.filter((f) => f.id !== newFlower.id));
    }, 3000);
  };

  return (
    <section 
      className="h-[60vh] flex flex-col items-center justify-center bg-pink-light/10 relative cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div className="text-center z-10 pointer-events-none">
        <h2 className="text-4xl font-bold text-pink-deep mb-4">A Garden for You</h2>
        <p className="text-pink-soft text-2xl">Click anywhere to grow a flower... 🌸</p>
      </div>

      <AnimatePresence>
        {flowers.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, scale: 0, x: f.x - 25, y: f.y - 25, rotate: f.rotation - 45 }}
            animate={{ opacity: 1, scale: f.scale, rotate: f.rotation }}
            exit={{ opacity: 0, scale: 0, y: f.y - 50 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="fixed pointer-events-none"
            style={{ left: 0, top: 0 }}
          >
            <div className="text-4xl">🌸</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};
