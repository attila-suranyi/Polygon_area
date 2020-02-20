import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Header from "./components/Header";
import PolygonLoader from "./components/PolygonLoader";
import Navbar from "./components/Navbar";

function App() {
    const backendIp = "http://localhost:8080";

    return (
        <div className="App">
            <Header/>

            <Router>
                <Navbar/>

                <Route path="/triangle">
                    <PolygonLoader shapeType="Triangle" backendIp={backendIp}/>
                </Route>

                <Route path="/tetrahedron">
                    <PolygonLoader shapeType="Tetrahedron" backendIp={backendIp}/>
                </Route>

                <Route path="/cube">
                    <PolygonLoader shapeType="Cube" backendIp={backendIp}/>
                </Route>

            </Router>
        </div>
    );
}

export default App;
