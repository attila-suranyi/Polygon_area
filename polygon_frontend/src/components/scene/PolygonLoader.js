import React, {useEffect, useState} from "react";
import {extend, useFrame} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import TestGeo from "./TestGeo";
import Polygon from "./Polygon";

/**
 * Builds a polygon's reflections and geometry from Vector3 data
 */
const PolygonLoader = (props) => {
    extend({ OrbitControls });

    //TODO maybe use data from context ?
    let customGeo = buildGeo(props.geo);

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

/**
 *
 * @param trianglesData array with vertex coordinates
 * @returns {BufferGeometry} geometry built from faces and their vertices
 */
const buildGeo = (trianglesData) => {
    const testData = TestGeo();

    let i = 0;
    let geometry = new THREE.Geometry();

    // will use data from parameter instead
    // for (let triangle of trianglesData) {
    for (let triangle of testData.triangles) {

        for (let vertex of triangle) {
            geometry.vertices.push(new THREE.Vector3(vertex[0], vertex[1], vertex[2]))
        }

        geometry.faces.push(new THREE.Face3(i, i+1, i+2));

        i += 3;
    }

    geometry.normalize();
    geometry.computeFlatVertexNormals();

    return new THREE.BufferGeometry().fromGeometry(geometry);
};