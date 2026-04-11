"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Photo } from "@/types";

export const PhotoCard: React.FC<{ photo: Photo }> = ({ photo }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white p-4 rounded-2xl shadow-xl border border-pink-light group"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-200/50">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <p className="text-white text-xl">{photo.date}</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-pink-deep text-2xl">{photo.caption}</p>
      </div>
    </motion.div>
  );
};
