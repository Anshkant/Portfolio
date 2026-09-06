"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already loaded in this session to prevent annoying repeated delays
    const hasLoaded = sessionStorage.getItem("anshkant_loaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("anshkant_loaded", "true");
          }, 350);
          return 100;
        }
        // Organic acceleration
        const increment = Math.max(
          1,
          Math.floor((100 - prev) * 0.12) + Math.floor(Math.random() * 4)
        );
        return Math.min(100, prev + increment);
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -25,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-bg-primary p-8 text-text-primary sm:p-12"
        >
          {/* Top Brand Tag */}
          <div className="flex w-full max-w-5xl items-center justify-between font-mono text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-structure" />
              <span className="font-semibold text-text-primary">
                ANSHKANT MALVIYA
              </span>
            </div>
            <span className="hidden sm:inline-block">SIGNAL ⇄ STRUCTURE</span>
          </div>

          {/* Center 1 to 100% Counter Display */}
          <div className="my-auto flex flex-col items-center space-y-5">
            <div className="flex items-baseline font-display text-6xl font-black tracking-tighter text-white sm:text-8xl md:text-9xl">
              <span className="tabular-nums">{progress}</span>
              <span className="ml-1 font-mono text-3xl text-signal sm:text-5xl">
                %
              </span>
            </div>

            {/* Glowing Dual Progress Track */}
            <div className="relative h-1.5 w-64 overflow-hidden rounded-full bg-line sm:w-80">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-structure via-purple-400 to-signal shadow-[0_0_12px_rgba(92,124,250,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            <div className="flex items-center gap-2 pt-1 font-mono text-xs uppercase tracking-widest text-text-muted/80">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-signal" />
              <span>Initializing Systems & Datasets...</span>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="flex w-full max-w-5xl items-center justify-between font-mono text-[11px] text-text-muted/60">
            <span>PYTHON · NEXT.JS · DATA ANALYTICS</span>
            <span>NAGPUR, INDIA</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
