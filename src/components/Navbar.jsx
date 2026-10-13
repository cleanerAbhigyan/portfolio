import React from 'react';
import {
  Layout,
  FolderGit2,
  BookOpen,
  Mail,
  Sun,
  Moon,
  Edit3,
  Database
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  isCmsAdmin,
  setIsCmsAdmin,
  projectCount = 0,
  onCopyEmail,
  onOpenExportModal,
  themeClasses
}) {
  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4 pb-2">
      <div className={`max-w-5xl mx-auto h-14 px-3 sm:px-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 flex items-center justify-between gap-2 sm:gap-4 ${
        darkMode
          ? 'bg-zinc-950/80 border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.45)]'
          : 'bg-white/85 border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
      }`}>
        {/* Brand Avatar & Monogram */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          title="Back to Hero & Bento Hub"
        >
          <div className="relative w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold tracking-tighter transition-all group-hover:scale-105 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400">
            <span>AS</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold tracking-tight leading-none flex items-center gap-1.5">
              <span>Abhigyan Singh</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
              Data & AI Engineer
            </div>
          </div>
        </button>

        {/* Center Pill Nav Links: WORK, ARCHIVE, BLOG / CMS, CONTACT */}
        <nav className={`flex items-center p-1 rounded-xl border ${
          darkMode ? 'bg-zinc-900/60 border-zinc-800/60' : 'bg-zinc-100/70 border-zinc-200/70'
        }`}>
          {/* WORK / HOME */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeTab === 'home'
                ? darkMode
                  ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                  : 'bg-white text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] font-mono">Work</span>
          </button>

          {/* ARCHIVE */}
          <button
            onClick={() => setActiveTab('archive')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeTab === 'archive'
                ? darkMode
                  ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                  : 'bg-white text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] font-mono">Archive</span>
            {projectCount > 0 && (
              <span className={`hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono ${
                darkMode ? 'bg-zinc-800 text-zinc-400 border border-zinc-700/60' : 'bg-zinc-200 text-zinc-600'
              }`}>
                {projectCount}
              </span>
            )}
          </button>

          {/* BLOG / CMS */}
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeTab === 'blog'
                ? darkMode
                  ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                  : 'bg-white text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] font-mono">Blog / CMS</span>
          </button>

          {/* CONTACT */}
          <button
            onClick={onCopyEmail}
            title="Copy email to clipboard"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] font-mono">Contact</span>
          </button>
        </nav>

        {/* Right Tools: CMS Admin & Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setIsCmsAdmin(!isCmsAdmin)}
            title="Toggle CMS Admin Editing Controls"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              isCmsAdmin
                ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-400 font-medium shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : darkMode
                  ? 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">{isCmsAdmin ? 'CMS: ON' : 'CMS'}</span>
          </button>

          {isCmsAdmin && onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              title="Export current state to src/data/initialData.js"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono transition-all animate-fadeIn"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">Sync Codebase</span>
            </button>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle color theme"
            className={`p-2 rounded-xl border transition-all ${
              darkMode
                ? 'bg-zinc-900/80 border-zinc-800 text-amber-400 hover:bg-zinc-800'
                : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
