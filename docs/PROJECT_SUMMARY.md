# Technical Project Summary

## 1. Executive Summary

The project has been refactored from a monolithic 1,920-line single-file prototype (`abhigyan_singh_portfolio_cms.tsx`) into a clean, modular, production-ready **React 18 + Vite 6 + Tailwind CSS 3 + Lucide React** application.

In addition to modularizing the existing Linear/Vercel-inspired Bento Grid Hub, the Project Archive table, and the Blog/CMS engine, the application prepends a full-viewport **Interactive Hero Landing Section** featuring a 60fps cursor-tracking portrait with subtle 3D parallax tilt, dynamic iris displacement, and a toggleable calibration rig.

---

## 2. Core Technology Stack

| Layer | Technology | Purpose & Implementation Details |
|---|---|---|
| **Core Framework** | React 18.3.1 | Functional components, hooks (`useState`, `useEffect`, `useRef`, `useMemo`) |
| **Build Tooling** | Vite 6.0.7 (`@vitejs/plugin-react`) | Sub-millisecond HMR, optimized Rollup bundling (production bundle ~232kB JS / 39kB CSS) |
| **Styling** | Tailwind CSS 3.4.17 + PostCSS | Custom utility tokens, glassmorphism, responsive breakpoints, class-based dark mode |
| **Icons** | Lucide React 0.475.0 | Tree-shakable feather icon system |
| **Typography** | Inter, JetBrains Mono, Newsreader | Editorial serif display paired with modern geometric sans and clean monospace |
| **Data Persistence** | HTML5 `localStorage` | Client-side reactive persistence for added projects and blog posts |

---

## 3. Directory Structure & File Map

```
portfolio/
├── docs/                                # Project documentation & roadmap
│   ├── README.md                        # Documentation hub & quickstart
│   ├── PROJECT_SUMMARY.md               # Detailed technical summary of what was built
│   ├── ARCHITECTURE.md                  # State flow & coordinate math diagrams
│   └── NEXT_CHANGES.md                  # Prioritized future roadmap & upcoming tasks
├── public/
│   ├── hero-portrait.jpg                # Calibrated studio portrait (1586x992 optimized JPEG)
│   └── hero-portrait.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                   # Floating glassmorphic pill navbar with Sync Codebase trigger
│   │   ├── HeroLanding.jsx              # Full-viewport split-screen hero & 3D ParallaxPortrait
│   │   ├── BentoHub.jsx                 # Bento grid, live IST clock, top 3 pinned work, timeline
│   │   ├── ProjectArchive.jsx           # Searchable table, category filters, Add Project modal, Exporter trigger
│   │   ├── BlogCMS.jsx                  # Technical article reader, syntax highlighter, lightbox, .md importer
│   │   ├── ExportInitialDataModal.jsx   # Production state sync modal (ES module & JSON backup generator)
│   │   └── CaseStudyDrawer.jsx          # Deep case study slide-over drawer with visual architecture pipeline
│   ├── data/
│   │   └── initialData.js               # Seed data for projects, posts, stack & experience
│   ├── hooks/
│   │   ├── useLocalStorage.js           # Reactive localStorage synchronizer hook
│   │   └── useMousePosition.js          # 60fps rAF cursor tracker with gyroscope deviceorientation support
│   ├── App.jsx                          # Main application layout, state orchestrator & footer
│   ├── index.css                        # Tailwind directives, sleek custom scrollbar & base styles
│   └── main.jsx                         # React DOM mount point
├── index.html                           # Google Fonts preconnects, SEO metadata, dark root
├── tailwind.config.js                   # Extended fonts, keyframe animations, dark mode config
├── postcss.config.js                    # PostCSS plugin pipeline
└── package.json                         # Dependencies, scripts, and build configuration
```

---

## 4. Feature-by-Feature Breakdown

### 4.1. Interactive Hero Landing (`src/components/HeroLanding.jsx`)
- **Visual Aesthetic:** Dark studio background (`#09090b`) with an ambient radial spotlight blending warm amber (`#f59e0b`) and crimson (`#e11d48`) glow layers behind the portrait, leading into a 1px minimalist divider seam.
- **Left Column:**
  - Monospace eyebrow chip: `"DATA & AI ENGINEER • FULL-STACK BUILDER"` with live pulsing radar dot.
  - Editorial display typography: `"HI, I'M"` and large high-contrast display title `"Abhigyan Singh"` featuring an italic gradient serif.
  - Subheadline: *"Designing resilient data pipelines, backend architectures, and AI-driven digital products with clean code and creative systems."*
  - Architectural pillar chips: `Enterprise REST Sync`, `Python & Dash Telemetry`, `Docker Microservices`, `Claude MCP Agents`, `Notion OS Systems`.
  - Pill CTAs: `RESUME ↗` (triggers instant formatted resume file download) and `LET'S TALK` (copies contact email to clipboard with floating feedback toast).
- **Right Column (`ParallaxPortrait`):**
  - Displays high-resolution studio portrait from `/hero-portrait.jpg`.
  - **3D Parallax Tilt:** Uses `perspective(1000px) rotateX(...) rotateY(...)` dynamically derived from `useMousePosition` (`nx, ny`) clamped to a maximum tilt of `4deg` for an immersive card depth effect.
  - **Ambient Studio Lighting:** Layered radial spotlight blending amber and rose gradients with soft studio vignette masks for seamless background integration.
  - **Mobile Gyroscope Support:** Normalizes `deviceorientation` (`gamma` and `beta`) to tilt the card naturally on smartphones and tablets.
  - **Fallback State:** Clean obsidian silhouette avatar with animated telemetry pulse if the portrait asset fails to load.
  - **Clean & Authentic:** Removed synthetic eye overlays and calibration sliders to showcase the authentic portrait cleanly without artificial pupil artifacts.

### 4.2. Bento Grid Hub (`src/components/BentoHub.jsx`)
- **Engineering Architecture & Core Impact Card:**
  - De-duplicated top 8-column card highlighting core backend philosophy and 3 quantitative metric blocks:
    - `99.8% Pipeline Reliability` (Idempotent REST sync & retry queues)
    - `40% Manual Ops Reduction` (Automated biometric ETL & anomaly scoring)
    - `<15ms Real-Time Telemetry` (Vectorized Dash/Plotly query engines)
  - Quick `"Open Case Studies"` trigger and social links (`GitHub`, `LinkedIn`, `X/Twitter`).
- **Live IST Telemetry Clock:** Real-time Indian Standard Time (`UTC+5:30`) clock updating every second.
- **Mode Switcher:** Seamless toggle between `01. Engineering` and `02. Off-Screen & Creative` modes.
- **Top 3 Pinned Projects:** Filtered cards with category badges, year tags, performance metrics, tag chips, and direct inspection links to the `CaseStudyDrawer`.
- **Creative & Off-Screen Cards:** Spotlights tactile 3D clay crafts, Notion workspace operating systems, and EdTech product audits.

### 4.3. Full Project Archive (`src/components/ProjectArchive.jsx`)
- **Category Filter Pills:** Instant filtering by `All`, `Data Engineering`, `Backend & Web`, `AI & Automation`, and `Product & Creative`.
- **Live Search Bar:** Real-time fuzzy filtering across project titles, descriptions, and technology tags.
- **"+ Add Project" Modal Drawer:** Creation form with inputs for Title, Category, Year, Tags, Metrics, Description, Link, and deep case study fields (Problem statement, Architecture pipeline stages, Key decisions, Quantified impact).
- **Responsive Table:** Full metadata columns with CMS admin controls (star to pin/unpin, trash can to delete) and direct **"Case Study"** drawer triggers.
- **Sync to Codebase Trigger:** Provides a one-click button to open the `ExportInitialDataModal`.

### 4.4. Deep Case Study Slide-Over Drawer (`src/components/CaseStudyDrawer.jsx`)
- Slide-over drawer panel from the right (`max-w-2xl bg-[#0c0c0e]/95 backdrop-blur-2xl border-l border-zinc-800 z-50`) with backdrop blur and Escape key handler.
- **Structured Sections:**
  1. **Header:** Category pill, Year, Title, status badge, outcome metric badge, and external repository link.
  2. **Operational Bottlenecks & Problem Statement:** Clear context callout on operational friction solved.
  3. **Visual Node-and-Arrow Architecture Diagram:** Interactive pipeline layout (`01 Intake ➔ 02 Validation/ETL ➔ 03 Storage ➔ 04 Telemetry UI`) with step numbering and detailed stage descriptions.
  4. **Key Technical Tradeoffs & Decisions:** Bullet points detailing architectural decisions (e.g., idempotency keys, adaptive token-bucket throttlers, multi-stage Dockerization).
  5. **Quantified Production Impact:** Highlighted outcome callout box.

### 4.5. Technical Blog & Live CMS (`src/components/BlogCMS.jsx`)
- **Syntax Highlighting & Terminal Code Blocks:**
  - Triple-backtick fenced blocks (` ```language ... ``` `) rendered in an IDE-style container (`bg-[#09090b]`, `border-zinc-800`, `font-mono text-xs`).
  - Header bar with language badge and working **"Copy Code"** button.
  - Custom regex tokenizer coloring keywords, strings, comments, numbers, and functions.
  - Monospace line numbering gutter.
- **Inline Code:** Single-backtick text styled as emerald pills (`bg-zinc-800/80 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-[0.85em]`).
- **Dynamic Reading Time:** Automatically calculated from article word count with live editor telemetry.
- **Inline Image Embedding & Lightbox:** Markdown image syntax `![Alt Text](url)` with captions and click-to-zoom full-viewport Lightbox modal.
- **Markdown `.md` File Import & Export:** Reader view features a **"Download .md"** button with YAML frontmatter; CMS Editor features an **"Import .md File"** button (`FileReader`).

### 4.6. Production State Exporter ("Sync to Codebase") (`src/components/ExportInitialDataModal.jsx`)
- **ES Module Generator:** Serializes live `localStorage` state (`projects`, `posts`, calibrated `INITIAL_EYE_COORDS`, `techStack`, `experience`, `creativeItems`) into a valid, formatted ES module matching `src/data/initialData.js`.
- **One-Click Actions:**
  - **"Copy initialData.js to Clipboard"** with floating toast confirmation.
  - **"Download initialData.js"** as an ES module file for direct codebase replacement before Git commits.
  - **"Export JSON Backup"** (`portfolio-backup.json`) for cross-browser state migration.
  - **"Import JSON Backup"** with schema verification and automatic state hydration.

### 4.7. Floating Pill Navbar (`src/components/Navbar.jsx`)
- Floating glassmorphic pill bar (`backdrop-blur-xl`, `bg-zinc-950/80`).
- Navigation buttons: `WORK`, `ARCHIVE`, `BLOG / CMS`, and `CONTACT`.
- Tools:
  - `Sync Codebase` button (triggers `ExportInitialDataModal` when `CMS: ON` is active).
  - CMS Admin Mode toggle (`CMS: ON` / `CMS`).
  - Dark/Light mode theme toggle.

---

## 5. Performance & Build Verification

- **Vite 6 Production Build:** Passed with zero warnings or errors.
- **Bundle Metrics:**
  - `dist/index.html`: 1.11 kB (gzip: 0.63 kB)
  - `dist/assets/index-*.css`: 43.72 kB (gzip: 7.41 kB)
  - `dist/assets/index-*.js`: 270.60 kB (gzip: 79.51 kB)
- **Local Dev Server:** Active on `http://127.0.0.1:5173/` with sub-10ms HMR.
