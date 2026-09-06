"use client";

import React from "react";
import { profileData } from "@/lib/content/profile";
import {
  ArrowSquareOut,
  Code,
  ChartBar,
  TerminalWindow,
} from "@phosphor-icons/react";

export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-between px-6 pb-12 pt-28">
      {/* Top duality indicator pill */}
      <div className="flex items-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-line bg-bg-surface/80 px-3.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
          <span className="flex items-center gap-1.5 font-mono text-xs text-structure">
            <span className="h-2 w-2 animate-pulse rounded-full bg-structure" />
            Structure (Software)
          </span>
          <span className="text-xs text-text-muted">⇄</span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-signal">
            <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
            Signal (Data)
          </span>
        </div>
      </div>

      {/* Main Hero Stack */}
      <div className="my-auto max-w-3xl py-8">
        <h1 className="mb-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
          I turn scattered data into decisions, and decisions into software.
        </h1>

        <p className="mb-8 max-w-[62ch] font-body text-base leading-relaxed text-text-muted sm:text-lg">
          {profileData.tagline} B.Tech CSE in Nagpur, India, engineering
          production-grade web systems, data pipelines, and computer vision
          models.
        </p>

        {/* Dual Actions with Button-in-Button Trailing Icons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 rounded-full bg-text-primary px-6 py-3.5 text-sm font-medium text-bg-primary shadow-lg shadow-white/5 transition-all duration-300 hover:bg-white active:scale-[0.98]"
          >
            <span>Explore Projects</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-primary/10 transition-transform duration-300 group-hover:translate-x-0.5">
              <Code size={14} weight="bold" className="text-bg-primary" />
            </span>
          </a>

          <a
            href={profileData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-line bg-bg-surface/80 px-6 py-3.5 text-sm font-medium text-text-primary transition-all duration-300 hover:border-line-highlight hover:bg-bg-elevated active:scale-[0.98]"
          >
            <span>Connect on LinkedIn</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowSquareOut
                size={14}
                weight="bold"
                className="text-text-muted group-hover:text-text-primary"
              />
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="grid grid-cols-2 gap-3 border-t border-line/60 pt-6 md:grid-cols-4">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
          <TerminalWindow size={15} className="text-structure" />
          <span>Dev Track: Next.js · Node.js</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
          <ChartBar size={15} className="text-signal" />
          <span>Data Track: Python · SQL · Power BI</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Flagship: VanRakshak AI (92%+)</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
          <span className="text-text-muted/60">Location:</span>
          <span className="text-text-primary">Nagpur, India</span>
        </div>
      </div>
    </div>
  );
}
