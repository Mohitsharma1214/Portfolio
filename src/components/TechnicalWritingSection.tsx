import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { TECHNICAL_ARTICLES } from '../data/portfolioData';
import type { TechnicalArticle } from '../data/portfolioData';

interface TechnicalWritingSectionProps {
  onSelectArticle: (article: TechnicalArticle) => void;
}

export const TechnicalWritingSection: React.FC<TechnicalWritingSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="writing" className="py-16 sm:py-24 border-t border-slate-200/90 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700">
            Engineering Breakdowns
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Technical Writing &amp; System Notes
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            In-depth architectural breakdowns, latency trade-offs, and failure mode analyses derived directly from production and edge implementations.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TECHNICAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 rounded-2xl p-6 sm:p-7 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {article.category}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="inline-block text-[11px] font-mono font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {article.status}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    {article.subtitle}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-200/60">
                <button
                  onClick={() => onSelectArticle(article)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 hover:text-brand-600 group transition-colors focus:outline-none"
                >
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  <span>Read Full Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
