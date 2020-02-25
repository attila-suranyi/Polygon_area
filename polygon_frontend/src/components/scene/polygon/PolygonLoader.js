import React from "react";
import {extend, useFrame} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import GeometryBuilder from "../geometry/GeometryBuilder";
import Polygon from "./Polygon";

/**
 * Builds a polygon's geometry from Vector3 data, and reflections
 */
const PolygonLoader = (props) => {
    extend({ OrbitControls });

    //TODO maybe use data from context ?
    let customGeo = GeometryBuilder(props.geo);

    let cubeCamera = new THREE.CubeCamera(1, 100000, 128 );

     // re-renders reflections every frame
    useFrame(({ gl, scene }) => {
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