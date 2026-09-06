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
      {/* Directional scrims protecting text contrast on the left side */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-bg-primary via-bg-primary/95 to-transparent lg:w-3/5" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50" />

      {/* Subtle ambient backlights */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-structure/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-10 top-1/3 h-96 w-96 rounded-full bg-signal/10 blur-[140px]" />

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
