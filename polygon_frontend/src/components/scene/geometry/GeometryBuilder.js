import TestGeo from "./TestGeo";
import * as THREE from "three";

/**
 * Builds up geometry object
 * @param trianglesData array with vertex coordinates
 * @returns {BufferGeometry} geometry built from faces and their vertices
 */
const GeometryBuilder = (trianglesData) => {
    const testData = TestGeo();

    let i = 0;
    let geometry = new THREE.Geometry();

    // will use data from parameter instead

    for (let triangle of trianglesData) {
    // for (let triangle of testData.triangles) {

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

export default GeometryBuilder;