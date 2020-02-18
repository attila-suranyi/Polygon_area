import React from "react";
import * as THREE from "three";

const Skybox = () => {

    let geo = new THREE.BoxGeometry(500, 500, 500);

    let right = "https://cdn.discordapp.com/attachments/599307537447124992/679399005196910623/bluecloud_rt.jpg";
    let left = "https://lh3.googleusercontent.com/proxy/xq29mC-lO-5vEdjzycqYEnx_eCltEgool06Z2tF_yC1gKRIzr43jDbNLv62bd8gB-f4rn24GQFm6k93uhOs1FyorOR619EpKPJ5OgxHgk5pU2Oo04DFJUV4kbDFcZn8R_XH3Qf4ZQ43IHVxp30C3ke_LEtMk";
    let top = "https://threejsfundamentals.org/threejs/resources/images/wall.jpg";
    let bottom = "bluecloud_dn.jpg";
    let front = "bluecloud_ft.jpg";
    let back = "bluecloud_bk.jpg";

    let loader = new THREE.CubeTextureLoader();

    let cubeTexture = loader.load([
        "https://cdn.discordapp.com/attachments/599307537447124992/679399005196910623/bluecloud_rt.jpg",
        left,
        "https://threejsfundamentals.org/threejs/resources/images/wall.jpg",
        bottom,
        front,
        back
    ]);

    cubeTexture.needsUpdate = true;

    let cubeMap = new THREE.MeshBasicMaterial({ map: cubeTexture, side: THREE.BackSide});
    // maybe use useState to set this in loader.load's callback?

    return (
        <mesh
            geometry={geo}
            material={cubeMap}
        />
    );

};

export default Skybox;