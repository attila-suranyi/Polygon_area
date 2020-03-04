import React, {useContext} from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GeometryLoader from "./components/scene/geometry/GeometryLoader";
import Navbar from "./components/menu/Navbar";
import { ThemeProvider } from "styled-components";
import Theme from "./components/styled_components/themes/Theme";
import UserInput from "./components/user_input/UserInput"
import {GeometryContext, GeometryProvider} from "./components/context/GeometryContext";

function App() {
  const backendIp = "http://localhost:8080";
  //const backendIp = "10.44.255.255:8080";

  const geoData = useContext(GeometryContext);

  return (
    <div className="App">
      <ThemeProvider theme={Theme.main}>
        <Router>
          <Navbar />

          <GeometryProvider>

            <Route path="/triangle">
              <GeometryLoader shapeType="triangle" backendIp={backendIp} />
            </Route>

            <Route path="/tetrahedron">
              <GeometryLoader shapeType="tetrahedron" backendIp={backendIp} />
            </Route>

            <Route path="/icosahedron">
              <GeometryLoader shapeType="icosahedron" backendIp={backendIp} />
            </Route>

            <Route path="/custom">
              <UserInput />
            </Route>

          </GeometryProvider>

        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
