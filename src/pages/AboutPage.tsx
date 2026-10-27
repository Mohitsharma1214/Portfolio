import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { GraduationCap, ShieldCheck, Cpu, Code2, Server, ArrowRight, CheckCircle2, Terminal, ExternalLink, FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { PERSONAL_INFO, EDUCATION } from '../data/portfolioData';

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
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
};

export const AboutPage: React.FC = () => {
  const quickFacts = [
    { label: "Core Focus", value: "Real-Time Vision & Edge ML" },
    { label: "Production SLA", value: "<120ms Latency @ 5k+ Imgs" },
    { label: "Software IP", value: "Govt. Copyright SW-19841/2024" },
    { label: "Academics", value: "B.Tech (AI & DS) & M.Tech (CS)" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
          <span>Background &bull; Credentials &bull; System Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
          About Mohit Sharma
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          AI Engineer specializing in the design, optimization, and real-world deployment of low-latency computer vision pipelines, edge ARM systems, and deterministic LLM architectures.
        </p>

        {/* Quick Facts Strip Covering Width */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-200">
          {quickFacts.map((fact, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-xs">
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wide truncate">{fact.label}</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate">{fact.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main 2-Column Wide Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Biography & Pillars */}
        <div className="lg:col-span-7 space-y-8">
          {/* Detailed Biography */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              <span>Engineering Journey &amp; Focus</span>
            </h2>
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {PERSONAL_INFO.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Core Engineering Pillars */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Three Technical Pillars
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-sm">Real-Time Latency</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Profiling P95/P99 latency bounds with ONNX Runtime &amp; TensorRT FP16 quantization.
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-sm">Grounded Agents</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Suppressing hallucinations via strict metadata locks, thresholding, and JSON schemas.
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                  <Server className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-sm">Production Scale</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Architecting async FastAPI gateways processing 5,000+ daily clinical vision requests.
                </div>
              </motion.div>
            </div>
          </div>

          {/* System Engineering Principles */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Production Engineering Standards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sub-150ms Edge Execution</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Edge telematics operate with 100% offline autonomy on ARM hardware without cloud dependencies.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Dynamic Micro-Batching</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Group single-image inferences across a 15ms window to lift GPU utilization from 32% to 84%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: IP Copyright, Education, & Technology Stack */}
        <div className="lg:col-span-5 space-y-6">
          {/* Government Copyright / IP Card */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs"
          >
            <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Government Intellectual Property</span>
            </div>
            <div className="font-mono text-xs text-amber-950 font-extrabold bg-white px-3 py-1.5 rounded-lg border border-amber-300 inline-block shadow-xs">
              Registration No: {PERSONAL_INFO.copyrightId}
            </div>
            <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed">
              Awarded software copyright by the Government of India Copyright Office for the mathematical formulation and architecture of the Driver Drowsiness Detection System, running fully offline on Raspberry Pi telematics hardware.
            </p>
            <div className="pt-3 border-t border-amber-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-800 font-mono">
                <span>Class: Computer Software</span>
                <span className="font-semibold">Registered: 2024</span>
              </div>
              <a
                href={PERSONAL_INFO.copyrightDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-semibold text-xs transition-all shadow-xs hover:shadow-sm"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>View Official E-Register Gazette (Page 91)</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </motion.div>

          {/* Education Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span>Academic Credentials</span>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className={idx > 0 ? "pt-4 space-y-1.5" : "space-y-1.5"}>
                  <div className="text-base font-bold text-slate-950">
                    {edu.degree}
                  </div>
                  <div className="text-sm font-semibold text-blue-600">
                    {edu.institution}
                  </div>
                  <div className="text-xs font-mono text-slate-500 pt-0.5">
                    {edu.location} &bull; {edu.period} &bull; {edu.mode}
                  </div>
                  {edu.grade && (
                    <div className="mt-2 inline-block bg-slate-100 text-slate-800 text-xs font-mono font-medium px-2.5 py-0.5 rounded border border-slate-200">
                      {edu.grade}
                    </div>
                  )}
                  {edu.notes && (
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {edu.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Location & Availability Badge */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Current Status
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles &bull; Immediate</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Based in Bhopal, India &bull; Open to Remote Worldwide or On-Site Relocation for senior AI / computer vision engineering positions.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-950">Ready to explore concrete architectures?</h3>
          <p className="text-xs sm:text-sm text-slate-600">Review 10-part case studies and verified benchmarks.</p>
        </div>
        <div className="flex items-center gap-3">
          <NavLink
            to="/projects"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs"
          >
            <span>View Projects &amp; Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
          <NavLink
            to="/experience"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-all shadow-xs"
          >
            <span>Career Timeline</span>
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};
