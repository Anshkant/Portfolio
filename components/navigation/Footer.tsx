import React from "react";
import { profileData } from "@/lib/content/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-8 text-center font-mono text-xs text-text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-structure" />
          <span className="text-text-primary">{profileData.name}</span>
          <span className="text-text-muted/60">
            — Software Developer + Data Analyst
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-text-muted/70">Nagpur, India</span>
          <span>·</span>
          <span>© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
