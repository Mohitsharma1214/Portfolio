import React, { useState } from 'react';
import { ExternalLink, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PROJECTS } from '../data/portfolioData';
import type { ProjectCaseStudy } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Computer Vision & Edge', 'LLM & Agentic AI', 'Production Platforms'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Verified Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Engineering Projects &amp; Systems
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Production systems, edge-native computer vision, and grounded LLM architectures built and evaluated with strict performance benchmarks.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-900/70 hover:bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md shadow-card hover:shadow-[0_0_35px_rgba(6,182,212,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 sm:p-7 space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-slate-800/80 text-cyan-300 border border-cyan-500/20">
                    {project.category}
                  </span>
                  {project.id === 'driver-drowsiness-detection' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      <span>Govt. Copyright</span>
                    </span>
                  )}
                  {project.isProprietary && (
                    <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                      Production System
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-normal">
                    {project.subtitle}
                  </p>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-2 text-xs sm:text-sm pt-1">
                  <div>
                    <span className="font-semibold text-slate-200">Problem: </span>
                    <span className="text-slate-300 leading-relaxed">{project.problemStatement}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Solution: </span>
                    <span className="text-slate-300 leading-relaxed">{project.solution}</span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="bg-[#080d18] border border-slate-800/90 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 shadow-inner">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center sm:text-left">
                      <div className="text-[10px] text-slate-400 font-mono">Result</div>
                      <div className="text-xs font-bold text-cyan-300 font-mono mt-0.5 truncate">{metric}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-[#080d18]/90 border-t border-slate-800/90 px-6 py-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 group/btn transition-colors focus:outline-none"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Read 10-Part Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="View GitHub Repository"
                      aria-label={`View GitHub Repository for ${project.title}`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/60 transition-colors"
                      title="View Live Demo"
                      aria-label={`View Live Demo for ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
