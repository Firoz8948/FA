"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhotoCard } from "./PhotoCard";
import { PHOTOS } from "@/constants/photos";

export const PhotoSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-pink-deep">Memories Together</h2>
          <p className="text-pink-soft text-2xl">Some of my favorite moments captured with you...</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PhotoCard photo={photo} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
