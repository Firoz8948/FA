"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface SuccessPopupProps {
  isVisible: boolean;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/25 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-white p-12 rounded-[2rem] shadow-2xl flex flex-col items-center gap-6 border-4 border-slate-200"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Heart className="w-20 h-20 text-pink-base fill-pink-base" />
            </motion.div>
            <h2 className="text-4xl font-bold text-pink-deep">Yay! Correct!</h2>
            <p className="text-xl text-pink-soft">I love you so much! ❤️</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
