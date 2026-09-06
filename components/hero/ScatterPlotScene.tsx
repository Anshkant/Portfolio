"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const scatterVertexShader = `
  uniform float uProgress;       // 0.0 = Raw Noisy Cloud, 1.0 = Clean Assembled Scatter Plot
  uniform float uTime;
  uniform float uPixelRatio;

  attribute vec3 aTargetPosition; // The clean 3D scatter coordinates
  attribute vec3 aClusterColor;   // Color assigned to each data cluster
  attribute float aSize;
  attribute float aRandom;

  varying vec3 vColor;
  varying float vProgress;

  void main() {
    vProgress = uProgress;

    // Smoothstep transition
    float t = smoothstep(0.0, 1.0, uProgress);

    // State A: Raw noise / chaotic uncleaned data with subtle brownian drift
    vec3 rawPos = position;
    rawPos.x += sin(uTime * 0.8 + aRandom * 6.28) * 0.06;
    rawPos.y += cos(uTime * 0.9 + aRandom * 3.14) * 0.06;
    rawPos.z += sin(uTime * 0.7 + aRandom * 4.5) * 0.06;

    // State B: Structured 3D scatter plot coordinates
    vec3 plotPos = aTargetPosition;
    // Micro breathing in structured state
    plotPos.y += sin(uTime * 1.2 + aRandom * 6.0) * 0.015;

    // Interpolate between Raw Noise and Clean Scatter Plot
    vec3 currentPos = mix(rawPos, plotPos, t);

    // Dynamic color transition: from monochrome noise grey to rich cluster colors
    vec3 rawColor = vec3(0.50, 0.55, 0.68); // Noisy unclassified data
    vColor = mix(rawColor, aClusterColor, t);

    vec4 modelViewPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;

    // Crisp point size, distance attenuated
    gl_PointSize = aSize * uPixelRatio * (28.0 / -modelViewPosition.z);
  }
`;

const scatterFragmentShader = `
  precision mediump float;

  uniform float uOpacity;

  varying vec3 vColor;
  varying float vProgress;

  void main() {
    // Sharp circular data point
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) {
      discard;
    }

    // Crisp edge with subtle antialiasing
    float alpha = smoothstep(0.5, 0.25, dist) * uOpacity;

    // Specular highlight in the center for a crisp data point feel
    float core = smoothstep(0.2, 0.0, dist);
    vec3 finalColor = mix(vColor, vec3(1.0), core * 0.5);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface ScatterPlotSceneProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
}

export function ScatterPlotScene({
  scrollProgress = 0,
  reducedMotion = false,
}: ScatterPlotSceneProps) {
  const { viewport } = useThree();
  const mainGroupRef = useRef<THREE.Group>(null);
  const pointsMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const axesGroupRef = useRef<THREE.Group>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const positionX = isMobile ? 0 : 1.35;
  const scale = isMobile ? 0.9 : 1.15;
  const particleCount = isMobile ? 1600 : 3200;

  // -------------------------------------------------------------
  // GENERATE DATASETS: RAW NOISE (State A) -> CLEAN EDA SCATTER (State B)
  // -------------------------------------------------------------
  const { rawPositions, targetPositions, clusterColors, sizes, randoms } =
    useMemo(() => {
      const raw = new Float32Array(particleCount * 3);
      const target = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sz = new Float32Array(particleCount);
      const rnd = new Float32Array(particleCount);

      // Color definitions for clusters:
      // Cluster 0: Warm Amber-Gold (Signal / Data Analytics) -> #F2B441
      const colorAmber = new THREE.Color("#F2B441");
      // Cluster 1: Electric Indigo (Structure / Software Engineering) -> #5C7CFA
      const colorIndigo = new THREE.Color("#5C7CFA");
      // Cluster 2: Soft Violet (AI/ML & Computer Vision Bridge) -> #A78BFA
      const colorViolet = new THREE.Color("#A78BFA");

      // Cluster Centers in 3D Plot Space (bounded in [-1.35, 1.35])
      const clusterCenters = [
        { x: -0.65, y: -0.35, z: -0.35, color: colorAmber, spread: 0.4 }, // Cluster A: Data Signal
        { x: 0.65, y: 0.55, z: 0.35, color: colorIndigo, spread: 0.38 }, // Cluster B: Software Structure
        { x: 0.05, y: 0.15, z: -0.5, color: colorViolet, spread: 0.34 }, // Cluster C: AI/ML Bridge
      ];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        rnd[i] = Math.random();
        sz[i] = 1.0 + Math.random() * 1.4;

        // ---------------------------------------------------------
        // STATE A: RAW NOISE (Chaotic 3D cloud before cleaning/EDA)
        // ---------------------------------------------------------
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.2 * Math.cbrt(Math.random());

        raw[i3] = r * Math.sin(phi) * Math.cos(theta);
        raw[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        raw[i3 + 2] = r * Math.cos(phi);

        // ---------------------------------------------------------
        // STATE B: CLEAN EDA 3D SCATTER PLOT (Clustered Distributions)
        // ---------------------------------------------------------
        if (i < particleCount * 0.8) {
          const cIdx = i % 3;
          const c = clusterCenters[cIdx]!;

          const u1 = Math.random() || 0.001;
          const u2 = Math.random();
          const z0 =
            Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
          const z1 =
            Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
          const z2 = (Math.random() - 0.5) * 1.6;

          target[i3] = c.x + z0 * c.spread;
          target[i3 + 1] = c.y + z1 * c.spread;
          target[i3 + 2] = c.z + z2 * c.spread;

          colors[i3] = c.color.r;
          colors[i3 + 1] = c.color.g;
          colors[i3 + 2] = c.color.b;
        } else {
          // Regression / Trend Line with residual variance
          const tVal = (Math.random() - 0.5) * 2.4;
          const residual = (Math.random() - 0.5) * 0.22;

          target[i3] = tVal * 0.9;
          target[i3 + 1] = tVal * 0.65 + residual;
          target[i3 + 2] = tVal * 0.45 + (Math.random() - 0.5) * 0.25;

          const gradColor = tVal > 0 ? colorIndigo : colorAmber;
          colors[i3] = gradColor.r;
          colors[i3 + 1] = gradColor.g;
          colors[i3 + 2] = gradColor.b;
        }
      }

      return {
        rawPositions: raw,
        targetPositions: target,
        clusterColors: colors,
        sizes: sz,
        randoms: rnd,
      };
    }, [particleCount]);

  // -------------------------------------------------------------
  // 3D AXIS LINES, TICK MARKS & GRID PLANES (Matplotlib 3D EDA Style)
  // -------------------------------------------------------------
  const { axisLineGeo, gridLineGeo, tickGeo } = useMemo(() => {
    const min = -1.35;
    const max = 1.35;
    const axisPoints: THREE.Vector3[] = [];
    const tickPoints: THREE.Vector3[] = [];

    // X Axis line (floor, bottom-front)
    axisPoints.push(new THREE.Vector3(min, min, min));
    axisPoints.push(new THREE.Vector3(max + 0.25, min, min));

    // Y Axis line (vertical elevation)
    axisPoints.push(new THREE.Vector3(min, min, min));
    axisPoints.push(new THREE.Vector3(min, max + 0.25, min));

    // Z Axis line (depth)
    axisPoints.push(new THREE.Vector3(min, min, min));
    axisPoints.push(new THREE.Vector3(min, min, max + 0.25));

    // Tick marks along X, Y, and Z axes
    const steps = 4;
    const stepSize = (max - min) / steps;

    for (let i = 1; i <= steps; i++) {
      const val = min + i * stepSize;
      // X ticks (vertical upward)
      tickPoints.push(new THREE.Vector3(val, min, min));
      tickPoints.push(new THREE.Vector3(val, min + 0.07, min));

      // Y ticks (horizontal along X)
      tickPoints.push(new THREE.Vector3(min, val, min));
      tickPoints.push(new THREE.Vector3(min + 0.07, val, min));

      // Z ticks (horizontal along X)
      tickPoints.push(new THREE.Vector3(min, min, val));
      tickPoints.push(new THREE.Vector3(min + 0.07, min, val));
    }

    // Floor and Back Grid lines (Matplotlib style)
    const gridPoints: THREE.Vector3[] = [];

    // Floor grid (XZ plane at y = min)
    for (let i = 0; i <= steps; i++) {
      const v = min + i * stepSize;
      gridPoints.push(new THREE.Vector3(min, min, v));
      gridPoints.push(new THREE.Vector3(max, min, v));

      gridPoints.push(new THREE.Vector3(v, min, min));
      gridPoints.push(new THREE.Vector3(v, min, max));
    }

    // Back wall grid (XY plane at z = min)
    for (let i = 0; i <= steps; i++) {
      const v = min + i * stepSize;
      gridPoints.push(new THREE.Vector3(min, v, min));
      gridPoints.push(new THREE.Vector3(max, v, min));

      gridPoints.push(new THREE.Vector3(v, min, min));
      gridPoints.push(new THREE.Vector3(v, max, min));
    }

    return {
      axisLineGeo: new THREE.BufferGeometry().setFromPoints(axisPoints),
      gridLineGeo: new THREE.BufferGeometry().setFromPoints(gridPoints),
      tickGeo: new THREE.BufferGeometry().setFromPoints(tickPoints),
    };
  }, []);

  interface ScatterUniforms {
    uProgress: { value: number };
    uTime: { value: number };
    uPixelRatio: { value: number };
    uOpacity: { value: number };
    [key: string]: { value: unknown };
  }

  const uniforms = useMemo<ScatterUniforms>(
    () => ({
      uProgress: { value: 0.0 },
      uTime: { value: 0.0 },
      uPixelRatio: { value: 1.0 },
      uOpacity: { value: 0.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!pointsMaterialRef.current || !mainGroupRef.current) return;
    const u = pointsMaterialRef.current.uniforms as ScatterUniforms;

    if (reducedMotion) {
      u.uProgress.value = 1.0;
      u.uOpacity.value = 0.95;
      if (axesGroupRef.current) axesGroupRef.current.visible = true;
      return;
    }

    const { pointer, clock } = state;

    u.uTime.value += delta;

    if (u.uOpacity.value < 0.95) {
      u.uOpacity.value = THREE.MathUtils.lerp(
        u.uOpacity.value,
        0.95,
        delta * 3.0
      );
    }

    // Auto-assembly on load + scroll boost
    const autoAssembly = THREE.MathUtils.clamp(
      clock.elapsedTime * 0.75,
      0.0,
      1.0
    );
    const targetProgress = THREE.MathUtils.clamp(
      autoAssembly + scrollProgress * 1.5,
      0.0,
      1.0
    );

    u.uProgress.value = THREE.MathUtils.lerp(
      u.uProgress.value,
      targetProgress,
      delta * 3.0
    );

    // Fade in axes as plot assembles
    if (axesGroupRef.current) {
      const axesProgress = THREE.MathUtils.smoothstep(
        u.uProgress.value,
        0.3,
        0.95
      );
      axesGroupRef.current.traverse((child) => {
        if (child instanceof THREE.LineSegments) {
          const mat = child.material as THREE.LineBasicMaterial;
          mat.opacity = axesProgress * 0.45;
        }
      });
    }

    // Mouse parallax for interactive 3D inspection
    const targetRotX = -pointer.y * 0.45 + 0.18;
    const targetRotY = pointer.x * 0.75 + 0.35;

    mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      mainGroupRef.current.rotation.x,
      targetRotX,
      delta * 3.5
    );
    mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      mainGroupRef.current.rotation.y,
      targetRotY,
      delta * 3.5
    );
  });

  return (
    <>
      <ambientLight intensity={0.6} />

      {/* Main 3D Scatter Plot Assembly */}
      <group position={[positionX, 0, 0]} scale={scale}>
        <group ref={mainGroupRef}>
          {/* --------------------------------------------------------- */}
          {/* 1. THE PARTICLES (Morphing from Noisy Cloud to 3D Scatter) */}
          {/* --------------------------------------------------------- */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={rawPositions.length / 3}
                array={rawPositions}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-aTargetPosition"
                count={targetPositions.length / 3}
                array={targetPositions}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-aClusterColor"
                count={clusterColors.length / 3}
                array={clusterColors}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-aSize"
                count={sizes.length}
                array={sizes}
                itemSize={1}
              />
              <bufferAttribute
                attach="attributes-aRandom"
                count={randoms.length}
                array={randoms}
                itemSize={1}
              />
            </bufferGeometry>
            <shaderMaterial
              ref={pointsMaterialRef}
              vertexShader={scatterVertexShader}
              fragmentShader={scatterFragmentShader}
              uniforms={uniforms}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>

          {/* --------------------------------------------------------- */}
          {/* 2. 3D AXIS COORDINATE FRAME & GRID PLANES (Matplotlib EDA) */}
          {/* --------------------------------------------------------- */}
          <group ref={axesGroupRef}>
            {/* Primary X, Y, Z Coordinate Axes */}
            <lineSegments geometry={axisLineGeo}>
              <lineBasicMaterial
                color="#5C7CFA"
                transparent
                opacity={0.45}
                linewidth={1.5}
              />
            </lineSegments>

            {/* Axis Tick Marks */}
            <lineSegments geometry={tickGeo}>
              <lineBasicMaterial
                color="#EDEFF4"
                transparent
                opacity={0.4}
                linewidth={1.2}
              />
            </lineSegments>

            {/* Background & Floor Reference Grids */}
            <lineSegments geometry={gridLineGeo}>
              <lineBasicMaterial
                color="#232838"
                transparent
                opacity={0.3}
                linewidth={1.0}
              />
            </lineSegments>

            {/* Axis Origin Marker Dot */}
            <mesh position={[-1.35, -1.35, -1.35]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#EDEFF4" />
            </mesh>

            {/* Axis Tips: X, Y, Z Indicators */}
            <mesh position={[1.6, -1.35, -1.35]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#5C7CFA" />
            </mesh>
            <mesh position={[-1.35, 1.6, -1.35]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#F2B441" />
            </mesh>
            <mesh position={[-1.35, -1.35, 1.6]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#A78BFA" />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}
