"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Trophy, X, Heart, Mail, Utensils, Ship, Bed, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import { EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_LOVE_LETTER_TEMPLATE, EMAILJS_GLOBAL_PRIZE_TEMPLATE } from "@/constants/emailjs";

const PRIZES = [
  { 
    id: 1, 
    label: "Love Letter", 
    color: "#FFC2D1",
    icon: Mail,
    popup: "Hey baby, you will recieve a beautiful letter from your baby on mail ❤️",
    notify: "Arbiya will recieve a letter on mail arbiyakhan1911@gmail.com. Firoz is notified!"
  },
  { 
    id: 2, 
    label: "Swiggy Rs 250", 
    color: "#FFE5EC", // Rare 1 in 100
    icon: Utensils,
    popup: "Hey My Love, you will recieve a swiggy voucher on your mail ❤️",
    notify: "Arbiya will receive the voucher on mail and Firoz is notified!"
  }, 
  { 
    id: 3, 
    label: "Boat Trip", 
    color: "#FFD6E0",
    icon: Ship,
    popup: "Hey Sweetie, your baby will plan a trip from boat. More details on mail ❤️",
    notify: "Trip Details are being sent to Arbiya on mail and Firoz is notified!"
  },
  { 
    id: 4, 
    label: "Romance", 
    color: "#FFB3C6",
    icon: Bed,
    popup: "Lets meet and I will fuck you badly my sweetie ❤️",
    notify: "Firoz has been notified about the Romance prize!"
  },
  { 
    id: 5, 
    label: "Recieve A Call", 
    color: "#FF8FAB",
    icon: Phone,
    popup: "Your baby will call you within 10 mints. ❤️",
    notify: "Firoz has been notified that he needs to make a call now!"
  },
];

export const Spinner: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<typeof PRIZES[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);

    // Equal probability for all prizes
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);

    const segmentAngle = 360 / PRIZES.length;
    const extraSpins = 7 + Math.floor(Math.random() * 5); 
    const offset = Math.random() * (segmentAngle * 0.7) + (segmentAngle * 0.15); 
    const finalRotation = rotation + (extraSpins * 360) + (360 - (prizeIndex * segmentAngle)) - offset;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = PRIZES[prizeIndex];
      setWonPrize(prize);
      
      // Wait another 2 seconds so she can see where the needle stopped
      setTimeout(() => {
        setShowResult(true);
        sendNotification(prize);
      }, 2000);
    }, 5000);
  };

  const sendNotification = (prize: typeof PRIZES[0]) => {
    // Determine which template to use
    const premiumPrizes = ["Love Letter", "Swiggy Rs 250", "Boat Trip"];
    const templateId = premiumPrizes.includes(prize.label)
      ? EMAILJS_LOVE_LETTER_TEMPLATE 
      : EMAILJS_GLOBAL_PRIZE_TEMPLATE;

    // Mapping for Unified Template Dynamic Fields
    const prizeIcons: { [key: string]: string } = {
      "Love Letter": "✉️",
      "Swiggy Rs 250": "🍟",
      "Boat Trip": "⛵",
      "Romance": "🛏️",
      "Recieve A Call": "📞"
    };

    const prizeMessages: { [key: string]: string } = {
      "Love Letter": "Your baby is pouring his heart out into a beautiful message just for you.",
      "Swiggy Rs 250": "Time to treat yourself! Your baby has a tasty surprise waiting for you.",
      "Boat Trip": "Pack your bags! You've got a ticket to the sunset on a romantic boat trip.",
      "Romance": "Get ready for a night of passion! Lets meet and I will fuck you badly my sweetie.",
      "Recieve A Call": "Phone is ringing! Your baby will call you within 10 minutes to hear your voice."
    };

    const templateParams = {
      to_name: "Arbiya",
      prize_name: prize.label,
      prize_icon: prizeIcons[prize.label] || "🎁",
      prize_message: prizeMessages[prize.label] || prize.popup,
      arbiya_mail: "arbiyakhan1911@gmail.com", 
      firoz_mail: "loveumates@gmail.com",
      message: `Hi Firoz, Arbiya got this prize: ${prize.label}. ${prize.notify}`,
    };

    emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams,
      EMAILJS_PUBLIC_KEY
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
      console.error('FAILED...', err);
    });
  };

  return (
    <section className="pt-12 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto text-center relative z-10 p-10 md:p-14 bg-white rounded-[48px] border-2 border-pink-base/20 shadow-xl shadow-pink-base/5"
      >
        <div className="mb-12">
          <div className="flex justify-center mb-4 text-pink-base">
            <Gift className="w-10 h-10 animate-bounce" />
          </div>
          <h2 className="text-4xl font-black text-pink-deep mb-2 font-alice">Lucky Spinner</h2>
          <p className="text-pink-soft font-medium italic font-cardo">Spin and win a surprise from Firoz! ❤️</p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Spinner Needle */}
          <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 z-30">
            <motion.div 
              animate={isSpinning ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="relative w-8 h-12"
            >
              {/* The sharp needle shape */}
              <div 
                className="w-full h-full bg-pink-deep shadow-lg"
                style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}
              />
              {/* Needle pin dot at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-pink-deep" />
            </motion.div>
          </div>

          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-8 border-pink-light shadow-2xl overflow-hidden bg-white">
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 5, ease: [0.32, 0.64, 0.45, 1] }}
              className="w-full h-full relative"
              style={{ transformOrigin: "center" }}
            >
              {PRIZES.map((prize, index) => {
                const angle = 360 / PRIZES.length;
                const rotate = angle * index;
                const skew = 90 - angle;
                const Icon = prize.icon;

                return (
                  <div
                    key={prize.id}
                    className="absolute top-0 right-0 w-1/2 h-1/2"
                    style={{
                      transformOrigin: "0% 100%",
                      transform: `rotate(${rotate}deg) skewY(-${skew}deg)`,
                      backgroundColor: prize.color,
                    }}
                  >
                    <div
                      className="absolute bottom-0 left-0 w-[200%] h-[200%] flex items-center justify-center"
                      style={{
                        transform: `skewY(${skew}deg) rotate(${angle / 2}deg) translate(25%, -25%)`,
                      }}
                    >
                      {Icon && (
                        <div className="flex flex-col items-center justify-center text-pink-deep text-center px-2">
                          <Icon 
                            strokeWidth={2.5} 
                            className="w-5 h-5 md:w-8 md:h-8 mb-1 md:mb-2 opacity-90" 
                          />
                          <span className="text-[9px] md:text-[13px] font-black font-alice leading-tight uppercase tracking-tighter max-w-[70px] md:max-w-[90px]">
                            {prize.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-pink-light flex items-center justify-center z-10">
              <Heart className="w-8 h-8 fill-pink-base text-pink-base" />
            </div>
          </div>

          <button
            onClick={spin}
            disabled={isSpinning}
            className={`mt-12 px-16 py-4 bg-pink-base text-white rounded-full font-black text-2xl shadow-xl transition-all ${
              isSpinning ? "opacity-50 cursor-not-allowed grayscale" : "hover:bg-pink-deep hover:scale-105 active:scale-95"
            }`}
          >
            {isSpinning ? "SPINNING..." : "SPIN"}
          </button>

          <p className="mt-8 text-pink-soft font-cardo italic text-lg max-w-sm">
            Note: There are 5 different prizes, keep spinning until you recieve all of them ❤️
          </p>
        </div>

        {/* Result Modal */}
        <AnimatePresence>
          {showResult && wonPrize && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowResult(false)}
                className="absolute inset-0 bg-pink-deep/20 backdrop-blur-md cursor-pointer"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl border-2 border-pink-base/20 text-center"
              >
                <button
                  onClick={() => setShowResult(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-pink-light transition-colors text-pink-soft hover:text-pink-base"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-pink-light rounded-full text-pink-base">
                    <Trophy className="w-12 h-12 animate-bounce" />
                  </div>
                </div>

                <h3 className="text-2xl font-alice text-pink-soft mb-4">You Won! ❤️</h3>
                <h2 className="text-xl font-bold text-pink-deep mb-8 font-cardo leading-relaxed px-2">
                  {wonPrize.popup}
                </h2>
                
                <button
                  onClick={() => setShowResult(false)}
                  className="px-12 py-3 bg-pink-base text-white rounded-full font-bold text-lg hover:bg-pink-deep transition-colors shadow-lg"
                >
                  Next
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
