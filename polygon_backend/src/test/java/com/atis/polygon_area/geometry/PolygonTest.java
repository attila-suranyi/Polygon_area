package com.atis.polygon_area.geometry;

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

}
