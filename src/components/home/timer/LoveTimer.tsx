"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLoveTimer } from "@/hooks/useLoveTimer";

export const LoveTimer: React.FC = () => {
  const { days, hours, minutes, seconds } = useLoveTimer();

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-4 min-w-[100px] bg-white rounded-3xl shadow-lg border-2 border-pink-light">
      <span className="text-4xl font-bold text-pink-deep">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-pink-soft font-bold mt-1">{label}</span>
    </div>
  );

  return (
    <section className="py-24 px-6 bg-pink-light/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-pink-deep mb-12">Time Spent Together</h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <TimeUnit value={days} label="Days" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <TimeUnit value={hours} label="Hours" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <TimeUnit value={minutes} label="Minutes" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <TimeUnit value={seconds} label="Seconds" />
          </motion.div>
        </div>

        <p className="mt-12 text-pink-soft text-2xl">
          Every second with you is a gift I cherish...
        </p>
      </div>
    </section>
  );
};
