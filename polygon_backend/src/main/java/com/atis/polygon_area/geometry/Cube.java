package com.atis.polygon_area.geometry;

import org.springframework.stereotype.Component;

@Component
public class Cube extends Polygon {

    public Cube() {
        int vertexId = 1;

        vertices.add(new Vertex(0d, 0, 0, vertexId++));  //0
        vertices.add(new Vertex(1d, 0, 0, vertexId++));  //1
        vertices.add(new Vertex(1d, 1, 0, vertexId++));  //2
        vertices.add(new Vertex(0d, 1, 0, vertexId++));  //3


        vertices.add(new Vertex(0d, 1, 1, vertexId++));  //4
        vertices.add(new Vertex(0d, 0, 1, vertexId++));  //5
        vertices.add(new Vertex(1d, 0, 1, vertexId++));  //6
        vertices.add(new Vertex(1d, 1, 1, vertexId));  //7
    }
}
