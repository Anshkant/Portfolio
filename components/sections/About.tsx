"use client";

import React from "react";
import { profileData } from "@/lib/content/profile";
import {
  Cpu,
  ChartLineUp,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl px-6 py-20"
    >
      {/* Header — Concise & Punchy */}
      <div className="mb-12 max-w-2xl">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          About the Dual Track
        </h2>
        <p className="font-body text-base text-text-muted">
          Software engineering provides the architecture; data analytics
          provides the directional truth. I unite both to build resilient,
          data-driven systems.
        </p>
      </div>

      {/* Clean Duality Split */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left: Concise Bio & Focus */}
        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-4 rounded-2xl border border-line bg-bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between border-b border-line/60 pb-3 font-mono text-xs text-structure">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-structure" />
                <span>Anshkant Malviya · Nagpur, India</span>
              </span>
              <span className="text-text-muted">B.Tech CSE</span>
            </div>

            <p className="font-body text-base leading-relaxed text-text-primary/95">
              Full-stack developer and data analyst with 6 months of on-site
              internship experience at <strong>Atorix IT Solutions</strong> in
              Pune. Delivered 3 production web applications, optimized MongoDB
              APIs by 35%, and engineered VanRakshak AI—a published
              peer-reviewed AI surveillance pipeline (
              <strong>IJRASET79908</strong>) achieving 92%+ detection accuracy.
            </p>

            <div className="grid grid-cols-1 gap-2.5 pt-2 font-mono text-xs text-text-muted sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-bg-primary/60 p-2.5">
                <span className="block font-medium text-structure">
                  Software:
                </span>
                <span>Next.js · Node.js · APIs</span>
              </div>
              <div className="rounded-xl border border-line bg-bg-primary/60 p-2.5">
                <span className="block font-medium text-signal">
                  Analytics:
                </span>
                <span>Python · Pandas · SQL</span>
              </div>
              <div className="rounded-xl border border-line bg-bg-primary/60 p-2.5">
                <span className="block font-medium text-purple-400">
                  AI / Vision:
                </span>
                <span>YOLOv8 · OpenCV</span>
              </div>
            </div>
          </div>

          {/* Duality Synthesis Banner */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-line/80 bg-gradient-to-r from-structure/10 via-bg-surface to-signal/10 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-structure/20 text-structure">
                <Cpu size={18} weight="bold" />
              </div>
              <div>
                <div className="font-mono text-xs font-medium text-text-primary">
                  Software Structure
                </div>
                <div className="text-xs text-text-muted">
                  Production Web Applications
                </div>
              </div>
            </div>

            <span className="hidden rounded bg-bg-primary/50 px-2.5 py-1 font-mono text-xs text-text-muted sm:inline-block">
              ⇄
            </span>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal/20 text-signal">
                <ChartLineUp size={18} weight="bold" />
              </div>
              <div>
                <div className="font-mono text-xs font-medium text-text-primary">
                  Analytical Signal
                </div>
                <div className="text-xs text-text-muted">
                  Data Cleaning & Insights
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Key Verified Metrics */}
        <div className="grid grid-cols-2 gap-3.5 lg:col-span-5">
          {profileData.verifiedStats.map((stat, i) => {
            const isStructure = stat.lean === "structure";
            const isSignal = stat.lean === "signal";
            const accentColor = isStructure
              ? "text-structure"
              : isSignal
                ? "text-signal"
                : "text-purple-400";

            return (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-line bg-bg-surface p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors hover:border-line-highlight"
              >
                <div>
                  <span
                    className={`font-display text-3xl font-bold ${accentColor} mb-1 block`}
                  >
                    {stat.value}
                  </span>
                  <h3 className="mb-1 font-display text-sm font-medium text-text-primary">
                    {stat.label}
                  </h3>
                </div>
                <p className="font-body text-xs leading-relaxed text-text-muted">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
