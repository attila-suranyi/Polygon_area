import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
import Scene from "../Scene";

import {GeometryContext, GeometryProvider} from "../../context/GeometryContext";

/**
 * Requests shape vertex data from backend and builds a PolygonLoader component from it
 * @param props the backend ip and the shape type
 */
const GeometryLoader = (props) => {

    // const [area, setArea] = useState(null);
    // const [geometry, setGeometry] = useState(null);

    const [area, setArea, geometry, setGeometry] = useContext(GeometryContext);

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
        console.log(resp);
        setArea(resp.area);
        setGeometry(resp.triangles);

        scrollToBottom();
        //TODO use GeometryBuilder and scroll down here instead
    };

    /**
     *  Scrolls down to bottom to focus on the canvas
     */
    const scrollToBottom = () => {
        window.scrollTo(0,document.body.scrollHeight);
    };

    useEffect(() => {
        fetchPolygonData();
    }, []);

    useEffect( () => {
        console.log(geometry);
    }, [geometry]);

    return (
        <div className="scene-container" >

            {/*//TODO use context instead of props*/}

        {/*use this when the server is up!*/}
            { geometry && area ?
                <div>
                    <p>{props.shapeType} area: {area.toFixed(2)} units</p>
                    <Scene />
                </div> :
                <p>Fetching {props.shapeType} data...</p>
            }

             {/*<Scene geo={geometry} />*/}

        </div>
    )
};

export default GeometryLoader;