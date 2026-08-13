import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";

const ACCENT = "#22d3ee";

const ScanGlobe = ({ dragRotation }) => {
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
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const ScanGlobeCanvas = ({ dragRotation }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ScanGlobe dragRotation={dragRotation} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ScanGlobeCanvas;