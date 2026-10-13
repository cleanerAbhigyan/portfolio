# Documentation Hub — Abhigyan Singh Portfolio

Welcome to the engineering and architectural documentation for the **Abhigyan Singh Portfolio & CMS** platform.

This directory contains the complete technical summary of what has been constructed, how the system is architected, and the prioritized roadmap for upcoming iterations and feature enhancements.

---

## 📑 Documentation Index

1. **[Project Summary (`docs/PROJECT_SUMMARY.md`)](./PROJECT_SUMMARY.md)**
   - Complete technical breakdown of the React (Vite) + Tailwind CSS + Lucide React architecture.
   - Detailed component breakdown: `Navbar`, `HeroLanding`, `BentoHub`, `ProjectArchive`, and `BlogCMS`.
   - Custom hook mechanics (`useLocalStorage`, `useMousePosition`).
   - Eye tracking calibration rig and 3D parallax mathematics.

2. **[Architecture & Component Flow (`docs/ARCHITECTURE.md`)](./ARCHITECTURE.md)**
   - Component hierarchy and state distribution.
   - Data lifecycle and `localStorage` synchronizer.
   - 60fps requestAnimationFrame mouse tracking geometry (`Math.atan2` and clamped radius).

3. **[Next Changes & Strategic Roadmap (`docs/NEXT_CHANGES.md`)](./NEXT_CHANGES.md)**
   - Prioritized roadmap across Phase 2 and Phase 3.
   - Interactive avatar enhancements (mobile gyroscope, ambient blinking).
   - Rich Markdown code syntax highlighting and case study modals.
   - Production deployment and SEO optimization guidelines.

---

## 🚀 Quick Start Guide

### Development
```bash
# Install dependencies
npm install

# Start Vite 6 dev server with HMR
npm run dev
```

### Production Build
```bash
# Typecheck & bundle for production
npm run build

# Preview production build locally
npm run preview
```
