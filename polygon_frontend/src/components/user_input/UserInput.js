import React, {useEffect, useState, useRef} from "react";
import Button from "../styled_components/Button";
import SubmitVertexButton from "../styled_components/SubmitVertexButton";
import Axios from "axios";
import Scene from "../scene/Scene";

const UserInput = (props) => {

    const [geometry, setGeometry] = useState(null);
    const [area, setArea] = useState(null);

    const xInput = useRef();
    const yInput = useRef();
    const zInput = useRef();

    const [vertices, setVertices] = useState([]);

    const limitToBounds = (value, bound) => {
        if (value < -bound) return -bound;
        if (bound < value) return bound;
        return value;
    };

    const inputHandler = (event) => {
        let target = event.target.name;
        let value = parseInt(event.target.value);

        switch(target) {
            case "x":
                xInput.current.value = limitToBounds(value, 100);
                break;
            case "y":
                yInput.current.value = limitToBounds(value, 100);
                break;
            case "z":
                zInput.current.value = limitToBounds(value, 100);
                break;
        }
    };

    const submitVertex = () => {
        let x = parseFloat(xInput.current.value);
        let y = parseFloat(yInput.current.value);
        let z = parseFloat(zInput.current.value);

        let vertex = {
            x: x ? x : 0.0,
            y: y ? y : 0.0 ,
            z: z ? z : 0.0
        };

        setVertices(vertices => [...vertices, vertex]);
    };

    const sendData = () => {
        let body = {
            vertices: vertices
        };

        Axios.post("http://localhost:8080/custom", body)
            .then( resp => handleResp(resp.data) )
    };

    const handleResp = (resp) => {
        console.log(resp);
        setArea(resp.area);
        setGeometry(resp.triangles);
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

            { geometry && area ?
                <div>
                    <p>Custom polygon area: {area.toFixed(2)} units</p>
                    <Scene geo={geometry} />
                </div> :
                <p>Computing polygon...</p>
            }
        </React.Fragment>
    )
};

export default UserInput;