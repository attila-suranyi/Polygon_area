import React from "react";
import { Link } from "react-router-dom";

const IndexPage = ()=> {
    return (
        <div className="index-page">
            <h1>Polygon</h1>
            <Link to="/triangle" style={{color: "#000"}}>
                Triangle
            </Link>
            <br/>
            <Link to="/tetrahedron" style={{color: "#000"}}>
                Tetrahedron
            </Link>
            <br/>
            <Link to="/cube" style={{color: "#000"}}>
                Cube
            </Link>
        </div>
    );
};

export default IndexPage;
