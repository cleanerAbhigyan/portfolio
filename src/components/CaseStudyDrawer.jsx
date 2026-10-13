import React, { useEffect } from 'react';
import {
  X,
  ArrowUpRight,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Workflow,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/**
 * CaseStudyDrawer
 * Slide-over drawer detailing problem statements, system architecture pipelines,
 * technical tradeoffs, and measured engineering impact.
 */
export default function CaseStudyDrawer({
  isOpen = false,
  onClose,
  project,
  darkMode = true
}) {
  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const caseStudy = project.caseStudy || {
    problem: project.description,
    architectureNodes: [
      { title: 'Data Intake / Ingestion', desc: 'Raw event stream & webhook payloads' },
      { title: 'Core Processing Worker', desc: 'Data cleansing, validation & transformation' },
      { title: 'Persistence / Storage', desc: 'Relational tables with transactional integrity' },
      { title: 'Telemetry & Client API', desc: 'Sub-second queries & real-time monitoring' }
    ],
    decisions: [
      { title: 'Modular Separation of Concerns', desc: 'Isolated ETL ingestion pipelines from client queries to avoid lock contention.' },
      { title: 'Fault-Tolerant Retries', desc: 'Configured exponential backoffs for network stability.' }
    ],
    impact: project.metrics || 'Production Ready System'
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className="relative w-full max-w-2xl h-full bg-[#0c0c0e]/95 backdrop-blur-2xl border-l border-zinc-800 text-zinc-100 shadow-2xl flex flex-col z-10 overflow-hidden"
        style={{
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Sticky Header */}
        <div className="p-6 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {project.year}
              </span>
              {project.status && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                  {project.status}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {project.link && project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-xs font-medium text-zinc-200 hover:text-white transition-colors"
                >
                  <span>Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl border border-zinc-800 hover:bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors"
                title="Close Drawer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {project.title}
            </h2>
            {project.metrics && (
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{project.metrics}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* 01. Problem Statement */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>01. Operational Bottleneck & Problem Statement</span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm leading-relaxed text-zinc-300">
              {caseStudy.problem}
            </div>
          </section>

          {/* 02. System Architecture Pipeline Diagram */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                <Workflow className="w-4 h-4" />
                <span>02. End-to-End System Architecture</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                Pipeline Topology
              </span>
            </div>

            {/* Architecture Node Flow */}
            <div className="space-y-3">
              {caseStudy.architectureNodes?.map((node, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/40 transition-all flex items-start gap-3.5 group">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-zinc-800/80 border border-zinc-700 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                        {node.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {idx < caseStudy.architectureNodes.length - 1 && (
                    <div className="py-1 text-zinc-600 flex items-center justify-center">
                      <span className="text-xs font-mono opacity-60">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 03. Key Architectural Decisions & Tradeoffs */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>03. Architectural Decisions & Tradeoffs</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {caseStudy.decisions?.map((dec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 space-y-1"
                >
                  <div className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{dec.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-3.5">
                    {dec.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Pills */}
          <section className="space-y-2">
            <span className="text-xs font-mono text-zinc-500 uppercase">
              Technology Stack Used:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* 04. Measured Production Impact */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>04. Quantified Engineering Impact</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-200">
              <div className="text-xs font-mono text-emerald-400 font-semibold uppercase mb-1">
                // Outcome Metric
              </div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-emerald-100">
                {caseStudy.impact}
              </p>
            </div>
          </section>
        </div>

        {/* Drawer Footer Bar */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          >
            Close Drawer (Esc)
          </button>

          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-colors"
            >
              <span>Explore Code / Deployment</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </aside>
    </div>
  );
}
