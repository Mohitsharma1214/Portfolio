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
    <section id="contact" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 rounded-3xl border border-cyan-500/30 p-8 sm:p-12 shadow-[0_0_40px_rgba(6,182,212,0.12)] text-center space-y-6 backdrop-blur-xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono font-medium text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Let's Build Reliable Systems</span>
          </div>

          {/* Heading & Subtitle */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Get in Touch
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-3 max-w-xl mx-auto leading-relaxed">
              I'm actively interested in conversations with AI startup founders, CTOs, and engineering leaders building latency-critical computer vision, edge systems, or grounded LLM agents.
            </p>
          </div>

          {/* Direct Email Action Box */}
          <div className="pt-2 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#080d18] border border-slate-800/90 rounded-2xl shadow-inner">
              <div className="flex items-center gap-3 px-2 text-slate-200 font-mono text-sm sm:text-base font-medium truncate w-full sm:w-auto">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate text-cyan-300">{PERSONAL_INFO.email}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl px-3 py-2 shadow-sm transition-all focus:outline-none"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 rounded-xl px-4 py-2 shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all"
                >
                  <span>Send Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
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
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-700/80 hover:border-cyan-500/40 transition-all shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4 text-[#38bdf8]" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-700/80 hover:border-cyan-500/40 transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4 text-slate-300" />
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
