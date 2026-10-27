import React, { useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import type { TechnicalArticle } from '../data/portfolioData';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ArticleModalProps {
  article: TechnicalArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {article.category}
            </span>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {article.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close article modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 md:p-10 max-h-[82vh] overflow-y-auto space-y-6">
          <div>
            <span className="text-xs font-mono font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              {article.status}
            </span>
            <h1 id="article-title" className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-3">
              {article.title}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg mt-2 leading-relaxed">
              {article.subtitle}
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-500">
              <span>Author: Mohit Sharma</span>
              <span>&bull;</span>
              <span className="text-blue-600 font-medium">Engineering Systems Notes</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <MarkdownRenderer content={article.contentMarkdown} />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Mohit Sharma &bull; Systems Analysis
          </span>
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-1.5 shadow-xs transition-colors"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
