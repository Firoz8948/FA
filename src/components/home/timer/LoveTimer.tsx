"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLoveTimer } from "@/hooks/useLoveTimer";

export const LoveTimer: React.FC = () => {
  const { days, hours, minutes, seconds } = useLoveTimer();

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-6 min-w-[120px] bg-white/70 backdrop-blur-md rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
      <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">{value}</span>
      <span className="text-[11px] uppercase tracking-[0.2em] text-indigo-500 font-extrabold mt-2 opacity-80">{label}</span>
    </div>
  );

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-black text-slate-900 mb-2">Our Journey Together</h2>
          <p className="text-slate-500 mb-16 font-medium italic">Every moment has been magic Since April 15, 2025</p>
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

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-slate-600 text-xl font-medium tracking-tight"
        >
          Every second with you is a <span className="text-indigo-600 font-bold">treasure</span> I hold close to my heart...
        </motion.p>
      </div>
    </section>
  );
};
