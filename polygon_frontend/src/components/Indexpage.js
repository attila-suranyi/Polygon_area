import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Indexpage extends Component {
  render() {
    return (
      <div className="Indexpage">
        <h1>Polygon</h1>
        <Link to="/triangle" style={{ color: "#000" }}>
          Triangle
        </Link><br></br>
        <Link to="/tetrahedron" style={{ color: "#000" }}>
          Tetrahedron
        </Link><br></br>
        <Link to="/cube" style={{ color: "#000" }}>
          Cube
        </Link>
      </div>
    );
  }
}
