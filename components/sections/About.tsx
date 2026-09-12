"use client";

import React from "react";
import { profileData } from "@/lib/content/profile";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Header */}
      <div className="mb-10 max-w-2xl sm:mb-12">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          About the Dual Track
        </h2>
        <p className="font-body text-sm text-text-muted sm:text-base">
          Software engineering provides the architecture; data analytics
          provides the directional truth. I combine both to build resilient,
          data-driven systems.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left: Direct & Minimalist Bio */}
        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-4 rounded-2xl border border-line bg-bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-8">
            <div className="flex items-center justify-between border-b border-line/60 pb-3 font-mono text-xs text-structure">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-structure" />
                <span>Anshkant Malviya · Nagpur, India</span>
              </span>
              <span className="text-text-muted">B.Tech CSE (7.98 CGPA)</span>
            </div>

            <p className="font-body text-base leading-relaxed text-text-primary/95">
              Full-stack developer and data analyst with 6 months of on-site
              internship experience at <strong>Atorix IT Solutions</strong> in
              Pune. Delivered 3 production web applications, optimized MongoDB
              APIs by 35%, and engineered VanRakshak AI—a published
              peer-reviewed AI surveillance pipeline (
              <strong>IJRASET79908</strong>) achieving 92%+ detection accuracy.
            </p>

            <div className="border-t border-line/60 pt-4">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Core Production Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "Next.js",
                  "React",
                  "Node.js",
                  "MongoDB",
                  "Pandas",
                  "SQL",
                  "YOLOv8",
                  "REST APIs",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-bg-primary px-3 py-1 font-mono text-xs text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: 4 Clean, Bold Production Stats (Zero clutter) */}
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
