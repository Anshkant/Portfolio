"use client";

import React, { useState } from "react";
import {
  Code,
  Database,
  Eye,
  Lightning,
  CheckCircle,
  Cpu,
} from "@phosphor-icons/react";

interface TechElement {
  number: string;
  symbol: string;
  name: string;
  category: "structure" | "signal" | "bridge";
  categoryLabel: string;
  layer: string;
  context: string;
  tags: string[];
}

const TECH_ELEMENTS: TechElement[] = [
  {
    number: "01",
    symbol: "Py",
    name: "Python",
    category: "signal",
    categoryLabel: "Signal (Data)",
    layer: "Core Language",
    context:
      "VanRakshak AI pipeline, data wrangling, and clinical healthcare analytics.",
    tags: ["Data Analysis", "Automation", "OpenCV", "Pandas"],
  },
  {
    number: "02",
    symbol: "Nx",
    name: "Next.js",
    category: "structure",
    categoryLabel: "Structure (Software)",
    layer: "Production Full-Stack",
    context:
      "CritIndia SAP consulting platform with Server-Side Rendering (< 2.0s load).",
    tags: ["SSR", "App Router", "API Routes", "Performance"],
  },
  {
    number: "03",
    symbol: "Pd",
    name: "Pandas",
    category: "signal",
    categoryLabel: "Signal (Data)",
    layer: "Data Wrangling",
    context:
      "Hospital readmission risk analysis and AI KPI Monitor operational pipelines.",
    tags: ["DataFrames", "Imputation", "Aggregation", "EDA"],
  },
  {
    number: "04",
    symbol: "Yo",
    name: "YOLOv8",
    category: "bridge",
    categoryLabel: "Bridge (AI/ML)",
    layer: "Computer Vision",
    context:
      "Real-time wildlife sanctuary detection achieving 92%+ accuracy (IJRASET79908).",
    tags: ["Object Detection", "Inference", "Weights", "Neural Nets"],
  },
  {
    number: "05",
    symbol: "Nd",
    name: "Node.js",
    category: "structure",
    categoryLabel: "Structure (Software)",
    layer: "Backend Runtime",
    context:
      "ConnectingDots ERP backend handling 5,000+ monthly visits across course verticals.",
    tags: ["REST APIs", "Express", "Auth0", "Event Loop"],
  },
  {
    number: "06",
    symbol: "Sq",
    name: "SQL",
    category: "signal",
    categoryLabel: "Signal (Data)",
    layer: "Relational Querying",
    context:
      "Complex relational queries, analytical joins, window functions, and schema design.",
    tags: ["PostgreSQL", "MySQL", "Aggregations", "Joins"],
  },
  {
    number: "07",
    symbol: "Mg",
    name: "MongoDB",
    category: "structure",
    categoryLabel: "Structure (Software)",
    layer: "NoSQL Database",
    context:
      "Compound indexing optimization cutting API query latency by ~35% at Atorix.",
    tags: ["Aggregation Pipeline", "Indexing", "Mongoose", "JSON Schema"],
  },
  {
    number: "08",
    symbol: "Cv",
    name: "OpenCV",
    category: "bridge",
    categoryLabel: "Bridge (AI/ML)",
    layer: "Vision Processing",
    context:
      "Multi-camera video feed ingestion, frame transformation, and buffer pipelines.",
    tags: ["Video Streams", "Matrix Transforms", "Filtering", "CUDA"],
  },
  {
    number: "09",
    symbol: "Rc",
    name: "React.js",
    category: "structure",
    categoryLabel: "Structure (Software)",
    layer: "Client Architecture",
    context:
      "Dynamic client dashboards, component state architecture, and responsive ERP portals.",
    tags: ["Hooks", "Context API", "Component Tree", "Virtual DOM"],
  },
  {
    number: "10",
    symbol: "Np",
    name: "NumPy",
    category: "signal",
    categoryLabel: "Signal (Data)",
    layer: "Numerical Computing",
    context:
      "High-performance multi-dimensional array operations and statistical mathematics.",
    tags: ["Vectorization", "Linear Algebra", "NDArrays", "Matrix Math"],
  },
  {
    number: "11",
    symbol: "Bi",
    name: "Power BI",
    category: "signal",
    categoryLabel: "Signal (Data)",
    layer: "Business Intelligence",
    context:
      "Interactive DAX measures, automated reporting dashboards, and executive trend tracking.",
    tags: ["DAX", "Data Modeling", "Executive Dashboards", "KPIs"],
  },
  {
    number: "12",
    symbol: "Ds",
    name: "DeepSORT",
    category: "bridge",
    categoryLabel: "Bridge (AI/ML)",
    layer: "Object Tracking",
    context:
      "Persistent tracking and identity association across live multi-camera feeds.",
    tags: ["Kalman Filters", "ID Association", "Surveillance", "Tracking"],
  },
  {
    number: "13",
    symbol: "Ex",
    name: "Express.js",
    category: "structure",
    categoryLabel: "Structure (Software)",
    layer: "Server Middleware",
    context:
      "Modular routing, role-based authorization middleware, and API endpoints at Atorix.",
    tags: ["Middleware", "Auth Guard", "RESTful", "JSON"],
  },
  {
    number: "14",
    symbol: "Tw",
    name: "Tailwind CSS",
    category: "structure",
    categoryLabel: "Structure (Software)",
    layer: "Design System",
    context:
      "Utility-first design tokens, responsive breakpoints, and dark-mode web systems.",
    tags: ["Design Tokens", "Flexbox/Grid", "Responsive", "JIT"],
  },
  {
    number: "15",
    symbol: "Fa",
    name: "FastAPI",
    category: "bridge",
    categoryLabel: "Bridge (AI/ML)",
    layer: "Asynchronous APIs",
    context:
      "Low-latency inference endpoints and asynchronous video frame buffers for vision models.",
    tags: ["AsyncIO", "Pydantic", "Inference Server", "Sub-60s Alerting"],
  },
  {
    number: "16",
    symbol: "Tf",
    name: "TensorFlow",
    category: "bridge",
    categoryLabel: "Bridge (AI/ML)",
    layer: "Deep Learning",
    context:
      "Neural network architectures, model training validation, and tensor transformations.",
    tags: ["Keras", "Deep Learning", "Loss Functions", "Tensors"],
  },
  {
    number: "17",
    symbol: "Js",
    name: "JavaScript",
    category: "structure",
    categoryLabel: "Structure (Software)",
    layer: "Core Language",
    context:
      "ES6+ asynchronous workflows, event-driven DOM architectures, and web standards.",
    tags: ["ES6+", "Async/Await", "Event Loop", "Closures"],
  },
  {
    number: "18",
    symbol: "Xl",
    name: "Excel",
    category: "signal",
    categoryLabel: "Signal (Data)",
    layer: "Analytical Tool",
    context:
      "Rapid preliminary data cleaning, pivot aggregations, and exploratory data sanitization.",
    tags: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Sanitization", "Formulas"],
  },
];

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "structure" | "signal" | "bridge"
  >("all");
  const [selectedId, setSelectedId] = useState<string>("01");

  const filteredElements =
    activeFilter === "all"
      ? TECH_ELEMENTS
      : TECH_ELEMENTS.filter((el) => el.category === activeFilter);

  const activeElement =
    TECH_ELEMENTS.find((el) => el.number === selectedId) ?? TECH_ELEMENTS[0]!;

  const isStructure = activeElement.category === "structure";
  const isSignal = activeElement.category === "signal";
  const activeAccent = isStructure
    ? {
        text: "text-structure",
        border: "border-structure",
        bg: "bg-structure/15",
        badge: "border-structure/30 bg-structure/10 text-structure",
      }
    : isSignal
      ? {
          text: "text-signal",
          border: "border-signal",
          bg: "bg-signal/15",
          badge: "border-signal/30 bg-signal/10 text-signal",
        }
      : {
          text: "text-purple-400",
          border: "border-purple-400",
          bg: "bg-purple-500/15",
          badge: "border-purple-400/30 bg-purple-500/10 text-purple-300",
        };

  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Section Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Cpu size={16} weight="bold" className="text-structure" />
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Technical Stack Matrix
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Periodic Stack of Engineering &amp; Data
          </h2>
        </div>

        {/* Filter Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-line bg-bg-surface p-1">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
              activeFilter === "all"
                ? "bg-text-primary font-medium text-bg-primary shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            All (18)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("structure")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
              activeFilter === "structure"
                ? "bg-structure font-medium text-white shadow-sm"
                : "text-text-muted hover:text-structure"
            }`}
          >
            <Code size={12} weight="bold" />
            <span>Software (7)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("signal")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
              activeFilter === "signal"
                ? "bg-signal font-bold text-bg-primary shadow-sm"
                : "text-text-muted hover:text-signal"
            }`}
          >
            <Database size={12} weight="bold" />
            <span>Data (6)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("bridge")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
              activeFilter === "bridge"
                ? "bg-purple-500 font-medium text-white shadow-sm"
                : "text-text-muted hover:text-purple-300"
            }`}
          >
            <Eye size={12} weight="bold" />
            <span>AI / Vision (5)</span>
          </button>
        </div>
      </div>

      {/* Main Single-Surface Component (Zero Generic Cards) */}
      <div className="overflow-hidden rounded-2xl border border-line bg-bg-surface shadow-2xl shadow-black/40 sm:rounded-3xl">
        {/* Top: The Interactive Periodic Grid */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] text-text-muted sm:text-xs">
            <span>TAP OR HOVER ON ANY ATOMIC BLOCK TO INSPECT</span>
            <span className="hidden sm:inline">
              DUAL TRACK MATRIX: STRUCTURE ⇄ SIGNAL ⇄ BRIDGE
            </span>
          </div>

          {/* Grid of Atomic Tech Tiles */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
            {filteredElements.map((el) => {
              const isSelected = selectedId === el.number;
              const isElStructure = el.category === "structure";
              const isElSignal = el.category === "signal";

              const colorClass = isElStructure
                ? "border-structure/30 hover:border-structure text-structure"
                : isElSignal
                  ? "border-signal/30 hover:border-signal text-signal"
                  : "border-purple-400/30 hover:border-purple-400 text-purple-300";

              const selectedClass = isSelected
                ? isElStructure
                  ? "border-structure bg-structure/20 ring-2 ring-structure/40 shadow-lg shadow-structure/20 scale-[1.03]"
                  : isElSignal
                    ? "border-signal bg-signal/20 ring-2 ring-signal/40 shadow-lg shadow-signal/20 scale-[1.03]"
                    : "border-purple-400 bg-purple-500/20 ring-2 ring-purple-400/40 shadow-lg shadow-purple-500/20 scale-[1.03]"
                : "border-line bg-bg-primary/70 hover:bg-bg-elevated";

              return (
                <button
                  key={el.number}
                  type="button"
                  onClick={() => setSelectedId(el.number)}
                  onMouseEnter={() => setSelectedId(el.number)}
                  className={`group relative flex flex-col justify-between rounded-xl border p-3 text-left transition-all duration-200 sm:p-3.5 ${selectedClass}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-text-muted group-hover:text-text-primary">
                      {el.number}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isElStructure
                          ? "bg-structure"
                          : isElSignal
                            ? "bg-signal"
                            : "bg-purple-400"
                      }`}
                    />
                  </div>

                  <div className="my-1.5">
                    <span
                      className={`font-display text-xl font-extrabold tracking-tight sm:text-2xl ${colorClass}`}
                    >
                      {el.symbol}
                    </span>
                  </div>

                  <div>
                    <span className="block truncate font-mono text-[11px] font-medium text-text-primary sm:text-xs">
                      {el.name}
                    </span>
                    <span className="block truncate font-mono text-[9px] text-text-muted">
                      {el.layer}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom: Live Atomic Inspector Dock */}
        <div className="border-t border-line bg-bg-primary/90 p-4 sm:p-6">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
            {/* Left: Element Header & Classification */}
            <div className="flex items-center gap-3.5 md:col-span-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border font-display text-2xl font-extrabold shadow-inner ${activeAccent.border} ${activeAccent.bg} ${activeAccent.text}`}
              >
                {activeElement.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {activeElement.name}
                  </h3>
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${activeAccent.badge}`}
                  >
                    {activeElement.number}
                  </span>
                </div>
                <p className="font-mono text-xs text-text-muted">
                  {activeElement.layer} · {activeElement.categoryLabel}
                </p>
              </div>
            </div>

            {/* Middle: Production Impact Note */}
            <div className="border-t border-line/60 pt-3 md:col-span-5 md:border-l md:border-t-0 md:pl-5 md:pt-0">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Production Application
              </span>
              <p className="font-body text-xs leading-relaxed text-text-primary/95 sm:text-sm">
                {activeElement.context}
              </p>
            </div>

            {/* Right: Technical Tags */}
            <div className="flex flex-wrap gap-1.5 md:col-span-3 md:justify-end">
              {activeElement.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line bg-bg-surface px-2 py-1 font-mono text-[10px] text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
