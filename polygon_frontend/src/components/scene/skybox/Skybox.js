import React from "react";
import * as THREE from "three";
import SkyboxLoader from "./SkyboxLoader";
import { useThree } from 'react-three-fiber'

/**
 * Loads textures and builds a Skybox componentaround the scene
 */
const Skybox = () => {

    const {camera} = useThree();
    //TODO try moving skybox with this

    let geo = new THREE.BoxGeometry(1000, 1000, 1000);

    let loader = new THREE.CubeTextureLoader();
    let skyboxSides = new SkyboxLoader().getSkybox();

    let cubeTexture = loader.load([...skyboxSides]);

    let cubeMap = new THREE.MeshBasicMaterial({
        envMap: cubeTexture,
        side: THREE.DoubleSide,
    });

    return (
        <mesh
            geometry={geo}
            material={cubeMap}
        />
    );
};

export default Skybox;