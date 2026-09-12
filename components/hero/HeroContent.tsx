"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { profileData } from "@/lib/content/profile";
import {
  Code,
  FileText,
  Briefcase,
  GraduationCap,
  LinkedinLogo,
  InstagramLogo,
  XLogo,
} from "@phosphor-icons/react";
import { ResumeModal } from "@/components/sections/ResumeModal";

// Dynamically import 3D Console without SSR
const Hero3DConsole = dynamic(
  () => import("./Hero3DConsole").then((mod) => mod.Hero3DConsole),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-line bg-bg-surface/50 font-mono text-xs text-text-muted sm:h-72 lg:h-[340px]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-structure" />
          <span>INITIALIZING 3D ENGINE...</span>
        </div>
      </div>
    ),
  }
);

export function HeroContent() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateSize = () => setIsDesktop(window.innerWidth >= 1024);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <div className="relative z-20 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-between px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-28">
        {/* Top Duality Indicator Pill */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-surface/95 px-3 py-1.5 shadow-lg shadow-black/30 backdrop-blur-md sm:gap-3 sm:px-4">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-medium text-structure sm:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-structure sm:h-2 sm:w-2" />
              Python &amp; Software
            </span>
            <span className="text-[10px] text-text-muted sm:text-xs">⇄</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-medium text-signal sm:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal sm:h-2 sm:w-2" />
              Data &amp; ML
            </span>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400 sm:inline-flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>Open for Roles</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="my-auto grid grid-cols-1 items-center gap-6 py-4 sm:gap-8 sm:py-6 lg:grid-cols-12">
          {/* Left Column: Identity, Value Prop, CTA Buttons */}
          <div className="max-w-2xl space-y-5 sm:space-y-6 lg:col-span-7">
            {/* Photo + Identity */}
            <div className="flex flex-row items-center gap-4 sm:gap-6">
              <div className="relative h-20 w-20 shrink-0 rounded-full bg-gradient-to-tr from-structure via-purple-500 to-signal p-[3px] shadow-2xl shadow-structure/30 ring-4 ring-structure/20 sm:h-28 sm:w-28 md:h-32 md:w-32">
                <div className="h-full w-full overflow-hidden rounded-full bg-bg-surface">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    width={128}
                    height={128}
                    className="h-full w-full scale-105 object-cover object-top"
                    priority
                  />
                </div>
              </div>

              <div>
                <h1 className="font-display text-2xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                  {profileData.name}
                </h1>
                <p className="mt-1 font-mono text-xs font-semibold text-structure sm:text-sm">
                  Software Engineer &amp; Data Analyst
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-text-muted sm:text-xs">
                  Nagpur, India · IJRASET79908
                </p>
              </div>
            </div>

            {/* Mobile-Only 3D Interactive Console (Renders directly here on mobile!) */}
            {mounted && !isDesktop && (
              <div className="my-2 block lg:hidden">
                <Hero3DConsole />
              </div>
            )}

            {/* Core Value Proposition */}
            <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-text-primary drop-shadow-md sm:text-2xl lg:text-4xl">
              I turn scattered data into decisions, and decisions into software.
            </h2>

            <p className="max-w-[54ch] font-body text-sm leading-relaxed text-text-muted sm:text-base">
              Building production-ready software, analytical data pipelines, and
              computer vision systems. 6 months on-site internship at Atorix IT
              Solutions, Pune.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:gap-3">
              <a
                href="#projects"
                className="active:scale-98 group inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-medium text-bg-primary shadow-xl shadow-white/5 transition-all duration-300 hover:bg-white sm:gap-2.5 sm:px-6 sm:py-3.5"
              >
                <span>Explore Projects</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-primary/10 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-6 sm:w-6">
                  <Code size={13} weight="bold" className="text-bg-primary" />
                </span>
              </a>

              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="active:scale-98 group inline-flex items-center gap-2 rounded-full border border-structure/40 bg-structure/15 px-4 py-3 text-sm font-medium text-structure shadow-lg shadow-structure/10 transition-all duration-300 hover:border-structure hover:bg-structure/25 sm:px-5 sm:py-3.5"
              >
                <FileText size={15} weight="bold" />
                <span>View Resume</span>
              </button>

              {/* Social Icons Hub */}
              <div className="flex items-center gap-2">
                <a
                  href={profileData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="active:scale-98 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-surface/90 text-text-muted transition-all duration-300 hover:border-line-highlight hover:bg-bg-elevated hover:text-structure"
                >
                  <LinkedinLogo size={17} weight="bold" />
                </a>
                <a
                  href={profileData.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="active:scale-98 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-surface/90 text-text-muted transition-all duration-300 hover:border-line-highlight hover:bg-bg-elevated hover:text-text-primary"
                >
                  <XLogo size={15} weight="bold" />
                </a>
                <a
                  href={profileData.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="active:scale-98 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-surface/90 text-text-muted transition-all duration-300 hover:border-line-highlight hover:bg-bg-elevated hover:text-pink-400"
                >
                  <InstagramLogo size={17} weight="bold" />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop-Only 3D Column */}
          {mounted && isDesktop && (
            <div className="hidden lg:col-span-5 lg:block">
              <Hero3DConsole />
            </div>
          )}
        </div>

        {/* Bottom Telemetry Strip */}
        <div className="grid grid-cols-2 gap-2 border-t border-line/60 pt-4 sm:grid-cols-4 sm:gap-3 sm:pt-6">
          <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted sm:text-xs">
            <Briefcase size={13} className="shrink-0 text-structure" />
            <span className="truncate">Atorix IT Solutions</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted sm:text-xs">
            <GraduationCap size={13} className="shrink-0 text-signal" />
            <span>CGPA: 7.98</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted sm:text-xs">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate">VanRakshak AI 92%+</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted sm:text-xs">
            <span className="text-text-muted/60">Paper:</span>
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
