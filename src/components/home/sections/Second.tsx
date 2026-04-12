"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Loader2 } from "lucide-react";

type SectionState = "CLOSED" | "LOADING" | "PLAYING";

const VIDEOS = [
  "/assets/vdo1.mp4",
  "/assets/vdo2.mp4",
  "/assets/vdo3.mp4",
  "/assets/vdo4.mp4"
];

export const Second: React.FC = () => {
  const [state, setState] = useState<SectionState>("CLOSED");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload logic
  const handleStartLoading = async () => {
    setState("LOADING");
    
    try {
      const preloadPromises = VIDEOS.map((src) => {
        return new Promise((resolve, reject) => {
          const video = document.createElement("video");
          video.src = src;
          video.preload = "auto";
          video.oncanplaythrough = resolve;
          video.onerror = reject;
        });
      });

      await Promise.all(preloadPromises);
      setState("PLAYING");
      setCurrentVideoIndex(0);
    } catch (error) {
      console.error("Failed to load videos:", error);
      setState("CLOSED");
    }
  };

  // Visibility logic: Clear DOM and reset if scrolled away
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && state !== "CLOSED") {
            setState("CLOSED");
            setCurrentVideoIndex(0);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [state]);

  // Sequential playback logic
  const handleVideoEnd = () => {
    if (currentVideoIndex < VIDEOS.length - 1) {
      setCurrentVideoIndex((prev) => prev + 1);
    } else {
      // All videos finished
      setState("CLOSED");
      setCurrentVideoIndex(0);
    }
  };

  return (
    <section ref={sectionRef} className="pt-12 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto text-center relative z-10 p-4 md:p-8 bg-white rounded-[48px] border-2 border-dashed border-pink-soft/40 shadow-xl shadow-pink-base/5"
      >
        {/* Fixed Height Header */}
        <div className="mb-4 h-20 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-black text-pink-deep mb-1 leading-tight">A Moment Frozen in Time</h2>
          <p className="text-pink-soft font-medium italic text-base">
            {state === "PLAYING" ? "Cherishing our memories..." : "Click the polaroid to reveal a memory..."}
          </p>
        </div>

        {/* Global Fixed Interaction Area */}
        <div className="flex justify-center items-center h-[550px] md:h-[720px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {state === "CLOSED" && (
              <motion.div
                key="closed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                onClick={handleStartLoading}
                className="w-64 md:w-72 h-[380px] md:h-[450px] bg-pink-light rounded-2xl flex flex-col items-center justify-center border-2 border-white shadow-lg cursor-pointer hover:shadow-pink-base/20 transition-all relative overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-soft/20 to-transparent pointer-events-none" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Camera className="w-8 h-8 text-pink-base" />
                  </div>
                </motion.div>
                <span className="font-alice text-2xl text-pink-deep mb-1">Our Story</span>
                <span className="font-cardo italic text-pink-soft text-lg font-bold">Click to See</span>
                <div className="absolute -top-1 w-20 h-8 bg-white/40 backdrop-blur-sm -rotate-2" />
              </motion.div>
            )}

            {state === "LOADING" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 h-full justify-center shrink-0"
              >
                <Loader2 className="w-12 h-12 text-pink-base animate-spin" />
                <p className="text-pink-deep font-alice text-xl font-bold animate-pulse">
                  Please wait, downloading memories...
                </p>
              </motion.div>
            )}

            {state === "PLAYING" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-base/10 flex flex-col"
              >
                <div className="relative flex-grow bg-black flex items-center justify-center min-h-0">
                  <video
                    ref={videoRef}
                    src={VIDEOS[currentVideoIndex]}
                    autoPlay
                    controls={false}
                    onEnded={handleVideoEnd}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Bottom Bar with Extra Padding to prevent cutting */}
                <div className="bg-white p-5 md:p-6 flex justify-between items-center text-pink-base font-bold text-sm shrink-0 border-t border-pink-light/30">
                  <div className="flex gap-2">
                    {VIDEOS.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full transition-colors ${i === currentVideoIndex ? 'bg-pink-base' : 'bg-pink-light'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-alice text-base">Memory {currentVideoIndex + 1} of 4</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
