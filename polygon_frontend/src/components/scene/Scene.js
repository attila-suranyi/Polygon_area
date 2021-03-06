import React, {useContext} from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import "./sceneStyle.css";

import PolygonLoader from "./polygon/PolygonLoader";

import CameraControls from "./camera/CameraControls";
import Skybox from "./skybox/Skybox";
import Plane from "./plane/Plane";

/**
 * Renders a scene with basic plane, polygon and other effects
 */
const Scene = (props) => {

    return (
        <Canvas
            camera={{ position: [0,0,6] }}
            onCreated={({ gl }) => {
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
            alpha={true}
        >
            <ambientLight />
            <spotLight
                position={[0, 10, 10]}
                penumbra={true}
                intensity={0.3}
                castShadow={true}
            />

            <Skybox />

            <PolygonLoader geo={props.geo}/>

            <Plane />

            {/*<fog attach="fog" args={["lightgrey", 0, 700 ]} />*/}

            <CameraControls />
        </Canvas>
    )
};

export default Scene;
