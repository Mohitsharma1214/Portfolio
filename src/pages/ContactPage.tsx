import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowUpRight, 
  MapPin, 
  Clock,
  Sparkles
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("Full-Time AI Engineering Role");

  const topics = [
    "Full-Time AI Engineering Role",
    "Real-Time Computer Vision Pipeline",
    "Edge Telematics / ARM Deployment",
    "Deterministic LLM Guardrails & RAG",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoSubject = encodeURIComponent(`[Inquiry] ${selectedTopic} - Mohit Sharma Portfolio`);
  const mailtoBody = encodeURIComponent(`Hi Mohit,\n\nI came across your AI engineering portfolio and would like to discuss: ${selectedTopic}.\n\nBest regards,`);
  const dynamicMailto = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12"
    >
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Immediate Candidate &bull; Engineering Discussions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
          Let's Discuss AI Engineering
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Open to full-time engineering roles, AI consulting, or discussions around production computer vision and agentic systems.
        </p>
      </div>

      {/* Main 2-Column Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Communication Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="modern-card bg-white rounded-3xl p-6 sm:p-9 space-y-8 border border-slate-200 shadow-xs">
            {/* Availability Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-slate-900 font-bold">
                  Active Candidate &bull; Immediate Availability
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Topic Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                Select Conversation Topic
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-3 rounded-xl text-xs font-medium text-left transition-all border ${
                      selectedTopic === topic
                        ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-xs font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Email Box */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                Direct Email Address
              </label>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-3 px-2 text-slate-900 font-mono text-sm sm:text-base font-bold truncate w-full sm:w-auto">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-xs transition-all focus:outline-none"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={dynamicMailto}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2.5 shadow-xs transition-all"
                  >
                    <span>Send Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Typical Response Time */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-100 pt-5">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Response window: Typically within 24 hours</span>
              </div>
              <span className="text-slate-400 hidden sm:inline">Timezone: IST (UTC+5:30)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profiles & Hiring Quick Facts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Social Profiles */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Professional Profiles
            </label>
            <motion.a
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group shadow-xs block"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center font-bold">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-950 text-sm group-hover:text-blue-600 transition-colors">
                    LinkedIn Profile
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    in/mohitsharmas-
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </motion.a>

            <motion.a
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between group shadow-xs block"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-950 text-sm group-hover:text-blue-600 transition-colors">
                    GitHub Profile
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    github.com/mohitsharma1214
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </motion.a>
          </div>

          {/* Hiring Quick Facts Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Hiring Snapshot
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                <span><strong>Roles of Interest:</strong> AI Engineer, Computer Vision Engineer, Machine Learning Systems Engineer.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                <span><strong>Work Model:</strong> Remote Worldwide or On-Site Relocation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                <span><strong>Notice Period:</strong> Immediate / Ready to deploy.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
