"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCard } from "./MessageCard";
import { MESSAGES } from "@/constants/messages";

export const MessagesSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-stone-100/70 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pink-deep">Little Love Notes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MESSAGES.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MessageCard message={msg} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
