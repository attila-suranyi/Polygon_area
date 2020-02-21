import React from "react";
import { Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Header";
import Nav from "./styled_components/Nav"
import StyledLink from "./styled_components/StyledLink";

const mainTheme = {
    name: "Main theme",
    primary: "#58ee51",
    secondary: "#78eed3"
};

const Navbar = (props) => {

    return (
        <ThemeProvider theme={mainTheme}>
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
