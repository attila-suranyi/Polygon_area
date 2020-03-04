package com.atis.polygon_area.geometry;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.paukov.combinatorics3.Generator;
import org.springframework.stereotype.Service;

import java.util.*;
import static java.lang.Math.sqrt;

/**
 *
 */
@Data
@Service
public class Polygon {
    private double area = 0;

    @Setter(AccessLevel.PRIVATE)
    private Set<List<Vertex>> faces = new HashSet<>();

    private int vertexId = 0;
    @Setter(AccessLevel.PRIVATE)
    private List<Vertex> vertices = new ArrayList<>();


    public void calculatePolygonGeometry() throws Exception {
        this.findFaces();
        this.calculatePolygonArea();
    }

    /**
     * Static method that finds the faces of a polygon by
     * determining whether points are lying both sides of a plane.
     * If there are points on both sides of the given plane,
     * then the plane is not a face of the polygon.
     */
    private void findFaces() throws Exception {
        List<List<Vertex>> planes = this.generatePlanes();

        for (List<Vertex> plane : planes) {

            boolean pointsAbove = false;
            boolean pointsBelow = false;

            Vector normalVector = Vector.normalVector(plane.get(0), plane.get(1), plane.get(2));

            for (Vertex vertex : this.getVertices()) {
                if (!plane.contains(vertex)) {
                    double pointAbovePlane = pointDistanceFromPlane(normalVector, vertex, plane.get(0));

                    if (pointAbovePlane > 0) {
                        pointsAbove = true;
                    } else if (pointAbovePlane < 0) {
                        pointsBelow = true;
                    } else {
                        plane.add(vertex);
                    }
                }
                if (pointsAbove && pointsBelow) {
                    break;
                }
            }
            if (!(pointsAbove && pointsBelow)) {
                this.addTriangle(plane);
            }
        }
    }

    private void triangulateFace(List<Vertex> face) {

    }

    // TODO first define the sides of this plane: 1-3, 2-5, 5-4, 1-2, 4-3
    // then chain them, so you get the proper order: 1-3-4-5-2
    private List<Vertex> orderVertices(List<Vertex> face) {
        return null;
    }


    /**Determines which side of a straight line a point is located.
     * @param line
     * @param point
     * @return the shortest distance between the line and the point,
     * the sign of the distance indicates which side the point is
     */
    private double pointPositionToLine(List<Vertex> line, Vertex point) {
        double x1 = line.get(0).getX();
        double z1 = line.get(0).getZ();
        double x2 = line.get(1).getX();
        double z2 = line.get(1).getZ();

        return (point.getX() - x1) * (z2 - z1) - (point.getZ() - z1) * (x2 - x1);
    }

    // TODO move static methods
    public static List<Vertex> projectFace(List<Vertex> face) {
        List<Vector> pm = projectionMatrix(face);
        List<Vertex> projectedFace = new ArrayList<>();

        for (Vertex vertex : face) {
            projectedFace.add(projectVertex(pm, vertex));
        }

        return projectedFace;
    }

    private static List<Vector> projectionMatrix(List<Vertex> triangle) {
        Vertex a = triangle.get(0);
        Vertex b = triangle.get(1);
        Vertex c = triangle.get(2);

        Vector aMinusB = Vector.normalise(Vector.subtract(a, b));
        Vector aMinusC = Vector.normalise(Vector.subtract(a, c));

        Vector base1 = aMinusB;
        Vector base2 = Vector.cross(aMinusB, aMinusC);
        Vector base3 = Vector.cross(base1, base2);

        List<Vector> matrix = new ArrayList<>();
        matrix.add(base1);
        matrix.add(base2);
        matrix.add(base3);

        return matrix;
    }

    private static Vertex projectVertex(List<Vector> matrix, Vertex point) {
        Vector v = new Vector(point);
        return new Vertex(Vector.dot(matrix.get(0), v), Vector.dot(matrix.get(1), v), Vector.dot(matrix.get(2), v));
    }

    /**
     * Generates possible combinations of three vertices
     * @return List of the possible triplets
     */
    private List<List<Vertex>> generatePlanes() {
        List<List<Vertex>> planes = new ArrayList<>();

        Generator.combination(this.vertices)
                .simple(3)
                .stream()
                .forEach(planes::add);

        return planes;
    }

    /**
     * Static method that calculates the distance between the plane and a point,
     * using the normal vector of the plane.
     * The sign of the distance (negative or positive) indicates the relative
     * position of the point.
     * If it is positive it is above, in case of negative it is below the plane.
     * If it is 0, then it is on the plane
     * @param normalVector of the plane
     * @param pointOnPlane a point on the plane
     * @param point point in space
     * @return distance between the point and the plane
     */
    private static double pointDistanceFromPlane(Vector normalVector, Vertex pointOnPlane, Vertex point) {
        return Vector.dot(normalVector, Vector.subtract(point, pointOnPlane));
    }


    /**
     * Calculates the area of the polygon iterating through the found
     * triangles, using Heron's formula
     */
    private void calculatePolygonArea() {
        for (List<Vertex> triangle : this.faces) {

            double sideA = this.calculateSideLength(triangle.get(0), triangle.get(1));
            double sideB = this.calculateSideLength(triangle.get(0), triangle.get(2));
            double sideC = this.calculateSideLength(triangle.get(1), triangle.get(2));

            //Heron's formula
            double s = (sideA + sideB + sideC) / 2;
            this.area += (sqrt(s * (s - sideA) * (s - sideB) * (s - sideC)));
        }
    }

    private double calculateSideLength(Vertex pointA, Vertex pointB) {
        return Math.sqrt((Math.pow((pointA.getX() - pointB.getX()), 2) +
                Math.pow((pointA.getY() - pointB.getY()), 2) +
                Math.pow((pointA.getZ() - pointB.getZ()), 2)));
    }


    // the layers are: triangle, vertices in a triangle, coordinates of the vertices
    private List<List<List<Double>>> getOrderedTriangleCoordinates() {
        List<List<Vertex>> sortedTriangles = new ArrayList<>(this.faces);
        sortedTriangles.sort(Comparator.comparing((l1) -> l1.get(0).getId()));

        List<List<List<Double>>> sortedCoordinates = new ArrayList<>();

        for (List<Vertex> triangle : sortedTriangles) {
            List<List<Double>> triangleCoordinates = new ArrayList<>();
            for (Vertex vertex : triangle) {
                triangleCoordinates.add(vertex.getCoordinates());
            }
            sortedCoordinates.add(triangleCoordinates);
        }

        return sortedCoordinates;
    }

    public HashMap<String, Object> getPolygonGeometry() {
        HashMap<String, Object> polygonGeometry = new HashMap<>();
        polygonGeometry.put("area", this.area);
        polygonGeometry.put("triangles", this.getOrderedTriangleCoordinates());

        return polygonGeometry;
    }

    protected void addVertex(Vertex vertex) {
        vertex.setId(this.vertexId++);
        this.vertices.add(vertex);
    }

    private void addTriangle(List<Vertex> triangle) throws Exception {
        if (triangle.size() > 3) {
            throw new Exception("Not a triangle");
        }
        triangle.sort(Comparator.comparing(Vertex::getId));
        this.faces.add(triangle);
    }
}
