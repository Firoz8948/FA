"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trophy, RefreshCcw } from "lucide-react";

const QUESTIONS = [
  {
    q: "Where did we have our first date?",
    options: ["The Park", "Coffee Shop", "Beach", "Restaurant"],
    correct: 1
  },
  {
    q: "What is my favorite thing about you?",
    options: ["Your Smile", "Your Kindness", "Everything", "Your Eyes"],
    correct: 2
  },
  {
    q: "What was the date we met?",
    options: ["April 10", "April 15", "April 20", "May 1"],
    correct: 1
  }
];

export const LoveGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < QUESTIONS.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-4 border-pink-light max-w-lg mx-auto overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center text-pink-soft font-bold text-sm">
              <span>QUESTION {currentQuestion + 1}/{QUESTIONS.length}</span>
              <div className="flex gap-1">
                {QUESTIONS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i <= currentQuestion ? 'bg-pink-base' : 'bg-pink-light'}`}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-pink-deep min-h-[60px]">
              {QUESTIONS[currentQuestion].q}
            </h3>

            <div className="grid gap-4">
              {QUESTIONS[currentQuestion].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selected === null && handleAnswer(i)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all font-medium ${
                    selected === i 
                      ? (i === QUESTIONS[currentQuestion].correct ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700")
                      : "border-pink-light hover:border-pink-base hover:bg-pink-light/20 text-pink-rose"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-8"
          >
            <div className="inline-block p-6 rounded-full bg-pink-light/30 text-pink-deep mb-4">
              <Trophy size={60} />
            </div>
            <h3 className="text-3xl font-bold text-pink-deep">
              {score === QUESTIONS.length ? "Perfect! ❤️" : "So Sweet! ✨"}
            </h3>
            <p className="text-xl text-pink-soft">
              You got {score} out of {QUESTIONS.length} correct baby!
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={reset}
              className="flex items-center gap-2 mx-auto bg-pink-base text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-pink-base/30"
            >
              <RefreshCcw size={20} /> Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
