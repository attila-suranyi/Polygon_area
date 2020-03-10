import React, {useEffect, useContext} from "react";
import {GeometryContext} from "../context/GeometryContext";
import CoordsInput from "./CoordsInput";
import CoordsList from "./CoordsList";
import GeometryLoader from "../scene/geometry/GeometryLoader";
import styled from "styled-components";

/**
 * Builds polygon using custom vertices read from user input
 */
const CustomPolygon = () => {

    const { area, geometry, setGeometry } = useContext(GeometryContext);

    useEffect( () => {
        setGeometry(null)
    }, []);

    return (
        <React.Fragment>
            <Wrapper>
                <WrapperMargin />

                {/*vertices input and add vertex button*/}
                <CoordsInput />

                <WrapperCenter />

                {/*vertices list and send data button*/}
                <CoordsList />

                <WrapperMargin />
            </Wrapper>

            { geometry && area ? <GeometryLoader shapeType="custom" /> : ""}
        </React.Fragment>
    )
};

export default CustomPolygon;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    height: 20em;
`;

const WrapperMargin = styled.div`
    flex: 30;
`;

const WrapperCenter = styled.div`
    flex: 2;
`;