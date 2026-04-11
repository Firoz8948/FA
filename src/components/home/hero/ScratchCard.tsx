"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const drawScratchLayer = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // Base gradient — cool metallic slate (scratch layer)
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#94a3b8");
    gradient.addColorStop(0.35, "#64748b");
    gradient.addColorStop(0.65, "#57534e");
    gradient.addColorStop(1, "#475569");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Shimmer pattern
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const radius = Math.random() * 2.5 + 0.5;
      const opacity = Math.random() * 0.5 + 0.1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }

    // Grid lines for texture
    ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Center glow
    const radialGlow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
    radialGlow.addColorStop(0, "rgba(255,255,255,0.15)");
    radialGlow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, w, h);

    // Scratch text
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Shadow for text
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 8;

    // Emoji
    ctx.font = `${w * 0.12}px serif`;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("💝", w / 2, h / 2 - h * 0.18);

    // Main text
    ctx.font = `bold ${w * 0.075}px Georgia, serif`;
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.letterSpacing = "2px";
    ctx.fillText("SCRATCH HERE", w / 2, h / 2 + h * 0.02);

    // Sub text
    ctx.font = `bold ${w * 0.055}px Georgia, serif`;
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("MY BEAUTIFUL ✨", w / 2, h / 2 + h * 0.13);

    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawScratchLayer(canvas);
  }, [drawScratchLayer]);

  const getPosition = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const calculateScratch = useCallback((_time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }

    const pct = (transparent / total) * 100;
    setScratchPercentage(pct);

    if (pct > 55 && !isScratched) {
      setIsScratched(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [isScratched]);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio;
      const scaledX = x * dpr;
      const scaledY = y * dpr;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();

      if (lastPos.current) {
        ctx.moveTo(lastPos.current.x * dpr, lastPos.current.y * dpr);
        ctx.lineTo(scaledX, scaledY);
      } else {
        ctx.arc(scaledX, scaledY, 28 * dpr, 0, Math.PI * 2);
      }

      ctx.lineWidth = 56 * dpr;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      lastPos.current = { x, y };

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(calculateScratch);
    },
    [calculateScratch]
  );

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    setHasStarted(true);
    lastPos.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPosition(e, canvas);
    scratch(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPosition(e, canvas);
    scratch(pos.x, pos.y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const handleReset = () => {
    setIsScratched(false);
    setScratchPercentage(0);
    setHasStarted(false);
    lastPos.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawScratchLayer(canvas);
  };

  return (
    <div className="scratch-wrapper">
      {/* Floating particles */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="scratch-outer"
      >
        {/* Header */}
        <div className="scratch-header">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="header-emoji"
          >
            💌
          </motion.div>
          <h2 className="header-title">A Secret Just For You</h2>
          <p className="header-sub">Reveal what's hiding beneath...</p>
        </div>

        {/* Card */}
        <div className="card-container">
          {/* Glow ring */}
          <div className={`glow-ring ${isScratched ? "glow-ring-revealed" : ""}`} />

          {/* Inner card */}
          <div className="card-inner">
            {/* Hidden content behind scratch */}
            <div className="card-revealed-content">
              <AnimatePresence>
                {isScratched && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "backOut" }}
                    className="revealed-inner"
                  >
                    {/* Confetti dots */}
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="confetti-dot"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: (Math.random() - 0.5) * 200,
                          y: (Math.random() - 0.5) * 200,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: Math.random() * 0.5,
                          ease: "easeOut",
                        }}
                        style={{
                          left: "50%",
                          top: "50%",
                          background: `hsl(${Math.random() * 60 + 320}, 90%, 65%)`,
                          width: `${Math.random() * 8 + 4}px`,
                          height: `${Math.random() * 8 + 4}px`,
                        }}
                      />
                    ))}

                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="revealed-emoji"
                    >
                      💖
                    </motion.div>
                    <h3 className="revealed-title">You Are My</h3>
                    <p className="revealed-highlight">Everything</p>
                    <p className="revealed-message">
                      Every moment with you is a treasure I hold close to my heart forever 🌸
                    </p>
                    <div className="revealed-hearts">
                      {["💕", "✨", "🌸", "💫", "🌹"].map((e, i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            delay: i * 0.2,
                          }}
                        >
                          {e}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isScratched && !hasStarted && (
                <div className="pre-scratch-hint">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    👇
                  </motion.div>
                </div>
              )}
            </div>

            {/* Canvas */}
            {!isScratched && (
              <canvas
                ref={canvasRef}
                className="scratch-canvas"
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
              />
            )}
          </div>

          {/* Progress bar */}
          {hasStarted && !isScratched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="progress-container"
            >
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  style={{ width: `${Math.min(scratchPercentage * 1.8, 100)}%` }}
                />
              </div>
              <span className="progress-label">
                {scratchPercentage < 30
                  ? "Keep scratching... 🤍"
                  : scratchPercentage < 50
                  ? "Almost there... 💗"
                  : "Just a little more... 💕"}
              </span>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <AnimatePresence>
          {isScratched ? (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={handleReset}
              className="reset-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Scratch Again
            </motion.button>
          ) : (
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="scratch-cta"
            >
              <span className="cta-dot" />
              <span>Use your finger or mouse to scratch</span>
              <span className="cta-dot" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        /* ── Wrapper ── */
        .scratch-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 40%, #f5f5f4 100%);
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        /* ── Floating Particles ── */
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          border-radius: 9999px;
          opacity: 0.4;
          animation: floatUp linear infinite;
        }

        .particle-1  { width:8px;  height:8px;  left:5%;  background:#c4b5fd; animation-duration:12s; animation-delay:0s;   }
        .particle-2  { width:5px;  height:5px;  left:15%; background:#a5b4fc; animation-duration:9s;  animation-delay:1s;   }
        .particle-3  { width:10px; height:10px; left:25%; background:#7dd3fc; animation-duration:14s; animation-delay:2s;   }
        .particle-4  { width:6px;  height:6px;  left:35%; background:#94a3b8; animation-duration:10s; animation-delay:0.5s; }
        .particle-5  { width:8px;  height:8px;  left:45%; background:#cbd5e1; animation-duration:11s; animation-delay:3s;   }
        .particle-6  { width:4px;  height:4px;  left:55%; background:#e2e8f0; animation-duration:8s;  animation-delay:1.5s; }
        .particle-7  { width:9px;  height:9px;  left:65%; background:#a78bfa; animation-duration:13s; animation-delay:2.5s; }
        .particle-8  { width:5px;  height:5px;  left:72%; background:#bae6fd; animation-duration:10s; animation-delay:0.8s; }
        .particle-9  { width:7px;  height:7px;  left:80%; background:#818cf8; animation-duration:12s; animation-delay:4s;   }
        .particle-10 { width:6px;  height:6px;  left:88%; background:#cbd5e1; animation-duration:9s;  animation-delay:1.2s; }
        .particle-11 { width:10px; height:10px; left:93%; background:#93c5fd; animation-duration:15s; animation-delay:2s;   }
        .particle-12 { width:4px;  height:4px;  left:10%; background:#e2e8f0; animation-duration:11s; animation-delay:3.5s; }

        @keyframes floatUp {
          0%   { transform: translateY(110vh) rotate(0deg);   opacity: 0;   }
          10%  { opacity: 0.4; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0;   }
        }

        /* ── Outer Card ── */
        .scratch-outer {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 420px;
          box-shadow:
            0 32px 80px rgba(15, 23, 42, 0.12),
            0 8px 32px rgba(15, 23, 42, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.35);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
          position: relative;
          z-index: 10;
        }

        /* ── Header ── */
        .scratch-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .header-emoji {
          font-size: 2.2rem;
          line-height: 1;
          margin-bottom: 0.3rem;
        }

        .header-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .header-sub {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
          font-style: italic;
        }

        /* ── Card Container ── */
        .card-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          position: relative;
        }

        /* ── Glow Ring ── */
        .glow-ring {
          position: absolute;
          inset: -6px;
          border-radius: 26px;
          background: linear-gradient(135deg, #6366f1, #a855f7, #be123c, #6366f1);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          z-index: 0;
          opacity: 0.65;
        }

        .glow-ring-revealed {
          opacity: 1;
          animation: gradientShift 2s ease infinite, pulse 2s ease infinite;
        }

        @keyframes gradientShift {
          0%   { background-position: 0% 50%;   }
          50%  { background-position: 100% 50%;  }
          100% { background-position: 0% 50%;   }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
          50%       { box-shadow: 0 0 20px 8px rgba(124,58,237,0.2); }
        }

        /* ── Inner Card ── */
        .card-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border-radius: 20px;
          overflow: hidden;
          z-index: 1;
          background: linear-gradient(135deg, #f8fafc, #eef2ff);
        }

        /* ── Revealed Content ── */
        .card-revealed-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .revealed-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem;
          text-align: center;
          position: relative;
        }

        .revealed-emoji {
          font-size: 3.5rem;
          line-height: 1;
          margin-bottom: 0.25rem;
          filter: drop-shadow(0 4px 12px rgba(15,23,42,0.12));
        }

        .revealed-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #475569;
          margin: 0;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .revealed-highlight {
          font-size: 2.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, #be123c, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .revealed-message {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.6;
          max-width: 260px;
          margin: 0.25rem 0 0;
          opacity: 0.85;
        }

        .revealed-hearts {
          display: flex;
          gap: 0.6rem;
          font-size: 1.2rem;
          margin-top: 0.5rem;
        }

        .confetti-dot {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .pre-scratch-hint {
          font-size: 2rem;
          opacity: 0.4;
        }

        /* ── Canvas ── */
        .scratch-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          cursor: crosshair;
          touch-action: none;
          border-radius: 20px;
          z-index: 2;
        }

        /* ── Progress ── */
        .progress-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .progress-track {
          width: 100%;
          height: 6px;
          background: rgba(148, 163, 184, 0.35);
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #a855f7, #be123c);
          border-radius: 9999px;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.35);
        }

        .progress-label {
          font-size: 0.8rem;
          color: #475569;
          font-weight: 500;
        }

        /* ── CTA / Reset ── */
        .scratch-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: #64748b;
          font-style: italic;
        }

        .cta-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #94a3b8;
          display: inline-block;
        }

        .reset-btn {
          padding: 0.65rem 2rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #be123c, #7c3aed);
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(190, 18, 60, 0.25);
          transition: box-shadow 0.2s ease;
          letter-spacing: 0.03em;
        }

        .reset-btn:hover {
          box-shadow: 0 6px 28px rgba(124, 58, 237, 0.35);
        }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .scratch-outer {
            padding: 2rem 1.25rem;
            border-radius: 24px;
          }

          .header-title {
            font-size: 1.35rem;
          }

          .revealed-highlight {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
};
