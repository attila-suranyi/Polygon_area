import {a, useSpring} from "react-spring/three";
import * as THREE from "three";
import React, {useState} from "react";

/**
 * A colored 3D polygon mesh with shadows
 * @param props geometry and reflections
 * @returns {*} A colored 3D polygon mesh with shadows
 */
const Polygon = (props) => {

    const blue = "#86ace6";
    const lightblue = "#41bee6";
    const defaultScale = [3, 3, 3];
    const enlargedScale = [4.5, 4.5, 4.5];

    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const [edgesOnly, setEdgesOnly] = useState(false);

    const springProps = useSpring({
        scale: active ? enlargedScale : defaultScale,
        color: hovered ? lightblue : blue,
    });

    return (
        <a.mesh
            onPointerOver={ () => setHovered(true) }
            onPointerOut={ () => setHovered(false) }

            onClick={ () => {
                setActive(!active);
                setEdgesOnly(!edgesOnly)
            }}

            scale={ springProps.scale }
            castShadow={true}
            geometry={ props.geo }
        >
            <a.meshLambertMaterial
                attach="material"
                color={ springProps.color }
                wireframe={ edgesOnly }
                envMap={ props.reflection }
                side={ THREE.DoubleSide }
            />
        </a.mesh>
    )
};

export default Polygon;