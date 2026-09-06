"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;

  attribute vec3 aTargetPosition;
  attribute float aRandom;
  attribute float aSize;

  varying vec3 vPosition;
  varying float vProgress;
  varying float vRandom;

  void main() {
    vRandom = aRandom;
    vProgress = uProgress;

    float t = smoothstep(0.0, 1.0, uProgress);

    // Subtle gentle oscillation
    vec3 posA = position;
    posA.y += sin(uTime * 1.0 + aRandom * 6.28) * 0.05;
    posA.x += cos(uTime * 0.8 + aRandom * 3.14) * 0.04;

    vec3 posB = aTargetPosition;
    posB.y += sin(uTime * 0.7 + aRandom * 4.0) * 0.02;

    // Morph between Data Scatter and Structured Crystalline Graph
    vec3 mixedPos = mix(posA, posB, t);
    vPosition = mixedPos;

    vec4 modelViewPosition = modelViewMatrix * vec4(mixedPos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;

    // Controlled point size to avoid blown-out overlapping blobs
    float baseSize = mix(aSize, aSize * 1.1, t);
    gl_PointSize = baseSize * uPixelRatio * (24.0 / -modelViewPosition.z);
  }
`;

const fragmentShader = `
  precision mediump float;

  uniform float uProgress;
  uniform float uOpacity;

  varying vec3 vPosition;
  varying float vProgress;
  varying float vRandom;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) {
      discard;
    }

    // Smooth circular falloff with controlled maximum intensity
    float alpha = smoothstep(0.5, 0.08, dist) * uOpacity * 0.85;

    // Tokens:
    // Signal (Data, Amber): #F2B441 -> vec3(0.949, 0.706, 0.255)
    // Structure (Code, Indigo): #5C7CFA -> vec3(0.361, 0.486, 0.980)
    // Bridge (AI/ML): #A78BFA -> vec3(0.655, 0.545, 0.980)
    vec3 signalColor = vec3(0.949, 0.706, 0.255);
    vec3 structureColor = vec3(0.361, 0.486, 0.980);
    vec3 bridgeColor = vec3(0.655, 0.545, 0.980);

    float t = smoothstep(0.0, 1.0, vProgress);

    vec3 baseColor;
    if (t < 0.5) {
      baseColor = mix(signalColor, bridgeColor, t * 2.0);
    } else {
      baseColor = mix(bridgeColor, structureColor, (t - 0.5) * 2.0);
    }

    // Controlled center dot highlight
    float core = smoothstep(0.2, 0.0, dist);
    vec3 finalColor = mix(baseColor, vec3(1.0, 1.0, 1.0), core * 0.35);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface ParticleUniforms {
  uProgress: { value: number };
  uTime: { value: number };
  uPixelRatio: { value: number };
  uOpacity: { value: number };
  [key: string]: { value: unknown };
}

interface ParticleFieldProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
}

export function ParticleField({
  scrollProgress = 0,
  reducedMotion = false,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const particleCount = useMemo(() => {
    return isMobile ? 1800 : 3600;
  }, [isMobile]);

  // Center offset: shift to the right on desktop so it frames the content rather than obstructing text!
  const xCenterOffset = isMobile ? 0.0 : 1.4;

  const { sourcePositions, targetPositions, randoms, sizes } = useMemo(() => {
    const source = new Float32Array(particleCount * 3);
    const target = new Float32Array(particleCount * 3);
    const rnd = new Float32Array(particleCount);
    const sz = new Float32Array(particleCount);

    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      rnd[i] = Math.random();
      sz[i] = 1.0 + Math.random() * 1.8;

      // STATE A: DATA / SIGNAL (Scattered distributions, density curves, trends)
      // Disperse more widely to avoid high-density bright blobs in a single spot
      const xA = (Math.random() - 0.5) * 4.2 + xCenterOffset;
      const yA =
        Math.sin((xA - xCenterOffset) * 1.8) * 0.9 +
        (Math.random() - 0.5) * 2.0;
      const zA = (Math.random() - 0.5) * 2.4;

      source[i3] = xA;
      source[i3 + 1] = yA;
      source[i3 + 2] = zA;

      // STATE B: STRUCTURE / CODE (Crystalline polyhedral graph)
      const idx = i;
      const phiB = Math.acos(1 - (2 * (idx + 0.5)) / particleCount);
      const thetaB = (2 * Math.PI * idx) / goldenRatio;

      const shellLayer = (i % 3) + 1;
      const shellRadius = 0.9 + shellLayer * 0.45;

      const xB =
        shellRadius * Math.sin(phiB) * Math.cos(thetaB) + xCenterOffset;
      const yB = shellRadius * Math.sin(phiB) * Math.sin(thetaB);
      const zB = shellRadius * Math.cos(phiB);

      if (i % 6 === 0) {
        target[i3] =
          Math.round((xB - xCenterOffset) * 2.0) * 0.48 + xCenterOffset;
        target[i3 + 1] = Math.round(yB * 2.0) * 0.48;
        target[i3 + 2] = Math.round(zB * 2.0) * 0.48;
      } else {
        target[i3] = xB;
        target[i3 + 1] = yB;
        target[i3 + 2] = zB;
      }
    }

    return {
      sourcePositions: source,
      targetPositions: target,
      randoms: rnd,
      sizes: sz,
    };
  }, [particleCount, xCenterOffset]);

  const uniforms = useMemo<ParticleUniforms>(
    () => ({
      uProgress: { value: 0.0 },
      uTime: { value: 0.0 },
      uPixelRatio: { value: 1.0 },
      uOpacity: { value: 0.0 },
    }),
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined" && materialRef.current) {
      const u = materialRef.current.uniforms as ParticleUniforms;
      u.uPixelRatio.value = Math.min(window.devicePixelRatio, 2.0);
    }
  }, []);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms as ParticleUniforms;

    if (reducedMotion) {
      u.uProgress.value = 1.0;
      u.uOpacity.value = 0.75;
      return;
    }

    u.uTime.value += delta;

    if (u.uOpacity.value < 0.85) {
      u.uOpacity.value = THREE.MathUtils.lerp(
        u.uOpacity.value,
        0.85,
        delta * 2.0
      );
    }

    const breathingOffset = 0.15 * Math.sin(state.clock.elapsedTime * 0.5);
    const targetProgress = THREE.MathUtils.clamp(
      scrollProgress * 1.4 + 0.35 + breathingOffset,
      0.0,
      1.0
    );

    u.uProgress.value = THREE.MathUtils.lerp(
      u.uProgress.value,
      targetProgress,
      delta * 2.5
    );

    if (pointsRef.current) {
      const targetRotationX = state.pointer.y * 0.12;
      const targetRotationY =
        state.pointer.x * 0.2 + state.clock.elapsedTime * 0.025;

      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        targetRotationX,
        delta * 2.0
      );
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        targetRotationY,
        delta * 2.0
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={sourcePositions.length / 3}
          array={sourcePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aTargetPosition"
          count={targetPositions.length / 3}
          array={targetPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={randoms.length}
          array={randoms}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
