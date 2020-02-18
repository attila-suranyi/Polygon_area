package com.atis.polygon_area.geometry;

import org.springframework.stereotype.Component;

@Component
public class Tetrahedron extends Polygon {

    public Tetrahedron() {
        int vertexId = 1;

        vertices.add(new Vertex(0d, 0, 0, vertexId++));
        vertices.add(new Vertex(1d, 0, 0, vertexId++));
        vertices.add(new Vertex(0.5f, 0.866f, 0, vertexId++));
        vertices.add(new Vertex(0.5f, 0.5f, 1, vertexId));
    }
}
