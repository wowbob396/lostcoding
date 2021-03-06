import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { RootState, ThreeEvent, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Link } from 'gatsby';

interface BoxProps {
  meshProps: JSX.IntrinsicElements['mesh'];
  rotationSpeed?: number;
  link?: string;
}
function Box(props: BoxProps) {
  const { meshProps, rotationSpeed, link } = props;

  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const { scale } = useSpring({ scale: hovered ? 1.5 : 1.0});

  useFrame((state: RootState, delta: number) => {
    mesh.current.rotation.x += ( rotationSpeed || 0.01);
  });

  return (
    <Link to={ link || "/"}>
      <animated.mesh
        {...meshProps}
        ref={mesh}
        scale={scale}
        onClick={(_) => setActive(!active)}
        onPointerOver={(_) => setHover(true)}
        onPointerOut={(_) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}  />
      </animated.mesh>
    </Link>
  )
}

export default Box;