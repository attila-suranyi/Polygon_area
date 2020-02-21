import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import PolygonLoader from "./components/scene/PolygonLoader";
import Navbar from "./components/menu/Navbar";
import { ThemeProvider } from "styled-components";
import Theme from "./components/styled_components/themes/Theme"


function App() {
    // const backendIp = "http://localhost:8080";
    const backendIp = "10.44.255.255:8080";

    return (
        <div className="App">
            <ThemeProvider theme={Theme.main}>
                <Router>
                    <Navbar/>

                    <Route path="/triangle">
                        <PolygonLoader shapeType="triangle" backendIp={backendIp}/>
                    </Route>

                    <Route path="/tetrahedron">
                        <PolygonLoader shapeType="tetrahedron" backendIp={backendIp}/>
                    </Route>

                    <Route path="/cube">
                        <PolygonLoader shapeType="cube" backendIp={backendIp}/>
                    </Route>

                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
