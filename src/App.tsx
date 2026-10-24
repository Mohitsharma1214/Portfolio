import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { WritingPage } from './pages/WritingPage';
import { ContactPage } from './pages/ContactPage';

import { CaseStudyModal } from './components/CaseStudyModal';
import { ArticleModal } from './components/ArticleModal';
import type { ProjectCaseStudy, TechnicalArticle } from './data/portfolioData';

// Helper component to scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

// Dynamic Document Title updater for client-side routing
function PageMetadataUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Mohit Sharma | AI Engineer • Computer Vision & LLM Systems',
      '/about': 'About Mohit Sharma | AI Engineer & Systems Specialist',
      '/projects': 'Projects & Case Studies | Mohit Sharma • AI Engineer',
      '/experience': 'Work Experience | Mohit Sharma • AI Developer at Sodio Technologies',
      '/skills': 'Skills & Technology Stack | Mohit Sharma • AI Engineer',
      '/writing': 'Technical Writing & Architecture Notes | Mohit Sharma',
      '/contact': "Contact Mohit Sharma | AI Engineer • Computer Vision & LLM Systems",
    };

    const title = titles[pathname] || 'Mohit Sharma | AI Engineer • Computer Vision & LLM Systems';
    document.title = title;
  }, [pathname]);

  return null;
}

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<TechnicalArticle | null>(null);
  const location = useLocation();

  const handleOpenProject = (project: ProjectCaseStudy) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleOpenArticle = (article: TechnicalArticle) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans relative overflow-x-hidden modern-grid">
      {/* Subtle modern light-theme watercolor ambient glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[450px] rounded-full bg-blue-400/[0.07] blur-[140px]" />
        <div className="absolute top-[35%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-300/[0.08] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[500px] rounded-full bg-sky-300/[0.06] blur-[140px]" />
      </div>

      <ScrollToTop />
      <PageMetadataUpdater />
      <Navbar />

      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage onSelectProject={handleOpenProject} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage onSelectProject={handleOpenProject} />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/writing" element={<WritingPage onSelectArticle={handleOpenArticle} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Interactive Case Study Modal */}
      <CaseStudyModal project={selectedProject} onClose={handleCloseProject} />

      {/* Interactive Technical Writing Reader Modal */}
      <ArticleModal article={selectedArticle} onClose={handleCloseArticle} />
    </div>
  );
}

export function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
