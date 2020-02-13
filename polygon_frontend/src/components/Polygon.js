import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import ReactDOM from 'react-dom';
import { useSpring, a } from "react-spring/three";

import "./polygonStyle.css";

const Polygon = () => {
    const meshRef = useRef(null);

    const blue = "#005ce6";
    const lightblue = "#1a75ff";
    const defaultScale = [2, 2, 2];
    const enlargedScale = [2.5, 2.5, 2.5];

    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    const springProps = useSpring({
        scale: active ? enlargedScale : defaultScale,
        color: hovered ? lightblue : blue
    });

    useFrame( () => {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x += 0.005;
    });

    return (
        <a.mesh
              ref={meshRef}
              onPointerOver={ () => setHovered(true) }
              onPointerOut={ () => setHovered(false) }
              onClick={ () => setActive(!active)}
              scale={ springProps.scale }
        >
            <boxBufferGeometry
                attach="geometry"
                args={[1,1,1]}
            />
            <a.meshBasicMaterial
                attach="material"
                color={ springProps.color }
            />
        </a.mesh>
    );
};

export default () => (
    <Canvas>
        <Polygon/>
    </Canvas>
)
