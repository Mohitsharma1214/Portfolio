import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { TechnicalWritingSection } from './components/TechnicalWritingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ArticleModal } from './components/ArticleModal';
import { PROJECTS, TECHNICAL_ARTICLES } from './data/portfolioData';
import type { ProjectCaseStudy, TechnicalArticle } from './data/portfolioData';

export function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<TechnicalArticle | null>(null);

  // Handle URL Hash Deep Linking for direct case study sharing
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        const found = PROJECTS.find((p) => p.id === projectId);
        if (found) {
          setSelectedProject(found);
          setSelectedArticle(null);
        }
      } else if (hash.startsWith('#article-')) {
        const articleId = hash.replace('#article-', '');
        const found = TECHNICAL_ARTICLES.find((a) => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
          setSelectedProject(null);
        }
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenProject = (project: ProjectCaseStudy) => {
    setSelectedProject(project);
    window.location.hash = `project-${project.id}`;
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (window.location.hash.startsWith('#project-')) {
      window.history.pushState(null, '', window.location.pathname + '#projects');
    }
  };

  const handleOpenArticle = (article: TechnicalArticle) => {
    setSelectedArticle(article);
    window.location.hash = `article-${article.id}`;
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    if (window.location.hash.startsWith('#article-')) {
      window.history.pushState(null, '', window.location.pathname + '#writing');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafb] text-slate-900 selection:bg-brand-100 selection:text-brand-900 font-sans">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <ProjectsSection onSelectProject={handleOpenProject} />
        <ExperienceSection />
        <SkillsSection />
        <TechnicalWritingSection onSelectArticle={handleOpenArticle} />
        <ContactSection />
      </main>

      <Footer />

      {/* Interactive Case Study Modal */}
      <CaseStudyModal project={selectedProject} onClose={handleCloseProject} />

      {/* Interactive Technical Writing Reader Modal */}
      <ArticleModal article={selectedArticle} onClose={handleCloseArticle} />
    </div>
  );
}

export default App;
