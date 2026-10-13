import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { INITIAL_PROJECTS, INITIAL_POSTS } from './data/initialData';
import { useLocalStorage } from './hooks/useLocalStorage';
import Navbar from './components/Navbar';
import HeroLanding from './components/HeroLanding';
import BentoHub from './components/BentoHub';
import ProjectArchive from './components/ProjectArchive';
import BlogCMS from './components/BlogCMS';
import ExportInitialDataModal from './components/ExportInitialDataModal';
import CaseStudyDrawer from './components/CaseStudyDrawer';

export default function App() {
  // Theme state (Dark mode default as requested)
  const [darkMode, setDarkMode] = useState(true);

  // Active Tab: 'home' | 'archive' | 'blog'
  const [activeTab, setActiveTab] = useState('home');

  // Hub Mode: 'engineering' | 'creative'
  const [hubMode, setHubMode] = useState('engineering');

  // CMS Admin Mode Toggle
  const [isCmsAdmin, setIsCmsAdmin] = useState(false);

  // Export to initialData.js Modal Toggle
  const [showExportModal, setShowExportModal] = useState(false);

  // Deep Case Study Slide-Over Drawer Project
  const [selectedCaseStudyProject, setSelectedCaseStudyProject] = useState(null);

  // Live IST Clock
  const [istTime, setIstTime] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Persisted Projects & Posts using clean custom useLocalStorage hook
  const [projects, setProjects] = useLocalStorage(
    'abhigyan_portfolio_projects_v1',
    INITIAL_PROJECTS
  );

  const [posts, setPosts] = useLocalStorage(
    'abhigyan_portfolio_posts_v1',
    INITIAL_POSTS
  );

  // Synchronize 'dark' class on HTML root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Live IST Telemetry Clock (UTC+5:30)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setIstTime(formatter.format(now));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleCopyEmail = () => {
    const email = 'abhigyan.singh.dev@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopiedEmail(true);
    showToast('Email copied to clipboard: abhigyan.singh.dev@gmail.com');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownloadResume = () => {
    const resumeContent = `ABHIGYAN SINGH
Bengaluru, Karnataka, India | abhigyan.singh.dev@gmail.com
Data & AI Engineer • Full-Stack Builder

SUMMARY
Data & AI Engineer and Full-Stack Builder crafting scalable data pipelines, backend architectures, and AI-driven workflows. Experienced in enterprise REST API synchronizations, interactive biometric session telemetry dashboards (Plotly/Dash), and containerized Node.js/Python microservices.

CORE SKILLS
- Data & AI: Python, SQL, Dash, Plotly, Pandas, Claude API, Model Context Protocol (MCP)
- Backend & DevOps: Node.js, Express, REST APIs, Docker, Linux, Git
- Frontend & Systems: React, Tailwind CSS, Notion Architecture, Obsidian Knowledge Graphs

EXPERIENCE
Data Engineer (Present)
- Engineered automated enterprise data integration architectures syncing complex project schemas into OpenProject via REST APIs with idempotent retry logic.
- Built interactive Biometric Session & OPEX Analytics Dashboards in Python/Dash/Plotly processing 50k+ raw punch events.
- Designed cost-leakage detection and operational efficiency reporting pipelines.

Independent Builder & Creator (Ongoing)
- Developed modular Node.js/Express backend services with Docker orchestration and LLM agent tool integrations.
- Created multi-tier Short-Term Rental Notion OS templates on Gumroad and conducted EdTech product strategy teardowns.
- Designed handcrafted 3D clay physical products and digital creator systems.
`;
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abhigyan_Singh_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Resume downloaded! (Replace with your PDF anytime)');
  };

  const handleResetDemoData = () => {
    setProjects(INITIAL_PROJECTS);
    setPosts(INITIAL_POSTS);
    try {
      localStorage.removeItem('abhigyan_portfolio_projects_v1');
      localStorage.removeItem('abhigyan_portfolio_posts_v1');
      localStorage.removeItem('abhigyan_eye_rig_coords_v1');
    } catch {}
    showToast('Reset portfolio & CMS to original defaults.');
  };

  const handleImportBackup = (backup) => {
    if (backup.projects && Array.isArray(backup.projects)) {
      setProjects(backup.projects);
    }
    if (backup.posts && Array.isArray(backup.posts)) {
      setPosts(backup.posts);
    }
    showToast('Imported and restored data from backup!');
  };

  const handleExploreBento = () => {
    const el = document.getElementById('bento-hub');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredProjects = useMemo(() => {
    const list = projects.filter((p) => p.featured);
    return list.length > 0 ? list.slice(0, 3) : projects.slice(0, 3);
  }, [projects]);

  const themeClasses = darkMode
    ? {
        bg: 'bg-[#09090b] text-zinc-100',
        card: 'bg-[#111114] border-zinc-800/90 hover:border-zinc-700/90',
        cardSubtle: 'bg-zinc-900/50 border-zinc-800/70',
        border: 'border-zinc-800',
        textMuted: 'text-zinc-400',
        textSubtle: 'text-zinc-500',
        pill: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
        pillActive: 'bg-zinc-100 text-zinc-900 border-zinc-100 font-medium',
        input: 'bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-zinc-600',
        navBg: 'bg-[#09090b]/85 border-zinc-800/80'
      }
    : {
        bg: 'bg-[#fafafa] text-zinc-900',
        card: 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
        cardSubtle: 'bg-zinc-100/70 border-zinc-200/80',
        border: 'border-zinc-200',
        textMuted: 'text-zinc-600',
        textSubtle: 'text-zinc-500',
        pill: 'bg-zinc-100 text-zinc-700 border-zinc-200',
        pillActive: 'bg-zinc-900 text-white border-zinc-900 font-medium',
        input: 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-500',
        navBg: 'bg-[#fafafa]/85 border-zinc-200/80'
      };

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${themeClasses.bg}`}>
      {/* Subtle 48px Minimalist Grid Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-emerald-500/40 bg-zinc-950/95 text-zinc-100 shadow-2xl backdrop-blur-md text-xs sm:text-sm animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Glassmorphic Pill Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isCmsAdmin={isCmsAdmin}
        setIsCmsAdmin={(val) => {
          setIsCmsAdmin(val);
          showToast(
            val
              ? 'CMS Admin Mode enabled: You can now add/edit posts & projects.'
              : 'CMS Admin Mode disabled.'
          );
        }}
        projectCount={projects.length}
        onCopyEmail={handleCopyEmail}
        onOpenExportModal={() => setShowExportModal(true)}
        themeClasses={themeClasses}
      />

      {/* Main Content Viewport */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ==========================================
            VIEW 1: HOME (HERO LANDING + BENTO GRID HUB)
           ========================================== */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* New Interactive Hero Landing Section */}
            <HeroLanding
              onDownloadResume={handleDownloadResume}
              onCopyEmail={handleCopyEmail}
              onExploreBento={handleExploreBento}
              darkMode={darkMode}
            />

            {/* Linear/Vercel-style Bento Grid */}
            <BentoHub
              projects={projects}
              featuredProjects={featuredProjects}
              hubMode={hubMode}
              setHubMode={setHubMode}
              istTime={istTime}
              copiedEmail={copiedEmail}
              handleCopyEmail={handleCopyEmail}
              handleDownloadResume={handleDownloadResume}
              onNavigateArchive={() => {
                setActiveTab('archive');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateBlog={() => {
                setActiveTab('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCaseStudy={(proj) => setSelectedCaseStudyProject(proj)}
              themeClasses={themeClasses}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* ==========================================
            VIEW 2: FULL PROJECT ARCHIVE
           ========================================== */}
        {activeTab === 'archive' && (
          <ProjectArchive
            projects={projects}
            setProjects={setProjects}
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isCmsAdmin={isCmsAdmin}
            onOpenExportModal={() => setShowExportModal(true)}
            onOpenCaseStudy={(proj) => setSelectedCaseStudyProject(proj)}
            showToast={showToast}
            themeClasses={themeClasses}
          />
        )}

        {/* ==========================================
            VIEW 3: BLOG & BUILT-IN CMS
           ========================================== */}
        {activeTab === 'blog' && (
          <BlogCMS
            posts={posts}
            setPosts={setPosts}
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isCmsAdmin={isCmsAdmin}
            setIsCmsAdmin={setIsCmsAdmin}
            onOpenExportModal={() => setShowExportModal(true)}
            showToast={showToast}
            themeClasses={themeClasses}
          />
        )}
      </main>

      {/* State Exporter & Backup Modal */}
      <ExportInitialDataModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        projects={projects}
        posts={posts}
        onImportBackup={handleImportBackup}
        showToast={showToast}
        darkMode={darkMode}
      />

      {/* Deep Case Study Slide-Over Drawer */}
      <CaseStudyDrawer
        isOpen={Boolean(selectedCaseStudyProject)}
        onClose={() => setSelectedCaseStudyProject(null)}
        project={selectedCaseStudyProject}
        darkMode={darkMode}
      />

      {/* Footer */}
      <footer className={`mt-20 border-t py-8 text-xs ${themeClasses.border} ${themeClasses.textSubtle}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-zinc-400">
              Abhigyan Singh
            </span>
            <span>—</span>
            <span>Data & AI Engineering • Systems Architecture</span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-400 transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => {
                setActiveTab('archive');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-400 transition-colors"
            >
              Archive ({projects.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-400 transition-colors"
            >
              Blog ({posts.length})
            </button>
            <button
              onClick={handleResetDemoData}
              title="Restore default projects and blog posts"
              className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
