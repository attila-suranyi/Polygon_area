import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Indexpage extends Component {
  render() {
    return (
        <div className="Indexpage">
            <h2>Polygon</h2>
            <p as={Link} to="/trangle">Triangle</p>
            <p>Tetrahedron</p>
            <p>Cube</p>
        </div>
    );
  }
}
