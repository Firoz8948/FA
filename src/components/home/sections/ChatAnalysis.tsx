"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, MessageSquare, TrendingUp, Heart, Tally1 } from "lucide-react";

export const ChatAnalysis: React.FC = () => {
  const totalMessages = 170254;
  const firozMessages = 136768;
  const arbiyaMessages = totalMessages - firozMessages;
  
  const firozPercentage = ((firozMessages / totalMessages) * 100).toFixed(1);
  const arbiyaPercentage = ((arbiyaMessages / totalMessages) * 100).toFixed(1);

  const topWords = [
    { word: "love", count: 4719 },
    { word: "sorry", count: 4001 },
    { word: "baby", count: 3896 },
    { word: "kiss", count: 2875 },
    { word: "hug", count: 1717 },
    { word: "boobie", count: 659 },
    { word: "fuck", count: 503 },
    { word: "be", count: 501 },
  ];

  return (
    <section className="pt-12 pb-12 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto relative z-10 p-10 md:p-14 bg-white rounded-[48px] border-2 border-dashed border-pink-soft/40 shadow-xl shadow-pink-base/5"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-pink-light rounded-2xl mb-4 text-pink-base">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-black text-pink-deep mb-2 font-alice">Insta & Whatsapp Chat Analysis</h2>
          <p className="text-pink-soft font-medium italic font-cardo">Numbers that tell our story ❤️</p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-pink-light/30 rounded-3xl border border-pink-soft/10 text-center"
          >
            <MessageSquare className="w-6 h-6 text-pink-base mx-auto mb-3" />
            <span className="block text-pink-soft font-cardo uppercase tracking-widest text-xs mb-1">Total Messages</span>
            <span className="text-5xl font-black text-pink-deep font-alice">{totalMessages.toLocaleString()}</span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-pink-light/30 rounded-3xl border border-pink-soft/10 text-center"
          >
            <TrendingUp className="w-6 h-6 text-pink-base mx-auto mb-3" />
            <span className="block text-pink-soft font-cardo uppercase tracking-widest text-xs mb-1">Top Sender</span>
            <span className="text-3xl font-black text-pink-deep font-alice">FIROZ</span>
            <span className="block text-pink-soft mt-1 font-cardo italic">{firozMessages.toLocaleString()} messages</span>
          </motion.div>
        </div>

        {/* Participant Breakdown */}
        <div className="space-y-10 mb-16">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <span className="text-xl font-alice text-pink-deep">Firoz</span>
              <span className="text-pink-soft font-cardo italic">{firozMessages.toLocaleString()} ({firozPercentage}%)</span>
            </div>
            <div className="h-4 w-full bg-pink-light/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${firozPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-pink-soft to-pink-base rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <span className="text-xl font-alice text-pink-deep">Arbiya</span>
              <span className="text-pink-soft font-cardo italic">{arbiyaMessages.toLocaleString()} ({arbiyaPercentage}%)</span>
            </div>
            <div className="h-4 w-full bg-pink-light/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${arbiyaPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-pink-soft to-pink-rose rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Top Words & Emojis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Top Words */}
          <div>
            <h3 className="text-2xl font-alice text-pink-deep mb-6 flex items-center gap-2">
              <span className="text-pink-base">#</span> Top Words
            </h3>
            <div className="space-y-4">
              {topWords.map((item, idx) => (
                <div key={item.word} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-soft group-hover:scale-150 transition-transform" />
                    <span className="text-lg font-alice text-pink-deep/80 group-hover:text-pink-deep transition-colors">{item.word}</span>
                  </div>
                  <span className="text-pink-soft font-cardo font-bold">{item.count.toLocaleString()} uses</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Emojis */}
          <div className="bg-pink-light/20 p-8 rounded-[40px] border border-pink-soft/5">
            <h3 className="text-2xl font-alice text-pink-deep mb-8 text-center">Top Emojis</h3>
            <div className="flex justify-center gap-12">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md border border-pink-soft/10">
                  <Heart className="w-10 h-10 fill-pink-base text-pink-base" />
                </div>
                <span className="font-alice text-pink-deep text-xl">Heart</span>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md border border-pink-soft/10">
                  <span className="text-4xl text-blue-400">🥺</span>
                </div>
                <span className="font-alice text-pink-deep text-xl">Cry</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
