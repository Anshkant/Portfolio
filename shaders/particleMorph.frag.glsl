// Fragment Shader for Particle Morphing
precision mediump float;

uniform float uProgress;
uniform float uOpacity;

varying vec3 vPosition;
varying float vProgress;
varying float vRandom;

void main() {
  // Distance from center of point sprite to create circular soft particles
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);

  if (dist > 0.5) {
    discard;
  }

  // Soft edge anti-aliasing / glow profile
  float alpha = smoothstep(0.5, 0.08, dist) * uOpacity;

  // Exact design token colors:
  // --signal (Data): #F2B441 -> vec3(0.949, 0.706, 0.255)
  // --structure (Code): #5C7CFA -> vec3(0.361, 0.486, 0.980)
  // Connective bridge: #A78BFA -> vec3(0.655, 0.545, 0.980)
  vec3 signalColor = vec3(0.949, 0.706, 0.255);
  vec3 structureColor = vec3(0.361, 0.486, 0.980);
  vec3 bridgeColor = vec3(0.655, 0.545, 0.980);

  // Dynamic interpolation based on progress and individual particle character
  float t = smoothstep(0.0, 1.0, vProgress);
  
  vec3 baseColor;
  if (t < 0.5) {
    baseColor = mix(signalColor, bridgeColor, t * 2.0);
  } else {
    baseColor = mix(bridgeColor, structureColor, (t - 0.5) * 2.0);
  }

  // Core brightness highlight in center of particle
  float core = smoothstep(0.2, 0.0, dist);
  vec3 finalColor = mix(baseColor, vec3(1.0, 1.0, 1.0), core * 0.45);

  gl_FragColor = vec4(finalColor, alpha);
}
