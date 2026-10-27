import React, { useState, useEffect, useRef } from 'react';
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
  Layers,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle,
  Flame,
  Gauge
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

// Lightweight synthesized Web Audio sound FX (strictly client-side, zero assets needed)
class SoundSynth {
  private ctx: AudioContext | null = null;
  public enabled = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  public playTone(freq: number, type: OscillatorType = 'sine', duration = 0.05) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not supported or blocked
    }
  }
}

const synth = new SoundSynth();

// Capability radar metrics mapped to milestones
const CAPABILITY_SPECTRUM: Record<string, { latency: number; precision: number; reliability: number; scale: number }> = {
  'foundations-btech': { latency: 72, precision: 80, reliability: 85, scale: 65 },
  'edge-breakthrough-copyright': { latency: 98, precision: 92, reliability: 99, scale: 86 },
  'enterprise-nlp-centilytics': { latency: 89, precision: 91, reliability: 94, scale: 90 },
  'clinical-scale-hairscope': { latency: 99, precision: 96, reliability: 98, scale: 99 },
  'agents-recommendation-sodio': { latency: 95, precision: 94, reliability: 99, scale: 95 },
  'future-horizon-hiring': { latency: 100, precision: 98, reliability: 100, scale: 100 },
};

// Animated Number Counter Component
const AnimatedMetricCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // If the metric contains numbers, animate with a rapid digital roll
    const match = value.match(/\d+/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(match[0], 10);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index || 0) + match[0].length);

    let start = 0;
    const duration = 500;
    const startTime = performance.now();

    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(start + (targetNum - start) * eased);

      const formatted = targetNum > 999 
        ? current.toLocaleString() 
        : current.toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [value]);

  return <span className="tabular-nums font-mono">{displayValue}</span>;
};

export const InteractiveJourneyRoadmap: React.FC<InteractiveJourneyRoadmapProps> = ({ 
  onSelectProject,
  defaultRecruiterMode = false 
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(JOURNEY_MILESTONES[3].id);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [is60sMode, setIs60sMode] = useState<boolean>(defaultRecruiterMode);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);
  
  // High-Tech Animation State: Auto-Play Story Cinematic Mode
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(4500); // 4.5 seconds per chapter
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [storyProgress, setStoryProgress] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Interactive Mini-Simulator State
  const [clinicalVolume, setClinicalVolume] = useState<number>(5000); // Hairscope simulator
  const [edgeSimState, setEdgeSimState] = useState<'normal' | 'drowsy'>('normal'); // Edge IP simulator
  const [agentStep, setAgentStep] = useState<number>(1); // Sodio agent step simulator

  const activeMilestone = JOURNEY_MILESTONES.find((m) => m.id === selectedMilestoneId) || JOURNEY_MILESTONES[0];
  const currentIndex = JOURNEY_MILESTONES.findIndex((m) => m.id === selectedMilestoneId);
  const spectrum = CAPABILITY_SPECTRUM[activeMilestone.id] || { latency: 90, precision: 90, reliability: 90, scale: 90 };

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

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    synth.enabled = next;
    if (next) synth.playTone(600, 'sine', 0.08);
  };

  const selectMilestone = (id: string) => {
    setSelectedMilestoneId(id);
    setStoryProgress(0);
    synth.playTone(540, 'triangle', 0.06);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && currentIndex < JOURNEY_MILESTONES.length - 1) {
        selectMilestone(JOURNEY_MILESTONES[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        selectMilestone(JOURNEY_MILESTONES[currentIndex - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Auto-Play Story Engine
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setStoryProgress(0);
      return;
    }

    setStoryProgress(0);
    const updateFreq = 50;
    const progressStep = (updateFreq / playbackSpeed) * 100;

    progressIntervalRef.current = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + progressStep;
      });
    }, updateFreq);

    timerRef.current = setInterval(() => {
      setSelectedMilestoneId((currId) => {
        const idx = JOURNEY_MILESTONES.findIndex((m) => m.id === currId);
        const nextIdx = (idx + 1) % JOURNEY_MILESTONES.length;
        synth.playTone(660, 'sine', 0.08);
        return JOURNEY_MILESTONES[nextIdx].id;
      });
      setStoryProgress(0);
    }, playbackSpeed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, playbackSpeed]);

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
    synth.playTone(880, 'sine', 0.12);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2600);
  };

  const handleProofClick = (proof: NonNullable<JourneyMilestone['proofLinks']>[number]) => {
    synth.playTone(720, 'sine', 0.07);
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

  // Live calculations for Clinical Stress Test Simulator
  const simulatedBatchSize = Math.min(32, Math.max(8, Math.round(clinicalVolume / 220)));
  const simulatedP95Latency = Math.round(92 + (clinicalVolume / 10000) * 22); // between 94ms and 114ms, always <120ms SLA!
  const simulatedGpuLoad = Math.round(45 + (clinicalVolume / 10000) * 42); // 45% to 87%

  return (
    <div className="space-y-8">
      {/* Interactive Command Center Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
        {/* Animated background ambient glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 via-indigo-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
              <span>Interactive Candidate Journey &bull; Dynamic Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
              <span>Engineering Evolution &amp; Impact</span>
              <span className="hidden sm:inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              An interactive, animated milestone journey built for technical hiring teams: scrub milestones, run live SLA stress tests, or watch the automated cinematic walkthrough.
            </p>
          </div>

          {/* Right Controller: Auto-Play Cinematic Engine & Sound FX */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            {/* Auto-Play Toggle with Live Animated Progress Ring */}
            <button
              type="button"
              onClick={() => {
                const nextPlay = !isPlaying;
                setIsPlaying(nextPlay);
                synth.playTone(nextPlay ? 700 : 400, 'sine', 0.08);
              }}
              className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs overflow-hidden ${
                isPlaying
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white ring-2 ring-blue-400/40'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
              title={isPlaying ? "Pause cinematic walkthrough" : "Auto-play journey walkthrough"}
            >
              {/* Progress fill bar when playing */}
              {isPlaying && (
                <div 
                  className="absolute left-0 bottom-0 top-0 bg-white/20 transition-all pointer-events-none"
                  style={{ width: `${storyProgress}%` }}
                />
              )}
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-white" />
                  <span className="relative z-10">Auto-Playing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                  <span>Auto-Play Story</span>
                </>
              )}
            </button>

            {/* Auto-Play Speed Toggle (1x / 2x) */}
            <button
              type="button"
              onClick={() => {
                const nextSpeed = playbackSpeed === 4500 ? 2200 : 4500;
                setPlaybackSpeed(nextSpeed);
                synth.playTone(nextSpeed === 2200 ? 750 : 550, 'sine', 0.05);
              }}
              className="px-2.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
              title="Toggle auto-play chapter transition speed"
            >
              <span>{playbackSpeed === 2200 ? '2x' : '1x'}</span>
              <span className="text-[10px] text-slate-400">speed</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border text-xs font-medium transition-all shadow-2xs ${
                soundEnabled
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title={soundEnabled ? "Mute interactive audio feedback" : "Enable futuristic sound FX"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mode Switcher: 60s Fast Scan vs Interactive Timeline */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIs60sMode(false);
                  synth.playTone(550, 'sine', 0.05);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  !is60sMode
                    ? 'bg-white text-blue-600 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Roadmap</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIs60sMode(true);
                  synth.playTone(650, 'sine', 0.05);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  is60sMode
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>60s Fast Scan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips & Scrub Instructions */}
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
                      synth.playTone(500, 'sine', 0.05);
                      const matching = JOURNEY_MILESTONES.filter((m) => {
                        if (tab.id === 'all') return true;
                        if (tab.id === 'vision-edge') return m.category === 'edge-ip' || m.category === 'clinical-scale';
                        if (tab.id === 'agents-nlp') return m.category === 'nlp-systems' || m.category === 'agents-recommendation';
                        if (tab.id === 'scale') return m.category === 'clinical-scale';
                        if (tab.id === 'ip') return m.category === 'edge-ip';
                        return true;
                      });
                      if (matching.length > 0 && !matching.some((m) => m.id === selectedMilestoneId)) {
                        selectMilestone(matching[0].id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      activeFilter === tab.id
                        ? 'bg-blue-600 text-white font-semibold shadow-xs scale-102'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 hidden lg:flex items-center gap-2">
              <span>Interactive Controls:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[10px]">←</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[10px]">→</kbd>
              <span>or scrub nodes</span>
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
          <div className="bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl relative overflow-hidden border border-blue-900/50">
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
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md transition-all shadow-xs cursor-pointer"
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
                  <motion.div 
                    key={idx} 
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-2 hover:border-blue-400/50 transition-all"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-semibold bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                      {prop.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white pt-1">{prop.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{prop.description}</p>
                  </motion.div>
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
        /* VIEW B: Interactive Milestone Timeline & Animated Inspector */
        <div className="space-y-8">
          {/* Milestone Stepper Track with Glowing Active Trail */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs overflow-x-auto no-scrollbar relative">
            <div className="min-w-[700px] sm:min-w-0">
              <div className="relative flex items-center justify-between py-2">
                {/* Connecting Line Track */}
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 rounded-full -z-0" />
                <motion.div 
                  className="absolute left-8 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full shadow-xs -z-0"
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
                      onClick={() => selectMilestone(milestone.id)}
                      className={`relative z-10 flex flex-col items-center group focus:outline-none transition-all cursor-pointer ${
                        isMatchFilter ? 'opacity-100' : 'opacity-35 hover:opacity-75'
                      }`}
                    >
                      {/* Node Icon Badge with Pulsing Halo */}
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all relative ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/35 ring-4 ring-blue-100 scale-110'
                            : isPast
                            ? 'bg-slate-50 text-slate-800 border-2 border-blue-600 shadow-2xs group-hover:scale-105'
                            : 'bg-white text-slate-400 border-2 border-slate-200 group-hover:border-slate-400'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute -inset-1 rounded-2xl bg-blue-400/30 animate-pulse -z-10" />
                        )}
                        {getMilestoneIcon(milestone.iconName)}
                      </motion.div>

                      {/* Year & Badge Caption */}
                      <div className="mt-3 text-center">
                        <div
                          className={`text-xs font-mono font-bold transition-colors ${
                            isSelected ? 'text-blue-600 scale-105' : 'text-slate-800'
                          }`}
                        >
                          {milestone.year}
                        </div>
                        <div className="text-[11px] text-slate-500 max-w-[110px] truncate leading-tight mt-0.5 font-medium">
                          {milestone.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Milestone Deep Animated Inspector Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 320, damping: 26 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-9 space-y-8 relative overflow-hidden"
            >
              {/* Top ambient highlight gradient */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/5 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Milestone Header Strip */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono text-xs font-bold shadow-2xs">
                      {activeMilestone.badge}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {activeMilestone.period}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium">
                      {activeMilestone.location}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {activeMilestone.title}
                  </h3>
                  <div className="text-sm font-semibold text-blue-600 flex items-center gap-2">
                    <span>{activeMilestone.role}</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-slate-800 font-bold">{activeMilestone.organization}</span>
                  </div>
                </div>

                {/* Chapter Stepper Buttons */}
                <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => selectMilestone(JOURNEY_MILESTONES[currentIndex - 1].id)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                    aria-label="Previous milestone"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-500 px-2 font-medium">
                    {currentIndex + 1} of {JOURNEY_MILESTONES.length}
                  </span>
                  <button
                    type="button"
                    disabled={currentIndex === JOURNEY_MILESTONES.length - 1}
                    onClick={() => selectMilestone(JOURNEY_MILESTONES[currentIndex + 1].id)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                    aria-label="Next milestone"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Narrative Headline & Story */}
              <div className="space-y-3 relative z-10">
                <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  "{activeMilestone.headline}"
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {activeMilestone.story}
                </p>
              </div>

              {/* Quantifiable Outcomes Strip with Animated Roll-up Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 relative z-10">
                {activeMilestone.metrics.map((m, mIdx) => (
                  <motion.div 
                    key={mIdx}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/90 shadow-xs space-y-1"
                  >
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wide font-medium truncate">
                      {m.label}
                    </div>
                    <div className="text-2xl font-extrabold text-slate-950 tracking-tight text-gradient-accent">
                      <AnimatedMetricCounter value={m.value} />
                    </div>
                    {m.subtext && (
                      <div className="text-xs text-blue-700 font-medium truncate">
                        {m.subtext}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Live Interactive Systems Mini-Lab (Interactive Playground according to milestone!) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white shadow-md space-y-4 relative overflow-hidden border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                      Interactive Systems Testbed
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">
                    Live Simulator
                  </span>
                </div>

                {/* Scenario 1: Clinical Scale (Hairscope) Throughput Simulator */}
                {activeMilestone.id === 'clinical-scale-hairscope' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-xs text-slate-300">
                        Adjust Daily Image Load to stress-test GPU micro-batching &amp; latency SLA:
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-400 bg-slate-800/90 px-2.5 py-1 rounded border border-slate-700">
                        Stress Load: {clinicalVolume.toLocaleString()} Images/Day
                      </div>
                    </div>

                    <div className="space-y-1">
                      <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="500"
                        value={clinicalVolume}
                        onChange={(e) => {
                          setClinicalVolume(Number(e.target.value));
                          synth.playTone(450 + (Number(e.target.value) / 30), 'sine', 0.03);
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        aria-label="Clinical image load slider"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>1,000 imgs</span>
                        <span>5,000 imgs (Base SLA)</span>
                        <span>10,000 imgs (Peak Stress)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                        <div className="text-[10px] font-mono text-slate-400">Micro-Batch Size</div>
                        <div className="text-sm font-bold font-mono text-white mt-0.5">{simulatedBatchSize} Frames</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                        <div className="text-[10px] font-mono text-slate-400">P95 Inference</div>
                        <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{simulatedP95Latency}ms SLA</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                        <div className="text-[10px] font-mono text-slate-400">GPU Kernel Load</div>
                        <div className="text-sm font-bold font-mono text-indigo-300 mt-0.5">{simulatedGpuLoad}% Tensor</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                        <div className="text-[10px] font-mono text-slate-400">SLA Violation</div>
                        <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">0% (Zero Breach)</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scenario 2: Edge Hardware IP (Govt Copyright) EAR Testbed */}
                {activeMilestone.id === 'edge-breakthrough-copyright' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-xs text-slate-300">
                        Test offline Eye Aspect Ratio (EAR) mathematical trigger on Raspberry Pi:
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEdgeSimState('normal');
                            synth.playTone(520, 'sine', 0.05);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                            edgeSimState === 'normal'
                              ? 'bg-emerald-500 text-white font-bold'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          Attentive Driver
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEdgeSimState('drowsy');
                            synth.playTone(320, 'sawtooth', 0.12);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                            edgeSimState === 'drowsy'
                              ? 'bg-rose-500 text-white font-bold animate-pulse'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          Simulate Micro-Sleep
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                        <div className="text-[10px] font-mono text-slate-400">Current Ocular Ratio</div>
                        <div className={`text-base font-bold font-mono mt-0.5 ${edgeSimState === 'drowsy' ? 'text-rose-400' : 'text-emerald-400'}`}>
                          EAR: {edgeSimState === 'drowsy' ? '0.17' : '0.33'}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                        <div className="text-[10px] font-mono text-slate-400">Frame Cycle Efficiency</div>
                        <div className="text-base font-bold font-mono text-sky-400 mt-0.5">34ms (1-in-15 rule)</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                        <div className="text-[10px] font-mono text-slate-400">Alert Trigger Output</div>
                        <div className={`text-xs font-bold font-mono mt-1 ${edgeSimState === 'drowsy' ? 'text-rose-400' : 'text-slate-300'}`}>
                          {edgeSimState === 'drowsy' ? '⚠️ Multi-Thread Acoustic Alarm' : 'Nominal Ocular Geometry'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scenario 3: Agentic Workflows (Sodio) Step Sequencer */}
                {activeMilestone.id === 'agents-recommendation-sodio' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-300">
                        Step through autonomous agent execution stack with deterministic guardrails:
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAgentStep((prev) => (prev % 4) + 1);
                          synth.playTone(550 + agentStep * 60, 'sine', 0.05);
                        }}
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all shadow-xs"
                      >
                        Step Next Action ({agentStep}/4)
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { step: 1, label: '1. Ingest Task', desc: 'Goal definition parsing' },
                        { step: 2, label: '2. DOM Inspection', desc: 'State tree extraction' },
                        { step: 3, label: '3. Pydantic Guard', desc: 'Strict JSON contract' },
                        { step: 4, label: '4. Tool Calling', desc: 'Execution & verification' },
                      ].map((s) => (
                        <div 
                          key={s.step} 
                          className={`p-2.5 rounded-xl border transition-all ${
                            agentStep === s.step
                              ? 'bg-blue-900/60 border-blue-400 text-white shadow-sm ring-1 ring-blue-400/40'
                              : agentStep > s.step
                              ? 'bg-slate-800/90 border-slate-700 text-emerald-400'
                              : 'bg-slate-800/40 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="text-xs font-bold font-mono">{s.label}</div>
                          <div className="text-[10px] mt-0.5 truncate">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Default Simulator View for other milestones: Animated Capability Spectrum */}
                {activeMilestone.id !== 'clinical-scale-hairscope' && 
                 activeMilestone.id !== 'edge-breakthrough-copyright' && 
                 activeMilestone.id !== 'agents-recommendation-sodio' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Latency Optimization', val: spectrum.latency, icon: Zap },
                      { label: 'Model Precision', val: spectrum.precision, icon: Flame },
                      { label: 'Deterministic Guardrails', val: spectrum.reliability, icon: CheckCircle },
                      { label: 'Production Concurrency', val: spectrum.scale, icon: Gauge },
                    ].map((spec, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                          <span className="truncate">{spec.label}</span>
                          <span className="font-bold text-emerald-400">{spec.val}%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${spec.val}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Breakthroughs */}
              <div className="space-y-3 relative z-10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Key Technical Breakthroughs &amp; Architecture Decisions
                </h4>
                <div className="space-y-2.5">
                  {activeMilestone.engineeringBreakthroughs.map((bullet, bIdx) => (
                    <motion.div 
                      key={bIdx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: bIdx * 0.08 }}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed hover:border-blue-200 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recruiter Value Callout Box */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-white border border-blue-200/80 p-5 sm:p-6 space-y-3 shadow-2xs relative z-10">
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

              {/* Technologies Applied & Proof Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 relative z-10">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Core Technologies Applied:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeMilestone.stack.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200 hover:border-blue-300 transition-colors">
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
