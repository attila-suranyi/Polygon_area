import React, {useEffect, useContext} from "react";
import Axios from "axios";
import Scene from "../Scene";
import {GeometryContext} from "../../context/GeometryContext";
import {IpContext} from "../../context/IpContext";
import {scrollToBottom} from "../../../Util";

/**
 * Requests shape vertex data from backend and builds a PolygonLoader component from it
 * @param props the backend ip and the shape type
 */
const GeometryLoader = (props) => {

    const {area, setArea, geometry, setGeometry} = useContext(GeometryContext);
    const {backendIp} = useContext(IpContext);

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
        // console.log(resp);
        setArea(resp.area);
        setGeometry(resp.triangles);

        scrollToBottom();
    };

    useEffect(() => {
        fetchPolygonData();
    }, []);

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
                <p>Waiting for server...</p>
            }

             {/*<Scene geo={geometry} />*/}

        </div>
    )
};

export default GeometryLoader;