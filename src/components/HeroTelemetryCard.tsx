import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Play, Pause, RefreshCw, CheckCircle2 } from 'lucide-react';

export const HeroTelemetryCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'edge' | 'vision' | 'rag'>('edge');
  const [isRunning, setIsRunning] = useState(true);
  const [fps, setFps] = useState(30);
  const [latency, setLatency] = useState(34);
  const [earValue, setEarValue] = useState(0.31);
  const [confidence, setConfidence] = useState(0.88);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      // Simulate live edge telemetry fluctuations
      if (activeTab === 'edge') {
        setFps(Math.floor(29 + Math.random() * 3));
        setLatency(Math.floor(32 + Math.random() * 6));
        setEarValue(Number((0.30 + (Math.random() * 0.04 - 0.02)).toFixed(3)));
      } else if (activeTab === 'vision') {
        setLatency(Math.floor(96 + Math.random() * 5));
        setFps(Math.floor(10 + Math.random() * 2));
      } else {
        setLatency(Math.floor(180 + Math.random() * 30));
        setConfidence(Number((0.85 + Math.random() * 0.08).toFixed(2)));
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isRunning, activeTab]);

  return (
    <div className="bg-[#0b111e]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.18)] overflow-hidden text-slate-200 transition-all hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] hover:border-cyan-400/50">
      {/* Top Window Bar */}
      <div className="bg-[#060a13] text-slate-300 px-4 py-3 flex items-center justify-between border-b border-slate-800/90">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.6)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.6)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.6)]"></div>
          </div>
          <span className="text-xs font-mono font-medium text-slate-300 ml-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            live-telemetry-inspector.py
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isRunning ? "Pause telemetry loop" : "Resume telemetry loop"}
            aria-label="Toggle telemetry"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>ACTIVE 30Hz</span>
          </span>
        </div>
      </div>

      {/* Pipeline Selector Tabs */}
      <div className="flex border-b border-slate-800/80 bg-[#070c17] p-1.5 gap-1.5 text-xs font-mono">
        <button
          onClick={() => setActiveTab('edge')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
            activeTab === 'edge'
              ? 'bg-slate-800/90 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] border border-cyan-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          1. Edge CV &lt;150ms
        </button>
        <button
          onClick={() => setActiveTab('vision')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
            activeTab === 'vision'
              ? 'bg-slate-800/90 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] border border-cyan-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          2. TensorRT Vision
        </button>
        <button
          onClick={() => setActiveTab('rag')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
            activeTab === 'rag'
              ? 'bg-slate-800/90 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] border border-cyan-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          3. Grounded RAG
        </button>
      </div>

      {/* Main Telemetry Body */}
      <div className="p-5 space-y-4">
        {activeTab === 'edge' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-100 flex items-center gap-2">
                  <span>Driver Drowsiness Edge Pipeline</span>
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-cyan-400 animate-pulse"></span>
                    <span className="w-0.5 h-3 bg-cyan-400 animate-pulse delay-75"></span>
                    <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-150"></span>
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Hardware: Raspberry Pi 4 (Quad ARM Cortex-A72)
                </div>
              </div>
              <span className="text-[11px] font-mono font-medium text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                SW-19841/2024
              </span>
            </div>

            {/* Metric Readouts */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">Inference Cycle</div>
                <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">{latency}ms</div>
                <div className="text-[9px] text-slate-400">&lt;150ms SLA bound</div>
              </div>
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">Frame Rate</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">{fps} FPS</div>
                <div className="text-[9px] text-slate-400">Zero frame drops</div>
              </div>
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">Eye Aspect Ratio</div>
                <div className="text-lg font-bold font-mono text-slate-200 mt-0.5">{earValue}</div>
                <div className="text-[9px] text-emerald-400 font-semibold">Normal (&gt;0.22)</div>
              </div>
            </div>

            {/* Execution Log Snippet */}
            <div className="bg-[#04070e] text-slate-300 rounded-xl p-3 font-mono text-[11px] leading-relaxed border border-cyan-950/60 shadow-inner">
              <div className="text-slate-400 flex items-center justify-between border-b border-slate-800 pb-1 mb-2">
                <span className="text-slate-300 font-semibold">[EDGE RUNTIME LOG]</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  THREAD_POOL_OK
                </span>
              </div>
              <p className="text-slate-300">
                <span className="text-cyan-400">12:17:40</span> [CAM] Frame #4182 (640x480) captured in 3.1ms
              </p>
              <p className="text-slate-300">
                <span className="text-cyan-400">12:17:40</span> [ROI] 1-in-15 cached bounding box tracking active
              </p>
              <p className="text-emerald-400">
                <span className="text-cyan-400">12:17:40</span> [MATH] EAR: {earValue} | Alert status: NOMINAL (0 alerts)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'vision' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-100 flex items-center gap-2">
                  <span>Hair Strand Instance Segmentation</span>
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-blue-400 animate-pulse"></span>
                    <span className="w-0.5 h-3 bg-blue-400 animate-pulse delay-75"></span>
                    <span className="w-0.5 h-1.5 bg-blue-400 animate-pulse delay-150"></span>
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Engine: YOLOv11l-seg + TensorRT FP16
                </div>
              </div>
              <span className="text-[11px] font-mono font-medium text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                0.84 mAP@0.5
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">TensorRT P95</div>
                <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">{latency}ms</div>
                <div className="text-[9px] text-slate-400">&lt;120ms Production</div>
              </div>
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">Mask IoU</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">0.78</div>
                <div className="text-[9px] text-slate-400">Sub-pixel precision</div>
              </div>
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">VRAM Saved</div>
                <div className="text-lg font-bold font-mono text-indigo-400 mt-0.5 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]">-42%</div>
                <div className="text-[9px] text-slate-400">FP16 Quantization</div>
              </div>
            </div>

            <div className="bg-[#04070e] text-slate-300 rounded-xl p-3 font-mono text-[11px] leading-relaxed border border-cyan-950/60 shadow-inner">
              <div className="text-slate-400 flex items-center justify-between border-b border-slate-800 pb-1 mb-2">
                <span className="text-slate-300 font-semibold">[INFERENCE LOG]</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  TRT_ENGINE_READY
                </span>
              </div>
              <p className="text-slate-300">
                <span className="text-cyan-400">12:17:41</span> [TILE] 1024x1024 polarized trichoscopy tile normalized
              </p>
              <p className="text-slate-300">
                <span className="text-cyan-400">12:17:41</span> [GPU] TensorRT kernel fusion completed in {latency}ms
              </p>
              <p className="text-emerald-400">
                <span className="text-cyan-400">12:17:41</span> [RESULT] 48 hair strands segmented | Mean thickness: 68.4um
              </p>
            </div>
          </div>
        )}

        {activeTab === 'rag' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-100 flex items-center gap-2">
                  <span>Ultra-Doc Logistics RAG Engine</span>
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-indigo-400 animate-pulse"></span>
                    <span className="w-0.5 h-3 bg-indigo-400 animate-pulse delay-75"></span>
                    <span className="w-0.5 h-1.5 bg-indigo-400 animate-pulse delay-150"></span>
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  ChromaDB Isolated Metadata + Hybrid Gate
                </div>
              </div>
              <span className="text-[11px] font-mono font-medium text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Live on Vercel
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">Confidence</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">{confidence}</div>
                <div className="text-[9px] text-slate-400">Cutoff: 0.35</div>
              </div>
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">Retrieved Chunks</div>
                <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">Top-8</div>
                <div className="text-[9px] text-slate-400">where={"{"}doc_id{"}"}</div>
              </div>
              <div className="bg-[#080d18] p-2.5 rounded-xl border border-slate-800/90 shadow-inner">
                <div className="text-[10px] text-slate-400 font-mono">Hallucinations</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">0% Bleed</div>
                <div className="text-[9px] text-slate-400">Strict metadata lock</div>
              </div>
            </div>

            <div className="bg-[#04070e] text-slate-300 rounded-xl p-3 font-mono text-[11px] leading-relaxed border border-cyan-950/60 shadow-inner">
              <div className="text-slate-400 flex items-center justify-between border-b border-slate-800 pb-1 mb-2">
                <span className="text-slate-300 font-semibold">[RAG PIPELINE LOG]</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  GUARDRAIL_PASSED
                </span>
              </div>
              <p className="text-slate-300">
                <span className="text-cyan-400">12:17:42</span> [QUERY] "What is the certified hazmat freight rate?"
              </p>
              <p className="text-slate-300">
                <span className="text-cyan-400">12:17:42</span> [CHROMA] Filtered search: 8 chunks matched (sim: 0.89)
              </p>
              <p className="text-emerald-400">
                <span className="text-cyan-400">12:17:42</span> [GATE] Score {confidence} &gt; 0.35 threshold. Output verified.
              </p>
            </div>
          </div>
        )}

        {/* Footer verification note */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Verified against actual production repos
          </span>
          <span className="text-cyan-400 font-semibold cursor-pointer hover:underline flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            Live loop
          </span>
        </div>
      </div>
    </div>
  );
};
