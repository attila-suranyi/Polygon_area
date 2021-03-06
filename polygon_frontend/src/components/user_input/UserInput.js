import React, {useEffect, useState, useRef, useContext} from "react";
import SubmitButton from "../styled_components/SubmitButton";
import Axios from "axios";
import Scene from "../scene/Scene";
import {GeometryContext} from "../context/GeometryContext";
import CoordsInput from "./CoordsInput";
import Vertices from "./Vertices";

const UserInput = (props) => {

    const {area, setArea, geometry, setGeometry} = useContext(GeometryContext);

    const xInput = useRef();
    const yInput = useRef();
    const zInput = useRef();

    const [vertices, setVertices] = useState([]);

    const submittable = vertices.length >= 3;

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
            y: y ? y : 0.0,
            z: z ? z : 0.0
        };

        setVertices(vertices => [...vertices, vertex]);
    };

    const sendData = () => {
        for (let vertex in vertices) {

        }
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
        setGeometry(null)
    }, []);

    return (
        //TODO refactor to eliminate scene code duplication
        <React.Fragment>
            <div style={style.wrapper}>
                <div style={style.wrapperMargin} />

                {/*vertices input and add button*/}
                <div style={style.inputContainer}>

                    <CoordsInput
                        onChange={inputHandler}
                        xRef={xInput}
                        yRef={yInput}
                        zRef={zInput}
                        style={style.input}
                    />

                    <div style={style.horizontalSeparator} />

                    <SubmitButton onClick={submitVertex}  style={style.sendButton}>
                        Submit vertex
                    </SubmitButton>
                    <div style={style.horizontalSeparator} />
                </div>

            <div style={style.wrapperCenter} />

                {/*vertices list and send button*/}
                <div style={style.verticesContainer}>

                    <div style={style.verticesList}>
                        <p>Added vertices:</p>
                        <div style={style.scrollSpace}>
                            { vertices ? <Vertices vertices={vertices} /> : "" }

                        </div>
                    </div>

                    <div style={style.horizontalSeparator} />

                    <SubmitButton onClick={sendData} disabled={!submittable} style={style.submitButton}>
                        Send data
                    </SubmitButton>
                    <div style={style.horizontalSeparator} />

                </div>

            <div style={style.wrapperMargin} />
            </div>

            <div>
                { geometry && area ?
                    <div>
                        <p>Custom polygon area: {area.toFixed(2)} units</p>
                        <Scene geo={geometry} />
                    </div> : ""
                }
            </div>
        </React.Fragment>
    )
};

export default UserInput;

const style = {
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 20,
        border: "2px solid #d7ddff",
        borderRadius: "10px",
        // padding: 5
    },
    input: {
        alignItems: "stretch",
        border: "2px solid lightred",
        flex: 1,
    },
    sendButton: {
        flex: 1
    },
    verticesContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flex: 20,
        border: "2px solid #d7ddff",
        borderRadius: "10px",
    },
    verticesList: {
        display: "flex",
        flexDirection: "column",
        flex: 15,
    },
    scrollSpace: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflowY: "scroll",
        flex: "10 0 0",
        // marginLeft: 10,
        // marginRight: 10,
        margin: 10
    },
    horizontalSeparator: {
        flex: 1
    },
    wrapperMargin: {
        flex: 30
    },
    wrapperCenter: {
        flex: 2
    },
    submitButton: {
        flex: 1,
        alignSelf: "center"
    }
};