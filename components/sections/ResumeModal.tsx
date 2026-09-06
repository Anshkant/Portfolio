"use client";

import React, { useEffect } from "react";
import { profileData } from "@/lib/content/profile";
import { projectsData } from "@/lib/content/projects";
import {
  X,
  Printer,
  DownloadSimple,
  EnvelopeSimple,
  Phone,
  MapPin,
  LinkedinLogo,
  GithubLogo,
  ArrowSquareOut,
  Briefcase,
  GraduationCap,
  Certificate,
  FileText,
} from "@phosphor-icons/react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6 md:p-10"
    >
      <div className="relative my-auto flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-bg-surface shadow-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-line bg-bg-primary/90 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <FileText size={18} weight="bold" className="text-structure" />
            <span
              id="resume-title"
              className="font-display text-sm font-medium text-text-primary"
            >
              {profileData.name} — Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg-surface px-3 py-1.5 font-mono text-xs text-text-primary transition-colors hover:border-line-highlight"
            >
              <Printer size={14} weight="bold" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 space-y-8 overflow-y-auto p-6 text-text-primary sm:p-10 print:p-0 print:text-black">
          {/* Header */}
          <div className="border-b border-line pb-6">
            <h1 className="mb-2 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {profileData.name}
            </h1>
            <p className="mb-4 font-mono text-sm text-structure">
              {profileData.roleTitle} · Published Researcher — Vanrakshak AI (
              {profileData.publication.paperId})
            </p>

            {/* Contact Pills */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-structure" />
                <span>{profileData.phone}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <EnvelopeSimple size={14} className="text-structure" />
                <span>{profileData.links.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-structure" />
                <span>{profileData.location}</span>
              </span>
              <a
                href={profileData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-text-primary hover:underline"
              >
                <GithubLogo size={14} />
                <span>github.com/Anshkant</span>
              </a>
              <a
                href={profileData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-text-primary hover:underline"
              >
                <LinkedinLogo size={14} />
                <span>linkedin.com/in/anshkant-malviya</span>
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="mb-2.5 font-mono text-xs uppercase tracking-widest text-text-muted">
              Summary
            </h2>
            <p className="font-body text-sm leading-relaxed text-text-muted">
              Full-stack developer and data analyst with 6 months of on-site
              internship experience at Atorix IT Solutions, Pune, and a
              peer-reviewed AI research publication in IJRASET (
              {profileData.publication.paperId}). Shipped 3 live production web
              applications and built an AI-powered wildlife monitoring system
              with 92%+ detection accuracy. Currently building a data analytics
              portfolio alongside a Data Science certification from ExcelR.
              Seeking Data Analyst / Software Engineer roles.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-bg-primary/50 p-3">
                <span className="mb-1 block font-medium text-signal">
                  Data Analytics:
                </span>
                <span className="text-text-muted">
                  Python (Pandas, NumPy), SQL, Power BI, Excel, EDA, Data
                  Visualization, Statistical Analysis
                </span>
              </div>
              <div className="rounded-xl border border-line bg-bg-primary/50 p-3">
                <span className="mb-1 block font-medium text-structure">
                  Development:
                </span>
                <span className="text-text-muted">
                  JavaScript (ES6+), React.js, Next.js, Node.js, Express.js,
                  REST APIs, Tailwind CSS
                </span>
              </div>
              <div className="rounded-xl border border-line bg-bg-primary/50 p-3">
                <span className="mb-1 block font-medium text-purple-400">
                  Databases & AI/ML:
                </span>
                <span className="text-text-muted">
                  MongoDB, SQLite, TensorFlow/Keras, OpenCV, YOLOv8, DeepSORT
                </span>
              </div>
              <div className="rounded-xl border border-line bg-bg-primary/50 p-3">
                <span className="mb-1 block font-medium text-text-primary">
                  Tools & Platforms:
                </span>
                <span className="text-text-muted">
                  Git, GitHub, VS Code, Vercel, Render, Auth0
                </span>
              </div>
            </div>
          </div>

          {/* Internship Experience */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              <Briefcase size={14} className="text-structure" />
              <span>Internship Experience</span>
            </h2>
            {profileData.internships.map((intern, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-line bg-bg-primary/40 p-5"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <div>
                    <h3 className="font-display text-sm font-medium text-text-primary">
                      {intern.role} —{" "}
                      <span className="text-structure">{intern.company}</span>
                    </h3>
                    <div className="font-mono text-xs text-text-muted">
                      {intern.location} ·{" "}
                      <a
                        href={intern.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary hover:underline"
                      >
                        {intern.website.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-text-muted sm:text-right">
                    {intern.period}
                  </span>
                </div>
                <ul className="list-inside list-disc space-y-1.5 font-body text-xs leading-relaxed text-text-muted">
                  {intern.highlights.map((point, idx) => (
                    <li key={idx} className="text-text-muted/90">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              <GraduationCap size={14} className="text-signal" />
              <span>Education</span>
            </h2>
            <div className="space-y-3">
              {profileData.education.map((edu, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between gap-1 rounded-xl border border-line bg-bg-primary/40 p-4 text-xs sm:flex-row sm:items-baseline"
                >
                  <div>
                    <h3 className="font-display text-sm font-medium text-text-primary">
                      {edu.degree}
                    </h3>
                    <div className="font-mono text-text-muted">
                      {edu.institution}
                    </div>
                    {edu.score && (
                      <div className="mt-0.5 font-mono font-medium text-signal">
                        {edu.score}
                      </div>
                    )}
                    {edu.status && (
                      <div className="mt-0.5 font-mono text-purple-300">
                        {edu.status}
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-text-muted sm:text-right">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Summary */}
          <div>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
              Key Projects
            </h2>
            <div className="space-y-3">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="space-y-1.5 rounded-xl border border-line bg-bg-primary/30 p-4 text-xs"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <div className="flex items-center gap-2 font-display text-sm font-medium text-text-primary">
                      <span>{project.title}</span>
                      {project.publication && (
                        <span className="rounded border border-purple-500/30 bg-purple-950/60 px-2 py-0.5 font-mono text-[10px] text-purple-300">
                          {project.publication}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-text-muted">
                      {project.technologies.slice(0, 4).join(", ")}
                    </span>
                  </div>
                  <p className="font-body leading-relaxed text-text-muted">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              <Certificate size={14} className="text-purple-400" />
              <span>Certifications & Achievements</span>
            </h2>
            <ul className="list-inside list-disc space-y-1.5 font-body text-xs text-text-muted">
              <li>
                Post Graduate Program in Data Science — ExcelR Institute, Pune
                (in progress, expected Jan 2027)
              </li>
              <li>The Complete Web Development Bootcamp — Udemy (2024)</li>
              <li>Android App Development — ACEMGRADE (Nov 2024)</li>
              <li>
                Published peer-reviewed paper: "Vanrakshak AI: AI-Driven
                Wildlife Sanctuary Monitoring System" — IJRASET79908
              </li>
              <li>
                Shipped 3 production websites during internship, all actively
                serving users
              </li>
              <li>Tech Fest core organiser, G H Raisoni University</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
