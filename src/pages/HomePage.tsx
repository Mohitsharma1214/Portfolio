import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  Mail, 
  CheckCircle2, 
  Activity,
  Sparkles,
  Compass,
  FileText
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { PERSONAL_INFO, PROJECTS, TECHNICAL_ARTICLES } from '../data/portfolioData';
import { InteractivePipelineExplorer } from '../components/InteractivePipelineExplorer';
import type { ProjectCaseStudy } from '../data/portfolioData';
import { ProjectService, sortProjectsByRank } from '../services/projectService';
import { BlogService } from '../services/blogService';
import type { BlogMetadata } from '../services/blogService';
import { ProjectCoverImage } from '../components/ProjectCoverImage';
import { RecruiterSnapshotCard } from '../components/RecruiterSnapshotCard';
import { useResumeModal } from '../context/ResumeModalContext';

interface HomePageProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

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
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 },
  },
};

export const HomePage: React.FC<HomePageProps> = ({ onSelectProject }) => {
  const { openResumeModal } = useResumeModal();
  const [allProjects, setAllProjects] = useState<ProjectCaseStudy[]>(() => sortProjectsByRank(PROJECTS));
  const [latestArticle, setLatestArticle] = useState<BlogMetadata | null>(() => (TECHNICAL_ARTICLES[0] as unknown as BlogMetadata) || null);
  const [blogCount, setBlogCount] = useState<number>(8);

  useEffect(() => {
    ProjectService.getAllProjects().then((res) => {
      if (res.projects && res.projects.length > 0) {
        setAllProjects(res.projects);
      }
    });

    BlogService.getPaginatedBlogs({ page: 1, pageSize: 1 }).then((res) => {
      if (res.blogs && res.blogs.length > 0) {
        setLatestArticle(res.blogs[0]);
        setBlogCount(res.totalCount);
      }
    });
  }, []);

  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 2);

  const tickerItems = [
    { label: "Throughput", val: "5,000+ Clinical Imgs/Day" },
    { label: "Latency", val: "<120ms P95 SLA" },
    { label: "Copyright", val: "Govt. of India SW-19841/2024" },
    { label: "Segmentation", val: "0.84 mAP Microscopic" },
    { label: "Optimization", val: "TensorRT & ONNX FP16" },
    { label: "Edge Autonomy", val: "100% Offline Raspberry Pi" },
    { label: "LLM Guardrails", val: "Deterministic Refusal Gates" },
  ];

  const duplicatedItems = [
    ...tickerItems,
    ...tickerItems,
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-medium text-slate-800">
                  AI Developer @ Sodio Technologies
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                  Open to AI Roles
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="font-display text-[1.9rem] leading-[1.14] sm:text-4xl md:text-5xl lg:text-[3.15rem] font-black text-slate-950 tracking-tight sm:leading-[1.08] uppercase">
                  Engineering real-time <span className="text-gradient-accent">computer vision</span> &amp; production AI systems.
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Hi, I'm <strong className="text-slate-950 font-semibold">{PERSONAL_INFO.name}</strong>. I design low-latency computer vision backends and deterministic LLM pipelines. Scaled clinical dermatology inference to <strong className="text-slate-950 font-semibold">5,000+ images/day (&lt;120ms)</strong> and authored Government of India Copyright <strong className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{PERSONAL_INFO.copyrightId}</strong> for edge driver monitoring on Raspberry Pi.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <NavLink
                    to="/projects"
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-xs"
                  >
                    <span>Explore Case Studies</span>
                    <ArrowRight className="w-4 h-4" />
                  </NavLink>
                </motion.div>

                {/* 1-Click View / Download Resume */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openResumeModal}
                  type="button"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-950 active:bg-black text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                  title="View and download verified resume PDF"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>View / Download CV</span>
                </motion.button>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium text-sm px-4 py-2.5 rounded-xl border border-slate-200 transition-all shadow-xs"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-700" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium text-sm px-4 py-2.5 rounded-xl border border-slate-200 transition-all shadow-xs"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#0ea5e9]" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </motion.a>
                </div>

                <NavLink
                  to="/about"
                  className="w-full sm:w-auto justify-center sm:justify-start inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-950 font-medium text-sm px-3 py-2 transition-colors"
                >
                  <span>About My Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NavLink>
              </div>

              {/* Core Stacks Badge Pill Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Stack:</span>
                {["PyTorch", "FastAPI", "OpenCV", "TensorRT", "CUDA", "ChromaDB", "Docker"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-slate-100/90 text-slate-700 border border-slate-200 font-medium hover:border-blue-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Explorer */}
            <div className="lg:col-span-5">
              <InteractivePipelineExplorer />
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Telemetry & SLA Auto-Moving Infinite Ticker Strip */}
      <section className="border-y border-slate-200 bg-white/85 backdrop-blur-md py-3.5 overflow-hidden shadow-xs relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-6">
          {/* Pinned Stationary Label */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 shrink-0 pr-3 sm:pr-6 border-r border-slate-200 z-10 bg-white/95">
            <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="hidden sm:inline">Verified Telemetry:</span>
            <span className="sm:hidden text-[11px]">Telemetry:</span>
          </div>

          {/* Continuous Auto-Scrolling Track (No scrollbar, smooth 60fps infinite loop, pauses on hover) */}
          <div className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
            <div className="animate-marquee gap-8 whitespace-nowrap">
              {duplicatedItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono shrink-0">
                  <span className="text-slate-400 font-medium uppercase text-[10px]">{item.label}:</span>
                  <span className="text-slate-900 font-bold bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
                    {item.val}
                  </span>
                  <span className="text-slate-300 pl-4">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter & Hiring Manager Fast-Intelligence Card */}
      <RecruiterSnapshotCard />

      {/* Production Verified Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
              Measurable Outcomes
            </div>
            <span className="text-xs font-mono text-slate-500">Zero Vanity Metrics</span>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          >
            {PERSONAL_INFO.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl shadow-xs hover:border-blue-300 hover:shadow-card transition-all"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-[11px] sm:text-xs font-mono text-slate-600 mt-1 uppercase tracking-wide font-medium">
                  {metric.label}
                </div>
                <div className="text-[11px] sm:text-xs text-blue-600 font-semibold mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{metric.subtext}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Engineering Methodology: How I Deliver Production AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
                End-to-End System Discipline
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-1">
                How I Architect Production AI Pipelines
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Bridging deep learning research with high-concurrency systems engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Profiling &amp; Model Optimization</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Before writing service wrappers, models undergo graph fusion, constant folding, and FP16/INT8 calibration via ONNX Runtime &amp; TensorRT to maximize GPU kernel efficiency.
              </p>
              <div className="text-[11px] font-mono text-blue-700 font-medium pt-1">
                Outcome: ~20% GPU training boost &bull; 84ms inference
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Deterministic Guardrails &amp; SLAs</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                LLMs and agentic pipelines are strictly bounded with Pydantic JSON schemas, sliding window thresholding, and cosine similarity refusal barriers to eliminate hallucinations.
              </p>
              <div className="text-[11px] font-mono text-indigo-700 font-medium pt-1">
                Outcome: 100% schema enforcement &bull; Zero prompt leak
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Scalable Microservices &amp; Edge</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Deploying asynchronous FastAPI workers with micro-batching queues on cloud infrastructure, alongside zero-cloud offline telematics optimized for constrained ARM edge hardware.
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-medium pt-1">
                Outcome: 5,000+ images/day &bull; Govt Copyright SW-19841/2024
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recruiter-Focused Interactive Engineering Journey Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-mono">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                <span>Interactive Career Journey</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                From First Code to 5,000+ Daily Clinical Inferences &amp; Registered Silicon IP
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore an interactive milestone roadmap engineered for recruiters and engineering leaders: drill into zero-cloud edge optimization breakthroughs, clinical micro-batching architectures, and verified production outcomes.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono text-blue-200">
                <span className="bg-white/10 px-2.5 py-0.5 rounded border border-white/10">2021: B.Tech (AI &amp; DS)</span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded border border-white/10">2024: Govt. Copyright SW-19841/2024</span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded border border-white/10">2025: 5k+ Imgs/Day (&lt;120ms SLA)</span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded border border-white/10">2026: Autonomous Agents</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <NavLink
                to="/about#journey"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-500/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Interactive Journey</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
              Flagship Work
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-1">
              Featured Case Studies
            </h2>
          </div>
          <NavLink
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="modern-card rounded-2xl overflow-hidden flex flex-col justify-between bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-card transition-all"
            >
              <div className="p-4 sm:p-5 pb-0">
                <ProjectCoverImage
                  coverImage={project.coverImage}
                  title={project.title}
                  category={project.category}
                  metric={project.metrics?.[0]}
                />
              </div>

              <div className="p-6 sm:p-8 pt-4 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                    {project.category}
                  </span>
                  {project.id === 'driver-drowsiness-detection' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Govt. Copyright</span>
                    </span>
                  )}
                  {project.isProprietary && (
                    <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-medium">
                      Production System
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-normal">
                    {project.subtitle}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Problem &amp; Edge Constraint:
                  </span>
                  <p>{project.problemStatement}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <div className="text-[10px] text-slate-500 font-mono">Benchmark</div>
                      <div className="text-xs font-bold text-slate-950 font-mono mt-0.5 truncate">{metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none"
                >
                  <Layers className="w-4 h-4" />
                  <span>Read 10-Part Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                    aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                    title={`View ${project.title} on GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      </section>

      {/* Latest Technical Blog Section */}
      {latestArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center flex-1">
              {latestArticle.coverImage && (
                <NavLink
                  to={`/blogs/${latestArticle.id}`}
                  className="w-full sm:w-44 aspect-video rounded-xl overflow-hidden shrink-0 border border-slate-200 block group"
                >
                  <img
                    src={latestArticle.coverImage}
                    alt={latestArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </NavLink>
              )}
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
                    Featured Technical Blog
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-mono text-slate-500">{latestArticle.readTime}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-mono text-slate-500">{latestArticle.publishDate}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                  <NavLink
                    to={`/blogs/${latestArticle.id}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {latestArticle.title}
                  </NavLink>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {latestArticle.summary}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              <NavLink
                to={`/blogs/${latestArticle.id}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-xs"
              >
                <span>Read Blog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
              <NavLink
                to="/blogs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>All Blogs ({blogCount || 8})</span>
              </NavLink>
            </div>
          </motion.div>
        </section>
      )}

      {/* Bottom CTA to Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-100 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xs"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-mono font-medium text-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Open to AI Engineering Roles &bull; Immediate Availability</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Interested in building high-throughput AI pipelines?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            I'm open to discussing full-time engineering roles, high-concurrency computer vision backends, edge telematics deployments, and deterministic agent workflows.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Mohit Sharma</span>
            </NavLink>
            <NavLink
              to="/about"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm px-5 py-3 rounded-xl border border-slate-200 transition-all shadow-xs"
            >
              <span>Read Bio &amp; Credentials</span>
            </NavLink>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
