import React, {useContext} from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GeometryLoader from "./components/scene/geometry/GeometryLoader";
import Navbar from "./components/menu/Navbar";
import { ThemeProvider } from "styled-components";
import Theme from "./components/styled_components/themes/Theme";
import UserInput from "./components/user_input/UserInput"
import {GeometryProvider} from "./components/context/GeometryContext";
import {IpContext, IpProvider} from "./components/context/IpContext";

function App() {

  const {setBackendIp} = useContext(IpContext);
  //localhost by default, edit here if needed

  // const myIp = "https://myip:8080";
  // setBackendIp(myIp);

  return (
    <div className="App">
      <ThemeProvider theme={Theme.main}>
        <Router>
          <Navbar />

          <IpProvider>
            <GeometryProvider>
              <Route path="/triangle">
                <GeometryLoader shapeType="triangle" />
              </Route>

              <Route path="/tetrahedron">
                <GeometryLoader shapeType="tetrahedron" />
              </Route>

              <Route path="/icosahedron">
                <GeometryLoader shapeType="icosahedron" />
              </Route>

              <Route path="/custom">
                <UserInput />
              </Route>
            </GeometryProvider>
          </IpProvider>

        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
