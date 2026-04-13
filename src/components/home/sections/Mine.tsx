"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const NICKNAMES = [
  "My Love", "My Heart", "My Jaan", "My Wifey", "My Sweetheart", 
  "My Baby", "My Jaanu", "My Kuchupuchu", "My Sweetiepie", "My Jaaneman", 
  "My Sabkuch", "My Duniyaa", "My Cutie", "My Hottie", "My Horny", 
  "My Chocopie", "My Sweetie", "My Honey"
];

export const Mine: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white">
      {/* Background Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100], 
              x: Math.random() * 20 - 10,
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          >
            <Heart className="text-pink-base fill-pink-base" size={Math.random() * 20 + 20} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-alice text-pink-deep mb-4">What Are You To Me?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-base/30 to-transparent mx-auto" />
        </motion.div>

        {/* The Crown Jewel */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="mb-12 relative inline-block p-8 border-4 border-double border-pink-base/20 rounded-[40px] bg-pink-light/20 backdrop-blur-sm"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">👑</div>
          <div className="flex items-center gap-3 justify-center">
            <Heart className="text-red-500 fill-red-500 w-8 h-8 md:w-10 md:h-10 animate-pulse" />
            <span className="text-4xl md:text-6xl font-black font-alice text-pink-deep drop-shadow-sm">
              Meri Begum Sahiba
            </span>
          </div>
        </motion.div>

        {/* The Mosaic Container */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {NICKNAMES.map((name, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.15, 
                rotate: Math.random() * 4 - 2,
                transition: { duration: 0.2 } 
              }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border-2 border-pink-light px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 shadow-sm shadow-pink-base/5 hover:shadow-pink-base/20 hover:border-pink-base/20 cursor-default"
            >
              <Heart className="text-red-500 fill-red-500 w-4 h-4 md:w-5 md:h-5" />
              <span className="font-alice text-lg md:text-xl text-pink-deep font-bold">
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-pink-soft font-cardo italic text-xl"
        >
          ...you are my entire universe ❤️
        </motion.div>
      </div>
    </section>
  );
};
