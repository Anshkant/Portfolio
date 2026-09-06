"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { InteractiveHeroScene } from "./InteractiveHeroScene";

export default function HeroCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Directional scrim: guarantees text on left is 100% crisp and readable */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-bg-primary via-bg-primary/95 to-transparent lg:w-3/5" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/60" />

      {/* Ambient glowing halos */}
      <div className="pointer-events-none absolute -left-10 top-1/4 h-96 w-96 rounded-full bg-structure/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[480px] w-[480px] rounded-full bg-signal/15 blur-[150px]" />

      {/* Three.js Interactive Canvas with active pointer events */}
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 46 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          className="h-full w-full"
        >
          <InteractiveHeroScene reducedMotion={reducedMotion} />
        </Canvas>
      )}
    </div>
  );
}
