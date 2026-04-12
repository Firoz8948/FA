"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles } from "lucide-react";

export const CuteMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const longMessage = `My Dearest,

From the moment you walked into my life, everything changed. You've brought a light into my world that I never knew was missing. Every laugh we share, every quiet moment we spend together, and every challenge we face — it all just makes me realize how incredibly lucky I am to have you.

You are my best friend, my greatest support, and the love of my life. I promise to always be there for you, to cherish every moment with you, and to love you more with each passing day. 

You make my heart full, and I am so grateful for us.

Forever and always,
Yours.`;

  return (
    <section className="pt-12 pb-12 px-6 relative overflow-hidden">
      {/* Decorative gradient behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center relative z-10 p-12 bg-white rounded-[48px] border-2 border-dashed border-pink-soft/40 shadow-xl shadow-pink-base/5"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 bg-pink-light rounded-full flex items-center justify-center text-pink-base shadow-inner"
          >
            <Heart className="w-8 h-8 fill-pink-base" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black text-pink-deep font-alice leading-tight">
            My heart for you
          </h2>
          
          <button
            onClick={() => setIsOpen(true)}
            className="group relative px-8 py-4 bg-pink-base hover:bg-pink-deep text-white rounded-full font-cardo italic text-xl transition-all duration-300 shadow-lg shadow-pink-base/20 hover:shadow-pink-base/40 hover:-translate-y-1"
          >
            <span className="relative z-10">Click here to read ✨</span>
            <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Modal / Popup */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-pink-deep/40 backdrop-blur-md cursor-pointer"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border-4 border-double border-pink-soft/20 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-pink-light transition-colors text-pink-soft hover:text-pink-base z-50 pointer-events-auto"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative z-10">
                  <div className="flex justify-center mb-8">
                    <Sparkles className="w-12 h-12 text-pink-soft opacity-40 animate-pulse" />
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto no-scrollbar pr-2">
                    <p className="font-alice text-2xl md:text-3xl text-pink-deep mb-8 leading-relaxed whitespace-pre-wrap">
                      {longMessage}
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-pink-soft/10 text-center">
                    <p className="font-cardo italic text-pink-soft text-lg font-bold">
                      Yours Always ❤️
                    </p>
                  </div>
                </div>

                {/* Decorative Elements inside Modal */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-light rounded-full opacity-30 blur-2xl pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-100 rounded-full opacity-30 blur-2xl pointer-events-none" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
