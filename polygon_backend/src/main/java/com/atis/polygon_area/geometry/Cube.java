package com.atis.polygon_area.geometry;

import java.util.ArrayList;
import java.util.List;

public class Cube extends Polygon {

    public Cube() {
        int vertexId = 1;

        List<Vertex> vertices = new ArrayList<>();

        vertices.add(new Vertex(0, 0, 0, vertexId++));  //0
        vertices.add(new Vertex(1, 0, 0, vertexId++));  //1
        vertices.add(new Vertex(1, 1, 0, vertexId++));  //2
        vertices.add(new Vertex(0, 1, 0, vertexId++));  //3


        vertices.add(new Vertex(0, 1, 1, vertexId++));  //4
        vertices.add(new Vertex(0, 0, 1, vertexId++));  //5
        vertices.add(new Vertex(1, 0, 1, vertexId++));  //6
        vertices.add(new Vertex(1, 1, 1, vertexId));  //7

        vertices.get(0).addAdjVertex(vertices.get(1));
        vertices.get(0).addAdjVertex(vertices.get(2));
        vertices.get(0).addAdjVertex(vertices.get(3));
        vertices.get(0).addAdjVertex(vertices.get(4));
        vertices.get(0).addAdjVertex(vertices.get(5));

        vertices.get(1).addAdjVertex(vertices.get(0));
        vertices.get(1).addAdjVertex(vertices.get(2));
        vertices.get(1).addAdjVertex(vertices.get(5));
        vertices.get(1).addAdjVertex(vertices.get(6));

        vertices.get(2).addAdjVertex(vertices.get(0));
        vertices.get(2).addAdjVertex(vertices.get(1));
        vertices.get(2).addAdjVertex(vertices.get(3));
        vertices.get(2).addAdjVertex(vertices.get(6));
        vertices.get(2).addAdjVertex(vertices.get(7));

        vertices.get(3).addAdjVertex(vertices.get(0));
        vertices.get(3).addAdjVertex(vertices.get(2));
        vertices.get(3).addAdjVertex(vertices.get(4));
        vertices.get(3).addAdjVertex(vertices.get(7));

        vertices.get(4).addAdjVertex(vertices.get(5));
        vertices.get(4).addAdjVertex(vertices.get(7));
        vertices.get(4).addAdjVertex(vertices.get(3));
        vertices.get(4).addAdjVertex(vertices.get(0));

        vertices.get(5).addAdjVertex(vertices.get(0));
        vertices.get(5).addAdjVertex(vertices.get(1));
        vertices.get(5).addAdjVertex(vertices.get(4));
        vertices.get(5).addAdjVertex(vertices.get(6));
        vertices.get(5).addAdjVertex(vertices.get(7));

        vertices.get(6).addAdjVertex(vertices.get(1));
        vertices.get(6).addAdjVertex(vertices.get(2));
        vertices.get(6).addAdjVertex(vertices.get(5));
        vertices.get(6).addAdjVertex(vertices.get(7));

        vertices.get(7).addAdjVertex(vertices.get(2));
        vertices.get(7).addAdjVertex(vertices.get(3));
        vertices.get(7).addAdjVertex(vertices.get(4));
        vertices.get(7).addAdjVertex(vertices.get(5));
        vertices.get(7).addAdjVertex(vertices.get(6));

        for (Vertex vertex : vertices) {
            this.generatePossibleTriangleCombinations(vertex);
        }
        this.calculatePolygonArea();
    }
}
