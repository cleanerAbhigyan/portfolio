import React, { useState, useMemo } from 'react';
import {
  Edit3,
  Plus,
  Trash2,
  ChevronRight,
  Save,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Copy,
  Check,
  Download,
  Upload,
  FileDown,
  X,
  Clock,
  Database,
  FileText
} from 'lucide-react';

/**
 * Tokenizes and applies syntax highlighting classes to code lines
 */
function highlightCode(code, lang = 'code') {
  const lines = code.split('\n');
  const keywords = new Set([
    'def', 'class', 'return', 'import', 'from', 'as', 'if', 'elif', 'else',
    'for', 'while', 'try', 'except', 'with', 'in', 'is', 'not', 'const',
    'let', 'var', 'function', 'async', 'await', 'export', 'default',
    'null', 'undefined', 'true', 'false', 'SELECT', 'FROM', 'WHERE',
    'JOIN', 'LEFT', 'RIGHT', 'INNER', 'GROUP', 'ORDER', 'BY', 'LIMIT',
    'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP',
    'RUN', 'CMD', 'COPY', 'WORKDIR', 'EXPOSE', 'ENV', 'npm', 'npx', 'git'
  ]);

  return lines.map((line) => {
    if (!line) return <span>&nbsp;</span>;

    const trimmed = line.trim();
    if (
      trimmed.startsWith('#') ||
      trimmed.startsWith('//') ||
      trimmed.startsWith('--')
    ) {
      return <span className="text-zinc-500 italic">{line}</span>;
    }

    const tokens = [];
    const regex =
      /("[^"]*"|'[^']*'|`[^`]*`|\b\d+(\.\d+)?\b|\b[A-Za-z_]\w*\b|[=+\-*/<>!&|^~%]+|[^\s\w]+|\s+)/g;

    let match;
    let keyIdx = 0;

    while ((match = regex.exec(line)) !== null) {
      const val = match[0];
      const matchIdx = keyIdx++;

      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'")) ||
        (val.startsWith('`') && val.endsWith('`'))
      ) {
        tokens.push(
          <span key={matchIdx} className="text-emerald-300">
            {val}
          </span>
        );
      } else if (keywords.has(val) || keywords.has(val.toUpperCase())) {
        tokens.push(
          <span key={matchIdx} className="text-purple-400 font-semibold">
            {val}
          </span>
        );
      } else if (/^\d+(\.\d+)?$/.test(val)) {
        tokens.push(
          <span key={matchIdx} className="text-amber-300">
            {val}
          </span>
        );
      } else if (line[regex.lastIndex] === '(') {
        tokens.push(
          <span key={matchIdx} className="text-sky-300">
            {val}
          </span>
        );
      } else if (/^[=+\-*/<>!&|^~%]+$/.test(val)) {
        tokens.push(
          <span key={matchIdx} className="text-rose-400">
            {val}
          </span>
        );
      } else {
        tokens.push(
          <span key={matchIdx} className="text-zinc-200">
            {val}
          </span>
        );
      }
    }

    return tokens.length > 0 ? tokens : <span>{line}</span>;
  });
}

/**
 * Fenced Code Block component with language badge and working copy button
 */
function CodeBlock({ code, lang = 'code' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedLines = useMemo(() => {
    return highlightCode(code, lang);
  }, [code, lang]);

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#09090b] my-5 overflow-hidden shadow-2xl">
      {/* Titlebar Header */}
      <div className="px-4 py-2.5 bg-zinc-950/90 border-b border-zinc-800/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider pl-1.5 border-l border-zinc-800">
            {lang}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all text-[11px]"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed selection:bg-emerald-500/30">
        <table className="w-full border-collapse">
          <tbody>
            {highlightedLines.map((lineTokens, lineIdx) => (
              <tr key={lineIdx} className="hover:bg-zinc-800/20">
                <td className="pr-4 select-none text-right text-zinc-600 text-[11px] font-mono w-8 align-top">
                  {lineIdx + 1}
                </td>
                <td className="whitespace-pre">
                  {lineTokens}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Formats inline Markdown elements (`code` and **bold**)
 */
function renderFormattedInlineText(text) {
  if (!text) return null;

  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const codeSnippet = part.slice(1, -1);
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded font-mono text-[0.85em] bg-zinc-800/80 text-emerald-400 border border-zinc-700/60 font-medium"
        >
          {codeSnippet}
        </code>
      );
    }

    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length >= 4) {
        return (
          <strong key={bIdx} className="font-semibold text-zinc-100">
            {bPart.slice(2, -2)}
          </strong>
        );
      }
      return bPart;
    });
  });
}

/**
 * Parses markdown body into structural blocks (code, images, headings, lists, paragraphs)
 */
function parseMarkdownBlocks(rawMarkdown) {
  if (!rawMarkdown) return [];
  const blocks = [];
  const lines = rawMarkdown.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced Code Block: ```lang ... ```
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim() || 'code';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        type: 'code',
        lang: lang.toLowerCase(),
        content: codeLines.join('\n')
      });
      continue;
    }

    // Markdown Image: ![Alt Text](imageUrl)
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      blocks.push({
        type: 'image',
        alt: imgMatch[1],
        src: imgMatch[2]
      });
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      blocks.push({
        type: 'h3',
        content: line.slice(4).trim()
      });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({
        type: 'h2',
        content: line.slice(3).trim()
      });
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push({
        type: 'h1',
        content: line.slice(2).trim()
      });
      i++;
      continue;
    }

    // Bullet List
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const listItems = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        listItems.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({
        type: 'list',
        items: listItems
      });
      continue;
    }

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      !lines[i].trim().match(/^!\[(.*?)\]\((.*?)\)$/)
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({
      type: 'p',
      content: paraLines.join('\n')
    });
  }

  return blocks;
}

export default function BlogCMS({
  posts = [],
  setPosts,
  onBackToHome,
  isCmsAdmin = false,
  setIsCmsAdmin,
  onOpenExportModal,
  showToast,
  themeClasses
}) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null); // null | 'new' | postId
  const [lightboxImg, setLightboxImg] = useState(null); // null | { src, alt }

  const [postForm, setPostForm] = useState({
    id: '',
    title: '',
    category: 'Data Engineering',
    readTime: '5 min read',
    tags: 'Python, Architecture, Backend',
    excerpt: '',
    content: ''
  });

  // Dynamic live word count & reading time calculation
  const wordCount = useMemo(() => {
    return postForm.content.trim().split(/\s+/).filter(Boolean).length;
  }, [postForm.content]);

  const computedReadTime = useMemo(() => {
    const mins = Math.max(1, Math.ceil(wordCount / 200));
    return `${mins} min read`;
  }, [wordCount]);

  const startNewPost = () => {
    setEditingPost('new');
    setPostForm({
      id: '',
      title: '',
      category: 'Data Engineering',
      readTime: '3 min read',
      tags: 'Python, Architecture, Backend',
      excerpt: '',
      content: `### Architecture Overview

Write your technical thoughts, architecture notes, or tutorial steps here...

### Implementation Mechanics

- Resilient distributed queues and retry mechanisms
- Schema validations with zero latency penalty
- Benchmarks and memory footprint reductions

\`\`\`python
import time

def execute_pipeline(payload):
    # Idempotent execution logic
    return {"status": "success", "latency_ms": 42}
\`\`\`

### Key Engineering Takeaways

Summarize the key architectural decisions and metrics gained.`
    });
  };

  const startEditPost = (post) => {
    setEditingPost(post.id);
    setPostForm({
      id: post.id,
      title: post.title,
      category: post.category,
      readTime: post.readTime,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      excerpt: post.excerpt,
      content: post.content
    });
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    if (!postForm.title.trim()) return;

    const formattedTags = postForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingPost === 'new') {
      const newArticle = {
        id: `post-${Date.now()}`,
        title: postForm.title.trim(),
        date: 'Oct 2026',
        readTime: computedReadTime,
        category: postForm.category,
        tags: formattedTags.length ? formattedTags : ['Engineering'],
        excerpt:
          postForm.excerpt.trim() ||
          postForm.content.slice(0, 120).replace(/#/g, '') + '...',
        content: postForm.content
      };
      setPosts([newArticle, ...posts]);
      setSelectedPost(newArticle);
      showToast?.('Published new article to Blog!');
    } else {
      const updatedList = posts.map((p) =>
        p.id === editingPost
          ? {
              ...p,
              title: postForm.title.trim(),
              category: postForm.category,
              readTime: computedReadTime,
              tags: formattedTags,
              excerpt: postForm.excerpt.trim(),
              content: postForm.content
            }
          : p
      );
      setPosts(updatedList);
      const found = updatedList.find((p) => p.id === editingPost);
      if (selectedPost && selectedPost.id === editingPost) {
        setSelectedPost(found);
      }
      showToast?.('Saved changes to article!');
    }
    setEditingPost(null);
  };

  const handleDeletePost = (id, title) => {
    setPosts(posts.filter((p) => p.id !== id));
    if (selectedPost?.id === id) setSelectedPost(null);
    showToast?.(`Deleted post "${title}".`);
  };

  // Download Article as .md file with YAML frontmatter
  const handleDownloadMarkdown = (post) => {
    const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
category: "${post.category}"
date: "${post.date}"
readTime: "${post.readTime}"
tags: [${(post.tags || []).map((t) => `"${t}"`).join(', ')}]
excerpt: "${(post.excerpt || '').replace(/"/g, '\\"')}"
---

${post.content}
`;
    const slug = (post.title || 'article')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const blob = new Blob([frontmatter], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast?.(`Downloaded "${post.title}.md"!`);
  };

  // Import .md File into CMS Editor
  const handleImportMarkdownFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const raw = event.target.result || '';
      let parsedTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      let parsedCategory = 'Data Engineering';
      let parsedTags = 'Python, Architecture';
      let parsedExcerpt = '';
      let parsedContent = raw;

      // Extract YAML frontmatter if present
      const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (fmMatch) {
        const frontmatter = fmMatch[1];
        parsedContent = fmMatch[2].trim();

        const titleMatch = frontmatter.match(/title:\s*["']?(.*?)["']?$/m);
        if (titleMatch) parsedTitle = titleMatch[1];

        const catMatch = frontmatter.match(/category:\s*["']?(.*?)["']?$/m);
        if (catMatch) parsedCategory = catMatch[1];

        const tagsMatch = frontmatter.match(/tags:\s*\[?(.*?)\]?$/m);
        if (tagsMatch) parsedTags = tagsMatch[1].replace(/["']/g, '');

        const excMatch = frontmatter.match(/excerpt:\s*["']?(.*?)["']?$/m);
        if (excMatch) parsedExcerpt = excMatch[1];
      } else {
        const headingMatch = raw.match(/^#+\s*(.+)$/m);
        if (headingMatch) {
          parsedTitle = headingMatch[1].trim();
        }
      }

      setPostForm({
        id: editingPost === 'new' ? '' : postForm.id,
        title: parsedTitle,
        category: parsedCategory,
        readTime:
          Math.max(
            1,
            Math.ceil(parsedContent.trim().split(/\s+/).filter(Boolean).length / 200)
          ) + ' min read',
        tags: parsedTags,
        excerpt: parsedExcerpt || parsedContent.slice(0, 140).replace(/#/g, '') + '...',
        content: parsedContent
      });

      showToast?.(`Imported "${parsedTitle}" from ${file.name}!`);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Blog Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => {
              if (selectedPost || editingPost) {
                setSelectedPost(null);
                setEditingPost(null);
              } else {
                onBackToHome?.();
              }
            }}
            className={`text-xs font-mono mb-2 inline-flex items-center gap-1 hover:underline ${themeClasses.textMuted}`}
          >
            ← {selectedPost || editingPost ? 'Back to All Articles' : 'Back to Bento Hub'}
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Engineering Notes & CMS
          </h2>
          <p className={`text-sm mt-1 ${themeClasses.textMuted}`}>
            Deep dives on REST architectures, Node.js internals, Docker, and data engineering.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenExportModal && isCmsAdmin && (
            <button
              onClick={onOpenExportModal}
              title="Export changes to src/data/initialData.js"
              className="px-3 py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono inline-flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Export initialData.js</span>
            </button>
          )}

          <button
            onClick={() => setIsCmsAdmin(!isCmsAdmin)}
            className={`px-3 py-2 rounded-xl border text-xs font-mono inline-flex items-center gap-1.5 transition-all ${
              isCmsAdmin
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : `${themeClasses.card} ${themeClasses.textMuted}`
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isCmsAdmin ? 'CMS Admin: Active' : 'Enable CMS Editor'}</span>
          </button>

          <button
            onClick={() => {
              setIsCmsAdmin(true);
              startNewPost();
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs inline-flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* VIEW A: CMS Post Editor */}
      {editingPost ? (
        <form
          onSubmit={handleSavePost}
          className={`rounded-2xl border p-6 space-y-5 shadow-2xl ${themeClasses.card}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-zinc-800">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold">
                {editingPost === 'new' ? 'Create New Blog Post' : 'Edit Blog Post'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {/* Import .md File Button */}
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-sky-400" />
                <span>Import .md File</span>
                <input
                  type="file"
                  accept=".md,.txt,.markdown"
                  onChange={handleImportMarkdownFile}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className={`text-xs hover:text-zinc-200 px-2 py-1 ${themeClasses.textMuted}`}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono mb-1">Article Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Designing Idempotent Data Pipelines in Python"
                value={postForm.title}
                onChange={(e) =>
                  setPostForm({ ...postForm, title: e.target.value })
                }
                className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm ${themeClasses.input}`}
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-1">Category</label>
              <select
                value={postForm.category}
                onChange={(e) =>
                  setPostForm({ ...postForm, category: e.target.value })
                }
                className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm ${themeClasses.input}`}
              >
                <option value="Data Engineering">Data Engineering</option>
                <option value="Backend & Web">Backend & Web</option>
                <option value="DevOps & Containers">DevOps & Containers</option>
                <option value="AI & MCP">AI & MCP</option>
                <option value="Product & Systems">Product & Systems</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={postForm.tags}
                onChange={(e) =>
                  setPostForm({ ...postForm, tags: e.target.value })
                }
                className={`w-full px-3.5 py-2 rounded-xl border text-xs ${themeClasses.input}`}
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-1">Estimated Read Time</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-emerald-400">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{computedReadTime} (Auto)</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono mb-1">Short Excerpt</label>
            <input
              type="text"
              placeholder="1-2 sentence summary shown on the blog card..."
              value={postForm.excerpt}
              onChange={(e) =>
                setPostForm({ ...postForm, excerpt: e.target.value })
              }
              className={`w-full px-3.5 py-2 rounded-xl border text-xs ${themeClasses.input}`}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between mb-1 gap-2">
              <label className="text-xs font-mono">
                Article Body (Supports ```code, ![img](url), ### Headings, - Lists)
              </label>
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {wordCount} words
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">
                  {computedReadTime}
                </span>
              </div>
            </div>
            <textarea
              rows={14}
              required
              value={postForm.content}
              onChange={(e) =>
                setPostForm({ ...postForm, content: e.target.value })
              }
              className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm font-mono leading-relaxed ${themeClasses.input}`}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className={`px-4 py-2 rounded-xl border text-xs ${themeClasses.card}`}
            >
              Discard
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish</span>
            </button>
          </div>
        </form>
      ) : selectedPost ? (
        /* VIEW B: Single Article Reader View */
        <article className={`rounded-2xl border p-6 sm:p-10 max-w-3xl mx-auto shadow-xl ${themeClasses.card}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-800/60">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                {selectedPost.category}
              </span>
              <span className={themeClasses.textSubtle}>•</span>
              <span className={themeClasses.textSubtle}>{selectedPost.date}</span>
              <span className={themeClasses.textSubtle}>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Clock className="w-3 h-3" />
                {selectedPost.readTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Download .md Button */}
              <button
                onClick={() => handleDownloadMarkdown(selectedPost)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors ${themeClasses.cardSubtle} hover:border-zinc-500`}
                title="Download this article as a Markdown file"
              >
                <FileDown className="w-3.5 h-3.5 text-sky-400" />
                <span>Download .md</span>
              </button>

              <button
                onClick={() => startEditPost(selectedPost)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors ${themeClasses.cardSubtle} hover:border-emerald-500/40`}
              >
                <Edit3 className="w-3 h-3 text-emerald-400" />
                <span>Edit in CMS</span>
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-6 leading-tight">
            {selectedPost.title}
          </h2>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {selectedPost.tags?.map((t) => (
              <span
                key={t}
                className={`text-[11px] font-mono px-2 py-0.5 rounded border ${themeClasses.pill}`}
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Formatted Markdown Content Renderer with Code Highlighting & Lightbox */}
          <div className="mt-8 space-y-5 text-sm sm:text-base leading-relaxed">
            {parseMarkdownBlocks(selectedPost.content).map((block, index) => {
              if (block.type === 'h1') {
                return (
                  <h2
                    key={index}
                    className="text-xl sm:text-2xl font-bold tracking-tight pt-6 pb-2 border-b border-zinc-800 text-zinc-100"
                  >
                    {block.content}
                  </h2>
                );
              }
              if (block.type === 'h2') {
                return (
                  <h3
                    key={index}
                    className="text-lg sm:text-xl font-bold tracking-tight pt-5 text-zinc-100"
                  >
                    {block.content}
                  </h3>
                );
              }
              if (block.type === 'h3') {
                return (
                  <h4
                    key={index}
                    className="text-base sm:text-lg font-bold tracking-tight pt-4 text-zinc-100"
                  >
                    {block.content}
                  </h4>
                );
              }
              if (block.type === 'code') {
                return (
                  <CodeBlock
                    key={index}
                    code={block.content}
                    lang={block.lang}
                  />
                );
              }
              if (block.type === 'image') {
                return (
                  <figure key={index} className="my-6">
                    <div
                      onClick={() =>
                        setLightboxImg({ src: block.src, alt: block.alt })
                      }
                      className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/80 cursor-zoom-in group shadow-lg"
                    >
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full max-h-[460px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                    {block.alt && (
                      <figcaption className="text-center text-xs text-zinc-500 font-mono mt-2 italic">
                        {block.alt}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul
                    key={index}
                    className="space-y-1.5 my-3 pl-4 list-disc marker:text-emerald-400"
                  >
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className={themeClasses.textMuted}>
                        {renderFormattedInlineText(item)}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={index}
                  className={`whitespace-pre-line leading-relaxed ${themeClasses.textMuted}`}
                >
                  {renderFormattedInlineText(block.content)}
                </p>
              );
            })}
          </div>
        </article>
      ) : (
        /* VIEW C: Blog Post Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`rounded-2xl border p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 group hover:-translate-y-1 ${themeClasses.card}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-emerald-400 font-semibold">{post.category}</span>
                  <span className={themeClasses.textSubtle}>{post.date}</span>
                </div>

                <h3 className="text-base font-bold tracking-tight group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>

                <p className={`text-xs leading-relaxed mt-2.5 ${themeClasses.textMuted}`}>
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                <span className={`text-[11px] font-mono flex items-center gap-1 ${themeClasses.textSubtle}`}>
                  <Clock className="w-3 h-3 text-emerald-400/80" />
                  {post.readTime}
                </span>

                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isCmsAdmin && (
                    <>
                      <button
                        onClick={() => startEditPost(post)}
                        className={`p-1.5 rounded-lg border text-xs ${themeClasses.cardSubtle} hover:border-emerald-500/40`}
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-medium text-emerald-400 inline-flex items-center gap-1 group-hover:underline"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Zoom Modal for Images */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              className="max-w-full max-h-[85vh] rounded-2xl border border-zinc-700 shadow-2xl object-contain"
            />
            {lightboxImg.alt && (
              <div className="text-center text-xs text-zinc-300 font-mono mt-3">
                {lightboxImg.alt}
              </div>
            )}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
