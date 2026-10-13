# System Architecture & Technical Specifications

This document outlines the architecture, data flow, component hierarchy, and mathematical models powering the **Abhigyan Singh Portfolio & CMS** application.

---

## 1. Component Hierarchy & Flow

```mermaid
graph TD
    App[App.jsx - Root State & Theme Orchestrator]
    
    App --> Navbar[Navbar.jsx - Floating Glassmorphic Pill]
    App --> Hero[HeroLanding.jsx - Full Viewport Landing]
    App --> Bento[BentoHub.jsx - Linear-Style Bento Grid]
    App --> Archive[ProjectArchive.jsx - Full Filterable Directory]
    App --> Blog[BlogCMS.jsx - Reader & Markdown CMS]
    App --> Drawer[CaseStudyDrawer.jsx - Slide-Over Architecture View]
    App --> Modal[ExportInitialDataModal.jsx - Codebase Sync & Backup]
    
    Hero --> Portrait[ParallaxPortrait - 3D Tilt & Studio Lighting]
    
    App --> HookStorage[useLocalStorage.js]
    Hero --> HookMouse[useMousePosition.js]
    Portrait --> HookMouse
    
    HookStorage --> LS[(window.localStorage)]
    HookStorage --> InitData[initialData.js - Default Seed Data]
```

---

## 2. State Distribution & Data Lifecycle

```mermaid
sequenceDiagram
    participant User as Browser / User
    participant App as App.jsx
    participant Hook as useLocalStorage
    participant LS as window.localStorage
    participant Sub as Child Views (Archive/CMS)

    User->>App: Mounts Application
    App->>Hook: Read 'abhigyan_portfolio_projects_v1'
    Hook->>LS: getItem(key)
    alt Value found in localStorage
        LS-->>Hook: Stored JSON data
    else Empty / First Load
        Hook-->>App: Seed data from initialData.js
    end
    
    User->>Sub: Creates Project / Publishes Blog Post
    Sub->>App: setProjects(...) / setPosts(...)
    App->>Hook: State update triggered
    Hook->>LS: setItem(key, JSON.stringify(val))
    App->>User: Renders updated view + triggers CheckCircle2 Toast
```

---

## 3. Mathematical Models & Coordinate Geometry

### 3.1. 60 FPS Normalized Cursor Tracker (`useMousePosition.js`)

Mouse and mobile gyroscope events are captured with `{ passive: true }` and buffered through `requestAnimationFrame` to ensure zero layout thrashing:

$$\text{nx} = \operatorname{clamp}\left(-1, 1, \frac{2 \cdot X}{\text{viewportWidth}} - 1\right)$$

$$\text{ny} = \operatorname{clamp}\left(-1, 1, \frac{2 \cdot Y}{\text{viewportHeight}} - 1\right)$$

Where:
- $\text{nx} \in [-1, 1]$: Normalized horizontal position (`-1` = left edge, `0` = center, `+1` = right edge).
- $\text{ny} \in [-1, 1]$: Normalized vertical position (`-1` = top edge, `0` = center, `+1` = bottom edge).

### 3.2. 3D Parallax Tilt

The portrait container applies a smooth perspective transform:

$$\text{rotateX} = -\text{ny} \times 4^\circ$$

$$\text{rotateY} = \text{nx} \times 4^\circ$$

$$\text{style} = \text{perspective}(1000\text{px})\;\text{rotateX}(\text{rotateX})\;\text{rotateY}(\text{rotateY})$$

---

## 4. Design System Tokens

| Design Token | CSS / Tailwind Class | Hex / HSL Value |
|---|---|---|
| **Background (Dark)** | `bg-[#09090b]` | `hsl(240, 10%, 3.9%)` |
| **Card Surface (Dark)** | `bg-[#111114]` | `hsl(240, 8%, 7%)` |
| **Border Subtle** | `border-zinc-800/80` | `rgba(39, 39, 42, 0.8)` |
| **Accent Emerald** | `text-emerald-400`, `bg-emerald-500` | `#34d399` / `#10b981` |
| **Warm Spotlight Amber** | `from-amber-500/20` | `rgba(245, 158, 11, 0.2)` |
| **Crimson Glow Layer** | `via-rose-600/10` | `rgba(225, 29, 72, 0.1)` |
| **Glass Backdrop Blur** | `backdrop-blur-xl` | `blur(24px)` |
| **Monospace Typography** | `font-mono` | `JetBrains Mono, Fira Code, monospace` |
| **Editorial Serif** | `font-serif`, `font-display` | `Newsreader, Playfair Display, serif` |
