import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import IndexPage from "./components/IndexPage";
import Polygon from "./components/Polygon";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route path="/triangle">
          <Polygon shapeType="triangle" />
        </Route>
      </Router>
    </div>
  );
}

export default App;
