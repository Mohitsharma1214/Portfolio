import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, AlertTriangle, Layers, Cpu, Award } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { ProjectCaseStudy } from '../data/portfolioData';
import { ArchitectureDiagram } from './ArchitectureDiagram';

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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
              {project.category}
            </span>
            {project.isProprietary && (
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Production Client System
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8 max-h-[82vh] overflow-y-auto">
          {/* Title & Headline */}
          <div>
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
              {project.subtitle}
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
                  <div className="text-xs text-slate-500 font-mono">Key Result</div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">{metric}</div>
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
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 shadow-sm transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg px-3 py-1.5 shadow-sm transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Production Demo</span>
                </a>
              )}
              {project.id === 'driver-drowsiness-detection' && (
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Govt. of India Copyright Registered: SW-19841/2024</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-brand-700 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              1. Overview
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.overview}
            </p>
          </section>

          {/* Section 2: Problem */}
          <section className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-brand-700 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              2. Technical &amp; User Problem
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.problem}
            </p>
          </section>

          {/* Section 3: My Contribution */}
          <section className="space-y-3 bg-slate-50 border border-slate-200/90 rounded-xl p-5">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-800 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-600" />
              3. Individual Engineering Contribution
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.myContribution}
            </p>
          </section>

          {/* Section 4: Architecture */}
          <section className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-brand-700 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-600" />
              4. System Architecture
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.architectureDescription}
            </p>
            <ArchitectureDiagram projectId={project.id} />
          </section>

          {/* Section 5: Implementation */}
          <section className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-brand-700 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              5. Implementation Details
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {project.sections.implementation}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Section 6: Engineering Decisions & Trade-offs */}
          <section className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-brand-700 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              6. Engineering Decisions &amp; Architectural Trade-offs
            </h3>
            <div className="space-y-3">
              {project.sections.engineeringDecisions.map((decision, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg p-3.5 shadow-subtle">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{decision}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Challenges & Failure Modes */}
          <section className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-amber-700 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              7. Challenges &amp; Documented Failure Modes
            </h3>
            <div className="space-y-3">
              {project.sections.challengesAndFailureModes.map((challenge, idx) => (
                <div key={idx} className="bg-amber-50/60 border border-amber-200/70 rounded-lg p-3.5">
                  <p className="text-slate-800 text-sm leading-relaxed">{challenge}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Evaluation */}
          <section className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-700 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              8. Evaluation &amp; Verified Results
            </h3>
            <ul className="space-y-2">
              {project.sections.evaluation.map((evalItem, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>{evalItem}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 9: Lessons Learned */}
          <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-800 font-semibold">
              9. Concrete Engineering Lessons
            </h3>
            <ul className="space-y-2">
              {project.sections.lessonsLearned.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-brand-600 font-bold shrink-0">→</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 10: Links & Evidence */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 font-semibold">
              10. Source Code &amp; Verified Links
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository: {project.repoUrl.replace('https://github.com/', '')}</span>
                </a>
              ) : (
                <div className="text-xs text-slate-500 italic">
                  * Source code developed as proprietary system at company under non-disclosure terms; architecture and techniques generalized for technical review.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Mohit Sharma • AI Engineering Case Study
          </span>
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-md px-3 py-1.5 shadow-sm transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
