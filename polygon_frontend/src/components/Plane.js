import React, { useState } from "react";
import {a} from "react-spring/three";

/**
 * Basic horizontal plane with physical mesh
 */
const Plane = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -15, 0]} receiveShadow={true}>
            <planeBufferGeometry
                attach="geometry"
                args={[1000, 1000]}
            />

            <meshPhysicalMaterial
                attach="material"
                color="red"
            />
        </mesh>
    )
};

export default Plane;