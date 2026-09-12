"use client";

import React, { useState } from "react";
import { projectsData } from "@/lib/content/projects";
import {
  GithubLogo,
  ArrowSquareOut,
  ShieldCheck,
  TrendUp,
  HardDrives,
  Pulse,
  CaretRight,
  CaretLeft,
  type Icon,
} from "@phosphor-icons/react";

const SECONDARY_ICONS: Record<string, Icon> = {
  "ai-kpi-monitor": TrendUp,
  "connecting-dots-erp": HardDrives,
  "patient-readmission-analysis": Pulse,
  critindia: HardDrives,
};

export function Projects() {
  const flagship = projectsData.find((p) => p.isFlagship)!;
  const secondaryProjects = projectsData.filter((p) => !p.isFlagship);
  const [activeIdx, setActiveIdx] = useState(0);

  const active = secondaryProjects[activeIdx]!;
  const isStructure = active.lean === "structure";
  const isSignal = active.lean === "signal";
  const accent = isStructure
    ? {
        text: "text-structure",
        border: "border-structure",
        bg: "bg-structure/10",
        badge: "bg-structure/15 text-structure border-structure/30",
      }
    : isSignal
      ? {
          text: "text-signal",
          border: "border-signal",
          bg: "bg-signal/10",
          badge: "bg-signal/15 text-signal border-signal/30",
        }
      : {
          text: "text-purple-400",
          border: "border-purple-400",
          bg: "bg-purple-500/10",
          badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
        };

  const ProjectIcon = SECONDARY_ICONS[active.id] ?? Pulse;

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Section Header */}
      <div className="mb-10 max-w-2xl sm:mb-12">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Featured Projects
        </h2>
        <p className="font-body text-sm text-text-muted sm:text-base">
          Production software and analytical models spanning real-time computer
          vision, enterprise ERP, and clinical intelligence.
        </p>
      </div>

      {/* Flagship Centerpiece: VanRakshak AI */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-purple-500/30 bg-bg-surface p-5 shadow-2xl shadow-purple-950/20 sm:mb-10 sm:rounded-3xl sm:p-8">
        {/* Accent Glow Strip */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-structure via-purple-500 to-signal" />

        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Details */}
          <div className="space-y-4 sm:space-y-5 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-purple-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-purple-300">
                Flagship · Published Research (IJRASET79908)
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              {flagship.title}
            </h3>

            <p className="font-body text-sm leading-relaxed text-text-muted sm:text-base">
              AI-powered multi-camera surveillance pipeline published in
              IJRASET. Fuses YOLOv8 detection with DeepSORT tracking to cut
              emergency response to under 60 seconds via automated Telegram
              alerts.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 sm:grid-cols-4 sm:gap-3">
              {flagship.metrics?.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-line bg-bg-primary/60 p-2.5 sm:p-3"
                >
                  <div className="font-display text-base font-medium text-purple-300 sm:text-lg">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] leading-tight text-text-muted sm:text-[11px]">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Architecture Highlights */}
            <div className="pt-1">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Engineered Capabilities
              </div>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
                {flagship.architectureHighlights?.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-text-muted"
                  >
                    <span className="mt-0.5 text-purple-400">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Badges & GitHub Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 sm:gap-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {flagship.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-purple-500/30 bg-purple-950/40 px-2 py-1 font-mono text-[11px] text-purple-200 sm:px-2.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={flagship.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-4 py-2.5 text-xs font-medium text-white shadow-md shadow-purple-500/20 transition-all duration-200 hover:bg-purple-600 active:scale-95 sm:gap-2.5 sm:px-5"
              >
                <GithubLogo size={15} weight="bold" />
                <span>View Repository</span>
                <ArrowSquareOut size={13} weight="bold" />
              </a>
            </div>
          </div>

          {/* Right Column: Pipeline Visualizer */}
          <div className="space-y-4 rounded-2xl border border-line bg-bg-primary/90 p-4 font-mono text-xs text-text-muted sm:p-5 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="flex items-center gap-2 text-purple-300">
                <ShieldCheck size={16} weight="bold" />
                <span>SURVEILLANCE_STREAM // CAM-04</span>
              </span>
              <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-400">
                LIVE 92.4% ACC
              </span>
            </div>

            {/* Simulated Vision Detection Frame */}
            <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl border border-line/80 bg-gradient-to-br from-bg-surface to-bg-primary p-3 sm:p-3.5">
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(#A78BFA 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative z-10 h-20 w-32 rounded border border-purple-400 bg-purple-500/10 p-1.5 sm:h-24 sm:w-36">
                <div className="w-max rounded bg-bg-primary/90 px-1 py-0.5 font-mono text-[10px] text-purple-300">
                  YOLOv8: Wildlife (0.94)
                </div>
                <div className="absolute bottom-1 right-1 font-mono text-[9px] text-purple-400">
                  DeepSORT #104
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-between text-[10px] text-text-muted sm:text-[11px]">
                <span>FPS: 30.2</span>
                <span>LATENCY: 14ms</span>
                <span>CUDA</span>
              </div>
            </div>

            {/* Pipeline Steps */}
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-text-primary">1. Stream Ingest</span>
                <span className="text-purple-300">FastAPI Buffer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-primary">2. Neural Detection</span>
                <span className="text-purple-300">YOLOv8 Weights</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-primary">3. Track Association</span>
                <span className="text-purple-300">DeepSORT Kalman</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Project Switchboard ── */}
      <div className="overflow-hidden rounded-2xl border border-line bg-bg-surface shadow-xl shadow-black/30 sm:rounded-3xl">
        {/* Tab Selector Row */}
        <div className="scrollbar-none flex items-stretch overflow-x-auto border-b border-line bg-bg-primary/80">
          {secondaryProjects.map((p, idx) => {
            const isAct = idx === activeIdx;
            const tabAccent =
              p.lean === "structure"
                ? isAct
                  ? "border-b-2 border-structure text-structure bg-structure/5"
                  : "text-text-muted hover:text-text-primary"
                : p.lean === "signal"
                  ? isAct
                    ? "border-b-2 border-signal text-signal bg-signal/5"
                    : "text-text-muted hover:text-text-primary"
                  : isAct
                    ? "border-b-2 border-purple-400 text-purple-300 bg-purple-500/5"
                    : "text-text-muted hover:text-text-primary";

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`flex shrink-0 flex-col items-start gap-0.5 px-4 py-3 font-mono text-xs transition-all duration-200 sm:px-5 sm:py-4 ${tabAccent}`}
              >
                <span className="font-medium">
                  {p.title.split("—")[0]?.trim() ?? p.title}
                </span>
                <span className="text-[10px] text-text-muted">
                  {p.leanLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Project Detail Panel */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
          {/* Left: Project Info */}
          <div className="border-b border-line p-5 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-center justify-between">
              <span
                className={`rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${accent.badge}`}
              >
                {active.leanLabel}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl bg-bg-primary ${accent.text}`}
              >
                <ProjectIcon size={18} weight="bold" />
              </div>
            </div>

            <h3 className="mb-1 font-display text-xl font-bold text-text-primary sm:text-2xl">
              {active.title}
            </h3>
            <p className={`mb-3 font-mono text-xs ${accent.text}`}>
              {active.tagline}
            </p>
            <p className="mb-5 font-body text-sm leading-relaxed text-text-muted">
              {active.description}
            </p>

            {/* Metric Bars */}
            {active.metrics && (
              <div className="mb-5 space-y-2.5 rounded-xl border border-line bg-bg-primary/60 p-4">
                <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Key Metrics
                </div>
                {active.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between font-mono text-xs"
                  >
                    <span className="text-text-muted">{m.label}</span>
                    <span className={`font-semibold ${accent.text}`}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Pills */}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {active.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded border border-line bg-bg-primary px-2 py-0.5 font-mono text-[11px] text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap gap-2.5">
              <a
                href={active.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-primary px-4 py-2.5 font-mono text-xs text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated"
              >
                <GithubLogo size={14} weight="bold" />
                <span>Repository</span>
                <ArrowSquareOut
                  size={12}
                  weight="bold"
                  className="text-text-muted"
                />
              </a>
              {active.liveUrl && (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-xs transition-colors duration-200 ${accent.badge} hover:opacity-90`}
                >
                  <ArrowSquareOut size={13} weight="bold" />
                  <span>Live Site</span>
                </a>
              )}
            </div>
          </div>

          {/* Right: Architecture Dossier */}
          <div className="flex flex-col justify-between bg-bg-primary/50 p-5 sm:p-8 lg:col-span-5">
            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isStructure ? "bg-structure" : isSignal ? "bg-signal" : "bg-purple-400"}`}
                />
                Architecture Highlights
              </div>

              {active.architectureHighlights ? (
                <ul className="space-y-3">
                  {active.architectureHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 font-mono text-xs font-bold ${accent.text}`}
                      >
                        0{i + 1}
                      </span>
                      <span className="font-body text-xs leading-relaxed text-text-muted">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-body text-xs leading-relaxed text-text-muted">
                  {active.longDescription}
                </p>
              )}
            </div>

            {/* Prev / Next Navigation */}
            <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
              <button
                type="button"
                onClick={() =>
                  setActiveIdx(
                    (i) =>
                      (i - 1 + secondaryProjects.length) %
                      secondaryProjects.length
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-surface text-text-muted transition-colors hover:border-line-highlight hover:text-text-primary"
                aria-label="Previous project"
              >
                <CaretLeft size={15} weight="bold" />
              </button>
              <span className="font-mono text-xs text-text-muted">
                {activeIdx + 1} / {secondaryProjects.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveIdx((i) => (i + 1) % secondaryProjects.length)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-surface text-text-muted transition-colors hover:border-line-highlight hover:text-text-primary"
                aria-label="Next project"
              >
                <CaretRight size={15} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
