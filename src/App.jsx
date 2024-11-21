import * as THREE from "three";
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Plane({ index }) {
  const hue = 1 - index * 0.05;
  const lightness = index * 0.05;
  const color = new THREE.Color().setHSL(hue, 1, lightness);
  const scale = 1 - index * 0.05;
  let rotation = Math.PI * index * 0.02;
  const ref = React.useRef();
  const offset = index * 0.1;
  let elapsed = 0;
  useFrame((_, dt) => {
    elapsed += dt * 0.5;
    ref.current.rotation.z = Math.cos(elapsed + offset);
  });
  return (
    <mesh
      ref={ref}
      scale={scale}
      rotation-z={rotation}
      position-z={index * 0.005}
    >
      <planeGeometry />
      <meshBasicMaterial color={color} transparent opacity={0.33} />
    </mesh>
  );
}

function PlaneGroup() {
  const children = [];
  for (let i = 0; i < 20; i += 1) {
    children.push(<Plane index={i} key={i} />);
  }
  return <group>{children}</group>;
}

function App() {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.NoToneMapping,
      }}
      camera={{ position: [0, 0, 1] }}
    >
      <PlaneGroup />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
