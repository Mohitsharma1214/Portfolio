import React from 'react';
import { GraduationCap, ShieldCheck, Cpu, Code2, Server } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 border-t border-slate-200/90 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700">
            Background &amp; Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Biography Column */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
            {PERSONAL_INFO.bioParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            {/* Core Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <Cpu className="w-5 h-5 text-brand-600 mb-2" />
                <div className="font-semibold text-slate-900 text-sm">Real-Time Latency</div>
                <div className="text-xs text-slate-500 mt-1">
                  Profiling P95/P99 latency bounds with ONNX &amp; TensorRT.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <Code2 className="w-5 h-5 text-indigo-600 mb-2" />
                <div className="font-semibold text-slate-900 text-sm">Grounded Agents</div>
                <div className="text-xs text-slate-500 mt-1">
                  Suppressing hallucinations via strict thresholding &amp; schema checks.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <Server className="w-5 h-5 text-emerald-600 mb-2" />
                <div className="font-semibold text-slate-900 text-sm">Production Scale</div>
                <div className="text-xs text-slate-500 mt-1">
                  Serving 5,000+ daily images without memory leaks or CUDA OOMs.
                </div>
              </div>
            </div>
          </div>

          {/* Education & Credentials Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-800">
                <GraduationCap className="w-4 h-4 text-brand-600" />
                <span>Verified Education</span>
              </div>

              <div className="space-y-4">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-200 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="font-semibold text-slate-900 text-sm">
                        {edu.degree}
                      </div>
                      <span className="text-xs font-mono text-slate-500 shrink-0 ml-2">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {edu.institution} • {edu.location}
                    </div>
                    {edu.grade && (
                      <div className="inline-block text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-2">
                        {edu.grade}
                      </div>
                    )}
                    <div className="text-xs text-slate-500 mt-1.5 leading-normal">
                      {edu.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intellectual Property Badge */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-800">
                  Intellectual Property
                </div>
                <div className="text-sm font-semibold text-slate-900 mt-1">
                  Registered Software Copyright (Govt. of India)
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Registration Number: <strong className="font-mono text-slate-900 font-bold">{PERSONAL_INFO.copyrightId}</strong> for the Driver Drowsiness Detection System, affirming legal originality of the edge computer vision implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
