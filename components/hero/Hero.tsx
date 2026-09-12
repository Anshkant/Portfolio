"use client";

import React from "react";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-bg-primary"
    >
      {/* Ambient background halos */}
      <div className="pointer-events-none absolute -left-10 top-1/4 h-96 w-96 rounded-full bg-structure/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[480px] w-[480px] rounded-full bg-signal/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[140px]" />

      {/* Foreground Semantic Content with Featured 3D Console */}
      <HeroContent />
    </section>
  );
}
