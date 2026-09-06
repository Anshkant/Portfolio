"use client";

import React from "react";
import { profileData } from "@/lib/content/profile";
import { Cpu, ChartLineUp, ShieldCheck, GitFork } from "@phosphor-icons/react";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl px-6 py-28"
    >
      {/* Background soft glow accents */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-structure/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-signal/5 blur-[120px]" />

      {/* Main Section Header (No cliché tracked-out uppercase eyebrow) */}
      <div className="mb-16 max-w-3xl">
        <h2 className="mb-4 font-display text-3xl font-medium tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          Two disciplines, one continuous pipeline.
        </h2>
        <p className="max-w-[65ch] font-body text-base leading-relaxed text-text-muted sm:text-lg">
          Software engineering provides the architecture; data analytics
          provides the directional truth. I unite both to build software that
          answers real operational questions.
        </p>
      </div>

      {/* Asymmetric Duality Split */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Left Column: Narrative First-Person Bio (Lean Structure) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-9">
            <div className="mb-6 flex items-center gap-2 font-mono text-xs text-structure">
              <span className="h-2 w-2 rounded-full bg-structure" />
              <span>Perspective · Nagpur, India</span>
            </div>

            <div className="space-y-4 font-body text-base leading-relaxed text-text-muted">
              {profileData.aboutBio.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-text-primary/90">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">
                  Education:
                </span>
                <span>B.Tech CSE, Computer Science</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">
                  Core Stack:
                </span>
                <span className="text-structure">Next.js</span>
                <span>·</span>
                <span className="text-signal">Python</span>
                <span>·</span>
                <span className="text-purple-400">YOLOv8</span>
              </div>
            </div>
          </div>

          {/* Duality Synthesis Banner */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line/80 bg-gradient-to-r from-structure/10 via-bg-surface to-signal/10 p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-structure/20 text-structure">
                <Cpu size={18} weight="bold" />
              </div>
              <div>
                <div className="font-mono text-xs font-medium text-text-primary">
                  Software Structure
                </div>
                <div className="text-xs text-text-muted">
                  APIs, MongoDB, Next.js
                </div>
              </div>
            </div>

            <span className="rounded bg-bg-primary/50 px-2 py-1 font-mono text-xs text-text-muted">
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
                  Pandas, Power BI, SQL, EDA
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real Verified Stats & Metrics (Lean Signal) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {profileData.verifiedStats.map((stat, i) => {
            const isStructure = stat.lean === "structure";
            const isSignal = stat.lean === "signal";
            const accentColor = isStructure
              ? "text-structure"
              : isSignal
                ? "text-signal"
                : "text-purple-400";
            const borderColor = isStructure
              ? "hover:border-structure/40"
              : isSignal
                ? "hover:border-signal/40"
                : "hover:border-purple-400/40";

            return (
              <div
                key={i}
                className={`group rounded-2xl border border-line bg-bg-surface p-6 transition-all duration-300 ${borderColor} shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]`}
              >
                <div className="mb-2 flex items-baseline justify-between">
                  <span
                    className={`font-display text-3xl font-medium sm:text-4xl ${accentColor}`}
                  >
                    {stat.value}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {stat.lean}
                  </span>
                </div>
                <h3 className="mb-1 font-display text-base font-medium text-text-primary">
                  {stat.label}
                </h3>
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
