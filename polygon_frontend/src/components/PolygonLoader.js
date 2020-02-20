import React, {useRef, useState, useEffect} from "react";
import Axios from "axios";
import Scene from "./Scene";

/**
 * Requests shape vertex data from backend and builds a Polygon component from it
 * @param props the backend ip and the shape type
 */
const PolygonLoader = (props) => {
    const [area, setArea] = useState(null);
    const [geometry, setGeometry] = useState([]);

    /**
     * Fetches and handles shape data from backend
     */
    const fetchPolygonData = () => {
        Axios.get(`${props.backendIp}/${props.shapeType}`)
            .then( resp => handleResp(resp.data)
        )
    };

    /**
     * Sets the vertex coordinates
     * @param resp The response data fetched from backend
     */
    const handleResp = (resp) => {
        setArea(resp.area);
        setGeometry(resp.vertexCoordinates);
    };

    useEffect(() => {
        fetchPolygonData();
    }, []);

    return (
        <div className="scene-container" >
            <p>{props.shapeType}</p>
            {area ? <p>{area}</p> : <p>Fetching...</p>}

            {/*//TODO use context instead of props*/}
            <Scene geo={geometry} />

        </div>
    )
};

export default PolygonLoader;