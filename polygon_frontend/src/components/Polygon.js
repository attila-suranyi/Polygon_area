import React, { useState } from "react";
import {extend } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Builds a polygon mesh from Vector3 data
 */
const Polygon = () => {
    extend({ OrbitControls });

    // orbitControl's autorotate makes this reduntant
        // const meshRef = useRef();
        // useFrame( () => {
        //     meshRef.current.rotation.y += 0.005;
        // });
        //     meshRef.current.rotation.x += 0.005;

    const blue = "#005ce6";
    const lightblue = "#1a75ff";
    const defaultScale = [3, 3, 3];
    const enlargedScale = [4.5, 4.5, 4.5];

    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    const springProps = useSpring({
        scale: active ? enlargedScale : defaultScale,
        color: hovered ? lightblue : blue
    });

    return (
        <a.mesh
              // ref={meshRef}
              onPointerOver={ () => setHovered(true) }
              onPointerOut={ () => setHovered(false) }
              onClick={ () => setActive(!active)}
              scale={ springProps.scale }
              castShadow={true}
        >

            <ambientLight />
            <spotLight
                position={[0, 5, 10]}
                penumbra={true}
                intensity={0.5}
                castShadow={true}
            />
            <boxBufferGeometry
                attach="geometry"
                args={[1,1,1]}
            />

            <a.meshPhysicalMaterial
                attach="material"
                color={ springProps.color }
            />
        </a.mesh>
    );
};

export default Polygon;