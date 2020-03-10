import React, {useEffect, useState, useRef, useContext} from "react";
import {GeometryContext} from "../context/GeometryContext";
import CoordsInput from "./CoordsInput";
import CoordsList from "./CoordsList";
import GeometryLoader from "../scene/geometry/GeometryLoader";

const CustomPolygon = () => {

    const { area, geometry, setGeometry } = useContext(GeometryContext);

    useEffect( () => {
        setGeometry(null)
    }, []);

    return (
        <React.Fragment>
            <div style={style.wrapper}>
                <div style={style.wrapperMargin} />

                {/*vertices input and add vertex button*/}
                <CoordsInput />

                <div style={style.wrapperCenter} />

                {/*vertices list and send data button*/}
                <CoordsList />

                <div style={style.wrapperMargin} />
            </div>

            { geometry && area ? <GeometryLoader shapeType="custom" /> : ""}
        </React.Fragment>
    )
};

export default CustomPolygon;

const style = {
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        height: "20em"
    },
    horizontalSeparator: {
        flex: 1
    },
    wrapperMargin: {
        flex: 30
    },
    wrapperCenter: {
        flex: 2
    },
};