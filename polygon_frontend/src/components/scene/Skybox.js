import React from "react";
import * as THREE from "three";
import SkyboxLoader from "./SkyboxLoader";

/**
 * Loads textures and builds a Skybox componentaround the scene
 */
const Skybox = () => {

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