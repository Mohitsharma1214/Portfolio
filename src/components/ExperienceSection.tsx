import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Work History
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Verified engineering roles, responsibilities, and production outcomes. Scannable in under 30 seconds.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-3 sm:ml-4 space-y-10">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#080c14] border-2 border-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all"></div>

              {/* Experience Card */}
              <div className="bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 transition-all backdrop-blur-md shadow-card hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-base font-semibold text-cyan-400 flex items-center gap-2 mt-0.5">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 sm:text-right">
                    <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.location} • {exp.type}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mt-4 text-sm text-slate-300">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.6)]"></span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-5 mt-4 border-t border-slate-800/80">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300/90 border border-cyan-900/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
