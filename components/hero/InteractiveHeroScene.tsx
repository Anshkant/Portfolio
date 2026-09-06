"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface InteractiveSceneProps {
  reducedMotion?: boolean;
}

export function InteractiveHeroScene({
  reducedMotion = false,
}: InteractiveSceneProps) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRing1Ref = useRef<THREE.Group>(null);
  const outerRing2Ref = useRef<THREE.Group>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);

  // Responsive sizing and position: right-shifted on desktop to leave left side crystal clear for text
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const positionX = isMobile ? 0 : 1.35;
  const scale = isMobile ? 1.05 : 1.35;

  // Precompute wireframe geometry and node points for Structure Exoskeleton
  const { nodePositions } = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1.45, 1);
    const pos = geom.attributes.position;
    if (!pos) return { nodePositions: new Float32Array() };
    const arr = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count * 3; i++) {
      arr[i] = pos.array[i] ?? 0;
    }
    return { nodePositions: arr };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.y = 0.5;
      return;
    }

    const { pointer } = state;

    // Smooth magnetic mouse tilt with damping
    const targetRotationX = -pointer.y * 0.45;
    const targetRotationY = pointer.x * 0.65;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      delta * 3.5
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      delta * 3.5
    );

    // Continuous gyro rotation for the two outer Structure rings
    if (outerRing1Ref.current) {
      outerRing1Ref.current.rotation.x += delta * 0.35;
      outerRing1Ref.current.rotation.y += delta * 0.45;
    }
    if (outerRing2Ref.current) {
      outerRing2Ref.current.rotation.y -= delta * 0.3;
      outerRing2Ref.current.rotation.z += delta * 0.4;
    }

    // Dynamic cursor spotlight: follows mouse coordinates to cast real-time specular highlights
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
      {/* Lighting Rig */}
      <ambientLight intensity={0.45} />
      {/* Cool Indigo directional light representing Software Structure */}
      <directionalLight position={[-4, 3, 2]} intensity={1.8} color="#5C7CFA" />
      {/* Warm Amber directional light representing Analytical Signal */}
      <directionalLight position={[4, -2, 2]} intensity={2.0} color="#F2B441" />
      {/* Dynamic Cursor Reactive Spotlight */}
      <pointLight
        ref={cursorLightRef}
        position={[positionX, 0, 3.5]}
        intensity={3.5}
        distance={8}
        color="#ffffff"
      />

      {/* Floating Interactive 3D Duality Core */}
      <group position={[positionX, 0, 0]} scale={scale}>
        <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.6}>
          <group ref={groupRef}>
            {/* ------------------------------------------------------------- */}
            {/* 1. THE SIGNAL CORE (Data Analytics: Fluid, undulating amber gold) */}
            {/* ------------------------------------------------------------- */}
            <mesh ref={coreRef}>
              <sphereGeometry args={[0.92, 64, 64]} />
              <MeshDistortMaterial
                color="#F2B441"
                emissive="#A36B00"
                emissiveIntensity={0.25}
                roughness={0.18}
                metalness={0.88}
                distort={0.42}
                speed={2.4}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>

            {/* ------------------------------------------------------------- */}
            {/* 2. THE STRUCTURE EXOSKELETON (Software Engineering: Indigo Rings & Polyhedron) */}
            {/* ------------------------------------------------------------- */}
            {/* Gyro Ring 1: Primary Structure Ring */}
            <group ref={outerRing1Ref}>
              <mesh>
                <torusGeometry args={[1.38, 0.022, 16, 100]} />
                <meshStandardMaterial
                  color="#5C7CFA"
                  emissive="#3B5BDB"
                  emissiveIntensity={0.6}
                  roughness={0.2}
                  metalness={0.9}
                />
              </mesh>
            </group>

            {/* Gyro Ring 2: Secondary Interlocking Ring */}
            <group ref={outerRing2Ref}>
              <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[1.56, 0.018, 16, 100]} />
                <meshStandardMaterial
                  color="#A78BFA"
                  emissive="#7950F2"
                  emissiveIntensity={0.5}
                  roughness={0.2}
                  metalness={0.9}
                />
              </mesh>
            </group>

            {/* Crystalline Node Network (Icosahedron Wireframe with Glowing Data Nodes) */}
            <mesh>
              <icosahedronGeometry args={[1.45, 1]} />
              <meshStandardMaterial
                color="#5C7CFA"
                wireframe
                wireframeLinewidth={1.5}
                transparent
                opacity={0.38}
                emissive="#3B5BDB"
                emissiveIntensity={0.4}
              />
            </mesh>

            {/* Intersection Node Vertices (Glowing Dots) */}
            <points>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={nodePositions.length / 3}
                  array={nodePositions}
                  itemSize={3}
                />
              </bufferGeometry>
              <pointsMaterial
                size={0.06}
                color="#EDEFF4"
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
              />
            </points>
          </group>
        </Float>

        {/* Dynamic Surrounding Data Particles */}
        <Sparkles
          count={isMobile ? 35 : 75}
          scale={3.6}
          size={isMobile ? 2.5 : 3.5}
          speed={0.6}
          color="#F2B441"
          opacity={0.7}
        />
        <Sparkles
          count={isMobile ? 35 : 75}
          scale={4.2}
          size={isMobile ? 2.0 : 3.0}
          speed={0.5}
          color="#5C7CFA"
          opacity={0.7}
        />
      </group>
    </>
  );
}
