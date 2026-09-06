"use client";

import React from "react";
import { projectsData } from "@/lib/content/projects";
import {
  GithubLogo,
  ArrowSquareOut,
  ShieldCheck,
  TrendUp,
  HardDrives,
  Pulse,
} from "@phosphor-icons/react";

export function Projects() {
  const flagship = projectsData.find((p) => p.isFlagship)!;
  const secondaryProjects = projectsData.filter((p) => !p.isFlagship);

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl px-6 py-28"
    >
      {/* Section Header */}
      <div className="mb-16 max-w-3xl">
        <h2 className="mb-4 font-display text-3xl font-medium tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          Featured systems & investigations.
        </h2>
        <p className="max-w-[65ch] font-body text-base leading-relaxed text-text-muted sm:text-lg">
          Real-world applications spanning computer vision surveillance
          pipelines, enterprise software architectures, and high-stakes clinical
          and business analytics.
        </p>
      </div>

      {/* Flagship Centerpiece: VanRakshak AI */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-purple-500/30 bg-bg-surface p-6 shadow-2xl shadow-purple-950/20 sm:p-10">
        {/* Accent Glow Strip */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-structure via-purple-500 to-signal" />

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Column: Details */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-purple-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-purple-300">
                Flagship Project · {flagship.leanLabel}
              </span>
            </div>

            <h3 className="font-display text-3xl font-medium text-text-primary sm:text-4xl">
              {flagship.title}
            </h3>

            <p className="font-mono text-sm text-purple-300/90">
              {flagship.tagline}
            </p>

            <p className="font-body text-sm leading-relaxed text-text-muted sm:text-base">
              {flagship.longDescription || flagship.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {flagship.metrics?.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-line bg-bg-primary/60 p-3"
                >
                  <div className="font-display text-lg font-medium text-purple-300">
                    {m.value}
                  </div>
                  <div className="font-mono text-[11px] leading-tight text-text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Architecture Highlights */}
            <div className="pt-2">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Engineered Capabilities
              </div>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
              <div className="flex flex-wrap gap-2">
                {flagship.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-purple-500/30 bg-purple-950/40 px-2.5 py-1 font-mono text-xs text-purple-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={flagship.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-purple-500 px-5 py-2.5 text-xs font-medium text-white shadow-md shadow-purple-500/20 transition-all duration-200 hover:bg-purple-600 active:scale-95"
              >
                <GithubLogo size={16} weight="bold" />
                <span>View Repository</span>
                <ArrowSquareOut size={14} weight="bold" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Vision Pipeline Visualizer */}
          <div className="space-y-4 rounded-2xl border border-line bg-bg-primary/90 p-5 font-mono text-xs text-text-muted lg:col-span-5">
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
            <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl border border-line/80 bg-gradient-to-br from-bg-surface to-bg-primary p-3.5">
              {/* Grid overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(#A78BFA 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Bounding box mock */}
              <div className="relative z-10 h-24 w-36 rounded border border-purple-400 bg-purple-500/10 p-1.5">
                <div className="w-max rounded bg-bg-primary/90 px-1 py-0.5 font-mono text-[10px] text-purple-300">
                  YOLOv8: Wildlife (0.94)
                </div>
                <div className="absolute bottom-1 right-1 font-mono text-[9px] text-purple-400">
                  DeepSORT #104
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-text-muted">
                <span>FPS: 30.2</span>
                <span>LATENCY: 14ms</span>
                <span>INFERENCE: CUDA</span>
              </div>
            </div>

            {/* Pipeline Step Log */}
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-text-muted">
                <span className="text-text-primary">1. Stream Ingest</span>
                <span className="text-purple-300">FastAPI Buffer</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span className="text-text-primary">2. Neural Detection</span>
                <span className="text-purple-300">YOLOv8 Weights</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span className="text-text-primary">3. Track Association</span>
                <span className="text-purple-300">DeepSORT Kalman</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid for Remaining 3 Projects */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {secondaryProjects.map((project) => {
          const isStructure = project.lean === "structure";
          const accentColor = isStructure ? "text-structure" : "text-signal";
          const borderAccent = isStructure
            ? "border-t-structure hover:border-structure/40"
            : "border-t-signal hover:border-signal/40";
          const badgeBg = isStructure
            ? "bg-structure/10 text-structure border-structure/25"
            : "bg-signal/10 text-signal border-signal/25";

          const ProjectIcon =
            project.id === "ai-kpi-monitor"
              ? TrendUp
              : project.id === "connecting-dots-erp"
                ? HardDrives
                : Pulse;

          return (
            <div
              key={project.id}
              className={`flex flex-col justify-between rounded-2xl border border-t-2 border-line bg-bg-surface p-7 transition-all duration-300 ${borderAccent} shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${badgeBg}`}
                  >
                    {project.leanLabel}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-bg-primary ${accentColor}`}
                  >
                    <ProjectIcon size={18} weight="bold" />
                  </div>
                </div>

                <h3 className="mb-1 font-display text-xl font-medium text-text-primary">
                  {project.title}
                </h3>
                <p className={`mb-3 font-mono text-xs ${accentColor}`}>
                  {project.tagline}
                </p>
                <p className="mb-6 font-body text-xs leading-relaxed text-text-muted">
                  {project.description}
                </p>

                {/* Key Metrics */}
                {project.metrics && (
                  <div className="mb-6 space-y-1.5 border-t border-line pt-3">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between font-mono text-xs"
                      >
                        <span className="text-text-muted">{m.label}:</span>
                        <span className="font-medium text-text-primary">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Tech Pills */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line bg-bg-primary px-2 py-0.5 font-mono text-[11px] text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Repository Link */}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-between rounded-xl border border-line bg-bg-primary px-4 py-2.5 font-mono text-xs text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated"
                >
                  <span className="flex items-center gap-2">
                    <GithubLogo size={14} weight="bold" />
                    <span>View Repository</span>
                  </span>
                  <ArrowSquareOut
                    size={14}
                    weight="bold"
                    className="text-text-muted transition-colors group-hover:text-text-primary"
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
