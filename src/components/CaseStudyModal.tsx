import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, AlertTriangle, Layers, Cpu, Award, Maximize2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { ProjectCaseStudy } from '../data/portfolioData';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { ProjectCoverImage } from './ProjectCoverImage';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-start justify-center p-2 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {project.category}
            </span>
            {project.isProprietary && (
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                Production System
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 max-h-[82vh] overflow-y-auto">
          {/* Title & Headline */}
          <div>
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
              {project.subtitle}
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-xs">
                  <div className="text-xs text-slate-500 font-mono">Key Result</div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">{metric}</div>
                </div>
              ))}
            </div>

            {/* Links Bar */}
            <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-slate-100">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg px-3 py-1.5 shadow-xs transition-colors hover:text-slate-950"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-700" />
                  <span>View Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-1.5 shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Production Demo</span>
                </a>
              )}
              {project.id === 'driver-drowsiness-detection' && (
                <a
                  href={project.docUrl || "https://copyright.gov.in/Documents/ERegister/E-Register_December_2024.pdf#page=91"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg px-3 py-1.5 font-mono transition-all shadow-2xs hover:shadow-xs group"
                  title="View official Govt. of India E-Register Gazette (Page 91)"
                >
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Govt. of India Copyright: SW-19841/2024</span>
                  <ExternalLink className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>

          {/* Project Screenshot / Visual Showcase */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="uppercase tracking-wider font-semibold text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Production Screenshot &amp; System Preview
              </span>
              {project.coverImage && (
                <a
                  href={project.coverImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline font-semibold"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Open Full Resolution</span>
                </a>
              )}
            </div>

            <div className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950">
              <ProjectCoverImage
                coverImage={project.coverImage}
                title={project.title}
                category={project.category}
                metric={project.metrics?.[0]}
                aspectRatio="aspect-[16/9] sm:aspect-[16/9]"
                className="w-full"
              />
              {project.coverImage && (
                <a
                  href={project.coverImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/20 shadow-md transition-all hover:scale-105"
                  title="Open full resolution screenshot in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Full Screenshot</span>
                </a>
              )}
            </div>
          </div>

          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              1. Overview
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.overview}
            </p>
          </section>

          {/* Section 2: Problem */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              2. Technical &amp; User Problem
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.problem}
            </p>
          </section>

          {/* Section 3: My Contribution */}
          <section className="space-y-3 bg-blue-50/60 border border-blue-100 rounded-xl p-5 shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-700 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              3. Individual Engineering Contribution
            </h3>
            <p className="text-slate-800 leading-relaxed text-sm sm:text-base">
              {project.sections.myContribution}
            </p>
          </section>

          {/* Section 4: Architecture */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              4. System Architecture
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.architectureDescription}
            </p>
            <ArchitectureDiagram projectId={project.id} />
          </section>

          {/* Section 5: Implementation */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              5. Implementation Details
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.implementation}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Section 6: Engineering Decisions & Trade-offs */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              6. Engineering Decisions &amp; Architectural Trade-offs
            </h3>
            <div className="space-y-3">
              {project.sections.engineeringDecisions.map((decision, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{decision}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Challenges & Failure Modes */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              7. Challenges &amp; Documented Failure Modes
            </h3>
            <div className="space-y-3">
              {project.sections.challengesAndFailureModes.map((challenge, idx) => (
                <div key={idx} className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
                  <p className="text-amber-900 text-sm leading-relaxed">{challenge}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Evaluation */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              8. Evaluation &amp; Verified Results
            </h3>
            <ul className="space-y-2">
              {project.sections.evaluation.map((evalItem, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                  <span>{evalItem}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 9: Lessons Learned */}
          <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold">
              9. Concrete Engineering Lessons
            </h3>
            <ul className="space-y-2">
              {project.sections.lessonsLearned.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-blue-600 font-bold shrink-0">&rarr;</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 10: Links & Evidence */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              10. Source Code &amp; Verified Links
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <GithubIcon className="w-4 h-4 text-slate-700" />
                  <span>GitHub: {project.repoUrl.replace('https://github.com/', '')}</span>
                </a>
              ) : (
                <div className="text-xs text-slate-500 italic">
                  * Source code developed as proprietary system under non-disclosure terms; architecture and techniques generalized for technical review.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Mohit Sharma &bull; Case Study Deep Dive
          </span>
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-1.5 shadow-xs transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
