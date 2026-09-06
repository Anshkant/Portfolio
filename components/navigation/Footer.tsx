import React from "react";
import { profileData } from "@/lib/content/profile";
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-line px-6 py-8 text-center font-mono text-xs text-text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-structure" />
          <span className="font-bold text-text-primary">
            {profileData.name}
          </span>
          <span className="text-text-muted/60">
            — Software Engineer & Data Analyst
          </span>
        </div>

        {/* Social Icons Hub */}
        <div className="flex items-center gap-4">
          <a
            href={profileData.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            <GithubLogo size={16} />
          </a>
          <a
            href={profileData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted transition-colors hover:text-structure"
          >
            <LinkedinLogo size={16} />
          </a>
          <a
            href={profileData.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            <XLogo size={15} />
          </a>
          <a
            href={profileData.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-text-muted transition-colors hover:text-pink-400"
          >
            <InstagramLogo size={16} />
          </a>
          <span className="text-line">|</span>
          <span className="text-text-muted/70">Nagpur, India</span>
          <span>·</span>
          <span>© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
