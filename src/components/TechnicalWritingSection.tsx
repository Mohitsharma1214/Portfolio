import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { TECHNICAL_ARTICLES } from '../data/portfolioData';
import type { TechnicalArticle } from '../data/portfolioData';

interface TechnicalWritingSectionProps {
  onSelectArticle: (article: TechnicalArticle) => void;
}

export const TechnicalWritingSection: React.FC<TechnicalWritingSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="writing" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Engineering Breakdowns
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Technical Writing &amp; System Notes
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            In-depth architectural breakdowns, latency trade-offs, and failure mode analyses derived directly from production and edge implementations.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TECHNICAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 shadow-card hover:shadow-[0_0_35px_rgba(6,182,212,0.18)] transition-all flex flex-col justify-between backdrop-blur-md group"
            >
              <div className="space-y-4">
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-300 bg-slate-800/80 px-2 py-0.5 rounded border border-cyan-500/20">
                    {article.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {article.readTime}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="inline-block text-[11px] font-mono font-semibold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                  {article.status}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    {article.subtitle}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectArticle(article)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 group/btn transition-colors focus:outline-none"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Read Full Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
