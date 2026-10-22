import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-slate-300">/</span>
              <span className="font-mono text-slate-500">{PERSONAL_INFO.role}</span>
            </div>
            <p className="text-slate-500 mt-1 max-w-sm">
              Real-time computer vision, low-latency AI backends, and grounded LLM systems.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-slate-600 font-medium">
            <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
            <a href="#projects" className="hover:text-slate-900 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-slate-900 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-slate-900 transition-colors">Skills</a>
            <a href="#writing" className="hover:text-slate-900 transition-colors">Writing</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>

          {/* Right Social & Back-to-Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors ml-2"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] font-mono gap-2">
          <div>
            © {currentYear} {PERSONAL_INFO.name}. All verified credentials, metrics, and case studies sourced directly from primary work.
          </div>
          <div>
            Zero paid APIs • Static deployable via GitHub Pages
          </div>
        </div>
      </div>
    </footer>
  );
};
