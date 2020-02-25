package com.atis.polygon_area.geometry;

import com.atis.polygon_area.shapes.Cube;
import com.atis.polygon_area.shapes.Icosahedron;
import com.atis.polygon_area.shapes.Tetrahedron;
import com.atis.polygon_area.shapes.Triangle;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PolygonTest {

    @Test
    void triangleArea() {
        Triangle t = new Triangle();
        assertEquals(0.43, Math.round(t.getArea() * 100.0) / 100.0);
    }

    @Test
    void pyramidArea() {
        Tetrahedron p = new Tetrahedron();
        assertEquals(2.01, Math.round(p.getArea() * 100.0) / 100.0);
    }

    @Test
    void cubeArea() {
        Cube c = new Cube();
        assertEquals(6.00, Math.round(c.getArea() * 100.0) / 100.0);
    }

    @Test
    void hexagonDividedIntoFourTriangles() {
        Polygon p = new Polygon();

        p.addVertex(new Vertex(1d, 0, 0));
        p.addVertex(new Vertex(2d, 0, 0));
        p.addVertex(new Vertex(3d, 1, 0));
        p.addVertex(new Vertex(2d, 2, 0));
        p.addVertex(new Vertex(1d, 2, 0));
        p.addVertex(new Vertex(0d, 1, 0));

        p.calculatePolygonGeometry();
        assertEquals(4, p.getTriangles().size());
    }

    @Test
    void cubeHasSixFaces() {
        Polygon cube = new Cube();

        cube.calculatePolygonGeometry();

        assertEquals(6, cube.getFaces().size());
    }

    @Test
    void icosahedronHasTwentyFaces() {
        Icosahedron icosahedron = new Icosahedron();
        assertEquals(20, icosahedron.getFaces().size());
    }
}
