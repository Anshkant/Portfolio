// Vertex Shader for Particle Morphing
uniform float uProgress;       // 0.0 = Signal/Data (scatter/waves/bars), 1.0 = Structure/Code (crystalline graph)
uniform float uTime;           // continuous time for breathing & subtle wave
uniform float uPixelRatio;

attribute vec3 aTargetPosition; // Target Position for State B (Structure)
attribute float aRandom;        // Random offset for organic variation
attribute float aSize;          // Particle size variation

varying vec3 vPosition;
varying float vProgress;
varying float vRandom;

void main() {
  vRandom = aRandom;
  vProgress = uProgress;

  // Smooth Hermite interpolation for crisp, organic transition
  float t = smoothstep(0.0, 1.0, uProgress);

  // Add subtle organic wave oscillation based on time and particle phase
  vec3 posA = position;
  posA.y += sin(uTime * 1.2 + aRandom * 6.28) * 0.08;
  posA.x += cos(uTime * 0.9 + aRandom * 3.14) * 0.05;

  vec3 posB = aTargetPosition;
  posB.y += sin(uTime * 0.8 + aRandom * 4.0) * 0.03;

  // Morph between State A (Data Scatter/Cloud) and State B (Structured Graph)
  vec3 mixedPos = mix(posA, posB, t);

  vPosition = mixedPos;

  vec4 modelViewPosition = modelViewMatrix * vec4(mixedPos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;

  // Attenuate point size by distance to camera and device pixel ratio
  float baseSize = mix(aSize, aSize * 1.15, t);
  gl_PointSize = baseSize * uPixelRatio * (35.0 / -modelViewPosition.z);
}
