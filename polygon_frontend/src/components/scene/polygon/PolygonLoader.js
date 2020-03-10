import React from "react";
import {extend, useFrame} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import BuildGeometry from "../geometry/BuildGeometry";
import Polygon from "./Polygon";

/**
 * Builds a polygon's geometry from Vector3 data, and reflections
 */
const PolygonLoader = (props) => {
    extend({ OrbitControls });

    let customGeo = BuildGeometry(props.geo);
    let cubeCamera = new THREE.CubeCamera(1, 1000, 128 );

    // re-renders reflections every frame
    useFrame(({ gl, scene }) => {
        //TODO resolve WebGL render errors
        
        cubeCamera.visible = false;
        cubeCamera.update(gl, scene);
        cubeCamera.visible = true;
    });

    return (
        <Polygon
            geo={customGeo}
            reflection={cubeCamera.renderTarget.texture}
        />
    );
};

export default PolygonLoader;