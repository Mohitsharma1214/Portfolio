import React from 'react';

interface ArchitectureDiagramProps {
  projectId: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ projectId }) => {
  if (projectId === 'driver-drowsiness-detection') {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 overflow-x-auto shadow-sm">
        <div className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>System Architecture • Edge Inference Flow</span>
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            &lt;150ms Loop
          </span>
        </div>
        <svg viewBox="0 0 860 210" className="w-full min-w-[700px] h-auto font-sans text-xs select-none">
          <defs>
            <linearGradient id="edgeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eff6ff" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
            <linearGradient id="edgeAlert" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef2f2" />
              <stop offset="100%" stopColor="#fee2e2" />
            </linearGradient>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Step 1: Camera Input */}
          <g transform="translate(10, 30)">
            <rect width="120" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect width="120" height="24" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="60" y="16" textAnchor="middle" fontWeight="600" fill="#334155" fontSize="11">CSI Camera</text>
            <text x="60" y="48" textAnchor="middle" fill="#475569" fontSize="11">640×480 @ 30 FPS</text>
            <text x="60" y="66" textAnchor="middle" fill="#64748b" fontSize="10">Raw RGB Stream</text>
            <text x="60" y="84" textAnchor="middle" fill="#026bc9" fontSize="9" fontWeight="500">Raspberry Pi CSI</text>
          </g>

          {/* Arrow 1 */}
          <line x1="130" y1="75" x2="165" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Step 2: Adaptive ROI & 1-in-15 Scheduler */}
          <g transform="translate(170, 30)">
            <rect width="150" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect width="150" height="24" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="75" y="16" textAnchor="middle" fontWeight="600" fill="#334155" fontSize="11">Dynamic ROI Tracking</text>
            <text x="75" y="46" textAnchor="middle" fill="#475569" fontSize="10">HOG Face (1-in-15)</text>
            <text x="75" y="64" textAnchor="middle" fill="#475569" fontSize="10">CLAHE Contrast Norm</text>
            <text x="75" y="82" textAnchor="middle" fill="#026bc9" fontSize="9" fontWeight="500">38% CPU Reduction</text>
          </g>

          {/* Arrow 2 */}
          <line x1="320" y1="75" x2="355" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Step 3: 68-Point Landmark & EAR */}
          <g transform="translate(360, 20)">
            <rect width="160" height="110" rx="8" fill="url(#edgeBlue)" stroke="#93c5fd" strokeWidth="1.5" />
            <rect width="160" height="26" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="80" y="17" textAnchor="middle" fontWeight="700" fill="#1e3a8a" fontSize="11">Dlib 68-Point Landmarks</text>
            <text x="80" y="48" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="600">Ocular Coord Extraction</text>
            <text x="80" y="68" textAnchor="middle" fill="#334155" fontSize="10">EAR = (||p2-p6|| + ||p3-p5||)</text>
            <text x="80" y="84" textAnchor="middle" fill="#334155" fontSize="10">/ (2 * ||p1-p4||)</text>
            <text x="80" y="102" textAnchor="middle" fill="#026bc9" fontSize="9" fontWeight="600">Circular Time Buffer</text>
          </g>

          {/* Arrow 3 */}
          <line x1="520" y1="75" x2="555" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Step 4: Temporal Threshold Gate */}
          <g transform="translate(560, 30)">
            <rect width="130" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect width="130" height="24" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="65" y="16" textAnchor="middle" fontWeight="600" fill="#334155" fontSize="11">Threshold Evaluator</text>
            <text x="65" y="48" textAnchor="middle" fill="#475569" fontSize="10">EAR &lt; 0.22 Threshold</text>
            <text x="65" y="66" textAnchor="middle" fill="#475569" fontSize="10">Sustained &gt; 45 frames</text>
            <text x="65" y="84" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="600">Blink vs Fatigue Logic</text>
          </g>

          {/* Arrow 4 */}
          <line x1="690" y1="75" x2="725" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Step 5: Isolated Alert Dispatch */}
          <g transform="translate(730, 25)">
            <rect width="120" height="100" rx="8" fill="url(#edgeAlert)" stroke="#fca5a5" strokeWidth="1.5" />
            <rect width="120" height="24" rx="8" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5" />
            <text x="60" y="16" textAnchor="middle" fontWeight="700" fill="#991b1b" fontSize="11">Alert Subsystem</text>
            <text x="60" y="46" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="600">Thread-Isolated</text>
            <text x="60" y="64" textAnchor="middle" fill="#7f1d1d" fontSize="10">Acoustic Buzzer (Pygame)</text>
            <text x="60" y="82" textAnchor="middle" fill="#7f1d1d" fontSize="10">Visual Warning Overlay</text>
          </g>

          {/* Bottom Annotation */}
          <g transform="translate(10, 160)">
            <rect width="840" height="34" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <text x="20" y="21" fill="#475569" fontSize="11" fontWeight="500">
              Hardware Platform: Raspberry Pi 4 Model B (Quad Cortex-A72) • 100% Offline Edge Autonomy • SW-19841/2024
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (projectId === 'hair-strand-detection') {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 overflow-x-auto shadow-sm">
        <div className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Model Inference Pipeline • Sub-Pixel Trichology</span>
          <span className="text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            0.84 mAP @ &lt;120ms
          </span>
        </div>
        <svg viewBox="0 0 860 210" className="w-full min-w-[700px] h-auto font-sans text-xs select-none">
          <defs>
            <linearGradient id="pipeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#dcfce7" />
            </linearGradient>
            <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Node 1: Trichoscopy Input */}
          <g transform="translate(10, 30)">
            <rect width="130" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect width="130" height="24" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="65" y="16" textAnchor="middle" fontWeight="600" fill="#334155" fontSize="11">Trichoscope Tile</text>
            <text x="65" y="48" textAnchor="middle" fill="#475569" fontSize="10">1024×1024 Polarized</text>
            <text x="65" y="66" textAnchor="middle" fill="#64748b" fontSize="10">High-Resolution Sensor</text>
            <text x="65" y="84" textAnchor="middle" fill="#4f46e5" fontSize="9" fontWeight="500">Microscopic Capture</text>
          </g>

          <line x1="140" y1="75" x2="175" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />

          {/* Node 2: Preprocessing & Contrast Normalization */}
          <g transform="translate(180, 30)">
            <rect width="140" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect width="140" height="24" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="70" y="16" textAnchor="middle" fontWeight="600" fill="#334155" fontSize="11">Preprocessing Engine</text>
            <text x="70" y="48" textAnchor="middle" fill="#475569" fontSize="10">CLAHE + Denoising</text>
            <text x="70" y="66" textAnchor="middle" fill="#475569" fontSize="10">Specular Glare Removal</text>
            <text x="70" y="84" textAnchor="middle" fill="#026bc9" fontSize="9" fontWeight="500">Sub-pixel Alignment</text>
          </g>

          <line x1="320" y1="75" x2="355" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />

          {/* Node 3: Deep Feature Extractor & Neck */}
          <g transform="translate(360, 20)">
            <rect width="160" height="110" rx="8" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />
            <rect width="160" height="26" rx="8" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1.5" />
            <text x="80" y="17" textAnchor="middle" fontWeight="700" fill="#5b21b6" fontSize="11">YOLOv11l-seg / Mask R-CNN</text>
            <text x="80" y="48" textAnchor="middle" fill="#6d28d9" fontSize="10" fontWeight="600">FPN Multi-Scale Neck</text>
            <text x="80" y="68" textAnchor="middle" fill="#475569" fontSize="10">Boundary Loss Penalty</text>
            <text x="80" y="86" textAnchor="middle" fill="#475569" fontSize="10">High-Res Mask Prototypes</text>
            <text x="80" y="104" textAnchor="middle" fill="#5b21b6" fontSize="9" fontWeight="600">Overlapping Strand Logic</text>
          </g>

          <line x1="520" y1="75" x2="555" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />

          {/* Node 4: TensorRT Quantization Engine */}
          <g transform="translate(560, 20)">
            <rect width="140" height="110" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
            <rect width="140" height="26" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="70" y="17" textAnchor="middle" fontWeight="700" fill="#1e40af" fontSize="11">TensorRT Engine</text>
            <text x="70" y="48" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="600">FP16 Graph Compilation</text>
            <text x="70" y="68" textAnchor="middle" fill="#334155" fontSize="10">Kernel Fusion Execution</text>
            <text x="70" y="86" textAnchor="middle" fill="#334155" fontSize="10">42% VRAM Reduction</text>
            <text x="70" y="104" textAnchor="middle" fill="#026bc9" fontSize="9" fontWeight="600">&lt;120ms Inference</text>
          </g>

          <line x1="700" y1="75" x2="735" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />

          {/* Node 5: Clinical Analytics Output */}
          <g transform="translate(740, 30)">
            <rect width="110" height="90" rx="8" fill="url(#pipeBlue)" stroke="#86efac" strokeWidth="1.5" />
            <rect width="110" height="24" rx="8" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
            <text x="55" y="16" textAnchor="middle" fontWeight="700" fill="#166534" fontSize="11">Clinical Output</text>
            <text x="55" y="48" textAnchor="middle" fill="#15803d" fontSize="10">Strand Count &amp; IoU</text>
            <text x="55" y="66" textAnchor="middle" fill="#15803d" fontSize="10">Thickness Mapping</text>
            <text x="55" y="84" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="600">Density Metrics</text>
          </g>

          <g transform="translate(10, 160)">
            <rect width="840" height="34" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <text x="20" y="21" fill="#475569" fontSize="11" fontWeight="500">
              Benchmark Verification: 0.84 mAP@0.5 • 0.78 IoU • NVIDIA TensorRT FP16 Execution Graph
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (projectId === 'ultra-doc-intelligence') {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 overflow-x-auto shadow-sm">
        <div className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Grounded RAG Architecture • Strict Isolation &amp; Guardrails</span>
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            0.35 Hallucination Gate
          </span>
        </div>
        <svg viewBox="0 0 860 210" className="w-full min-w-[700px] h-auto font-sans text-xs select-none">
          <defs>
            <marker id="arrow3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Node 1: Ingestion & Chunking */}
          <g transform="translate(10, 30)">
            <rect width="130" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect width="130" height="24" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="65" y="16" textAnchor="middle" fontWeight="600" fill="#334155" fontSize="11">Logistics PDF</text>
            <text x="65" y="48" textAnchor="middle" fill="#475569" fontSize="10">Recursive Chunking</text>
            <text x="65" y="66" textAnchor="middle" fill="#475569" fontSize="10">1000 Chars / 200 Overlap</text>
            <text x="65" y="84" textAnchor="middle" fill="#026bc9" fontSize="9" fontWeight="500">Document UUID Tag</text>
          </g>

          <line x1="140" y1="75" x2="175" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow3)" />

          {/* Node 2: ChromaDB Isolated Storage */}
          <g transform="translate(180, 20)">
            <rect width="150" height="110" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
            <rect width="150" height="26" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="75" y="17" textAnchor="middle" fontWeight="700" fill="#1e40af" fontSize="11">ChromaDB Store</text>
            <text x="75" y="48" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="600">all-MiniLM-L6-v2</text>
            <text x="75" y="68" textAnchor="middle" fill="#334155" fontSize="10">Strict Metadata Isolation</text>
            <text x="75" y="86" textAnchor="middle" fill="#334155" fontSize="10">where={"{"}doc_id: UUID{"}"}</text>
            <text x="75" y="104" textAnchor="middle" fill="#026bc9" fontSize="9" fontWeight="600">0% Cross-Doc Bleed</text>
          </g>

          <line x1="330" y1="75" x2="365" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow3)" />

          {/* Node 3: Top-8 Cosine Retrieval */}
          <g transform="translate(370, 30)">
            <rect width="130" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect width="130" height="24" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="65" y="16" textAnchor="middle" fontWeight="600" fill="#334155" fontSize="11">Filtered Query</text>
            <text x="65" y="48" textAnchor="middle" fill="#475569" fontSize="10">Top-8 Semantic Chunks</text>
            <text x="65" y="66" textAnchor="middle" fill="#475569" fontSize="10">Cosine Similarity Metric</text>
            <text x="65" y="84" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="500">Ranked Context</text>
          </g>

          <line x1="500" y1="75" x2="535" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow3)" />

          {/* Node 4: Grounded LLM Prompt */}
          <g transform="translate(540, 20)">
            <rect width="150" height="110" rx="8" fill="#fefce8" stroke="#fde047" strokeWidth="1.5" />
            <rect width="150" height="26" rx="8" fill="#fef08a" stroke="#fde047" strokeWidth="1.5" />
            <text x="75" y="17" textAnchor="middle" fontWeight="700" fill="#854d0e" fontSize="11">OpenRouter LLM Core</text>
            <text x="75" y="48" textAnchor="middle" fill="#713f12" fontSize="10" fontWeight="600">Negative Prompt Guards</text>
            <text x="75" y="68" textAnchor="middle" fill="#334155" fontSize="10">Strict Grounding Rules</text>
            <text x="75" y="86" textAnchor="middle" fill="#334155" fontSize="10">Certainty Self-Score</text>
            <text x="75" y="104" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="600">Structured JSON Output</text>
          </g>

          <line x1="690" y1="75" x2="725" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow3)" />

          {/* Node 5: Hybrid Score & Gate */}
          <g transform="translate(730, 20)">
            <rect width="120" height="110" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
            <rect width="120" height="26" rx="8" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
            <text x="60" y="17" textAnchor="middle" fontWeight="700" fill="#166534" fontSize="11">Confidence Gate</text>
            <text x="60" y="46" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="600">40% Vector Dist</text>
            <text x="60" y="62" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="600">+ 60% LLM Certainty</text>
            <text x="60" y="82" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="700">Cutoff: &lt; 0.35 Refusal</text>
            <text x="60" y="100" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="600">UI Answer / Warning</text>
          </g>

          <g transform="translate(10, 160)">
            <rect width="840" height="34" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <text x="20" y="21" fill="#475569" fontSize="11" fontWeight="500">
              Deterministic Refusal Strategy: System forcibly suppresses hallucinations if confidence &lt; 0.35 or context absent.
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Default clean pipeline schematic
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 overflow-x-auto shadow-sm">
      <div className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-2">
        System Architecture • Production Dataflow
      </div>
      <div className="flex items-center justify-between text-xs text-slate-600 gap-2 min-w-[600px] py-3">
        <div className="bg-white p-3 rounded-lg border border-slate-200 flex-1 text-center shadow-subtle">
          <div className="font-semibold text-slate-800">1. Client / Telemetry</div>
          <div className="text-[11px] text-slate-500 mt-1">Request Payload</div>
        </div>
        <div className="text-slate-400 font-mono">→</div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 flex-1 text-center shadow-subtle">
          <div className="font-semibold text-slate-800">2. Async Gateway</div>
          <div className="text-[11px] text-slate-500 mt-1">FastAPI / Validation</div>
        </div>
        <div className="text-slate-400 font-mono">→</div>
        <div className="bg-brand-50 p-3 rounded-lg border border-brand-200 flex-1 text-center shadow-subtle">
          <div className="font-semibold text-brand-900">3. AI Core / Pipeline</div>
          <div className="text-[11px] text-brand-700 mt-1">PyTorch / LLM Agents</div>
        </div>
        <div className="text-slate-400 font-mono">→</div>
        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 flex-1 text-center shadow-subtle">
          <div className="font-semibold text-emerald-900">4. Evaluation &amp; Cache</div>
          <div className="text-[11px] text-emerald-700 mt-1">Confidence Scoring</div>
        </div>
      </div>
    </div>
  );
};
