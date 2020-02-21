import React from "react";
import { ThemeProvider } from "styled-components";
import Header from "./Header";
import Nav from "../styled_components/Nav"
import StyledLink from "../styled_components/StyledLink";
import MainTheme from "../styled_components/themes/MainTheme";
import Button from "../styled_components/Button";

const Navbar = (props) => {

    return (
        <ThemeProvider theme={MainTheme}>
            <Header />

            <Nav primary >
                <StyledLink to="/triangle">
                    <Button> Triangle </Button>
                </StyledLink>

                <StyledLink to="/tetrahedron">
                    <Button> Tetrahedron </Button>
                </StyledLink>

                <StyledLink to="/cube">
                    <Button> Cube </Button>
                </StyledLink>
            </Nav>
        </ThemeProvider>
    );
};

export default Navbar;
