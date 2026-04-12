"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCard } from "./MessageCard";
import { MESSAGES } from "@/constants/messages";

export const MessagesSection: React.FC = () => {
  return (
    <section className="pt-12 pb-12 px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center relative z-10 p-12 bg-white rounded-[48px] border-2 border-dashed border-pink-soft/40 shadow-xl shadow-pink-base/5"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-pink-deep mb-2 font-alice">Little Love Notes</h2>
          <p className="text-pink-soft font-medium italic font-cardo">Tiny messages from my heart to yours...</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {MESSAGES.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MessageCard message={msg} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
