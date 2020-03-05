import React from "react";
import {Canvas, useThree} from "react-three-fiber";
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
    const {gl, scene, camera} = useThree();

    const animate = () => {

        setTimeout( function() {

            requestAnimationFrame( animate );
            gl.render(scene, camera);

        }, 1000 / 30 );

    };

    return (
        <Canvas
            camera={{ position: [0,0,6] }}
            onCreated={({ gl }) => {
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
            alpha={1}
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
