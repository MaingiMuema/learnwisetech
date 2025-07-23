'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

// Ultra-modern immersive background with advanced interactive systems
export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const timeRef = useRef(0);
  const scrollRef = useRef(0);
  const deviceOrientationRef = useRef(new THREE.Vector3());

  // Advanced performance monitoring and adaptive quality
  const performanceRef = useRef({
    lastTime: 0,
    frameCount: 0,
    fps: 60,
    adaptiveQuality: 1.0,
    targetFPS: 60
  });

  // Interactive state management
  const interactionRef = useRef({
    mouseVelocity: new THREE.Vector2(),
    lastMousePos: new THREE.Vector2(),
    mouseInfluence: 0,
    scrollVelocity: 0,
    lastScrollPos: 0,
    touchPoints: [] as THREE.Vector2[]
  });

  useEffect(() => {
    if (!mountRef.current) return;

    // Store mount element reference for cleanup
    const mountElement = mountRef.current;

    // School-themed ambient environment with classroom atmosphere
    const scene = new THREE.Scene();

    // Soft blue-tinted fog like a bright classroom
    scene.fog = new THREE.FogExp2(0x9fb8d6, 0.0015);

    // Add subtle ambient light texture (like classroom lighting)
    const textureLoader = new THREE.TextureLoader();
    const lightMapTexture = textureLoader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==');
    scene.background = new THREE.Color(0xf0f5ff); // Soft blue background

    sceneRef.current = scene;

    // Advanced camera with dynamic positioning
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    // High-performance renderer with advanced settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Classroom-inspired lighting system
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Bright ambient like classroom
    scene.add(ambientLight);

    // Main overhead light (like classroom fluorescent)
    const overheadLight = new THREE.DirectionalLight(0xffffff, 0.8);
    overheadLight.position.set(0, 30, 10);
    overheadLight.castShadow = true;
    overheadLight.shadow.mapSize.width = 2048;
    overheadLight.shadow.mapSize.height = 2048;
    overheadLight.shadow.camera.near = 0.1;
    overheadLight.shadow.camera.far = 100;
    overheadLight.shadow.camera.left = -40;
    overheadLight.shadow.camera.right = 40;
    overheadLight.shadow.camera.top = 40;
    overheadLight.shadow.camera.bottom = -40;
    scene.add(overheadLight);

    // Window light (natural daylight from side)
    const windowLight = new THREE.DirectionalLight(0xb3d9ff, 0.4);
    windowLight.position.set(-20, 10, 20);
    scene.add(windowLight);

    // Desk lamp accent lights (warm study lighting)
    const deskLamp1 = new THREE.PointLight(0xffd700, 0.3, 15); // Warm yellow
    deskLamp1.position.set(15, 5, 8);
    scene.add(deskLamp1);

    const deskLamp2 = new THREE.PointLight(0xffd700, 0.3, 15);
    deskLamp2.position.set(-15, 5, 8);
    scene.add(deskLamp2);

    // Subtle fill light to prevent harsh shadows
    const fillLight = new THREE.DirectionalLight(0xe6f3ff, 0.2);
    fillLight.position.set(10, -5, -15);
    scene.add(fillLight);

    // Advanced morphing geometric shapes with reactive materials
    const geometricShapes: THREE.Mesh[] = [];
    const morphingShapes: THREE.Mesh[] = [];
    const energyFields: THREE.Mesh[] = [];

    // Ultra-advanced shader materials with multiple effects
    const createMorphingMaterial = (baseColor: string, accentColor: string, type: 'primary' | 'secondary' | 'energy') => {
      const uniforms = {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(baseColor) },
        accentColor: { value: new THREE.Color(accentColor) },
        mouse: { value: new THREE.Vector2() },
        scroll: { value: 0 },
        opacity: { value: type === 'energy' ? 0.6 : 0.85 },
        morphFactor: { value: 0 },
        energyLevel: { value: 1.0 },
        noiseScale: { value: type === 'energy' ? 2.0 : 1.0 },
        glowIntensity: { value: type === 'primary' ? 1.5 : 1.0 }
      };

      return new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          uniform float time;
          uniform vec2 mouse;
          uniform float scroll;
          uniform float morphFactor;
          uniform float energyLevel;
          uniform float noiseScale;
          varying vec2 vUv;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying float vDistortion;
          varying float vEnergyField;

          // Simplex noise function
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }

          void main() {
            vUv = uv;
            vNormal = normal;

            vec3 pos = position;

            // Multi-layered noise distortion
            float noise1 = snoise(pos * noiseScale + time * 0.5) * 0.3;
            float noise2 = snoise(pos * noiseScale * 2.0 + time * 0.3) * 0.15;
            float noise3 = snoise(pos * noiseScale * 4.0 + time * 0.7) * 0.075;

            float totalNoise = noise1 + noise2 + noise3;
            vDistortion = totalNoise;

            // Mouse interaction field
            vec2 mouseWorld = mouse * 20.0;
            float mouseDistance = distance(pos.xy, mouseWorld);
            float mouseInfluence = smoothstep(10.0, 0.0, mouseDistance) * energyLevel;
            vEnergyField = mouseInfluence;

            // Scroll-based morphing
            float scrollMorph = sin(scroll * 0.01 + pos.y * 0.1) * 0.1;

            // Apply all distortions
            pos += normal * (totalNoise * morphFactor + mouseInfluence * 0.5 + scrollMorph);

            vPosition = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 baseColor;
          uniform vec3 accentColor;
          uniform float opacity;
          uniform float glowIntensity;
          varying vec2 vUv;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying float vDistortion;
          varying float vEnergyField;

          void main() {
            vec2 uv = vUv;
            vec3 normal = normalize(vNormal);

            // Dynamic color mixing based on distortion
            float colorMix = (vDistortion + 1.0) * 0.5;
            colorMix = smoothstep(0.0, 1.0, colorMix);

            vec3 color = mix(baseColor, accentColor, colorMix);

            // Energy field glow effect
            float energyGlow = vEnergyField * glowIntensity;
            color += energyGlow * vec3(0.3, 0.8, 1.0);

            // Fresnel rim lighting
            vec3 viewDirection = normalize(-vPosition);
            float fresnel = 1.0 - max(0.0, dot(viewDirection, normal));
            fresnel = pow(fresnel, 2.0);
            color += fresnel * accentColor * 0.5;

            // Pulsing core effect
            float pulse = sin(time * 3.0 + vPosition.x * 0.5) * 0.5 + 0.5;
            color += pulse * baseColor * 0.2;

            // Distance-based opacity fade
            float distance = length(vPosition);
            float fade = 1.0 - smoothstep(20.0, 50.0, distance);

            // Final alpha with energy field influence
            float finalAlpha = opacity * fade * (1.0 + energyGlow * 0.3);

            gl_FragColor = vec4(color, finalAlpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      });
    };

    // School stationary-themed 3D objects
    const createSchoolStationaryGeometries = () => {
      const geometries: THREE.BufferGeometry[] = [];

      // 1. Books - various sizes and orientations
      const createBook = (width: number, height: number, depth: number) => {
        return new THREE.BoxGeometry(width, height, depth);
      };

      geometries.push(
        createBook(0.8, 1.2, 0.15), // Textbook
        createBook(0.6, 0.9, 0.12), // Notebook
        createBook(0.5, 0.7, 0.08), // Exercise book
        createBook(1.0, 1.4, 0.18), // Large reference book
        createBook(0.4, 0.6, 0.06)  // Small handbook
      );

      // 2. Pencils - cylindrical with tapered ends
      const createPencil = (length: number, radius: number) => {
        return new THREE.CylinderGeometry(radius, radius * 0.8, length, 8);
      };

      geometries.push(
        createPencil(1.5, 0.05), // Standard pencil
        createPencil(1.3, 0.04), // Short pencil
        createPencil(1.7, 0.06)  // Long pencil
      );

      // 3. Erasers - rounded rectangles
      const createEraser = (width: number, height: number, depth: number) => {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        // Add slight rounding by scaling
        return geometry;
      };

      geometries.push(
        createEraser(0.3, 0.15, 0.6), // Standard eraser
        createEraser(0.2, 0.1, 0.4)   // Small eraser
      );

      // 4. Rulers - thin rectangles
      const createRuler = (length: number, width: number, thickness: number) => {
        return new THREE.BoxGeometry(length, width, thickness);
      };

      geometries.push(
        createRuler(1.8, 0.08, 0.02), // 30cm ruler
        createRuler(1.2, 0.06, 0.015) // 20cm ruler
      );

      // 5. Calculators - rectangular with slight thickness
      const createCalculator = (width: number, height: number, depth: number) => {
        return new THREE.BoxGeometry(width, height, depth);
      };

      geometries.push(
        createCalculator(0.6, 0.8, 0.08), // Scientific calculator
        createCalculator(0.5, 0.7, 0.06)  // Basic calculator
      );

      // 6. Protractors - semi-circular
      const createProtractor = (radius: number, thickness: number) => {
        const geometry = new THREE.CylinderGeometry(radius, radius, thickness, 16, 1, false, 0, Math.PI);
        return geometry;
      };

      geometries.push(
        createProtractor(0.6, 0.02), // Standard protractor
        createProtractor(0.4, 0.015) // Small protractor
      );

      // 7. Compasses - simplified as thin cylinders
      const createCompass = (length: number, radius: number) => {
        return new THREE.CylinderGeometry(radius, radius, length, 6);
      };

      geometries.push(
        createCompass(1.0, 0.02), // Geometry compass
        createCompass(0.8, 0.015) // Small compass
      );

      return geometries;
    };

    const stationaryGeometries = createSchoolStationaryGeometries();

    // Create floating school stationary objects with themed materials
    const stationaryColors = [
      { base: '#FF6B6B', accent: '#FF8E8E' }, // Red (books, erasers)
      { base: '#4ECDC4', accent: '#6EDDD6' }, // Teal (rulers, calculators)
      { base: '#45B7D1', accent: '#67C3DB' }, // Blue (notebooks, pencils)
      { base: '#96CEB4', accent: '#A8D4C2' }, // Green (textbooks)
      { base: '#FFEAA7', accent: '#FFEF9F' }, // Yellow (highlighters, sticky notes)
      { base: '#DDA0DD', accent: '#E6B3E6' }, // Purple (pens, markers)
      { base: '#F39C12', accent: '#F5B041' }, // Orange (folders, binders)
      { base: '#95A5A6', accent: '#AAB7B8' }  // Gray (mechanical items)
    ];

    for (let i = 0; i < 30; i++) {
      const geometry = stationaryGeometries[Math.floor(Math.random() * stationaryGeometries.length)];
      const colorPair = stationaryColors[Math.floor(Math.random() * stationaryColors.length)];
      const materialType = i < 10 ? 'primary' : i < 20 ? 'secondary' : 'energy';
      const material = createMorphingMaterial(colorPair.base, colorPair.accent, materialType);
      const stationaryItem = new THREE.Mesh(geometry, material);

      // Distributed positioning in 3D space - more organized like floating in a classroom
      const radius = 12 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      stationaryItem.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      // More natural rotation for stationary items
      stationaryItem.rotation.set(
        Math.random() * Math.PI * 0.5, // Less extreme rotation
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 0.3
      );

      // Realistic scale variation for school items
      const scale = 0.7 + Math.random() * 0.8;
      stationaryItem.scale.setScalar(scale);

      stationaryItem.castShadow = true;
      stationaryItem.receiveShadow = true;

      // Store properties for school-themed animations
      const stationaryType = getStationaryType(i);
      stationaryItem.userData = {
        originalPosition: stationaryItem.position.clone(),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015, // Gentler rotation for realism
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.01
        ),
        floatAmplitude: Math.random() * 1.5 + 0.8, // Subtle floating
        floatFrequency: Math.random() * 0.3 + 0.4,  // Slower, more natural
        materialType,
        stationaryType,
        schoolTheme: true
      };

      geometricShapes.push(stationaryItem);
      scene.add(stationaryItem);
    }

    // Helper function to determine stationary type based on geometry
    function getStationaryType(index: number): string {
      const types = ['book', 'pencil', 'eraser', 'ruler', 'calculator', 'protractor', 'compass'];
      return types[index % types.length];
    }

    // Ultra-advanced multi-layered particle ecosystem
    const particleSystems: THREE.Points[] = [];
    const fluidParticles: THREE.Points[] = [];
    const energyStreams: THREE.Line[] = [];

    // Layer 1: Quantum Orb Particles with Fluid Dynamics
    const createQuantumOrbs = () => {
      const orbCount = 150;
      const orbGeometry = new THREE.BufferGeometry();
      const orbPositions = new Float32Array(orbCount * 3);
      const orbVelocities = new Float32Array(orbCount * 3);
      const orbSizes = new Float32Array(orbCount);
      const orbColors = new Float32Array(orbCount * 3);
      const orbLifetimes = new Float32Array(orbCount);
      const orbPhases = new Float32Array(orbCount);

      for (let i = 0; i < orbCount; i++) {
        const i3 = i * 3;

        // Spherical distribution
        const radius = Math.random() * 30 + 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        orbPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        orbPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        orbPositions[i3 + 2] = radius * Math.cos(phi);

        // Orbital velocities
        orbVelocities[i3] = (Math.random() - 0.5) * 0.02;
        orbVelocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        orbVelocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

        orbSizes[i] = Math.random() * 0.3 + 0.1;
        orbLifetimes[i] = Math.random() * 100 + 50;
        orbPhases[i] = Math.random() * Math.PI * 2;

        // Dynamic color palette
        const colorVariant = Math.random();
        let color;
        if (colorVariant < 0.4) {
          color = new THREE.Color(0x2CC5B3); // Teal
        } else if (colorVariant < 0.7) {
          color = new THREE.Color(0x4a90e2); // Blue
        } else {
          color = new THREE.Color(0x7f8c8d); // Silver
        }

        orbColors[i3] = color.r;
        orbColors[i3 + 1] = color.g;
        orbColors[i3 + 2] = color.b;
      }

      orbGeometry.setAttribute('position', new THREE.BufferAttribute(orbPositions, 3));
      orbGeometry.setAttribute('size', new THREE.BufferAttribute(orbSizes, 1));
      orbGeometry.setAttribute('color', new THREE.BufferAttribute(orbColors, 3));
      orbGeometry.setAttribute('lifetime', new THREE.BufferAttribute(orbLifetimes, 1));
      orbGeometry.setAttribute('phase', new THREE.BufferAttribute(orbPhases, 1));

      const orbMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          mouse: { value: new THREE.Vector2() },
          pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          attribute float lifetime;
          attribute float phase;
          varying vec3 vColor;
          varying float vLifetime;
          varying float vPhase;
          varying vec3 vPosition;
          uniform float time;
          uniform vec2 mouse;

          void main() {
            vColor = color;
            vLifetime = lifetime;
            vPhase = phase;
            vPosition = position;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

            // Advanced size calculation with lifetime and mouse interaction
            float lifeCycle = sin(time * 0.01 + lifetime) * 0.5 + 0.5;
            float mouseDistance = distance(position.xy, mouse * 20.0);
            float mouseInfluence = 1.0 + smoothstep(15.0, 0.0, mouseDistance) * 2.0;

            float dynamicSize = size * lifeCycle * mouseInfluence;
            dynamicSize *= (1.0 + sin(time * 2.0 + phase) * 0.4);

            gl_PointSize = dynamicSize * (400.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vLifetime;
          varying float vPhase;
          varying vec3 vPosition;
          uniform float time;

          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);

            if (dist > 0.5) discard;

            // Multi-layered circular gradient
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

            // Core intensity
            float core = 1.0 - smoothstep(0.0, 0.2, dist);

            // Quantum fluctuation effect
            float quantum = sin(time * 5.0 + vPhase + vPosition.x) * 0.3 + 0.7;
            alpha *= quantum;

            // Lifetime pulsing
            float lifePulse = sin(time * 0.02 + vLifetime) * 0.4 + 0.6;
            alpha *= lifePulse;

            // Energy rings
            float rings = sin(dist * 20.0 - time * 3.0) * 0.2 + 0.8;

            // Dynamic color shifting
            vec3 color = vColor;
            color += core * vec3(0.5, 0.8, 1.0) * 0.6;
            color *= rings;

            // Outer glow
            float glow = smoothstep(0.5, 0.0, dist) * 0.4;
            color += glow * vec3(0.3, 0.9, 1.0);

            gl_FragColor = vec4(color, alpha * 0.9);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const orbs = new THREE.Points(orbGeometry, orbMaterial);
      orbs.userData = {
        velocities: orbVelocities,
        lifetimes: orbLifetimes,
        phases: orbPhases,
        type: 'quantum-orbs'
      };
      return orbs;
    };

    // Layer 2: Energy Stream Network
    const createEnergyStreams = () => {
      const streamCount = 12;
      const streams: THREE.Line[] = [];

      for (let i = 0; i < streamCount; i++) {
        const points: THREE.Vector3[] = [];
        const segmentCount = 20;

        // Create curved energy stream path
        const startRadius = 15 + Math.random() * 10;
        const endRadius = 25 + Math.random() * 15;
        const startAngle = (i / streamCount) * Math.PI * 2;
        const endAngle = startAngle + (Math.random() - 0.5) * Math.PI;

        for (let j = 0; j <= segmentCount; j++) {
          const t = j / segmentCount;
          const radius = THREE.MathUtils.lerp(startRadius, endRadius, t);
          const angle = THREE.MathUtils.lerp(startAngle, endAngle, t);
          const height = Math.sin(t * Math.PI) * 5;

          points.push(new THREE.Vector3(
            radius * Math.cos(angle),
            height,
            radius * Math.sin(angle)
          ));
        }

        const streamGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const streamMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            streamIndex: { value: i }
          },
          vertexShader: `
            uniform float time;
            uniform float streamIndex;
            varying float vProgress;

            void main() {
              vProgress = position.y / 5.0;
              vec3 pos = position;

              // Wave motion along the stream
              pos.y += sin(time * 2.0 + streamIndex + position.x * 0.1) * 0.5;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            varying float vProgress;

            void main() {
              float intensity = sin(time * 3.0 + vProgress * 10.0) * 0.5 + 0.5;
              vec3 color = mix(vec3(0.2, 0.8, 1.0), vec3(1.0, 0.4, 0.8), intensity);

              gl_FragColor = vec4(color, 0.6 * intensity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending
        });

        const stream = new THREE.Line(streamGeometry, streamMaterial);
        streams.push(stream);
      }

      return streams;
    };

    // Layer 2: Connecting lines/network effect
    const createNetworkLines = () => {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions: number[] = [];
      const lineColors: number[] = [];

      // Create a network of connected points
      const networkPoints: THREE.Vector3[] = [];
      for (let i = 0; i < 30; i++) {
        networkPoints.push(new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 15
        ));
      }

      // Connect nearby points
      for (let i = 0; i < networkPoints.length; i++) {
        for (let j = i + 1; j < networkPoints.length; j++) {
          const distance = networkPoints[i].distanceTo(networkPoints[j]);
          if (distance < 8) {
            linePositions.push(
              networkPoints[i].x, networkPoints[i].y, networkPoints[i].z,
              networkPoints[j].x, networkPoints[j].y, networkPoints[j].z
            );

            // Fade based on distance
            const alpha = 1 - (distance / 8);
            lineColors.push(0.17, 0.77, 0.7, alpha);
            lineColors.push(0.17, 0.77, 0.7, alpha);
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));

      const lineMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          attribute vec4 color;
          varying vec4 vColor;
          uniform float time;

          void main() {
            vColor = color;
            vec3 pos = position;

            // Subtle wave motion
            pos.z += sin(time + position.x * 0.1) * 0.5;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec4 vColor;
          uniform float time;

          void main() {
            float pulse = 0.5 + 0.5 * sin(time * 3.0);
            gl_FragColor = vec4(vColor.rgb, vColor.a * pulse * 0.6);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      lines.userData = { points: networkPoints, type: 'network' };
      return lines;
    };

    // Create advanced particle ecosystem
    const quantumOrbs = createQuantumOrbs();
    const energyStreamArray = createEnergyStreams();
    const networkLines = createNetworkLines();

    // Add quantum orbs to particle systems
    particleSystems.push(quantumOrbs);
    scene.add(quantumOrbs);

    // Add energy streams
    energyStreamArray.forEach(stream => {
      energyStreams.push(stream);
      scene.add(stream);
    });

    // Add network lines
    scene.add(networkLines);

    // Enhanced mouse interaction with smooth interpolation
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    const mouseVelocity = new THREE.Vector2();
    let lastMouseTime = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastMouseTime;

      const newX = (event.clientX / window.innerWidth) * 2 - 1;
      const newY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Calculate mouse velocity for dynamic effects
      if (deltaTime > 0) {
        mouseVelocity.x = (newX - targetMouse.x) / deltaTime * 1000;
        mouseVelocity.y = (newY - targetMouse.y) / deltaTime * 1000;
      }

      targetMouse.set(newX, newY);
      lastMouseTime = currentTime;
    };

    // Touch support for mobile devices
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const fakeEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY
        } as MouseEvent;
        handleMouseMove(fakeEvent);
      }
    };

    // Scroll handling for dynamic effects
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollVelocity = scrollY - scrollRef.current;
      scrollRef.current = scrollY;

      interactionRef.current.scrollVelocity = scrollVelocity;
      interactionRef.current.lastScrollPos = scrollY;
    };

    // Device orientation for mobile
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        deviceOrientationRef.current.set(
          event.gamma * 0.01, // Left-right tilt
          event.beta * 0.01,  // Front-back tilt
          0
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    // Ultra-advanced animation loop with multi-system coordination
    let lastTime = 0;
    const animate = (currentTime: number) => {
      animationIdRef.current = requestAnimationFrame(animate);

      const deltaTime = (currentTime - lastTime) * 0.001;
      lastTime = currentTime;
      timeRef.current = currentTime * 0.001;

      // Smooth interpolations
      mouse.lerp(targetMouse, 0.08);

      // Update interaction states
      interactionRef.current.mouseVelocity.lerp(mouseVelocity, 0.1);
      interactionRef.current.mouseInfluence = Math.min(mouseVelocity.length() * 0.1, 2.0);

      // Update geometric shapes with advanced morphing
      geometricShapes.forEach((shape, index) => {
        const material = shape.material as THREE.ShaderMaterial;
        const userData = shape.userData;

        if (material.uniforms) {
          material.uniforms.time.value = timeRef.current;
          material.uniforms.mouse.value = mouse;
          material.uniforms.scroll.value = scrollRef.current;
          material.uniforms.morphFactor.value = 0.5 + Math.sin(timeRef.current * 0.5) * 0.3;
          material.uniforms.energyLevel.value = 1.0 + interactionRef.current.mouseInfluence;
        }

        // Advanced rotation with individual characteristics
        if (userData.rotationSpeed) {
          shape.rotation.x += deltaTime * userData.rotationSpeed.x;
          shape.rotation.y += deltaTime * userData.rotationSpeed.y;
          shape.rotation.z += deltaTime * userData.rotationSpeed.z;
        }

        // Organic floating motion
        if (userData.floatAmplitude && userData.floatFrequency) {
          const floatTime = timeRef.current * userData.floatFrequency;
          const floatOffset = index * 0.5;

          shape.position.y = userData.originalPosition.y +
            Math.sin(floatTime + floatOffset) * userData.floatAmplitude;
          shape.position.x = userData.originalPosition.x +
            Math.cos(floatTime * 0.7 + floatOffset) * userData.floatAmplitude * 0.5;
        }

        // Mouse interaction - attraction/repulsion
        const mouseWorldPos = new THREE.Vector3(mouse.x * 10, mouse.y * 10, 0);
        const distance = shape.position.distanceTo(mouseWorldPos);
        const mouseInfluence = Math.max(0, 1 - distance / 15);

        if (mouseInfluence > 0) {
          const direction = new THREE.Vector3().subVectors(shape.position, mouseWorldPos).normalize();
          const velocityMagnitude = mouseVelocity.length();

          // Repulsion effect when mouse moves fast
          if (velocityMagnitude > 2) {
            shape.position.add(direction.multiplyScalar(mouseInfluence * 0.1));
          } else {
            // Gentle attraction when mouse is slow/stationary
            shape.position.add(direction.multiplyScalar(-mouseInfluence * 0.02));
          }

          // Scale effect
          const targetScale = 1 + mouseInfluence * 0.3;
          shape.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        } else {
          // Return to normal scale
          shape.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        }

        // School-themed specialized behaviors for different stationary types
        if (userData.schoolTheme) {
          const stationaryType = userData.stationaryType;

          // Books tend to align horizontally and have stacking behavior
          if (stationaryType === 'book') {
            // Books prefer to stay more horizontal
            shape.rotation.x = THREE.MathUtils.lerp(shape.rotation.x, 0, 0.02);

            // Books are attracted to other books (stacking behavior)
            const nearbyBooks = geometricShapes.filter(other =>
              other !== shape &&
              other.userData.stationaryType === 'book' &&
              shape.position.distanceTo(other.position) < 8
            );

            if (nearbyBooks.length > 0) {
              const avgPosition = new THREE.Vector3();
              nearbyBooks.forEach(book => avgPosition.add(book.position));
              avgPosition.divideScalar(nearbyBooks.length);
              const stackingForce = avgPosition.sub(shape.position).multiplyScalar(0.003);
              shape.position.add(stackingForce);
            }
          }

          // Pencils tend to point and roll
          else if (stationaryType === 'pencil') {
            // Pencils have more dynamic rotation around their length axis
            userData.rotationSpeed.z += Math.sin(timeRef.current * 2 + index) * 0.001;

            // Pencils are more responsive to mouse movement (like being picked up)
            if (mouseInfluence > 0.3) {
              const pointDirection = new THREE.Vector3().subVectors(mouseWorldPos, shape.position);
              pointDirection.normalize();
              // Make pencil point towards mouse
              const targetRotation = Math.atan2(pointDirection.y, pointDirection.x);
              shape.rotation.z = THREE.MathUtils.lerp(shape.rotation.z, targetRotation, 0.1);
            }
          }

          // Erasers bounce more and have squishy behavior
          else if (stationaryType === 'eraser') {
            // Erasers have more bouncy movement
            const bounceAmount = Math.sin(timeRef.current * 4 + index) * 0.08;
            shape.position.y += bounceAmount;

            // Slight squash and stretch effect when bouncing
            const squashFactor = 1 + Math.abs(bounceAmount) * 0.5;
            shape.scale.y = THREE.MathUtils.lerp(shape.scale.y, squashFactor, 0.1);
          }

          // Rulers stay more rigid and prefer alignment
          else if (stationaryType === 'ruler') {
            // Rulers resist rotation changes
            userData.rotationSpeed.multiplyScalar(0.8);

            // Rulers prefer to align with coordinate axes
            const snapAngle = Math.PI / 4; // 45-degree increments
            const targetRotation = Math.round(shape.rotation.z / snapAngle) * snapAngle;
            shape.rotation.z = THREE.MathUtils.lerp(shape.rotation.z, targetRotation, 0.02);
          }

          // Calculators have screen-like glow effects
          else if (stationaryType === 'calculator') {
            if (material.uniforms) {
              // Calculators pulse like they have a display
              const displayPulse = 1.0 + Math.sin(timeRef.current * 6) * 0.2;
              material.uniforms.energyLevel.value = displayPulse;

              // Extra glow when mouse is near (like being used)
              if (mouseInfluence > 0) {
                material.uniforms.energyLevel.value += mouseInfluence * 0.5;
              }
            }
          }

          // Protractors and compasses have circular motion tendencies
          else if (stationaryType === 'protractor' || stationaryType === 'compass') {
            // Gentle circular motion around their center
            const circularRadius = 0.3;
            const circularSpeed = 0.5 + index * 0.1;
            const circularMotion = new THREE.Vector3(
              Math.cos(timeRef.current * circularSpeed + index) * circularRadius * deltaTime,
              Math.sin(timeRef.current * circularSpeed + index) * circularRadius * deltaTime,
              0
            );
            shape.position.add(circularMotion);

            // Protractors prefer to stay flat
            if (stationaryType === 'protractor') {
              shape.rotation.x = THREE.MathUtils.lerp(shape.rotation.x, 0, 0.03);
            }
          }
        }
      });

      // Animate advanced particle systems
      particleSystems.forEach(system => {
        const material = system.material as THREE.ShaderMaterial;
        if (material.uniforms) {
          material.uniforms.time.value = timeRef.current;
          material.uniforms.mouse.value = mouse;
        }

        if (system.userData.type === 'quantum-orbs') {
          const positions = system.geometry.attributes.position.array as Float32Array;
          const velocities = system.userData.velocities as Float32Array;
          const lifetimes = system.userData.lifetimes as Float32Array;
          const phases = system.userData.phases as Float32Array;

          for (let i = 0; i < positions.length; i += 3) {
            const particleIndex = i / 3;

            // Advanced orbital motion
            const orbitRadius = 15 + Math.sin(lifetimes[particleIndex] * 0.01) * 5;
            const orbitSpeed = 0.02 + phases[particleIndex] * 0.01;
            const orbitTime = timeRef.current * orbitSpeed + phases[particleIndex];

            // Update orbital positions
            positions[i] += velocities[i] + Math.cos(orbitTime) * 0.01;
            positions[i + 1] += velocities[i + 1] + Math.sin(orbitTime) * 0.01;
            positions[i + 2] += velocities[i + 2] + Math.sin(orbitTime * 0.5) * 0.005;

            // Quantum field fluctuations
            const quantumNoise = Math.sin(timeRef.current * 3 + particleIndex) * 0.003;
            positions[i] += quantumNoise;
            positions[i + 1] += Math.cos(timeRef.current * 2.5 + particleIndex) * 0.003;

            // Mouse attraction/repulsion field
            const mouseWorldX = mouse.x * 20;
            const mouseWorldY = mouse.y * 20;
            const distToMouse = Math.sqrt(
              Math.pow(positions[i] - mouseWorldX, 2) +
              Math.pow(positions[i + 1] - mouseWorldY, 2)
            );

            if (distToMouse < 10) {
              const force = (10 - distToMouse) * 0.001;
              const dirX = (positions[i] - mouseWorldX) / distToMouse;
              const dirY = (positions[i + 1] - mouseWorldY) / distToMouse;

              // Repulsion when mouse moves fast, attraction when slow
              const mouseSpeed = interactionRef.current.mouseInfluence;
              const forceMultiplier = mouseSpeed > 1 ? 1 : -0.5;

              positions[i] += dirX * force * forceMultiplier;
              positions[i + 1] += dirY * force * forceMultiplier;
            }

            // Smooth boundary wrapping with fade zones
            const boundary = 35;
            const fadeZone = 5;

            ['x', 'y', 'z'].forEach((axis, axisIndex) => {
              const pos = positions[i + axisIndex];
              const axisBoundary = axisIndex === 2 ? 15 : boundary;

              if (Math.abs(pos) > axisBoundary - fadeZone) {
                const fadeAmount = (Math.abs(pos) - (axisBoundary - fadeZone)) / fadeZone;
                velocities[i + axisIndex] *= (1 - fadeAmount * 0.1);

                if (Math.abs(pos) > axisBoundary) {
                  positions[i + axisIndex] = -pos * 0.8; // Soft bounce
                }
              }
            });
          }
          system.geometry.attributes.position.needsUpdate = true;
        }
      });

      // Update energy streams
      energyStreams.forEach(stream => {
        const material = stream.material as THREE.ShaderMaterial;
        if (material.uniforms) {
          material.uniforms.time.value = timeRef.current;
        }

        // Dynamic stream rotation
        stream.rotation.y += deltaTime * 0.1;
        stream.rotation.z += deltaTime * 0.05;
      });

      // Update network lines
      const networkSystem = scene.children.find(child => child.userData.type === 'network');
      if (networkSystem) {
        const material = (networkSystem as THREE.LineSegments).material as THREE.ShaderMaterial;
        if (material.uniforms) {
          material.uniforms.time.value = timeRef.current;
        }
      }

      // Enhanced camera movement with momentum
      const cameraTarget = new THREE.Vector3(
        mouse.x * 2,
        mouse.y * 2,
        camera.position.z
      );
      camera.position.lerp(cameraTarget, 0.02);

      // Dynamic camera rotation based on mouse velocity
      const rotationInfluence = mouseVelocity.length() * 0.001;
      camera.rotation.z = Math.sin(timeRef.current * 0.5) * 0.02 + rotationInfluence;

      // Subtle camera shake on high mouse velocity
      if (mouseVelocity.length() > 5) {
        camera.position.x += (Math.random() - 0.5) * 0.05;
        camera.position.y += (Math.random() - 0.5) * 0.05;
      }

      camera.lookAt(scene.position);

      // Performance monitoring
      performanceRef.current.frameCount++;
      if (currentTime - performanceRef.current.lastTime > 1000) {
        performanceRef.current.fps = performanceRef.current.frameCount;
        performanceRef.current.frameCount = 0;
        performanceRef.current.lastTime = currentTime;

        // Adaptive quality based on performance
        if (performanceRef.current.fps < 30) {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.8, 1.5));
        } else if (performanceRef.current.fps > 50) {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Comprehensive cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('resize', handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Use stored mount element reference
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }

      // Dispose of all geometries and materials
      geometricShapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });

      particleSystems.forEach(system => {
        system.geometry.dispose();
        (system.material as THREE.Material).dispose();
      });

      energyStreams.forEach(stream => {
        stream.geometry.dispose();
        (stream.material as THREE.Material).dispose();
      });

      // Dispose of geometries used in creation
      stationaryGeometries.forEach(geometry => geometry.dispose());

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="three-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
