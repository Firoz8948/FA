"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export const Things: React.FC = () => {
  const thingsList = [
    "I love the way you stare at me, gusse wala hi sahi ❤️",
    "I love the way you stay happy and laugh with me ❤️",
    "Tumhara sharmaana mere se, that makes me more desperate to come closer to you ❤️",
    "The way you plan our future with me ❤️",
    "I love my baby all the time ❤️",
    "You are my first and last thought of the day ❤️",
    "You are a cute baby and i love you my babyyy ❤️",
    "You are most beautiful and cute my honeyyy ❤️",
    "I also like that side of yours, jo sirf maine dekha hai iykyk 👀",
  ];

  return (
    <section className="pt-12 pb-24 px-6 relative overflow-hidden">
      {/* Decorative gradient behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto relative z-10 p-10 md:p-14 bg-white rounded-[48px] border-2 border-dashed border-pink-soft/40 shadow-xl shadow-pink-base/5"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4 text-pink-base">
            <Sparkles className="w-10 h-10 animate-pulse" />
          </div>
          <h2 className="text-4xl font-black text-pink-deep mb-2 font-alice">Things I Love About You</h2>
          <p className="text-pink-soft font-medium italic font-cardo">Here is a small portion of them...</p>
        </div>

        <div className="space-y-6 text-left">
          {thingsList.map((thing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-6 bg-pink-light/20 rounded-2xl border border-pink-soft/5 group transition-colors hover:bg-pink-light/40"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-pink-base text-white flex items-center justify-center font-alice text-sm shadow-sm">
                  {index + 1}
                </div>
              </div>
              <p className="text-lg md:text-xl font-alice text-pink-deep leading-relaxed">
                {thing}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-2 px-6 py-2 bg-pink-base/10 rounded-full border border-pink-base/20">
            <Heart className="w-4 h-4 fill-pink-base text-pink-base" />
            <span className="font-cardo italic text-pink-deep font-bold italic text-base">And so much more...</span>
            <Heart className="w-4 h-4 fill-pink-base text-pink-base" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
