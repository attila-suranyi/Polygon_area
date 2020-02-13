import React, { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";

const Controls = () => {
    const orbitRef = useRef();
    const { camera, gl } = useThree();

    useFrame( () => {
        orbitRef.current.update();
    });

    return (
        <orbitControls
            ref={orbitRef}
            args={ [camera, gl.domElement] }
            autoRotate={true}
            autoRotateSpeed={3}
            enableDamping={true}
            dampingFactor={0.03}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={(Math.PI / 3) - 0.5}
            maxPolarAngle={(Math.PI / 3) + 1.5}
            zoomSpeed={0.7}
        />
    )
};

export default Controls;