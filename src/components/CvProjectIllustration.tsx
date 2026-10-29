import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Layers, FileText } from 'lucide-react';

interface CvProjectIllustrationProps {
  projectId: string;
  className?: string;
}

export const CvProjectIllustration: React.FC<CvProjectIllustrationProps> = ({
  projectId,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [blinkState, setBlinkState] = useState<'attentive' | 'blinking'>('attentive');

  // Periodic simulated blink for drowsiness detection
  useEffect(() => {
    if (projectId !== 'driver-drowsiness-detection' || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setBlinkState('blinking');
      setTimeout(() => {
        setBlinkState('attentive');
      }, 350);
    }, 4200);
    return () => clearInterval(interval);
  }, [projectId, shouldReduceMotion]);

  // 1. DRIVER DROWSINESS DETECTION (Computer Vision & Edge)
  if (projectId === 'driver-drowsiness-detection') {
    const earVal = blinkState === 'blinking' ? '0.19' : '0.31';
    const statusText = blinkState === 'blinking' ? 'BLINK (180ms)' : 'ATTENTIVE';
    const statusColor = blinkState === 'blinking' ? 'text-amber-400 border-amber-500/40' : 'text-emerald-400 border-emerald-500/40';

    return (
      <div className={`relative w-full h-full min-h-[220px] rounded-xl bg-slate-950 text-white overflow-hidden p-3 sm:p-4 select-none font-mono ${className}`}>
        {/* Subtle Matrix Viewfinder Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cv-grid-drowsy" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cv-grid-drowsy)" />
        </svg>

        {/* Sweeping Laser Scanner Beam */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{ top: ['5%', '92%', '5%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] pointer-events-none z-20 opacity-80"
          />
        )}

        {/* Top HUD Telemetry */}
        <div className="relative z-10 flex items-center justify-between text-[10px] pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold">CSI VIDEO STREAM • 30 FPS</span>
          </div>
          <span className="text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            Raspberry Pi 4B &bull; ARM
          </span>
        </div>

        {/* Center: Face & Ocular Landmark Geometry Viewport */}
        <div className="relative z-10 my-2 sm:my-3 flex items-center justify-center">
          <div className="relative w-56 h-32 border border-blue-500/30 rounded-xl bg-blue-950/20 flex flex-col justify-between p-2">
            {/* Viewfinder Corner Reticles */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            {/* Bounding Box Label */}
            <div className="text-[9px] text-cyan-300 font-bold flex items-center justify-between">
              <span>[FACE: CONF 0.99]</span>
              <span className="text-slate-400">640x480</span>
            </div>

            {/* Ocular Tracking Boxes (Left & Right Eyes with Landmarks) */}
            <div className="flex items-center justify-around my-auto">
              {/* Left Eye Box */}
              <div className="border border-cyan-400/60 rounded p-1 bg-cyan-950/40 text-center space-y-1">
                <div className="text-[8px] text-cyan-300">L-EYE (6-pt)</div>
                <svg width="44" height="20" viewBox="0 0 44 20" className="mx-auto">
                  {/* Eye Contour */}
                  <path
                    d={blinkState === 'blinking' ? "M 4 10 Q 22 13 40 10 Q 22 13 4 10" : "M 4 10 Q 22 2 40 10 Q 22 18 4 10"}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  {/* Iris */}
                  <circle cx="22" cy="10" r={blinkState === 'blinking' ? "2" : "3.5"} fill="#0284c7" />
                  {/* 6 Facial Landmark Dots */}
                  {[
                    { cx: 4, cy: 10 },
                    { cx: 13, cy: blinkState === 'blinking' ? 11 : 5 },
                    { cx: 31, cy: blinkState === 'blinking' ? 11 : 5 },
                    { cx: 40, cy: 10 },
                    { cx: 31, cy: blinkState === 'blinking' ? 12 : 15 },
                    { cx: 13, cy: blinkState === 'blinking' ? 12 : 15 },
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.cx} cy={pt.cy} r="1" fill="#38bdf8" />
                  ))}
                </svg>
              </div>

              {/* Right Eye Box */}
              <div className="border border-cyan-400/60 rounded p-1 bg-cyan-950/40 text-center space-y-1">
                <div className="text-[8px] text-cyan-300">R-EYE (6-pt)</div>
                <svg width="44" height="20" viewBox="0 0 44 20" className="mx-auto">
                  <path
                    d={blinkState === 'blinking' ? "M 4 10 Q 22 13 40 10 Q 22 13 4 10" : "M 4 10 Q 22 2 40 10 Q 22 18 4 10"}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  <circle cx="22" cy="10" r={blinkState === 'blinking' ? "2" : "3.5"} fill="#0284c7" />
                  {[
                    { cx: 4, cy: 10 },
                    { cx: 13, cy: blinkState === 'blinking' ? 11 : 5 },
                    { cx: 31, cy: blinkState === 'blinking' ? 11 : 5 },
                    { cx: 40, cy: 10 },
                    { cx: 31, cy: blinkState === 'blinking' ? 12 : 15 },
                    { cx: 13, cy: blinkState === 'blinking' ? 12 : 15 },
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.cx} cy={pt.cy} r="1" fill="#38bdf8" />
                  ))}
                </svg>
              </div>
            </div>

            {/* Bottom Real-time Formula Calculation */}
            <div className="text-[8.5px] text-slate-300 text-center bg-black/40 py-0.5 rounded">
              EAR = (|p2-p6| + |p3-p5|) / (2*|p1-p4|) = <strong className="text-cyan-300 font-bold">{earVal}</strong>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] pt-2 border-t border-white/10">
          <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${statusColor}`}>
            STATUS: {statusText}
          </span>
          <span className="text-amber-300 flex items-center gap-1 text-[9px]">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Govt. Copyright SW-19841/2024</span>
          </span>
          <span className="text-emerald-400 font-bold text-[9px]">&lt;150ms Local Edge</span>
        </div>
      </div>
    );
  }

  // 2. HAIR STRAND DETECTION (Mask R-CNN Instance Segmentation)
  if (projectId === 'hair-strand-detection') {
    return (
      <div className={`relative w-full h-full min-h-[220px] rounded-xl bg-slate-950 text-white overflow-hidden p-3 sm:p-4 select-none font-mono ${className}`}>
        {/* Trichoscopy Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cv-grid-hair" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#6366f1" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cv-grid-hair)" />
        </svg>

        {/* Laser Scanning Line across Crossing Fibers */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{ left: ['4%', '94%', '4%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 bottom-2 w-[2px] bg-gradient-to-b from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] pointer-events-none z-20 opacity-80"
          />
        )}

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between text-[10px] pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">POLARIZED TRICHOSCOPY • 1024x1024</span>
          </div>
          <span className="text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
            Mask R-CNN ResNet-50-FPN
          </span>
        </div>

        {/* Center: Overlapping Hair Fibers with Colored Instance Masks */}
        <div className="relative z-10 my-2 flex items-center justify-center">
          <svg viewBox="0 0 280 110" className="w-full max-w-[280px] h-auto">
            {/* Background Microscopic Grain */}
            <circle cx="140" cy="55" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />

            {/* Fiber 1: Cyan Instance Mask (Curving downward) */}
            <path
              d="M 20 20 Q 140 60 260 95"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Sub-pixel Polygon Mask Contour */}
            <path
              d="M 18 17 Q 140 57 262 92 L 258 98 Q 140 63 22 23 Z"
              fill="rgba(6, 182, 212, 0.25)"
              stroke="#22d3ee"
              strokeWidth="0.8"
              strokeDasharray="2,2"
            />

            {/* Fiber 2: Indigo Instance Mask (Crossing Fiber 1 acutely) */}
            <path
              d="M 30 90 Q 130 50 250 15"
              fill="none"
              stroke="#818cf8"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 28 87 Q 130 47 252 12 L 248 18 Q 130 53 32 93 Z"
              fill="rgba(129, 140, 248, 0.25)"
              stroke="#a5b4fc"
              strokeWidth="0.8"
              strokeDasharray="2,2"
            />

            {/* Fiber 3: Emerald Instance Mask (Vertical vellus hair) */}
            <path
              d="M 140 10 Q 145 55 138 100"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Intersection RoIAlign Box */}
            <rect
              x="118"
              y="38"
              width="44"
              height="34"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.2"
              strokeDasharray="3,2"
              rx="2"
            />
            <text x="120" y="34" fill="#fbbf24" fontSize="7" fontWeight="bold">
              RoIAlign (Bilinear)
            </text>

            {/* Instance Labels */}
            <text x="25" y="15" fill="#38bdf8" fontSize="7" fontWeight="bold">
              [ID_1: CONF 0.94]
            </text>
            <text x="200" y="10" fill="#a5b4fc" fontSize="7" fontWeight="bold">
              [ID_2: CONF 0.91]
            </text>
          </svg>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] pt-2 border-t border-white/10">
          <span className="text-cyan-400 font-bold text-[9px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            0.84 mAP Precision
          </span>
          <span className="text-indigo-300 text-[9px]">0.78 IoU (Crossing Resolved)</span>
          <span className="text-emerald-400 font-bold text-[9px]">&lt;120ms TensorRT FP16</span>
        </div>
      </div>
    );
  }

  // 3. ULTRA-DOC-INTELLIGENCE (Vector Search & Dense Retrieval RAG)
  if (projectId === 'ultra-doc-intelligence') {
    return (
      <div className={`relative w-full h-full min-h-[220px] rounded-xl bg-slate-950 text-white overflow-hidden p-3 sm:p-4 select-none font-mono ${className}`}>
        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between text-[10px] pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-bold">GROUNDED VECTOR RETRIEVAL • ChromaDB</span>
          </div>
          <span className="text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            Gate Threshold: 0.35
          </span>
        </div>

        {/* Center: Vector Space & Cosine Trajectory Visualization */}
        <div className="relative z-10 my-2 flex items-center justify-around py-1">
          {/* Document Ingestion & Chunking Box */}
          <div className="border border-white/10 rounded-lg p-2 bg-white/5 text-center space-y-1 w-24">
            <FileText className="w-5 h-5 text-blue-400 mx-auto" />
            <div className="text-[8px] font-bold text-slate-200">PDF Ingestion</div>
            <div className="text-[7px] text-slate-400">1000-char chunks</div>
          </div>

          {/* Arrow */}
          <div className="text-blue-400 animate-pulse">&rarr;</div>

          {/* 384-D Vector Embedding */}
          <div className="border border-blue-500/40 rounded-lg p-2 bg-blue-950/30 text-center space-y-1 w-28">
            <Layers className="w-5 h-5 text-cyan-400 mx-auto" />
            <div className="text-[8px] font-bold text-cyan-300">all-MiniLM-L6</div>
            <div className="text-[7px] text-slate-300">Dense 384-d Vector</div>
          </div>

          {/* Arrow */}
          <div className="text-cyan-400 animate-pulse">&rarr;</div>

          {/* ChromaDB Cosine Isolation Search */}
          <div className="border border-emerald-500/40 rounded-lg p-2 bg-emerald-950/30 text-center space-y-1 w-28">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
            <div className="text-[8px] font-bold text-emerald-300">Grounded Output</div>
            <div className="text-[7px] text-emerald-200">cos_sim: 0.89 &gt; 0.35</div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] pt-2 border-t border-white/10">
          <span className="text-emerald-400 font-bold text-[9px]">Zero Cross-Doc Leakage</span>
          <span className="text-blue-300 text-[9px]">UUID Isolation Filter</span>
          <span className="text-cyan-400 font-bold text-[9px]">&lt;2.0s Query SLA</span>
        </div>
      </div>
    );
  }

  // 4. AUTONOMOUS TESTING & HEALTH AGENTS (Agent Orchestration Loop)
  return (
    <div className={`relative w-full h-full min-h-[220px] rounded-xl bg-slate-950 text-white overflow-hidden p-3 sm:p-4 select-none font-mono ${className}`}>
      <div className="relative z-10 flex items-center justify-between text-[10px] pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-purple-400">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="font-bold">AGENTIC ORCHESTRATION LOOP</span>
        </div>
        <span className="text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
          Production Client Deploy
        </span>
      </div>

      {/* Orchestration Step Trace */}
      <div className="relative z-10 my-3 grid grid-cols-3 gap-2 text-center text-[8.5px]">
        <div className="p-2 rounded bg-purple-950/40 border border-purple-500/30 space-y-1">
          <div className="text-purple-300 font-bold">1. DOM Snapshot</div>
          <div className="text-slate-400 text-[7.5px]">Extract interactive UI tree</div>
        </div>
        <div className="p-2 rounded bg-blue-950/40 border border-blue-500/30 space-y-1">
          <div className="text-blue-300 font-bold">2. LLM Tool Call</div>
          <div className="text-slate-400 text-[7.5px]">Pydantic schema assertion</div>
        </div>
        <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 space-y-1">
          <div className="text-emerald-300 font-bold">3. Telemetry Ingest</div>
          <div className="text-slate-400 text-[7.5px]">Apple Health 5-min bins</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[10px] pt-2 border-t border-white/10">
        <span className="text-purple-300 text-[9px]">Multi-Turn Planning Stack</span>
        <span className="text-emerald-400 font-bold text-[9px]">100% Schema Enforced</span>
      </div>
    </div>
  );
};
