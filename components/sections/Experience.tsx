"use client";

import React, { useState } from "react";
import { profileData } from "@/lib/content/profile";
import {
  Briefcase,
  GraduationCap,
  Certificate,
  FileText,
  ArrowSquareOut,
  CheckCircle,
  Terminal,
  GitCommit,
} from "@phosphor-icons/react";
import { ResumeModal } from "./ResumeModal";

// Simulated git-commit-style deployment log for internship
const COMMIT_LOG = [
  {
    hash: "ef56d04",
    type: "feat",
    message: "Ship ConnectingDots ERP backend — 5k+ monthly visits",
    branch: "production",
  },
  {
    hash: "2c73833",
    type: "perf",
    message: "Optimize MongoDB indexing → 35% query latency drop",
    branch: "production",
  },
  {
    hash: "a91bf12",
    type: "feat",
    message: "Deliver CritIndia SAP platform — SSR < 2.0s load time",
    branch: "production",
  },
  {
    hash: "d3e7c90",
    type: "feat",
    message: "Integrate Auth0 + role-based access control layer",
    branch: "staging",
  },
  {
    hash: "1b55a3f",
    type: "research",
    message: "Publish VanRakshak AI — IJRASET79908 (92%+ accuracy)",
    branch: "research",
  },
];

const COMMIT_COLORS: Record<string, string> = {
  feat: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  perf: "text-signal border-signal/30 bg-signal/10",
  research: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

export function Experience() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Section Header */}
      <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Experience & Education
          </h2>
          <p className="font-body text-sm text-text-muted sm:text-base">
            Production development internship at Atorix IT Solutions, combined
            with published AI research and academic foundations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setResumeOpen(true)}
          className="active:scale-98 inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-text-primary px-5 py-3 text-sm font-medium text-bg-primary shadow-lg shadow-white/5 transition-all duration-200 hover:bg-white sm:px-6 sm:py-3.5 md:self-auto"
        >
          <FileText size={16} weight="bold" />
          <span>View Full Resume</span>
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
        {/* Left: Internship + Production Deploy Log */}
        <div className="space-y-6 lg:col-span-7">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-structure">
            <Briefcase size={16} weight="bold" />
            <span>Industry Experience</span>
          </div>

          {profileData.internships.map((intern, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-line bg-bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              {/* Header */}
              <div className="flex flex-col justify-between gap-2 border-b border-line bg-bg-primary/80 px-5 py-4 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="font-display text-lg font-medium text-text-primary sm:text-xl">
                    {intern.role}
                  </h3>
                  <div className="font-mono text-sm text-structure">
                    {intern.company} · {intern.location}
                  </div>
                </div>
                <span className="self-start rounded-full border border-line bg-bg-elevated px-3 py-1 font-mono text-xs text-text-muted sm:self-auto">
                  {intern.period}
                </span>
              </div>

              {/* Achievements */}
              <div className="p-5 sm:p-6">
                <ul className="mb-5 space-y-2.5 font-body text-sm leading-relaxed text-text-muted">
                  {intern.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle
                        size={15}
                        weight="fill"
                        className="mt-0.5 shrink-0 text-structure"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Production Deploy Log */}
                <div className="overflow-hidden rounded-xl border border-line bg-bg-primary">
                  <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[11px] text-text-muted">
                    <Terminal size={13} className="text-structure" />
                    <span>PRODUCTION_COMMIT_LOG — Atorix IT Solutions</span>
                  </div>
                  <div className="divide-y divide-line/60 p-1">
                    {COMMIT_LOG.map((c) => (
                      <div
                        key={c.hash}
                        className="flex items-start gap-3 px-3 py-2.5"
                      >
                        <GitCommit
                          size={13}
                          className="mt-0.5 shrink-0 text-text-muted"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[10px] text-text-muted/70">
                              {c.hash}
                            </span>
                            <span
                              className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${COMMIT_COLORS[c.type] ?? "border-line bg-bg-elevated text-text-muted"}`}
                            >
                              {c.type}
                            </span>
                          </div>
                          <p className="font-mono text-[11px] text-text-primary">
                            {c.message}
                          </p>
                        </div>
                        <span className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-muted/70">
                          {c.branch}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-xs text-text-muted">
                  <span>Stack: Next.js · Node.js · MongoDB</span>
                  <a
                    href={intern.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-primary hover:underline"
                  >
                    <span>atorixit.com</span>
                    <ArrowSquareOut size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Research Publication */}
          <div className="space-y-3 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-purple-300">
                Peer-Reviewed Research Publication
              </span>
              <span className="rounded border border-purple-500/30 bg-purple-500/20 px-2 py-0.5 font-mono text-xs text-purple-200">
                {profileData.publication.paperId}
              </span>
            </div>
            <h4 className="font-display text-base font-medium text-text-primary">
              &quot;{profileData.publication.title}&quot;
            </h4>
            <p className="font-body text-xs text-text-muted">
              Published in {profileData.publication.journal}. Real-time wildlife
              threat tracking with 92%+ accuracy and sub-60s Telegram emergency
              triggers.
            </p>
          </div>
        </div>

        {/* Right: Education & Certifications */}
        <div className="space-y-6 sm:space-y-8 lg:col-span-5">
          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal">
              <GraduationCap size={16} weight="bold" />
              <span>Academic Education</span>
            </div>
            <div className="space-y-3">
              {profileData.education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-line bg-bg-surface p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-6"
                >
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-sm font-medium text-text-primary sm:text-base">
                      {edu.degree}
                    </h3>
                    <span className="shrink-0 font-mono text-[11px] text-text-muted">
                      {edu.period}
                    </span>
                  </div>
                  <div className="mb-2 font-mono text-xs text-text-muted">
                    {edu.institution}
                  </div>
                  {edu.score && (
                    <div className="inline-block rounded border border-signal/25 bg-signal/10 px-2.5 py-1 font-mono text-xs font-medium text-signal">
                      {edu.score}
                    </div>
                  )}
                  {edu.status && (
                    <div className="inline-block rounded border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 font-mono text-xs font-medium text-purple-300">
                      {edu.status}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              <Certificate
                size={16}
                weight="bold"
                className="text-purple-400"
              />
              <span>Certifications</span>
            </div>
            <div className="rounded-2xl border border-line bg-bg-surface p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-6">
              {profileData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="not-first:pt-2.5 flex items-baseline justify-between gap-2 border-b border-line pb-2.5 text-xs first:pt-0 last:border-b-0 last:pb-0"
                >
                  <div>
                    <div className="font-display font-medium text-text-primary">
                      {cert.name}
                    </div>
                    <div className="font-mono text-[11px] text-text-muted">
                      {cert.issuer}
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-text-muted">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
