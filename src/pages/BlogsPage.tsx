import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Clock, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Search,
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';
import { TECHNICAL_ARTICLES } from '../data/portfolioData';

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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
};

export const BlogsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(TECHNICAL_ARTICLES.map((a) => a.category)));
    return ['All', ...cats];
  }, []);

  const filteredBlogs = useMemo(() => {
    return TECHNICAL_ARTICLES.filter((blog) => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesQuery = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

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
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Engineering Blogs &bull; Latency Benchmarks &bull; Production Systems</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Technical Blogs &amp; Case Studies
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              In-depth systems breakdowns, latency tradeoffs, and failure mode analyses derived directly from production and edge AI implementations.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 self-start md:self-auto shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-950">{TECHNICAL_ARTICLES.length} Published Blogs</div>
              <div className="text-xs text-slate-500 font-mono font-medium">Architecture Notes</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pt-2 border-t border-slate-200">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs or topics..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">No blogs match your search query</h2>
          <p className="text-xs text-slate-500">Try clearing your search query or selecting "All" categories.</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-semibold text-blue-600 hover:underline pt-2 inline-block"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBlogs.map((blog) => (
            <motion.article
              key={blog.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="modern-card bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between group shadow-xs hover:border-blue-300 hover:shadow-card transition-all"
            >
              {/* Card Header with Graphic Image */}
              <div className="space-y-4">
                <Link
                  to={`/blogs/${blog.id}`}
                  className="block relative overflow-hidden aspect-[16/9] bg-slate-100 border-b border-slate-100"
                  aria-label={`Read article: ${blog.title}`}
                >
                  <img
                    src={blog.coverImage || `/Portfolio/assets/blogs/${blog.id}.png`}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-slate-200/60">
                      {blog.category.split('•')[0].trim()}
                    </span>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="px-6 sm:px-7 space-y-3">
                  {/* Meta strip: Read time & Date */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{blog.readTime}</span>
                    </span>
                    {blog.publishDate && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{blog.publishDate}</span>
                      </span>
                    )}
                  </div>

                  {/* Blog Heading with Dedicated Unique Link */}
                  <h2>
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 block tracking-tight"
                    >
                      {blog.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="px-6 sm:px-7 pb-6 pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  {blog.status}
                </span>

                <Link
                  to={`/blogs/${blog.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {/* Primary Source Quality Verification Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-base font-bold text-slate-950">Primary Source Systems Engineering</div>
          <div className="text-xs sm:text-sm text-slate-600">
            All code snippets, mathematical formulations, and latency benchmarks represent verified production workloads.
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shrink-0 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Verified Production Telemetry</span>
        </div>
      </div>
    </motion.div>
  );
};
