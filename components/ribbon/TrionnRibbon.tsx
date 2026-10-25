'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { PROJECTS } from '@/data/ribbonProjects';
// import GhostFibers from './GhostFibers';

const CARD_ASPECT = 568 / 812;
const TWO_PI = Math.PI * 2;
const HELIX_SPACING = 6.2;
const HELIX_SPAN = 5.8;
const HELIX_CARD_HEIGHT = 7.6; // vertical extent of each ribbon card band
const HELIX_RADIUS = 15; // tube radius - wider = cards hug the headline
const HELIX_LINE_SEGMENTS = 600;
const SPINE_EXTENSION_POINTS = 20;

interface TrionnRibbonProps {
  progressRef: { current: number };
  requestRenderRef: { current: (() => void) | null };
  onProjectSelect: (id: string) => void;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
/**
 * Faithful port of trionn.com's pinned "Design in Motion" section.
 *
 * A fixed camera watches a two-turn helix. As you scroll:
 *  1. two grey "spine" edge lines reveal incrementally (setDrawRange),
 *  2. a train of cards rides along the tube wall,
 *  3. a 3x2 grid of rounded cards flies in from the screen edges
 *     while a travelling sine wave ripples them down to flat.
 * The "Design in / Motion" words sweep across the whole section.
 */
const TrionnRibbon: React.FC<TrionnRibbonProps> = ({
  progressRef,
  requestRenderRef,
  onProjectSelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverLabelRef = useRef<HTMLDivElement>(null);
  const fibersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ---- responsive helpers (mirror the original chunk) ----
    const isMobile = () => window.innerWidth < 768;
    const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1200;
    const isWide = () => window.innerWidth >= 1440;
    const fov = () => (isMobile() ? 58 : isTablet() ? 54 : 52);
    const dist = () => (isMobile() ? 32 : isTablet() ? 28 : 26);
    const cols = () => (isMobile() ? 2 : 3);
    // Mobile shows 8 cards, desktop 9.
    const gridCardCount = () => Math.min(PROJECTS.length, isMobile() ? 8 : 9);
    const cardRows = () => Math.ceil(gridCardCount() / cols());

    const degToRad = (deg: number) => (deg * Math.PI) / 180;
    const halfH = () => Math.tan(degToRad(fov() / 2)) * dist();
    const halfW = () => halfH() * (window.innerWidth / Math.max(1, window.innerHeight));

    // trailing grid card size that fits the frustum
    const cardSize = () => {
      const colGap = isMobile() ? 0.18 : isTablet() ? 0.28 : 0.38;
      const rowGap = isMobile() ? 0.22 : isTablet() ? 0.36 : 0.55;
      const wFill = isMobile() ? 0.88 : isTablet() ? 0.84 : isWide() ? 0.78 : 0.8;
      const hFill = isMobile() || isTablet() ? 0.82 : isWide() ? 0.78 : 0.8;
      const cap = isMobile() ? 99 : isTablet() ? 8.5 : 9.2;
      return Math.min(
        (2 * halfW() * wFill - (cols() - 1) * colGap) / cols(),
        (2 * halfH() * hFill - (cardRows() - 1) * rowGap) / cardRows() / CARD_ASPECT,
        cap
      );
    };

    const gridColGap = () => (isMobile() ? 0.18 : isTablet() ? 0.28 : 0.38);
    const gridRowGap = () => (isMobile() ? 0.22 : isTablet() ? 0.36 : 0.55);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    const pixelRatio = () => Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 1.5);
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf1efea, 0);

    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(
      fov(),
      window.innerWidth / Math.max(1, window.innerHeight),
      0.1,
      500
    );
    camera.position.set(0, 0, dist());
    camera.lookAt(0, 0, 0);

    // ---- helix path ----
    const b = 28 / (TWO_PI * 2); // vertical rise per radian
    const arcPerRad = Math.sqrt(HELIX_RADIUS * HELIX_RADIUS + b * b); // arc length per radian of theta
    const totalArc = TWO_PI * 2 * arcPerRad; // two full turns
    const trainLength = HELIX_SPACING * Math.max(0, PROJECTS.length - 1) + HELIX_SPAN;
    const entryClearance = HELIX_SPACING * 3;
    const ribbonTravel = trainLength + entryClearance;
    const spineTrailFraction = clamp01(trainLength / totalArc);
    const spineTrailPoints = Math.max(1, Math.round(HELIX_LINE_SEGMENTS * spineTrailFraction));

    const pointAt = (e: number) =>
      new THREE.Vector3(
        HELIX_RADIUS * Math.cos(e),
        -16 + e * b - 2.5 * Math.exp(-Math.pow((e - TWO_PI) / 2, 2)),
        HELIX_RADIUS * Math.sin(e)
      );
    const tangentAt = (e: number) =>
      new THREE.Vector3(
        -HELIX_RADIUS * Math.sin(e),
        b + ((e - TWO_PI) / 2) * 2.5 * Math.exp(-Math.pow((e - TWO_PI) / 2, 2)),
        HELIX_RADIUS * Math.cos(e)
      ).normalize();

    // Match the crossing in projected screen space, where the curved helix reaches y=0.
    let low = 0;
    let high = TWO_PI * 2;
    for (let i = 0; i < 24; i++) {
      const middle = (low + high) / 2;
      if (pointAt(middle).y < 0) low = middle;
      else high = middle;
    }
    const centerArc = ((low + high) / 2) * arcPerRad;
    const cardCenterProgress = clamp01(
      (centerArc + ribbonTravel - (HELIX_SPACING * (PROJECTS.length - 1)) / 2) /
        (totalArc + ribbonTravel)
    );
    const lineCenterProgress = clamp01(
      (totalArc - centerArc + trainLength / 2) / (totalArc + trainLength)
    );
    const lineStartProgress = clamp01(
      (cardCenterProgress - lineCenterProgress) / (1 - lineCenterProgress)
    );

    // ---- spine edge lines (601 pts each, tube-wall offset) ----
    const edgeOffset = () =>
      0.25 * HELIX_CARD_HEIGHT +
      ((isMobile() ? 16 : 24) / Math.max(1, window.innerHeight)) *
        2 *
        Math.tan(degToRad(fov() / 2)) *
        dist();

    const spinePoints = (sign: number) => {
      const off = edgeOffset();
      const pts: THREE.Vector3[] = [];
      for (let e = 0; e <= HELIX_LINE_SEGMENTS; e++) {
        const r = (e / HELIX_LINE_SEGMENTS) * TWO_PI * 2;
        const binormal = new THREE.Vector3()
          .crossVectors(tangentAt(r), new THREE.Vector3(Math.cos(r), 0, Math.sin(r)))
          .normalize();
        binormal.y += 0.6;
        binormal.normalize();
        pts.push(pointAt(r).addScaledVector(binormal, sign * off));
      }
      return pts;
    };

    const buildSpinePaths = () => {
      const G = [...spinePoints(1)].reverse();
      const X = [...spinePoints(-1)].reverse();

      // Project X's first segment further down to the bottom screen edge.
      const head = X[0];
      const dir = X[1].clone().sub(head);
      const len = dir.length() || 1;
      dir.divideScalar(len);
      const reach = (halfH() - head.y) / dir.y;
      const extension: THREE.Vector3[] = [];
      for (let e = SPINE_EXTENSION_POINTS; e >= 1; e--) {
        extension.push(head.clone().addScaledVector(dir, (e / SPINE_EXTENSION_POINTS) * reach));
      }
      X.unshift(...extension);
      return { G, X };
    };

    const { G, X } = buildSpinePaths();

    const geomA = new THREE.BufferGeometry().setFromPoints(G);
    const geomB = new THREE.BufferGeometry().setFromPoints(X);
    const updateSpineGeometry = () => {
      const paths = buildSpinePaths();
      for (const [geometry, points] of [
        [geomA, paths.G],
        [geomB, paths.X],
      ] as const) {
        const position = geometry.getAttribute('position') as THREE.BufferAttribute;
        points.forEach((point, index) => position.setXYZ(index, point.x, point.y, point.z));
        position.needsUpdate = true;
        geometry.computeBoundingSphere();
      }
    };
    geomA.setDrawRange(0, 0);
    geomB.setDrawRange(0, 0);
    const spineMat = new THREE.LineBasicMaterial({ color: '#6e6969' });
    const lineA = new THREE.Line(geomA, spineMat);
    lineA.renderOrder = 5;
    lineA.frustumCulled = false;
    const lineB = new THREE.Line(geomB, new THREE.LineBasicMaterial({ color: '#6e6969' }));
    lineB.renderOrder = 5;
    lineB.frustumCulled = false;
    scene.add(lineA, lineB);

    const moveSpinesTopToBottom = (motionProgress: number, active: boolean) => {
      if (!active) {
        geomA.setDrawRange(0, 0);
        geomB.setDrawRange(0, 0);
        return;
      }
      const head = Math.floor(motionProgress * (HELIX_LINE_SEGMENTS + spineTrailPoints + 1));
      const start = Math.max(0, head - spineTrailPoints);
      const end = Math.min(HELIX_LINE_SEGMENTS, head);
      const count = Math.max(0, end - start + 1);
      geomA.setDrawRange(start, count);
      geomB.setDrawRange(start + SPINE_EXTENSION_POINTS, count);
    };

    // ---- Real Production Screenshot Textures (All Platform Images) ----
    const textureLoader = new THREE.TextureLoader();
    const loadProjectTexture = (p: (typeof PROJECTS)[number]) => {
      const tex = textureLoader.load(p.image, (t) => {
        const source = t.image as HTMLImageElement;
        const longest = Math.max(source.naturalWidth, source.naturalHeight);
        if (longest > 2048) {
          const ratio = 2048 / longest;
          const reduced = document.createElement('canvas');
          reduced.width = Math.max(1, Math.round(source.naturalWidth * ratio));
          reduced.height = Math.max(1, Math.round(source.naturalHeight * ratio));
          const context = reduced.getContext('2d');
          if (context) {
            context.imageSmoothingQuality = 'high';
            context.drawImage(source, 0, 0, reduced.width, reduced.height);
            (t as THREE.Texture<HTMLImageElement | HTMLCanvasElement>).image = reduced;
          }
        }
        t.needsUpdate = true;
        requestRenderRef.current?.();
      });
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    };

    const projectTextures = PROJECTS.map((p) => loadProjectTexture(p));

    // ---- helix card train (PlaneGeometry(1,1,116,1), bent per frame) ----
    const HELIX_SEGS = 116;
    const HELIX_VERTS = HELIX_SEGS + 1;
    const O = HELIX_CARD_HEIGHT;

    const placeHelixCard = (mesh: THREE.Mesh, centerT: number, scale: number) => {
      const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
      const uv = mesh.geometry.attributes.uv as THREE.BufferAttribute;
      const first = !mesh.userData.uvDone;
      const arcSpan = HELIX_SPAN * scale;
      const startT = centerT + HELIX_SPAN * 0.5 - 0.5 * arcSpan;
      const halfBand = 0.5 * O * scale;
      for (let e = 0; e < HELIX_VERTS; e++) {
        const frac = e / HELIX_SEGS;
        const r = (startT + frac * arcSpan) / arcPerRad;
        const cosR = Math.cos(r);
        const sinR = Math.sin(r);
        const hgt = -16 + r * b - 2.5 * Math.exp(-Math.pow((r - TWO_PI) / 2, 2));
        const hx = HELIX_RADIUS * cosR;
        const hp = HELIX_RADIUS * sinR;
        const ty = b + ((r - TWO_PI) / 2) * 2.5 * Math.exp(-Math.pow((r - TWO_PI) / 2, 2));
        let tx = -HELIX_RADIUS * sinR;
        let tz = HELIX_RADIUS * cosR;
        let len = Math.hypot(tx, ty, tz) || 1;
        tx /= len;
        const tyN = ty / len;
        tz /= len;
        let bx = tyN * sinR;
        let by = tz * cosR - tx * sinR;
        let bz = -tyN * cosR;
        len = Math.hypot(bx, by, bz) || 1;
        bx /= len;
        by /= len;
        bz /= len;
        for (let row = 0; row < 2; row++) {
          const a = (row === 0 ? -0.5 : 0.5) * halfBand;
          const idx = HELIX_VERTS * row + e;
          pos.setXYZ(idx, hx + bx * a, hgt + by * a, hp + bz * a);
          if (first) uv.setXY(idx, frac, row);
        }
      }
      pos.needsUpdate = true;
      if (first) {
        uv.needsUpdate = true;
        mesh.userData.uvDone = true;
      }
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);
    };

    const helixCards: THREE.Mesh[] = projectTextures.map((tex, i) => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, HELIX_SEGS, 1),
        new THREE.ShaderMaterial({
          uniforms: {
            map: { value: tex },
            radius: { value: 0.035 },
            aspect: { value: CARD_ASPECT },
          },
          vertexShader:
            'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
          fragmentShader: `
            uniform sampler2D map;
            uniform float radius;
            uniform float aspect;
            varying vec2 vUv;
            float roundedBox(vec2 p, vec2 b, float r){
              vec2 d = abs(p) - b + vec2(r);
              return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
            }
            void main(){
              vec2 p = vUv - 0.5;
              float d = roundedBox(
                vec2(p.x, p.y * aspect),
                vec2(0.5, 0.5 * aspect),
                radius
              );
              if (d > 0.0) discard;
              vec2 uv = vUv;
              if (gl_FrontFacing) uv.x = 1.0 - uv.x;
              gl_FragColor = texture2D(map, uv);
            }
          `,
          side: THREE.DoubleSide,
          transparent: true,
        })
      );
      mesh.visible = false;
      mesh.renderOrder = 1;
      mesh.frustumCulled = false;
      mesh.userData = { hoverScale: 1, uvDone: false, project: PROJECTS[i] };
      scene.add(mesh);
      return mesh;
    });

    // ---- trailing grid cards (smooth 3D depth wave without vertex pixel distortion) ----
    const wave = (mesh: THREE.Mesh, amount: number, waveT: number, index: number) => {
      const col = index % cols();
      const rowIdx = Math.floor(index / cols());
      const zWave = Math.sin(2.4 * waveT + 1.2 * col + 0.8 * rowIdx) * 1.1 * amount;
      const rotX = Math.sin(1.8 * waveT + 0.9 * col) * 0.05 * amount;
      const rotY = Math.cos(1.8 * waveT + 0.9 * rowIdx) * 0.05 * amount;
      mesh.position.z = zWave;
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
    };

    const gridTarget = (i: number) => {
      const cw = cardSize();
      const ch = cw * CARD_ASPECT;
      const cg = gridColGap();
      const rg = gridRowGap();
      const row = Math.floor(i / cols());
      return new THREE.Vector3(
        -(0.5 * (cols() * cw + (cols() - 1) * cg)) + 0.5 * cw + (i % cols()) * (cw + cg),
        0.5 * (cardRows() * ch + (cardRows() - 1) * rg) - 0.5 * ch - row * (ch + rg),
        0
      );
    };

    let gridCards: THREE.Mesh[] = [];
    let gridLayouts: { target: THREE.Vector3; startX: number; startY: number }[] = [];
    const rebuildGrid = () => {
      gridCards.forEach((c) => {
        scene.remove(c);
        c.geometry.dispose();
        if (c.material instanceof THREE.Material) c.material.dispose();
      });
      gridCards = [];
      gridLayouts = [];
      const cw = cardSize();
      const ch = cw * CARD_ASPECT;
      for (let i = 0; i < gridCardCount(); i++) {
        const target = gridTarget(i);
        const col = i % cols();
        gridLayouts.push({
          target,
          startX: col === 0 ? -halfW() - 2 * cw : col === cols() - 1 ? halfW() + 2 * cw : target.x,
          startY: i < cols() ? halfH() + 2 * ch : -(halfH() + 2 * ch),
        });
        const geom = new THREE.PlaneGeometry(cw, ch);
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            map: { value: projectTextures[i] },
            radius: { value: 0.035 },
            aspect: { value: CARD_ASPECT },
          },
          vertexShader: `
            varying vec2 vUv;
            void main(){
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D map;
            uniform float radius;
            uniform float aspect;
            varying vec2 vUv;
            float roundedBox(vec2 p, vec2 b, float r){
              vec2 d = abs(p) - b + vec2(r);
              return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
            }
            void main(){
              vec2 p = vUv - 0.5;
              vec2 b = vec2(0.5, 0.5);
              float d = roundedBox(vec2(p.x, p.y * aspect), vec2(b.x, b.y * aspect), radius);
              if (d > 0.0) discard;
              gl_FragColor = texture2D(map, vUv);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.visible = false;
        mesh.renderOrder = 2;
        mesh.frustumCulled = false;
        mesh.userData = {
          wave: 0,
          waveT: 0,
          project: PROJECTS[i % PROJECTS.length],
          hoverScale: 1,
        };
        scene.add(mesh);
        gridCards.push(mesh);
      }
    };
    rebuildGrid();

    // ---- 3D Text Meshes (at Z = 0) ----
    const drawTopTextCanvas = () => {
      const dpr = pixelRatio();
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cw = Math.max(1024, Math.round(w * dpr));
      const ch = Math.max(1024, Math.round(h * dpr));

      const textCanvas = document.createElement('canvas');
      textCanvas.width = cw;
      textCanvas.height = ch;
      const ctx = textCanvas.getContext('2d');
      if (!ctx) return null;

      ctx.clearRect(0, 0, cw, ch);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = cw / 2;
      const centerY = ch / 2;

      const isMobile = w < 768;
      const isTablet = w >= 768 && w < 1200;

      const baseFontSize = isMobile
        ? Math.round(cw * 0.11)
        : isTablet
          ? Math.round(cw * 0.09)
          : Math.min(150 * dpr, Math.round(cw * 0.08));

      const gap = baseFontSize * 0.76;

      ctx.fillStyle = '#111111';
      ctx.font = `900 ${baseFontSize}px "Syne", "Inter", sans-serif`;
      ctx.fillText('SYSTEMS IN', centerX, centerY - gap);

      const tex = new THREE.CanvasTexture(textCanvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    };

    const drawSubTextCanvas = () => {
      const dpr = pixelRatio();
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cw = Math.max(1024, Math.round(w * dpr));
      const ch = Math.max(1024, Math.round(h * dpr));

      const textCanvas = document.createElement('canvas');
      textCanvas.width = cw;
      textCanvas.height = ch;
      const ctx = textCanvas.getContext('2d');
      if (!ctx) return null;

      ctx.clearRect(0, 0, cw, ch);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = cw / 2;
      const centerY = ch / 2;

      const isMobile = w < 768;
      const subFontSize = isMobile
        ? Math.max(8 * dpr, Math.round(cw * 0.014))
        : Math.max(9 * dpr, Math.round(cw * 0.009));

      ctx.fillStyle = 'rgba(17, 17, 17, 0.6)';
      ctx.font = `600 ${subFontSize}px "Inter", sans-serif`;
      ctx.fillText(
        'BRAND IDENTITY. PACKAGING. CAMPAIGNS. EXHIBITIONS. MOTION. DIGITAL DESIGN. EXPLORE THE BODY OF WORK.',
        centerX,
        centerY
      );

      const tex = new THREE.CanvasTexture(textCanvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    };

    const drawBottomTextCanvas = () => {
      const dpr = pixelRatio();
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cw = Math.max(1024, Math.round(w * dpr));
      const ch = Math.max(1024, Math.round(h * dpr));

      const textCanvas = document.createElement('canvas');
      textCanvas.width = cw;
      textCanvas.height = ch;
      const ctx = textCanvas.getContext('2d');
      if (!ctx) return null;

      ctx.clearRect(0, 0, cw, ch);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = cw / 2;
      const centerY = ch / 2;

      const isMobile = w < 768;
      const isTablet = w >= 768 && w < 1200;

      const baseFontSize = isMobile
        ? Math.round(cw * 0.11)
        : isTablet
          ? Math.round(cw * 0.09)
          : Math.min(150 * dpr, Math.round(cw * 0.08));

      const gap = baseFontSize * 0.76;

      ctx.fillStyle = '#111111';
      ctx.font = `900 ${baseFontSize}px "Syne", "Inter", sans-serif`;
      ctx.fillText('MOTION', centerX, centerY + gap);

      const tex = new THREE.CanvasTexture(textCanvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    };

    const createTextMesh = (drawFn: () => THREE.CanvasTexture | null) => {
      const tex = drawFn();
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.02,
        depthWrite: true,
        depthTest: true,
        side: THREE.DoubleSide,
      });
      const geo = new THREE.PlaneGeometry(2 * halfW(), 2 * halfH());
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, 0, 0);
      mesh.renderOrder = 4;
      mesh.frustumCulled = false;
      scene.add(mesh);
      return { mesh, mat, geo, drawFn };
    };

    const topText = createTextMesh(drawTopTextCanvas);
    const subText = createTextMesh(drawSubTextCanvas);
    const bottomText = createTextMesh(drawBottomTextCanvas);

    const updateAllTextMeshes = () => {
      [topText, subText, bottomText].forEach((item) => {
        const newTex = item.drawFn();
        if (newTex) {
          if (item.mat.map) item.mat.map.dispose();
          item.mat.map = newTex;
          item.mat.needsUpdate = true;
        }
        item.geo.dispose();
        item.geo = new THREE.PlaneGeometry(2 * halfW(), 2 * halfH());
        item.mesh.geometry = item.geo;
      });
    };

    // ---- interaction (pointer on host container) ----
    const host = canvas.parentElement;
    const pointer = new THREE.Vector2(-999, -999);
    const pointerPixels = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let pointerActive = false;
    let pointerDirty = false;
    let hovered: THREE.Mesh | null = null;

    const positionHoverLabel = () => {
      const label = hoverLabelRef.current;
      if (!label || !host) return;
      const padding = 14;
      const x = Math.min(
        host.clientWidth - label.offsetWidth - padding,
        Math.max(padding, pointerPixels.x + 18)
      );
      const y = Math.min(
        host.clientHeight - label.offsetHeight - padding,
        Math.max(padding, pointerPixels.y + 18)
      );
      label.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = (host || canvas).getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.set(x, y);
      pointerPixels.set(e.clientX - rect.left, e.clientY - rect.top);
      pointerActive = true;
      pointerDirty = true;
      positionHoverLabel();
      requestRenderRef.current?.();
    };

    const onPointerLeave = () => {
      pointer.set(-999, -999);
      pointerActive = false;
      pointerDirty = true;
      canvas.style.cursor = 'default';
      if (hoverLabelRef.current) hoverLabelRef.current.style.opacity = '0';
      requestRenderRef.current?.();
    };

    const onCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const clickPointer = new THREE.Vector2(x, y);
      raycaster.setFromCamera(clickPointer, camera);
      const activeHelix = helixCards.filter((m) => m.visible);
      const activeGrid = gridCards.filter((m) => m.visible);
      const hits = raycaster.intersectObjects([...activeGrid, ...activeHelix], false);
      if (hits.length) {
        const preferredHit = hits.find((hit) => hit.object === hovered);
        const hitObj = (preferredHit?.object ?? hits[0].object) as THREE.Mesh;
        const proj = hitObj.userData.project as (typeof PROJECTS)[number] | undefined;
        if (proj) {
          if (hoverLabelRef.current) hoverLabelRef.current.style.opacity = '0';
          onProjectSelect(proj.id);
        }
      }
    };

    host?.addEventListener('pointermove', onPointerMove);
    host?.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('click', onCanvasClick);

    // ---- animation loop ----
    let raf = 0;
    let active = false;
    let lastTime = performance.now();
    let lastProgress = Number.NaN;

    const ribbonStart = 0;
    const sequenceEnd = 0.72;
    const titleFraction = 0.55;

    const scheduleFrame = () => {
      if (!active || raf) return;
      raf = requestAnimationFrame(frame);
    };

    const frame = (time: number) => {
      raf = 0;
      if (!active) return;
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      const soformer = progressRef.current;
      const progressChanged =
        Math.abs(soformer - lastProgress) > 0.00005 || Number.isNaN(lastProgress);
      lastProgress = soformer;
      const ribbonProgress = clamp01((soformer - ribbonStart) / (1 - ribbonStart));

      const ew = (2000 / 11000) * totalArc;
      const ev = (totalArc + trainLength) * 0.44;
      const eg = (ew + 20) / ev;

      const g = clamp01(ribbonProgress / sequenceEnd);
      const P = Math.min(1, g / (400 / 600));
      const H = clamp01((g - eg) / (1 - eg));
      const wipe = clamp01((ribbonProgress - sequenceEnd) / (1 - sequenceEnd));
      void wipe;
      const lineTravel = clamp01((P - lineStartProgress) / (1 - lineStartProgress));
      const opposingMotionProgress = clamp01(
        lineTravel - 1.6 * lineTravel * (1 - lineTravel) * (lineTravel - lineCenterProgress)
      );
      const opposingMotionActive = P >= lineStartProgress && P < 1;

      // ---- helix cards travel bottom-to-top ----
      const base = P * (totalArc + ribbonTravel) - ribbonTravel;
      for (let i = 0; i < helixCards.length; i++) {
        const t = base + HELIX_SPACING * i;
        const visible = ribbonProgress > 0 && P < 1 && t > 0 && t < totalArc;
        helixCards[i].visible = visible;
        if (visible) {
          const scale = helixCards[i].userData.hoverScale ?? 1;
          placeHelixCard(helixCards[i], Math.min(t, totalArc - 0.001), scale);
        }
      }

      // ---- guide lines share the ribbon timing but travel top-to-bottom ----
      moveSpinesTopToBottom(opposingMotionProgress, opposingMotionActive);

      // ---- title centerpiece ----
      const titleT = clamp01(ribbonProgress / titleFraction);
      const titleEase = 1 - Math.pow(1 - titleT, 2.5);
      const textOpacity = clamp01(1 - 4 * H);

      topText.mesh.position.x = -1.2 * halfW() * (1 - titleEase);
      topText.mat.opacity = textOpacity * titleEase;
      topText.mesh.visible = topText.mat.opacity > 0.001;

      subText.mat.opacity = textOpacity * titleEase;
      subText.mesh.visible = subText.mat.opacity > 0.001;

      bottomText.mesh.position.x = 1.2 * halfW() * (1 - titleEase);
      bottomText.mat.opacity = textOpacity * titleEase;
      bottomText.mesh.visible = bottomText.mat.opacity > 0.001;

      // ---- trailing grid cards fly-in + depth wave ----
      for (let i = 0; i < gridCards.length; i++) {
        const mesh = gridCards[i];
        const r = clamp01((H - 0.06 * i) / 0.4);
        mesh.visible = ribbonProgress > 0.0001 && r > 0;
        if (!mesh.visible) continue;
        const n = 1 - Math.pow(1 - r, 3);
        const { target, startX, startY } = gridLayouts[i];
        mesh.position.set(startX + (target.x - startX) * n, startY + (target.y - startY) * n, 0);
        const waveAmount = Math.sin(Math.PI * r) * 0.65;
        if (waveAmount > 0.001) wave(mesh, waveAmount, ribbonProgress * 10, i);
        else {
          mesh.position.z = 0;
          mesh.rotation.set(0, 0, 0);
        }
      }
      // ---- hover: scale up the hovered card & update cursor ----
      if (pointerActive && (pointerDirty || progressChanged)) {
        raycaster.setFromCamera(pointer, camera);
        const activeHelix = helixCards.filter((m) => m.visible);
        const activeGrid = gridCards.filter((m) => m.visible);
        const hits = raycaster.intersectObjects([...activeGrid, ...activeHelix], false);
        if (hits.length) {
          const preferredHit = hits.find((hit) => hit.object === hovered);
          hovered = (preferredHit?.object ?? hits[0].object) as THREE.Mesh;
          canvas.style.cursor = 'pointer';
          const project = hovered.userData.project as (typeof PROJECTS)[number] | undefined;
          if (hoverLabelRef.current && project) {
            hoverLabelRef.current.textContent = `${project.title} / View story`;
            hoverLabelRef.current.style.opacity = '1';
            positionHoverLabel();
          }
        } else {
          hovered = null;
          canvas.style.cursor = 'default';
          if (hoverLabelRef.current) hoverLabelRef.current.style.opacity = '0';
        }
      }
      if (!pointerActive) {
        hovered = null;
        if (hoverLabelRef.current) hoverLabelRef.current.style.opacity = '0';
      }
      pointerDirty = false;
      const hoverK = 1 - Math.pow(0.001, dt);
      let hoverSettling = false;
      for (const c of helixCards) {
        const cur = c.userData.hoverScale ?? 1;
        const target = c === hovered ? 1.12 : 1;
        c.userData.hoverScale = cur + (target - cur) * hoverK;
        c.renderOrder = c === hovered ? 20 : 1;
        if (c.material instanceof THREE.Material) {
          c.material.depthTest = c !== hovered;
          c.material.depthWrite = c !== hovered;
        }
        if (Math.abs(c.userData.hoverScale - target) > 0.001) hoverSettling = true;
      }
      for (const c of gridCards) {
        const cur = c.userData.hoverScale ?? 1;
        const target = c === hovered ? 1.12 : 1;
        c.userData.hoverScale = cur + (target - cur) * hoverK;
        if (Math.abs(c.userData.hoverScale - target) > 0.001) hoverSettling = true;
        c.scale.set(c.userData.hoverScale, c.userData.hoverScale, 1);
        c.renderOrder = c === hovered ? 20 : 2;
        if (c.material instanceof THREE.Material) {
          c.material.depthTest = c !== hovered;
          c.material.depthWrite = c !== hovered;
        }
      }

      // GhostFibers disabled - using static background

      renderer.render(scene, camera);
      if (hoverSettling) scheduleFrame();
    };

    const start = () => {
      if (active || document.hidden) return;
      active = true;
      lastTime = performance.now();
      scheduleFrame();
    };
    const stop = () => {
      active = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    requestRenderRef.current = scheduleFrame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: '100px' }
    );
    observer.observe(host ?? canvas);
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (
        (host ?? canvas).getBoundingClientRect().bottom > 0 &&
        (host ?? canvas).getBoundingClientRect().top < window.innerHeight
      )
        start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let resizeRaf = 0;
    const resize = () => {
      resizeRaf = 0;
      renderer.setPixelRatio(pixelRatio());
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.fov = fov();
      camera.aspect = window.innerWidth / Math.max(1, window.innerHeight);
      camera.position.set(0, 0, dist());
      camera.updateProjectionMatrix();
      updateSpineGeometry();
      rebuildGrid();
      updateAllTextMeshes();
      lastProgress = Number.NaN;
      scheduleFrame();
    };
    const onResize = () => {
      if (!resizeRaf) resizeRaf = requestAnimationFrame(resize);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      requestRenderRef.current = null;
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      host?.removeEventListener('pointermove', onPointerMove);
      host?.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('click', onCanvasClick);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (obj.material instanceof THREE.Material) obj.material.dispose();
        }
      });
      geomA.dispose();
      geomB.dispose();
      lineA.material.dispose();
      lineB.material.dispose();
      projectTextures.forEach((texture) => texture.dispose());
      [topText, subText, bottomText].forEach((item) => {
        item.geo.dispose();
        item.mat.dispose();
        if (item.mat.map) item.mat.map.dispose();
      });
      renderer.dispose();
    };
  }, [progressRef, requestRenderRef, onProjectSelect]);

  return (
    <div className="relative z-10 h-full bg-[#f1efea] overflow-hidden">
      <div className="absolute inset-0">
        {/* GhostFibers disabled */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-auto"
          aria-hidden="true"
        />
        <div
          ref={hoverLabelRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-20 hidden md:block rounded-sm bg-[#171715] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#f1efea] opacity-0 transition-opacity duration-150"
        />
        <div
          className="absolute inset-0 w-full h-full flex items-center flex-col justify-between pointer-events-none"
          style={{ color: "#111111" }}
        >
          <div className="sr-only">
            <h1>BRAND STORIES IN MOTION</h1>
            <p>Brand identity, packaging, campaigns, exhibitions, motion, and digital design.</p>
          </div>
          <div className="mt-auto w-full flex items-end justify-between gap-4 pb-6 px-6 md:px-14">
            <button
              type="button"
              onClick={() => onProjectSelect(PROJECTS[0].id)}
              className="relative z-10 pointer-events-auto min-h-11 border-b border-current bg-transparent text-left text-[10px] font-bold uppercase tracking-[0.16em] text-current transition-colors duration-200 hover:text-[#a1261e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a1261e]"
            >
              Browse project stories
            </button>
            <Link
              href="/work"
              className="relative z-10 pointer-events-auto inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-current hover:text-[#a1261e] transition-colors duration-300"
            >
              View all work &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrionnRibbon;
