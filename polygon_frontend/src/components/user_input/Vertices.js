import React from "react";

const Vertices = (props) => {
    const vertices = props.vertices;

    return (
        <React.Fragment>
            { vertices.map(vertex => <p>x: {vertex.x} y: {vertex.y} z: {vertex.z}</p>) }
        </React.Fragment>
    )
};

export default Vertices;