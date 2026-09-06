"use client";

import React, { useState } from "react";
import { skillsData } from "@/lib/content/skills";
import {
  Code,
  Database,
  Eye,
  TerminalWindow,
  Cpu,
  ArrowRight,
  Lightning,
} from "@phosphor-icons/react";

// Real-world practical context mapping for each skill
const skillDetails: Record<
  string,
  { usage: string; domain: string; projectContext: string; level: string }
> = {
  JavaScript: {
    usage: "ES6+, Async/Await, DOM, Event-driven logic",
    domain: "Frontend & Full-Stack",
    projectContext: "CritIndia & ConnectingDots ERP dynamic interfaces",
    level: "Core Proficiency",
  },
  "React.js": {
    usage: "Hooks, State Architecture, Component Lifecycle, Reusable UI",
    domain: "Client-Side Engineering",
    projectContext: "Interactive dashboards and responsive ERP client portals",
    level: "Core Proficiency",
  },
  "Next.js": {
    usage: "App Router, SSR, Server Components, API routes, SEO",
    domain: "Production Full-Stack",
    projectContext: "CritIndia SAP consulting portal (<2s SSR load times)",
    level: "Production Ready",
  },
  "Node.js": {
    usage: "RESTful architecture, Event loop, Express middleware, Auth0",
    domain: "Backend Engineering",
    projectContext: "ConnectingDots ERP backend handling 5,000+ monthly visits",
    level: "Production Ready",
  },
  HTML5: {
    usage: "Semantic layout, accessibility, modern web landmarks",
    domain: "Web Standards",
    projectContext: "All client applications at Atorix IT Solutions",
    level: "Foundational",
  },
  CSS3: {
    usage: "Flexbox, CSS Grid, animations, responsive design",
    domain: "Styling & Layout",
    projectContext: "High-contrast layouts and responsive media breakpoints",
    level: "Foundational",
  },
  "Tailwind CSS": {
    usage: "Design tokens, utility-first styling, JIT compilation, dark mode",
    domain: "UI Architecture",
    projectContext: "Production websites shipped at Atorix IT Solutions",
    level: "Core Proficiency",
  },
  MongoDB: {
    usage: "Schema modeling, aggregation pipelines, index optimization",
    domain: "NoSQL Database",
    projectContext: "Query indexing cutting API latency by ~35% at Atorix",
    level: "Production Ready",
  },
  "REST APIs": {
    usage:
      "Endpoint design, request validation, JSON serialization, status codes",
    domain: "System Integration",
    projectContext: "Third-party APIs (Telegram Bot, Auth0, KPI feeds)",
    level: "Production Ready",
  },
  Python: {
    usage:
      "Data analysis, algorithmic logic, computer vision scripts, automation",
    domain: "Core Programming",
    projectContext: "VanRakshak AI detection pipeline & healthcare EDA",
    level: "Core Language",
  },
  SQL: {
    usage: "Complex joins, window functions, aggregation, subqueries",
    domain: "Relational Querying",
    projectContext: "Analytical dataset querying and database modeling",
    level: "Core Proficiency",
  },
  "Power BI": {
    usage: "DAX measures, interactive dashboards, KPI reporting, data modeling",
    domain: "Business Intelligence",
    projectContext: "Executive dashboards and performance tracking",
    level: "Applied Analytics",
  },
  Excel: {
    usage: "Formulas, Pivot tables, VLOOKUP/XLOOKUP, data sanitization",
    domain: "Spreadsheet Analytics",
    projectContext: "Fast data cleaning and preliminary exploratory analysis",
    level: "Core Tool",
  },
  Pandas: {
    usage: "DataFrames, grouping, missing data imputation, time-series",
    domain: "Data Wrangling",
    projectContext: "Hospital Readmission study & AI KPI Monitor pipelines",
    level: "Core Stack",
  },
  NumPy: {
    usage: "Multi-dimensional arrays, vectorization, mathematical compute",
    domain: "Numerical Computing",
    projectContext: "High-performance vector operations and matrix math",
    level: "Core Stack",
  },
  Matplotlib: {
    usage: "Statistical plots, distributions, custom styling, multi-axis",
    domain: "Visualization",
    projectContext: "3D scatter visualizers and publication figures",
    level: "Applied Analytics",
  },
  Seaborn: {
    usage: "Heatmaps, correlation matrices, pairplots, statistical EDA",
    domain: "Visualization",
    projectContext: "Clinical correlation heatmaps for readmission risk",
    level: "Applied Analytics",
  },
  YOLOv8: {
    usage:
      "Real-time object detection, model fine-tuning, bounding box inference",
    domain: "Computer Vision",
    projectContext:
      "VanRakshak AI wildlife sanctuary monitoring (92%+ accuracy)",
    level: "Published Research",
  },
  OpenCV: {
    usage: "Video stream ingestion, frame transformations, optical flow",
    domain: "Computer Vision",
    projectContext: "Multi-camera surveillance feed processing pipeline",
    level: "Applied Vision",
  },
  TensorFlow: {
    usage: "Deep neural networks, model architecture, tensor operations",
    domain: "Deep Learning",
    projectContext: "Neural classification and predictive modeling",
    level: "Applied ML",
  },
  Keras: {
    usage: "High-level model building, layer stacking, activation functions",
    domain: "Deep Learning",
    projectContext: "Rapid prototyping of neural network architectures",
    level: "Applied ML",
  },
};

export function Skills() {
  const [activeTrack, setActiveTrack] = useState<
    "structure" | "signal" | "bridge"
  >("signal");
  const [selectedSkill, setSelectedSkill] = useState<string>("Python");

  const currentGroup =
    skillsData.find((g) => g.track === activeTrack) || skillsData[0]!;
  const currentDetail = skillDetails[selectedSkill] || {
    usage: "Core engineering & analytical implementation",
    domain: currentGroup.title,
    projectContext: "Production application or exploratory research",
    level: "Applied Proficiency",
  };

  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-6xl px-6 py-24"
    >
      {/* Section Heading — Short & Punchy */}
      <div className="mb-12 max-w-2xl">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Technical Command Console
        </h2>
        <p className="font-body text-sm text-text-muted sm:text-base">
          Interactive dual-track matrix. Select a track or hover on any
          technology to inspect real production implementation.
        </p>
      </div>

      {/* Unique Interactive Workstation (Zero Generic Cards) */}
      <div className="overflow-hidden rounded-3xl border border-line bg-bg-surface shadow-2xl shadow-black/50">
        {/* Top Control Bar: Track Selector Tabs */}
        <div className="flex flex-col items-stretch justify-between gap-3 border-b border-line bg-bg-primary/90 p-3 sm:flex-row sm:items-center sm:p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-structure" />
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
              OPERATIONAL TRACK:
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-line/80 bg-bg-surface p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTrack("structure");
                setSelectedSkill("Next.js");
              }}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                activeTrack === "structure"
                  ? "bg-structure font-medium text-white shadow-md shadow-structure/30"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Code size={14} weight="bold" />
              <span>Software Engineering</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTrack("signal");
                setSelectedSkill("Python");
              }}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                activeTrack === "signal"
                  ? "bg-signal font-bold text-bg-primary shadow-md shadow-signal/30"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Database size={14} weight="bold" />
              <span>Data Analytics</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTrack("bridge");
                setSelectedSkill("YOLOv8");
              }}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                activeTrack === "bridge"
                  ? "bg-purple-500 font-medium text-white shadow-md shadow-purple-500/30"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Eye size={14} weight="bold" />
              <span>AI & Vision</span>
            </button>
          </div>
        </div>

        {/* Main Console Split: Skills Matrix on Left + Live Inspector on Right */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
          {/* Left Column: Interactive Skill Chips Grid */}
          <div className="space-y-6 border-b border-line p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  {currentGroup.title} — Active Toolset
                </span>
                <span className="font-mono text-[11px] text-text-muted">
                  Click to inspect real-world use
                </span>
              </div>

              {/* Grid of Interactive Technology Chips */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {currentGroup.skills.map((skill) => {
                  const isSelected = selectedSkill === skill.name;
                  const isSignal = activeTrack === "signal";
                  const isBridge = activeTrack === "bridge";

                  const activeClass = isSelected
                    ? isBridge
                      ? "bg-purple-950/60 border-purple-400 text-purple-200 shadow-lg shadow-purple-500/20"
                      : isSignal
                        ? "bg-signal/15 border-signal text-signal shadow-lg shadow-signal/20"
                        : "bg-structure/15 border-structure text-structure shadow-lg shadow-structure/20"
                    : "bg-bg-primary text-text-primary/90 border-line hover:border-line-highlight hover:bg-bg-elevated";

                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelectedSkill(skill.name)}
                      className={`group flex items-center justify-between rounded-xl border p-3 text-left font-mono text-xs transition-all duration-200 ${activeClass}`}
                    >
                      <span className="font-medium">{skill.name}</span>
                      <ArrowRight
                        size={12}
                        weight="bold"
                        className={`transition-transform duration-200 ${
                          isSelected
                            ? "translate-x-0.5 opacity-100"
                            : "opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Focus Domains Checklist */}
            <div className="border-t border-line/60 pt-4">
              <span className="mb-2.5 block font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Domain Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {currentGroup.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-line bg-bg-primary/80 px-3 py-1 font-mono text-xs text-text-muted"
                  >
                    ✓ {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Implementation Inspector (Dynamic Telemetry) */}
          <div className="flex flex-col justify-between space-y-6 bg-bg-primary/50 p-6 sm:p-8 lg:col-span-5">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <TerminalWindow size={18} className="text-structure" />
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    LIVE INSPECTOR
                  </span>
                </div>
                <span className="rounded border border-structure/30 bg-structure/10 px-2.5 py-0.5 font-mono text-[11px] text-structure">
                  {currentDetail.level}
                </span>
              </div>

              <div>
                <h3 className="mb-1 font-display text-2xl font-bold text-text-primary">
                  {selectedSkill}
                </h3>
                <span className="font-mono text-xs text-signal">
                  {currentDetail.domain}
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1 rounded-xl border border-line bg-bg-surface p-3.5">
                  <span className="block text-[11px] uppercase text-text-muted">
                    Core Functionality:
                  </span>
                  <span className="font-body text-xs leading-relaxed text-text-primary">
                    {currentDetail.usage}
                  </span>
                </div>

                <div className="space-y-1 rounded-xl border border-line bg-bg-surface p-3.5">
                  <span className="block text-[11px] uppercase text-text-muted">
                    Real-World Implementation:
                  </span>
                  <span className="font-body text-xs leading-relaxed text-text-primary">
                    {currentDetail.projectContext}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Summary Note */}
            <div className="flex items-center justify-between border-t border-line/60 pt-4 font-mono text-[11px] text-text-muted">
              <span>Stack: Python & Full-Stack</span>
              <span className="text-emerald-400">● Verified in Production</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
