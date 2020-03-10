import React from "react";
import styled from "styled-components";
import Separator from "../styled_components/Separator";

/**
 * The vertices list stored in context
 * @returns {*} The vertices as separate components
 */
const Vertices = (props) => {
    const vertices = props.vertices;

    return (
        <React.Fragment>
            { vertices.map(vertex =>
                <Container key={vertex.id}>
                    <Vertex>x: {vertex.x} y: {vertex.y} z: {vertex.z} </Vertex>
                    <Separator />

                    <Delete onClick={ ()=> props.removeVertex(vertex.id)} > X </Delete>
                </Container>
            )}
        </React.Fragment>
    )
};

export default Vertices;

const Container = styled.div`
    display: flex;
`;

const Vertex = styled.p`
    flex: 4;
`;

const Delete = styled.p`
    flex: 1;
    cursor: pointer;
`;

