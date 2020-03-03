import React, {useEffect, useState, useRef} from "react";
import Button from "../styled_components/Button";
import SubmitVertexButton from "../styled_components/SubmitVertexButton";

const UserInput = (props) => {

    const xInput = useRef();
    const yInput = useRef();
    const zInput = useRef();

    const [vertex, setVertex] = useState([0, 0, 0]);

    const limitToBounds = (value) => {
        if (value < -100) return -100;
        if (100 < value) return 100;
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
        }
    };

    const submitVertex = () => {
        let x = parseInt(xInput.current.value);
        let y = parseInt(yInput.current.value);
        let z = parseInt(zInput.current.value);
        setVertex([x, y, z]);
    };


    useEffect( () => {
        console.log(vertex);
    }, [vertex]);

    return (
        //TODO change all divs to Fragment
        <React.Fragment>
            <p>X</p>
            <input type="number"
                   name="x"
                   onChange={ inputHandler }
                   ref={xInput}
            />
            <p>Y</p>
            <input type="number"
                   name="y"
                   onChange={ inputHandler }
                   ref={yInput}
            />
            <p>Z</p>
            <input type="number"
                   name="z"
                   onChange={ inputHandler }
                   ref={zInput}
            />

            <br />
            <br />

            <SubmitVertexButton onClick={submitVertex}>
                Submit vertex
            </SubmitVertexButton>
        </React.Fragment>
    )
};

export default UserInput;