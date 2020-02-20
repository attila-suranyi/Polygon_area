import React, {useState} from "react";
import {extend, useFrame} from "react-three-fiber";
import {a, useSpring} from "react-spring/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

/**
 * Builds a polygon mesh from Vector3 data
 */
const Polygon = (props) => {
    extend({ OrbitControls });

    const blue = "#86ace6";
    const lightblue = "#41bee6";
    const defaultScale = [3, 3, 3];
    const enlargedScale = [4.5, 4.5, 4.5];

    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const [framesOnly, setFramesOnly] = useState(false);

    const springProps = useSpring({
        scale: active ? enlargedScale : defaultScale,
        color: hovered ? lightblue : blue,
    });

    let customGeo = buildGeo(props.geo);

    let cubeCamera = new THREE.CubeCamera(1, 100000, 128 );

    useFrame(({ gl, scene }) => {
        cubeCamera.visible = false;
        cubeCamera.update(gl, scene);
        cubeCamera.visible = true;
    });

    return (
        <a.mesh
              onPointerOver={ () => setHovered(true) }
              onPointerOut={ () => setHovered(false) }

              onClick={ () => {
                  setActive(!active);
                  setFramesOnly(!framesOnly)
              }}

              scale={ springProps.scale }
              castShadow={true}
              geometry={customGeo}
        >

            <ambientLight />
            <spotLight
                position={[0, 5, 10]}
                penumbra={true}
                intensity={0.7}
                castShadow={true}
            />

            <a.meshLambertMaterial
                attach="material"
                color={ springProps.color }
                wireframe={ framesOnly }
                envMap={cubeCamera.renderTarget.texture}
                side={THREE.DoubleSide}
            />
        </a.mesh>
    );
};

export default Polygon;

//TODO maybe use data from context ?

const buildGeo = (triangleData) => {
    const testData = {
        "area": 2.0086019589572386,
        "triangles": [
            [
                [
                    0,
                    0,
                    0
                ],
                [
                    1,
                    0,
                    0
                ],
                [
                    0.5,
                    0.8659999966621399,
                    0
                ]
            ],
            [
                [
                    0,
                    0,
                    0
                ],
                [
                    0.5,
                    0.8659999966621399,
                    0
                ],
                [
                    0.5,
                    0.5,
                    1
                ]
            ],
            [
                [
                    0,
                    0,
                    0
                ],
                [
                    1,
                    0,
                    0
                ],
                [
                    0.5,
                    0.5,
                    1
                ]
            ],
            [
                [
                    1,
                    0,
                    0
                ],
                [
                    0.5,
                    0.8659999966621399,
                    0
                ],
                [
                    0.5,
                    0.5,
                    1
                ]
            ]
        ]
    };

    let i = 0;
    let geometry = new THREE.Geometry();

    for (let triangle of testData.triangles) {
    // for (let triangle of triangleData) {

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