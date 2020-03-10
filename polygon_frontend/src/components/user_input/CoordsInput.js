import React, {useContext, useRef} from "react";
import SubmitButton from "../styled_components/SubmitButton";
import {GeometryContext} from "../context/GeometryContext";
import Separator from "../styled_components/Separator";
import styled from "styled-components";

/**
 * Reads vertex coordinates entered by the user and saves them to context
 */
const CoordsInput = () => {

    //TODO why is vertices unused?
    const {vertices, setVertices, vertexId, setVertexId} = useContext(GeometryContext);

    const xInput = useRef();
    const yInput = useRef();
    const zInput = useRef();

    const limitToBounds = (value) => {
        let bound = 100;
        if (value < -bound) return -bound;
        if (bound < value) return bound;
        return value;
    };

    const inputHandler = (event) => {
        let target = event.target.name;
        let value = parseInt(event.target.value);

        switch(target) {
            case "x":
                xInput.current.value = limitToBounds(value);
                break;
            case "y":
                yInput.current.value = limitToBounds(value);
                break;
            case "z":
                zInput.current.value = limitToBounds(value);
                break;
            default:
                console.log(`Incorrect key: ${target}`);
        }
    };

    /**
     * Adds vertex to the vertices list
     */
    const submitVertex = () => {
        let x = parseFloat(xInput.current.value) / 100;
        let y = parseFloat(yInput.current.value) / 100;
        let z = parseFloat(zInput.current.value) / 100;

        let vertex = {
            id: vertexId,
            x: x ? x : 0.0,
            y: y ? y : 0.0,
            z: z ? z : 0.0
        };

        setVertices(vertices => [...vertices, vertex]);
        setVertexId(vertexId+1);
    };

    return (
        <InputContainer>

            <InputFields>
                <div>
                    <p>X</p>
                    <input type="number"
                           name="x"
                           onChange={ inputHandler }
                           ref={xInput}
                    />
                </div>

                <div>
                    <p>Y</p>
                    <input type="number"
                           name="y"
                           onChange={ inputHandler }
                           ref={yInput}
                    />
                </div>

                <div>
                    <p>Z</p>
                    <input type="number"
                           name="z"
                           onChange={ inputHandler }
                           ref={zInput}
                    />
                </div>
            </InputFields>


            <Separator />

            <ButtonWrapper>
                <SubmitButton onClick={submitVertex} > Submit vertex </SubmitButton>
            </ButtonWrapper>

            <Separator />
        </InputContainer>
    )
};

export default CoordsInput;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 20;
    border: 2px solid ${props => props.theme.primary};
    border-radius: 10px;
`;

const InputFields = styled.div`
    align-items: stretch;
    flex: 1;
`;

const ButtonWrapper = styled.div`
    flex: 1;
`;