"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const scatterVertexShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;

  attribute vec3 aPosFrom;
  attribute vec3 aPosTo;
  attribute vec3 aColorFrom;
  attribute vec3 aColorTo;
  attribute float aSize;
  attribute float aRandom;

  varying vec3 vColor;

  void main() {
    float t = smoothstep(0.0, 1.0, uProgress);

    vec3 pFrom = aPosFrom;
    vec3 pTo = aPosTo;

    // Organic micro-breathing drift
    pFrom.y += sin(uTime * 1.5 + aRandom * 6.28) * 0.02;
    pTo.y += sin(uTime * 1.5 + aRandom * 6.28) * 0.02;

    vec3 pos = mix(pFrom, pTo, t);
    vColor = mix(aColorFrom, aColorTo, t);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aSize * uPixelRatio * (32.0 / -mvPosition.z);
  }
`;

const scatterFragmentShader = `
  precision mediump float;
  uniform float uOpacity;
  varying vec3 vColor;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.15, dist) * uOpacity;
    float core = smoothstep(0.2, 0.0, dist);
    vec3 finalColor = mix(vColor, vec3(1.0), core * 0.7);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export type VisualizationMode = "scatter" | "neural" | "wave";

interface Mobile3DSceneProps {
  mode?: VisualizationMode;
  reducedMotion?: boolean;
}

interface ScatterUniforms {
  uProgress: { value: number };
  uTime: { value: number };
  uPixelRatio: { value: number };
  uOpacity: { value: number };
  [key: string]: { value: unknown };
}

export function Mobile3DScene({
  mode = "scatter",
  reducedMotion = false,
}: Mobile3DSceneProps) {
  const mainGroupRef = useRef<THREE.Group>(null);
  const pointsMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const axesGroupRef = useRef<THREE.Group>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const count = 1600;

  const datasets = useMemo(() => {
    const colorAmber = new THREE.Color("#F2B441");
    const colorIndigo = new THREE.Color("#5C7CFA");
    const colorViolet = new THREE.Color("#A78BFA");
    const colorCyan = new THREE.Color("#38BDF8");

    // 1. SCATTER PLOT (EDA)
    const scatterPos = new Float32Array(count * 3);
    const scatterCol = new Float32Array(count * 3);

    const clusterCenters = [
      { x: -0.62, y: -0.35, z: -0.35, color: colorAmber, spread: 0.38 },
      { x: 0.62, y: 0.45, z: 0.35, color: colorIndigo, spread: 0.38 },
      { x: 0.02, y: 0.12, z: -0.45, color: colorViolet, spread: 0.32 },
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      if (i < count * 0.8) {
        const c = clusterCenters[i % 3]!;
        const u1 = Math.random() || 0.001;
        const u2 = Math.random();
        const z0 =
          Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const z1 =
          Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
        const z2 = (Math.random() - 0.5) * 1.5;

        scatterPos[i3] = c.x + z0 * c.spread;
        scatterPos[i3 + 1] = c.y + z1 * c.spread;
        scatterPos[i3 + 2] = c.z + z2 * c.spread;

        scatterCol[i3] = c.color.r;
        scatterCol[i3 + 1] = c.color.g;
        scatterCol[i3 + 2] = c.color.b;
      } else {
        const tVal = (Math.random() - 0.5) * 2.2;
        const res = (Math.random() - 0.5) * 0.2;
        scatterPos[i3] = tVal * 0.88;
        scatterPos[i3 + 1] = tVal * 0.65 + res;
        scatterPos[i3 + 2] = tVal * 0.45 + (Math.random() - 0.5) * 0.22;

        const gCol = tVal > 0 ? colorIndigo : colorAmber;
        scatterCol[i3] = gCol.r;
        scatterCol[i3 + 1] = gCol.g;
        scatterCol[i3 + 2] = gCol.b;
      }
    }

    // 2. NEURAL SPHERE
    const neuralPos = new Float32Array(count * 3);
    const neuralCol = new Float32Array(count * 3);

    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const isCore = i < count * 0.35;
      const radius = isCore
        ? 0.45 + Math.random() * 0.35
        : 1.15 + (Math.random() - 0.5) * 0.25;

      const y = 1 - (i / (count - 1)) * 2;
      const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = 2 * Math.PI * i * phi;

      neuralPos[i3] = Math.cos(theta) * rAtY * radius;
      neuralPos[i3 + 1] = y * radius;
      neuralPos[i3 + 2] = Math.sin(theta) * rAtY * radius;

      if (isCore) {
        neuralCol[i3] = colorAmber.r;
        neuralCol[i3 + 1] = colorAmber.g;
        neuralCol[i3 + 2] = colorAmber.b;
      } else {
        const mixRatio = Math.sin(i * 0.05) * 0.5 + 0.5;
        const col = mixRatio > 0.5 ? colorViolet : colorIndigo;
        neuralCol[i3] = col.r;
        neuralCol[i3 + 1] = col.g;
        neuralCol[i3 + 2] = col.b;
      }
    }

    // 3. DATA WAVE
    const wavePos = new Float32Array(count * 3);
    const waveCol = new Float32Array(count * 3);

    const gridSide = Math.round(Math.sqrt(count));
    let idx = 0;
    for (let ix = 0; ix < gridSide && idx < count; ix++) {
      for (let iz = 0; iz < gridSide && idx < count; iz++) {
        const i3 = idx * 3;
        const x = (ix / (gridSide - 1) - 0.5) * 2.6;
        const z = (iz / (gridSide - 1) - 0.5) * 2.2;
        const dist = Math.sqrt(x * x + z * z);
        const y =
          Math.sin(x * 3.0) * Math.cos(z * 2.6) * 0.5 +
          Math.sin(dist * 2.5) * 0.2;

        wavePos[i3] = x;
        wavePos[i3 + 1] = y;
        wavePos[i3 + 2] = z;

        const elev = Math.max(0, Math.min(1, (y + 0.7) / 1.4));
        const c1 = colorIndigo.clone().lerp(colorCyan, elev);
        const cFinal =
          elev > 0.6 ? c1.lerp(colorAmber, (elev - 0.6) / 0.4) : c1;

        waveCol[i3] = cFinal.r;
        waveCol[i3 + 1] = cFinal.g;
        waveCol[i3 + 2] = cFinal.b;
        idx++;
      }
    }

    const sz = new Float32Array(count);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      sz[i] = 1.1 + Math.random() * 1.5;
      rnd[i] = Math.random();
    }

    return {
      scatterPos,
      scatterCol,
      neuralPos,
      neuralCol,
      wavePos,
      waveCol,
      sizes: sz,
      randoms: rnd,
    };
  }, [count]);

  const posFrom = useRef(new Float32Array(count * 3));
  const posTo = useRef(new Float32Array(count * 3));
  const colFrom = useRef(new Float32Array(count * 3));
  const colTo = useRef(new Float32Array(count * 3));

  useEffect(() => {
    posFrom.current.set(datasets.scatterPos);
    posTo.current.set(datasets.scatterPos);
    colFrom.current.set(datasets.scatterCol);
    colTo.current.set(datasets.scatterCol);
  }, [datasets]);

  const prevMode = useRef<VisualizationMode>(mode);
  const morphProgress = useRef(1.0);

  useEffect(() => {
    if (mode === prevMode.current) return;

    const fromP =
      prevMode.current === "scatter"
        ? datasets.scatterPos
        : prevMode.current === "neural"
          ? datasets.neuralPos
          : datasets.wavePos;

    const fromC =
      prevMode.current === "scatter"
        ? datasets.scatterCol
        : prevMode.current === "neural"
          ? datasets.neuralCol
          : datasets.waveCol;

    const toP =
      mode === "scatter"
        ? datasets.scatterPos
        : mode === "neural"
          ? datasets.neuralPos
          : datasets.wavePos;

    const toC =
      mode === "scatter"
        ? datasets.scatterCol
        : mode === "neural"
          ? datasets.neuralCol
          : datasets.waveCol;

    posFrom.current.set(fromP);
    posTo.current.set(toP);
    colFrom.current.set(fromC);
    colTo.current.set(toC);

    if (geoRef.current) {
      geoRef.current.attributes.aPosFrom!.needsUpdate = true;
      geoRef.current.attributes.aPosTo!.needsUpdate = true;
      geoRef.current.attributes.aColorFrom!.needsUpdate = true;
      geoRef.current.attributes.aColorTo!.needsUpdate = true;
    }

    morphProgress.current = 0.0;
    prevMode.current = mode;
  }, [mode, datasets]);

  const { axisLineGeo, gridLineGeo, tickGeo } = useMemo(() => {
    const min = -1.3;
    const max = 1.3;
    const axisPoints: THREE.Vector3[] = [];
    const tickPoints: THREE.Vector3[] = [];

    axisPoints.push(
      new THREE.Vector3(min, min, min),
      new THREE.Vector3(max + 0.25, min, min)
    );
    axisPoints.push(
      new THREE.Vector3(min, min, min),
      new THREE.Vector3(min, max + 0.25, min)
    );
    axisPoints.push(
      new THREE.Vector3(min, min, min),
      new THREE.Vector3(min, min, max + 0.25)
    );

    const steps = 4;
    const stepSize = (max - min) / steps;
    for (let i = 1; i <= steps; i++) {
      const val = min + i * stepSize;
      tickPoints.push(
        new THREE.Vector3(val, min, min),
        new THREE.Vector3(val, min + 0.08, min)
      );
      tickPoints.push(
        new THREE.Vector3(min, val, min),
        new THREE.Vector3(min + 0.08, val, min)
      );
      tickPoints.push(
        new THREE.Vector3(min, min, val),
        new THREE.Vector3(min + 0.08, min, val)
      );
    }

    const gridPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= steps; i++) {
      const v = min + i * stepSize;
      gridPoints.push(
        new THREE.Vector3(min, min, v),
        new THREE.Vector3(max, min, v)
      );
      gridPoints.push(
        new THREE.Vector3(v, min, min),
        new THREE.Vector3(v, min, max)
      );
      gridPoints.push(
        new THREE.Vector3(min, v, min),
        new THREE.Vector3(max, v, min)
      );
      gridPoints.push(
        new THREE.Vector3(v, min, min),
        new THREE.Vector3(v, max, min)
      );
    }

    return {
      axisLineGeo: new THREE.BufferGeometry().setFromPoints(axisPoints),
      gridLineGeo: new THREE.BufferGeometry().setFromPoints(gridPoints),
      tickGeo: new THREE.BufferGeometry().setFromPoints(tickPoints),
    };
  }, []);

  const uniforms = useMemo<ScatterUniforms>(
    () => ({
      uProgress: { value: 1.0 },
      uTime: { value: 0.0 },
      uPixelRatio: { value: 1.0 },
      uOpacity: { value: 1.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!pointsMaterialRef.current || !mainGroupRef.current) return;
    const u = pointsMaterialRef.current.uniforms as ScatterUniforms;

    u.uTime.value += delta;

    if (morphProgress.current < 1.0) {
      morphProgress.current = Math.min(
        1.0,
        morphProgress.current + delta * 2.2
      );
      u.uProgress.value = morphProgress.current;
    }

    const targetAxesOpacity = mode === "scatter" ? 0.55 : 0.0;
    if (axesGroupRef.current) {
      axesGroupRef.current.traverse((child) => {
        if (child instanceof THREE.LineSegments) {
          const mat = child.material as THREE.LineBasicMaterial;
          mat.opacity = THREE.MathUtils.lerp(
            mat.opacity,
            targetAxesOpacity,
            delta * 4.0
          );
          mat.visible = mat.opacity > 0.01;
        }
      });
    }

    if (!reducedMotion) {
      mainGroupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />

      <group ref={mainGroupRef} scale={1.05}>
        <points>
          <bufferGeometry ref={geoRef}>
            <bufferAttribute
              attach="attributes-aPosFrom"
              count={count}
              array={posFrom.current}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aPosTo"
              count={count}
              array={posTo.current}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aColorFrom"
              count={count}
              array={colFrom.current}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aColorTo"
              count={count}
              array={colTo.current}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aSize"
              count={datasets.sizes.length}
              array={datasets.sizes}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aRandom"
              count={datasets.randoms.length}
              array={datasets.randoms}
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

        <group ref={axesGroupRef}>
          <lineSegments geometry={axisLineGeo}>
            <lineBasicMaterial
              color="#5C7CFA"
              transparent
              opacity={0.55}
              linewidth={1.5}
            />
          </lineSegments>
          <lineSegments geometry={tickGeo}>
            <lineBasicMaterial
              color="#EDEFF4"
              transparent
              opacity={0.45}
              linewidth={1.2}
            />
          </lineSegments>
          <lineSegments geometry={gridLineGeo}>
            <lineBasicMaterial
              color="#232838"
              transparent
              opacity={0.3}
              linewidth={1.0}
            />
          </lineSegments>

          <mesh position={[-1.3, -1.3, -1.3]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#EDEFF4" />
          </mesh>
          <mesh position={[1.55, -1.3, -1.3]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#5C7CFA" />
          </mesh>
          <mesh position={[-1.3, 1.55, -1.3]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#F2B441" />
          </mesh>
          <mesh position={[-1.3, -1.3, 1.55]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#A78BFA" />
          </mesh>
        </group>
      </group>
    </>
  );
}
