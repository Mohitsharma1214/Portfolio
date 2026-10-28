import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  Mail, 
  MapPin, 
  Clock, 
  Briefcase, 
  ShieldCheck, 
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useResumeModal } from '../context/ResumeModalContext';

export const RecruiterSnapshotCard: React.FC = () => {
  const { openResumeModal, settings } = useResumeModal();

  const targetRoles = settings.targetRoles && settings.targetRoles.length > 0 
    ? settings.targetRoles 
    : ['AI Engineer', 'Computer Vision Specialist', 'MLOps & Systems Engineer'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 border border-blue-200/80 shadow-md p-6 sm:p-8">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                  Recruiter &amp; Hiring Manager Quick-Card
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                Candidate Snapshot &bull; Mohit Sharma
              </h2>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-2xs self-start sm:self-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-800">
                {settings.isAvailable ? 'Actively Interviewing • Open to Offers' : 'Open to High-Impact Opportunities'}
              </span>
            </div>
          </div>

          {/* 4-Panel Grid of Fast Answers for Recruiters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Target Roles */}
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span className="font-semibold uppercase tracking-wider">Target Roles</span>
              </div>
              <div className="space-y-1 pt-1">
                {targetRoles.map((role, idx) => (
                  <div key={idx} className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Location & Work Mode */}
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold uppercase tracking-wider">Location &amp; Work Mode</span>
              </div>
              <div className="pt-1">
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {settings.locationPreference || 'Bhopal, India'}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  <span>Open to Relocation &bull; Remote</span>
                </div>
              </div>
            </div>

            {/* 3. Notice Period */}
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold uppercase tracking-wider">Notice Period</span>
              </div>
              <div className="pt-1">
                <div className="text-sm font-extrabold text-slate-950">
                  {settings.noticePeriod || 'Immediate / Short Notice'}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Available to start immediately or on mutually agreed onboarding timeline.
                </p>
              </div>
            </div>

            {/* 4. Production Verifications */}
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="font-semibold uppercase tracking-wider">Verified Credential</span>
              </div>
              <div className="pt-1 space-y-1">
                <div className="text-xs font-bold text-amber-950">
                  Govt. of India Copyright
                </div>
                <div className="font-mono text-[11px] text-amber-800 font-semibold">
                  SW-19841/2024 (Edge AI)
                </div>
                <div className="text-[11px] text-slate-600 font-mono">
                  5,000+ clinical imgs/day &bull; &lt;120ms P95
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Bar for Recruiters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 bg-white/70 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-blue-200/70">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Primary: View / Download Resume */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openResumeModal}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View / Download Resume</span>
              </motion.button>

              {/* Secondary: 15-Min Intro Chat */}
              {settings.calendlyUrl && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={settings.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-indigo-200 transition-all shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Book 15-Min Intro Chat</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                </motion.a>
              )}

              {/* Tertiary: Email */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${PERSONAL_INFO.email}?subject=Interview%20Inquiry%20—%20Mohit%20Sharma`}
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 transition-all"
              >
                <Mail className="w-4 h-4 text-slate-600" />
                <span>Email Directly</span>
              </motion.a>
            </div>

            <div className="text-xs text-slate-500 font-mono hidden lg:block">
              Response time: &lt; 12 hours
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
