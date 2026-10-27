import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const InteractivePipelineExplorer: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<'edge' | 'vision' | 'rag'>('edge');
  const [sliderValue, setSliderValue] = useState<number>(31); // 0.31 EAR

  // Computed values for Edge Drowsiness simulator
  const earValue = (sliderValue / 100).toFixed(2);
  const isBlinking = sliderValue >= 21 && sliderValue <= 24;
  const isDrowsy = sliderValue < 21;

  const earStatusText = isDrowsy
    ? 'DROWSINESS CONFIRMED (Micro-sleep > 1.5s)'
    : isBlinking
    ? 'NORMAL BLINK (Transient Dip < 250ms)'
    : 'ATTENTIVE (Nominal Ocular Geometry)';

  const earStatusColor = isDrowsy
    ? 'bg-rose-50 text-rose-800 border-rose-200'
    : isBlinking
    ? 'bg-amber-50 text-amber-900 border-amber-200'
    : 'bg-emerald-50 text-emerald-900 border-emerald-200';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-7 space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-800">
            Interactive Architecture Explorer
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          Live Testbed
        </span>
      </div>

      {/* System Selector Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
        <button
          onClick={() => setActiveSystem('edge')}
          className={`py-2 px-1 sm:px-2 text-[11px] sm:text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
            activeSystem === 'edge'
              ? 'bg-white text-blue-600 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Edge EAR</span>
        </button>

        <button
          onClick={() => setActiveSystem('vision')}
          className={`py-2 px-1 sm:px-2 text-[11px] sm:text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
            activeSystem === 'vision'
              ? 'bg-white text-blue-600 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">TensorRT</span>
        </button>

        <button
          onClick={() => setActiveSystem('rag')}
          className={`py-2 px-1 sm:px-2 text-[11px] sm:text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
            activeSystem === 'rag'
              ? 'bg-white text-blue-600 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Grounded RAG</span>
        </button>
      </div>

      {/* Explorer Content Window */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 sm:p-5 min-h-[260px] flex flex-col justify-between space-y-4">
        <AnimatePresence mode="wait">
          {activeSystem === 'edge' && (
            <motion.div
              key="edge"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-medium">Metric: Eye Aspect Ratio (EAR)</span>
                <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                  Current EAR: {earValue}
                </span>
              </div>

              {/* Slider Controller with Accessible Label and ARIA */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                  <span>0.15 (Closed)</span>
                  <label htmlFor="ear-simulation-slider" className="text-blue-700 font-semibold cursor-pointer">
                    Drag to simulate driver state
                  </label>
                  <span>0.40 (Wide open)</span>
                </div>
                <input
                  id="ear-simulation-slider"
                  type="range"
                  min="15"
                  max="40"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseInt(e.target.value))}
                  aria-label="Eye Aspect Ratio (EAR) driver state simulation threshold"
                  aria-valuemin={15}
                  aria-valuemax={40}
                  aria-valuenow={sliderValue}
                  aria-valuetext={`Current EAR ${earValue}, status: ${earStatusText}`}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Live Status Output Box with WCAG Compliant Contrast */}
              <div className={`p-3 rounded-lg border text-xs font-mono font-medium transition-all ${earStatusColor}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-current shrink-0" />
                  <span className="truncate">{earStatusText}</span>
                </div>
                <div className="text-[11px] mt-1 font-sans font-medium">
                  {isDrowsy
                    ? 'Isolated audio thread dispatched buzzer. Camera loop continues at 30 FPS without stutter.'
                    : isBlinking
                    ? 'Sliding window circular buffer filters out natural blinks (<3 consecutive frames).'
                    : 'Driver nominal. Localized 68-point Dlib shape predictor tracking ocular region.'}
                </div>
              </div>

              {/* Verified Benchmarks */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-600 font-medium">Edge Platform</div>
                  <div className="font-semibold text-slate-900 mt-0.5">Raspberry Pi 4 ARM</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-600 font-medium">Copyright Certificate</div>
                  <div className="font-semibold text-amber-800 mt-0.5">{PERSONAL_INFO.copyrightId}</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSystem === 'vision' && (
            <motion.div
              key="vision"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-medium">Hairscope Clinical Pipeline</span>
                <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  5,000+ Daily Images
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-600 leading-relaxed">
                  Comparing PyTorch FP32 baseline against ONNX Runtime and TensorRT FP16 quantization benchmarks:
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-slate-800 font-semibold">1. Standard PyTorch (FP32)</span>
                      <div className="text-[10px] text-slate-600 font-sans">Baseline unoptimized model</div>
                    </div>
                    <span className="text-slate-700 font-semibold">185ms / 1.2GB VRAM</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-slate-800 font-semibold">2. ONNX Graph Optimization</span>
                      <div className="text-[10px] text-slate-600 font-sans">Dead node stripping &amp; constant folding</div>
                    </div>
                    <span className="text-blue-800 font-semibold">105ms / 780MB VRAM</span>
                  </div>

                  <div className="bg-blue-50/70 p-2.5 rounded-lg border border-blue-200 flex items-center justify-between">
                    <div>
                      <span className="text-blue-950 font-semibold">3. TensorRT + AMP (Production)</span>
                      <div className="text-[10px] text-blue-800 font-sans font-medium">CUDA streams with dynamic batching</div>
                    </div>
                    <span className="text-emerald-800 font-bold">&lt;84ms / 512MB VRAM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSystem === 'rag' && (
            <motion.div
              key="rag"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-medium">Deterministic Guardrails</span>
                <span className="text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Strict Grounding
                </span>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                Logistics &amp; enterprise invoice document extraction using ChromaDB vector lookups paired with refusal gates:
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-600">Cosine Similarity Score</span>
                  <span className="text-blue-700 font-bold">0.88 (&gt;0.78 SLA threshold)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-600">JSON Schema Integrity</span>
                  <span className="text-emerald-800 font-semibold">Pydantic 100% Passed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Hallucination Gate</span>
                  <span className="text-emerald-800 font-semibold">Refusal Lock Active</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-700 font-sans leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                Any query whose retrieved chunk distance falls below 0.78 triggers a deterministic fallback refusal rather than generating ungrounded tokens.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer verified badge */}
      <div className="flex items-center justify-between text-xs text-slate-600 font-mono border-t border-slate-100 pt-3">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Real-World Benchmark Logic</span>
        </div>
        <span className="text-blue-700 font-semibold">FastAPI &bull; CUDA &bull; Edge</span>
      </div>
    </div>
  );
};
