import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Clock, 
  ArrowRight, 
  FileText, 
  Search,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Mail,
  Loader2
} from 'lucide-react';
import { BlogService } from '../services/blogService';
import type { BlogMetadata } from '../services/blogService';
import { HorizontalScrollContainer } from '../components/HorizontalScrollContainer';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
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
  const [blogs, setBlogs] = useState<BlogMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const pageSize = 6;

  // Debounce search input to avoid spamming database queries
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on search change
    }, 280);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load categories
  useEffect(() => {
    BlogService.getCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  // Fetch blogs from database whenever page, category, or search changes
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await BlogService.getPaginatedBlogs({
        page: currentPage,
        pageSize,
        category: selectedCategory,
        searchQuery: debouncedSearch,
      });
      setBlogs(res.blogs);
      setTotalPages(res.totalPages);
      setTotalCount(res.totalCount);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, debouncedSearch]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 120, behavior: 'smooth' });
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Technical Blogs &amp; Systems Notes
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              In-depth systems breakdowns, latency tradeoffs, and failure mode analyses queried dynamically on demand with pagination.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 self-start md:self-auto shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-950">
                {totalCount} Total Articles
              </div>
              <div className="text-xs text-slate-500 font-mono font-medium">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center pt-3 border-t border-slate-200">
          {/* Category Pills with Desktop Wheel, Chevrons & Drag */}
          <div className="flex-1 min-w-0">
            <HorizontalScrollContainer>
              <div className="flex items-center gap-1.5 w-max py-0.5 px-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={(e) => {
                      handleCategoryChange(cat);
                      e.currentTarget.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block: 'nearest',
                      });
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white font-semibold shadow-xs ring-2 ring-blue-600/20'
                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </HorizontalScrollContainer>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs dynamically..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 shadow-xs"
            />
            {loading && (
              <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={`skeleton-${i}`}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs animate-pulse p-0 space-y-4"
            >
              <div className="aspect-[16/9] bg-slate-200/80 w-full" />
              <div className="p-6 space-y-3">
                <div className="h-3 bg-slate-200 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded w-4/5" />
                <div className="h-3 bg-slate-100 rounded w-full" />
                <div className="h-3 bg-slate-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">No blogs match your search query</h2>
          <p className="text-xs text-slate-500">Try clearing your search query or selecting a different category.</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-semibold text-blue-600 hover:underline pt-2 inline-block"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Blog Cards Grid */
        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${currentPage}-${selectedCategory}-${debouncedSearch}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog) => (
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
                      src={blog.coverImage || `/assets/blogs/${blog.id}.png`}
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
        </AnimatePresence>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <div className="text-xs font-mono text-slate-500">
            Showing <span className="font-semibold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-slate-900">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
            <span className="font-semibold text-slate-900">{totalCount}</span> articles
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1 || loading}
              onClick={() => handlePageChange(currentPage - 1)}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={`page-btn-${p}`}
                  type="button"
                  onClick={() => handlePageChange(p)}
                  className={`w-9 h-9 rounded-xl text-xs font-mono font-semibold transition-all ${
                    currentPage === p
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentPage >= totalPages || loading}
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Reader Call-to-Action Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1.5 text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-mono font-semibold">
            <Mail className="w-3 h-3 text-blue-400" />
            <span>Have Questions or Project Ideas?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Interested in discussing Computer Vision, Edge AI, or Hiring?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            I'm always open to discussing low-latency model optimizations, systems architectures, and technical engineering roles. Let's connect!
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-600/30 cursor-pointer"
          >
            <span>Get in Touch with Mohit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
