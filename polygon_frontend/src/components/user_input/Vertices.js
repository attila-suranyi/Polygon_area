import React from "react";

const Vertices = (props) => {
    const vertices = props.vertices;

    return (
        <React.Fragment>
            { vertices.map(vertex =>
                <div style={style.container}>
                    <p style={style.vertex}>x: {vertex.x} y: {vertex.y} z: {vertex.z} </p>
                    <div style={style.separator} />
                    <p
                        style={style.delete}
                        onClick={ ()=> props.removeVertex(vertex.id)}>X</p>
                </div>
            )}
        </React.Fragment>
    )
};

export default Vertices;

const style = {
    container: {
        display: "flex"
    },
    vertex: {
        flex: 4
    },
    separator: {
        flex: 1
    },
    delete: {
        flex: 1,
        cursor: "pointer"
    }
};

