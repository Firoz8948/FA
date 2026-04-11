"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { LoveTimer } from "./timer/LoveTimer";
import { useLoveTimer } from "@/hooks/useLoveTimer";
import { motion, useScroll, useSpring } from "framer-motion";

interface HomePageProps {
  heartsEnabled: boolean;
  onToggleHearts: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  heartsEnabled, 
  onToggleHearts 
}) => {
  const { days, hours, minutes } = useLoveTimer();
  const timerText = `${days}d ${hours}h ${minutes}m`;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-cream min-h-screen">
      <Navbar 
        heartsEnabled={heartsEnabled} 
        onToggleHearts={onToggleHearts}
        timerText={timerText}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-1 origin-left z-50 bg-gradient-to-r from-rose-600 via-pink-base to-indigo-600"
        style={{ scaleX }}
      />

      <main>
        <LoveTimer />
      </main>

      <footer className="py-12 px-6 text-center bg-white border-t border-slate-200/80">
        <p className="font-bold text-slate-800 text-2xl">I Love You Beyond Words ❤️</p>
        <p className="text-slate-600 text-xl mt-2">Always & Forever Yours</p>
      </footer>
    </div>
  );
};
