import React from "react";
import StyledLink from "../styled_components/StyledLink";

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
