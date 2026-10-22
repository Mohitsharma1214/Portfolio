import React from 'react';
import { GraduationCap, ShieldCheck, Cpu, Code2, Server } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Background &amp; Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Biography Column */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed">
            {PERSONAL_INFO.bioParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            {/* Core Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md transition-all group shadow-card">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform mb-3 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="font-semibold text-white text-sm">Real-Time Latency</div>
                <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Profiling P95/P99 latency bounds with ONNX &amp; TensorRT.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 backdrop-blur-md transition-all group shadow-card">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 group-hover:scale-105 transition-transform mb-3 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="font-semibold text-white text-sm">Grounded Agents</div>
                <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Suppressing hallucinations via strict thresholding &amp; schema checks.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 backdrop-blur-md transition-all group shadow-card">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform mb-3 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <Server className="w-5 h-5" />
                </div>
                <div className="font-semibold text-white text-sm">Production Scale</div>
                <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Serving 5,000+ daily images without memory leaks or CUDA OOMs.
                </div>
              </div>
            </div>
          </div>

          {/* Education & Credentials Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 space-y-6 backdrop-blur-md shadow-card">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>Verified Education</span>
              </div>

              <div className="space-y-4">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-800/80 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="font-semibold text-white text-sm">
                        {edu.degree}
                      </div>
                      <span className="text-xs font-mono text-slate-400 shrink-0 ml-2">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {edu.institution} • {edu.location}
                    </div>
                    {edu.grade && (
                      <div className="inline-block text-[11px] font-mono font-medium text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 mt-2">
                        {edu.grade}
                      </div>
                    )}
                    <div className="text-xs text-slate-400 mt-1.5 leading-normal">
                      {edu.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intellectual Property Badge */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 flex items-start gap-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.06)]">
              <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                  Intellectual Property
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Registered Software Copyright (Govt. of India)
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Registration Number: <strong className="font-mono text-amber-300 font-bold">{PERSONAL_INFO.copyrightId}</strong> for the Driver Drowsiness Detection System, affirming legal originality of the edge computer vision implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
