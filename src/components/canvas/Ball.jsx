import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  Html,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";
import { isWebGLAvailable } from "../../utils/webgl";

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

const Ball = ({ imgUrl, name, position = [0, 0, 0], scale = 1 }) => {
  const [decal] = useTexture([imgUrl]);
  const [hovered, setHovered] = useState(false);
  const spinRef = useRef();
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  // Centre du balancement (mis à jour quand l'utilisateur relâche après un
  // drag, pour que l'auto-mouvement reprenne là où il a laissé la bille).
  const baseY = useRef(0);
  const baseX = useRef(0);
  // Phase aléatoire par bille pour que le mouvement soit désynchronisé
  // d'une bille à l'autre (sinon elles bougeraient toutes pareil, comme un mur).
  const phase = useRef(Math.random() * Math.PI * 2);

  // Léger balancement autour de baseY/baseX au lieu d'une rotation continue —
  // amplitude assez faible pour que le logo reste toujours visible de face.
  useFrame(({ clock }) => {
    if (spinRef.current && !dragging.current) {
      const t = clock.getElapsedTime();
      spinRef.current.rotation.y = baseY.current + Math.sin(t * 0.3 + phase.current) * 0.35;
      spinRef.current.rotation.x = baseX.current + Math.sin(t * 0.22 + phase.current) * 0.12;
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current || !spinRef.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    spinRef.current.rotation.y += dx * 0.01;
    spinRef.current.rotation.x += dy * 0.01;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    dragging.current = false;
    // Le balancement auto reprend centré sur la position où l'utilisateur a lâché.
    baseY.current = spinRef.current.rotation.y;
    baseX.current = spinRef.current.rotation.x;
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <group position={position} scale={scale}>
      <Float speed={1.75} rotationIntensity={0.15} floatIntensity={1.2}>
        <group ref={spinRef}>
          <OrbitRing radius={0.85} tilt={[Math.PI / 2.4, 0, 0]} speed={0.5} opacity={0.5} />
          <OrbitRing radius={0.85} tilt={[Math.PI / 1.6, Math.PI / 5, 0]} speed={-0.35} opacity={0.25} />

          <mesh scale={0.78}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
          </mesh>

          {/* Sphère invisible agrandie = zone de prise pour le drag,
              plus facile à attraper que la petite sphère du logo. */}
          <mesh
            scale={0.95}
            visible={false}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={() => setHovered(false)}
          >
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>

          <mesh scale={0.7}>
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
        </group>

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

// Grille plate en CSS, utilisée si le WebGL n'est pas disponible —
// garde le stack lisible même quand la 3D ne peut pas se charger.
const FlatTechGrid = ({ technologies }) => (
  <div className='flex flex-row flex-wrap justify-center gap-6'>
    {technologies.map((tech) => (
      <div key={tech.name} className='flex flex-col items-center gap-2 w-20 group'>
        <div className='w-16 h-16 rounded-full bg-tertiary ring-1 ring-accent/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:ring-accent'>
          <img src={tech.icon} alt={tech.name} className='w-8 h-8 object-contain' />
        </div>
        <span className='text-secondary text-[11px] font-mono text-center opacity-0 group-hover:opacity-100 transition-opacity'>
          {tech.name}
        </span>
      </div>
    ))}
  </div>
);

// UN SEUL canvas / contexte WebGL pour toute la grille de technologies —
// un par icône dépasserait vite la limite du navigateur (~16 contextes).
const TechGridCanvas = ({ technologies }) => {
  const [supported] = useState(() => isWebGLAvailable());
  const cols = 7;
  const spacing = 2.15;

  // Positions calculées ligne par ligne : chaque ligne est centrée sur
  // sa PROPRE longueur, pas sur "cols" fixe — sinon la dernière ligne
  // incomplète se retrouve collée à gauche au lieu d'être centrée.
  const positioned = useMemo(() => {
    const rows = [];
    for (let i = 0; i < technologies.length; i += cols) {
      rows.push(technologies.slice(i, i + cols));
    }
    const result = [];
    rows.forEach((row, rowIndex) => {
      row.forEach((tech, col) => {
        const x = (col - (row.length - 1) / 2) * spacing;
        const y = -(rowIndex - (rows.length - 1) / 2) * spacing;
        result.push({ tech, x, y });
      });
    });
    return { items: result, rowCount: rows.length };
  }, [technologies]);

  if (!supported) {
    return <FlatTechGrid technologies={technologies} />;
  }

  return (
    <div style={{ height: `${positioned.rowCount * 135 + 70}px` }}>
      <Canvas
        frameloop='always'
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        camera={{ position: [0, 0, 13], fov: 32 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-4, -3, 3]} intensity={0.4} color={ACCENT} />

        <Suspense fallback={<CanvasLoader />}>
          {positioned.items.map(({ tech, x, y }) => (
            <Ball key={tech.name} imgUrl={tech.icon} name={tech.name} position={[x, y, 0]} />
          ))}
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default TechGridCanvas;