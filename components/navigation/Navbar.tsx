"use client";

import React, { useState, useEffect } from "react";
import { profileData } from "@/lib/content/profile";
import { GithubLogo, LinkedinLogo, List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "border-line-highlight bg-bg-primary/85 shadow-xl shadow-black/40 backdrop-blur-md"
            : "border-line bg-bg-surface/60 backdrop-blur-sm"
        }`}
      >
        {/* Brand Mark with Duality Dot */}
        <a href="#hero" className="group flex items-center gap-2.5">
          <div className="flex items-center -space-x-1">
            <span className="h-2.5 w-2.5 rounded-full bg-structure transition-transform duration-300 group-hover:scale-110" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="font-display text-sm font-medium tracking-tight text-text-primary">
            {profileData.name}
          </span>
          <span className="hidden pl-1 font-mono text-xs text-text-muted/70 sm:inline-block">
            / CSE
          </span>
        </a>

        {/* Desktop Links (Single Line) */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Link Quick Access */}
        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={profileData.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-white/5 hover:text-text-primary"
          >
            <GithubLogo size={16} weight="bold" />
          </a>
          <a
            href={profileData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-white/5 hover:text-text-primary"
          >
            <LinkedinLogo size={16} weight="bold" />
          </a>
          <a
            href="#contact"
            className="ml-2 rounded-full border border-structure/30 bg-structure/15 px-3 py-1.5 font-mono text-xs font-medium text-structure transition-colors hover:bg-structure/25"
          >
            Connect
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:text-text-primary md:hidden"
        >
          {mobileMenuOpen ? (
            <X size={18} weight="bold" />
          ) : (
            <List size={18} weight="bold" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-line bg-bg-surface/95 p-5 shadow-2xl backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-line/40 py-1.5 font-mono text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={profileData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary"
              >
                <GithubLogo size={16} weight="bold" />
                <span>GitHub</span>
              </a>
              <span className="text-line">|</span>
              <a
                href={profileData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary"
              >
                <LinkedinLogo size={16} weight="bold" />
                <span>LinkedIn</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
