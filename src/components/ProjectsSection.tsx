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
    <section id="projects" className="py-16 sm:py-24 border-t border-slate-200/90 bg-[#fafafb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700">
              Verified Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Engineering Projects &amp; Systems
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Production systems, edge-native computer vision, and grounded LLM architectures built and evaluated with strict performance benchmarks.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/70 rounded-xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 shadow-subtle'
                    : 'text-slate-600 hover:text-slate-900'
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
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 sm:p-7 space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {project.category}
                  </span>
                  {project.id === 'driver-drowsiness-detection' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <ShieldCheck className="w-3 h-3 text-amber-600" />
                      <span>Govt. Copyright</span>
                    </span>
                  )}
                  {project.isProprietary && (
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      Production System
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-normal">
                    {project.subtitle}
                  </p>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-2 text-xs sm:text-sm pt-1">
                  <div>
                    <span className="font-semibold text-slate-900">Problem: </span>
                    <span className="text-slate-600 leading-relaxed">{project.problemStatement}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Solution: </span>
                    <span className="text-slate-600 leading-relaxed">{project.solution}</span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center sm:text-left">
                      <div className="text-[10px] text-slate-500 font-mono">Result</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5 truncate">{metric}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-slate-50/70 border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-700 hover:text-brand-800 group/btn transition-colors focus:outline-none"
                >
                  <Layers className="w-4 h-4 text-brand-600" />
                  <span>Read 10-Part Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
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
                      className="p-1.5 rounded-lg text-brand-600 hover:text-brand-800 hover:bg-brand-50 transition-colors"
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
