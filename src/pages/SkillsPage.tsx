import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Code, 
  Brain, 
  Eye, 
  Sparkles, 
  Server, 
  Cpu, 
  CheckCircle, 
  Zap, 
  Shield, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
};

export const SkillsPage: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code className="w-5 h-5 text-blue-600" />;
      case 1:
        return <Brain className="w-5 h-5 text-indigo-600" />;
      case 2:
        return <Eye className="w-5 h-5 text-sky-600" />;
      case 3:
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 4:
        return <Server className="w-5 h-5 text-emerald-600" />;
      case 5:
        return <Cpu className="w-5 h-5 text-rose-600" />;
      default:
        return <Layers className="w-5 h-5 text-slate-600" />;
    }
  };

  const getCategoryBg = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-blue-50 border-blue-200';
      case 1:
        return 'bg-indigo-50 border-indigo-200';
      case 2:
        return 'bg-sky-50 border-sky-200';
      case 3:
        return 'bg-amber-50 border-amber-200';
      case 4:
        return 'bg-emerald-50 border-emerald-200';
      case 5:
        return 'bg-rose-50 border-rose-200';
      default:
        return 'bg-slate-100 border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12"
    >
      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
            <span>Verified Production Competencies &bull; Zero Progress Bar Gimmicks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
            Skills &amp; Technology Stack
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Technologies applied in production systems, deep learning inference pipelines, and edge device deployment. No arbitrary percentage progress bars.
          </p>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-200">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Primary Core</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Python, C++, CUDA</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Vision &amp; Edge</div>
            <div className="text-sm font-bold text-slate-900 mt-1">PyTorch, OpenCV, Dlib</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Inference Acceleration</div>
            <div className="text-sm font-bold text-slate-900 mt-1">TensorRT &bull; ONNX Runtime</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Backend &amp; LLM</div>
            <div className="text-sm font-bold text-slate-900 mt-1">FastAPI &bull; ChromaDB &bull; RAG</div>
          </div>
        </div>
      </div>

      {/* Grid of Categories (3 columns) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SKILL_CATEGORIES.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="modern-card bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-card transition-all"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${getCategoryBg(idx)}`}>
                  {getCategoryIcon(idx)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">
                    {cat.title}
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.04 }}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/60 transition-all shadow-xs font-medium cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Production Principles Section Spanning Full Width */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs">
        <div>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
            Methodology &amp; Standards
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mt-1">
            Production Engineering Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            My engineering decisions prioritize measurable operational characteristics over hype.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          <motion.div whileHover={{ y: -2 }} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>Deterministic Latency</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every inference service has explicit P95 latency SLAs. Models are profiled on real hardware targets before deployment.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>Grounded Guardrails</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              LLM pipelines enforce JSON Schema validation, metadata constraints, and refusal thresholds to suppress hallucinations.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Offline First</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Edge vision pipelines are architected with zero cloud dependencies to guarantee reliability in remote or disconnected environments.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-950">Want to see these tools in production?</h3>
          <p className="text-xs sm:text-sm text-slate-600">Explore full case studies with code and architecture diagrams.</p>
        </div>
        <NavLink
          to="/projects"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs"
        >
          <span>View Projects &amp; Case Studies</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </motion.div>
  );
};
