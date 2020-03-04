import React, {useState, createContext} from "react";


export const GeometryContext = createContext([]);

export const GeometryProvider = (props) => {

    const [area, setArea] = useState(null);
    const [geometry, setGeometry] = useState(null);

    const geoData = [area, setArea, geometry, setGeometry];

    return (
        <GeometryContext.Provider value={geoData} >
            {props.children}
        </GeometryContext.Provider>
    )
};

