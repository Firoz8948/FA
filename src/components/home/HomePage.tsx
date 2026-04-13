"use client";

import React from "react";
import { LoveTimer } from "./timer/LoveTimer";
import { Second } from "./sections/Second";
import { MessagesSection } from "./messages/MessagesSection";
import { CuteMessage } from "./sections/CuteMessage";
import { MoonSection } from "./sections/MoonSection";
import { Mine } from "./sections/Mine";
import { SongDedication } from "./sections/SongDedication";
import { Qna } from "./sections/Qna";
import { ChatAnalysis } from "./sections/ChatAnalysis";
import { Spinner } from "./sections/Spinner";
import { Things } from "./sections/Things";
import { FloatingControls } from "../ui/FloatingControls";
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
        <ChatAnalysis />
        <Qna />
        <Spinner />
        <Things />
        <MoonSection />
        <Mine />
        <SongDedication />
      </main>

      {/* Floating Action Controls */}
      <FloatingControls heartsEnabled={heartsEnabled} onToggleHearts={onToggleHearts} />

      <footer className="py-20 px-6 text-center bg-white/50 backdrop-blur-sm border-t border-pink-soft/20">
        <div className="max-w-2xl mx-auto">
          <p className="font-alice text-xl md:text-2xl text-pink-deep mb-6 leading-relaxed">
            I know sometimes things gets tough, but I Promise to make it work until my last breathe, I hope you trust me. I will make us reach where we want to. And I know sometimes mai galtiya karta hu but dont be so hard on me. Dont forget that I am your baby
          </p>
          <p className="font-black text-pink-base text-2xl mb-2">I Love You Beyond Words ❤️</p>
          <p className="text-pink-soft text-xl font-bold italic font-cardo">Always & Forever Yours, Firoz</p>
        </div>
      </footer>
    </div>
  );
};
