import React from "react";
import { ThemeProvider } from "styled-components";
import Header from "./Header";
import Nav from "../styled_components/Nav"
import StyledLink from "../styled_components/StyledLink";
import MainTheme from "../styled_components/themes/MainTheme";

const Navbar = (props) => {

    return (
        <ThemeProvider theme={MainTheme}>
            <Header />

            <Nav primary >

                <StyledLink to="/"> Home </StyledLink>
                <br/>
                <br/>

                <StyledLink to="/triangle"> Triangle </StyledLink>

                <br/>

                <StyledLink to="/tetrahedron"> Tetrahedron </StyledLink>

                <br/>
                <StyledLink to="/cube"> Cube </StyledLink>

            </Nav>
        </ThemeProvider>
    );
};

export default Navbar;
