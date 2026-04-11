"use client";

import React from "react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center space-y-8 z-10"
      >
        <div className="inline-block px-6 py-2 rounded-full bg-pink-light/50 border border-pink-soft text-pink-deep font-bold text-sm tracking-widest uppercase mb-4">
          Celebrating Us
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-pink-deep drop-shadow-md">
          To the Love of <br/> 
          <span className="text-pink-base">My Life</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-xl md:text-2xl text-pink-soft leading-relaxed">
          Every day since we met has been a beautiful journey. 
          This is a small piece of my heart dedicated to you.
        </p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="pt-12 text-pink-soft"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-light/30 rounded-full blur-3xl -z-0" />
    </section>
  );
};
