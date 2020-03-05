import React, {useRef} from "react";
import * as THREE from "three";
import SkyboxLoader from "./SkyboxLoader";
import {useFrame} from 'react-three-fiber'

/**
 * Loads textures and builds a Skybox component around the scene
 */
const Skybox = () => {

    const skyBoxRef = useRef();

    let geo = new THREE.BoxGeometry(1000, 1000, 1000);

    let loader = new THREE.CubeTextureLoader();
    let skyboxSides = new SkyboxLoader().getSkybox();

    let cubeTexture = loader.load([...skyboxSides]);

    let cubeMap = new THREE.MeshBasicMaterial({
        envMap: cubeTexture,
        side: THREE.DoubleSide,
    });

    //
    useFrame( ({camera}) => {
        updatePos(camera);
    });

    /**
     * Centers the skybox to the camera's position so its edges cannot be seen
     * @param camera
     */
    const updatePos = (camera) => {
        skyBoxRef.current.position.x = camera.position.x;
        skyBoxRef.current.position.y = camera.position.y;
        skyBoxRef.current.position.z = camera.position.z;
    };

    return (
        <mesh
            geometry={geo}
            material={cubeMap}
            ref={skyBoxRef}
        />
    );
};

export default Skybox;