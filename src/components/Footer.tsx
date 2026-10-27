import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const footerNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-500 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-950 text-sm tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-slate-300">/</span>
              <span className="font-mono text-slate-600 font-medium">{PERSONAL_INFO.role}</span>
            </div>
            <p className="text-slate-500 mt-1 max-w-md">
              Real-time computer vision, low-latency AI backends, and grounded LLM systems.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-slate-600 font-medium">
            {footerNavLinks.map((link) => {
              const isActive = isRouteActive(link.path);
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`transition-colors hover:text-blue-600 ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right Social & Back-to-Top */}
          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-xs"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-xs"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0ea5e9]" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-xs"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </motion.a>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="p-2.5 rounded-xl text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors ml-2 shadow-xs"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] font-mono gap-2 text-center sm:text-left">
          <div>
            &copy; {currentYear} {PERSONAL_INFO.name}. All verified credentials, metrics, and case studies sourced directly from primary work.
          </div>
          <div className="text-slate-600 font-medium">
            Government of India Copyright {PERSONAL_INFO.copyrightId}
          </div>
        </div>
      </div>
    </footer>
  );
};
