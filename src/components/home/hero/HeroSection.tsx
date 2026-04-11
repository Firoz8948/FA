"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScratchCard } from "./ScratchCard";

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hero-content"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-badge"
        >
          💕 A Special Surprise For You 💕
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-title"
        >
          To the Love of
          <br />
          <span className="hero-title-highlight">My Life</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-subtitle"
        >
          I have a little surprise hidden just for you...
        </motion.p>

        <ScratchCard />

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="scroll-indicator"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="blob-decoration blob-1" />
      <div className="blob-decoration blob-2" />

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #f5f5f4 100%);
        }

        .hero-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          z-index: 10;
          width: 100%;
          max-width: 600px;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.35);
          color: #3730a3;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          text-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
          margin: 0;
        }

        .hero-title-highlight {
          background: linear-gradient(135deg, #be123c, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #475569;
          max-width: 400px;
          line-height: 1.6;
          margin: 0;
          opacity: 0.95;
        }

        .scroll-indicator {
          color: #94a3b8;
          margin-top: 1rem;
        }

        .blob-decoration {
          position: absolute;
          border-radius: 9999px;
          filter: blur(60px);
          pointer-events: none;
        }

        .blob-1 {
          top: 20%;
          left: 10%;
          width: 400px;
          height: 400px;
          background: rgba(99, 102, 241, 0.12);
          animation: float1 8s ease-in-out infinite;
        }

        .blob-2 {
          bottom: 20%;
          right: 10%;
          width: 350px;
          height: 350px;
          background: rgba(14, 165, 233, 0.1);
          animation: float2 10s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};