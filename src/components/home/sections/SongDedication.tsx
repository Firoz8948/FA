"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Music } from "lucide-react";

const SONGS = [
  {
    id: "qtz5mpvgAM0",
    title: "Mere Haath Me | Fanaa",
    thumbnail: "https://img.youtube.com/vi/qtz5mpvgAM0/maxresdefault.jpg"
  },
  {
    id: "qoq8B8ThgEM",
    title: "Tujh Me Rab Dikhta Hai",
    thumbnail: "https://img.youtube.com/vi/qoq8B8ThgEM/maxresdefault.jpg"
  },
  {
    id: "BV0-rrdPJKw",
    title: "Tera Mera Pyar Amar",
    thumbnail: "https://img.youtube.com/vi/BV0-rrdPJKw/maxresdefault.jpg"
  },
  {
    id: "ryL1tQnoRYE",
    title: "Jiya dhadak dhadak Jaaye",
    thumbnail: "https://img.youtube.com/vi/ryL1tQnoRYE/maxresdefault.jpg"
  }
];

export const SongDedication: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 relative bg-pink-light/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-pink-base mb-4"
          >
            <Music className="w-6 h-6" />
            <span className="font-bold tracking-widest uppercase text-sm">For You</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-alice text-pink-deep">Songs that I dedicate to you</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SONGS.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden border-2 border-pink-base/10 shadow-lg shadow-pink-base/5 group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={song.thumbnail} 
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-pink-deep mb-4 font-alice line-clamp-1">
                  {song.title}
                </h3>
                <button
                  onClick={() => setSelectedVideo(song.id)}
                  className="w-full py-3 bg-pink-base hover:bg-pink-deep text-white rounded-2xl flex items-center justify-center gap-2 transition-colors font-bold shadow-md shadow-pink-base/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY NOW</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-pink-deep/40 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&playsinline=1&enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
