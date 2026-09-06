"use client";

import React, { useState } from "react";
import { profileData } from "@/lib/content/profile";
import {
  Copy,
  Check,
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  ArrowSquareOut,
  MapPin,
  InstagramLogo,
  XLogo,
} from "@phosphor-icons/react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-6xl px-6 py-28"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-structure/5 blur-[140px]" />

      {/* Main Container */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-surface p-8 shadow-2xl sm:p-12">
        {/* Subtle dual-accent hairline */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-structure via-purple-400 to-signal" />

        <div className="max-w-3xl">
          {/* Status Indicator */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>Available for New Roles</span>
          </div>

          <h2 className="mb-6 font-display text-3xl font-medium tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Let's build systems where code meets signal.
          </h2>

          {/* Career Interest Line (Verbatim from Master Prompt §5) */}
          <blockquote className="mb-8 border-l-2 border-structure py-1 pl-4 font-body text-base leading-relaxed text-text-primary/90 sm:text-lg">
            "{profileData.careerInterest}"
          </blockquote>

          <p className="mb-10 max-w-[62ch] font-body text-sm leading-relaxed text-text-muted sm:text-base">
            Whether you're looking for a software engineer who grasps underlying
            data mechanics or a data analyst who writes clean, production-ready
            code—I'm open to conversations.
          </p>

          {/* Direct Action Hub */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Direct Email Link */}
            <a
              href={`mailto:${profileData.links.email}`}
              className="active:scale-98 inline-flex items-center gap-2.5 rounded-full bg-text-primary px-6 py-3.5 text-sm font-medium text-bg-primary shadow-lg shadow-white/5 transition-all duration-200 hover:bg-white"
            >
              <EnvelopeSimple size={16} weight="bold" />
              <span>Send Email</span>
            </a>

            {/* Copy Email Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="active:scale-98 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-primary px-5 py-3.5 font-mono text-xs text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated"
            >
              {copied ? (
                <>
                  <Check size={14} weight="bold" className="text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy size={14} weight="bold" className="text-text-muted" />
                  <span>{profileData.links.email}</span>
                </>
              )}
            </button>

            {/* LinkedIn Profile */}
            <a
              href={profileData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-primary px-5 py-3.5 font-mono text-xs text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated"
            >
              <LinkedinLogo
                size={15}
                weight="bold"
                className="text-structure"
              />
              <span>LinkedIn</span>
              <ArrowSquareOut
                size={13}
                weight="bold"
                className="text-text-muted"
              />
            </a>

            {/* GitHub Profile */}
            <a
              href={profileData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-primary px-5 py-3.5 font-mono text-xs text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated"
            >
              <GithubLogo size={15} weight="bold" className="text-signal" />
              <span>GitHub</span>
              <ArrowSquareOut
                size={13}
                weight="bold"
                className="text-text-muted"
              />
            </a>

            {/* X / Twitter Profile */}
            <a
              href={profileData.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-primary px-5 py-3.5 font-mono text-xs text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated"
            >
              <XLogo size={14} weight="bold" />
              <span>X (Twitter)</span>
              <ArrowSquareOut
                size={13}
                weight="bold"
                className="text-text-muted"
              />
            </a>

            {/* Instagram Profile */}
            <a
              href={profileData.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-primary px-5 py-3.5 font-mono text-xs text-text-primary transition-colors duration-200 hover:border-line-highlight hover:bg-bg-elevated hover:text-pink-400"
            >
              <InstagramLogo
                size={15}
                weight="bold"
                className="text-pink-400"
              />
              <span>Instagram</span>
              <ArrowSquareOut
                size={13}
                weight="bold"
                className="text-text-muted"
              />
            </a>
          </div>

          {/* Location & Metadata Note */}
          <div className="mt-10 flex items-center gap-2 border-t border-line/60 pt-6 font-mono text-xs text-text-muted">
            <MapPin size={15} className="text-structure" />
            <span>
              Based in Nagpur, India · Open to remote and on-site engineering &
              analytics opportunities.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
