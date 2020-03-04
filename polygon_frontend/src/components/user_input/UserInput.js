import React, {useEffect, useState, useRef, useContext} from "react";
import SubmitVertexButton from "../styled_components/SubmitVertexButton";
import Axios from "axios";
import Scene from "../scene/Scene";
import {GeometryContext} from "../context/GeometryContext";

const UserInput = (props) => {

    const {area, setArea, geometry, setGeometry} = useContext(GeometryContext);

    const xInput = useRef();
    const yInput = useRef();
    const zInput = useRef();

    const [vertices, setVertices] = useState([]);

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
        }
    };

    const submitVertex = () => {
        let x = parseFloat(xInput.current.value) / 100;
        let y = parseFloat(yInput.current.value) / 100;
        let z = parseFloat(zInput.current.value) / 100;

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

        //TODO use backend ip here
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
        //TODO refactor to eliminate scene code duplication
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