import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { BlogService } from '../services/blogService';
import type { BlogFull, BlogMetadata } from '../services/blogService';
import { PERSONAL_INFO } from '../data/portfolioData';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextBlog, setNextBlog] = useState<BlogMetadata | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    BlogService.getBlogById(id).then((result) => {
      setBlog(result);
      setLoading(false);
      if (result) {
        document.title = `${result.title} | Mohit Sharma`;
      }
    });

    // Fetch next article recommendation
    BlogService.getPaginatedBlogs({ page: 1, pageSize: 6 }).then((res) => {
      const remaining = res.blogs.filter((b) => b.id !== id);
      if (remaining.length > 0) {
        setNextBlog(remaining[0]);
      }
    });
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper to format basic markdown (code blocks, headers, paragraphs, lists)
  const renderFormattedMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeLines: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Close block
          elements.push(
            <div key={`code-${index}`} className="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#0b1329] shadow-md font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-blue-400">{codeLanguage || 'code'}</span>
                <span>Production Snippet</span>
              </div>
              <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
                <code>{codeLines.join('\n')}</code>
              </pre>
            </div>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h2 key={`h3-${index}`} className="text-xl sm:text-2xl font-bold text-slate-950 mt-10 mb-4 tracking-tight">
            {line.replace('### ', '')}
          </h2>
        );
        return;
      }

      if (line.startsWith('#### ')) {
        elements.push(
          <h3 key={`h4-${index}`} className="text-lg font-bold text-slate-900 mt-6 mb-3 tracking-tight">
            {line.replace('#### ', '')}
          </h3>
        );
        return;
      }

      if (line.startsWith('| ') && line.endsWith(' |')) {
        elements.push(
          <div key={`table-row-${index}`} className="overflow-x-auto my-1 font-mono text-xs">
            <span className="text-slate-700">{line}</span>
          </div>
        );
        return;
      }

      if (line.startsWith('- ')) {
        elements.push(
          <li key={`li-${index}`} className="ml-5 list-disc text-sm sm:text-base text-slate-700 my-1 leading-relaxed">
            {line.replace('- ', '')}
          </li>
        );
        return;
      }

      if (line.trim().length > 0) {
        elements.push(
          <p key={`p-${index}`} className="text-sm sm:text-base text-slate-700 my-4 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/4" />
        <div className="aspect-[16/9] bg-slate-200 rounded-3xl w-full" />
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-100 rounded w-1/2" />
          <div className="h-32 bg-slate-100 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-950">Blog Post Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested article could not be located in the database. It may have been unpublished or moved.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs font-semibold bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Blogs</span>
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10"
    >
      {/* Navigation & Share Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Technical Blogs</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200 transition-all shadow-xs"
          title="Copy link to this blog post"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Share Link</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Cover Graphic */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-slate-200 bg-slate-100 shadow-xs">
        <img
          src={blog.coverImage || `/Portfolio/assets/blogs/${blog.id}.png`}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-lg shadow-xs border border-slate-200/80">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Blog Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
          <span className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md font-semibold border border-blue-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{blog.status}</span>
          </span>
          <span className="text-slate-300">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{blog.readTime}</span>
          </span>
          {blog.publishDate && (
            <>
              <span className="text-slate-300">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{blog.publishDate}</span>
              </span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
          {blog.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          {blog.subtitle}
        </p>

        {/* Author Byline */}
        <div className="flex items-center gap-3.5 pt-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            MS
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{PERSONAL_INFO.name}</div>
            <div className="text-[11px] font-mono text-slate-500">AI Engineer &bull; Production Systems</div>
          </div>
        </div>
      </header>

      {/* Main Formatted Markdown Content */}
      <div className="prose prose-slate max-w-none">
        {renderFormattedMarkdown(blog.contentMarkdown)}
      </div>

      {/* Quality Verification Footer */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Engineering Telemetry</span>
          </div>
          <p className="text-xs text-slate-600">
            This breakdown is derived from verified production systems and registered intellectual property.
          </p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs shrink-0"
        >
          <span>Explore Case Studies</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Next Article Recommendation */}
      {nextBlog && (
        <div className="border-t border-slate-200 pt-8 mt-12 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Next Architectural Breakdown
          </div>
          <Link
            to={`/blogs/${nextBlog.id}`}
            className="modern-card bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-blue-300 transition-all shadow-xs block"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-blue-600 font-semibold">{nextBlog.category}</span>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                {nextBlog.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">{nextBlog.subtitle}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform shrink-0">
              <span>Read Next</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      )}
    </motion.article>
  );
};
