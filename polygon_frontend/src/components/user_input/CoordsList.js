import React, {useContext} from "react";
import SubmitButton from "../styled_components/SubmitButton";
import Vertices from "./Vertices";
import Axios from "axios";
import {IpContext} from "../context/IpContext";
import {GeometryContext} from "../context/GeometryContext";
import Separator from "../styled_components/Separator";
import styled from "styled-components";

const CoordsList = () => {

    const {backendIp} = useContext(IpContext);
    const {vertices, setVertices, handleResp} = useContext(GeometryContext);

    const submittable = vertices.length >= 3;

    const removeVertex = (id) => {
        let newList = vertices.filter( vertex => vertex.id !== id);
        setVertices(newList);
    };

    const sendData = () => {
        let body = {
            vertices: vertices
        };

        Axios.post(`${backendIp}/custom`, body)
            .then( resp => handleResp(resp.data) )
    };

    return (
        <VerticesContainer>
            <VerticesList>
                <p>Added vertices:</p>
                <ScrollSpace>
                    { vertices ? <Vertices vertices={vertices} removeVertex={removeVertex} /> : "" }
                </ScrollSpace>
            </VerticesList>

            <Separator />

            <ButtonWrapper>
                <SubmitButton onClick={sendData} disabled={!submittable} > Generate polygon </SubmitButton>
            </ButtonWrapper>

            <Separator />
        </VerticesContainer>
    )
};

export default CoordsList;

const VerticesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 20;
    border: 2px solid ${props => props.theme.primary};
    border-radius: 10px;
`;

const VerticesList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 15;
`;

const ScrollSpace = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow-y: scroll;
    flex: 10 0 0;
    margin-left: 10%;
    margin-right: 10%;
`;

const ButtonWrapper = styled.div`
    flex: 1;
    align-self: center;
`;

