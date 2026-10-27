import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { PROJECTS } from '../data/portfolioData';
import type { ProjectCaseStudy } from '../data/portfolioData';
import { ProjectService, sortProjectsByRank } from '../services/projectService';
import { ProjectCoverImage } from '../components/ProjectCoverImage';

interface ProjectsPageProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<ProjectCaseStudy[]>(() => sortProjectsByRank(PROJECTS));
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    ProjectService.getAllProjects().then((res) => {
      if (res.projects && res.projects.length > 0) {
        setProjects(res.projects);
      }
    });
  }, []);

  const categories = ['All', 'Computer Vision & Edge', 'LLM & Agentic AI', 'Production Platforms'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12"
    >
      {/* Page Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
              <span>Production Systems &bull; Edge Hardware &bull; Grounded AI</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Projects &amp; Case Studies
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Production computer vision pipelines, edge deployments on ARM devices, and grounded LLM architectures evaluated with strict SLAs.
            </p>
          </div>

          {/* Filter Tabs with animated sliding pill */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-max md:w-auto shadow-xs">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors z-10"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="projectFilterPill"
                        className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200 -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span
                      className={
                        isActive
                          ? 'text-blue-600 font-bold'
                          : 'text-slate-600 hover:text-slate-950'
                      }
                    >
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Highlights Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-slate-200">
          <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold truncate">Edge Telematics</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate">100% Offline Autonomy</div>
          </div>
          <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold truncate">Throughput Scale</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate">5,000+ Imgs/Day</div>
          </div>
          <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold truncate">Instance Seg</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate">0.84 mAP Microscopic</div>
          </div>
          <a
            href="https://copyright.gov.in/Documents/ERegister/E-Register_December_2024.pdf#page=91"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl shadow-xs hover:border-amber-400 hover:shadow-sm transition-all group block"
            title="View official Govt. of India E-Register Gazette (Page 91)"
          >
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center justify-between">
              <span className="truncate">Govt. Copyright</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-600 transition-colors shrink-0" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-700 mt-1 font-mono truncate">SW-19841/2024</div>
          </a>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="modern-card bg-white rounded-3xl border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-card transition-all"
            >
              {/* Project Screenshot or High-Tech Placeholder */}
              <div className="p-4 sm:p-5 pb-0">
                <ProjectCoverImage
                  coverImage={project.coverImage}
                  title={project.title}
                  category={project.category}
                  metric={project.metrics?.[0]}
                />
              </div>

              <div className="p-6 sm:p-8 pt-4 space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                    {project.category}
                  </span>
                  {project.id === 'driver-drowsiness-detection' && (
                    <a
                      href="https://copyright.gov.in/Documents/ERegister/E-Register_December_2024.pdf#page=91"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-0.5 rounded border border-amber-200 font-medium transition-colors"
                      title="View official Govt. of India E-Register Gazette (Page 91)"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Govt. Copyright</span>
                      <ExternalLink className="w-2.5 h-2.5 text-amber-600" />
                    </a>
                  )}
                  {project.isProprietary && (
                    <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-medium">
                      Production System
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Technical Problem Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5 text-xs text-slate-700 leading-relaxed">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                    Technical Problem Statement
                  </span>
                  <p>{project.problemStatement}</p>
                </div>

                {/* Verified Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <div className="text-[10px] text-slate-500 font-mono">Benchmark</div>
                      <div className="text-xs font-bold text-slate-950 font-mono mt-0.5 truncate">{metric}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none"
                >
                  <Layers className="w-4 h-4" />
                  <span>Read 10-Part Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs transition-colors"
                      aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                      title={`View ${project.title} on GitHub`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                      aria-label={`View live demo for ${project.title} (opens in new tab)`}
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
