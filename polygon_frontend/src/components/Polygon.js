import React, { Component } from "react";
import Axios from "axios";
import Graphics from "./Graphics";

export default class Polygon extends Component {
  state = {
    backendIp: "http://localhost:8080",
    area: null,
    geometry: [],

    fetchPolygonData: () => {
      Axios.get(`${this.state.backendIp}/${this.props.shapeType}`).then(res =>
        this.setState({
          area: res.data.area,
          geometry: res.data.vertexCoordinates
        })
      );
    }
  };

  componentDidMount() {
    this.state.fetchPolygonData();
  }

  render() {
    return (
      <div className="Polygon">
        <p>{this.props.shapeType}</p>
        {this.state.area ? (
          <>
            <p>{this.state.area}</p>
            <Graphics geometry={this.state.geometry}/>
          </>
        ) : (
          <p>Fetching...</p>
        )}
      </div>
    );
  }
}
