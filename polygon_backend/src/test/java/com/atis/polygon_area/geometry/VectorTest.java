package com.atis.polygon_area.geometry;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class VectorTest {

    @Test
    void normalVectorFromThreePoints() {
        Vertex v1 = new Vertex(3, 1, -8);
        Vertex v2 = new Vertex(4, 4, 1);
        Vertex v3 = new Vertex(-5, 7, 2);

        Vector vector = Vector.normalVector(v1, v2, v3);
        assertEquals(new Vector(-24, -82, 30), vector);
    }

}
