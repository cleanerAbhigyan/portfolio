# Technical Project Summary

## 1. Executive Summary

The project has been refactored from a monolithic single-file prototype into a clean, modular, production-ready **React 18 + Vite 6 + Tailwind CSS 3 + Lucide React** application.

In addition to modularizing the Linear/Vercel-inspired Bento Grid Hub, the Project Archive table, and the Blog/CMS engine, the application prepends a full-viewport **Interactive Hero Landing Section** featuring a 60fps cursor-tracking portrait with subtle 3D parallax tilt, authentic studio lighting, and an editorial design system for **Abhigyan**.

The platform enforces **Public Read-Only Mode by default** for all external web visitors, with secure **Owner CMS Write-Access** available via `localhost`, `?admin=true`, or a `Shift + A` PIN modal.

---

## 2. Core Technology Stack

| Layer | Technology | Purpose & Implementation Details |
|---|---|---|
| **Core Framework** | React 18.3.1 | Functional components, hooks (`useState`, `useEffect`, `useRef`, `useMemo`) |
| **Build Tooling** | Vite 6.0.7 (`@vitejs/plugin-react`) | Sub-millisecond HMR, optimized Rollup bundling |
| **Styling** | Tailwind CSS 3.4.17 + PostCSS | Custom utility tokens, glassmorphism, responsive breakpoints, class-based dark mode |
| **Icons** | Lucide React 0.475.0 | Tree-shakable feather icon system |
| **Typography** | Inter, JetBrains Mono, Newsreader | Editorial serif display paired with modern geometric sans and clean monospace |
| **Data Persistence** | HTML5 `localStorage` | Client-side reactive persistence for added projects and blog posts |
| **Security & Auth** | PIN Modal & Session Guard | Owner write-access gate with `Shift + A`, `localhost`, and session authorization |

---

## 3. Directory Structure & File Map

```
portfolio/
├── docs/                                # Project documentation & roadmap
│   ├── README.md                        # Documentation hub & quickstart
│   ├── PROJECT_SUMMARY.md               # Detailed technical summary of what was built
│   ├── ARCHITECTURE.md                  # State flow, coordinate math & security diagrams
│   └── NEXT_CHANGES.md                  # Prioritized future roadmap & upcoming tasks
├── public/
│   ├── hero-portrait.jpg                # Calibrated studio portrait (1586x992 optimized JPEG)
│   └── hero-portrait.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                   # Floating glassmorphic navbar (Public "Available for Roles" & Owner CMS)
│   │   ├── HeroLanding.jsx              # Full-viewport split-screen hero & 3D ParallaxPortrait
│   │   ├── BentoHub.jsx                 # Bento grid, live IST clock, top 3 pinned work, timeline
│   │   ├── ProjectArchive.jsx           # Searchable table, category filters, Add Project modal (Owner-guarded)
│   │   ├── BlogCMS.jsx                  # Technical article reader, syntax highlighter, lightbox, .md importer
│   │   ├── ExportInitialDataModal.jsx   # Production state sync modal (ES module & JSON backup generator)
│   │   ├── CaseStudyDrawer.jsx          # Deep case study slide-over drawer with visual architecture pipeline
│   │   └── OwnerUnlockModal.jsx         # PIN modal for unlocking Owner CMS write-access
│   ├── data/
│   │   └── initialData.js               # Seed data for projects, posts, stack & experience
│   ├── hooks/
│   │   ├── useLocalStorage.js           # Reactive localStorage synchronizer hook
│   │   └── useMousePosition.js          # 60fps rAF cursor tracker with gyroscope deviceorientation support
│   ├── App.jsx                          # Main application layout, state orchestrator, security guard & footer
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
  - Editorial display typography: `"HI, I'M"` and large high-contrast display title `"Abhigyan."` featuring an italic gradient accent.
  - Subheadline: *"Designing resilient data pipelines, backend architectures, and AI-driven digital products with clean code and creative systems."*
  - Architectural pillar chips: `Enterprise REST Sync`, `Python & Dash Telemetry`, `Docker Microservices`, `Claude MCP Agents`, `Notion OS Systems`.
  - Pill CTAs: `RESUME ↗` (triggers instant formatted download of `Abhigyan_Resume_2026.txt`) and `LET'S TALK` (copies `abhigyan62001@gmail.com` to clipboard with floating feedback toast).
- **Right Column (`ParallaxPortrait`):**
  - Displays high-resolution studio portrait from `/hero-portrait.jpg`.
  - **3D Parallax Tilt:** Uses `perspective(1000px) rotateX(...) rotateY(...)` dynamically derived from `useMousePosition` (`nx, ny`) clamped to a maximum tilt of `4deg` for an immersive card depth effect.
  - **Ambient Studio Lighting:** Layered radial spotlight blending amber and rose gradients with soft studio vignette masks for seamless background integration.
  - **Mobile Gyroscope Support:** Normalizes `deviceorientation` (`gamma` and `beta`) to tilt the card naturally on smartphones and tablets.
  - **Fallback State:** Clean obsidian silhouette avatar with monogram `"A"` badge if the portrait asset fails to load.

### 4.2. Bento Grid Hub (`src/components/BentoHub.jsx`)
- **Engineering Architecture & Core Impact Card:**
  - Top 8-column card highlighting core backend philosophy and 3 quantitative metric blocks:
    - `99.8% Pipeline Reliability` (Idempotent REST sync & retry queues)
    - `40% Manual Ops Reduction` (Automated biometric ETL & anomaly scoring)
    - `<15ms Real-Time Telemetry` (Vectorized Dash/Plotly query engines)
  - Quick `"Open Case Studies"` trigger and social links (`GitHub: https://github.com/abhigyan`, `LinkedIn`, `X/Twitter`).
- **Live IST Telemetry Clock:** Real-time Indian Standard Time (`UTC+5:30`) clock updating every second.
- **Mode Switcher:** Seamless toggle between `01. Engineering` and `02. Off-Screen & Creative` modes.
- **Top 3 Pinned Projects:** Filtered cards with category badges, year tags, performance metrics, tag chips, and direct inspection links to the `CaseStudyDrawer`.
- **Creative & Off-Screen Cards:** Spotlights tactile 3D clay crafts, Notion workspace operating systems, and EdTech product audits.

### 4.3. Full Project Archive (`src/components/ProjectArchive.jsx`)
- **Public Read-Only UI:**
  - Full access to category filters (`All`, `Data Engineering`, `Backend & Web`, `AI & Automation`, `Product & Creative`), search bar, and "Case Study" drawer inspection.
  - Star (pinned) icon is read-only (`cursor-default`).
  - `+ Add Project`, `Export initialData.js`, and `Trash2` delete buttons are hidden from public visitors.
- **Owner Write Controls:**
  - When unlocked in CMS Write mode, displays the `+ Add Project` drawer button, `Export initialData.js` button, interactive Star toggle for Bento pinning, and delete actions.

### 4.4. Deep Case Study Slide-Over Drawer (`src/components/CaseStudyDrawer.jsx`)
- Slide-over drawer panel from the right (`max-w-2xl bg-[#0c0c0e]/95 backdrop-blur-2xl border-l border-zinc-800 z-50`) with backdrop blur and Escape key handler.
- **Structured Sections:**
  1. **Header:** Category pill, Year, Title, status badge, outcome metric badge, and external repository link.
  2. **Operational Bottlenecks & Problem Statement:** Clear context callout on operational friction solved.
  3. **Visual Node-and-Arrow Architecture Diagram:** Interactive pipeline layout (`01 Intake ➔ 02 Validation/ETL ➔ 03 Storage ➔ 04 Telemetry UI`) with step numbering and detailed stage descriptions.
  4. **Key Technical Tradeoffs & Decisions:** Bullet points detailing architectural decisions.
  5. **Quantified Production Impact:** Highlighted outcome callout box.

### 4.5. Technical Blog & Live CMS (`src/components/BlogCMS.jsx`)
- **Public Reader Mode:**
  - Clean article list and full article reading view with syntax-highlighted code blocks, copy button, word count telemetry, and image lightbox.
  - Readers can download articles in Markdown via the **"Download .md"** button.
  - CMS edit buttons, article creation (`New Post`), and article deletion are hidden from public visitors.
- **Owner CMS Write Mode:**
  - Unlocks inline Markdown post editor, `Import .md File` reader, `Sync initialData.js` trigger, and article editing/deletion.

### 4.6. Production State Exporter ("Sync to Codebase") (`src/components/ExportInitialDataModal.jsx`)
- **ES Module Generator:** Serializes live `localStorage` state (`projects`, `posts`, `creativeItems`, `techStack`, `experienceItems`) into a valid, formatted ES module matching `src/data/initialData.js`.
- **One-Click Actions:**
  - **"Copy initialData.js to Clipboard"** with floating toast confirmation.
  - **"Download initialData.js"** as an ES module file for direct codebase replacement before Git commits.
  - **"Export JSON Backup"** (`portfolio-backup.json`) for cross-browser state migration.
  - **"Import JSON Backup"** with schema verification and automatic state hydration.

### 4.7. Floating Pill Navbar (`src/components/Navbar.jsx`)
- Brand avatar with monogram `"A"` and display name `"Abhigyan"`.
- Navigation tabs: `WORK`, `ARCHIVE`, `WRITING` (public) or `BLOG / CMS` (owner), and `CONTACT` (`abhigyan62001@gmail.com`).
- **Public Mode:** Renders a clean `"● Available for Roles"` pill button in the right action slot that copies `abhigyan62001@gmail.com`.
- **Owner Mode:** Renders `CMS: WRITE` / `CMS: READ` mode toggle, `Sync Codebase` button, and a `Lock` button to immediately return to Public Read-Only mode.

### 4.8. Security & Owner Authentication (`OwnerUnlockModal.jsx`)
- **Auto-Unlock Criteria:** Automatically activates owner permissions if `window.location.hostname` is `localhost` or `127.0.0.1`, if the URL contains `?admin=true`, or if `sessionStorage` has `'abhigyan_cms_unlocked' === 'true'`.
- **On-Demand Unlock (`Shift + A` / Footer Trigger):**
  - Pressing `Shift + A` (outside inputs) or clicking `"🔒 Owner"` in the footer opens the sleek **Owner CMS Unlock Modal**.
  - Securely verifies PIN against `import.meta.env.VITE_CMS_PIN || '2026'`.
  - Persists authorization in `sessionStorage` for the duration of the browser session.
- **Instant Lock:** Clicking the Lock icon in the Navbar immediately revokes session permissions and returns the UI to public read-only mode.

---

## 5. Performance & Build Verification

- **Vite 6 Production Build:** Passed with zero warnings or errors.
- **Bundle Metrics:**
  - `dist/index.html`: ~1.1 kB
  - `dist/assets/index-*.css`: ~44 kB
  - `dist/assets/index-*.js`: ~273 kB
- **Local Dev Server:** Active on `http://127.0.0.1:5173/` with sub-10ms HMR.
