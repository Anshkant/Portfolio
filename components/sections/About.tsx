"use client";

import React, { useState } from "react";
import { profileData } from "@/lib/content/profile";
import { Cpu, ChartLineUp, ArrowRight } from "@phosphor-icons/react";

// Signal <-> Structure Diagnostic data
const DIAGNOSTICS = [
  {
    id: "api-latency",
    label: "MongoDB API Latency",
    side: "structure" as const,
    metric: "35% faster",
    detail: "Query indexing optimization at Atorix IT Solutions",
    value: 65,
    unit: "% faster",
  },
  {
    id: "detection-acc",
    label: "VanRakshak Detection Accuracy",
    side: "bridge" as const,
    metric: "92%+",
    detail: "YOLOv8 multi-camera real-time inference",
    value: 92,
    unit: "%",
  },
  {
    id: "page-load",
    label: "CritIndia Page Load Speed",
    side: "structure" as const,
    metric: "< 2.0s",
    detail: "Next.js SSR with 1,000+ monthly B2B visitors",
    value: 80,
    unit: "% optimized",
  },
  {
    id: "erp-traffic",
    label: "ConnectingDots ERP Traffic",
    side: "signal" as const,
    metric: "5,000+ visits/mo",
    detail: "Full-stack ERP backend with role-based auth",
    value: 75,
    unit: "% capacity",
  },
  {
    id: "cgpa",
    label: "Academic Performance",
    side: "signal" as const,
    metric: "7.98 CGPA",
    detail: "B.Tech Computer Science, Nagpur",
    value: 79.8,
    unit: "/ 100",
  },
];

function DiagnosticBar({
  item,
  active,
  onSelect,
}: {
  item: (typeof DIAGNOSTICS)[0];
  active: boolean;
  onSelect: () => void;
}) {
  const isStructure = item.side === "structure";
  const isBridge = item.side === "bridge";
  const barColor = isBridge
    ? "bg-purple-400"
    : isStructure
      ? "bg-structure"
      : "bg-signal";
  const textAccent = isBridge
    ? "text-purple-400"
    : isStructure
      ? "text-structure"
      : "text-signal";
  const borderActive = isBridge
    ? "border-purple-400/50 bg-purple-500/5"
    : isStructure
      ? "border-structure/50 bg-structure/5"
      : "border-signal/50 bg-signal/5";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-3 text-left transition-all duration-200 sm:p-3.5 ${
        active
          ? borderActive
          : "border-line bg-bg-primary/60 hover:border-line-highlight"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[11px] text-text-muted sm:text-xs">
          {item.label}
        </span>
        <span
          className={`font-mono text-[11px] font-bold sm:text-xs ${textAccent}`}
        >
          {item.metric}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: active ? `${item.value}%` : "20%" }}
        />
      </div>
      {active && (
        <p className="mt-2 font-body text-[11px] leading-relaxed text-text-muted sm:text-xs">
          {item.detail}
        </p>
      )}
    </button>
  );
}

export function About() {
  const [activeDiag, setActiveDiag] = useState<string>("detection-acc");

  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Header */}
      <div className="mb-10 max-w-2xl sm:mb-12">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          About the Dual Track
        </h2>
        <p className="font-body text-sm text-text-muted sm:text-base">
          Software engineering provides the architecture; data analytics
          provides the directional truth. I unite both to build resilient,
          data-driven systems.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
        {/* Left: Bio Panel */}
        <div className="space-y-5 lg:col-span-7">
          <div className="space-y-4 rounded-2xl border border-line bg-bg-surface p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-7">
            <div className="flex items-center justify-between border-b border-line/60 pb-3 font-mono text-xs text-structure">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-structure" />
                <span>Anshkant Malviya · Nagpur, India</span>
              </span>
              <span className="text-text-muted">B.Tech CSE</span>
            </div>

            <p className="font-body text-sm leading-relaxed text-text-primary/95 sm:text-base">
              Full-stack developer and data analyst with 6 months of on-site
              internship experience at <strong>Atorix IT Solutions</strong> in
              Pune. Delivered 3 production web applications, optimized MongoDB
              APIs by 35%, and engineered VanRakshak AI—a published
              peer-reviewed AI surveillance pipeline (
              <strong>IJRASET79908</strong>) achieving 92%+ detection accuracy.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs text-text-muted">
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
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-line/80 bg-gradient-to-r from-structure/10 via-bg-surface to-signal/10 p-4 sm:flex-row sm:items-center sm:p-5">
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

        {/* Right: Signal <-> Structure Diagnostic Equalizer */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line bg-bg-primary/80 px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                Production Metrics
              </span>
              <span className="flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Verified
              </span>
            </div>

            {/* Diagnostic Bars */}
            <div className="space-y-2 p-4 sm:p-5">
              {DIAGNOSTICS.map((item) => (
                <DiagnosticBar
                  key={item.id}
                  item={item}
                  active={activeDiag === item.id}
                  onSelect={() => setActiveDiag(item.id)}
                />
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[11px] text-text-muted">
              <span>Click any metric to inspect</span>
              <a
                href="#experience"
                className="flex items-center gap-1 text-structure hover:underline"
              >
                Full Experience <ArrowRight size={11} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
