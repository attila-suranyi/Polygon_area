import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const black = {
        color: "#000"
    };

    return (
        <div className="navbar">
            <Link to={"/"} style={black}> Home </Link>
            <br/>
            <br/>

            <Link to="/triangle" style={black}> Triangle </Link>
            <br/>

            <Link to="/tetrahedron" style={black}> Tetrahedron </Link>
            <br/>

            <Link to="/icosahedron" style={black}> Icosahedron </Link>
        </div>
    );
};

export default Navbar;