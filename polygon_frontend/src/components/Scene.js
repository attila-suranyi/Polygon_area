import React from "react";
import { Canvas } from "react-three-fiber";
import Plane from "./Plane";
import * as THREE from "three";

import "./sceneStyle.css";
import Polygon from "./Polygon";
import CameraControls from "./CameraControls";

/**
 * Renders a scene with basic plane, polygon and other effects
 */
const Scene = (props) => (
    <Canvas
        camera={{ position: [0,0,6] }}
        onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        alpha={true}
    >

        <Polygon geo={props.geo}/>
        <Plane />

        <fog attach="fog" args={["darkred", 5, 100 ]} />

        <CameraControls />
    </Canvas>
);

export default Scene;
