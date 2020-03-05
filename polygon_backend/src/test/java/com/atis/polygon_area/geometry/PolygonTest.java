package com.atis.polygon_area.geometry;

import com.atis.polygon_area.shapes.Cube;
import com.atis.polygon_area.shapes.Icosahedron;
import com.atis.polygon_area.shapes.Tetrahedron;
import com.atis.polygon_area.shapes.Triangle;
import com.atis.polygon_area.util.Util;
import org.junit.jupiter.api.Test;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class PolygonTest {

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
    void cubeHasTwentyTriangles() throws Exception {
        Cube cube = new Cube();
        assertEquals(12, cube.getTriangles().size());
    }

    @Test
    void cubeArea() throws Exception {
        Cube cube = new Cube();
        assertEquals(24, Math.round(cube.getArea() * 100.0) / 100.0);
    }

    @Test
    void icosahedronHasTwentyFaces() throws Exception {
        Icosahedron icosahedron = new Icosahedron();
        assertEquals(20, icosahedron.getFaces().size());
    }

    @Test
    void pointNotOnSurface() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        List<Vertex> plane = Arrays.asList(
                new Vertex(0, 0, 10),
                new Vertex(1, 0, 10),
                new Vertex(2, 2, 10)
        );

        Vertex pointNotOnSurface = new Vertex(0, 0, 1);

        Vector normalVector = Vector.normalVector(plane.get(0), plane.get(1), plane.get(2));

        Method pointDistanceFromPlane = Polygon.class.getDeclaredMethod("pointDistanceFromPlane", Vector.class, Vertex.class, Vertex.class);
        pointDistanceFromPlane.setAccessible(true);
        double distance = (double) pointDistanceFromPlane.invoke(new Polygon(), normalVector, plane.get(0), pointNotOnSurface);

        assertFalse(distance == 0);
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
    void faceProjection() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Polygon p = new Polygon();
        List<Vertex> face = new ArrayList<>();

        for (int i=0; i < 3; i++) {
            Vertex v = new Vertex(Util.generateRandomDoubleBetween(0, 100), Util.generateRandomDoubleBetween(0, 100), Util.generateRandomDoubleBetween(0, 100));
            face.add(v);
        }

        Method projectFace = Polygon.class.getDeclaredMethod("projectFace", Polygon.class, List.class);
        projectFace.setAccessible(true);
        List<Vertex> projectedFace = (List<Vertex>) projectFace.invoke(p, p, face);

        assertThat(projectedFace.get(0).getY() == projectedFace.get(1).getY() && projectedFace.get(0).getY() == projectedFace.get(2).getY());
    }

    @Test
    void pointNotOnLine() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Polygon p = new Polygon();
        List<Vertex> line = new ArrayList<>();
        line.add(new Vertex(0, 0, 0));
        line.add(new Vertex(1, 0, 1));
        Vertex point = new Vertex(0, 0, 1);

        Class[] methodArguments = new Class[2];
        methodArguments[0] = List.class;
        methodArguments[1] = Vertex.class;
        Method pointDistanceFromLine = Polygon.class.getDeclaredMethod("pointDistanceFromLine", methodArguments);
        pointDistanceFromLine.setAccessible(true);
        double distance = (double) pointDistanceFromLine.invoke(p, line, point);

        assertThat(distance != 0);
    }

    @Test
    void pointOnLine() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Polygon p = new Polygon();
        List<Vertex> line = new ArrayList<>();
        line.add(new Vertex(0, 0, 0));
        line.add(new Vertex(1, 0, 1));
        Vertex point = new Vertex(2, 0, 2);

        Class[] methodArguments = new Class[2];
        methodArguments[0] = List.class;
        methodArguments[1] = Vertex.class;
        Method pointDistanceFromLine = Polygon.class.getDeclaredMethod("pointDistanceFromLine", methodArguments);
        pointDistanceFromLine.setAccessible(true);
        double distance = (double) pointDistanceFromLine.invoke(p, line, point);

        assertEquals(distance, 0);
    }

    @Test
    void correctEdgesOfSquare() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Polygon p = new Polygon();

        Vertex vertex1 = new Vertex(0, 0, 0);
        Vertex vertex2 = new Vertex(0, 0, 1);
        Vertex vertex3 = new Vertex(1, 0, 1);
        Vertex vertex4 = new Vertex(1, 0, 0);

        List<Vertex> vertices = new ArrayList<>(Arrays.asList(vertex1, vertex2, vertex3, vertex4));

        List<Vertex> edge1 = new ArrayList<>(Arrays.asList(vertex1, vertex2));
        List<Vertex> edge2 = new ArrayList<>(Arrays.asList(vertex3, vertex2));
        List<Vertex> edge3 = new ArrayList<>(Arrays.asList(vertex3, vertex4));
        List<Vertex> edge4 = new ArrayList<>(Arrays.asList(vertex1, vertex4));

        Method findEdges = Polygon.class.getDeclaredMethod("findEdges", List.class);
        findEdges.setAccessible(true);
        List<List<Vertex>> edges = (List<List<Vertex>>) findEdges.invoke(p, vertices);

        assertEquals(edges.size(), 4);
        assertThat(edges.contains(edge1) && edges.contains(edge2) && edges.contains(edge3) && edges.contains(edge4));
    }

    @Test
    void verticesOfPolygonAreOrdered() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Polygon p = new Polygon();
        Vertex vertex1 = new Vertex(0, 0, 0);
        Vertex vertex2 = new Vertex(0, 0, 1);
        Vertex vertex3 = new Vertex(1, 0, 1);
        Vertex vertex4 = new Vertex(1, 0, 0);

        List<Vertex> edge1 = new ArrayList<>(Arrays.asList(vertex1, vertex2));
        List<Vertex> edge2 = new ArrayList<>(Arrays.asList(vertex3, vertex2));
        List<Vertex> edge3 = new ArrayList<>(Arrays.asList(vertex3, vertex4));
        List<Vertex> edge4 = new ArrayList<>(Arrays.asList(vertex1, vertex4));

        List<List<Vertex>> edges = Arrays.asList(edge1, edge3, edge2, edge4);

        List<Vertex> correctOrder = Arrays.asList(vertex1, vertex2, vertex3, vertex4);

        Method orderVertices = Polygon.class.getDeclaredMethod("orderVertices", List.class);
        orderVertices.setAccessible(true);
        List<Vertex> orderedVertices = (List<Vertex>) orderVertices.invoke(p, edges);

        assertEquals(orderedVertices, correctOrder);
    }
















}
