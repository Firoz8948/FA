"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "QZF8BOyie8o";

  // YouTube Embed URL with auto-start and loop
  // Note: Autoplay requires user interaction first
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&modestbranding=1`;

  // Try to start playing once component mounts (if interaction happened)
  useEffect(() => {
    // We attempt to play, but browser might block it until first click
    setIsPlaying(true);
  }, []);

  return (
    <div className="absolute bottom-6 left-8 z-30">
      {/* Hidden YouTube Iframe */}
      {isPlaying && (
        <iframe
          width="0"
          height="0"
          src={videoUrl}
          title="Romantic Background Music"
          allow="autoplay"
          className="hidden"
        />
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-full border border-pink-soft/30 flex items-center justify-center text-pink-deep shadow-lg hover:bg-white/60 transition-all group"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 fill-pink-deep" />
        ) : (
          <Play className="w-6 h-6 fill-pink-deep ml-1" />
        )}
        
        {/* Playback Indicator */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full border-2 border-pink-base/30 pointer-events-none"
          />
        )}
      </motion.button>
    </div>
  );
};
