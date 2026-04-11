"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HintMessageProps {
  message: string | null;
}

export const HintMessage: React.FC<HintMessageProps> = ({ message }) => {
  return (
    <div className="h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-pink-deep text-xl text-center"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
