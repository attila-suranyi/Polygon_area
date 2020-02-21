import React from "react";
import { Link } from "react-router-dom";
import StyledLink from "../styled_components/StyledLink";
import Nav from "../styled_components/Nav";

const Header = () => {
    return (
        <div className="index-page">
            <h1>
                <StyledLink to="/"> Polygon </StyledLink>
            </h1>
        </div>
    );
};

export default Header;
