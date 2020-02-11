import React, { Component } from "react";
import * as THREE from 'three';

export default class Graphics extends Component {

  render3DShape(vertexCoordinates) {

    //SCENE
    const scene = new THREE.Scene();

    //CAMERA
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );

    //RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    //this connects JS and DOM
    //document.body.appendChild( renderer.domElement );

    let material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    const geometry = new THREE.Geometry();

    let shapeLength = vertexCoordinates.length;

    // in case of triangle
    if (shapeLength % 2 === 1) {
        for (let triangle of vertexCoordinates) {
            for (let vertexCoordinate of triangle) {
                geometry.vertices.push(new THREE.Vector3((vertexCoordinate[0] * 50), (vertexCoordinate[1] * 50), (vertexCoordinate[2] * 50)));
            }
        }
        geometry.vertices.push(new THREE.Vector3((vertexCoordinates[0][0] * 50), (vertexCoordinates[0][1] * 50), (vertexCoordinates[0][2] * 50)))

        // in case of tetrahedron, and cube
    } else {
        for (let triangle of vertexCoordinates) {
            for (let vertexCoordinate of triangle) {
                geometry.vertices.push(new THREE.Vector3((vertexCoordinate[0] * 50) - 25, (vertexCoordinate[1] * 50) - 25, (vertexCoordinate[2] * 50) - 25));
            }
        }
    }

    let line = new THREE.Line( geometry, material );

    scene.add( line );
    renderer.render( scene, camera );

    const animate = function () {
        requestAnimationFrame( animate );

        line.rotation.x += 0.01;
        line.rotation.y += 0.01;

        renderer.render( scene, camera );
    };
    animate();

    // ??? maybe change the order
    return renderer.domElement;
  }

  componentDidMount() {
    return this.render3DShape(this.props.geometry);
  }

  render() {
    return (
      <div className="Graphics">
        {this.componentDidMount}
      </div>
    );
  }
}
