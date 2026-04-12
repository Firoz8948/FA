"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Play, Pause, Settings, X, HeartOff, Music2 } from "lucide-react";

interface FloatingControlsProps {
  heartsEnabled: boolean;
  onToggleHearts: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ 
  heartsEnabled, 
  onToggleHearts 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "QZF8BOyie8o";

  useEffect(() => {
    // Attempt autoplay if unlocked
    setIsPlaying(true);
  }, []);

  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&modestbranding=1`;

  const menuItems = [
    {
      id: "hearts",
      icon: heartsEnabled ? <Heart className="w-5 h-5 fill-current" /> : <HeartOff className="w-5 h-5" />,
      label: heartsEnabled ? "Stop Hearts" : "Start Hearts",
      action: onToggleHearts,
      active: heartsEnabled
    },
    {
      id: "music",
      icon: isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />,
      label: isPlaying ? "Stop Music" : "Start Music",
      action: () => setIsPlaying(!isPlaying),
      active: isPlaying
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* Hidden YouTube Iframe */}
      {isPlaying && (
        <iframe
          width="0"
          height="0"
          src={videoUrl}
          title="Background Music"
          allow="autoplay"
          className="hidden"
        />
      )}

      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="flex flex-col gap-3 mb-2"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 justify-end group"
              >
                <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold text-pink-deep shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
                <button
                  onClick={item.action}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border border-white/20 transition-all ${
                    item.active ? "bg-pink-base text-white" : "bg-white/80 text-pink-soft"
                  }`}
                >
                  {item.icon}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isOpen ? "bg-pink-deep text-white rotate-90" : "bg-white text-pink-base hover:shadow-pink-base/20"
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : (
          <div className="relative">
            <Settings className="w-8 h-8 animate-spin-slow" />
            {(isPlaying || heartsEnabled) && (
              <motion.div 
                layoutId="pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-pink-base/30 rounded-full blur-md"
              />
            )}
          </div>
        )}
      </motion.button>
    </div>
  );
};
