import React, { useState } from "react";

const Plane = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
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