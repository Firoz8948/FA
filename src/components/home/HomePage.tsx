"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "./hero/HeroSection";
import { LoveTimer } from "./timer/LoveTimer";
import { PhotoSection } from "./photos/PhotoSection";
import { MessagesSection } from "./messages/MessagesSection";
import { GameSection } from "./game/GameSection";
import { FlowerSection } from "./flowers/FlowerSection";
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
        className="fixed top-20 left-0 right-0 h-1 bg-pink-base origin-left z-50"
        style={{ scaleX }}
      />

      <main>
        <HeroSection />
        <LoveTimer />
        <PhotoSection />
        <MessagesSection />
        <GameSection />
        <FlowerSection />
      </main>

      <footer className="py-12 px-6 text-center bg-white">
        <p className="font-bold text-pink-deep text-2xl">I Love You Beyond Words ❤️</p>
        <p className="text-pink-soft text-xl mt-2">Always & Forever Yours</p>
      </footer>
    </div>
  );
};
