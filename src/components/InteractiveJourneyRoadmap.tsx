import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  Cpu, 
  Activity, 
  Bot, 
  Rocket, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Send,
  Zap,
  Layers
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { JOURNEY_MILESTONES, RECRUITER_VALUE_PROPOSITIONS } from '../data/journeyData';
import type { JourneyMilestone } from '../data/journeyData';
import { PROJECTS } from '../data/portfolioData';
import type { ProjectCaseStudy } from '../data/portfolioData';

interface InteractiveJourneyRoadmapProps {
  onSelectProject?: (project: ProjectCaseStudy) => void;
  defaultRecruiterMode?: boolean;
}

export const InteractiveJourneyRoadmap: React.FC<InteractiveJourneyRoadmapProps> = ({ 
  onSelectProject,
  defaultRecruiterMode = false 
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(JOURNEY_MILESTONES[3].id); // Defaults to Hairscope scale
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [is60sMode, setIs60sMode] = useState<boolean>(defaultRecruiterMode);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  const getMilestoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredMilestones = JOURNEY_MILESTONES.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'vision-edge') return m.category === 'edge-ip' || m.category === 'clinical-scale';
    if (activeFilter === 'agents-nlp') return m.category === 'nlp-systems' || m.category === 'agents-recommendation';
    if (activeFilter === 'scale') return m.category === 'clinical-scale';
    if (activeFilter === 'ip') return m.category === 'edge-ip';
    return true;
  });

  const activeMilestone = JOURNEY_MILESTONES.find((m) => m.id === selectedMilestoneId) || JOURNEY_MILESTONES[0];
  const currentIndex = JOURNEY_MILESTONES.findIndex((m) => m.id === selectedMilestoneId);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && currentIndex < JOURNEY_MILESTONES.length - 1) {
        setSelectedMilestoneId(JOURNEY_MILESTONES[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setSelectedMilestoneId(JOURNEY_MILESTONES[currentIndex - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleCopyPitch = () => {
    const pitchText = `Mohit Sharma — AI Engineer Candidate Summary:
• Proven Scale: Scaled clinical AI backend to 5,000+ images/day with <120ms P95 latency (Hairscope).
• Proprietary IP: Granted Govt. of India Copyright SW-19841/2024 for edge Raspberry Pi driver fatigue tracking.
• Production Optimization: Slashed GPU training runtimes by ~20% and reduced inference latency from 210ms to 98ms with TensorRT FP16.
• Agentic AI & RAG: Built autonomous QA testing agents and continuous Apple Health telematics pipelines (Sodio Tech).
• Availability: Immediate • Open to Remote Worldwide or On-Site Relocation.
• Portfolio & Proof: https://mohitsharma1214.github.io/
• Contact: mohitxsharma09@gmail.com`;

    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2600);
  };

  const handleProofClick = (proof: NonNullable<JourneyMilestone['proofLinks']>[number]) => {
    if (proof.projectId && onSelectProject) {
      const match = PROJECTS.find((p) => p.id === proof.projectId);
      if (match) {
        onSelectProject(match);
        return;
      }
    }
    if (proof.isExternal) {
      window.open(proof.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-8">
      {/* Control Header & Mode Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Candidate Journey &bull; Recruiter Focused</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Engineering Evolution &amp; Impact
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Trace how foundational computer science rigor evolved into registered Government IP, high-throughput clinical scale (&lt;120ms), and autonomous agent systems.
            </p>
          </div>

          {/* Mode Switcher: 60-Second Scan vs Interactive Timeline */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto shrink-0 shadow-2xs">
            <button
              type="button"
              onClick={() => setIs60sMode(false)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                !is60sMode
                  ? 'bg-white text-blue-600 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Timeline</span>
            </button>

            <button
              type="button"
              onClick={() => setIs60sMode(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                is60sMode
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>60s Recruiter Scan</span>
            </button>
          </div>
        </div>

        {/* Filters Strip (Active in Timeline Mode) */}
        {!is60sMode && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-2 px-2">
              <div className="flex items-center gap-1.5 w-max">
                {[
                  { id: 'all', label: 'All Milestones' },
                  { id: 'vision-edge', label: 'Computer Vision & Edge' },
                  { id: 'agents-nlp', label: 'Agents & NLP' },
                  { id: 'scale', label: 'Production Scale (<120ms)' },
                  { id: 'ip', label: 'Government IP' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(tab.id);
                      // If current milestone not in filter, jump to first in filter
                      const matching = JOURNEY_MILESTONES.filter((m) => {
                        if (tab.id === 'all') return true;
                        if (tab.id === 'vision-edge') return m.category === 'edge-ip' || m.category === 'clinical-scale';
                        if (tab.id === 'agents-nlp') return m.category === 'nlp-systems' || m.category === 'agents-recommendation';
                        if (tab.id === 'scale') return m.category === 'clinical-scale';
                        if (tab.id === 'ip') return m.category === 'edge-ip';
                        return true;
                      });
                      if (matching.length > 0 && !matching.some((m) => m.id === selectedMilestoneId)) {
                        setSelectedMilestoneId(matching[0].id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      activeFilter === tab.id
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 hidden lg:flex items-center gap-2">
              <span>Navigate:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[10px]">←</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[10px]">→</kbd>
              <span>or click milestone nodes</span>
            </div>
          </div>
        )}
      </div>

      {/* VIEW A: Recruiter 60-Second Scan Mode */}
      {is60sMode ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* Quick Pitch Banner & Copy Action */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-blue-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span>Executive Recruiter Briefing &bull; 60-Second Fast Track</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPitch}
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md transition-all shadow-xs"
                >
                  {copiedPitch ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">Candidate Pitch Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-200" />
                      <span>Copy Recruiter Pitch to Clipboard</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  High-Throughput Vision &bull; Edge Hardware IP &bull; Production LLM Guardrails
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  Mohit Sharma delivers battle-tested production AI engineering. With verified results processing <strong>5,000+ daily clinical images (&lt;120ms P95 SLA)</strong>, registered Government Intellectual Property (<strong>SW-19841/2024</strong>), and autonomous agent frameworks, he is ready to step into your engineering team with zero ramp-up time.
                </p>
              </div>

              {/* 4 Core Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {RECRUITER_VALUE_PROPOSITIONS.map((prop, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-semibold bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                      {prop.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white pt-1">{prop.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{prop.description}</p>
                  </div>
                ))}
              </div>

              {/* Recruiter Actions Strip */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Notice Period: <strong>Immediate</strong> &bull; Work: <strong>Remote Worldwide or Relocation</strong></span>
                </div>

                <div className="flex items-center gap-3">
                  <NavLink
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Schedule an Interview with Mohit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* VIEW B: Interactive Milestone Timeline & Inspector */
        <div className="space-y-8">
          {/* Milestone Stepper Track */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs overflow-x-auto no-scrollbar">
            <div className="min-w-[680px] sm:min-w-0">
              <div className="relative flex items-center justify-between">
                {/* Connecting Line Track */}
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-100 rounded-full -z-0" />
                <motion.div 
                  className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full -z-0"
                  style={{
                    width: `${(currentIndex / (JOURNEY_MILESTONES.length - 1)) * 88}%`,
                    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {JOURNEY_MILESTONES.map((milestone, idx) => {
                  const isSelected = milestone.id === selectedMilestoneId;
                  const isPast = idx <= currentIndex;
                  const isMatchFilter = filteredMilestones.some((m) => m.id === milestone.id);

                  return (
                    <button
                      key={milestone.id}
                      type="button"
                      onClick={() => setSelectedMilestoneId(milestone.id)}
                      className={`relative z-10 flex flex-col items-center group focus:outline-none transition-all ${
                        isMatchFilter ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                      }`}
                    >
                      {/* Node Icon Badge */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100 scale-110'
                            : isPast
                            ? 'bg-slate-100 text-slate-800 border-2 border-blue-600 group-hover:scale-105'
                            : 'bg-white text-slate-400 border-2 border-slate-200 group-hover:border-slate-400'
                        }`}
                      >
                        {getMilestoneIcon(milestone.iconName)}
                      </div>

                      {/* Year & Role Caption */}
                      <div className="mt-2.5 text-center">
                        <div
                          className={`text-xs font-mono font-bold transition-colors ${
                            isSelected ? 'text-blue-600' : 'text-slate-800'
                          }`}
                        >
                          {milestone.year}
                        </div>
                        <div className="text-[11px] text-slate-500 max-w-[100px] truncate leading-tight mt-0.5">
                          {milestone.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Milestone Deep Inspector Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 350, damping: 28 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-9 space-y-8"
            >
              {/* Milestone Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono text-xs font-bold">
                      {activeMilestone.badge}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {activeMilestone.period}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {activeMilestone.location}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {activeMilestone.title}
                  </h3>
                  <div className="text-sm font-semibold text-blue-600">
                    {activeMilestone.role} &bull; <span className="text-slate-700">{activeMilestone.organization}</span>
                  </div>
                </div>

                {/* Stepper Navigator Controls */}
                <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => setSelectedMilestoneId(JOURNEY_MILESTONES[currentIndex - 1].id)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs"
                    aria-label="Previous milestone"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-500 px-2">
                    {currentIndex + 1} of {JOURNEY_MILESTONES.length}
                  </span>
                  <button
                    type="button"
                    disabled={currentIndex === JOURNEY_MILESTONES.length - 1}
                    onClick={() => setSelectedMilestoneId(JOURNEY_MILESTONES[currentIndex + 1].id)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs"
                    aria-label="Next milestone"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Headline & Narrative Story */}
              <div className="space-y-3">
                <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  "{activeMilestone.headline}"
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {activeMilestone.story}
                </p>
              </div>

              {/* Quantifiable Outcomes Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeMilestone.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-1">
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wide font-medium truncate">
                      {m.label}
                    </div>
                    <div className="text-2xl font-extrabold text-slate-950 font-mono tracking-tight">
                      {m.value}
                    </div>
                    {m.subtext && (
                      <div className="text-xs text-blue-700 font-medium truncate">
                        {m.subtext}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Architectural Innovations & Breakthroughs */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Key Technical Breakthroughs &amp; Architecture Decisions
                </h4>
                <div className="space-y-2.5">
                  {activeMilestone.engineeringBreakthroughs.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiter Insight Box */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-white border border-blue-200/80 p-5 sm:p-6 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-900">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>💡 Why Recruiters &amp; Hiring Managers Value This Milestone</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {activeMilestone.recruiterValue.summary}
                </p>
                <div className="pt-2 border-t border-blue-200/60 flex flex-wrap gap-2 text-xs font-mono">
                  {activeMilestone.recruiterValue.competenciesProven.map((comp, cIdx) => (
                    <span key={cIdx} className="px-2.5 py-1 rounded-lg bg-white text-blue-900 border border-blue-200 font-semibold shadow-2xs">
                      ✓ {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stack & Verified Proof Links */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Core Technologies Applied:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeMilestone.stack.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {activeMilestone.proofLinks && (
                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    {activeMilestone.proofLinks.map((proof, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleProofClick(proof)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 px-3.5 py-2 rounded-xl border border-blue-200 transition-colors shadow-2xs cursor-pointer"
                      >
                        <span>{proof.label}</span>
                        {proof.isExternal ? (
                          <ExternalLink className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
