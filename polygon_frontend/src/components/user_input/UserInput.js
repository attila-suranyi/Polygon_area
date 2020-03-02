import React, { useState } from "react";
import Button from "../styled_components/Button";
import SubmitVertexButton from "../styled_components/SubmitVertexButton";

const UserInput = (props) => {
    const [x, setX] = useState(0.0);
    const [y, setY] = useState(0.0);
    const [z, setZ] = useState(0.0);

    const [vertex, setVertex] = useState([0, 0, 0]);

    const inputHandler = (event) => {
        let coord = event.target.name;
        let value = event.target.value;

        switch(coord) {
            case "x":
                setX(value);
                break;
            case "y":
                setY(value);
                break;
            case "z":
                setZ(value);
                break;
        }
    };

    const submitVertex = () => {
        setVertex([x, y, z]);
        console.log(vertex);
    };

    return (
        //TODO change all divs to Fragment
        <div>
            <p>X</p>
            <input type="number"
                   name="x"
                   onChange={ inputHandler }
            />
            <p>Y</p>
            <input type="number"
                   name="y"
                   onChange={ inputHandler }
            />
            <p>Z</p>
            <input type="number"
                   name="z"
                   onChange={ inputHandler }
            />

            <br />
            <br />

            <SubmitVertexButton onClick={submitVertex}>
                Submit vertex
            </SubmitVertexButton>
        </div>
    )
};

export default UserInput;