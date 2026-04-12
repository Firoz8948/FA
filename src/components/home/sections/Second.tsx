"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart } from "lucide-react";

export const Second: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="mb-10">
          <h2 className="text-4xl font-black text-pink-deep mb-2">A Moment Frozen in Time</h2>
          <p className="text-pink-soft font-medium italic text-base sm:text-lg">Click the polaroid to reveal a memory...</p>
        </div>

        <div className="flex justify-center items-center h-[380px] md:h-[500px]">
          <motion.div
            layout
            onClick={() => setIsOpen(!isOpen)}
            className="relative cursor-pointer group flex items-center justify-center w-full max-w-[260px] md:max-w-sm h-full"
          >
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="w-60 md:w-72 h-[300px] md:h-[400px] bg-pink-light rounded-2xl flex flex-col items-center justify-center border-2 border-white shadow-lg shadow-pink-base/10 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-soft/20 to-transparent pointer-events-none" />
                  
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mb-4"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Camera className="w-6 h-6 md:w-8 md:h-8 text-pink-base" />
                    </div>
                  </motion.div>

                  <span className="font-alice text-xl md:text-2xl text-pink-deep mb-1">Our Story</span>
                  <span className="font-cardo italic text-pink-soft text-base md:text-lg font-bold">Click to See</span>
                  
                  {/* Decorative tape at the top */}
                  <div className="absolute -top-1 w-16 h-6 md:w-20 md:h-8 bg-white/40 backdrop-blur-sm -rotate-2" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, scale: 1.1, rotateY: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -180 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="w-full h-full bg-white p-3 md:p-4 rounded-xl shadow-2xl border border-pink-soft/10"
                >
                  <div className="w-full h-full overflow-hidden rounded-lg bg-pink-light relative group">
                    <img
                      src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop"
                      alt="Our memory"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-deep/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/30">
                        <Heart className="w-3 h-3 md:w-4 md:h-4 fill-white text-white" />
                        <span className="text-white font-alice text-sm md:text-lg">Always Beside You</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          className="mt-10"
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="text-pink-soft hover:text-pink-base underline underline-offset-4 decoration-pink-soft/30 transition-colors font-cardo italic text-sm md:text-base"
          >
            Hide the memory
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
