import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.esm";

import CanvasLoader from "../Loader";

const ACCENT = "#22d3ee";

const DetectedNode = ({ position }) => (
  <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
    <lineSegments position={position}>
      <edgesGeometry args={[new THREE.BoxGeometry(0.45, 0.45, 0.45)]} />
      <lineBasicMaterial color={ACCENT} transparent opacity={0.6} />
    </lineSegments>
  </Float>
);

const ScanRing = ({ radius, axis, speed, color = ACCENT, opacity = 0.3, rotation = [0, 0, 0] }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation[axis] += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

// dragRotation : ref partagée avec Hero.jsx, mise à jour par du vrai
// mousedown/mousemove natif (voir Hero.jsx) — pas de dépendance à
// OrbitControls, donc pas de risque d'incompatibilité de version.
const VisionCore = ({ dragRotation }) => {
  const rootRef = useRef();
  const coreRef = useRef();
  const autoY = useRef(0);
  const [points] = useState(() =>
    random.inSphere(new Float32Array(1500), { radius: 2.8 })
  );

  useFrame((_, delta) => {
    autoY.current += delta * 0.03;
    if (rootRef.current) {
      rootRef.current.rotation.y = autoY.current + (dragRotation?.current || 0);
    }
    coreRef.current.rotation.y += delta * 0.12;
    coreRef.current.rotation.x += delta * 0.03;
  });

  return (
    <group ref={rootRef} position={[2.6, 0, -1]} scale={0.85}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color={ACCENT} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#ffffff" />

      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.75} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.46, 1]} />
          <meshStandardMaterial color="#04060f" emissive="#0b2530" roughness={0.4} transparent opacity={0.85} />
        </mesh>
      </group>

      <ScanRing radius={2.1} axis="x" speed={0.25} />
      <ScanRing radius={2.4} axis="z" speed={-0.18} color="#ffffff" opacity={0.15} rotation={[Math.PI / 4, 0, 0]} />

      <Points positions={points} stride={3}>
        <PointMaterial
          transparent
          color={ACCENT}
          size={0.016}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
        />
      </Points>

      <DetectedNode position={[2.7, 1.2, 0.4]} />
      <DetectedNode position={[-2.3, -1, 1.3]} />
      <DetectedNode position={[1.4, -1.9, -1.6]} />
    </group>
  );
};

const VisionCoreCanvas = ({ dragRotation }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      camera={{ position: [9, 2, 6], fov: 30 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <VisionCore dragRotation={dragRotation} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default VisionCoreCanvas;