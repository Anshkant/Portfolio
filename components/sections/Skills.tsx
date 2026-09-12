"use client";

import React from "react";
import { Code, Database, Eye } from "@phosphor-icons/react";

const SKILL_CATEGORIES = [
  {
    title: "Software Engineering",
    icon: Code,
    accent: "text-structure",
    badge: "border-structure/30 bg-structure/10 text-structure",
    description:
      "Production web applications, server-side APIs, and database modeling.",
    skills: [
      "Next.js",
      "React.js",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "Express.js",
    ],
  },
  {
    title: "Data & Analytics",
    icon: Database,
    accent: "text-signal",
    badge: "border-signal/30 bg-signal/10 text-signal",
    description:
      "Data extraction, transformation, exploratory statistical analysis, and BI.",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "SQL",
      "Power BI",
      "Excel",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    title: "AI & Computer Vision",
    icon: Eye,
    accent: "text-purple-400",
    badge: "border-purple-400/30 bg-purple-500/10 text-purple-300",
    description:
      "Deep learning models, real-time object detection, and video inference.",
    skills: [
      "YOLOv8",
      "OpenCV",
      "DeepSORT",
      "FastAPI",
      "TensorFlow",
      "Keras",
      "Neural Networks",
      "Model Inference",
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Section Header */}
      <div className="mb-10 max-w-2xl sm:mb-12">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Technical Skills
        </h2>
        <p className="font-body text-sm text-text-muted sm:text-base">
          Technologies and tools deployed across production software and
          analytical pipelines.
        </p>
      </div>

      {/* 3 Clean Categorized Cards (Zero Theoretical Fluff) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SKILL_CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={cat.title}
              className="flex flex-col justify-between rounded-2xl border border-line bg-bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors hover:border-line-highlight"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-bg-primary ${cat.accent}`}
                  >
                    <IconComponent size={20} weight="bold" />
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${cat.badge}`}
                  >
                    {cat.skills.length} Tools
                  </span>
                </div>

                <h3 className="mb-1 font-display text-lg font-bold text-text-primary">
                  {cat.title}
                </h3>
                <p className="mb-5 font-body text-xs leading-relaxed text-text-muted">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-line bg-bg-primary px-2.5 py-1 font-mono text-xs text-text-primary/90 transition-colors hover:border-line-highlight hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
