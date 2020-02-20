import React from "react";
import * as THREE from "three";

import right from "./textures/bluecloud/bluecloud_rt.jpg";
import left from "./textures/bluecloud/bluecloud_lf.jpg";
import top from "./textures/bluecloud/bluecloud_up.jpg";
import bottom from "./textures/bluecloud/bluecloud_dn.jpg";
import front from "./textures/bluecloud/bluecloud_ft.jpg";
import back from "./textures/bluecloud/bluecloud_bk.jpg";

// import right from "./textures/browncloud/browncloud_rt.jpg";
// import left from "./textures/browncloud/browncloud_lf.jpg";
// import bottom from "./textures/browncloud/browncloud_up.jpg";
// import top from "./textures/browncloud/browncloud_dn.jpg";
// import front from "./textures/browncloud/browncloud_ft.jpg";
// import back from "./textures/browncloud/browncloud_bk.jpg";

// import right from "./textures/cubemap/px.png";
// import left from "./textures/cubemap/nx.png";
// import top from "./textures/cubemap/ny.png";
// import bottom from "./textures/cubemap/nz.png";
// import front from "./textures/cubemap/py.png";
// import back from "./textures/cubemap/pz.png";

// import right from "./textures/garage-cubemap/px.png"
// import left from "./textures/garage-cubemap/nx.png"
// import top from "./textures/garage-cubemap/py.png"
// import bottom from "./textures/garage-cubemap/ny.png"
// import front from "./textures/garage-cubemap/nz.png"
// import back from "./textures/garage-cubemap/pz.png"

// import right from "./textures/garage2-cm/right.png"
// import left from "./textures/garage2-cm/left.png"
// import top from "./textures/garage2-cm/top.png"
// import bottom from "./textures/garage2-cm/bottom.png"
// import front from "./textures/garage2-cm/front.png"
// import back from "./textures/garage2-cm/back.png"




const Skybox = () => {

    let geo = new THREE.BoxGeometry(1000, 1000, 1000);

    let loader = new THREE.CubeTextureLoader();

    let cubeTexture = loader.load([
        right,
        left,
        bottom,
        top,
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