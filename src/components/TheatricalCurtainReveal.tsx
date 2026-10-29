import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';

interface TheatricalCurtainRevealProps {
  onOpened?: () => void;
  autoPlay?: boolean;
}

export const TheatricalCurtainReveal: React.FC<TheatricalCurtainRevealProps> = ({
  onOpened,
  autoPlay = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Check if user already saw the curtain in this session
  useEffect(() => {
    const hasSeenCurtain = sessionStorage.getItem('mohit_curtain_seen');
    if (hasSeenCurtain) {
      // Don't show repeatedly on simple route clicks, but allow replay via button
      setIsFinished(true);
      setIsOpen(true);
      return;
    }

    if (autoPlay) {
      const timer = setTimeout(() => {
        handleOpen();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
    sessionStorage.setItem('mohit_curtain_seen', 'true');

    if (onOpened) {
      onOpened();
    }

    // After animation completes, disable pointer events completely
    setTimeout(() => {
      setIsFinished(true);
    }, 2200);
  };

  const handleReplay = () => {
    setIsFinished(false);
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        setIsFinished(true);
      }, 2200);
    }, 400);
  };

  // Generate 8 rings per side
  const ringCount = 8;
  const rings = Array.from({ length: ringCount }, (_, i) => i);

  return (
    <>
      <AnimatePresence>
        {!isFinished && (
          <div
            onClick={!isOpen ? handleOpen : undefined}
            className={`fixed inset-0 z-50 overflow-hidden select-none transition-colors duration-700 ${
              isOpen ? 'pointer-events-none' : 'cursor-pointer'
            }`}
          >
            {/* Top Metallic Curtain Rod Track */}
            <div className="absolute top-0 left-0 right-0 h-4 z-40 curtain-rod-metallic flex items-center justify-between px-2">
              <div className="w-5 h-5 -ml-2 rounded-full curtain-rod-finial" />
              <div className="w-5 h-5 -mr-2 rounded-full curtain-rod-finial" />
            </div>

            {/* Left Curtain Panel */}
            <motion.div
              initial={{ x: '0%', scaleX: 1 }}
              animate={
                isOpen
                  ? {
                      x: '-88%',
                      scaleX: 0.28,
                      filter: 'brightness(0.9)',
                    }
                  : { x: '0%', scaleX: 1, filter: 'brightness(1)' }
              }
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ originX: 0 }}
              className="absolute top-0 bottom-0 left-0 w-1/2 h-full theatrical-curtain-fabric theatrical-curtain-fabric-left z-20 shadow-2xl"
            >
              {/* Metallic Curtain Rings along the top */}
              <div className="absolute top-3 left-4 right-2 flex justify-between z-30">
                {rings.map((idx) => (
                  <motion.div
                    key={`ring-left-${idx}`}
                    animate={
                      isOpen
                        ? {
                            x: -idx * 16,
                            opacity: 0.9,
                          }
                        : { x: 0, opacity: 1 }
                    }
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-4 h-6 rounded-full curtain-ring"
                  />
                ))}
              </div>

              {/* Velvet Fabric Pleat Overlay Shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

              {/* Gold Fringe / Hem Trim at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md opacity-85" />
            </motion.div>

            {/* Right Curtain Panel */}
            <motion.div
              initial={{ x: '0%', scaleX: 1 }}
              animate={
                isOpen
                  ? {
                      x: '88%',
                      scaleX: 0.28,
                      filter: 'brightness(0.9)',
                    }
                  : { x: '0%', scaleX: 1, filter: 'brightness(1)' }
              }
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ originX: 1 }}
              className="absolute top-0 bottom-0 right-0 w-1/2 h-full theatrical-curtain-fabric theatrical-curtain-fabric-right z-20 shadow-2xl"
            >
              {/* Metallic Curtain Rings along the top */}
              <div className="absolute top-3 left-2 right-4 flex justify-between z-30">
                {rings.map((idx) => (
                  <motion.div
                    key={`ring-right-${idx}`}
                    animate={
                      isOpen
                        ? {
                            x: (ringCount - 1 - idx) * 16,
                            opacity: 0.9,
                          }
                        : { x: 0, opacity: 1 }
                    }
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-4 h-6 rounded-full curtain-ring"
                  />
                ))}
              </div>

              {/* Velvet Fabric Pleat Overlay Shadow */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

              {/* Gold Fringe / Hem Trim at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md opacity-85" />
            </motion.div>

            {/* Center Monogram / Opening Emblem */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={
                isOpen
                  ? { opacity: 0, scale: 0.85, y: -20 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{ duration: 0.45 }}
              className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            >
              <div className="flex flex-col items-center gap-4 text-center px-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl flex items-center justify-center text-white font-display text-3xl font-black tracking-wider ring-1 ring-white/30">
                    MS
                  </div>
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-lg -z-10" />
                </div>

                <div className="space-y-1">
                  <h2 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-widest text-white drop-shadow-md">
                    Mohit Sharma
                  </h2>
                  <p className="text-white/80 font-mono text-xs uppercase tracking-[0.25em] font-medium">
                    AI Systems &bull; Computer Vision &bull; LLMs
                  </p>
                </div>

                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-[11px] font-mono tracking-wider backdrop-blur-sm animate-pulse">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Click anywhere to open</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Discreet floating replay button in bottom corner when opened */}
      {isFinished && hasInteracted && (
        <button
          type="button"
          onClick={handleReplay}
          title="Replay opening curtain animation"
          className="fixed bottom-4 left-4 z-40 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-950 backdrop-blur-md text-white/90 hover:text-white border border-slate-700/80 shadow-lg text-[11px] font-mono flex items-center gap-1.5 transition-all opacity-40 hover:opacity-100 hover:scale-105 active:scale-95"
        >
          <Play className="w-3 h-3 text-purple-400 fill-purple-400" />
          <span className="hidden sm:inline">Replay Curtain</span>
        </button>
      )}
    </>
  );
};
