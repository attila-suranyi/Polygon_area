package com.atis.polygon_area.geometry;

import org.springframework.stereotype.Component;

@Component
public class Triangle extends Polygon {

    public Triangle() {
        int vertexId = 1;

        vertices.add(new Vertex(0, 0, 0, vertexId++));
        vertices.add(new Vertex(1, 0, 0, vertexId++));
        vertices.add(new Vertex(0.5f, 0.866f, 0, vertexId));

        vertices.get(0).addAdjVertex(vertices.get(1));
        vertices.get(0).addAdjVertex(vertices.get(2));

        vertices.get(1).addAdjVertex(vertices.get(0));
        vertices.get(1).addAdjVertex(vertices.get(2));

        vertices.get(2).addAdjVertex(vertices.get(1));
        vertices.get(2).addAdjVertex(vertices.get(0));

        for (Vertex vertex : vertices) {
            super.generatePossibleTriangleCombinations(vertex);
        }

        this.calculatePolygonArea();
    }
}
