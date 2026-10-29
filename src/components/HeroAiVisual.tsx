import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, Activity, CheckCircle2 } from 'lucide-react';

interface NetworkNode {
  id: string;
  layer: number; // 0: Input, 1: Backbone, 2: Latent/TensorRT, 3: Output
  x: number;
  y: number;
  label: string;
  sub: string;
  color: string;
}

const NODES: NetworkNode[] = [
  // Input Layer (Sensors & Video Frames)
  { id: 'in-1', layer: 0, x: 55, y: 75, label: 'CSI Camera', sub: '30 FPS Frame', color: '#0284c7' },
  { id: 'in-2', layer: 0, x: 55, y: 155, label: 'Trichoscopy', sub: '1024x1024 Tile', color: '#0284c7' },
  { id: 'in-3', layer: 0, x: 55, y: 235, label: 'PDF Documents', sub: 'OCR & Parser', color: '#0284c7' },
  { id: 'in-4', layer: 0, x: 55, y: 315, label: 'Apple Health', sub: 'XML Telemetry', color: '#0284c7' },

  // Backbone & Feature Maps (ResNet / FPN / Embeddings)
  { id: 'bb-1', layer: 1, x: 180, y: 95, label: 'FPN P2-P4', sub: 'Multi-scale Maps', color: '#2563eb' },
  { id: 'bb-2', layer: 1, x: 180, y: 195, label: 'MiniLM-L6', sub: 'Dense 384-d', color: '#2563eb' },
  { id: 'bb-3', layer: 1, x: 180, y: 295, label: '68-Pt Landmark', sub: 'Facial ROI Mesh', color: '#2563eb' },

  // Optimization & Latent Acceleration (TensorRT / ChromaDB / RoIAlign)
  { id: 'lat-1', layer: 2, x: 310, y: 110, label: 'TensorRT FP16', sub: 'Graph Fused', color: '#059669' },
  { id: 'lat-2', layer: 2, x: 310, y: 200, label: 'RoIAlign Head', sub: 'Sub-pixel Bilinear', color: '#059669' },
  { id: 'lat-3', layer: 2, x: 310, y: 290, label: 'ChromaDB HNSW', sub: 'Cosine Isolation', color: '#059669' },

  // Production Output Heads (Inference & Evaluation)
  { id: 'out-1', layer: 3, x: 440, y: 85, label: '0.84 mAP Masks', sub: 'Fiber Seg', color: '#0284c7' },
  { id: 'out-2', layer: 3, x: 440, y: 165, label: '<120ms Latency', sub: 'P95 SLA', color: '#059669' },
  { id: 'out-3', layer: 3, x: 440, y: 245, label: 'SW-19841/2024', sub: 'Govt Copyright', color: '#d97706' },
  { id: 'out-4', layer: 3, x: 440, y: 325, label: 'Grounded RAG', sub: '0.35 Gate Pass', color: '#2563eb' },
];

// Synaptic connections between layers
const CONNECTIONS: { from: string; to: string; delay: number }[] = [
  { from: 'in-1', to: 'bb-3', delay: 0 },
  { from: 'in-2', to: 'bb-1', delay: 0.2 },
  { from: 'in-3', to: 'bb-2', delay: 0.4 },
  { from: 'in-4', to: 'bb-2', delay: 0.6 },

  { from: 'bb-1', to: 'lat-1', delay: 0.1 },
  { from: 'bb-1', to: 'lat-2', delay: 0.3 },
  { from: 'bb-2', to: 'lat-3', delay: 0.5 },
  { from: 'bb-3', to: 'lat-1', delay: 0.2 },

  { from: 'lat-1', to: 'out-2', delay: 0.2 },
  { from: 'lat-2', to: 'out-1', delay: 0.4 },
  { from: 'lat-1', to: 'out-3', delay: 0.6 },
  { from: 'lat-3', to: 'out-4', delay: 0.5 },
];

export const HeroAiVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Periodic pulse trigger for flowing synaptic packets
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const getNode = (id: string) => NODES.find((n) => n.id === id);

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-white via-slate-50/80 to-blue-50/40 border border-slate-200/90 shadow-card p-4 sm:p-6 overflow-hidden select-none">
      {/* Subtle Matrix Background Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-neural-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="2,3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-neural-grid)" />
      </svg>

      {/* Ambient Lighting Gradients (Cyan & Indigo glows) */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <span>Neural Graph Architecture</span>
          </span>
        </div>

        {/* Live FPS / Kernel Telemetry */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPulseCount((p) => p + 1);
            }}
            type="button"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-blue-600 hover:border-blue-400 shadow-xs transition-colors cursor-pointer"
            title="Pulse new tensor inference through network"
          >
            <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>Pulse Tensor</span>
          </button>
          <span className="hidden sm:inline-flex text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
            60 FPS &bull; &lt;120ms
          </span>
        </div>
      </div>

      {/* Layer Navigation Tabs */}
      <div className="relative z-10 grid grid-cols-4 gap-1 sm:gap-1.5 pt-3 pb-2 text-[10px] sm:text-[11px] font-mono">
        {[
          { label: '01. Input', idx: 0, desc: 'Sensors / ROI' },
          { label: '02. Backbone', idx: 1, desc: 'Pyramid Maps' },
          { label: '03. TensorRT', idx: 2, desc: 'FP16 Quantized' },
          { label: '04. Output', idx: 3, desc: '0.84 mAP SLA' },
        ].map((tab) => {
          const isSelected = activeLayer === tab.idx;
          return (
            <button
              key={tab.idx}
              onClick={() => setActiveLayer(isSelected ? null : tab.idx)}
              onMouseEnter={() => setActiveLayer(tab.idx)}
              onMouseLeave={() => setActiveLayer(null)}
              className={`p-1.5 sm:p-2 rounded-lg text-left transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white/80 hover:bg-slate-100/90 text-slate-700 border-slate-200/80'
              }`}
            >
              <div className="font-bold truncate">{tab.label}</div>
              <div className={`text-[9px] truncate hidden sm:block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                {tab.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main SVG Neural Network Interactive Canvas */}
      <div className="relative z-10 w-full overflow-x-auto overflow-y-hidden py-1">
        <svg
          viewBox="0 0 500 390"
          className="w-full h-auto min-w-[340px] max-h-[380px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Linear Gradients for Synaptic Connections */}
            <linearGradient id="synapse-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="synapse-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="synapse-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>

            {/* Glowing Node Filter */}
            <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Layer Background Columns */}
          {[
            { x: 15, w: 90, label: 'INPUT' },
            { x: 140, w: 90, label: 'BACKBONE' },
            { x: 270, w: 90, label: 'TENSORRT' },
            { x: 400, w: 90, label: 'INFERENCE' },
          ].map((col, idx) => (
            <g key={idx}>
              <rect
                x={col.x}
                y={25}
                width={col.w}
                height={350}
                rx={10}
                fill={activeLayer === idx ? 'rgba(37, 99, 235, 0.08)' : 'rgba(241, 245, 249, 0.45)'}
                stroke={activeLayer === idx ? '#93c5fd' : '#e2e8f0'}
                strokeWidth={activeLayer === idx ? 1.5 : 0.8}
                strokeDasharray="4,4"
              />
              <text
                x={col.x + col.w / 2}
                y={42}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fontFamily="monospace"
                fill={activeLayer === idx ? '#2563eb' : '#94a3b8'}
                letterSpacing="0.05em"
              >
                {col.label}
              </text>
            </g>
          ))}

          {/* Synaptic Pathway Lines */}
          {CONNECTIONS.map((conn, idx) => {
            const source = getNode(conn.from);
            const target = getNode(conn.to);
            if (!source || !target) return null;

            const isHighlighted =
              activeLayer === null ||
              activeLayer === source.layer ||
              activeLayer === target.layer;

            // Curved cubic bezier connection
            const dx = target.x - source.x;
            const pathD = `M ${source.x + 12} ${source.y} C ${source.x + dx * 0.5} ${source.y}, ${source.x + dx * 0.5} ${target.y}, ${target.x - 12} ${target.y}`;

            const strokeColor =
              source.layer === 0
                ? 'url(#synapse-gradient-1)'
                : source.layer === 1
                ? 'url(#synapse-gradient-2)'
                : 'url(#synapse-gradient-3)';

            return (
              <g key={`conn-${idx}`}>
                {/* Base Connection Track */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? 1.6 : 0.8}
                  strokeOpacity={isHighlighted ? 0.75 : 0.2}
                />

                {/* Flowing Synaptic Data Packet (Animated Circle along Path) */}
                {!shouldReduceMotion && (
                  <motion.circle
                    key={`pulse-${pulseCount}-${idx}`}
                    r={isHighlighted ? 3 : 2}
                    fill={source.layer === 1 ? '#38bdf8' : source.layer === 2 ? '#34d399' : '#60a5fa'}
                    filter="url(#node-glow)"
                    initial={{ offsetDistance: '0%', opacity: 0 }}
                    animate={{
                      offsetDistance: ['0%', '100%'],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      delay: conn.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      offsetPath: `path('${pathD}')`,
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Network Nodes */}
          {NODES.map((node) => {
            const isSelected = activeLayer === node.layer;
            const isFaded = activeLayer !== null && !isSelected;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer transition-transform duration-300"
                onClick={() => setActiveLayer(node.layer)}
                onMouseEnter={() => setActiveLayer(node.layer)}
                opacity={isFaded ? 0.35 : 1}
              >
                {/* Ambient Node Halo (Pulsing) */}
                {!shouldReduceMotion && isSelected && (
                  <motion.circle
                    r={18}
                    fill={node.color}
                    opacity={0.15}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Outer Node Ring */}
                <circle
                  r={11}
                  fill="#ffffff"
                  stroke={node.color}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter="url(#node-glow)"
                />

                {/* Inner Core */}
                <circle
                  r={5}
                  fill={node.color}
                />

                {/* Node Label Text */}
                <text
                  x={node.layer === 3 ? 16 : node.layer === 0 ? -16 : 0}
                  y={node.layer === 0 || node.layer === 3 ? -3 : 21}
                  textAnchor={node.layer === 3 ? 'start' : node.layer === 0 ? 'end' : 'middle'}
                  fontSize="8.5"
                  fontWeight="700"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fill="#0f172a"
                >
                  {node.label}
                </text>

                {/* Subtitle Spec Text */}
                <text
                  x={node.layer === 3 ? 16 : node.layer === 0 ? -16 : 0}
                  y={node.layer === 0 || node.layer === 3 ? 7 : 30}
                  textAnchor={node.layer === 3 ? 'start' : node.layer === 0 ? 'end' : 'middle'}
                  fontSize="7"
                  fontFamily="monospace"
                  fill="#64748b"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}

          {/* Central Rotating Tensor Coordinate Ring Overlay */}
          <g transform="translate(245, 195)">
            {!shouldReduceMotion && (
              <motion.circle
                r={44}
                fill="none"
                stroke="#38bdf8"
                strokeWidth={1}
                strokeDasharray="4,8"
                opacity={0.35}
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />
            )}
            {!shouldReduceMotion && (
              <motion.circle
                r={36}
                fill="none"
                stroke="#818cf8"
                strokeWidth={0.8}
                strokeDasharray="6,6"
                opacity={0.3}
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </g>
        </svg>
      </div>

      {/* Footer Benchmark Bar */}
      <div className="relative z-10 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-medium">Pipeline Throughput:</span>
          <span className="text-[11px] font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
            5,000+ Imgs/Day
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>SLA: &lt;120ms P95</span>
        </div>
      </div>
    </div>
  );
};
