import React, {Component, useState, useEffect} from "react";
import Axios from "axios";

const Polygon = (props) => {
    const backendIp = "http://localhost:8080";

    const [area, setArea] = useState(null);
    const [geometry, setGeometry] = useState([]);

    const fetchPolygonData = () => {
        Axios.get(`${backendIp}/${props.shapeType}`)
            .then( resp =>
                handleResp(resp.data)
            )
    };

    useEffect(() => {
        fetchPolygonData();
    }, []);

    const handleResp = resp => {
        setArea(resp.area);
        setGeometry(resp.vertexCoordinates);
    };

    return (
        <div className="Polygon">
            <p>{props.shapeType}</p>
            {area ? <p>{area}</p> : <p>Fetching...</p>}
        </div>
    );
};

export default Polygon;
