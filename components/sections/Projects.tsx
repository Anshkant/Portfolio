"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projectsData, Project } from "@/lib/content/projects";
import {
  GithubLogo,
  ArrowSquareOut,
  CaretRight,
  CaretLeft,
  Lightning,
  Globe,
  LockSimple,
  ShieldCheck,
  TrendUp,
  Pulse,
} from "@phosphor-icons/react";

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState<number>(2000);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Measure exact pixel distance required to scroll through every single project card
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const viewW = window.innerWidth;
        // Total distance needed for the last card to be fully in view + end padding
        const dist = Math.max(0, scrollW - viewW + 80);
        setMaxScroll(dist);
      }
    };

    updateDimensions();
    // Allow images and fonts to settle
    const timer = setTimeout(updateDimensions, 400);
    window.addEventListener("resize", updateDimensions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Track vertical scroll on the parent section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Butter-smooth spring easing for the horizontal glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Dynamically map 0 -> 1 progress to the exact horizontal pixel translation
  const x = useTransform(smoothProgress, [0, 1], [0, -maxScroll]);

  // Update active slide counter based on scroll progression
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        projectsData.length - 1,
        Math.max(0, Math.floor(latest * projectsData.length))
      );
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  // Click navigation: jump smoothly to any project slide
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
      className="relative h-[400vh] w-full bg-bg-primary"
    >
      {/* Sticky Fullscreen Pinned Gallery (fits comfortably below navbar) */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-4 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-24 lg:px-12">
        {/* 1. Header Bar: Progress Line & Controls */}
        <div className="relative z-30 mx-auto w-full max-w-7xl">
          {/* Animated Progress Bar */}
          <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-bg-surface">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-structure via-purple-400 to-signal"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-text-muted sm:text-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-structure" />
                <span>Production Deployments &amp; Research</span>
              </div>
              <h2 className="font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl lg:text-3xl">
                Featured Projects Showcase
              </h2>
            </div>

            {/* Slide Index Counter & Click Navigation */}
            <div className="flex items-center gap-2.5">
              <div className="rounded-full border border-line bg-bg-surface px-3 py-1 font-mono text-xs font-semibold text-text-primary">
                0{activeIndex + 1}{" "}
                <span className="text-text-muted">
                  / 0{projectsData.length}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollToProject(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-bg-surface text-text-muted transition-colors hover:border-line-highlight hover:text-text-primary disabled:opacity-30 sm:h-9 sm:w-9"
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
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-bg-surface text-text-muted transition-colors hover:border-line-highlight hover:text-text-primary disabled:opacity-30 sm:h-9 sm:w-9"
                  aria-label="Next project"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Center: Horizontally Moving Projects Track */}
        <div className="relative my-auto flex w-full items-center overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-center gap-6 pl-2 sm:gap-8 sm:pl-4 lg:gap-10"
          >
            {projectsData.map((project, idx) => {
              const isFlagship = project.isFlagship;
              const isStructure = project.lean === "structure";
              const isSignal = project.lean === "signal";
              const primaryLink = project.liveUrl || project.repoUrl;
              const isLive = Boolean(project.liveUrl);

              const accentGlow = isFlagship
                ? "border-purple-500/40 ring-1 ring-purple-500/20"
                : isStructure
                  ? "border-structure/40 ring-1 ring-structure/20"
                  : "border-signal/40 ring-1 ring-signal/20";

              return (
                <div
                  key={project.id}
                  className={`group relative flex w-[88vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-b from-bg-surface/95 via-bg-surface/90 to-bg-primary/95 p-4 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-300 sm:w-[70vw] sm:p-6 lg:w-[58vw] lg:max-w-3xl lg:p-7 ${
                    activeIndex === idx ? accentGlow : "border-line"
                  }`}
                >
                  {/* Accent Hairline */}
                  <div
                    className={`absolute left-0 right-0 top-0 h-1 ${
                      isFlagship
                        ? "bg-gradient-to-r from-structure via-purple-500 to-signal"
                        : isStructure
                          ? "bg-structure"
                          : "bg-signal"
                    }`}
                  />

                  {/* 1. TOP INFO: Index + Badge + Title + 2-Liner Description */}
                  <div className="mb-3 sm:mb-4">
                    <div className="mb-2 flex items-center justify-between">
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
                        <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-purple-300 sm:text-xs">
                          Published (IJRASET79908)
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mb-1 font-display text-xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-2xl lg:text-3xl">
                      {project.title}
                    </h3>

                    {/* 2-Liner Concise Description */}
                    <p className="line-clamp-2 font-body text-xs leading-relaxed text-text-muted sm:text-sm">
                      {project.description}
                    </p>
                  </div>

                  {/* 2. REAL LANDING PAGE BROWSER SHOWCASE (Clickable!) */}
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/browser relative block overflow-hidden rounded-2xl border border-line bg-bg-primary shadow-xl transition-all duration-300 hover:border-line-highlight"
                    title={`Click to open ${isLive ? "live site" : "repository"}`}
                  >
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between border-b border-line bg-bg-surface/90 px-3 py-2 sm:px-4">
                      {/* Traffic Light Window Dots */}
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/80" />
                      </div>

                      {/* Mock URL Bar */}
                      <div className="flex max-w-[220px] items-center gap-1.5 truncate rounded-full border border-line bg-bg-primary/90 px-3 py-0.5 font-mono text-[10px] text-text-muted sm:max-w-xs sm:text-[11px]">
                        <LockSimple size={10} className="text-emerald-400" />
                        <span className="truncate">
                          {project.liveUrl
                            ? project.liveUrl.replace(/^https?:\/\//, "")
                            : "github.com/Anshkant"}
                        </span>
                      </div>

                      {/* Open Badge */}
                      <div className="flex items-center gap-1 font-mono text-[10px] text-text-muted transition-colors group-hover/browser:text-text-primary">
                        <span className="hidden sm:inline">
                          {isLive ? "LIVE SITE" : "GITHUB REPO"}
                        </span>
                        <ArrowSquareOut size={12} weight="bold" />
                      </div>
                    </div>

                    {/* Actual Landing Page Image Frame */}
                    <div className="relative h-44 w-full overflow-hidden sm:h-56 md:h-64 lg:h-72">
                      {project.image ? (
                        <div className="relative h-full w-full">
                          <Image
                            src={project.image}
                            alt={`${project.title} landing page preview`}
                            fill
                            sizes="(max-width: 768px) 88vw, (max-width: 1200px) 70vw, 58vw"
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover/browser:scale-[1.03]"
                            priority={idx < 2}
                          />
                          {/* Subtle dark vignette overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent opacity-60 transition-opacity group-hover/browser:opacity-30" />
                        </div>
                      ) : (
                        /* Fallback High-Tech Terminal Visual for analytical projects */
                        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-bg-surface via-bg-primary to-bg-surface p-5 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-line pb-2">
                            <span className="flex items-center gap-2 font-semibold text-signal">
                              {project.id === "ai-kpi-monitor" ? (
                                <TrendUp size={16} weight="bold" />
                              ) : (
                                <Pulse size={16} weight="bold" />
                              )}
                              <span>{project.title}</span>
                            </span>
                            <span className="rounded border border-signal/30 bg-signal/10 px-2 py-0.5 text-[10px] text-signal">
                              ANALYTICAL PIPELINE
                            </span>
                          </div>

                          <div className="space-y-2 py-3 text-center">
                            <div className="font-display text-2xl font-bold text-text-primary">
                              {project.metrics?.[0]?.value ?? "Python + Pandas"}
                            </div>
                            <div className="text-xs text-text-muted">
                              {project.metrics?.[0]?.label ??
                                "Operational Telemetry"}
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-line/60 pt-2 text-[10px] text-text-muted">
                            <span>Repository: github.com/Anshkant</span>
                            <span className="text-emerald-400">
                              ● Open Source
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay Hint */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/browser:opacity-100">
                        <span className="flex items-center gap-2 rounded-full border border-white/20 bg-bg-primary/95 px-4 py-2 font-mono text-xs font-semibold text-white shadow-2xl">
                          <span>
                            {isLive
                              ? "Visit Live Deployed Site"
                              : "View GitHub Repository"}
                          </span>
                          <ArrowSquareOut size={14} weight="bold" />
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* 3. BOTTOM ROW: TECH PILLS + DIRECT ACTION BUTTONS */}
                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-3">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line bg-bg-primary px-2 py-0.5 font-mono text-[10px] text-text-muted sm:text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-2">
                      {/* Live Deployment Demo Link */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold shadow-md transition-all duration-200 active:scale-95 ${
                            isFlagship
                              ? "bg-purple-500 text-white shadow-purple-500/25 hover:bg-purple-600"
                              : isStructure
                                ? "bg-structure text-white shadow-structure/25 hover:opacity-90"
                                : "bg-signal text-bg-primary shadow-signal/25 hover:opacity-90"
                          }`}
                        >
                          <Globe size={14} weight="bold" />
                          <span>Live Site</span>
                          <ArrowSquareOut size={12} weight="bold" />
                        </a>
                      )}

                      {/* GitHub Repository Link */}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-primary px-3.5 py-1.5 font-mono text-xs font-medium text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated active:scale-95"
                      >
                        <GithubLogo size={14} weight="bold" />
                        <span>Repository</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 3. Bottom Pagination Dots & Scroll Guidance */}
        <div className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between border-t border-line/60 pt-3 font-mono text-[11px] text-text-muted sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">QUICK JUMP:</span>
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

          <div className="flex items-center gap-1.5 text-text-muted">
            <Lightning size={14} className="text-signal" />
            <span className="hidden sm:inline">
              SCROLL VERTICALLY TO ADVANCE ALL PROJECTS HORIZONTALLY
            </span>
            <span className="sm:hidden">SCROLL OR DRAG TO ADVANCE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
