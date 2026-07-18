"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Ashima Arts 3D simplex noise (public domain / MIT), used to build a
// divergence-free curl field so the particles advect like a fluid.
const SIMPLEX_NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec3 snoiseVec3(vec3 x){
  return vec3(
    snoise(x),
    snoise(vec3(x.y-19.1,x.z+33.4,x.x+47.2)),
    snoise(vec3(x.z+74.2,x.x-124.5,x.y+99.4))
  );
}
vec3 curlNoise(vec3 p){
  const float e=0.1;
  vec3 dx=vec3(e,0.0,0.0);
  vec3 dy=vec3(0.0,e,0.0);
  vec3 dz=vec3(0.0,0.0,e);
  vec3 p_x0=snoiseVec3(p-dx); vec3 p_x1=snoiseVec3(p+dx);
  vec3 p_y0=snoiseVec3(p-dy); vec3 p_y1=snoiseVec3(p+dy);
  vec3 p_z0=snoiseVec3(p-dz); vec3 p_z1=snoiseVec3(p+dz);
  float x=(p_y1.z-p_y0.z)-(p_z1.y-p_z0.y);
  float y=(p_z1.x-p_z0.x)-(p_x1.z-p_x0.z);
  float z=(p_x1.y-p_x0.y)-(p_y1.x-p_y0.x);
  return normalize(vec3(x,y,z)/(2.0*e));
}
`;

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uAmp;
attribute float aSeed;
varying float vAlpha;

${SIMPLEX_NOISE}

void main(){
  vec3 pos = position;
  float t = uTime * 0.12;

  // Advect each particle along the curl field — this is what reads as "fluid".
  vec3 flow = curlNoise(pos * 0.55 + vec3(0.0, 0.0, t));
  float amp = uAmp * (0.55 + 0.45 * sin(uTime * 0.35 + aSeed * 6.2831));
  pos += flow * amp;

  // Slow breathing of the whole shape.
  pos *= 1.0 + 0.04 * sin(uTime * 0.4 + aSeed * 6.2831);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * (1.0 / -mvPosition.z);
  vAlpha = 0.25 + 0.75 * aSeed;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;

void main(){
  // Soft round point.
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
  gl_FragColor = vec4(uColor, alpha * 0.55);
}
`;

export function FluidParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const width = () => container.clientWidth;
    const height = () => container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, width() / height(), 0.1, 100);
    camera.position.z = 4.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width(), height());
    container.appendChild(renderer.domElement);

    // Even point distribution on a sphere (Fibonacci sphere).
    const COUNT = 9000;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const golden = Math.PI * (1 + Math.sqrt(5));
    const radius = 1.5;
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      const phi = Math.acos(1 - 2 * t);
      const theta = golden * i;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      seeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: 13 * dpr },
      uAmp: { value: 0.42 },
      uColor: { value: new THREE.Color(0xffffff) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const onResize = () => {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height());
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    // Manual clock (THREE.Clock is deprecated). Accumulating deltas lets us
    // pause cleanly while the tab is hidden without a time jump on resume.
    let elapsed = reduceMotion ? 8 : 0; // static frame shows an already-flowed state
    let last = performance.now();

    const renderFrame = () => {
      const now = performance.now();
      elapsed += (now - last) / 1000;
      last = now;
      uniforms.uTime.value = elapsed;
      points.rotation.y = elapsed * 0.04;
      points.rotation.x = Math.sin(elapsed * 0.05) * 0.15;
      renderer.render(scene, camera);
    };

    const loop = () => {
      renderFrame();
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      // Draw a single static frame; no animation.
      uniforms.uTime.value = elapsed;
      points.rotation.y = elapsed * 0.04;
      renderer.render(scene, camera);
    } else {
      loop();
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduceMotion && raf === 0) {
        last = performance.now(); // don't count the hidden time
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fluid-bg" aria-hidden="true" />;
}
