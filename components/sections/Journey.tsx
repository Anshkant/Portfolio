"use client";

import React, { useState } from "react";
import { journeyPipeline, JourneyStep } from "@/lib/content/journey";
import { CheckCircle, CircleNotch, Lightning } from "@phosphor-icons/react";

export function Journey() {
  const [activeStep, setActiveStep] = useState<number>(8); // Highlight current active step by default

  const currentDetail =
    journeyPipeline.find((s) => s.step === activeStep) || journeyPipeline[7]!;

  return (
    <section
      id="journey"
      className="relative mx-auto w-full max-w-6xl px-6 py-28"
    >
      {/* Section Header */}
      <div className="mb-16 max-w-3xl">
        <h2 className="mb-4 font-display text-3xl font-medium tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          The analytical progression pipeline.
        </h2>
        <p className="max-w-[65ch] font-body text-base leading-relaxed text-text-muted sm:text-lg">
          A structured roadmap translating foundational data operations into
          advanced deep learning and real-time computer vision inference.
        </p>
      </div>

      {/* Main Interactive Flow Visualization */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-surface p-6 shadow-xl sm:p-10">
        {/* Active Stage Live Telemetry Banner */}
        <div className="mb-10 flex flex-col justify-between gap-4 rounded-xl border border-line bg-bg-primary p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/15 text-signal">
              <Lightning size={16} weight="bold" />
            </div>
            <div>
              <div className="font-mono text-xs font-medium text-text-primary">
                Stage {currentDetail.step} of 8: {currentDetail.title}
              </div>
              <div className="font-mono text-[11px] text-text-muted">
                Category: {currentDetail.category} · Status:{" "}
                {currentDetail.status}
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

        {/* The 8-Node Flow Diagram / Circuit */}
        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journeyPipeline.map((item, index) => {
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
                className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${accentBorder}`}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-text-muted">
                      0{item.step}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                        <CheckCircle size={13} weight="fill" />
                        <span>Ready</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-signal">
                        <CircleNotch
                          size={13}
                          weight="bold"
                          className="animate-spin"
                        />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <h3
                    className={`mb-1.5 font-display text-base font-medium text-text-primary ${isSelected ? nodeAccent : ""}`}
                  >
                    {item.title}
                  </h3>

                  <p className="mb-4 font-body text-xs leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-line/60 pt-3 font-mono text-[11px] text-text-muted">
                  <span>{item.category}</span>
                  <span className={nodeAccent}>● {item.lean}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continuous Pipeline Arrow Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-structure" />
              <span>Software Engineering Roots</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <span>Analytics & Metrics</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              <span>Computer Vision Convergence</span>
            </span>
          </div>
          <span className="text-[11px] text-text-muted/70">
            Click any stage to inspect execution focus
          </span>
        </div>
      </div>
    </section>
  );
}
