import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const ACCENT = "#22d3ee";

// Deux anneaux façon "orbite électronique" inclinés différemment,
// tournent chacun à leur propre vitesse — remplace l'ancien halo plat.
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

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} castShadow />
      <directionalLight position={[-4, -3, 3]} intensity={0.4} color={ACCENT} />
      <pointLight position={[0, 3, 4]} intensity={0.6} color="#ffffff" />

      <OrbitRing radius={3.1} tilt={[Math.PI / 2.4, 0, 0]} speed={0.5} opacity={0.55} />
      <OrbitRing radius={3.1} tilt={[Math.PI / 1.6, Math.PI / 5, 0]} speed={-0.35} opacity={0.3} />

      {/* coque en fil de fer légèrement plus grande : donne le contour
          net d'une "bille" même là où le verre est très transparent */}
      <mesh scale={2.9}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
      </mesh>

      <mesh castShadow receiveShadow scale={2.75}>
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
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='always'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
