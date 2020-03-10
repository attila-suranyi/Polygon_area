import React, {useEffect, useContext} from "react";
import Axios from "axios";
import Scene from "../Scene";
import {GeometryContext} from "../../context/GeometryContext";
import {IpContext} from "../../context/IpContext";

/**
 * Requests shape vertex data from backend and builds a PolygonLoader component from it
 * @param props the backend ip and the shape type
 */
const GeometryLoader = (props) => {

    const {area, geometry, handleResp} = useContext(GeometryContext);
    const {backendIp} = useContext(IpContext);

    /**
     * Fetches and handles shape data from backend
     */
    const fetchPolygonData = () => {
        Axios.get(`${backendIp}/${props.shapeType}`)
            .then( resp => handleResp(resp.data)
        )
    };

    useEffect(() => {
        fetchPolygonData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="scene-container" >

            { geometry && area ?
                <div>
                    <p>Area: {area.toFixed(2)} units</p>
                    <Scene geo={geometry}/>
                    {/*NOTE: React's context cannot be shared across renderers (e.g. Canvas), therefore*/}
                    {/*the geometry needs to be passed as prop here.*/}
                </div> :
                <p>Waiting for server...</p>
            }

        </div>
    )
};

export default GeometryLoader;