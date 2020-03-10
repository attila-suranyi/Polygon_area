import React from "react";
import Header from "./Header";

import Nav from "../styled_components/Nav"
import StyledLink from "../styled_components/StyledLink";
import Button from "../styled_components/Button";

const Navbar = () => {

    return (
        <React.Fragment>
            <Header />

            <Nav>
                <StyledLink to="/triangle">
                    <Button> Triangle </Button>
                </StyledLink>

                <StyledLink to="/tetrahedron">
                    <Button> Tetrahedron </Button>
                </StyledLink>

                <StyledLink to="/icosahedron">
                    <Button> Icosahedron </Button>
                </StyledLink>

                <StyledLink to="/custom">
                    <Button> Custom polygon </Button>
                </StyledLink>
            </Nav>
        </React.Fragment>
    );
};

export default Navbar;
