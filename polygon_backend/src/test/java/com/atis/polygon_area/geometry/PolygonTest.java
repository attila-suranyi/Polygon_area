package com.atis.polygon_area.geometry;

import org.junit.jupiter.api.Test;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

class PolygonTest {

    @Test
    void triangleArea() {
        Triangle t = new Triangle();
        t.calculatePolygonGeometry();
        assertEquals(0.43, Math.round(t.getArea() * 100.0) / 100.0);
    }

    @Test
    void pyramidArea() {
        Tetrahedron p = new Tetrahedron();
        p.calculatePolygonGeometry();
        assertEquals(2.01, Math.round(p.getArea() * 100.0) / 100.0);
    }

    @Test
    void cubeArea() {
        Cube c = new Cube();
        c.calculatePolygonGeometry();
        assertEquals(6.00, Math.round(c.getArea() * 100.0) / 100.0);
    }

    @Test
    void hexagonDividedIntoFourTriangles() {
        Polygon p = new Polygon();
        int vertexId = 0;

        List<Vertex> vertices = new ArrayList<>();

        Vertex vertex0 = new Vertex(1d, 0, 0, vertexId++);
        Vertex vertex1 = new Vertex(2d, 0, 0, vertexId++);
        Vertex vertex2 = new Vertex(3d, 1, 0, vertexId++);
        Vertex vertex3 = new Vertex(2d, 2, 0, vertexId++);
        Vertex vertex4 = new Vertex(1d, 2, 0, vertexId++);
        Vertex vertex5 = new Vertex(0d, 1, 0, vertexId);

        vertices.add(vertex0);
        vertices.add(vertex1);
        vertices.add(vertex2);
        vertices.add(vertex3);
        vertices.add(vertex4);
        vertices.add(vertex5);

        p.setVertices(vertices);

        Set<List<Vertex>> faces = new HashSet<>();
        faces.add(vertices);
        p.setFaces(faces);

        p.dividePolygonFaceToTriangles();
        assertEquals(4, p.getTriangles().size());
    }

    @Test
    void cubeHasSixFaces() {
        Polygon cube = new Polygon();

        int vertexId = 1;

        List<Vertex> vertices = new ArrayList<>();
        vertices.add(new Vertex(0d, 0, 0, vertexId++));  //1
        vertices.add(new Vertex(1d, 0, 0, vertexId++));  //2
        vertices.add(new Vertex(1d, 1, 0, vertexId++));  //3
        vertices.add(new Vertex(0d, 1, 0, vertexId++));  //4

        vertices.add(new Vertex(0d, 1, 1, vertexId++));  //5
        vertices.add(new Vertex(0d, 0, 1, vertexId++));  //6
        vertices.add(new Vertex(1d, 0, 1, vertexId++));  //7
        vertices.add(new Vertex(1d, 1, 1, vertexId));  //8

        cube.setVertices(vertices);

        cube.findFaces();

        assertEquals(6, cube.getFaces().size());
    }
}
