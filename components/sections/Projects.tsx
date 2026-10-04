"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useVelocity,
  useSpring,
} from "framer-motion";
import { projectsData, Project } from "@/lib/content/projects";
import {
  GithubLogo,
  ArrowSquareOut,
  Globe,
  LockSimple,
  Play,
  Pause,
  ArrowsLeftRight,
  Gauge,
  Lightning,
} from "@phosphor-icons/react";

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Motion controls for continuous scroll
  const x = useMotionValue(0);
  const currentSpeed = useRef(1.25);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<-1 | 1>(-1); // -1 = left, 1 = right
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [halfWidth, setHalfWidth] = useState(3000);
  const [activeProject, setActiveProject] = useState<Project>(projectsData[0]!);

  // Measure half-width of the duplicate track for seamless continuous wrapping
  const updateWidth = useCallback(() => {
    if (trackRef.current) {
      const fullWidth = trackRef.current.scrollWidth;
      if (fullWidth > 0) {
        setHalfWidth(fullWidth / 2);
      }
    }
  }, []);

  useEffect(() => {
    updateWidth();
    const timer = setTimeout(updateWidth, 500);
    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateWidth);
    };
  }, [updateWidth]);

  // Connect to page vertical scroll velocity for organic acceleration
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 250,
  });

  // Base motion frame loop (Smooth continuous 60/120FPS fluid stream)
  useAnimationFrame((_, delta) => {
    // Smooth deceleration on hover instead of jarring stop
    const targetSpeed = isPaused
      ? 0
      : isHovered
        ? 0.12
        : 1.25 * speedMultiplier;

    // Smooth lerp speed transition
    currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.12;

    // Additional momentum boost when user scrolls the page
    const vel = smoothVelocity.get() * 0.003;
    const normalizedDelta = Math.min(delta, 32) / 16.667;
    const totalStep =
      (currentSpeed.current * direction + vel) * normalizedDelta;

    let currentX = x.get() + totalStep;

    // Seamless toroidal wrap around
    if (halfWidth > 0) {
      if (currentX < -halfWidth) {
        currentX += halfWidth;
      } else if (currentX > 0) {
        currentX -= halfWidth;
      }
    }

    x.set(currentX);
  });

  // Jump smoothly to a specific project card in the stream
  const jumpToProject = (index: number) => {
    if (halfWidth > 0) {
      const cardApproxWidth = halfWidth / projectsData.length;
      const targetX = -(index * cardApproxWidth);
      x.set(targetX);
      const proj = projectsData[index];
      if (proj) setActiveProject(proj);
    }
  };

  // Duplicate data array for seamless infinite looping
  const displayProjects = [...projectsData, ...projectsData];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative mx-auto w-full max-w-full overflow-hidden bg-bg-primary py-20 sm:py-28"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-structure/10 blur-[160px]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 rounded-full bg-signal/10 blur-[160px]" />

      {/* Top Header & Interactive Controls Dock */}
      <div className="relative z-20 mx-auto mb-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:gap-6 md:flex-row md:items-end">
          {/* Section Titles */}
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              <span className="h-2 w-2 animate-pulse rounded-full bg-structure" />
              <span>Continuous Interactive Stream</span>
              <span>{"//"}</span>
              <span className="text-structure">07 Production Systems</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Featured Work Showcase
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm text-text-muted sm:text-base">
              Autonomous continuous rail of live deployments, published AI
              surveillance, and analytical prediction systems. Hover to inspect
              or click to launch.
            </p>
          </div>

          {/* Interactive Stream Controls (Play/Pause, Direction, Speed) */}
          <div className="flex flex-wrap items-center gap-2 self-start rounded-2xl border border-line bg-bg-surface/90 p-1.5 shadow-xl backdrop-blur-md md:self-auto">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                isPaused
                  ? "bg-signal font-bold text-bg-primary shadow-md shadow-signal/20"
                  : "bg-bg-primary text-text-primary hover:text-white"
              }`}
              title={isPaused ? "Resume continuous scroll" : "Pause stream"}
            >
              {isPaused ? (
                <>
                  <Play size={13} weight="fill" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause size={13} weight="fill" />
                  <span>Pause</span>
                </>
              )}
            </button>

            {/* Reverse Direction */}
            <button
              type="button"
              onClick={() => setDirection(direction === -1 ? 1 : -1)}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-bg-primary px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-line-highlight hover:text-text-primary"
              title="Reverse scroll direction"
            >
              <ArrowsLeftRight size={13} weight="bold" />
              <span>
                {direction === -1 ? "Direction: L ←" : "Direction: → R"}
              </span>
            </button>

            {/* Speed Toggle */}
            <button
              type="button"
              onClick={() =>
                setSpeedMultiplier(speedMultiplier === 1 ? 1.6 : 1)
              }
              className="flex items-center gap-1.5 rounded-xl border border-line bg-bg-primary px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-line-highlight hover:text-text-primary"
              title="Toggle speed"
            >
              <Gauge size={13} weight="bold" />
              <span>
                {speedMultiplier === 1 ? "Normal Speed" : "Fast Speed (1.6x)"}
              </span>
            </button>
          </div>
        </div>

        {/* Quick-Jump Project Navigator Bar (Interactive project switcher) */}
        <div className="scrollbar-none mt-6 flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs">
          <span className="shrink-0 pr-2 font-semibold text-text-muted">
            QUICK JUMP:
          </span>
          {projectsData.map((p, idx) => {
            const isFlagship = p.isFlagship;
            const isSignal = p.lean === "signal";
            const isActive = activeProject.id === p.id;

            const badgeColor = isFlagship
              ? "text-purple-300 border-purple-500/30"
              : isSignal
                ? "text-signal border-signal/30"
                : "text-structure border-structure/30";

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => jumpToProject(idx)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 transition-all ${
                  isActive
                    ? "border-text-primary bg-bg-elevated font-bold text-white shadow-md"
                    : `bg-bg-surface/80 ${badgeColor} hover:bg-bg-elevated hover:text-white`
                }`}
              >
                <span>0{idx + 1}</span>
                <span>{p.title.split("—")[0]?.trim() ?? p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Continuous Infinite Sliding Rail */}
      <div
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edge Vignette Gradients for cinematic fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-bg-primary to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-bg-primary to-transparent sm:w-24" />

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex cursor-grab items-center gap-6 px-4 active:cursor-grabbing sm:gap-8"
        >
          {displayProjects.map((project, index) => {
            const isFlagship = project.isFlagship;
            const isStructure = project.lean === "structure";
            const isSignal = project.lean === "signal";
            const primaryLink = project.liveUrl || project.repoUrl;
            const isLive = Boolean(project.liveUrl);

            const accentBorder = isFlagship
              ? "hover:border-purple-500/60 hover:shadow-purple-500/20"
              : isStructure
                ? "hover:border-structure/60 hover:shadow-structure/20"
                : "hover:border-signal/60 hover:shadow-signal/20";

            const tagColor = isFlagship
              ? "border-purple-500/30 bg-purple-950/40 text-purple-300"
              : isStructure
                ? "border-structure/30 bg-structure/10 text-structure"
                : "border-signal/30 bg-signal/10 text-signal";

            return (
              <div
                key={`${project.id}-${index}`}
                onMouseEnter={() => setActiveProject(project)}
                className={`group relative flex w-[86vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-bg-surface/95 via-bg-surface/85 to-bg-primary/95 p-5 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-300 sm:w-[500px] sm:p-6 lg:w-[560px] ${accentBorder}`}
              >
                {/* Accent Top Hairline */}
                <div
                  className={`absolute left-0 right-0 top-0 h-1 ${
                    isFlagship
                      ? "bg-gradient-to-r from-structure via-purple-500 to-signal"
                      : isStructure
                        ? "bg-structure"
                        : "bg-signal"
                  }`}
                />

                {/* 1. Header Row: Index + Lean Badge + Publication */}
                <div className="mb-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                      <span className="font-bold text-text-primary">
                        0{(index % projectsData.length) + 1}
                      </span>
                      <span>{"//"}</span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${tagColor}`}
                      >
                        {project.leanLabel}
                      </span>
                    </div>

                    {isFlagship && (
                      <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-purple-300">
                        IJRASET79908
                      </span>
                    )}

                    {project.id === "ai-kpi-monitor" && (
                      <span className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-signal">
                        Real-Time Telemetry
                      </span>
                    )}

                    {project.id === "customer-churn-analysis" && (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                        AUC 0.998 · Live Deployed
                      </span>
                    )}

                    {project.id === "patient-readmission-analysis" && (
                      <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-sky-400">
                        ROC-AUC 0.814 · Clinical
                      </span>
                    )}
                  </div>

                  {/* Project Name (Bold White Typography) */}
                  <h3 className="mb-1 font-display text-xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-2xl">
                    {project.title}
                  </h3>

                  {/* Concise 2-Liner Description */}
                  <p className="line-clamp-2 font-body text-xs leading-relaxed text-text-muted sm:text-sm">
                    {project.description}
                  </p>
                </div>

                {/* 2. Real Browser Landing Page Preview (Directly Clickable) */}
                <a
                  href={primaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/browser relative block overflow-hidden rounded-2xl border border-line bg-bg-primary shadow-xl transition-all duration-300 hover:border-line-highlight"
                  title={`Launch ${project.title} (${isLive ? "Live Site" : "GitHub Repo"})`}
                >
                  {/* Browser Chrome Bar */}
                  <div className="flex items-center justify-between border-b border-line bg-bg-surface/90 px-3 py-2 sm:px-3.5">
                    {/* Traffic Dots */}
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/80" />
                    </div>

                    {/* URL Address Mockup */}
                    <div className="flex max-w-[200px] items-center gap-1.5 truncate rounded-full border border-line bg-bg-primary/90 px-2.5 py-0.5 font-mono text-[10px] text-text-muted sm:max-w-xs">
                      <LockSimple
                        size={10}
                        className="shrink-0 text-emerald-400"
                      />
                      <span className="truncate">
                        {project.liveUrl
                          ? project.liveUrl.replace(/^https?:\/\//, "")
                          : `github.com/Anshkant/${project.id}`}
                      </span>
                    </div>

                    {/* Action Pill */}
                    <div className="flex items-center gap-1 font-mono text-[10px] text-text-muted transition-colors group-hover/browser:text-text-primary">
                      <span className="hidden sm:inline">
                        {isLive ? "LIVE" : "REPO"}
                      </span>
                      <ArrowSquareOut size={12} weight="bold" />
                    </div>
                  </div>

                  {/* Landing Page Image Frame */}
                  <div className="relative h-44 w-full overflow-hidden bg-bg-surface sm:h-52 lg:h-60">
                    {project.image ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={project.image}
                          alt={`${project.title} landing page preview`}
                          fill
                          sizes="(max-width: 768px) 86vw, 560px"
                          className="object-cover object-top transition-transform duration-500 ease-out group-hover/browser:scale-[1.03]"
                          priority={index < 3}
                        />
                        {/* Soft Vignette Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-50 transition-opacity group-hover/browser:opacity-20" />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-6 text-center font-mono text-xs text-text-muted">
                        <span>Preview Loaded</span>
                      </div>
                    )}

                    {/* Floating Launch Pill on Hover */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/browser:opacity-100">
                      <span className="flex items-center gap-2 rounded-full border border-white/20 bg-bg-primary/95 px-4 py-2 font-mono text-xs font-semibold text-white shadow-2xl">
                        <span>
                          {isLive
                            ? "Visit Live Deployed Site"
                            : "Open GitHub Repo"}
                        </span>
                        <ArrowSquareOut size={14} weight="bold" />
                      </span>
                    </div>
                  </div>
                </a>

                {/* 3. Bottom Row: Technologies & Direct Buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-3">
                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-bg-primary px-2 py-0.5 font-mono text-[10px] text-text-muted sm:text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Hub */}
                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold shadow-md transition-all active:scale-95 ${
                          isFlagship
                            ? "bg-purple-500 text-white shadow-purple-500/25 hover:bg-purple-600"
                            : isStructure
                              ? "bg-structure text-white shadow-structure/25 hover:opacity-90"
                              : "bg-signal text-bg-primary shadow-signal/25 hover:opacity-90"
                        }`}
                      >
                        <Globe size={13} weight="bold" />
                        <span>Live Site</span>
                        <ArrowSquareOut size={11} weight="bold" />
                      </a>
                    )}

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-primary px-3 py-1 font-mono text-xs font-medium text-text-primary transition-colors hover:border-line-highlight hover:bg-bg-elevated active:scale-95"
                    >
                      <GithubLogo size={13} weight="bold" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Guidance & Active Telemetry Strip */}
      <div className="relative z-20 mx-auto mt-6 flex w-full max-w-7xl items-center justify-between px-4 font-mono text-[11px] text-text-muted sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Lightning size={14} className="text-signal" />
          <span>DRAG HORIZONTALLY TO SCRUB STREAM // HOVER TO INSPECT</span>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <span>ACTIVE: {activeProject.title}</span>
          <span>·</span>
          <span className="text-structure">
            {projectsData.length} PRODUCTION WORKS
          </span>
        </div>
      </div>
    </section>
  );
}
