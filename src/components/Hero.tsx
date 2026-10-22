import { ArrowDown, Mail, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-50/50 via-slate-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-subtle mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-medium text-slate-700">
            Open to AI Engineering Roles &amp; High-Impact Work
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Bhopal, India • Remote Ready
          </span>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-700 mb-2">
            <Terminal className="w-4 h-4 text-brand-600" />
            <span>AI Engineer • Systems &amp; Vision</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Engineering low-latency computer vision &amp; production AI pipelines.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl">
            Hi, I'm <span className="text-slate-950 font-semibold">{PERSONAL_INFO.name}</span>. I build production-grade AI systems with a focus on real-time inference, model alignment (RLHF), and edge computer vision. Delivered production architectures processing <strong className="text-slate-900 font-semibold">5,000+ images/day</strong> with <strong className="text-slate-900 font-semibold">&lt;120ms latency</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm sm:text-base px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <span>View Technical Projects</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm sm:text-base px-4 py-2.5 rounded-xl border border-slate-300 shadow-subtle hover:border-slate-400 transition-all"
          >
            <GithubIcon className="w-4 h-4 text-slate-700" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm sm:text-base px-4 py-2.5 rounded-xl border border-slate-300 shadow-subtle hover:border-slate-400 transition-all"
          >
            <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm sm:text-base px-4 py-2.5 rounded-xl transition-all"
          >
            <Mail className="w-4 h-4 text-slate-600" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 sm:mt-16 pt-8 border-t border-slate-200/90">
          {PERSONAL_INFO.metrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-subtle hover:border-slate-300 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                {item.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {item.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Copyright & Edge AI Notice */}
        <div className="flex items-center gap-2.5 mt-6 px-4 py-2.5 rounded-lg bg-slate-100/70 border border-slate-200/70 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
          <span>
            Registered Software Copyright with the Government of India (<strong className="font-mono text-slate-800">{PERSONAL_INFO.copyrightId}</strong>) for Edge-based Driver Drowsiness Detection System.
          </span>
        </div>
      </div>
    </section>
  );
};
