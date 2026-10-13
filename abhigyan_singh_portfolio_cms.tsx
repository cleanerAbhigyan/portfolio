import React, { useState, useEffect, useMemo } from 'react';
import {
  Terminal,
  Database,
  Server,
  Layout,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  FileText,
  FolderGit2,
  BookOpen,
  Plus,
  Search,
  Sun,
  Moon,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Twitter,
  Edit3,
  Trash2,
  Eye,
  Save,
  X,
  ChevronRight,
  Layers,
  Cpu,
  Palette,
  Briefcase,
  Award,
  Filter,
  ExternalLink,
  Code2,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Enterprise Data Integration & REST Sync',
    year: '2025',
    category: 'Data Engineering',
    featured: true,
    description: 'Automated architecture synchronizing complex enterprise project schemas, task hierarchies, and resource allocations into OpenProject via REST APIs with idempotent retry logic.',
    metrics: '99.8% sync reliability • 40 hrs/mo saved',
    tags: ['Python', 'REST API', 'OpenProject', 'Data Engineering', 'ETL'],
    link: 'https://github.com',
    status: 'Production'
  },
  {
    id: 'proj-2',
    title: 'Biometric Session & OPEX Analytics Dashboard',
    year: '2025',
    category: 'Data Engineering',
    featured: true,
    description: 'Interactive management dashboard processing raw employee punch logs into granular work/break durations, shift adherence metrics, and operational cost leakage insights.',
    metrics: 'Processes 50k+ punch events • Real-time Plotly',
    tags: ['Python', 'Dash', 'Plotly', 'Pandas', 'SQL'],
    link: 'https://github.com',
    status: 'Production'
  },
  {
    id: 'proj-3',
    title: 'Full-Stack Express & AI Workflow Engine',
    year: '2025',
    category: 'AI & Automation',
    featured: true,
    description: 'Modular backend service with custom validation middleware, asynchronous job processing, and Model Context Protocol (MCP) LLM agent tool calling.',
    metrics: 'Sub-120ms API latency • Dockerized',
    tags: ['Node.js', 'Express', 'Docker', 'Claude API', 'MCP'],
    link: 'https://github.com',
    status: 'Active'
  },
  {
    id: 'proj-4',
    title: 'Short-Term Rental (STR) Notion OS',
    year: '2024',
    category: 'Product & Creative',
    featured: false,
    description: 'Multi-tier Notion workspace system built for Airbnb & property hosts featuring automated booking ledgers, cleaning checklists, and unit economics tracking.',
    metrics: 'Published on Gumroad • 3 Tiered Packages',
    tags: ['Notion', 'Systems Design', 'Gumroad', 'Product'],
    link: 'https://gumroad.com',
    status: 'Live Product'
  },
  {
    id: 'proj-5',
    title: 'Seat Secure — Strategy & Competitor Audit',
    year: '2024',
    category: 'Product & Creative',
    featured: false,
    description: 'Comprehensive market research, user funnel teardown, and pricing strategy for an IIT/NIT JoSAA engineering counseling decision platform.',
    metrics: '12+ Competitors Analyzed • GTM Roadmap',
    tags: ['Product Strategy', 'Market Research', 'EdTech', 'Analytics'],
    link: '#',
    status: 'Completed'
  },
  {
    id: 'proj-6',
    title: '3D Sculpted Clay Lighter Sleeves',
    year: '2024',
    category: 'Product & Creative',
    featured: false,
    description: 'Custom hand-sculpted and painted polymer/air-dry clay sleeves featuring high-relief botanical vines and coiled serpent motifs with protective resin finish.',
    metrics: 'Bespoke Craft • Physical Design',
    tags: ['3D Clay', 'Hand-Painted', 'Industrial Craft', 'Art'],
    link: '#',
    status: 'Showcase'
  },
  {
    id: 'proj-7',
    title: 'Containerized Python & Node Micro-Pipelines',
    year: '2024',
    category: 'Backend & Web',
    featured: false,
    description: 'Multi-stage Docker builds and Docker Compose orchestration templates for running isolated Python ETL workers alongside Express REST gateways.',
    metrics: '65% smaller image footprint',
    tags: ['Docker', 'Linux', 'Python', 'Node.js', 'DevOps'],
    link: 'https://github.com',
    status: 'Open Source'
  },
  {
    id: 'proj-8',
    title: 'Automated SQL Schema Migrator & Auditor',
    year: '2024',
    category: 'Data Engineering',
    featured: false,
    description: 'CLI utility to compare staging and production relational schemas, detect drift, and generate safe rollback scripts automatically.',
    metrics: 'Zero-downtime migrations',
    tags: ['SQL', 'Python', 'PostgreSQL', 'CLI'],
    link: 'https://github.com',
    status: 'Internal Tool'
  },
  {
    id: 'proj-9',
    title: 'Obsidian Second-Brain & Dev Knowledge Graph',
    year: '2024',
    category: 'AI & Automation',
    featured: false,
    description: 'Custom Markdown indexing script that converts daily engineering logs and architectural decision records into queryable local embeddings.',
    metrics: '400+ Linked Engineering Notes',
    tags: ['Obsidian', 'Markdown', 'Python', 'Local LLM'],
    link: 'https://github.com',
    status: 'Personal'
  },
  {
    id: 'proj-10',
    title: 'RESTful Rate-Limiter & Auth Middleware',
    year: '2023',
    category: 'Backend & Web',
    featured: false,
    description: 'Lightweight token-bucket rate limiting and JWT role verification middleware package for Express.js APIs.',
    metrics: 'Zero external bloat',
    tags: ['Node.js', 'Express', 'JavaScript', 'Security'],
    link: 'https://github.com',
    status: 'Archived'
  }
];

const INITIAL_POSTS = [
  {
    id: 'post-1',
    title: 'Structuring Enterprise REST API Syncs with Idempotency',
    date: 'Oct 2026',
    readTime: '6 min read',
    category: 'Data Engineering',
    tags: ['Python', 'REST API', 'OpenProject', 'Architecture'],
    excerpt: 'How to design resilient data synchronization pipelines between internal databases and third-party project management APIs without duplicating records.',
    content: `### The Challenge of Enterprise API Synchronization

When integrating internal analytics databases with platforms like OpenProject, network timeouts, rate limits, and partial payload failures are inevitable. A naive script that simply loops over rows and fires \`POST\` requests will eventually create duplicate work packages or corrupt parent-child hierarchies.

### 1. Deterministic External Keys
Every entity in your source database should map to a deterministic fingerprint before touching the network. By hashing key fields (e.g., \`project_id + task_code + updated_at\`), we can compare local state against cached remote state and skip unchanged records entirely.

### 2. Batching & Exponential Backoff
Instead of firing 5,000 sequential requests:
- Group updates into logical dependency tiers (Projects first, Milestones second, Tasks third).
- Implement jittered exponential backoff on HTTP \`429\` and \`503\` responses.
- Log dead-letter payloads into a dedicated SQLite/Postgres audit table for instant replay.

### Key Takeaway
Treat every external REST integration as an eventually consistent distributed system. Idempotency keys and dry-run modes save hours of manual cleanup.`
  },
  {
    id: 'post-2',
    title: 'Event Loop & Async Mechanics in Node.js: Beyond the Basics',
    date: 'Sep 2026',
    readTime: '5 min read',
    category: 'Backend & Web',
    tags: ['Node.js', 'Express', 'JavaScript', 'Performance'],
    excerpt: 'Understanding microtask queues, libuv thread pools, and how to prevent blocking the main thread during heavy JSON transformations.',
    content: `### Why Single-Threaded Doesn't Mean Single-Tasking

Node.js excels at I/O-bound workloads because \`libuv\` delegates network and filesystem operations to the OS kernel or a C++ thread pool. However, when a route handler performs synchronous CPU work—like parsing massive CSVs or running complex regex—every other connected client waits.

### Microtasks vs. Macrotasks
1. **process.nextTick & Promises:** Executed immediately after the current operation completes, before the event loop moves to the next phase. Starving the loop with recursive \`Promise.resolve()\` calls can block I/O callbacks.
2. **Timers & Poll Phase:** Where standard \`setTimeout\`, \`setImmediate\`, and incoming network sockets live.

### Practical Rule for Express APIs
Keep middleware lean. Offload heavy data aggregation to worker threads or dedicated Python microservices, and use Node.js as the high-concurrency orchestration layer.`
  },
  {
    id: 'post-3',
    title: 'Optimizing Dockerfiles for Python Dash & Node.js Services',
    date: 'Aug 2026',
    readTime: '4 min read',
    category: 'DevOps & Containers',
    tags: ['Docker', 'Python', 'Node.js', 'Linux'],
    excerpt: 'Cutting container image sizes by 65% and speeding up CI builds using multi-stage builds, layer caching, and non-root execution.',
    content: `### Stop Shipping Build Compilers to Production

A common mistake in Python data engineering containers is installing \`gcc\`, \`build-essential\`, and raw wheels directly in the final runtime image. Suddenly, a simple Plotly Dash app balloons to 1.4GB.

### Three Rules for Lean Containers
1. **Order Layers by Change Frequency:** Copy \`requirements.txt\` or \`package.json\` *before* copying your source code. Docker caches the dependency installation layer until dependencies actually change.
2. **Multi-Stage Builds:** Compile wheels or TypeScript assets in a \`builder\` stage, then copy only the compiled artifacts into a \`slim-bookworm\` or \`alpine\` runtime image.
3. **Run as Non-Root:** Always create a dedicated application user (\`USER appuser\`) to harden container security in production environments.`
  }
];

const CREATIVE_ITEMS = [
  {
    id: 'cr-1',
    title: '3D Hand-Painted Clay Crafts',
    subtitle: 'Bespoke Tactile Sculpting',
    badge: 'Physical Craft',
    description: 'Custom sculpted polymer & air-dry clay lighter sleeves featuring intricate coiled snake and botanical vine reliefs, hand-painted with acrylic washes and sealed in high-gloss UV resin.',
    highlights: ['High-relief 3D anatomy', 'Custom color palettes', 'Ergonomic grip balance']
  },
  {
    id: 'cr-2',
    title: 'Notion Workspace Systems',
    subtitle: 'Digital Product Architecture',
    badge: 'Gumroad Creator',
    description: 'Multi-tier Short-Term Rental (STR) operating systems built for property hosts. Includes automated relational databases for bookings, turnover checklists, and maintenance ledgers.',
    highlights: ['3 Tiered Product Editions', 'Relational KPI Rollups', 'Zero-friction onboarding']
  },
  {
    id: 'cr-3',
    title: 'Market & Product Strategy Audits',
    subtitle: 'EdTech & SaaS Teardowns',
    badge: 'Strategy Research',
    description: 'Deep-dive product strategy, competitor matrix, and conversion funnel analysis for Seat Secure (an IIT/NIT JoSAA counseling guidance platform).',
    highlights: ['Pricing psychology', 'User journey mapping', 'Competitor feature matrix']
  }
];

const TECH_STACK = {
  'Data & AI': ['Python', 'SQL', 'Dash', 'Plotly', 'Pandas', 'Claude API / MCP'],
  'Backend & DevOps': ['Node.js', 'Express', 'REST APIs', 'Docker', 'Linux', 'Git'],
  'Frontend & Tools': ['React', 'Tailwind CSS', 'Notion', 'Obsidian', 'Postman']
};

export default function App() {
  // Theme state (Dark mode default as requested)
  const [darkMode, setDarkMode] = useState(true);

  // Navigation Tabs: 'home' | 'archive' | 'blog'
  const [activeTab, setActiveTab] = useState('home');

  // Off-Screen / Creative toggle inside Home Bento Hub
  const [hubMode, setHubMode] = useState('engineering'); // 'engineering' | 'creative'

  // Live IST Clock state
  const [istTime, setIstTime] = useState('');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Persisted Projects State
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('abhigyan_portfolio_projects_v1');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Persisted Blog Posts State
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('abhigyan_portfolio_posts_v1');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  // Archive Filter States
  const [archiveCategory, setArchiveCategory] = useState('All');
  const [archiveSearch, setArchiveSearch] = useState('');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // Blog & CMS States
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCmsAdmin, setIsCmsAdmin] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // null or post object

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    year: '2026',
    category: 'Data Engineering',
    description: '',
    metrics: '',
    tags: '',
    link: 'https://github.com',
    featured: false
  });

  // New / Edit Blog Post Form State
  const [postForm, setPostForm] = useState({
    id: '',
    title: '',
    category: 'Data Engineering',
    readTime: '5 min read',
    tags: '',
    excerpt: '',
    content: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem('abhigyan_portfolio_projects_v1', JSON.stringify(projects));
    } catch (e) {
      console.error('Failed saving projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('abhigyan_portfolio_posts_v1', JSON.stringify(posts));
    } catch (e) {
      console.error('Failed saving posts to localStorage', e);
    }
  }, [posts]);

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
Data Engineer & Full-Stack Builder

SUMMARY
Data Engineer & Full-Stack Builder crafting scalable data pipelines, backend systems, and AI-driven workflows. Experienced in enterprise REST API integrations, biometric analytics dashboards, and containerized Node.js/Python microservices.

CORE SKILLS
- Data & AI: Python, SQL, Dash, Plotly, Pandas, Claude API, Model Context Protocol (MCP)
- Backend & DevOps: Node.js, Express, REST APIs, Docker, Linux, Git
- Frontend & Systems: React, Tailwind CSS, Notion Architecture, Obsidian

EXPERIENCE
Data Engineer (Present)
- Built automated enterprise data integration architectures syncing complex project schemas into OpenProject via REST APIs.
- Engineered interactive Biometric Session & OPEX Analytics Dashboards in Python/Dash/Plotly processing 50k+ raw punch events.
- Designed cost-leakage detection and operational efficiency reporting pipelines.

Independent Builder & Creator
- Developed modular Node.js/Express backend services with Docker orchestration and LLM agent integrations.
- Created multi-tier Short-Term Rental Notion OS templates on Gumroad and conducted EdTech product strategy teardowns.
`;
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abhigyan_Singh_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Resume summary downloaded! (Replace with your PDF link anytime)');
  };

  const handleResetDemoData = () => {
    setProjects(INITIAL_PROJECTS);
    setPosts(INITIAL_POSTS);
    localStorage.removeItem('abhigyan_portfolio_projects_v1');
    localStorage.removeItem('abhigyan_portfolio_posts_v1');
    showToast('Reset portfolio & CMS data to original defaults.');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

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
      status: 'Active'
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
      featured: false
    });
    setShowAddProjectModal(false);
    showToast(`Added "${created.title}" to Project Archive!`);
  };

  const handleDeleteProject = (id, title) => {
    setProjects(projects.filter((p) => p.id !== id));
    showToast(`Removed "${title}" from archive.`);
  };

  const handleToggleFeaturedProject = (id) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
    showToast('Updated featured project status on Home Bento Grid.');
  };

  const startNewPost = () => {
    setEditingPost('new');
    setPostForm({
      id: '',
      title: '',
      category: 'Data Engineering',
      readTime: '5 min read',
      tags: 'Python, Architecture, Backend',
      excerpt: '',
      content: '### Overview\n\nWrite your technical thoughts, architecture notes, or tutorial steps here...\n\n### Implementation Details\n\n- Key insight 1\n- Key insight 2'
    });
  };

  const startEditPost = (post) => {
    setEditingPost(post.id);
    setPostForm({
      id: post.id,
      title: post.title,
      category: post.category,
      readTime: post.readTime,
      tags: post.tags.join(', '),
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
        readTime: postForm.readTime || '4 min read',
        category: postForm.category,
        tags: formattedTags.length ? formattedTags : ['Engineering'],
        excerpt:
          postForm.excerpt.trim() ||
          postForm.content.slice(0, 120).replace(/#/g, '') + '...',
        content: postForm.content
      };
      setPosts([newArticle, ...posts]);
      setSelectedPost(newArticle);
      showToast('Published new article to Blog!');
    } else {
      const updatedList = posts.map((p) =>
        p.id === editingPost
          ? {
              ...p,
              title: postForm.title.trim(),
              category: postForm.category,
              readTime: postForm.readTime,
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
      showToast('Saved changes to article!');
    }
    setEditingPost(null);
  };

  const handleDeletePost = (id, title) => {
    setPosts(posts.filter((p) => p.id !== id));
    if (selectedPost?.id === id) setSelectedPost(null);
    showToast(`Deleted post "${title}".`);
  };

  const featuredProjects = useMemo(() => {
    const list = projects.filter((p) => p.featured);
    return list.length > 0 ? list.slice(0, 3) : projects.slice(0, 3);
  }, [projects]);

  const filteredArchiveProjects = useMemo(() => {
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
    <div className={`min-h-screen transition-colors duration-200 font-sans selection:bg-emerald-500/20 selection:text-emerald-400 ${themeClasses.bg}`}>
      {/* Subtle Top Grid Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-emerald-500/30 bg-zinc-900/95 text-zinc-100 shadow-2xl backdrop-blur-md text-xs sm:text-sm animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${themeClasses.navBg}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Identity */}
          <button
            onClick={() => {
              setActiveTab('home');
              setSelectedPost(null);
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border font-mono text-xs font-bold tracking-tighter transition-transform group-hover:scale-105 ${darkMode ? 'bg-zinc-900 border-zinc-700 text-emerald-400' : 'bg-zinc-900 border-zinc-800 text-emerald-400'}`}>
              AS
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold tracking-tight leading-none flex items-center gap-1.5">
                Abhigyan Singh
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className={`text-[11px] font-mono mt-0.5 ${themeClasses.textSubtle}`}>
                data • backend • ai
              </div>
            </div>
          </button>

          {/* Center Single-Click View Switcher */}
          <nav className={`flex items-center p-1 rounded-xl border ${themeClasses.cardSubtle}`}>
            <button
              onClick={() => {
                setActiveTab('home');
                setSelectedPost(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'home'
                  ? darkMode
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'bg-white text-zinc-900 shadow-sm'
                  : `${themeClasses.textMuted} hover:opacity-100`
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Bento Hub</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('archive');
                setSelectedPost(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'archive'
                  ? darkMode
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'bg-white text-zinc-900 shadow-sm'
                  : `${themeClasses.textMuted} hover:opacity-100`
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Archive</span>
              <span className={`ml-0.5 px-1.5 py-0.2 rounded text-[10px] font-mono ${darkMode ? 'bg-zinc-700/70 text-zinc-300' : 'bg-zinc-200 text-zinc-700'}`}>
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('blog');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'blog'
                  ? darkMode
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'bg-white text-zinc-900 shadow-sm'
                  : `${themeClasses.textMuted} hover:opacity-100`
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog & CMS</span>
            </button>
          </nav>

          {/* Right Quick Actions: CMS Admin Pill & Theme Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsCmsAdmin(!isCmsAdmin);
                showToast(
                  !isCmsAdmin
                    ? 'CMS Admin Mode enabled: You can now add/edit posts & projects.'
                    : 'CMS Admin Mode disabled.'
                );
              }}
              title="Toggle CMS Admin Controls"
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                isCmsAdmin
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : `${themeClasses.card} ${themeClasses.textMuted}`
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isCmsAdmin ? 'CMS: ON' : 'CMS Admin'}</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle color theme"
              className={`p-2 rounded-lg border transition-colors ${themeClasses.card}`}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 relative z-10">
        {/* ==========================================
            VIEW 1: HOME (BENTO GRID HUB)
           ========================================== */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Live Status Pill Bar */}
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

            {}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* HERO BENTO CARD (Spans 8 cols on desktop) */}
              <div className={`md:col-span-8 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all ${themeClasses.card}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold">
                      // Hybrid Personal Hub
                    </span>
                    <span className={`text-xs font-mono ${themeClasses.textSubtle}`}>
                      v2026.10
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
                    Abhigyan Singh —{' '}
                    <span className={themeClasses.textMuted}>
                      Data Engineer & Full-Stack Builder crafting scalable data pipelines, backend systems, and AI-driven workflows.
                    </span>
                  </h1>

                  <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${themeClasses.textMuted}`}>
                    I bridge the gap between raw operational data and reliable production software. From automating enterprise REST synchronizations and interactive Plotly/Dash telemetry to containerizing Node.js microservices and designing tactile crafts off-screen.
                  </p>
                </div>

                {/* Hero Action Buttons & Socials */}
                <div className="pt-6 mt-6 border-t border-zinc-800/50 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleDownloadResume}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        darkMode
                          ? 'bg-zinc-100 text-zinc-900 hover:bg-white'
                          : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Download Resume PDF</span>
                    </button>

                    <button
                      onClick={handleCopyEmail}
                      className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${themeClasses.card}`}
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Social Links */}
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
                      href="https://x.com"
                      target="_blank"
                      rel="noreferrer"
                      title="X / Twitter"
                      className={`p-2.5 rounded-xl border transition-colors ${themeClasses.card}`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: LOCATION + CURRENT FOCUS CARDS (Spans 4 cols) */}
              <div className="md:col-span-4 flex flex-col gap-4">
                {/* Location & IST Clock Bento Card */}
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
                      <Clock className="w-3.5 h-3.5" />
                      <span>{istTime || '02:20:00 AM'}</span>
                    </div>
                  </div>

                  <div className={`text-xs pt-3 border-t ${themeClasses.border} ${themeClasses.textSubtle} flex items-center justify-between`}>
                    <span>Availability</span>
                    <span className="text-emerald-400 font-medium">Open to Select Roles & Collabs</span>
                  </div>
                </div>

                {/* Current Focus / Building Telemetry Card */}
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
                    onClick={() => setActiveTab('blog')}
                    className="text-xs font-medium text-emerald-400 hover:underline inline-flex items-center gap-1 pt-2"
                  >
                    <span>Read engineering notes</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* TECH STACK BENTO CARD (7 cols) */}
              <div className={`md:col-span-7 rounded-2xl border p-6 transition-all ${themeClasses.card}`}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-sm font-semibold uppercase tracking-wider font-mono">
                      Tech Stack & Tooling
                    </h2>
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

              {/* EXPERIENCE TIMELINE BENTO CARD (5 cols) */}
              <div className={`md:col-span-5 rounded-2xl border p-6 flex flex-col justify-between transition-all ${themeClasses.card}`}>
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider font-mono">
                        Experience Timeline
                      </h2>
                    </div>
                    <span className={`text-xs font-mono ${themeClasses.textSubtle}`}>
                      Career
                    </span>
                  </div>

                  <div className="relative pl-4 border-l border-zinc-700/60 space-y-6">
                    {/* Role 1 */}
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold">Data Engineer</h3>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                          Present
                        </span>
                      </div>
                      <p className={`text-xs mt-1.5 leading-relaxed ${themeClasses.textMuted}`}>
                        Building enterprise data integration architectures, biometric session analytics dashboards (Dash/Plotly), and OPEX efficiency frameworks.
                      </p>
                    </div>

                    {/* Role 2 */}
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-500" />
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold">
                          Independent Builder & Creator
                        </h3>
                        <span className={`text-[11px] font-mono ${themeClasses.textSubtle}`}>
                          Ongoing
                        </span>
                      </div>
                      <p className={`text-xs mt-1.5 leading-relaxed ${themeClasses.textMuted}`}>
                        Developing full-stack Express/React apps, Gumroad Notion operating systems, EdTech strategy audits, and custom 3D clay designs.
                      </p>
                    </div>
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

            {}
            <section className="pt-2 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-lg font-bold tracking-tight">
                      Selected Featured Work (Top 3)
                    </h2>
                  </div>
                  <p className={`text-xs mt-0.5 ${themeClasses.textMuted}`}>
                    High-impact systems across Data Engineering, Analytics, and Backend AI.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('archive')}
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
                    className={`rounded-2xl border p-6 flex flex-col justify-between transition-all group ${themeClasses.card}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                          0{idx + 1} • {project.category}
                        </span>
                        <span className={`text-xs font-mono ${themeClasses.textSubtle}`}>
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-base font-bold tracking-tight group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>

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
                        <span className={`font-mono text-[11px] ${themeClasses.textSubtle}`}>
                          Status: {project.status}
                        </span>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-emerald-400 hover:underline"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prominent Full-Width One-Click Archive Banner */}
              <div className={`rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${themeClasses.card}`}>
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold">
                      Looking for more scripts, templates, or older builds?
                    </h3>
                    <p className={`text-xs mt-0.5 ${themeClasses.textMuted}`}>
                      Browse the complete filterable library of {projects.length} projects—or add new ones dynamically.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('archive')}
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

            {}
            <section className={`rounded-2xl border p-6 sm:p-8 transition-all ${themeClasses.card}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/60">
                <div>
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      // Off-Screen & Product Lab
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-1">
                    Creative Craft, Notion Systems & Product Strategy
                  </h2>
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
                      <h3 className="text-sm font-bold mt-2">{item.title}</h3>
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
        )}

        {/* ==========================================
            VIEW 2: FULL PROJECT ARCHIVE (1-CLICK VIEW)
           ========================================== */}
        {activeTab === 'archive' && (
          <div className="space-y-6">
            {/* Archive Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`text-xs font-mono mb-2 inline-flex items-center gap-1 hover:underline ${themeClasses.textMuted}`}
                >
                  ← Back to Bento Hub
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Full Project Archive
                </h1>
                <p className={`text-sm mt-1 ${themeClasses.textMuted}`}>
                  A complete directory of data pipelines, backend services, AI tools, and creative builds.
                </p>
              </div>

              <div className="flex items-center gap-2">
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
                {[
                  'All',
                  'Data Engineering',
                  'Backend & Web',
                  'AI & Automation',
                  'Product & Creative'
                ].map((cat) => (
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

            {}
            {showAddProjectModal && (
              <form
                onSubmit={handleAddProject}
                className={`rounded-2xl border p-6 space-y-4 ${themeClasses.card}`}
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

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <label className="inline-flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProject.featured}
                      onChange={(e) =>
                        setNewProject({ ...newProject, featured: e.target.checked })
                      }
                      className="rounded border-zinc-700"
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
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Archive Responsive Table / List */}
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
                    {filteredArchiveProjects.map((proj) => (
                      <tr
                        key={proj.id}
                        className="group hover:bg-zinc-500/[0.04] transition-colors"
                      >
                        <td className={`py-4 px-4 font-mono text-xs whitespace-nowrap align-top ${themeClasses.textSubtle}`}>
                          {proj.year}
                        </td>
                        <td className="py-4 px-4 align-top max-w-md">
                          <div className="font-semibold flex items-center gap-2">
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
                              {proj.metrics}
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
                            {isCmsAdmin && (
                              <>
                                <button
                                  onClick={() => handleToggleFeaturedProject(proj.id)}
                                  title="Toggle Featured on Home"
                                  className={`p-1.5 rounded-lg border text-xs ${
                                    proj.featured
                                      ? 'border-emerald-500/50 text-emerald-400'
                                      : themeClasses.textSubtle
                                  }`}
                                >
                                  ★
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(proj.id, proj.title)}
                                  title="Delete Project"
                                  className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:underline"
                            >
                              <span>Link</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredArchiveProjects.length === 0 && (
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
                            className="mt-2 text-xs text-emerald-400 hover:underline"
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
        )}

        {/* ==========================================
            VIEW 3: BLOG & BUILT-IN CMS MANAGER
           ========================================== */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            {/* Blog Header & CMS Mode Bar */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <button
                  onClick={() => {
                    if (selectedPost || editingPost) {
                      setSelectedPost(null);
                      setEditingPost(null);
                    } else {
                      setActiveTab('home');
                    }
                  }}
                  className={`text-xs font-mono mb-2 inline-flex items-center gap-1 hover:underline ${themeClasses.textMuted}`}
                >
                  ← {selectedPost || editingPost ? 'Back to All Articles' : 'Back to Bento Hub'}
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Engineering Notes & CMS
                </h1>
                <p className={`text-sm mt-1 ${themeClasses.textMuted}`}>
                  Deep dives on REST architectures, Node.js internals, Docker, and data engineering.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
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
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs inline-flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>
            </div>

            {}
            {editingPost ? (
              <form
                onSubmit={handleSavePost}
                className={`rounded-2xl border p-6 space-y-5 ${themeClasses.card}`}
              >
                <div className="flex items-center justify-between border-b pb-3 border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-base font-bold">
                      {editingPost === 'new' ? 'Create New Blog Post' : 'Edit Blog Post'}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className={`text-xs ${themeClasses.textMuted}`}
                  >
                    Cancel
                  </button>
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
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
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
                    <label className="block text-xs font-mono mb-1">Read Time</label>
                    <input
                      type="text"
                      value={postForm.readTime}
                      onChange={(e) =>
                        setPostForm({ ...postForm, readTime: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs ${themeClasses.input}`}
                    />
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
                  <label className="block text-xs font-mono mb-1">
                    Article Body (Supports ### Headings & Bullet Lists)
                  </label>
                  <textarea
                    rows={10}
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
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save & Publish</span>
                  </button>
                </div>
              </form>
            ) : selectedPost ? (
              /* Single Article Reader View */
              <article className={`rounded-2xl border p-6 sm:p-10 max-w-3xl mx-auto ${themeClasses.card}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {selectedPost.category}
                    </span>
                    <span className={themeClasses.textSubtle}>•</span>
                    <span className={themeClasses.textSubtle}>{selectedPost.date}</span>
                    <span className={themeClasses.textSubtle}>•</span>
                    <span className={themeClasses.textSubtle}>{selectedPost.readTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditPost(selectedPost)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono ${themeClasses.cardSubtle}`}
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit in CMS</span>
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-6">
                  {selectedPost.title}
                </h1>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedPost.tags.map((t) => (
                    <span
                      key={t}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${themeClasses.pill}`}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Simple Formatted Content Renderer */}
                <div className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed">
                  {selectedPost.content.split('\n\n').map((block, index) => {
                    if (block.startsWith('### ')) {
                      return (
                        <h3
                          key={index}
                          className="text-lg font-bold tracking-tight pt-4"
                        >
                          {block.replace('### ', '')}
                        </h3>
                      );
                    }
                    return (
                      <p
                        key={index}
                        className={`whitespace-pre-line ${themeClasses.textMuted}`}
                      >
                        {block}
                      </p>
                    );
                  })}
                </div>
              </article>
            ) : (
              /* Blog Post Grid List */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`rounded-2xl border p-6 flex flex-col justify-between cursor-pointer transition-all group ${themeClasses.card}`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-3">
                        <span className="text-emerald-400">{post.category}</span>
                        <span className={themeClasses.textSubtle}>{post.date}</span>
                      </div>

                      <h2 className="text-base font-bold tracking-tight group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h2>

                      <p className={`text-xs leading-relaxed mt-2.5 ${themeClasses.textMuted}`}>
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                      <span className={`text-[11px] font-mono ${themeClasses.textSubtle}`}>
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
                              className={`p-1.5 rounded-lg border text-xs ${themeClasses.cardSubtle}`}
                              title="Edit Article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
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
          </div>
        )}
      </main>

      {}
      <footer className={`mt-16 border-t py-8 text-xs ${themeClasses.border} ${themeClasses.textSubtle}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-zinc-400">
              Abhigyan Singh
            </span>
            <span>—</span>
            <span>Built with React, Tailwind CSS & Bento Architecture</span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-emerald-400 transition-colors"
            >
              Hub
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className="hover:text-emerald-400 transition-colors"
            >
              Archive ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('blog')}
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