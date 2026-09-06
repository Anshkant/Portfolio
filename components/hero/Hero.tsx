"use client";

import React from "react";
import dynamic from "next/dynamic";
import { HeroContent } from "./HeroContent";

// Lazy-load the Three.js R3F Canvas without blocking SSR
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-gradient-to-b from-[#0B0E14] via-[#10141D] to-[#0B0E14] opacity-50"
      aria-hidden="true"
    />
  ),
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-bg-primary"
    >
      {/* 3D Background Canvas */}
      <HeroCanvas />

      {/* Foreground Semantic Content */}
      <HeroContent />
    </section>
  );
}
