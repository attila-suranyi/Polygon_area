import React, {useEffect, useState, useRef} from "react";
import Button from "../styled_components/Button";
import SubmitVertexButton from "../styled_components/SubmitVertexButton";
import Axios from "axios";

const UserInput = (props) => {

    const xInput = useRef();
    const yInput = useRef();
    const zInput = useRef();

    const [vertices, setVertices] = useState([]);

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

        let vertex = {
            x: x ? x : 0,
            y: y ? y : 0,
            z: z ? z : 0
        };

        setVertices(vertices => [...vertices, vertex]);
    };

    const sendData = ()=> {
        Axios.post("10.44.1.10:8080/custom", vertices)
            .then( resp => console.log(resp) )
    };


    useEffect( () => {
        console.log(vertices);
    }, [vertices]);

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

            <SubmitVertexButton onClick={sendData}>
                Send data
            </SubmitVertexButton>

            {
                vertices ? vertices.map(vertex => <p>x: {vertex.x} y: {vertex.y} z: {vertex.z}</p>)
                    : "no vertices"
            }
        </React.Fragment>
    )
};

export default UserInput;