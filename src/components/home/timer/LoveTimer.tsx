"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useLoveTimer } from "@/hooks/useLoveTimer";

export const LoveTimer: React.FC = () => {
  const { days, hours, minutes, seconds } = useLoveTimer();

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-6 min-w-[120px] bg-white/40 backdrop-blur-sm rounded-[32px] shadow-[0_8px_30px_rgb(244,63,94,0.04)] border border-pink-soft/20">
      <span className="text-5xl font-extrabold text-pink-deep tracking-tighter">{value}</span>
      <span className="text-[11px] uppercase tracking-[0.2em] text-pink-base font-extrabold mt-2 opacity-80">{label}</span>
    </div>
  );

  return (
    <section className="pt-20 pb-12 px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center relative z-10 p-12 bg-white rounded-[48px] border-2 border-dashed border-pink-soft/40 shadow-xl shadow-pink-base/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-black text-pink-deep mb-2">Our Journey Together</h2>
          <p className="text-pink-soft mb-16 font-medium italic">Every moment has been magic Since April 15, 2025</p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {[
            { value: days, label: "Days", delay: 0.1 },
            { value: hours, label: "Hours", delay: 0.2 },
            { value: minutes, label: "Minutes", delay: 0.3 },
            { value: seconds, label: "Seconds", delay: 0.4 },
          ].map((unit, i) => (
            <motion.div 
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: unit.delay 
              }}
            >
              <TimeUnit value={unit.value} label={unit.label} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-2xl font-bold text-pink-deep">
            <span>I Love You Beyond Words</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-8 h-8 fill-pink-base text-pink-base drop-shadow-sm" />
            </motion.div>
          </div>
          <p className="text-pink-soft font-medium tracking-tight">
            Every second with you is a <span className="text-pink-base font-bold">treasure</span> I hold close...
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
