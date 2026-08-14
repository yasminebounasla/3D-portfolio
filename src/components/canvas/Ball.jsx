import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  Html,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const ACCENT = "#22d3ee";

const OrbitRing = ({ radius, tilt, speed, opacity }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 8, 64]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={opacity} />
    </mesh>
  );
};

// Une bille = un groupe positionnable dans une scène partagée (voir
// TechGridCanvas plus bas). Affiche son nom au survol via drei <Html>.
const Ball = ({ imgUrl, name, position = [0, 0, 0], scale = 1 }) => {
  const [decal] = useTexture([imgUrl]);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position} scale={scale}>
      <Float speed={1.75} rotationIntensity={1} floatIntensity={1.2}>
        <OrbitRing radius={1.55} tilt={[Math.PI / 2.4, 0, 0]} speed={0.5} opacity={0.5} />
        <OrbitRing radius={1.55} tilt={[Math.PI / 1.6, Math.PI / 5, 0]} speed={-0.35} opacity={0.25} />

        <mesh scale={1.45}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
        </mesh>

        <mesh
          scale={1.35}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color='#0e2530'
            transparent
            opacity={0.55}
            roughness={0.08}
            metalness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
            flatShading
          />
        </mesh>

        {hovered && (
          <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
            <div className="px-2.5 py-1 rounded-md bg-primary/90 backdrop-blur-sm border border-white/10 text-white text-[12px] font-mono whitespace-nowrap">
              {name}
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
};

// UN SEUL canvas / contexte WebGL pour toute la grille de technologies —
// avant, chaque icône créait son propre canvas (17+ contextes WebGL en
// même temps), ce qui dépassait la limite du navigateur (~16) et faisait
// disparaître la 3D du Hero et du Contact, chargés avant. Un seul contexte
// partagé règle le problème et allège nettement la page.
const TechGridCanvas = ({ technologies }) => {
  const cols = 6;
  const spacing = 2.6;
  const rows = Math.ceil(technologies.length / cols);

  return (
    <Canvas
      frameloop='always'
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      camera={{ position: [0, 0, 14], fov: 32 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-4, -3, 3]} intensity={0.4} color={ACCENT} />

      <Suspense fallback={<CanvasLoader />}>
        {technologies.map((tech, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = (col - (cols - 1) / 2) * spacing;
          const y = -(row - (rows - 1) / 2) * spacing;
          return (
            <Ball key={tech.name} imgUrl={tech.icon} name={tech.name} position={[x, y, 0]} />
          );
        })}
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default TechGridCanvas;