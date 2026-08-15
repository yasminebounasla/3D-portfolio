import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";
import { isWebGLAvailable } from "../../utils/webgl";
import {
  rotateX as rotateX2D,
  rotateY as rotateY2D,
  project as project2D,
  buildIcosahedron,
} from "../../utils/wireframe3d";

const ACCENT = "#22d3ee";

// ---------- version WebGL (priorité, plus riche : éclairage/matériaux) ----------
const ScanGlobe3D = ({ dragRotation }) => {
  const globeRef = useRef();
  const ringRef = useRef();
  const autoY = useRef(0);

  useFrame((_, delta) => {
    autoY.current += delta * 0.12;
    if (globeRef.current) {
      globeRef.current.rotation.y = autoY.current + (dragRotation?.current || 0);
    }
    ringRef.current.rotation.z += delta * 0.35;
  });

  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.9} color={ACCENT} />
      <pointLight position={[-4, -2, -4]} intensity={0.3} color="#ffffff" />

      <mesh ref={globeRef}>
        <icosahedronGeometry args={[1.8, 3]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.65} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.77, 32, 32]} />
        <meshStandardMaterial color="#04060f" roughness={0.7} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.3, 0.007, 8, 100]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// ---------- version Canvas 2D (filet de sécurité si pas de WebGL) ----------
// Même maillage icosaèdre que le Hero (VisionCore) plutôt qu'une grille
// latitude/longitude — plus propre, pas de lignes qui se resserrent aux
// pôles, et cohérent visuellement avec le reste du site.
const { vertices: GLOBE_VERTICES, edges: GLOBE_EDGES } = buildIcosahedron();
const ACCENT_RGB = "34, 211, 238";

const ScanGlobe2D = ({ dragRotation }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const autoY = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;
      sizeRef.current = { width, height };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    ro.observe(canvas.parentElement);

    const draw = () => {
      const { width, height } = sizeRef.current;
      if (width > 0 && height > 0) {
        autoY.current += 0.008;
        const rotY = autoY.current + (dragRotation?.current || 0);
        const rotX = 0.15;
        ctx.clearRect(0, 0, width, height);
        const cx = width * 0.5, cy = height * 0.5;
        const scale = Math.min(width, height) * 0.38;

        const glow = ctx.createRadialGradient(cx, cy, scale * 0.2, cx, cy, scale * 1.3);
        glow.addColorStop(0, `rgba(${ACCENT_RGB}, 0.12)`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        for (const [a, b] of GLOBE_EDGES) {
          let pa = rotateY2D(GLOBE_VERTICES[a], rotY);
          pa = rotateX2D(pa, rotX);
          let pb = rotateY2D(GLOBE_VERTICES[b], rotY);
          pb = rotateX2D(pb, rotX);
          const proja = project2D(pa, { cx, cy, scale, camZ: 3, focal: 3 });
          const projb = project2D(pb, { cx, cy, scale, camZ: 3, focal: 3 });
          const depth = (proja.depth + projb.depth) / 2;
          ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${0.15 + depth * 0.55})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(proja.x, proja.y);
          ctx.lineTo(projb.x, projb.y);
          ctx.stroke();
        }

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotY * 1.4 + Math.PI / 3);
        ctx.strokeStyle = `rgba(${ACCENT_RGB}, 0.45)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(0, 0, scale * 1.3, scale * 0.44, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [dragRotation]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

// ---------- composant exporté : choisit WebGL si possible, sinon 2D ----------
const ScanGlobeCanvas = ({ dragRotation }) => {
  const [supported] = useState(() => isWebGLAvailable());

  if (!supported) {
    return <ScanGlobe2D dragRotation={dragRotation} />;
  }

  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ScanGlobe3D dragRotation={dragRotation} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ScanGlobeCanvas;