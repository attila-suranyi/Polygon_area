import React from "react";
import { Canvas } from "react-three-fiber";
import Plane from "./Plane";
import * as THREE from "three";

import "./sceneStyle.css";
import Polygon from "./Polygon";
import CameraControls from "./CameraControls";
import {a} from "react-spring/three";

/**
 * Renders a scene with basic plane, polygon and other effects
 */
const Scene = () => (
    <Canvas
        camera={{ position: [0,0,5] }}
        onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        alpha={true}
    >

        <Polygon />
        <Plane />

        <fog attach="fog" args={["darkred", 5, 100 ]} />

        <CameraControls />
    </Canvas>
);

export default Scene;

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
