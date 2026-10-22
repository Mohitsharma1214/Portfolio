import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { TECHNICAL_ARTICLES } from '../data/portfolioData';
import type { TechnicalArticle } from '../data/portfolioData';

interface WritingPageProps {
  onSelectArticle: (article: TechnicalArticle) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
};

export const WritingPage: React.FC<WritingPageProps> = ({ onSelectArticle }) => {
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
              <span>Systems Writing &bull; Latency Tradeoffs &bull; Primary Sources</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Technical Writing &amp; Notes
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              In-depth architectural breakdowns, latency tradeoffs, and failure mode analyses derived directly from production and edge implementations.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 self-start md:self-auto shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{TECHNICAL_ARTICLES.length} Technical Breakdowns</div>
              <div className="text-xs text-slate-500 font-mono font-medium">Architecture Notes</div>
            </div>
          </div>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Article 01</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Edge Fatigue Math Under 150ms</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Article 02</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Strictly Grounded Logistics RAG</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Article 03</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Sub-Pixel Segmentation Inference</div>
          </div>
        </div>
      </div>

      {/* Articles Grid (3 columns spanning full width) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {TECHNICAL_ARTICLES.map((article) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="modern-card bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between group cursor-pointer shadow-xs hover:border-blue-300 hover:shadow-card transition-all"
            onClick={() => onSelectArticle(article)}
          >
            <div className="space-y-4">
              {/* Category & Read Time */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200 font-semibold">
                  {article.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {article.readTime}
                </span>
              </div>

              {/* Status Badge */}
              <div>
                <span className="inline-block text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {article.status}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {article.subtitle}
                </p>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                {article.summary}
              </p>
            </div>

            {/* Read Button */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectArticle(article);
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors focus:outline-none"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Read Full Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Publication Quality Note */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-base font-bold text-slate-950">Primary Source Systems Engineering</div>
          <div className="text-xs sm:text-sm text-slate-600">
            All code snippets, mathematical derivations, and latency benchmarks represent verified production workloads.
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shrink-0 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Verified Benchmarks</span>
        </div>
      </div>
    </motion.div>
  );
};
