import React, { useState, useRef } from "react";
import { Canvas, useFrame, extend, useThree, useUpdate, useRender } from "react-three-fiber";
import ReactDOM from 'react-dom';
import { useSpring, a } from "react-spring/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./polygonStyle.css";

const THREE = require('three');

const Controls = () => {
    const orbitRef = useRef();
    const { camera, gl } = useThree();

    useFrame( () => {
        orbitRef.current.update();
    });

    return (
        <orbitControls
            ref={orbitRef}
            args={ [camera, gl.domElement] }
            autoRotate={true}
            autoRotateSpeed={3}
            enableDamping={true}
            dampingFactor={0.03}
        />
    )
};

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
    const defaultScale = [2, 2, 2];
    const enlargedScale = [2.5, 2.5, 2.5];

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
        >
            <Controls />

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
        <Polygon />
    </Canvas>
)

const geoTest = () => {

    let geometry = new THREE.Geometry();
    // create vertices with Vector3
    geometry.vertices.push(
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1));

    // faces are made with the index
    // values of from the vertices array

    geometry.faces.push(
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4));
    geometry.normalize();

    geometry.computeFlatVertexNormals();
    return geometry
};
