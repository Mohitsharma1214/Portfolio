import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowUpRight, 
  MapPin, 
  Clock,
  Sparkles,
  Send,
  User,
  MessageSquare,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("Full-Time AI Engineering Role");
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'activation_required'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: `[Portfolio Inquiry] ${selectedTopic} — from ${name.trim()}`,
          topic: selectedTopic,
          message: message.trim(),
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        setStatus('activation_required');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Unable to send message right now. Please use the direct email link below.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error while sending transmission. Please use direct email instead.');
    }
  };

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
          Send a direct message below. Inquiries are routed immediately to my personal inbox.
        </p>
      </div>

      {/* Main 2-Column Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="modern-card bg-white rounded-3xl p-6 sm:p-9 space-y-6 border border-slate-200 shadow-xs">
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

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Topic Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Select Conversation Topic
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all border ${
                        selectedTopic === topic
                          ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs font-bold ring-1 ring-blue-400/30'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your Name</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Alex Rivera"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your Email</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Message &bull; Scope or Role Details</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, team, or role requirements..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 resize-y min-h-[110px]"
                />
              </div>

              {/* Status Feedback Banners */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="font-semibold block">Message Transmitted Successfully!</strong>
                      <p className="text-emerald-700 leading-relaxed">
                        Thank you for reaching out. Your message has been routed to my primary inbox and I typically respond within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === 'activation_required' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="font-semibold block">One-Time Activation Email Sent</strong>
                      <p className="text-amber-800 leading-relaxed">
                        An activation link has been sent to Mohit's email address by FormSubmit. Once confirmed, all future transmissions arrive instantaneously. In the meantime, you can also send directly via email below.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="font-semibold block">Transmission Notice</strong>
                      <p className="text-rose-700">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-xs disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Direct Email Fallback Strip */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                Or Send Directly Via Your Mail Client
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-2 px-2 text-slate-900 font-mono text-xs sm:text-sm font-bold truncate w-full sm:w-auto">
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-all focus:outline-none"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={dynamicMailto}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 text-xs font-semibold bg-white hover:bg-slate-100 text-blue-600 border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-all"
                  >
                    <span>Mail Client</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Typical Response Time */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-100 pt-4">
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
