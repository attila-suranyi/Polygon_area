import React, { useState } from "react";
import {extend } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";


/**
 * Builds a polygon mesh from Vector3 data
 */
const Polygon = (props) => {
    extend({ OrbitControls });

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

    const customGeo = buildGeo(props.geo);

    return (
        <a.mesh
              onPointerOver={ () => setHovered(true) }
              onPointerOut={ () => setHovered(false) }
              onClick={ () => setActive(!active)}
              scale={ springProps.scale }
              castShadow={true}
              geometry={customGeo}
        >

            <ambientLight />
            <spotLight
                position={[0, 5, 10]}
                penumbra={true}
                intensity={0.5}
                castShadow={true}
            />

            <a.meshPhysicalMaterial
                attach="material"
                color={ springProps.color }
            />
        </a.mesh>
    );
};

export default Polygon;

//TODO use data from context
const buildGeo = (geoData) => {
    // let geometry = new THREE.BufferGeometry();
    // const myVertices = new Float32Array([
    //     -10, 10, 0,
    //     -10, -10, 0,
    //     10, 10, 0
    // ]);
    // customGeo.setAttribute('position', new THREE.BufferAttribute(myVertices, 3));

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
        new THREE.Face3(3, 6, 4)
    );

    geometry.normalize();
    geometry.computeFlatVertexNormals();

    return geometry;
};