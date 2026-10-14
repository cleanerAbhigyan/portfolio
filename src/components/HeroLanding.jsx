import React, { useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  ChevronDown,
  Cpu,
  Sparkles
} from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';

/**
 * ParallaxPortrait
 * Displays the studio portrait with smooth 60fps 3D parallax tilt
 * driven by mouse cursor position or device gyroscope, with warm ambient studio lighting.
 */
export function ParallaxPortrait({ portraitSrc = '/image.png' }) {
  const { nx, ny } = useMousePosition();
  const [imgLoaded, setImgLoaded] = useState(true);

  // Subtle 3D Parallax Tilt (clamped to max 4 degrees)
  const tiltX = (-ny * 4).toFixed(2);
  const tiltY = (nx * 4).toFixed(2);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Ambient Radial Spotlight Backing */}
      <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-tr from-amber-500/20 via-rose-500/10 to-emerald-500/10 rounded-full blur-3xl opacity-75 pointer-events-none transition-all duration-700" />

      {/* 3D Tilt Wrapper */}
      <div
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.12s ease-out'
        }}
        className="relative w-[300px] h-[360px] sm:w-[380px] sm:h-[450px] md:w-[420px] md:h-[500px] rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5"
      >
        {/* Portrait Image */}
        {imgLoaded ? (
          <img
            src={portraitSrc}
            alt="Abhigyan - Portrait"
            onError={() => setImgLoaded(false)}
            className="w-full h-full object-cover object-center pointer-events-none brightness-95 contrast-105"
          />
        ) : (
          /* Clean Obsidian Silhouette Fallback with Monogram A if image is missing */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 font-mono text-3xl font-bold tracking-tighter shadow-lg">
              <span>A</span>
            </div>
            <div className="font-mono text-sm font-bold text-zinc-200">
              Abhigyan
            </div>
            <div className="text-xs text-zinc-500 font-mono mt-1">
              Add image.png to /public
            </div>
          </div>
        )}

        {/* Studio Vignette / Lighting Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/30 via-transparent to-zinc-950/30 pointer-events-none" />

        {/* Bottom Corner Telemetry Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-400 z-20 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Portrait</span>
          </div>

          <div className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-950/70 border border-zinc-800/80 text-zinc-400">
            60 FPS Parallax
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * HeroLanding
 * The full-viewport split-screen interactive landing hero section.
 */
export default function HeroLanding({
  onDownloadResume,
  onCopyEmail,
  onExploreBento,
  darkMode = true
}) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-6 pb-12 sm:pb-16 overflow-hidden">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Radial ambient glow behind portrait and typography */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-600/15 via-rose-600/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] rounded-full bg-emerald-600/10 blur-[130px]" />
      </div>

      {/* Main Split-Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center flex-1">
        {/* ==========================================
            LEFT COLUMN (Typography & CTAs)
           ========================================== */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 pr-0 lg:pr-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              DATA & AI ENGINEER • FULL-STACK BUILDER
            </span>
          </div>

          {/* Editorial Greeting & Display Title */}
          <div className="space-y-2">
            <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-zinc-400 font-medium">
              HI, I'M
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-zinc-100">
              Abhigyan
              <span className="italic font-serif font-normal bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                .
              </span>
            </h1>
          </div>

          {/* Concise Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-300/90 font-light max-w-xl">
            Designing resilient data pipelines, backend architectures, and AI-driven digital products with clean code and creative systems.
          </p>

          {/* Core Architectural Pillars */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {[
              'Enterprise REST Sync',
              'Python & Dash Telemetry',
              'Docker Microservices',
              'Claude MCP Agents',
              'Notion OS Systems'
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-lg border border-zinc-800 bg-zinc-900/70 text-zinc-300 text-xs font-mono"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Pill CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            {/* Primary: RESUME */}
            <button
              onClick={onDownloadResume}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 bg-zinc-100 hover:bg-white text-zinc-950 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Secondary: LET'S TALK */}
            <button
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>LET'S TALK</span>
            </button>
          </div>
        </div>

        {/* ==========================================
            RIGHT COLUMN (Clean 3D Parallax Portrait)
           ========================================== */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <ParallaxPortrait portraitSrc="/image.png" />
        </div>
      </div>

      {/* ==========================================
          BOTTOM BENTO JUMP INDICATOR & SEAMLESS TRANSITION
         ========================================== */}
      <div className="pt-10 sm:pt-14 flex flex-col items-center justify-center">
        <button
          onClick={onExploreBento}
          className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase font-medium">
            Explore Bento Architecture
          </span>
          <div className="w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all">
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>

        {/* Minimalist 1px Divider seam connecting to Bento Grid */}
        <div className="w-full max-w-6xl mt-6 border-b border-zinc-800/80" />
      </div>
    </section>
  );
}
