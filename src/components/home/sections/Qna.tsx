"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Heart, RotateCcw, Send } from "lucide-react";

type QnaStep = {
  question: string;
  type: "choice" | "auto-loop";
  options?: {
    label: string;
    response: string | string[];
    nextStep?: number;
    isLoop?: boolean;
    isKissLoop?: boolean;
  }[];
  lines?: string[]; // For auto-loop/sequence steps
};

export const Qna: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [kissLoopCount, setKissLoopCount] = useState(0);
  const [imaginationIndex, setImaginationIndex] = useState(0);

  const steps: QnaStep[] = [
    {
      question: "Do you love your baby?",
      type: "choice",
      options: [
        { 
          label: "Yes", 
          response: "Achaaa? Itni jaldi maan gayi? Aaj itna pyar aa raha kya",
          isLoop: true 
        },
        { 
          label: "No", 
          response: "Haan haan pata tha tum yaha bhi mana karogi… but I love my baby ❤️",
          nextStep: 1 
        }
      ]
    },
    {
      question: "Babyyy kissi de do?",
      type: "choice",
      options: [
        { 
          label: "Give Kisses", 
          response: "Haan ab thik lag raha ❤️",
          nextStep: 2
        },
        { 
          label: "Nahi milegi", 
          response: [
            "De do yaar babyyy",
            "Please de do babyyy",
            "De do sweetiee ek hi to mang raha hu",
            "Acha last time bol raha hu… de do naaa ❤️",
            "Deeeeeeeeee Doooooooooooooo ❤️"
          ],
          isKissLoop: true
        }
      ]
    },
    {
      question: "Sach sach batao… miss karti ho mujhe?",
      type: "choice",
      options: [
        { 
          label: "Haan", 
          response: "Kitnaaa? itna ya itnaaaaa ❤️",
          nextStep: 3
        },
        { 
          label: "Nahi", 
          response: "Waah pata tha muje… you don’t miss your baby… only your baby miss you bas ❤️",
          nextStep: 3
        }
      ]
    },
    {
      question: "Babyyyy ek baat bolu? ❤️",
      type: "choice",
      options: [
        { 
          label: "Bolo", 
          response: "Babyyyy I wanna see you in red shadi ke jode me ❤️",
          nextStep: 4
        },
        { 
          label: "Nahi sunna", 
          response: "Sun lo na ek baar… dil se bol raha hu",
          isLoop: true
        }
      ]
    },
    {
      question: "Chalo thoda imagine karte hai...",
      type: "auto-loop",
      lines: [
        "Tum red jode me… me bas tumhe dekhta reh jaun ❤️",
        "Aur jab tum sharmaogi na… bas wahi moment freeze kar du ❤️",
        "You are already mine❤️",
        "And official soon"
      ]
    },
    {
      question: "You are my baby na ❤️",
      type: "choice",
      options: [
        { 
          label: "Haan", 
          response: "Bas yehi sunna tha ❤️",
          nextStep: 6
        },
        { 
          label: "Pata nahi", 
          response: "Natak mat kar be ❤️",
          nextStep: 6
        }
      ]
    },
    {
      question: "Date pe chale fir?",
      type: "choice",
      options: [
        { 
          label: "Chalo!", 
          response: "Yesss Be readyyyy ❤️",
          nextStep: 7
        },
        { 
          label: "Nahi jana", 
          response: "Kyuuu ❤️",
          nextStep: 7
        }
      ]
    },
    {
      question: "Agar me bolu ki mai meri baby ko accha accha khiluanga tab ❤️",
      type: "choice",
      options: [
        { 
          label: "Kya khilaoge", 
          response: "Jo bhi meri baby ko khana rahega sab",
          nextStep: 8
        },
        { 
          label: "Nahi Khana", 
          response: "Pata tha tu yaha bhi mana hi karegi muje?",
          nextStep: 8
        }
      ]
    }
  ];

  const triggerTyping = (callback: () => void) => {
    setIsTyping(true);
    const duration = Math.random() * 800 + 800; // slightly faster typing
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, duration);
  };

  const handleOptionClick = (option: any) => {
    if (option.isKissLoop) {
      const respArr = option.response as string[];
      const currentResp = respArr[kissLoopCount] || respArr[respArr.length - 1];
      triggerTyping(() => {
        setResponse(currentResp);
        setKissLoopCount(prev => prev + 1);
        setTimeout(() => setResponse(null), 1800);
      });
      return;
    }

    triggerTyping(() => {
      setResponse(option.response as string);
      setTimeout(() => {
        if (option.isLoop) {
          setResponse(null);
        } else if (option.nextStep !== undefined) {
          setCurrentStep(option.nextStep);
          setResponse(null);
        }
      }, 2200);
    });
  };

  const nextImaginationLine = () => {
    if (steps[currentStep].lines && imaginationIndex < steps[currentStep].lines!.length - 1) {
      triggerTyping(() => {
        setImaginationIndex(prev => prev + 1);
      });
    } else {
      triggerTyping(() => {
        setCurrentStep(prev => prev + 1);
        setImaginationIndex(0);
      });
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setResponse(null);
    setKissLoopCount(0);
    setImaginationIndex(0);
  };

  return (
    <section className="pt-12 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto text-center relative z-10 p-8 md:p-12 bg-white rounded-[48px] border-2 border-dashed border-pink-soft/40 shadow-xl shadow-pink-base/5 min-h-[500px] flex flex-col justify-center"
      >
        <div className="mb-6">
          <div className="flex justify-center mb-4 text-pink-base">
            <MessageCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-pink-deep mb-2 font-alice">Chalo baat kare baby</h2>
        </div>

        <div className="relative h-64 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex gap-1">
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 bg-pink-soft rounded-full" />
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-pink-soft rounded-full" />
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-pink-soft rounded-full" />
                </div>
                <p className="text-pink-soft font-cardo italic text-lg">Your Baby is typing....</p>
              </motion.div>
            ) : response ? (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl md:text-3xl font-alice text-pink-base px-4 leading-relaxed max-w-2xl"
              >
                {response}
              </motion.div>
            ) : currentStep < steps.length ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col items-center"
              >
                <div className="bg-pink-light/30 p-6 rounded-3xl mb-8 border border-pink-soft/10 relative">
                  <p className="text-2xl md:text-3xl font-alice text-pink-deep leading-tight">
                    {steps[currentStep].type === "auto-loop" 
                      ? steps[currentStep].lines![imaginationIndex]
                      : steps[currentStep].question}
                  </p>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-light/30 border-r border-b border-pink-soft/10 rotate-45" />
                </div>
                
                <div className="flex justify-center gap-4 flex-wrap">
                  {steps[currentStep].type === "choice" ? (
                    steps[currentStep].options!.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleOptionClick(opt)}
                        className="px-6 py-3 bg-white hover:bg-pink-base text-pink-deep hover:text-white rounded-2xl font-bold text-lg transition-all duration-300 border-2 border-pink-soft/20 shadow-sm hover:shadow-lg hover:-translate-y-1"
                      >
                        {opt.label}
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={nextImaginationLine}
                      className="px-10 py-3 bg-pink-base text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-pink-deep transition-all shadow-md"
                    >
                      Bolo aur... <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="text-center space-y-4">
                  <p className="text-3xl md:text-4xl font-alice text-pink-deep">Bas itni hi baatein aaj ke liye baby ❤️</p>
                  <p className="text-xl font-cardo italic text-pink-soft">Kal fir tang karunga tumhe</p>
                </div>
                <button
                  onClick={reset}
                  className="mt-4 px-8 py-3 bg-pink-base text-white rounded-full font-bold text-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
                >
                  Phir se shuru karein? ❤️
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
