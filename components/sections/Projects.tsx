"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projectsData, Project } from "@/lib/content/projects";
import {
  GithubLogo,
  ArrowSquareOut,
  ShieldCheck,
  TrendUp,
  HardDrives,
  Pulse,
  CaretRight,
  CaretLeft,
  Eye,
  Lightning,
  CheckCircle,
} from "@phosphor-icons/react";

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Vertical scroll tracking on the wrapper container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth physics spring for horizontal motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Map 0 -> 1 progress to horizontal translation percentage
  // 5 slides -> translate from 0% to approximately -78%
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-78%"]);

  // Track active slide index based on scroll position
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        projectsData.length - 1,
        Math.max(0, Math.floor(latest * projectsData.length))
      );
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  // Click navigation: jump to specific project slide
  const scrollToProject = (index: number) => {
    if (!targetRef.current) return;
    const targetTop = targetRef.current.offsetTop;
    const targetHeight = targetRef.current.offsetHeight - window.innerHeight;
    const targetScrollY =
      targetTop + (index / (projectsData.length - 1)) * targetHeight;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative h-[380vh] w-full bg-bg-primary"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
        {/* Top Progress & Navigation Header */}
        <div className="relative z-30 mx-auto w-full max-w-7xl">
          {/* Animated Horizontal Progress Bar */}
          <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-bg-surface">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-structure via-purple-400 to-signal"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-text-muted sm:text-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-structure" />
                <span>Featured Engineering &amp; AI Works</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Horizontal Project Showcase
              </h2>
            </div>

            {/* Slide Index Counter & Prev/Next Controls */}
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-line bg-bg-surface px-3 py-1 font-mono text-xs font-semibold text-text-primary">
                0{activeIndex + 1}{" "}
                <span className="text-text-muted">
                  / 0{projectsData.length}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToProject(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-surface text-text-muted transition-colors hover:border-line-highlight hover:text-text-primary disabled:opacity-40"
                  aria-label="Previous project"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    scrollToProject(
                      Math.min(projectsData.length - 1, activeIndex + 1)
                    )
                  }
                  disabled={activeIndex === projectsData.length - 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-surface text-text-muted transition-colors hover:border-line-highlight hover:text-text-primary disabled:opacity-40"
                  aria-label="Next project"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Horizontally Moving Projects Track */}
        <div className="relative my-auto flex w-full items-center">
          <motion.div
            style={{ x }}
            className="flex items-center gap-6 pl-2 sm:gap-8 sm:pl-4 lg:gap-12"
          >
            {projectsData.map((project, idx) => {
              const isFlagship = project.isFlagship;
              const isStructure = project.lean === "structure";
              const isSignal = project.lean === "signal";
              const accentColor = isFlagship
                ? "purple"
                : isStructure
                  ? "structure"
                  : isSignal
                    ? "signal"
                    : "purple";

              return (
                <div
                  key={project.id}
                  className={`group relative flex w-[86vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-b from-bg-surface/95 via-bg-surface/85 to-bg-primary/95 p-5 shadow-2xl shadow-black/70 backdrop-blur-xl transition-all duration-300 sm:w-[72vw] sm:p-8 lg:w-[62vw] lg:max-w-4xl lg:p-10 ${
                    activeIndex === idx
                      ? isFlagship
                        ? "border-purple-500/50 ring-1 ring-purple-500/30"
                        : isStructure
                          ? "border-structure/50 ring-1 ring-structure/30"
                          : "border-signal/50 ring-1 ring-signal/30"
                      : "border-line"
                  }`}
                >
                  {/* Glowing top hairline */}
                  <div
                    className={`absolute left-0 right-0 top-0 h-1.5 ${
                      isFlagship
                        ? "bg-gradient-to-r from-structure via-purple-500 to-signal"
                        : isStructure
                          ? "bg-structure"
                          : "bg-signal"
                    }`}
                  />

                  {/* 1. TOP BAR: INDEX + BADGE */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                      <span className="font-bold text-text-primary">
                        0{idx + 1}
                      </span>
                      <span>{"//"}</span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${
                          isFlagship
                            ? "border-purple-500/30 bg-purple-950/40 text-purple-300"
                            : isStructure
                              ? "border-structure/30 bg-structure/10 text-structure"
                              : "border-signal/30 bg-signal/10 text-signal"
                        }`}
                      >
                        {project.leanLabel}
                      </span>
                    </div>

                    {isFlagship && (
                      <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 font-mono text-[11px] font-medium text-purple-300">
                        Published Research (IJRASET79908)
                      </span>
                    )}
                  </div>

                  {/* 2. PROJECT TITLE (Bold White Typography) */}
                  <h3 className="mb-2 font-display text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>

                  {/* 3. CONCISE 2-LINER DESCRIPTION */}
                  <p className="mb-5 line-clamp-2 font-body text-sm leading-relaxed text-text-muted sm:text-base">
                    {project.description}
                  </p>

                  {/* 4. BESPOKE VISUAL PREVIEW / TELEMETRY CENTERPIECE */}
                  <div className="mb-6 overflow-hidden rounded-2xl border border-line bg-bg-primary/90 p-4 font-mono text-xs sm:p-5">
                    {project.id === "vanrakshak-ai" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-line pb-2.5">
                          <span className="flex items-center gap-2 font-semibold text-purple-300">
                            <ShieldCheck size={16} weight="bold" />
                            <span>SURVEILLANCE_STREAM // CAM-04</span>
                          </span>
                          <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                            LIVE 92.4% ACCURACY
                          </span>
                        </div>
                        <div className="relative flex aspect-[21/9] flex-col justify-between overflow-hidden rounded-xl border border-line/80 bg-gradient-to-br from-purple-950/20 via-bg-surface to-bg-primary p-3">
                          <div className="relative z-10 w-fit rounded border border-purple-400/70 bg-purple-500/15 px-2 py-1">
                            <div className="font-mono text-[10px] font-bold text-purple-200">
                              YOLOv8: Wildlife (0.94)
                            </div>
                            <div className="text-[9px] text-purple-400">
                              DeepSORT Kalman #104
                            </div>
                          </div>
                          <div className="relative z-10 flex items-center justify-between text-[10px] text-text-muted">
                            <span>FPS: 30.2</span>
                            <span>LATENCY: 14ms</span>
                            <span className="text-emerald-400">
                              TELEGRAM BOT &lt; 60s
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === "critindia" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-line pb-2.5">
                          <span className="flex items-center gap-2 font-semibold text-structure">
                            <HardDrives size={16} weight="bold" />
                            <span>NEXT.js SSR // B2B ARCHITECTURE</span>
                          </span>
                          <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                            LOAD TIME &lt; 2.0s
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-2 text-center">
                          <div className="rounded-lg border border-line bg-bg-surface p-2">
                            <div className="text-base font-bold text-structure">
                              42ms
                            </div>
                            <div className="text-[10px] text-text-muted">
                              TTFB Edge
                            </div>
                          </div>
                          <div className="rounded-lg border border-line bg-bg-surface p-2">
                            <div className="text-base font-bold text-emerald-400">
                              1.1s
                            </div>
                            <div className="text-[10px] text-text-muted">
                              First Paint
                            </div>
                          </div>
                          <div className="rounded-lg border border-line bg-bg-surface p-2">
                            <div className="text-base font-bold text-text-primary">
                              1k+
                            </div>
                            <div className="text-[10px] text-text-muted">
                              B2B Monthly
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === "connecting-dots-erp" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-line pb-2.5">
                          <span className="flex items-center gap-2 font-semibold text-structure">
                            <HardDrives size={16} weight="bold" />
                            <span>ERP_WORKFLOW // DATABASE LAYER</span>
                          </span>
                          <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                            -35% QUERY LATENCY
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 py-2">
                          <div className="rounded-lg border border-line bg-bg-surface p-2.5">
                            <div className="text-sm font-bold text-structure">
                              5,000+ Visits
                            </div>
                            <div className="text-[10px] text-text-muted">
                              Monthly Student Traffic
                            </div>
                          </div>
                          <div className="rounded-lg border border-line bg-bg-surface p-2.5">
                            <div className="text-sm font-bold text-emerald-400">
                              Compound Index
                            </div>
                            <div className="text-[10px] text-text-muted">
                              MongoDB Optimization
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === "ai-kpi-monitor" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-line pb-2.5">
                          <span className="flex items-center gap-2 font-semibold text-signal">
                            <TrendUp size={16} weight="bold" />
                            <span>TELEMETRY_PIPELINE // STATISTICAL EDA</span>
                          </span>
                          <span className="rounded border border-signal/30 bg-signal/10 px-2 py-0.5 text-[10px] text-signal">
                            ANOMALY ENGINE
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-line bg-bg-surface p-3 text-[11px]">
                          <div>
                            <span className="block text-text-muted">
                              Variance Detection:
                            </span>
                            <span className="font-bold text-signal">
                              3-Sigma Threshold
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="block text-text-muted">
                              Processing Engine:
                            </span>
                            <span className="font-bold text-text-primary">
                              Python Pandas
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === "patient-readmission-analysis" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-line pb-2.5">
                          <span className="flex items-center gap-2 font-semibold text-signal">
                            <Pulse size={16} weight="bold" />
                            <span>HEALTHCARE_ML // RISK STRATIFICATION</span>
                          </span>
                          <span className="rounded border border-signal/30 bg-signal/10 px-2 py-0.5 text-[10px] text-signal">
                            CLINICAL EDA
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 py-2">
                          <div className="rounded-lg border border-line bg-bg-surface p-2.5">
                            <div className="text-sm font-bold text-signal">
                              ROC-AUC 0.81
                            </div>
                            <div className="text-[10px] text-text-muted">
                              Predictive Metric
                            </div>
                          </div>
                          <div className="rounded-lg border border-line bg-bg-surface p-2.5">
                            <div className="text-sm font-bold text-text-primary">
                              Feature Importance
                            </div>
                            <div className="text-[10px] text-text-muted">
                              Preventable Readmissions
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 5. TECH BADGES + ACTION BUTTONS (REPO + LIVE DEMO) */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/80 pt-5">
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-line bg-bg-primary px-2.5 py-1 font-mono text-[11px] text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Hub (Live Demo + Repo) */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Live Demo Link (Deployment) */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold shadow-lg transition-all duration-200 active:scale-95 ${
                            isFlagship
                              ? "bg-purple-500 text-white shadow-purple-500/25 hover:bg-purple-600"
                              : isStructure
                                ? "bg-structure text-white shadow-structure/25 hover:opacity-90"
                                : "bg-signal text-bg-primary shadow-signal/25 hover:opacity-90"
                          }`}
                        >
                          <ArrowSquareOut size={15} weight="bold" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {/* GitHub Repository Link */}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-primary px-4 py-2 font-mono text-xs font-medium text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated active:scale-95"
                      >
                        <GithubLogo size={15} weight="bold" />
                        <span>Repository</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Pagination Dots & Scroll Guidance */}
        <div className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between border-t border-line/60 pt-4 font-mono text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">SELECT PROJECT:</span>
            <div className="flex items-center gap-1.5">
              {projectsData.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToProject(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-8 bg-structure"
                      : "w-2 bg-line hover:bg-text-muted"
                  }`}
                  aria-label={`Jump to project ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
            <Lightning size={14} className="text-signal" />
            <span>SCROLL VERTICALLY TO ADVANCE HORIZONTALLY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
