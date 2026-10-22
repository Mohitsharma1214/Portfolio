import React, { useEffect } from 'react';
import { X, Clock, BookOpen } from 'lucide-react';
import type { TechnicalArticle } from '../data/portfolioData';

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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {article.category}
            </span>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close article modal"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 md:p-10 max-h-[82vh] overflow-y-auto space-y-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              {article.status}
            </span>
            <h1 id="article-title" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
              {article.title}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg mt-2 leading-relaxed">
              {article.subtitle}
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-500">
              <span>Author: Mohit Sharma</span>
              <span>•</span>
              <span>Engineering Systems Notes</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <div className="prose prose-slate max-w-none space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {article.contentMarkdown.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('```')) {
                  const lines = paragraph.split('\n');
                  const code = lines.slice(1, -1).join('\n');
                  return (
                    <div key={index} className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200 shadow-inner">
                      <div className="bg-slate-900 px-4 py-1.5 text-xs font-mono text-slate-400 border-b border-slate-800 flex items-center justify-between">
                        <span>Python Source Excerpt</span>
                        <span className="text-[10px] text-brand-400">Production snippet</span>
                      </div>
                      <pre className="p-4 font-mono text-xs overflow-x-auto leading-relaxed">
                        <code>{code}</code>
                      </pre>
                    </div>
                  );
                }
                if (paragraph.startsWith('$$')) {
                  return (
                    <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-sm text-center text-slate-800 my-3">
                      {paragraph.replace(/\$\$/g, '')}
                    </div>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="space-y-1.5 list-disc pl-5 my-2">
                      {items.map((item, i) => (
                        <li key={i} className="text-slate-700">
                          {item.replace(/^- /, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-slate-700">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Reference by Mohit Sharma</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-md px-3 py-1.5 shadow-sm transition-colors"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
