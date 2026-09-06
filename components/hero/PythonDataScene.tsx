"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Custom 3D parametric curve representing the iconic Python intertwining sweep
class PythonHelixCurve extends THREE.Curve<THREE.Vector3> {
  private phaseOffset: number;
  private radius: number;
  private height: number;

  constructor(
    phaseOffset: number = 0,
    radius: number = 1.2,
    height: number = 2.0
  ) {
    super();
    this.phaseOffset = phaseOffset;
    this.radius = radius;
    this.height = height;
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const angle = t * Math.PI * 2.5 + this.phaseOffset;
    // Elegant interlocking figure-8 spiral
    const x =
      Math.sin(angle) * this.radius * (1 + 0.3 * Math.cos(t * Math.PI * 2));
    const y = (t - 0.5) * this.height + Math.sin(angle * 2.0) * 0.25;
    const z = Math.cos(angle) * this.radius * 0.85;

    return optionalTarget.set(x, y, z);
  }
}

interface PythonDataSceneProps {
  reducedMotion?: boolean;
}

export function PythonDataScene({
  reducedMotion = false,
}: PythonDataSceneProps) {
  const { viewport } = useThree();
  const sceneGroupRef = useRef<THREE.Group>(null);
  const dataGridRef = useRef<THREE.Mesh>(null);
  const pythonGroupRef = useRef<THREE.Group>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const positionX = isMobile ? 0 : 1.35;
  const scale = isMobile ? 0.95 : 1.25;

  // -------------------------------------------------------------
  // 1. THE PYTHON DUAL INTERLOCKING SERPENT STRANDS (Code + Logic)
  // Strand 1: Electric Indigo (Software / Engineering)
  // Strand 2: Warm Amber-Gold (Data / Analytics)
  // -------------------------------------------------------------
  const { strand1Geo, strand2Geo, head1Pos, head2Pos } = useMemo(() => {
    const curve1 = new PythonHelixCurve(0, 1.2, 2.2);
    const curve2 = new PythonHelixCurve(Math.PI, 1.2, 2.2);

    const geo1 = new THREE.TubeGeometry(curve1, 90, 0.12, 16, false);
    const geo2 = new THREE.TubeGeometry(curve2, 90, 0.12, 16, false);

    // Tip coordinates for the signature Python logo "dot/eye" nodes
    const h1 = curve1.getPoint(0.98);
    const h2 = curve2.getPoint(0.98);

    return {
      strand1Geo: geo1,
      strand2Geo: geo2,
      head1Pos: [h1.x, h1.y, h1.z] as [number, number, number],
      head2Pos: [h2.x, h2.y, h2.z] as [number, number, number],
    };
  }, []);

  // -------------------------------------------------------------
  // 2. THE 3D DATA MANIFOLD / STATISTICAL WAVE LATTICE
  // Represents statistical distributions, tensors, and probability waves
  // -------------------------------------------------------------
  const { dataGridGeo, originalGridY } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(3.0, 3.0, 28, 28);
    const pos = geo.attributes.position;
    if (!pos) return { dataGridGeo: geo, originalGridY: new Float32Array() };

    const origY = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      origY[i] = pos.getY(i);
    }
    return { dataGridGeo: geo, originalGridY: origY };
  }, []);

  // Frame Loop: Cursor reactive physics, dynamic lighting, wave deformation
  useFrame((state, delta) => {
    if (!sceneGroupRef.current) return;

    if (reducedMotion) {
      sceneGroupRef.current.rotation.y = 0.4;
      return;
    }

    const { pointer, clock } = state;
    const time = clock.elapsedTime;

    // Smooth magnetic mouse tilt with physics damping
    const targetRotX = -pointer.y * 0.42;
    const targetRotY = pointer.x * 0.65;

    sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneGroupRef.current.rotation.x,
      targetRotX,
      delta * 3.5
    );
    sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneGroupRef.current.rotation.y,
      targetRotY,
      delta * 3.5
    );

    // Continuous subtle helical precession of Python strands
    if (pythonGroupRef.current) {
      pythonGroupRef.current.rotation.y += delta * 0.4;
      pythonGroupRef.current.rotation.z = Math.sin(time * 0.5) * 0.08;
    }

    // Dynamic wave perturbation of the Data Manifold
    if (dataGridRef.current && dataGridGeo.attributes.position) {
      const pos = dataGridGeo.attributes.position;
      const count = pos.count;

      for (let i = 0; i < count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);

        // Gaussian wave + ripple influenced by mouse coordinates
        const distFromPointer = Math.hypot(
          u - pointer.x * 1.5,
          v - pointer.y * 1.5
        );
        const wave = Math.sin(distFromPointer * 3.5 - time * 2.5) * 0.12;
        const gaussian = Math.exp(-0.5 * (u * u + v * v)) * 0.28;

        pos.setZ(i, gaussian + wave);
      }
      pos.needsUpdate = true;
    }

    // Cursor spotlight: casts reflections and glints across the Python ribbons
    if (cursorLightRef.current) {
      const targetLightX = pointer.x * viewport.width * 0.45 + positionX;
      const targetLightY = pointer.y * viewport.height * 0.45;
      cursorLightRef.current.position.x = THREE.MathUtils.lerp(
        cursorLightRef.current.position.x,
        targetLightX,
        delta * 6.0
      );
      cursorLightRef.current.position.y = THREE.MathUtils.lerp(
        cursorLightRef.current.position.y,
        targetLightY,
        delta * 6.0
      );
    }
  });

  return (
    <>
      {/* Dynamic Lighting Setup */}
      <ambientLight intensity={0.5} />
      {/* Indigo Software Light */}
      <directionalLight position={[-4, 3, 2]} intensity={2.0} color="#5C7CFA" />
      {/* Amber Data Light */}
      <directionalLight position={[4, -2, 2]} intensity={2.2} color="#F2B441" />
      {/* Dynamic Cursor Spotlight following pointer */}
      <pointLight
        ref={cursorLightRef}
        position={[positionX, 0, 3.5]}
        intensity={3.8}
        distance={9}
        color="#ffffff"
      />

      {/* Floating Main Group */}
      <group position={[positionX, 0, 0]} scale={scale}>
        <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
          <group ref={sceneGroupRef}>
            {/* ------------------------------------------------------------- */}
            {/* PYTHON DUAL-STRAND INTERLOCKING SYSTEM */}
            {/* ------------------------------------------------------------- */}
            <group ref={pythonGroupRef}>
              {/* Strand 1: Indigo Python Body (Software / Code Structure) */}
              <mesh geometry={strand1Geo}>
                <meshStandardMaterial
                  color="#5C7CFA"
                  emissive="#3B5BDB"
                  emissiveIntensity={0.45}
                  roughness={0.18}
                  metalness={0.85}
                />
              </mesh>

              {/* Head Beacon / Eye Node 1 */}
              <mesh position={head1Pos}>
                <sphereGeometry args={[0.16, 24, 24]} />
                <meshStandardMaterial
                  color="#EDEFF4"
                  emissive="#5C7CFA"
                  emissiveIntensity={1.2}
                  roughness={0.1}
                />
              </mesh>

              {/* Strand 2: Amber-Gold Python Body (Data / Signal Analytics) */}
              <mesh geometry={strand2Geo}>
                <meshStandardMaterial
                  color="#F2B441"
                  emissive="#A36B00"
                  emissiveIntensity={0.45}
                  roughness={0.18}
                  metalness={0.88}
                />
              </mesh>

              {/* Head Beacon / Eye Node 2 */}
              <mesh position={head2Pos}>
                <sphereGeometry args={[0.16, 24, 24]} />
                <meshStandardMaterial
                  color="#EDEFF4"
                  emissive="#F2B441"
                  emissiveIntensity={1.2}
                  roughness={0.1}
                />
              </mesh>

              {/* Connective AI/ML Neural Orbit Ring uniting both */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.016, 16, 80]} />
                <meshStandardMaterial
                  color="#A78BFA"
                  emissive="#7950F2"
                  emissiveIntensity={0.6}
                  roughness={0.2}
                  metalness={0.9}
                />
              </mesh>
            </group>

            {/* ------------------------------------------------------------- */}
            {/* 3D DATA TOPOLOGICAL MANIFOLD / TENSOR SURFACE */}
            {/* ------------------------------------------------------------- */}
            <group position={[0, -0.65, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
              <mesh ref={dataGridRef} geometry={dataGridGeo}>
                <meshStandardMaterial
                  color="#5C7CFA"
                  wireframe
                  transparent
                  opacity={0.35}
                  emissive="#3B5BDB"
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          </group>
        </Float>

        {/* Orbiting Data Feature Vectors / Cluster Centroids */}
        <Sparkles
          count={isMobile ? 30 : 65}
          scale={3.8}
          size={isMobile ? 2.5 : 3.5}
          speed={0.7}
          color="#F2B441"
          opacity={0.8}
        />
        <Sparkles
          count={isMobile ? 30 : 65}
          scale={4.2}
          size={isMobile ? 2.0 : 3.0}
          speed={0.6}
          color="#5C7CFA"
          opacity={0.8}
        />
      </group>
    </>
  );
}
