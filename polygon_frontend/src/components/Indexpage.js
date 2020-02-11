import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Indexpage extends Component {
  render() {
    return (
      <div className="Indexpage">
        <h2>Polygon</h2>
        <Link to="/triangle" style={{ color: "#000" }}>
          Triangle
        </Link>
        <p>Tetrahedron</p>
        <p>Cube</p>
      </div>
    );
  }
}
