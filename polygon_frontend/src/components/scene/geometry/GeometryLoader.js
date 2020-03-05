import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
import Scene from "../Scene";
import {GeometryContext} from "../../context/GeometryContext";
import BuildGeometry from "../geometry/BuildGeometry";
import {IpContext} from "../../context/IpContext";

/**
 * Requests shape vertex data from backend and builds a PolygonLoader component from it
 * @param props the backend ip and the shape type
 */
const GeometryLoader = (props) => {

    const {area, setArea, geometry, setGeometry} = useContext(GeometryContext);
    const [backendIp, setBackendIp] = useContext(IpContext);

    /**
     * Fetches and handles shape data from backend
     */
    const fetchPolygonData = () => {
        Axios.get(`${backendIp}/${props.shapeType}`)
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

        {/*use this when the server is up!*/}
            { geometry && area ?
                <div>
                    <p>{props.shapeType} area: {area.toFixed(2)} units</p>
                    <Scene geo={geometry}/>
                    {/*NOTE: React's context cannot be shared across renderers (e.g. Canvas), therefore*/}
                    {/*the geometry needs to be passed as prop here.*/}
                </div> :
                <p>Fetching {props.shapeType} data...</p>
            }

             {/*<Scene geo={geometry} />*/}

        </div>
    )
};

export default GeometryLoader;