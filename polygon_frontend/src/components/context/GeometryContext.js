import React, {useState, createContext} from "react";
import {scrollToBottom} from "../../Util";

export const GeometryContext = createContext([]);

export const GeometryProvider = (props) => {

    const [area, setArea] = useState(null);
    const [geometry, setGeometry] = useState(null);
    const [vertices, setVertices] = useState([]);
    const [vertexId, setVertexId] = useState(0);

    /**
     * Sets the vertex coordinates
     * @param resp The response data fetched from backend
     */
    const handleResp = (resp) => {
        // console.log(resp);
        setArea(resp.area);
        setGeometry(resp.triangles);

        scrollToBottom();
    };

    const geoHandler = {
        area, setArea,
        geometry, setGeometry,
        vertices, setVertices,
        vertexId, setVertexId,
        handleResp
    };

    return (
        <GeometryContext.Provider value={geoHandler} >
            {props.children}
        </GeometryContext.Provider>
    )
};

