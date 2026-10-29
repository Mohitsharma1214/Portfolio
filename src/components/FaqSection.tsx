import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, Mail } from 'lucide-react';
import { FAQS } from '../data/portfolioData';
import type { FaqItem } from '../data/portfolioData';
import { PERSONAL_INFO } from '../data/portfolioData';

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>('faq-roles');

  const categories = ['All', 'Hiring & Roles', 'Computer Vision & Latency', 'Edge & Telematics', 'LLM & Guardrails'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="space-y-8 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-slate-200 pt-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Recruiter &amp; Engineering FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Direct answers on candidate availability, sub-120ms latency SLA engineering, edge ARM telematics, and LLM hallucination guardrails.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq: FaqItem) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-xs ${
                isOpen ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="space-y-1.5 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-transform duration-200 shrink-0 ${
                    isOpen
                      ? 'bg-blue-600 text-white border-blue-600 rotate-180'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      <p className="mt-3">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Quick Action Footer */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Have an architectural question or interview invitation?
            </div>
            <div className="text-xs text-slate-600">
              Drop a note using the form above or email directly at {PERSONAL_INFO.email}
            </div>
          </div>
        </div>

        <a
          href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent('[Engineering Inquiry] Direct Question for Mohit Sharma')}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email Directly</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
