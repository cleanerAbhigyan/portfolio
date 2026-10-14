# Upcoming Changes & Roadmap (NEXT_CHANGES.md)

This document tracks upcoming architectural iterations, planned enhancements, and feature requests for the **Abhigyan Portfolio & CMS** platform.

Tasks are prioritized by engineering impact and user experience value.

---

## 🎯 Priority Matrix

| Phase | Target Area | Complexity | Priority | Status |
|---|---|---|---|---|
| **Phase 2.1** | Avatar Eye Realism, Sclera Mask, Micro-Blinking & Gyroscope | Medium | High | **Completed** |
| **Phase 2.2** | Markdown Code Syntax Highlighting, Lightbox & .md I/O | Medium | High | **Completed** |
| **Phase 2.3** | Deep Case Study Slide-Over Drawer & Architecture Diagrams | Medium | High | **Completed** |
| **Phase 2.4** | Production State Exporter ("Sync to Codebase") | Medium | High | **Completed** |
| **Phase 2.5** | Bento Hero Card De-duplication & Engineering Metrics | Low | High | **Completed** |
| **Phase 3.0** | Production CI/CD & Automated GitHub Pages / Vercel Deploy | Low | High | Next Sprint |

---

## 🛠️ Phase 2: Feature Enhancements

### 1. Interactive Avatar & Eye Rig Polish (Phase 2.1)
- [x] **Coordinate Preset Persistence:**
  - Persisted calibrated eye coordinates (`leftEyePos`, `rightEyePos`) in `localStorage` under `abhigyan_eye_rig_coords_v1` using `useLocalStorage` so manual calibrations survive page refreshes.
  - Added `INITIAL_EYE_COORDS` default export to `src/data/initialData.js`.
  - Added a "Reset Defaults" button to restore default eye rig coordinates at any time.
- [x] **Toggleable Sclera Base Mask (`scleraMask`):**
  - Added a warm-toned sclera backdrop layer (`bg-[#e8dcd5]` with inner shadow and blur) behind each pupil element to naturally mask the static photo pupils.
  - Added toggle switch and fine-tuning sliders for Eye Socket Width (`8-24px`) and Height (`5-16px`) in the calibration panel.
- [x] **Ambient Micro-Blinking Animation:**
  - Implemented natural eyelid micro-blinks triggered at randomized intervals between `4000ms` and `7000ms` using CSS `scaleY(0.08)` transitions (`duration-150`) on the eye sockets.
- [x] **Window Blur / Sleep State:**
  - Added `blur` and `focus` event listeners on `window`. When the browser tab loses focus, pupils smoothly glide back to `(0, 0)` with an 800ms ease and the specular catchlights dim to 20%; live tracking instantly restores upon tab focus.
- [x] **Device Orientation API (Mobile Gyroscope):**
  - Integrated `deviceorientation` event listener in `useMousePosition.js` with `gamma` and `beta` normalization clamped to `[-1, 1]`, enabling natural 3D parallax tilt and eye tracking on mobile smartphones and tablets.

---

### 2. Bento Hub De-duplication & Core Metrics
- [x] **Engineering Architecture & Core Impact Card (`src/components/BentoHub.jsx`):**
  - Replaced duplicate hero greeting, bio, and resume/email CTA buttons with a dedicated high-signal architecture card.
  - Displayed 3 quantitative engineering metric blocks: `99.8% Pipeline Reliability`, `40% Manual Ops Reduction`, and `<15ms Real-Time Telemetry`.
  - Added quick `"Open Case Studies"` trigger and kept social quick-links (`GitHub`, `LinkedIn`, `X/Twitter`).

---

### 3. Deep Case Study Slide-Over Drawer (Phase 2.3)
- [x] **`CaseStudyDrawer.jsx` Slide-Over Component:**
  - Sleek slide-over drawer from the right (`max-w-2xl bg-[#0c0c0e]/95 backdrop-blur-2xl border-l border-zinc-800 z-50`) with backdrop blur and escape key listener.
  - **Structure:**
    1. Header: Category pill, Year, Title, status badge, outcome metric badge, and external repository link.
    2. Operational Bottlenecks & Problem Statement callout box.
    3. Visual Node-and-Arrow System Architecture Pipeline Diagram (`01 Ingestion ➔ 02 Validation/ETL ➔ 03 Storage ➔ 04 Telemetry UI`).
    4. Key Architectural Decisions & Tradeoffs (e.g., SHA-256 idempotency keys, adaptive token-bucket throttlers, multi-stage Dockerization).
    5. Quantified Engineering Impact callout box.
- [x] **CMS & Seed Data Integration:**
  - Enriched `INITIAL_PROJECTS` in `src/data/initialData.js` with structured `caseStudy` records for all 10 projects.
  - Added case study inputs (problem statement, architecture pipeline stages, key tradeoffs, quantified impact) inside the "+ Add Project" modal in `ProjectArchive.jsx`.
  - Wired "Inspect Case Study" triggers into both `BentoHub.jsx` (featured projects) and `ProjectArchive.jsx` (table rows).
  - Automatically exported via `ExportInitialDataModal.jsx`.

---

### 4. Blog & CMS Engine (Phase 2.2)
- [x] **Syntax Highlighting for Code Blocks:**
  - Custom regex-powered token syntax highlighter for fenced code blocks (```` ```python ````, ```` ```javascript ````, ```` ```sql ````, ```` ```dockerfile ````, ```` ```bash ````).
  - Terminal-style container with colored window dots, uppercase language tag badge, and line numbers.
  - Interactive "Copy Code" button with working clipboard copy and `Check` icon feedback.
  - Inline code pills formatted with `bg-zinc-800/80 text-emerald-400 font-mono`.
- [x] **Dynamic Reading Time & Live Telemetry:**
  - Automatically computes reading time based on total word count (`Math.max(1, Math.ceil(words / 200)) + " min read"`).
  - Displays live word count and computed reading time badge while typing in the CMS editor.
  - Automatically saves the computed reading time to the article object.
- [x] **Article Export & Import:**
  - Reader View: "Download `.md`" button generates formatted Markdown with YAML frontmatter.
  - CMS Editor View: "Import `.md` File" button reads local files via `FileReader` and auto-populates title, tags, and content.
- [x] **Image Embedding & Lightbox:**
  - Supports Markdown image syntax `![Alt Text](url)` with rounded corners, captions, and hover zoom.
  - Click-to-zoom full-screen Lightbox modal with dark backdrop blur and dismiss button.

---

### 5. Production State Exporter ("Sync to Codebase")
- [x] **`ExportInitialDataModal.jsx` Utility:**
  - Serializes live browser `localStorage` state (`projects`, `posts`, calibrated `eyeCoords`, `techStack`, `experienceItems`, `creativeItems`) into a valid, formatted ES module matching `src/data/initialData.js`.
  - "Copy `initialData.js` to Clipboard" button with toast confirmation for quick pasting before Git commits.
  - "Download `initialData.js`" button for zero-effort file replacement.
  - "Export JSON Backup" (`portfolio-backup.json`) & "Import JSON Backup" with file picker for cross-machine backup and restore.
  - Quick-access "Sync Codebase" buttons embedded in `Navbar.jsx` (when `CMS: ON`), `BlogCMS.jsx`, and `ProjectArchive.jsx`.

---

## 🚀 Phase 3: Infrastructure & Production Deployment

- [ ] **SEO & Social Share Cards:**
  - Add Open Graph (`og:image`, `og:title`, `og:description`) and Twitter Card meta tags in `index.html`.
  - Generate a dynamic 1200x630 social preview card featuring the portrait and title typography.
- [ ] **Vercel / Cloudflare Pages Configuration:**
  - Add `vercel.json` or `_redirects` file for seamless single-page application routing and caching headers.
- [ ] **PWA & Offline Asset Caching:**
  - Configure `vite-plugin-pwa` with a Service Worker to cache `/hero-portrait.jpg` and static CSS/JS chunks for instant offline visits.
- [ ] **Lighthouse Performance Audit:**
  - Audit core web vitals to guarantee 100/100 performance, accessibility, best practices, and SEO scores.

---

## 📝 Change Log

- **v1.2.0 (Oct 2026) — Eye Rig Realism, Deep Case Study Drawer & Bento Refactor:**
  - Added `CaseStudyDrawer.jsx` slide-over with architecture node pipelines, problem statements, technical tradeoffs, and impact callouts.
  - Enriched `INITIAL_PROJECTS` with comprehensive `caseStudy` data for all 10 projects.
  - Refactored `BentoHub.jsx` top card to eliminate duplicate Hero bio/CTAs, highlighting 3 quantitative metric blocks (`99.8% Reliability`, `40% Manual Ops Reduction`, `<15ms Telemetry`).
  - Added sclera base mask with adjustable socket width/height sliders in the calibration panel.
  - Implemented randomized ambient micro-blinking (`scaleY(0.08)` every 4-7s).
  - Added window blur sleep state (pupils ease to `(0,0)`, catchlights dim) and tab focus restoration.
  - Added mobile gyroscope support via normalized `deviceorientation` event handling.

- **v1.1.0 (Oct 2026) — Phase 2.2 Execution & Production State Exporter:**
  - Added `ExportInitialDataModal.jsx` for 1-click clipboard copy, `.js` download, and JSON backup/restore.
  - Implemented terminal-style code syntax highlighting with language tags, line numbers, and copy button in `BlogCMS.jsx`.
  - Added inline code pills and image lightbox zoom.
  - Added automatic dynamic reading time calculation with live word count telemetry.
  - Implemented `.md` article download and file import in Blog CMS.
  - Implemented persistent eye rig calibration with `abhigyan_eye_rig_coords_v1` in `localStorage` and `INITIAL_EYE_COORDS` in `initialData.js`.
  - Added "Sync Codebase" buttons in Navbar, Archive, and Blog headers.

- **v1.0.0 (Oct 2026):**
  - Scaffolded React 18 + Vite 6 + Tailwind CSS 3 project.
  - Extracted modular `initialData.js`, `useLocalStorage.js`, and `useMousePosition.js`.
  - Created `Navbar.jsx`, `HeroLanding.jsx`, `BentoHub.jsx`, `ProjectArchive.jsx`, and `BlogCMS.jsx`.
  - Implemented 60fps cursor-following portrait with 3D tilt and interactive eye calibration rig.
  - Added full test suite verification and documentation repository in `docs/`.
