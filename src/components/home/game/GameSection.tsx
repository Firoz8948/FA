"use client";

import React from "react";
import { LoveGame } from "./LoveGame";

export const GameSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-pink-deep">How well do you know us?</h2>
          <p className="text-pink-soft text-2xl">A little quiz for my favorite person...</p>
        </div>

        <LoveGame />
      </div>

      {/* Decorative Hearts in Background */}
      <div className="absolute top-1/4 -left-10 text-pink-light/20 -rotate-12 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </section>
  );
};
