"use client";

import React, { useState } from "react";
import { profileData } from "@/lib/content/profile";
import {
  ArrowSquareOut,
  Code,
  FileText,
  Briefcase,
  GraduationCap,
  ChartScatter,
  Compass,
} from "@phosphor-icons/react";
import { ResumeModal } from "@/components/sections/ResumeModal";

export function HeroContent() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none relative z-20 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-between px-6 pb-10 pt-28">
        {/* Top Duality Indicator Pill: Python + Data */}
        <div className="pointer-events-auto flex items-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-line bg-bg-surface/95 px-4 py-2 shadow-lg shadow-black/30 backdrop-blur-md">
            <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-structure">
              <span className="h-2 w-2 animate-pulse rounded-full bg-structure" />
              Python (Software & ML)
            </span>
            <span className="text-xs text-text-muted">⇄</span>
            <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-signal">
              <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
              Data (Analytics & Insights)
            </span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="my-auto grid grid-cols-1 items-center gap-8 py-6 lg:grid-cols-12">
          {/* Left Column: High-Contrast Foreground Text (Guaranteed Readability) */}
          <div className="pointer-events-auto max-w-2xl space-y-6 lg:col-span-7">
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-text-primary drop-shadow-md sm:text-5xl lg:text-6xl">
              I turn scattered data into decisions, and decisions into software.
            </h1>

            <p className="max-w-[56ch] font-body text-base leading-relaxed text-text-muted sm:text-lg">
              Software Engineer & Data Analyst with 6 months on-site internship
              experience at Atorix IT Solutions, Pune, and a peer-reviewed AI
              research publication (IJRASET79908).
            </p>

            {/* Action Buttons: Explore Projects, View Resume, LinkedIn */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="active:scale-98 group inline-flex items-center gap-3 rounded-full bg-text-primary px-6 py-3.5 text-sm font-medium text-bg-primary shadow-xl shadow-white/5 transition-all duration-300 hover:bg-white"
              >
                <span>Explore Projects</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-primary/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  <Code size={14} weight="bold" className="text-bg-primary" />
                </span>
              </a>

              {/* View Resume Button */}
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="active:scale-98 group inline-flex items-center gap-2.5 rounded-full border border-structure/40 bg-structure/15 px-6 py-3.5 text-sm font-medium text-structure shadow-lg shadow-structure/10 transition-all duration-300 hover:border-structure hover:bg-structure/25"
              >
                <FileText size={16} weight="bold" />
                <span>View Resume</span>
              </button>

              {/* LinkedIn */}
              <a
                href={profileData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="active:scale-98 group inline-flex items-center gap-2 rounded-full border border-line bg-bg-surface/90 px-5 py-3.5 font-mono text-xs text-text-primary transition-all duration-300 hover:border-line-highlight hover:bg-bg-elevated"
              >
                <span>LinkedIn</span>
                <ArrowSquareOut
                  size={13}
                  weight="bold"
                  className="text-text-muted transition-colors group-hover:text-text-primary"
                />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Scatter Plot Status Callout */}
          <div className="pointer-events-none hidden flex-col items-end justify-center lg:col-span-5 lg:flex">
            <div className="max-w-xs space-y-2.5 rounded-2xl border border-line/80 bg-bg-surface/85 p-4 font-mono text-xs text-text-muted shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between text-text-primary">
                <span className="flex items-center gap-1.5 font-medium text-signal">
                  <ChartScatter
                    size={16}
                    weight="bold"
                    className="text-signal"
                  />
                  <span>3D Scatter Plot (EDA)</span>
                </span>
                <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  RAW NOISE → CLUSTERS
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-muted/90">
                Particles start as a raw chaotic distribution, then assemble
                into an interactive 3D Matplotlib scatter plot with X/Y/Z
                coordinate axes. Move cursor to orbit.
              </p>
              <div className="flex items-center justify-between border-t border-line/60 pt-2 text-[10px]">
                <span className="text-signal">Amber: Signal Cluster</span>
                <span className="text-text-muted">·</span>
                <span className="text-structure">Indigo: Structure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Verified Telemetry Strip */}
        <div className="pointer-events-auto grid grid-cols-2 gap-3 border-t border-line/60 pt-6 sm:grid-cols-4">
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <Briefcase size={15} className="shrink-0 text-structure" />
            <span className="truncate">Atorix IT Solutions (Intern)</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <GraduationCap size={15} className="shrink-0 text-signal" />
            <span>CGPA: 7.98 / 10.0</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate">VanRakshak AI (92%+)</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="text-text-muted/60">Research:</span>
            <span className="truncate font-medium text-text-primary">
              IJRASET79908
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
