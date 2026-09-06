"use client";

import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";

export default function HeroCanvas() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const progress = Math.min(
          Math.max(scrollY / (windowHeight * 0.9), 0),
          1
        );
        setScrollProgress(progress);
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle depth lighting and gradient vignetting */}
      <div className="bg-radial-gradient pointer-events-none absolute inset-0 z-10 from-transparent via-bg-primary/60 to-bg-primary" />
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-structure/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-signal/10 blur-[130px]" />

      {/* Three.js Canvas */}
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 46 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          className="h-full w-full"
        >
          <ParticleField
            scrollProgress={scrollProgress}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      )}
    </div>
  );
}
