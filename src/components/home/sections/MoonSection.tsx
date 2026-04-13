"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export const MoonSection: React.FC = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-white">
      {/* Pink Starry Background Effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
            }}
            className="absolute text-pink-base"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Star size={Math.random() * 10 + 5} fill="currentColor" opacity={0.3} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto relative z-10 p-12 md:p-20 bg-pink-light/30 rounded-[48px] border-2 border-pink-base/20 shadow-xl shadow-pink-base/5 flex flex-col items-center text-center"
      >
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-base/20 text-pink-base text-sm font-bold mb-6 italic">
            <Sparkles className="w-4 h-4" />
            <span>November 19, 2004</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-alice text-pink-deep mb-4 leading-tight">The Night You Blessed This World</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-base to-transparent mx-auto" />
        </div>

        <div className="relative mb-12 group flex flex-col items-center">
          {/* Soft Pink Moon Glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-pink-base/20 blur-[60px] rounded-full group-hover:bg-pink-base/30 transition-colors"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring" }}
            className="relative"
          >
            <img 
              src="/assets/moon.webp" 
              alt="Moon on Nov 19 2004" 
              className="w-56 h-56 md:w-72 md:h-72 drop-shadow-[0_10px_20px_rgba(244,63,94,0.15)] object-contain"
            />
          </motion.div>

          {/* Moon Phase Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-[10px] md:text-xs uppercase tracking-[0.15em] text-pink-base/60 font-medium max-w-xs mx-auto leading-relaxed"
          >
            First Quarter on 19 November 2004, Friday. <br />
            The illuminated surface of the moon is 53% and growing larger. <br />
            The lunar cycle is 7 days young.
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl"
        >
          <p className="text-2xl md:text-3xl font-cardo italic text-pink-deep leading-relaxed">
            "This was the moon in the sky when you came and after that day, this moon is never beautiful. <span className="text-pink-base font-bold not-italic decoration-pink-base/40 underline underline-offset-8">Only beautiful is my baby.</span>"
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-3">
             <div className="h-px w-12 bg-pink-base/30" />
             <div className="w-2 h-2 rounded-full bg-pink-base/50" />
             <div className="h-px w-12 bg-pink-base/30" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
