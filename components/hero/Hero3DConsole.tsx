"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ScatterPlotScene, VisualizationMode } from "./ScatterPlotScene";
import { ChartScatter, Brain, Waveform, HandTap } from "@phosphor-icons/react";

export function Hero3DConsole() {
  const [mode, setMode] = useState<VisualizationMode>("scatter");

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-line/80 bg-gradient-to-b from-bg-surface/95 via-bg-surface/80 to-bg-primary/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl sm:rounded-3xl sm:p-4">
      {/* Top Console HUD Header */}
      <div className="flex items-center justify-between border-b border-line/60 pb-2.5 font-mono text-[10px] sm:text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-semibold text-text-primary">
            {mode === "scatter"
              ? "3D_EDA // MATPLOTLIB SCATTER"
              : mode === "neural"
                ? "TENSOR_CORE // NEURAL SPHERE"
                : "SIGNAL_MATRIX // NUMPY WAVE"}
          </span>
        </div>

        <div className="flex items-center gap-1 text-text-muted">
          <HandTap size={13} className="text-structure" />
          <span className="hidden sm:inline">TOUCH &amp; DRAG TO ORBIT</span>
          <span className="sm:hidden">DRAG 360°</span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative h-64 w-full cursor-grab active:cursor-grabbing sm:h-72 lg:h-[340px]">
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,124,250,0.12)_0%,transparent_70%)]" />

        <Canvas
          camera={{ position: [0, 0, 4.4], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          className="h-full w-full touch-none"
        >
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.85}
            dampingFactor={0.06}
            autoRotate={false}
          />
          <ScatterPlotScene mode={mode} />
        </Canvas>
      </div>

      {/* Bottom Mode Switcher Dock */}
      <div className="border-t border-line/60 pt-2.5">
        <div className="mb-1.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-muted sm:text-[10px]">
          <span>Select 3D Topology:</span>
          <span className="text-emerald-400">1,800 Active Nodes</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {/* Mode 1: 3D Scatter */}
          <button
            type="button"
            onClick={() => setMode("scatter")}
            className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2 font-mono text-[11px] transition-all duration-200 sm:px-3 sm:text-xs ${
              mode === "scatter"
                ? "border-structure bg-structure/20 font-bold text-structure shadow-lg shadow-structure/20 ring-1 ring-structure/40"
                : "border-line bg-bg-primary/80 text-text-muted hover:border-line-highlight hover:text-text-primary"
            }`}
          >
            <ChartScatter size={14} weight="bold" />
            <span>Scatter EDA</span>
          </button>

          {/* Mode 2: Neural Core */}
          <button
            type="button"
            onClick={() => setMode("neural")}
            className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2 font-mono text-[11px] transition-all duration-200 sm:px-3 sm:text-xs ${
              mode === "neural"
                ? "border-purple-400 bg-purple-500/20 font-bold text-purple-300 shadow-lg shadow-purple-500/20 ring-1 ring-purple-400/40"
                : "border-line bg-bg-primary/80 text-text-muted hover:border-line-highlight hover:text-text-primary"
            }`}
          >
            <Brain size={14} weight="bold" />
            <span>Neural Core</span>
          </button>

          {/* Mode 3: Data Wave */}
          <button
            type="button"
            onClick={() => setMode("wave")}
            className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2 font-mono text-[11px] transition-all duration-200 sm:px-3 sm:text-xs ${
              mode === "wave"
                ? "border-signal bg-signal/20 font-bold text-signal shadow-lg shadow-signal/20 ring-1 ring-signal/40"
                : "border-line bg-bg-primary/80 text-text-muted hover:border-line-highlight hover:text-text-primary"
            }`}
          >
            <Waveform size={14} weight="bold" />
            <span>Data Wave</span>
          </button>
        </div>
      </div>
    </div>
  );
}
