"use client";

import React from "react";
import { skillsData } from "@/lib/content/skills";
import { Code, Database, Eye, Check } from "@phosphor-icons/react";

export function Skills() {
  const softwareTrack = skillsData.find((s) => s.track === "structure")!;
  const bridgeTrack = skillsData.find((s) => s.track === "bridge")!;
  const dataTrack = skillsData.find((s) => s.track === "signal")!;

  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-6xl px-6 py-28"
    >
      {/* Section Header */}
      <div className="mb-16 max-w-3xl">
        <h2 className="mb-4 font-display text-3xl font-medium tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          Technical capabilities across two disciplines.
        </h2>
        <p className="max-w-[65ch] font-body text-base leading-relaxed text-text-muted sm:text-lg">
          Organized into two distinct operational tracks—deterministic software
          architecture on the left, probabilistic data analytics on the
          right—converging at applied AI and computer vision.
        </p>
      </div>

      {/* Connected 3-Column Architecture with Circuit Spine */}
      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Track 1: Software Engineering (Left / Indigo) */}
        <div className="flex flex-col justify-between rounded-2xl border border-line bg-bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors duration-300 hover:border-structure/40 lg:col-span-4">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-structure/15 text-structure">
                <Code size={20} weight="bold" />
              </div>
              <span className="rounded-full border border-structure/25 bg-structure/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-structure">
                Structure
              </span>
            </div>

            <h3 className="mb-1 font-display text-xl font-medium text-text-primary">
              {softwareTrack.title}
            </h3>
            <p className="mb-4 font-mono text-xs text-structure">
              {softwareTrack.subtitle}
            </p>
            <p className="mb-6 font-body text-xs leading-relaxed text-text-muted">
              {softwareTrack.description}
            </p>

            {/* Tech Badges */}
            <div className="mb-6">
              <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Core Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {softwareTrack.skills.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-md border border-line bg-bg-primary px-2.5 py-1 font-mono text-xs text-text-primary/90 transition-colors hover:border-structure/40"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="border-t border-line pt-5">
            <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Focus Domains
            </div>
            <ul className="space-y-1.5">
              {softwareTrack.focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-xs text-text-muted"
                >
                  <Check
                    size={12}
                    weight="bold"
                    className="shrink-0 text-structure"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Track 2: Bridge - AI & Computer Vision (Center / Violet) */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 via-bg-surface to-bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300 hover:border-purple-400/50 lg:col-span-4">
          {/* Top Connective Beam */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-structure via-purple-400 to-signal" />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                <Eye size={20} weight="bold" />
              </div>
              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-purple-300">
                Connective Bridge
              </span>
            </div>

            <h3 className="mb-1 font-display text-xl font-medium text-text-primary">
              {bridgeTrack.title}
            </h3>
            <p className="mb-4 font-mono text-xs text-purple-400">
              {bridgeTrack.subtitle}
            </p>
            <p className="mb-6 font-body text-xs leading-relaxed text-text-muted">
              {bridgeTrack.description}
            </p>

            {/* Tech Badges */}
            <div className="mb-6">
              <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Vision & Neural Models
              </div>
              <div className="flex flex-wrap gap-2">
                {bridgeTrack.skills.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-md border border-purple-500/30 bg-purple-950/40 px-2.5 py-1 font-mono text-xs text-purple-200 transition-colors hover:border-purple-400"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="border-t border-purple-500/20 pt-5">
            <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Focus Domains
            </div>
            <ul className="space-y-1.5">
              {bridgeTrack.focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-xs text-text-muted"
                >
                  <Check
                    size={12}
                    weight="bold"
                    className="shrink-0 text-purple-400"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Track 3: Data Analytics (Right / Amber) */}
        <div className="flex flex-col justify-between rounded-2xl border border-line bg-bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors duration-300 hover:border-signal/40 lg:col-span-4">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal/15 text-signal">
                <Database size={20} weight="bold" />
              </div>
              <span className="rounded-full border border-signal/25 bg-signal/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-signal">
                Signal
              </span>
            </div>

            <h3 className="mb-1 font-display text-xl font-medium text-text-primary">
              {dataTrack.title}
            </h3>
            <p className="mb-4 font-mono text-xs text-signal">
              {dataTrack.subtitle}
            </p>
            <p className="mb-6 font-body text-xs leading-relaxed text-text-muted">
              {dataTrack.description}
            </p>

            {/* Tech Badges */}
            <div className="mb-6">
              <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Analytics & Analytics Stacks
              </div>
              <div className="flex flex-wrap gap-2">
                {dataTrack.skills.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-md border border-line bg-bg-primary px-2.5 py-1 font-mono text-xs text-text-primary/90 transition-colors hover:border-signal/40"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="border-t border-line pt-5">
            <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Focus Domains
            </div>
            <ul className="space-y-1.5">
              {dataTrack.focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-xs text-text-muted"
                >
                  <Check
                    size={12}
                    weight="bold"
                    className="shrink-0 text-signal"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
