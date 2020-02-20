import React from "react";
import * as THREE from "three";

import right from "./textures/bluecloud/bluecloud_rt.jpg";
import left from "./textures/bluecloud/bluecloud_lf.jpg";
import top from "./textures/bluecloud/bluecloud_up.jpg";
import bottom from "./textures/bluecloud/bluecloud_dn.jpg";
import front from "./textures/bluecloud/bluecloud_ft.jpg";
import back from "./textures/bluecloud/bluecloud_bk.jpg";

const Skybox = () => {

    let geo = new THREE.BoxGeometry(1000, 1000, 1000);

    let loader = new THREE.CubeTextureLoader();

    let cubeTexture = loader.load([
        right,
        left,
        top,
        bottom,
        front,
        back
    ]);

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