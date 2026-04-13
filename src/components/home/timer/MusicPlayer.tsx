"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Playback failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="absolute bottom-6 left-8 z-30">
      {/* Native Audio Element for Local File */}
      <audio
        ref={audioRef}
        src="/assets/bg-music.mp3"
        loop
        preload="auto"
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-full border border-pink-soft/30 flex items-center justify-center text-pink-deep shadow-lg hover:bg-white/60 transition-all group relative"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 fill-pink-deep" />
        ) : (
          <Play className="w-6 h-6 fill-pink-deep ml-1" />
        )}
        
        {/* Playback Indicator */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full border-2 border-pink-base/30 pointer-events-none"
          />
        )}
      </motion.button>
    </div>
  );
};
