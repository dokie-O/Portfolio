"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

// Keep in sync with app/globals.css — Three.js materials can't read CSS
// custom properties directly.
const GOLD = "#c8aa6e";
const GOLD_BRIGHT = "#f0e6d2";
const GOLD_DARK = "#785a28";
const ACCENT = "#0ac8b9";

const GROW_SECONDS = 0.9;
const SPIN_SECONDS = 1.6;

function Crystal({ onComplete }: { onComplete: () => void }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const elapsed = useRef(0);
  const completed = useRef(false);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const core = coreRef.current;
    if (!group || !core) return;

    elapsed.current += delta;
    const growT = Math.min(elapsed.current / GROW_SECONDS, 1);
    const eased = 1 - Math.pow(1 - growT, 3);
    group.scale.setScalar(eased);

    group.rotation.y += delta * (growT < 1 ? 1.1 : 2.2);
    group.rotation.x = Math.sin(elapsed.current * 0.6) * 0.15;
    core.rotation.y -= delta * 1.6;
    core.scale.setScalar(0.9 + Math.sin(elapsed.current * 3) * 0.1);

    if (!completed.current && elapsed.current >= SPIN_SECONDS) {
      completed.current = true;
      onComplete();
    }
  });

  return (
    <group ref={groupRef}>
      {/* Gold angular shell — the "hextech" mechanical casing */}
      <mesh>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color={GOLD}
          emissive={GOLD_DARK}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
          flatShading
          wireframe
        />
      </mesh>
      {/* Glowing crystal core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.6}
          metalness={0.1}
          roughness={0.15}
          flatShading
        />
      </mesh>
    </group>
  );
}

export default function HexCrystalScene({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} color={GOLD_BRIGHT} />
      <pointLight position={[3, 3, 4]} intensity={40} color={GOLD_BRIGHT} />
      <pointLight position={[-3, -2, -2]} intensity={15} color={GOLD} />
      <pointLight position={[0, 0, 2]} intensity={20} color={ACCENT} />
      <Crystal onComplete={onComplete} />
    </Canvas>
  );
}
