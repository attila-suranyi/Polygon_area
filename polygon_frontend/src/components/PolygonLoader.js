import React, {useRef, useState, useEffect} from "react";
import Axios from "axios";
import Polygon from "./Polygon";

const PolygonLoader = (props) => {
    const [area, setArea] = useState(null);
    const [geometry, setGeometry] = useState([]);

    const fetchPolygonData = () => {
        Axios.get(`${props.backendIp}/${props.shapeType}`)
            .then( resp => handleResp(resp.data)
        )
    };

    const handleResp = (resp) => {
        setArea(resp.area);
        setGeometry(resp.vertexCoordinates);
    };

    useEffect(() => {
        fetchPolygonData();
    }, []);

    return (
        <div className="Polygon">
            <p>{props.shapeType}</p>
            {area ? <p>{area}</p> : <p>Fetching...</p>}

            <Polygon />

        </div>
    )
};

export default PolygonLoader;