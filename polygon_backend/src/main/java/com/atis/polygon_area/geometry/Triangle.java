package com.atis.polygon_area.geometry;

import org.springframework.stereotype.Component;

@Component
public class Triangle extends Polygon {

    public Triangle() {
        int vertexId = 1;

        vertices.add(new Vertex(0, 0, 0, vertexId++));
        vertices.add(new Vertex(1, 0, 0, vertexId++));
        vertices.add(new Vertex(0.5f, 0.866f, 0, vertexId));
    }
}
