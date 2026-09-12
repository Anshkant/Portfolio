"use client";

import React, { useState } from "react";
import { journeyPipeline } from "@/lib/content/journey";
import {
  CheckCircle,
  CircleNotch,
  Lightning,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

export function Journey() {
  const [activeStep, setActiveStep] = useState<number>(8);
  const [expandedStep, setExpandedStep] = useState<number | null>(8);

  const currentDetail =
    journeyPipeline.find((s) => s.step === activeStep) || journeyPipeline[7]!;

  const toggleExpand = (step: number) => {
    if (activeStep !== step) setActiveStep(step);
    setExpandedStep((prev) => (prev === step ? null : step));
  };

  return (
    <section
      id="journey"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Section Header */}
      <div className="mb-10 max-w-2xl sm:mb-12">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Analytical Progression Roadmap
        </h2>
        <p className="font-body text-sm text-text-muted sm:text-base">
          Step-by-step evolution from core programming and SQL wrangling to
          published computer vision pipelines.
        </p>
      </div>

      {/* Main Interactive Flow Visualization */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-surface p-4 shadow-xl sm:rounded-3xl sm:p-8">
        {/* Active Stage Live Telemetry Banner */}
        <div className="mb-6 flex flex-col justify-between gap-3 rounded-xl border border-line bg-bg-primary p-3.5 sm:mb-8 sm:flex-row sm:items-center sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/15 text-signal">
              <Lightning size={16} weight="bold" />
            </div>
            <div>
              <div className="font-mono text-xs font-medium text-text-primary">
                Stage {currentDetail.step} of 8: {currentDetail.title}
              </div>
              <div className="font-mono text-[11px] text-text-muted">
                {currentDetail.category} · {currentDetail.status}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {currentDetail.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-line bg-bg-surface px-2 py-0.5 font-mono text-[11px] text-text-primary/90"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden gap-3.5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {journeyPipeline.map((item) => {
            const isSelected = activeStep === item.step;
            const isCompleted = item.status === "Completed";
            const isBridge = item.lean === "bridge";
            const isSignal = item.lean === "signal";

            const accentBorder = isSelected
              ? isBridge
                ? "border-purple-400 bg-purple-950/20"
                : isSignal
                  ? "border-signal bg-signal/10"
                  : "border-structure bg-structure/10"
              : "border-line bg-bg-primary/70 hover:border-line-highlight";

            const nodeAccent = isBridge
              ? "text-purple-400"
              : isSignal
                ? "text-signal"
                : "text-structure";

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-4.5 flex cursor-pointer flex-col justify-between rounded-2xl border transition-all duration-300 ${accentBorder}`}
              >
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="font-mono text-xs text-text-muted">
                      0{item.step}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                        <CheckCircle size={13} weight="fill" />
                        Ready
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-signal">
                        <CircleNotch
                          size={13}
                          weight="bold"
                          className="animate-spin"
                        />
                        Active
                      </span>
                    )}
                  </div>
                  <h3
                    className={`mb-1.5 font-display text-sm font-bold text-text-primary ${isSelected ? nodeAccent : ""}`}
                  >
                    {item.title}
                  </h3>
                  <p className="mb-3 font-body text-xs leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-line/60 pt-2.5 font-mono text-[11px] text-text-muted">
                  <span>{item.category}</span>
                  <span className={nodeAccent}>● {item.lean}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Expandable accordion list */}
        <div className="space-y-2 sm:hidden">
          {journeyPipeline.map((item) => {
            const isExpanded = expandedStep === item.step;
            const isCompleted = item.status === "Completed";
            const isBridge = item.lean === "bridge";
            const isSignal = item.lean === "signal";
            const nodeAccent = isBridge
              ? "text-purple-400"
              : isSignal
                ? "text-signal"
                : "text-structure";
            const borderAccent = isExpanded
              ? isBridge
                ? "border-purple-400/50 bg-purple-950/20"
                : isSignal
                  ? "border-signal/50 bg-signal/5"
                  : "border-structure/50 bg-structure/5"
              : "border-line bg-bg-primary/70";

            return (
              <div
                key={item.step}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${borderAccent}`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(item.step)}
                  className="flex w-full items-center justify-between p-3.5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold ${nodeAccent}`}
                    >
                      0{item.step}
                    </span>
                    <span className="font-display text-sm font-medium text-text-primary">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle
                        size={13}
                        weight="fill"
                        className="text-emerald-400"
                      />
                    ) : (
                      <CircleNotch
                        size={13}
                        weight="bold"
                        className="animate-spin text-signal"
                      />
                    )}
                    {isExpanded ? (
                      <CaretUp size={13} className="text-text-muted" />
                    ) : (
                      <CaretDown size={13} className="text-text-muted" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-line/60 px-4 pb-4 pt-3">
                    <p className="mb-3 font-body text-xs leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-line bg-bg-surface px-2 py-0.5 font-mono text-[10px] text-text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between font-mono text-[11px] text-text-muted">
                      <span>{item.category}</span>
                      <span className={nodeAccent}>● {item.lean}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 font-mono text-xs text-text-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-structure" />
              Software Engineering
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-signal" />
              Analytics &amp; Metrics
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Computer Vision
            </span>
          </div>
          <span className="text-[11px] text-text-muted/70">
            Click any stage to inspect
          </span>
        </div>
      </div>
    </section>
  );
}
