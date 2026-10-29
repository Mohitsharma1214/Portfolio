import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Zap, Activity, CheckCircle2 } from 'lucide-react';

interface AiPipelineVisualProps {
  type: 'optimization' | 'guardrails' | 'microservices';
  className?: string;
}

export const AiPipelineVisual: React.FC<AiPipelineVisualProps> = ({ type, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  // 1. MODEL OPTIMIZATION & TENSORRT COMPILATION
  if (type === 'optimization') {
    return (
      <div className={`relative w-full rounded-xl bg-slate-900/95 text-white p-3 overflow-hidden select-none font-mono text-[10px] border border-blue-500/30 ${className}`}>
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

        {/* Header Telemetry */}
        <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 text-[9px]">
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>GRAPH OPTIMIZATION PIPELINE</span>
          </span>
          <span className="text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">ONNX &bull; TensorRT</span>
        </div>

        {/* Graph Pipeline Sequence */}
        <div className="relative z-10 my-2.5 flex items-center justify-between gap-1 text-center">
          {/* Step 1: Raw PyTorch */}
          <div className="flex-1 p-1.5 rounded-lg bg-blue-950/40 border border-blue-500/20">
            <div className="text-[7.5px] text-slate-400 uppercase">Input</div>
            <div className="text-[9px] font-bold text-blue-300">PyTorch FP32</div>
            <div className="text-[7px] text-slate-400">185ms Latency</div>
          </div>

          {/* Animated Synapse */}
          <div className="shrink-0 text-cyan-400">
            {!shouldReduceMotion ? (
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                &rarr;
              </motion.div>
            ) : (
              <span>&rarr;</span>
            )}
          </div>

          {/* Step 2: Fused ONNX Graph */}
          <div className="flex-1 p-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30">
            <div className="text-[7.5px] text-indigo-300 uppercase">Fusion</div>
            <div className="text-[9px] font-bold text-indigo-200">ONNX Constant Fold</div>
            <div className="text-[7px] text-indigo-300">-35% Ops</div>
          </div>

          <div className="shrink-0 text-emerald-400">
            {!shouldReduceMotion ? (
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }}>
                &rarr;
              </motion.div>
            ) : (
              <span>&rarr;</span>
            )}
          </div>

          {/* Step 3: TensorRT FP16 Kernel */}
          <div className="flex-1 p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
            <div className="text-[7.5px] text-emerald-400 uppercase">Engine</div>
            <div className="text-[9px] font-bold text-emerald-300">TensorRT FP16</div>
            <div className="text-[7px] text-emerald-300">&lt;84ms Kernel</div>
          </div>
        </div>

        {/* Bottom Metric */}
        <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/10 text-[8.5px]">
          <span className="text-slate-400">VRAM: 4.8GB &rarr; 2.6GB</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>2.2x Throughput Boost</span>
          </span>
        </div>
      </div>
    );
  }

  // 2. DETERMINISTIC GUARDRAILS & REFUSAL BARRIER
  if (type === 'guardrails') {
    return (
      <div className={`relative w-full rounded-xl bg-slate-900/95 text-white p-3 overflow-hidden select-none font-mono text-[10px] border border-indigo-500/30 ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

        {/* Header Telemetry */}
        <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 text-[9px]">
          <span className="text-indigo-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-400 animate-pulse" />
            <span>DETERMINISTIC GUARDRAILS</span>
          </span>
          <span className="text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">Pydantic &bull; Cosine Gate</span>
        </div>

        {/* Guardrail Sequence */}
        <div className="relative z-10 my-2.5 flex items-center justify-between gap-1 text-center">
          <div className="flex-1 p-1.5 rounded-lg bg-slate-800/80 border border-white/10">
            <div className="text-[7.5px] text-slate-400 uppercase">Query</div>
            <div className="text-[9px] font-bold text-slate-200">User / API Request</div>
            <div className="text-[7px] text-slate-400">Raw Input</div>
          </div>

          <div className="shrink-0 text-indigo-400">&rarr;</div>

          {/* Gating Shield */}
          <div className="flex-1 p-1.5 rounded-lg bg-indigo-950/60 border border-indigo-400/40 relative">
            <div className="text-[7.5px] text-indigo-300 uppercase">Cosine Gate</div>
            <div className="text-[9px] font-bold text-amber-300">Refusal Barrier</div>
            <div className="text-[7px] text-indigo-200">&lt;0.35 = Halt</div>
          </div>

          <div className="shrink-0 text-emerald-400">&rarr;</div>

          {/* Strict JSON Output */}
          <div className="flex-1 p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
            <div className="text-[7.5px] text-emerald-400 uppercase">Validated</div>
            <div className="text-[9px] font-bold text-emerald-300">Pydantic JSON</div>
            <div className="text-[7px] text-emerald-200">Zero Hallucination</div>
          </div>
        </div>

        {/* Bottom Metric */}
        <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/10 text-[8.5px]">
          <span className="text-slate-400">Schema Enforcement: 100%</span>
          <span className="text-indigo-300 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Deterministic SLA</span>
          </span>
        </div>
      </div>
    );
  }

  // 3. SCALABLE MICROSERVICES & EDGE TELEMATICS
  return (
    <div className={`relative w-full rounded-xl bg-slate-900/95 text-white p-3 overflow-hidden select-none font-mono text-[10px] border border-emerald-500/30 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

      {/* Header Telemetry */}
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 text-[9px]">
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>MICRO-BATCHING QUEUE</span>
        </span>
        <span className="text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">FastAPI &bull; ARM Edge</span>
      </div>

      {/* Queue Sequence */}
      <div className="relative z-10 my-2.5 flex items-center justify-between gap-1 text-center">
        <div className="flex-1 p-1.5 rounded-lg bg-slate-800/80 border border-white/10">
          <div className="text-[7.5px] text-slate-400 uppercase">Ingest</div>
          <div className="text-[9px] font-bold text-slate-200">FastAPI Async</div>
          <div className="text-[7px] text-slate-400">Parallel Workers</div>
        </div>

        <div className="shrink-0 text-emerald-400">&rarr;</div>

        <div className="flex-1 p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-400/40">
          <div className="text-[7.5px] text-emerald-300 uppercase">Queue</div>
          <div className="text-[9px] font-bold text-emerald-200">Dynamic Batch (16)</div>
          <div className="text-[7px] text-emerald-300">GPU Auto-Flush</div>
        </div>

        <div className="shrink-0 text-cyan-400">&rarr;</div>

        <div className="flex-1 p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
          <div className="text-[7.5px] text-cyan-400 uppercase">Scale</div>
          <div className="text-[9px] font-bold text-cyan-200">5,000+ Imgs/Day</div>
          <div className="text-[7px] text-cyan-300">&lt;120ms P95 SLA</div>
        </div>
      </div>

      {/* Bottom Metric */}
      <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/10 text-[8.5px]">
        <span className="text-amber-300">SW-19841/2024 Edge</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-2.5 h-2.5" />
          <span>High-Concurrency Zero Stutter</span>
        </span>
      </div>
    </div>
  );
};
