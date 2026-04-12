"use client";

import React from "react";
import { LoveTimer } from "./timer/LoveTimer";
import { Second } from "./sections/Second";
import { MessagesSection } from "./messages/MessagesSection";
import { CuteMessage } from "./sections/CuteMessage";
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
    <div className="relative bg-pink-light min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50 bg-gradient-to-r from-pink-soft via-pink-base to-pink-rose"
        style={{ scaleX }}
      />

      <main>
        <LoveTimer />
        <Second />
        <MessagesSection />
        <CuteMessage />
      </main>

      <footer className="py-12 px-6 text-center bg-white/50 backdrop-blur-sm border-t border-pink-soft/20">
        <p className="font-bold text-pink-deep text-2xl">I Love You Beyond Words ❤️</p>
        <p className="text-pink-soft text-xl mt-2 font-medium italic">Always & Forever Yours</p>
      </footer>
    </div>
  );
};
