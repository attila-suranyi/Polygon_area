package com.atis.polygon_area.geometry;

import com.atis.polygon_area.shapes.Icosahedron;
import com.atis.polygon_area.shapes.Tetrahedron;
import com.atis.polygon_area.shapes.Triangle;
import com.atis.polygon_area.util.Util;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import java.lang.reflect.*;
import java.util.*;

class PolygonTest {

    @Autowired
    private Util util;

    @Test
    void triangleArea() throws Exception {
        Triangle t = new Triangle();
        assertEquals(0.43, Math.round(t.getArea() * 100.0) / 100.0);
    }

    @Test
    void pyramidArea() throws Exception {
        Tetrahedron p = new Tetrahedron();
        assertEquals(2.01, Math.round(p.getArea() * 100.0) / 100.0);
    }

    @Test
    void icosahedronHasTwentyFaces() throws Exception {
        Icosahedron icosahedron = new Icosahedron();
        assertEquals(20, icosahedron.getFaces().size());
    }

    @Test
    void vertexNotOnTheSurfaceWontBeAddedToFace() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Polygon p = new Polygon();

        p.addVertex(new Vertex(0d, 0, 0));
        p.addVertex(new Vertex(1d, 0, 0));
        p.addVertex(new Vertex(0.5f, 0.866f, 0));
        p.addVertex(new Vertex(0.5f, 0.5f, 1));

        Vertex vertexNotOnTheSurface = new Vertex(0.5, 0.5, 0.5);
        p.addVertex(vertexNotOnTheSurface);

        Method findFaces = Polygon.class.getDeclaredMethod("findFaces", null);
        findFaces.setAccessible(true);
        findFaces.invoke(p);

        Set<Vertex> verticesOnSurface = new HashSet<>();

        for (List<Vertex> face : p.getFaces()) {
            verticesOnSurface.addAll(face);
        }

        assertFalse(verticesOnSurface.contains(vertexNotOnTheSurface));
    }

    @Test
    void vertexOnTheSurfaceAddedToFace() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        Polygon p = new Polygon();

        Vertex vertexOnSurface = new Vertex(0d, 0, 0);

        p.addVertex(vertexOnSurface);
        p.addVertex(new Vertex(1d, 0, 0));
        p.addVertex(new Vertex(0.5f, 0.866f, 0));
        p.addVertex(new Vertex(0.5f, 0.5f, 1));

        Method findFaces = Polygon.class.getDeclaredMethod("findFaces", null);
        findFaces.setAccessible(true);
        findFaces.invoke(p);

        Set<Vertex> verticesOnSurface = new HashSet<>();

        for (List<Vertex> face : p.getFaces()) {
            verticesOnSurface.addAll(face);
        }

        assertTrue(verticesOnSurface.contains(vertexOnSurface));
    }

    @Test
    void faceProjection() {
        List<Vertex> face = new ArrayList<>();

        for (int i=0; i < 3; i++) {
            Vertex v = new Vertex(Util.generateRandomDoubleBetween(0, 100), Util.generateRandomDoubleBetween(0, 100), Util.generateRandomDoubleBetween(0, 100));
            face.add(v);
        }

        List<Vertex> projectedFace = Polygon.projectFace(face);

        assertThat(projectedFace.get(0).getY() == projectedFace.get(1).getY() && projectedFace.get(0).getY() == projectedFace.get(2).getY());
    }
}
