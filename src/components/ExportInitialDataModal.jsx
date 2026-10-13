import React, { useState, useMemo } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Upload,
  FileCode,
  Database,
  Sparkles,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import {
  TECH_STACK,
  EXPERIENCE_ITEMS,
  CREATIVE_ITEMS
} from '../data/initialData';

/**
 * Generates valid ES Module code matching src/data/initialData.js
 */
export function generateInitialDataJs({
  projects,
  posts,
  creativeItems = CREATIVE_ITEMS,
  techStack = TECH_STACK,
  experienceItems = EXPERIENCE_ITEMS
}) {
  const projectsStr = JSON.stringify(projects, null, 2);
  const postsStr = JSON.stringify(posts, null, 2);
  const creativeStr = JSON.stringify(creativeItems, null, 2);
  const techStackStr = JSON.stringify(techStack, null, 2);
  const expStr = JSON.stringify(experienceItems, null, 2);

  return `export const INITIAL_PROJECTS = ${projectsStr};

export const INITIAL_POSTS = ${postsStr};

export const CREATIVE_ITEMS = ${creativeStr};

export const TECH_STACK = ${techStackStr};

export const EXPERIENCE_ITEMS = ${expStr};
`;
}

export default function ExportInitialDataModal({
  isOpen,
  onClose,
  projects = [],
  posts = [],
  onImportBackup,
  showToast,
  darkMode = true
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'json'

  const generatedJsCode = useMemo(() => {
    return generateInitialDataJs({
      projects,
      posts,
      creativeItems: CREATIVE_ITEMS,
      techStack: TECH_STACK,
      experienceItems: EXPERIENCE_ITEMS
    });
  }, [projects, posts]);

  const jsonBackupStr = useMemo(() => {
    const backupObj = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      projects,
      posts,
      creativeItems: CREATIVE_ITEMS,
      techStack: TECH_STACK,
      experienceItems: EXPERIENCE_ITEMS
    };
    return JSON.stringify(backupObj, null, 2);
  }, [projects, posts]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    const content = activeTab === 'code' ? generatedJsCode : jsonBackupStr;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content);
    }
    setCopiedCode(true);
    showToast?.(
      activeTab === 'code'
        ? 'Copied initialData.js to clipboard!'
        : 'Copied JSON backup to clipboard!'
    );
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleDownloadFile = () => {
    const isJs = activeTab === 'code';
    const filename = isJs ? 'initialData.js' : 'portfolio-backup.json';
    const mimeType = isJs ? 'text/javascript' : 'application/json';
    const content = isJs ? generatedJsCode : jsonBackupStr;

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast?.(`Downloaded ${filename} successfully!`);
  };

  const handleImportJsonFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (onImportBackup) {
          onImportBackup(parsed);
          showToast?.(
            `Restored ${parsed.projects?.length || 0} projects & ${
              parsed.posts?.length || 0
            } blog posts from backup!`
          );
          onClose();
        }
      } catch (err) {
        console.error('Failed to parse backup JSON', err);
        showToast?.('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl border flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden ${
          darkMode
            ? 'bg-[#0f0f12] border-zinc-800 text-zinc-100'
            : 'bg-white border-zinc-300 text-zinc-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">
                  Sync & Export to Codebase
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Production Ready
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Bake live browser <code className="text-emerald-400 font-mono">localStorage</code> changes into <code className="text-emerald-400 font-mono">src/data/initialData.js</code>.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Stats Bar */}
        <div className="px-6 py-3 bg-zinc-900/60 border-b border-zinc-800/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
          <div className="flex items-center gap-4 text-zinc-400">
            <span>
              Projects: <strong className="text-zinc-200">{projects.length}</strong>
            </span>
            <span>•</span>
            <span>
              Blog Posts: <strong className="text-zinc-200">{posts.length}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sync Ready</span>
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-950 border border-zinc-800">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-emerald-500 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ES Module (initialData.js)
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                activeTab === 'json'
                  ? 'bg-emerald-500 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              JSON Backup
            </button>
          </div>
        </div>

        {/* Code Preview Body */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs leading-relaxed">
          <div className="rounded-xl border border-zinc-800 bg-[#09090b] p-4 overflow-x-auto relative shadow-inner">
            <pre className="text-zinc-300 selection:bg-emerald-500/30 selection:text-emerald-300">
              <code>{activeTab === 'code' ? generatedJsCode : jsonBackupStr}</code>
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-zinc-900/80 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Left Action: Import JSON */}
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-sky-400" />
              <span>Import JSON Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJsonFile}
                className="hidden"
              />
            </label>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              Restore past projects & posts
            </span>
          </div>

          {/* Right Actions: Copy & Download */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-medium font-mono transition-all hover:scale-[1.02]"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>
                    Copy {activeTab === 'code' ? 'initialData.js' : 'JSON'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadFile}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs font-mono transition-all shadow-sm hover:scale-[1.02]"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>
                Download {activeTab === 'code' ? 'initialData.js' : 'Backup.json'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
