package com.atis.polygon_area.geometry;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.paukov.combinatorics3.Generator;
import java.util.*;
import static java.lang.Math.sqrt;


@Data
public class Polygon {
    private double area = 0;

    private Set<List<Vertex>> faces = new HashSet<>();
    private Set<List<Vertex>> triangles = new HashSet<>();

    private int vertexId = 0;
    @Setter(AccessLevel.PRIVATE)
    private List<Vertex> vertices = new ArrayList<>();


    public void calculatePolygonGeometry() {
        this.findFaces();
        this.dividePolygonFaceToTriangles();
        this.calculatePolygonArea();
    }

    /**
     * Static method that finds the faces of a polygon by
     * determining whether points are lying both sides of a plane.
     * If there are points on both sides of the given plane,
     * then the plane is not a face of the polygon.
     */
    void findFaces() {
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
                this.addFace(plane);
            }
        }
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

    void dividePolygonFaceToTriangles() {
        for (List<Vertex> face : this.faces) {

            // the number of necessary new edges is: the number of vertices of the face - 3
            for (int i=0; i < face.size() - 3; i++) {
                List<Vertex> triangle = new ArrayList<>();
                triangle.add(face.get(0));
                triangle.add(face.get( (2 + i) - 1));
                triangle.add(face.get(2 + i));
                this.addTriangle(triangle);
            }

            // with the last new edge two new triangles were generated
            // the second and last triangle is added here
            List<Vertex> lastTriangle = new ArrayList<>();
            lastTriangle.add(face.get(0));
            lastTriangle.add(face.get(face.size() - 1));
            lastTriangle.add(face.get(face.size() - 2));
            this.addTriangle(lastTriangle);
        }
    }

    private void calculatePolygonArea() {
        for (List<Vertex> triangle : this.triangles) {

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
    public List<List<List<Double>>> getOrderedVertexCoordinates() {
        List<List<Vertex>> sortedTriangles = new ArrayList<>(this.getTriangles());
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

    public void addVertex(Vertex vertex) {
        vertex.setId(this.vertexId++);
        this.vertices.add(vertex);
    }

    private void addTriangle(List<Vertex> triangle) {
        triangle.sort(Comparator.comparing(Vertex::getId));
        this.triangles.add(triangle);
    }

    private void addFace(List<Vertex> face) {
        face.sort(Comparator.comparing(Vertex::getId));
        this.faces.add(face);
    }
}
