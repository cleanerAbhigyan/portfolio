import React from 'react';
import {
  FileText,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
  Cpu,
  ArrowUpRight,
  Terminal,
  Briefcase,
  Sparkles,
  ChevronRight,
  FolderGit2,
  Palette
} from 'lucide-react';
import { TECH_STACK, EXPERIENCE_ITEMS, CREATIVE_ITEMS } from '../data/initialData';

export default function BentoHub({
  projects = [],
  featuredProjects = [],
  hubMode = 'engineering',
  setHubMode,
  istTime = '',
  copiedEmail = false,
  handleCopyEmail,
  handleDownloadResume,
  onNavigateArchive,
  onNavigateBlog,
  onOpenCaseStudy,
  themeClasses,
  darkMode
}) {
  return (
    <div id="bento-hub" className="space-y-6 pt-4">
      {/* Live Status Pill Bar & Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs ${themeClasses.card}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className={themeClasses.textMuted}>
            Currently exploring{' '}
            <strong className={darkMode ? 'text-zinc-100 font-medium' : 'text-zinc-900 font-medium'}>
              AI Agent Architectures, MCP & Dockerized Workflows
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={themeClasses.textSubtle}>Mode:</span>
          <button
            onClick={() => setHubMode('engineering')}
            className={`px-2.5 py-1 rounded-md border transition-all ${
              hubMode === 'engineering' ? themeClasses.pillActive : `${themeClasses.card} ${themeClasses.textMuted}`
            }`}
          >
            01. Engineering
          </button>
          <button
            onClick={() => setHubMode('creative')}
            className={`px-2.5 py-1 rounded-md border transition-all ${
              hubMode === 'creative' ? themeClasses.pillActive : `${themeClasses.card} ${themeClasses.textMuted}`
            }`}
          >
            02. Off-Screen & Creative
          </button>
        </div>
      </div>

      {/* Top Grid: Engineering Architecture & Core Impact (8 cols) + Base Location & Lab Focus (4 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* ENGINEERING ARCHITECTURE & CORE IMPACT CARD */}
        <div className={`md:col-span-8 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all ${themeClasses.card}`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                // Engineering Architecture & Core Impact
              </span>
              <span className={`text-xs font-mono ${themeClasses.textSubtle}`}>
                Production Telemetry
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">
              High-Throughput Data Pipelines, Backend Systems & AI Automation —{' '}
              <span className={themeClasses.textMuted}>
                Engineered for 99.8% availability, sub-second query execution, and zero-loss transactional integrity.
              </span>
            </h2>

            {/* 3 High-Signal Quantitative Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${themeClasses.cardSubtle}`}>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
                  99.8%
                </div>
                <div className="mt-1">
                  <div className="text-xs font-semibold text-zinc-200">
                    Pipeline Reliability
                  </div>
                  <div className={`text-[11px] leading-relaxed mt-0.5 ${themeClasses.textMuted}`}>
                    Idempotent REST sync, adaptive backoffs & zero data collision.
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex flex-col justify-between ${themeClasses.cardSubtle}`}>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
                  40%
                </div>
                <div className="mt-1">
                  <div className="text-xs font-semibold text-zinc-200">
                    Manual Ops Reduction
                  </div>
                  <div className={`text-[11px] leading-relaxed mt-0.5 ${themeClasses.textMuted}`}>
                    Automated biometric ETL, session grouping & anomaly scoring.
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex flex-col justify-between ${themeClasses.cardSubtle}`}>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400">
                  &lt;15ms
                </div>
                <div className="mt-1">
                  <div className="text-xs font-semibold text-zinc-200">
                    Real-Time Telemetry
                  </div>
                  <div className={`text-[11px] leading-relaxed mt-0.5 ${themeClasses.textMuted}`}>
                    Vectorized Dash/Plotly engines & sub-second analytic queries.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Socials */}
          <div className="pt-6 mt-6 border-t border-zinc-800/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => {
                  if (featuredProjects && featuredProjects.length > 0) {
                    onOpenCaseStudy?.(featuredProjects[0]);
                  } else if (projects && projects.length > 0) {
                    onOpenCaseStudy?.(projects[0]);
                  }
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  darkMode
                    ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Case Studies</span>
              </button>

              <button
                onClick={onNavigateArchive}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${themeClasses.card}`}
              >
                <span>Browse All Projects</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className={`p-2.5 rounded-xl border transition-colors ${themeClasses.card}`}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className={`p-2.5 rounded-xl border transition-colors ${themeClasses.card}`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                title="Twitter / X"
                className={`p-2.5 rounded-xl border transition-colors ${themeClasses.card}`}
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOCATION & TELEMETRY CARDS */}
        <div className="md:col-span-4 flex flex-col gap-4">
          {/* Base Location & IST Clock */}
          <div className={`rounded-2xl border p-5 flex flex-col justify-between flex-1 transition-all ${themeClasses.card}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 ${themeClasses.textSubtle}`}>
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Base Location
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                IST (UTC+5:30)
              </span>
            </div>

            <div className="my-4">
              <div className="text-xl font-bold tracking-tight">
                Bengaluru, India
              </div>
              <div className={`text-xs mt-1 flex items-center gap-1.5 font-mono ${themeClasses.textMuted}`}>
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{istTime || 'Live Clock Active'}</span>
              </div>
            </div>

            <div className={`text-xs pt-3 border-t ${themeClasses.border} ${themeClasses.textSubtle} flex items-center justify-between`}>
              <span>Status</span>
              <span className="text-emerald-400 font-medium">Open to Select Roles & Collabs</span>
            </div>
          </div>

          {/* Current Lab Focus */}
          <div className={`rounded-2xl border p-5 flex flex-col justify-between flex-1 transition-all ${themeClasses.card}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 ${themeClasses.textSubtle}`}>
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                Current Lab Focus
              </span>
              <span className={`text-[11px] font-mono ${themeClasses.textSubtle}`}>
                Q4 2026
              </span>
            </div>

            <ul className="my-3 space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono">01</span>
                <span>Claude MCP Server integrations & automated tool workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono">02</span>
                <span>Idempotent REST API sync engines for enterprise schemas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono">03</span>
                <span>Multi-container Docker orchestration for Python + Node</span>
              </li>
            </ul>

            <button
              onClick={onNavigateBlog}
              className="text-xs font-medium text-emerald-400 hover:underline inline-flex items-center gap-1 pt-2"
            >
              <span>Read engineering notes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Tech Stack (7 cols) + Experience Timeline (5 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* TECH STACK BENTO CARD */}
        <div className={`md:col-span-7 rounded-2xl border p-6 transition-all ${themeClasses.card}`}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider font-mono">
                Tech Stack & Tooling
              </h3>
            </div>
            <span className={`text-xs font-mono ${themeClasses.textSubtle}`}>
              Production-Tested
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(TECH_STACK).map(([group, skills]) => (
              <div key={group}>
                <div className={`text-xs font-mono mb-2 ${themeClasses.textSubtle}`}>
                  {group}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-transform hover:-translate-y-0.5 ${themeClasses.pill}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE TIMELINE BENTO CARD */}
        <div className={`md:col-span-5 rounded-2xl border p-6 flex flex-col justify-between transition-all ${themeClasses.card}`}>
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider font-mono">
                  Experience Timeline
                </h3>
              </div>
              <span className={`text-xs font-mono ${themeClasses.textSubtle}`}>
                Career
              </span>
            </div>

            <div className="relative pl-4 border-l border-zinc-700/60 space-y-6">
              {EXPERIENCE_ITEMS.map((exp, idx) => (
                <div key={idx} className="relative">
                  <span className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ${
                    exp.active
                      ? 'bg-emerald-500 ring-4 ring-emerald-500/20'
                      : 'bg-zinc-500'
                  }`} />
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold">{exp.role}</h4>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      exp.active
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : `${themeClasses.textSubtle}`
                    }`}>
                      {exp.period}
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed ${themeClasses.textMuted}`}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-6 pt-3 border-t ${themeClasses.border} flex items-center justify-between text-xs`}>
            <span className={themeClasses.textSubtle}>Want the full breakdown?</span>
            <button
              onClick={handleDownloadResume}
              className="text-emerald-400 hover:underline font-medium flex items-center gap-1"
            >
              <span>Get Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Selected Featured Work (Top 3 Pinned Projects) */}
      <section className="pt-2 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-lg font-bold tracking-tight">
                Selected Featured Work (Top 3)
              </h3>
            </div>
            <p className={`text-xs mt-0.5 ${themeClasses.textMuted}`}>
              High-impact systems across Data Engineering, Analytics, and Backend AI.
            </p>
          </div>

          <button
            onClick={onNavigateArchive}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all group ${themeClasses.card}`}
          >
            <span>View Full Project Archive ({projects.length} Projects)</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-emerald-400" />
          </button>
        </div>

        {/* 3-Column Bento Grid for Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onOpenCaseStudy?.(project)}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all group cursor-pointer hover:border-emerald-500/40 hover:shadow-xl hover:-translate-y-1 ${themeClasses.card}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium">
                    0{idx + 1} • {project.category}
                  </span>
                  <span className={`text-xs font-mono ${themeClasses.textSubtle}`}>
                    {project.year}
                  </span>
                </div>

                <h4 className="text-base font-bold tracking-tight group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h4>

                <p className={`text-xs leading-relaxed mt-2.5 ${themeClasses.textMuted}`}>
                  {project.description}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {project.metrics && (
                  <div className={`px-3 py-2 rounded-xl border text-[11px] font-mono ${themeClasses.cardSubtle}`}>
                    ⚡ {project.metrics}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] px-2 py-0.5 rounded border font-mono ${themeClasses.pill}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`pt-3 border-t ${themeClasses.border} flex items-center justify-between text-xs`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCaseStudy?.(project);
                    }}
                    className="inline-flex items-center gap-1 font-medium text-emerald-400 hover:underline"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-1 text-[11px] font-mono hover:text-white transition-colors ${themeClasses.textSubtle}`}
                    >
                      <span>Repo</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 1-Click Jump Banner to Archive */}
        <div className={`rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${themeClasses.card}`}>
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold">
                Looking for more scripts, templates, or older builds?
              </h4>
              <p className={`text-xs mt-0.5 ${themeClasses.textMuted}`}>
                Browse the complete filterable library of {projects.length} projects—or add new ones dynamically.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateArchive}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 shrink-0 transition-all ${
              darkMode
                ? 'bg-zinc-100 text-zinc-900 hover:bg-white'
                : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            <span>View Full Project Archive ({projects.length}) →</span>
          </button>
        </div>
      </section>

      {/* Row 4: Off-Screen & Creative Spotlight */}
      <section className={`rounded-2xl border p-6 sm:p-8 transition-all ${themeClasses.card}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/60">
          <div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                // Off-Screen & Product Lab
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight mt-1">
              Creative Craft, Notion Systems & Product Strategy
            </h3>
            <p className={`text-xs mt-0.5 ${themeClasses.textMuted}`}>
              Because great engineering pairs best with tactile design and product thinking.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() =>
                setHubMode(hubMode === 'creative' ? 'engineering' : 'creative')
              }
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                hubMode === 'creative'
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  : `${themeClasses.cardSubtle} ${themeClasses.textMuted}`
              }`}
            >
              {hubMode === 'creative' ? '★ Highlighted View' : 'Toggle Spotlight'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {CREATIVE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                hubMode === 'creative'
                  ? 'border-amber-500/40 bg-amber-500/[0.03]'
                  : themeClasses.cardSubtle
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {item.badge}
                  </span>
                  <span className={`text-[11px] font-mono ${themeClasses.textSubtle}`}>
                    {item.subtitle}
                  </span>
                </div>

                <h4 className="text-sm font-bold mt-2">{item.title}</h4>
                <p className={`text-xs leading-relaxed mt-2 ${themeClasses.textMuted}`}>
                  {item.description}
                </p>
              </div>

              <ul className="mt-4 pt-3 border-t border-zinc-800/40 space-y-1">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className={`text-[11px] font-mono flex items-center gap-1.5 ${themeClasses.textSubtle}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
