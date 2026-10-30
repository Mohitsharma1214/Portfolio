import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, Clock } from 'lucide-react';
import type { RecommendedBlog } from '../services/recommendationService';
import { getAiBlogRecommendations, recordBlogRead } from '../services/recommendationService';

interface AiBlogRecommendationsProps {
  currentBlogId: string;
  currentBlogTitle: string;
  currentBlogCategory: string;
}

export const AiBlogRecommendations: React.FC<AiBlogRecommendationsProps> = ({
  currentBlogId,
  currentBlogTitle,
  currentBlogCategory,
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Record current read event in user's profile
    recordBlogRead({
      id: currentBlogId,
      title: currentBlogTitle,
      category: currentBlogCategory,
    });

    // Fetch AI recommendations
    setLoading(true);
    getAiBlogRecommendations(currentBlogId, 3).then((results) => {
      setRecommendations(results);
      setLoading(false);
    });
  }, [currentBlogId, currentBlogTitle, currentBlogCategory]);

  if (loading) {
    return (
      <div className="border-t border-slate-200 pt-10 mt-14 space-y-4 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-100 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="border-t border-slate-200/90 pt-12 mt-16 space-y-8"
    >
      {/* Header with AI Engine Badge */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700 shadow-xs">
            <Brain className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>AI Recommendation Engine &bull; Adaptive Vector Match</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Recommended Next Reads For You
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Recommended based on technical topic affinity, semantic relevance, and your reading journey.
          </p>
        </div>

        <Link
          to="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
        >
          <span>Browse All Articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Recommended Grid: 2 to 4 responsive cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="modern-card bg-white rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-card transition-all flex flex-col justify-between overflow-hidden group shadow-xs relative"
          >
            {/* Top Match Badge Over Cover Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
              <img
                src={rec.coverImage || `/assets/blogs/${rec.id}.png`}
                alt={rec.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Match Score Badge */}
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                <span>{rec.matchScore}% Match</span>
              </div>

              {/* Category Pill */}
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-blue-600/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md shadow-xs">
                  {rec.category}
                </span>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                {/* AI Rationale Tag */}
                <div className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
                  <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
                  <span className="truncate">{rec.matchReason}</span>
                </div>

                {/* Article Title */}
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-950 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                  <Link to={`/blogs/${rec.id}`}>{rec.title}</Link>
                </h3>

                {/* Subtitle / summary */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {rec.subtitle || rec.summary}
                </p>
              </div>

              {/* Card Footer Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{rec.readTime}</span>
                </div>

                <Link
                  to={`/blogs/${rec.id}`}
                  className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
