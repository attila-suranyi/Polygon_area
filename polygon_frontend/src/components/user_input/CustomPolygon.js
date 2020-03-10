import React, {useEffect, useState, useRef, useContext} from "react";
import SubmitButton from "../styled_components/SubmitButton";
import Axios from "axios";
import Scene from "../scene/Scene";
import {GeometryContext} from "../context/GeometryContext";
import CoordsInput from "./CoordsInput";
import Vertices from "./Vertices";
import {IpContext} from "../context/IpContext";

const UserInput = (props) => {

    const {area, geometry, setGeometry, handleResp} = useContext(GeometryContext);
    const {backendIp} = useContext(IpContext);

    const xInput = useRef();
    const yInput = useRef();
    const zInput = useRef();

    const [vertices, setVertices] = useState([]);
    const [vertexId, setVertexId] = useState(0);

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
            default:
                console.log(`Incorrect key: ${target}`);
        }
    };

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

    const removeVertex = (id) => {
        let newList = vertices.filter( vertex => vertex.id !== id);
        setVertices(newList);
    };

    const sendData = () => {
        let body = {
            vertices: vertices
        };

        Axios.post(`${backendIp}/custom`, body)
            .then( resp => handleResp(resp.data) )
    };

    useEffect( () => {
        setGeometry(null)
    }, []);

    return (
        //TODO refactor to eliminate scene code duplication,
        // break down to smaller components, decouple styling
        <React.Fragment>
            <div style={style.wrapper}>
                <div style={style.wrapperMargin} />

                {/*vertices input and add button*/}
                <CoordsInput
                    xRef={xInput}
                    yRef={yInput}
                    zRef={zInput}
                    onChange={inputHandler}
                    submitVertex={submitVertex}
                />

                <div style={style.wrapperCenter} />

                {/*vertices list and send button*/}
                <div style={style.verticesContainer}>

                    <div style={style.verticesList}>
                        <p>Added vertices:</p>
                        <div style={style.scrollSpace}>
                            { vertices ? <Vertices vertices={vertices} removeVertex={removeVertex} /> : "" }
                        </div>
                    </div>

                    <div style={style.horizontalSeparator} />

                    <SubmitButton onClick={sendData} disabled={!submittable} style={style.submitButton}>
                        Generate polygon
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
    //TODO use colors via Theme
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        height: "20em"
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
        marginLeft: 10,
        marginRight: 10
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
        alignSelf: "center",
        width: "12em"
    }
};