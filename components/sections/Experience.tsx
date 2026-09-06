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
} from "@phosphor-icons/react";
import { ResumeModal } from "./ResumeModal";

export function Experience() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-6xl px-6 py-28"
    >
      {/* Section Header */}
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Experience & Education
          </h2>
          <p className="font-body text-base text-text-muted">
            Production development internship at Atorix IT Solutions, combined
            with published AI research and academic foundations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setResumeOpen(true)}
          className="active:scale-98 inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-text-primary px-6 py-3.5 text-sm font-medium text-bg-primary shadow-lg shadow-white/5 transition-all duration-200 hover:bg-white md:self-auto"
        >
          <FileText size={16} weight="bold" />
          <span>View Full Resume</span>
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: Internship Experience */}
        <div className="space-y-6 lg:col-span-7">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-structure">
            <Briefcase size={16} weight="bold" />
            <span>Industry Experience</span>
          </div>

          {profileData.internships.map((intern, i) => (
            <div
              key={i}
              className="space-y-5 rounded-2xl border border-line bg-bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-8"
            >
              <div className="flex flex-col justify-between gap-2 border-b border-line pb-4 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="font-display text-xl font-medium text-text-primary">
                    {intern.role}
                  </h3>
                  <div className="font-mono text-sm text-structure">
                    {intern.company} · {intern.location}
                  </div>
                </div>
                <span className="rounded-full border border-line bg-bg-primary px-3 py-1 font-mono text-xs text-text-muted">
                  {intern.period}
                </span>
              </div>

              <ul className="space-y-3 font-body text-sm leading-relaxed text-text-muted">
                {intern.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-structure"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-2 font-mono text-xs text-text-muted">
                <span>Enterprise Stack: Next.js · Node.js · MongoDB</span>
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
          ))}

          {/* Research Publication Card */}
          <div className="space-y-3 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-purple-300">
                Peer-Reviewed Research Publication
              </span>
              <span className="rounded border border-purple-500/30 bg-purple-500/20 px-2 py-0.5 font-mono text-xs text-purple-200">
                {profileData.publication.paperId}
              </span>
            </div>
            <h4 className="font-display text-base font-medium text-text-primary">
              "{profileData.publication.title}"
            </h4>
            <p className="font-body text-xs text-text-muted">
              Published in {profileData.publication.journal}. Real-time wildlife
              threat tracking with 92%+ accuracy and sub-60s Telegram emergency
              triggers.
            </p>
          </div>
        </div>

        {/* Right Column: Education & Certifications */}
        <div className="space-y-8 lg:col-span-5">
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
                  className="rounded-2xl border border-line bg-bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-medium text-text-primary">
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

            <div className="space-y-3 rounded-2xl border border-line bg-bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              {profileData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-baseline justify-between gap-2 border-b border-line pb-2.5 text-xs last:border-b-0 last:pb-0"
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

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
