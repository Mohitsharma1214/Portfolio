import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandFaviconLoaderProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const BrandFaviconLoader: React.FC<BrandFaviconLoaderProps> = ({
  onComplete,
  durationMs = 1600,
}) => {
  const [progress, setProgress] = useState(0);
  const [isExited, setIsExited] = useState(false);
  const [telemetryText, setTelemetryText] = useState('INITIALIZING SYSTEMS');

  useEffect(() => {
    // Lock scroll during loader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let animationFrameId: number;

    const updateLoader = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(Math.round((elapsed / durationMs) * 100), 100);
      setProgress(pct);

      if (pct < 30) {
        setTelemetryText('CALIBRATING VISION KERNELS');
      } else if (pct < 70) {
        setTelemetryText('LOADING EDGE PIPELINES & MODELS');
      } else if (pct < 95) {
        setTelemetryText('SYNCHRONIZING METRICS');
      } else {
        setTelemetryText('SYSTEM READY');
      }

      if (elapsed < durationMs) {
        animationFrameId = requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExited(true);
          document.body.style.overflow = originalOverflow || 'unset';
          if (onComplete) onComplete();
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(updateLoader);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow || 'unset';
    };
  }, [durationMs, onComplete]);

  // Click anywhere to fast-forward/skip
  const handleSkip = () => {
    setProgress(100);
    setIsExited(true);
    document.body.style.overflow = 'unset';
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isExited && (
        <motion.div
          key="brand-favicon-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-white select-none cursor-pointer overflow-hidden"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Subtle Ambient High-Tech Grid & Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(37,99,235,0.22),rgba(3,7,18,0.95))] pointer-events-none" />
          
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Central Logo Container */}
          <div className="relative flex flex-col items-center z-10 px-6">
            
            {/* Concentric Radar / Telemetry Orbit Rings */}
            <div className="relative flex items-center justify-center">
              {/* Outer Pulsing Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.25, 0.55, 0.25],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-blue-600/40 via-indigo-500/30 to-cyan-400/40 blur-2xl -z-10"
              />

              {/* Orbit Ring 1 (Concentric thin border) */}
              <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-blue-500/20 animate-spin [animation-duration:14s]">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] absolute -top-1 left-1/2 -translate-x-1/2" />
              </div>

              {/* Orbit Ring 2 (Dashed counter-rotation) */}
              <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-indigo-400/15 border-dashed animate-spin [animation-duration:20s] [animation-direction:reverse]" />

              {/* The Authentic Favicon Squircle */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0, rotate: -6 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] p-1.5 shadow-[0_0_50px_rgba(37,99,235,0.45)] ring-1 ring-white/20 overflow-hidden"
              >
                {/* SVG mirroring public/favicon.svg exactly */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-full h-full"
                >
                  <defs>
                    <linearGradient id="msBrandLoaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>

                    {/* Travelling Light Shimmer */}
                    <linearGradient id="msShimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>

                  {/* Modern continuous squircle base */}
                  <rect width="512" height="512" rx="116" fill="url(#msBrandLoaderGrad)" />

                  {/* Crisp inner stroke ring */}
                  <rect
                    x="8"
                    y="8"
                    width="496"
                    height="496"
                    rx="108"
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="8"
                  />

                  {/* Authentic Geometric ExtraBold Monogram Glyphs */}
                  <motion.path
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    d="M57.73154362416108 361.0V151.0H100.01342281879195L178.65771812080536 255.29530201342283H158.92617449664428L235.31543624161074 151.0H277.5973154362416V361.0H233.90604026845637V199.2013422818792L251.38255033557047 203.1476510067114L170.48322147651007 307.4429530201342H164.84563758389262L86.76510067114094 203.1476510067114L101.4228187919463 199.2013422818792V361.0Z M379.28859060402687 364.38255033557044Q359.5570469798658 364.38255033557044 342.22147651006713 357.19463087248323Q324.8859060402685 350.00671140939596 312.3422818791946 336.7583892617449Q299.7986577181208 323.51006711409394 293.5973154362416 305.4697986577181L329.3959731543624 289.4026845637584Q337.28859060402687 306.5973154362416 351.2416107382551 316.46308724832215Q365.19463087248323 326.3288590604027 382.10738255033556 326.3288590604027Q391.1275167785235 326.3288590604027 397.61073825503354 323.510067114094Q404.09395973154363 320.69127516778525 407.758389261745 315.758389261745Q411.4228187919463 310.8255033557047 411.4228187919463 304.06040268456377Q411.4228187919463 296.7315436241611 406.9127516778524 291.51677852348996Q402.4026845637584 286.3020134228188 392.8187919463087 283.2013422818792L351.66442953020135 269.6711409395973Q326.5771812080537 261.496644295302 313.8926174496644 246.41610738255034Q301.20805369127515 231.33557046979865 301.20805369127515 210.19463087248323Q301.20805369127515 191.59060402684565 310.3691275167785 177.49664429530202Q319.5302013422819 163.4026845637584 336.0201342281879 155.510067114094Q352.51006711409394 147.61744966442956 373.93288590604027 147.61744966442956Q392.8187919463087 147.61744966442956 408.8859060402684 154.1006711409396Q424.95302013422815 160.58389261744966 436.65100671140937 172.42281879194633Q448.3489932885906 184.26174496644296 454.2684563758389 200.89261744966444L418.75167785234896 216.95973154362417Q412.8322147651007 202.3020134228188 400.99328859060404 193.98657718120808Q389.1543624161074 185.67114093959734 373.93288590604027 185.67114093959734Q365.19463087248323 185.67114093959734 358.4295302013423 188.48993288590606Q351.66442953020135 191.30872483221478 348.0 196.52348993288592Q344.33557046979865 201.73825503355707 344.33557046979865 208.503355704698Q344.33557046979865 215.83221476510067 349.1275167785235 221.3288590604027Q353.91946308724835 226.8255033557047 363.503355704698 229.9261744966443L403.81208053691273 242.89261744966444Q429.1812080536913 251.06711409395973 441.7248322147651 265.7248322147651Q454.2684563758389 280.3825503355705 454.2684563758389 301.5234899328859Q454.2684563758389 319.8456375838926 444.68456375838923 334.08053691275165Q435.1006711409396 348.3154362416107 418.3288590604027 356.3489932885906Q401.5570469798658 364.38255033557044 379.28859060402687 364.38255033557044Z"
                    fill="#ffffff"
                  />

                  {/* High-tech diagonal specular gleam sweep */}
                  <motion.rect
                    animate={{
                      x: [-512, 512],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      repeatDelay: 0.8,
                      ease: 'easeInOut',
                    }}
                    width="250"
                    height="600"
                    y="-50"
                    fill="url(#msShimmerGrad)"
                    transform="rotate(25 256 256)"
                    style={{ mixBlendMode: 'overlay' }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-center mt-7 space-y-1.5"
            >
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-[0.22em] uppercase leading-none drop-shadow-lg">
                MOHIT SHARMA
              </h1>
              <p className="font-mono text-xs sm:text-sm text-blue-400 font-medium tracking-[0.28em] uppercase">
                AI Systems &bull; Computer Vision &bull; LLMs
              </p>
            </motion.div>

            {/* Progress Bar & Telemetry Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-7 flex flex-col items-center w-72 sm:w-80"
            >
              {/* High-Tech Progress Track */}
              <div className="w-full h-2 bg-slate-900/90 rounded-full overflow-hidden p-[1px] border border-white/20 shadow-inner relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-300 shadow-[0_0_14px_rgba(56,189,248,0.95)] relative flex items-center justify-end"
                  style={{
                    width: `${Math.max(progress, 2)}%`,
                    transition: 'width 0.08s linear',
                  }}
                >
                  {/* Glowing Laser Tip */}
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#38bdf8] shrink-0" />
                </div>
              </div>

              {/* Status & Numeric Telemetry Readout */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono mt-2 text-slate-400">
                <span className="tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  {telemetryText}
                </span>
                <span className="font-bold text-white font-mono">{progress}%</span>
              </div>
            </motion.div>

            {/* Subtle skip hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-6 hover:opacity-100 transition-opacity"
            >
              Click anywhere to skip
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
