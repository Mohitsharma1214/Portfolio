import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Technical Competencies
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Skills &amp; Technology Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Verified technologies applied across production computer vision backends, edge devices, and agentic LLM systems. No arbitrary percentage bars.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-6 backdrop-blur-md shadow-card hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-normal">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 transition-colors shadow-sm"
                    >
                      {skill}
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
