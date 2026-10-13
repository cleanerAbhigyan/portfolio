import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  X,
  Trash2,
  ArrowUpRight,
  Sparkles,
  Filter,
  CheckCircle2,
  Database
} from 'lucide-react';

export default function ProjectArchive({
  projects = [],
  setProjects,
  onBackToHome,
  isCmsAdmin = false,
  onOpenExportModal,
  onOpenCaseStudy,
  showToast,
  themeClasses
}) {
  const [archiveCategory, setArchiveCategory] = useState('All');
  const [archiveSearch, setArchiveSearch] = useState('');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const [newProject, setNewProject] = useState({
    title: '',
    year: '2026',
    category: 'Data Engineering',
    description: '',
    metrics: '',
    tags: '',
    link: 'https://github.com',
    featured: false,
    problem: '',
    architectureNodes: '',
    decisions: '',
    impact: ''
  });

  const categories = [
    'All',
    'Data Engineering',
    'Backend & Web',
    'AI & Automation',
    'Product & Creative'
  ];

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const pipelineSteps = newProject.architectureNodes
      ? newProject.architectureNodes
          .split(',')
          .map((n, i) => ({
            title: n.trim(),
            desc: `Pipeline Stage 0${i + 1} for ${newProject.title.trim()}`
          }))
          .filter((n) => n.title.length > 0)
      : [
          { title: 'Intake & Source', desc: 'Raw event stream ingestion' },
          { title: 'Validation & ETL Worker', desc: 'Normalization and cleaning pipeline' },
          { title: 'Relational Database', desc: 'Transactional persistence' },
          { title: 'Telemetry & UI Gateway', desc: 'Sub-second API and dashboard analytics' }
        ];

    const created = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      year: newProject.year || '2026',
      category: newProject.category,
      featured: Boolean(newProject.featured),
      description: newProject.description.trim() || 'Custom engineering project added via portfolio CMS.',
      metrics: newProject.metrics.trim() || 'Production Ready',
      tags: newProject.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      link: newProject.link.trim() || '#',
      status: 'Active',
      caseStudy: {
        problem: newProject.problem.trim() || newProject.description.trim() || 'Automated data and workflow architecture built for high reliability.',
        architectureNodes: pipelineSteps,
        decisions: newProject.decisions.trim()
          ? [{ title: 'Key Architectural Tradeoff', desc: newProject.decisions.trim() }]
          : [{ title: 'Idempotency & Modular Isolation', desc: 'Designed for fault tolerance and zero data collisions.' }],
        impact: newProject.impact.trim() || newProject.metrics.trim() || 'Verified in production environment.'
      }
    };

    setProjects([created, ...projects]);
    setNewProject({
      title: '',
      year: '2026',
      category: 'Data Engineering',
      description: '',
      metrics: '',
      tags: '',
      link: 'https://github.com',
      featured: false,
      problem: '',
      architectureNodes: '',
      decisions: '',
      impact: ''
    });
    setShowAddProjectModal(false);
    showToast?.(`Added "${created.title}" to Project Archive!`);
  };

  const handleDeleteProject = (id, title) => {
    setProjects(projects.filter((p) => p.id !== id));
    showToast?.(`Removed "${title}" from archive.`);
  };

  const handleToggleFeaturedProject = (id) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
    showToast?.('Updated featured status on Bento Grid.');
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCategory =
        archiveCategory === 'All' || proj.category === archiveCategory;
      const query = archiveSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        proj.title.toLowerCase().includes(query) ||
        proj.description.toLowerCase().includes(query) ||
        proj.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [projects, archiveCategory, archiveSearch]);

  return (
    <div className="space-y-6 pt-2">
      {/* Archive Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button
            onClick={onBackToHome}
            className={`text-xs font-mono mb-2 inline-flex items-center gap-1 hover:underline ${themeClasses.textMuted}`}
          >
            ← Back to Bento Hub
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Full Project Archive
          </h2>
          <p className={`text-sm mt-1 ${themeClasses.textMuted}`}>
            A complete directory of data pipelines, backend services, AI tools, and creative builds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCmsAdmin && onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              title="Export changes to src/data/initialData.js"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono text-xs sm:text-sm transition-all shadow-sm"
            >
              <Database className="w-4 h-4" />
              <span>Export initialData.js</span>
            </button>
          )}

          <button
            onClick={() => setShowAddProjectModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className={`rounded-2xl border p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${themeClasses.card}`}>
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setArchiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap border transition-all ${
                archiveCategory === cat
                  ? themeClasses.pillActive
                  : `${themeClasses.pill} hover:opacity-90`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Keyword Search Input */}
        <div className="relative min-w-[240px]">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textSubtle}`} />
          <input
            type="text"
            value={archiveSearch}
            onChange={(e) => setArchiveSearch(e.target.value)}
            placeholder="Filter by title or tech (e.g. Python, Docker)..."
            className={`w-full pl-9 pr-8 py-1.5 rounded-xl border text-xs focus:outline-none ${themeClasses.input}`}
          />
          {archiveSearch && (
            <button
              onClick={() => setArchiveSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Modal / Inline Drawer: Add New Project */}
      {showAddProjectModal && (
        <form
          onSubmit={handleAddProject}
          className={`rounded-2xl border p-6 space-y-4 shadow-xl ${themeClasses.card}`}
        >
          <div className="flex items-center justify-between border-b pb-3 border-zinc-800">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold">Add New Project to Archive</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddProjectModal(false)}
              className={themeClasses.textMuted}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono mb-1">Project Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Automated Kafka Consumer Service"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-1">Category</label>
              <select
                value={newProject.category}
                onChange={(e) =>
                  setNewProject({ ...newProject, category: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
              >
                <option value="Data Engineering">Data Engineering</option>
                <option value="Backend & Web">Backend & Web</option>
                <option value="AI & Automation">AI & Automation</option>
                <option value="Product & Creative">Product & Creative</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono mb-1">Year</label>
              <input
                type="text"
                value={newProject.year}
                onChange={(e) =>
                  setNewProject({ ...newProject, year: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
              />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1">
                Built With (comma-separated tags)
              </label>
              <input
                type="text"
                placeholder="Python, Docker, SQL, FastAPI"
                value={newProject.tags}
                onChange={(e) =>
                  setNewProject({ ...newProject, tags: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
              />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1">Key Outcome / Metric</label>
              <input
                type="text"
                placeholder="e.g., 3x faster query speed"
                value={newProject.metrics}
                onChange={(e) =>
                  setNewProject({ ...newProject, metrics: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono mb-1">One-Line Description</label>
              <input
                type="text"
                placeholder="What problem does this solve and how was it architected?"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-1">Project Link / Repo</label>
              <input
                type="text"
                placeholder="https://github.com/..."
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({ ...newProject, link: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
              />
            </div>
          </div>

          {/* Deep Case Study Optional Fields */}
          <div className="pt-2 border-t border-zinc-800/60 space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider block">
              // Deep Case Study Details (Optional)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono mb-1">
                  Problem Statement / Bottleneck Solved
                </label>
                <input
                  type="text"
                  placeholder="e.g., Manual sync collisions and lost billable hours across ERP"
                  value={newProject.problem}
                  onChange={(e) =>
                    setNewProject({ ...newProject, problem: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
                />
              </div>

              <div>
                <label className="block text-xs font-mono mb-1">
                  Architecture Pipeline Stages (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Webhook Ingestion, Python ETL, Redis Buffer, Telemetry UI"
                  value={newProject.architectureNodes}
                  onChange={(e) =>
                    setNewProject({ ...newProject, architectureNodes: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono mb-1">
                  Key Tradeoff / Architectural Decision
                </label>
                <input
                  type="text"
                  placeholder="e.g., SHA-256 idempotency keys prevented duplicate records"
                  value={newProject.decisions}
                  onChange={(e) =>
                    setNewProject({ ...newProject, decisions: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
                />
              </div>

              <div>
                <label className="block text-xs font-mono mb-1">
                  Quantified Engineering Impact
                </label>
                <input
                  type="text"
                  placeholder="e.g., 99.8% sync reliability • 40 hrs/mo saved"
                  value={newProject.impact}
                  onChange={(e) =>
                    setNewProject({ ...newProject, impact: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${themeClasses.input}`}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <label className="inline-flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={newProject.featured}
                onChange={(e) =>
                  setNewProject({ ...newProject, featured: e.target.checked })
                }
                className="rounded border-zinc-700 accent-emerald-500"
              />
              <span>Pin to Home Bento Grid (Featured Top 3)</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddProjectModal(false)}
                className={`px-3 py-2 rounded-xl border text-xs ${themeClasses.card}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
              >
                Save Project
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Archive Table */}
      <div className={`rounded-2xl border overflow-hidden ${themeClasses.card}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-[11px] font-mono uppercase ${themeClasses.border} ${themeClasses.textSubtle}`}>
                <th className="py-3.5 px-4">Year</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Built With</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-xs sm:text-sm">
              {filteredProjects.map((proj) => (
                <tr
                  key={proj.id}
                  className="group hover:bg-zinc-500/[0.04] transition-colors"
                >
                  <td className={`py-4 px-4 font-mono text-xs whitespace-nowrap align-top ${themeClasses.textSubtle}`}>
                    {proj.year}
                  </td>
                  <td className="py-4 px-4 align-top max-w-md">
                    <div
                      onClick={() => onOpenCaseStudy?.(proj)}
                      className="font-semibold flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition-colors"
                    >
                      <span>{proj.title}</span>
                      {proj.featured && (
                        <span
                          title="Featured on Home Hub"
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${themeClasses.textMuted}`}>
                      {proj.description}
                    </p>
                    {proj.metrics && (
                      <div className="text-[11px] font-mono text-emerald-400/90 mt-1">
                        ⚡ {proj.metrics}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell align-top whitespace-nowrap">
                    <span className={`text-xs px-2.5 py-1 rounded-md border ${themeClasses.pill}`}>
                      {proj.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 hidden sm:table-cell align-top">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className={`text-[11px] font-mono px-2 py-0.5 rounded border ${themeClasses.pill}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right align-top whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => onOpenCaseStudy?.(proj)}
                        title="Inspect Case Study"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>

                      {isCmsAdmin && (
                        <>
                          <button
                            onClick={() => handleToggleFeaturedProject(proj.id)}
                            title="Toggle Featured on Home Bento"
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              proj.featured
                                ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                                : `${themeClasses.cardSubtle} ${themeClasses.textSubtle}`
                            }`}
                          >
                            ★
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            title="Delete Project"
                            className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-emerald-400 hover:underline"
                      >
                        <span>Link</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <p className={`text-sm ${themeClasses.textMuted}`}>
                      No projects match your current filter.
                    </p>
                    <button
                      onClick={() => {
                        setArchiveCategory('All');
                        setArchiveSearch('');
                      }}
                      className="mt-2 text-xs text-emerald-400 hover:underline font-mono"
                    >
                      Reset Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
