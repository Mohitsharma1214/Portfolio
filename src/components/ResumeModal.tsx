import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';
import { 
  getGoogleDrivePreviewUrl, 
  getGoogleDriveDownloadUrl, 
  extractGoogleDriveId 
} from '../services/profileConfigService';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
  calendlyUrl?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  resumeUrl,
  calendlyUrl,
}) => {
  const [iframeLoading, setIframeLoading] = useState(true);

  if (!isOpen) return null;

  const isDriveLink = Boolean(extractGoogleDriveId(resumeUrl));
  const previewUrl = isDriveLink ? getGoogleDrivePreviewUrl(resumeUrl) : resumeUrl;
  const downloadUrl = isDriveLink ? getGoogleDriveDownloadUrl(resumeUrl) : resumeUrl;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        />

        <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-5xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all border border-slate-200 flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="px-5 sm:px-7 py-4 border-b border-slate-200 bg-white/95 backdrop-blur-xs flex items-center justify-between gap-4 sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-950 leading-tight">
                      {PERSONAL_INFO.name} — Curriculum Vitae
                    </h2>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified 2026</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    AI Engineer • Computer Vision &amp; Low-Latency Production Systems
                  </p>
                </div>
              </div>

              {/* Actions & Close */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {resumeUrl ? (
                  <>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs transition-all shadow-xs"
                      title="Download PDF directly"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download PDF</span>
                    </a>

                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-all border border-slate-200"
                      title="Open in Google Drive / New Tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span className="hidden sm:inline">Open Drive</span>
                    </a>
                  </>
                ) : null}

                {calendlyUrl && (
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-all border border-indigo-200"
                    title="Book 15-min intro call"
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Book 15-Min Chat</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors border border-slate-200 ml-1 cursor-pointer"
                  aria-label="Close resume viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Resume Viewer Body */}
            <div className="flex-1 bg-slate-100 relative min-h-[550px] sm:min-h-[680px] overflow-hidden flex flex-col">
              {resumeUrl ? (
                <>
                  {iframeLoading && (
                    <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center gap-3 z-10">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                      <p className="text-xs font-mono text-slate-500">
                        Connecting to secure document stream...
                      </p>
                    </div>
                  )}

                  <iframe
                    src={previewUrl}
                    title="Mohit Sharma Resume Preview"
                    className="w-full h-full flex-1 border-0"
                    onLoad={() => setIframeLoading(false)}
                    allow="autoplay"
                  />
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Resume Link Setup</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      No Google Drive resume link has been configured yet. You can paste your Google Drive link in the Admin Panel to render it directly here.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5 w-full">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=Requesting%20Resume%20—%20Mohit%20Sharma`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-xs flex-1"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Email Mohit for Resume</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Quick Bar */}
            <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-slate-700">Available for AI Engineering Opportunities</span>
                <span className="text-slate-300">•</span>
                <span>Open to Remote &amp; Relocation</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
                <span>•</span>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
