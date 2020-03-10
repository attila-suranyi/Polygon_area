import React, {useContext} from "react";
import SubmitButton from "../styled_components/SubmitButton";
import Vertices from "./Vertices";
import Axios from "axios";
import {IpContext} from "../context/IpContext";
import {GeometryContext} from "../context/GeometryContext";

const CoordsList = (props) => {
    const {backendIp} = useContext(IpContext);
    const {handleResp} = useContext(GeometryContext);

    const sendData = () => {
        let body = {
            vertices: props.vertices
        };

        Axios.post(`${backendIp}/custom`, body)
            .then( resp => handleResp(resp.data) )
    };

    return (
        <div style={style.verticesContainer}>
            <div style={style.verticesList}>
                <p>Added vertices:</p>
                <div style={style.scrollSpace}>
                    { props.vertices ? <Vertices vertices={props.vertices} removeVertex={props.removeVertex} /> : "" }
                </div>
            </div>

            <div style={style.horizontalSeparator} />

            <SubmitButton onClick={sendData} disabled={!props.submittable} style={style.submitButton}>
                Generate polygon
            </SubmitButton>

            <div style={style.horizontalSeparator} />
        </div>
    )
};

export default CoordsList;

const style = {
    //TODO use colors via Theme
    verticesContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flex: 20,
        border: "2px solid #d7ddff",
        borderRadius: "10px",
    },
    horizontalSeparator: {
        flex: 1
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
    submitButton: {
        flex: 1,
        alignSelf: "center",
        width: "12em"
    }
};