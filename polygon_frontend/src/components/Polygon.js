import React, { Component } from "react";

export default class Polygon extends Component {
  state = {
    shapeType: ""
  };

  render() {
    return (
        <div className="Polygon">
            <p>{this.state.shapeType}</p>
        </div>
    );
  }
}
