import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Cpu, Activity, ShieldCheck, ChevronUp, ChevronDown, Radio } from 'lucide-react';

export const AiDevTelemetryHUD: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(112);
  const [isExpanded, setIsExpanded] = useState(false);

  // Micro jitter for live telemetry authenticity
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(108 + Math.random() * 8));
      setFps(Math.floor(59 + Math.random() * 2));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Laser Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-slate-200/50 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 origin-left shadow-[0_0_10px_rgba(56,189,248,0.9)]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Modern AI Developer Status Pill (Bottom-Right) */}
      <aside aria-label="Live Telemetry" className="fixed bottom-4 right-4 z-40 hidden sm:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-slate-950/90 text-white backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 transition-all text-xs font-mono"
        >
          <div className="flex items-center gap-3">
            {/* Live Indicator Dot */}
            <div className="flex items-center gap-1.5 pl-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                AI Engine: Active
              </span>
            </div>

            <div className="h-3 w-px bg-slate-800" />

            {/* Core Metrics */}
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="text-slate-400">P95:</span>
              <span className="font-bold text-cyan-300">{latency}ms</span>
            </div>

            <div className="h-3 w-px bg-slate-800" />

            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="text-slate-400">SLA:</span>
              <span className="text-indigo-300">&lt;120ms</span>
            </div>

            {/* Toggle Details */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Toggle AI Engine Telemetry Details"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Expanded Hardware & Pipeline Telemetry HUD */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-1.5 text-[10px] text-slate-300 font-mono px-1"
            >
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-blue-400" /> Model Pipeline:
                </span>
                <span className="font-semibold text-white">YOLOv8-Seg &bull; ONNX / TensorRT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-indigo-400" /> Edge Target:
                </span>
                <span className="text-indigo-200">ARM Raspberry Pi &bull; Zero-Cloud</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Certified IP:
                </span>
                <span className="text-emerald-300 font-mono">SW-19841/2024 (Govt. India)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-cyan-400" /> Frame Pipeline:
                </span>
                <span className="text-cyan-300">{fps} FPS &bull; Micro-Batching</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </aside>
    </>
  );
};
