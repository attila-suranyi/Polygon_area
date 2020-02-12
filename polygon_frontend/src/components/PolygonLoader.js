import React, {useRef, useState, useEffect} from "react";
import 
import Axios from "axios";

const Polygon = (props) => {
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
        </div>
    );
};

export default Polygon;
