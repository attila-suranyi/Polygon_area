import React, {useContext} from "react";
import {extend, useFrame} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import BuildGeometry from "../geometry/BuildGeometry";
import Polygon from "./Polygon";
import {GeometryContext} from "../../context/GeometryContext";

/**
 * Builds a polygon's geometry from Vector3 data, and reflections
 */
const PolygonLoader = (props) => {
    extend({ OrbitControls });

    let [area, setArea, geometry, setGeometry] = useContext(GeometryContext);
    console.log(geometry);


    //TODO maybe use data from context ?

    // let testGeo = BuildGeometry(props.geo);
    let customGeo = BuildGeometry(geometry);

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