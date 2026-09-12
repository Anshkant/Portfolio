"use client";

import React from "react";
import dynamic from "next/dynamic";
import { HeroContent } from "./HeroContent";

// Laptop & Tablet 3D Background Canvas (Original Scatter Plot)
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-bg-primary"
    >
      {/* 3D Background Canvas — Active on Tablet and Laptop */}
      <div className="hidden md:block">
        <HeroCanvas />
      </div>

      {/* Foreground Semantic Content (features Mobile 3D Console on mobile) */}
      <HeroContent />
    </section>
  );
}
