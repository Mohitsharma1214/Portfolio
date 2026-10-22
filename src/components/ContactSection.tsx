import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-slate-200/90 bg-[#fafafb]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card text-center space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-mono font-medium text-brand-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Let's Build Reliable Systems</span>
          </div>

          {/* Heading & Subtitle */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-xl mx-auto leading-relaxed">
              I'm actively interested in conversations with AI startup founders, CTOs, and engineering leaders building latency-critical computer vision, edge systems, or grounded LLM agents.
            </p>
          </div>

          {/* Direct Email Action Box */}
          <div className="pt-2 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-3 px-2 text-slate-800 font-mono text-sm sm:text-base font-medium truncate w-full sm:w-auto">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl px-3 py-2 shadow-sm transition-all focus:outline-none"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-4 py-2 shadow-sm transition-all"
                >
                  <span>Send Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-xl transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-xl transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-slate-800" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <div className="text-xs font-mono text-slate-400 pt-2">
            Location: Bhopal, India • Available for Remote Positions &amp; Global Teams
          </div>
        </div>
      </div>
    </section>
  );
};
