import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Home, 
  User, 
  Layers, 
  Briefcase, 
  Cpu, 
  BookOpen, 
  Mail, 
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useResumeModal } from '../context/ResumeModalContext';

export const Navbar: React.FC = () => {
  const { openResumeModal } = useResumeModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile menu is open (cross-browser iOS & Android scroll lock)
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to determine active state including nested routes (e.g., /blogs/:id activates Blogs)
  const isRouteActive = (linkPath: string) => {
    if (linkPath === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    if (linkPath === '/blogs') {
      return (
        location.pathname === '/blogs' ||
        location.pathname.startsWith('/blogs/') ||
        location.pathname === '/writing' ||
        location.pathname.startsWith('/writing/')
      );
    }
    return location.pathname === linkPath || location.pathname.startsWith(`${linkPath}/`);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home, desc: 'Overview & Telemetry' },
    { name: 'About', path: '/about', icon: User, desc: 'Background & Philosophy' },
    { name: 'Projects', path: '/projects', icon: Layers, desc: 'Case Studies & Code' },
    { name: 'Experience', path: '/experience', icon: Briefcase, desc: 'Sodio, Hairscope, Centilytics' },
    { name: 'Skills', path: '/skills', icon: Cpu, desc: 'CV, TensorRT & LLM Stack' },
    { name: 'Blogs', path: '/blogs', icon: BookOpen, desc: 'Systems Notes & Breakdowns' },
    { name: 'Contact', path: '/contact', icon: Mail, desc: 'Inquiries & Discussions' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo / Monogram */}
            <NavLink
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 min-w-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xs tracking-wider flex items-center justify-center shadow-xs shrink-0"
              >
                MS
              </motion.div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-slate-950 text-xs xs:text-sm sm:text-base tracking-tight uppercase leading-none group-hover:text-blue-600 transition-colors whitespace-nowrap">
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-0.5 leading-none font-medium whitespace-nowrap">
                  AI Systems Engineer
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation Links with animated sliding pill */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shadow-xs">
              {navLinks.map((link) => {
                const isActive = isRouteActive(link.path);
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="relative px-3.5 lg:px-4 py-1.5 text-xs font-medium rounded-full transition-colors z-10"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navActivePill"
                        className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/80 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span
                      className={
                        isActive
                          ? 'text-blue-600 font-semibold'
                          : 'text-slate-600 hover:text-slate-950'
                      }
                    >
                      {link.name}
                    </span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Desktop Right Action CTA */}
            <div className="hidden sm:flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openResumeModal}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100/90 hover:bg-slate-200/90 rounded-xl px-3.5 py-2.5 transition-all border border-slate-200/80 shadow-2xs cursor-pointer"
                title="View and download verified resume PDF"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Resume</span>
              </motion.button>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <NavLink
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl px-4 py-2.5 transition-all shadow-xs"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </NavLink>
              </motion.div>
            </div>

            {/* Mobile Actions: Resume Pill + Enhanced Hamburger Button */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={openResumeModal}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 px-2.5 py-1.5 rounded-xl border border-slate-200/90 transition-colors shadow-2xs cursor-pointer"
                title="View Resume PDF"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all shadow-2xs active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer ${
                  mobileMenuOpen
                    ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
                    : 'bg-slate-50/90 hover:bg-slate-100 border-slate-200/90 text-slate-800'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Full Mobile Overlay & Floating Sheet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay with touch lock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 md:hidden touch-none"
              aria-hidden="true"
            />

            {/* Sheet Card Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              className="fixed top-16 sm:top-20 left-0 right-0 max-h-[calc(100dvh-4.5rem)] sm:max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain bg-white/98 backdrop-blur-2xl border-b border-slate-200/90 shadow-2xl z-50 md:hidden px-4 pt-3 pb-8 rounded-b-3xl space-y-4"
            >
              {/* Quick Status Bar */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-slate-800 font-semibold">Active AI Candidate</span>
                </div>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 font-semibold">
                  Open to Roles
                </span>
              </div>

              {/* Navigation Items with Icons & Subtitles */}
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = isRouteActive(link.path);
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-blue-50/90 text-blue-900 border border-blue-200/80 font-bold shadow-2xs'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50 active:bg-slate-100 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className={`text-sm leading-tight ${isActive ? 'font-bold text-blue-900' : 'font-semibold text-slate-800'}`}>
                            {link.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                            {link.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive
                            ? 'text-blue-600 translate-x-0.5'
                            : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5'
                        }`}
                      />
                    </NavLink>
                  );
                })}
              </nav>

              {/* Mobile View Resume Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openResumeModal();
                }}
                className="flex items-center justify-center gap-2 w-full text-center text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl py-2.5 border border-blue-200 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>View &amp; Download Resume (PDF)</span>
              </button>

              {/* Quick Contact & Social Strip */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-700" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0ea5e9]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email</span>
                </a>
              </div>

              {/* Full-Width Primary Action CTA */}
              <div className="pt-1">
                <NavLink
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl py-3 shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get in Touch • Discuss AI Roles</span>
                  <ArrowUpRight className="w-4 h-4" />
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
