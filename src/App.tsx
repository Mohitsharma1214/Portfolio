import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';

import { CaseStudyModal } from './components/CaseStudyModal';
import { ArticleModal } from './components/ArticleModal';
import { TECHNICAL_ARTICLES } from './data/portfolioData';
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
      '/blogs': 'Technical Blogs & Case Studies | Mohit Sharma • AI Engineer',
      '/writing': 'Technical Blogs & Case Studies | Mohit Sharma • AI Engineer',
      '/contact': "Contact Mohit Sharma | AI Engineer • Computer Vision & LLM Systems",
      '/admin': 'Blog Studio Admin | Mohit Sharma • AI Engineer',
    };

    let title = titles[pathname];
    if (!title && pathname.startsWith('/blogs/')) {
      const blogId = pathname.replace('/blogs/', '').replace(/\/$/, '');
      const matched = TECHNICAL_ARTICLES.find((b) => b.id === blogId);
      if (matched) {
        title = `${matched.title} | Mohit Sharma`;
      }
    }

    document.title = title || 'Mohit Sharma | AI Engineer • Computer Vision & LLM Systems';
  }, [pathname]);

  return null;
}

function WritingIdRedirect() {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={id ? `/blogs/${id}` : '/blogs'} replace />;
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

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

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
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage onSelectProject={handleOpenProject} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage onSelectProject={handleOpenProject} />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogPostPage />} />
            <Route path="/writing" element={<Navigate to="/blogs" replace />} />
            <Route path="/writing/:id" element={<WritingIdRedirect />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdminRoute && <Footer />}

      {/* Interactive Case Study Modal */}
      <CaseStudyModal project={selectedProject} onClose={handleCloseProject} />

      {/* Interactive Technical Writing Reader Modal */}
      <ArticleModal article={selectedArticle} onClose={handleCloseArticle} />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter basename="/Portfolio">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
