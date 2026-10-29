import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import type { TestimonialItem } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Clinical AI', 'Production Engineering', 'Edge Telematics', 'Enterprise Client'];

  const filteredTestimonials = activeFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.endorsementType === activeFilter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
              <Quote className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Engineering Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Peer &amp; Leadership Testimonials
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Endorsements from engineering directors, clinical founders, and research co-authors anchored to verified production deliverables and hardware latency benchmarks.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredTestimonials.map((item: TestimonialItem, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="modern-card bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-card transition-all relative group overflow-hidden"
            >
              {/* Background Quote Mark */}
              <div className="absolute top-4 right-6 text-slate-100 group-hover:text-blue-50/70 transition-colors pointer-events-none select-none">
                <Quote className="w-20 h-20 -rotate-12" />
              </div>

              <div className="space-y-5 relative z-10">
                {/* Header Metadata Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>{item.endorsementType}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.metricBadge}</span>
                  </span>
                </div>

                {/* Quote Body */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                  "{item.quote}"
                </p>

                {/* Project Context tag */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                    Verified Production Engagement
                  </div>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">
                    {item.projectContext}
                  </div>
                </div>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0 tracking-wider">
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                      <span>{item.author}</span>
                      <span title="Verified Collaborator">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {item.role} &bull; {item.company}
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
