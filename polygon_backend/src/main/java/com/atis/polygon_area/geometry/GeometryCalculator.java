package com.atis.polygon_area.geometry;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static java.lang.Math.sqrt;

public class GeometryCalculator {

    public static double calculateTriangleArea(List<Vertex> triangle) {

        double sideA = GeometryCalculator.calculateSideLength(triangle.get(0), triangle.get(1));
        double sideB = GeometryCalculator.calculateSideLength(triangle.get(0), triangle.get(2));
        double sideC = GeometryCalculator.calculateSideLength(triangle.get(1), triangle.get(2));

        //Heron's formula
        double s = (sideA + sideB + sideC) / 2;
        return (sqrt(s * (s - sideA) * (s - sideB) * (s - sideC)));
    }

    public static double calculateSideLength(Vertex pointA, Vertex pointB) {
        return Math.sqrt((Math.pow((pointA.getX() - pointB.getX()), 2) +
                Math.pow((pointA.getY() - pointB.getY()), 2) +
                Math.pow((pointA.getZ() - pointB.getZ()), 2)));
    }

    /**
     * Determines which side of a straight line a point is located.
     * @param line which is a possible edge of the face
     * @param point a vertex of the face
     * @return the shortest distance between the line and the point,
     * the sign of the distance indicates which side the point is
     */
    public static double pointDistanceFromLine(List<Vertex> line, Vertex point) {
        double x1 = line.get(0).getX();
        double z1 = line.get(0).getZ();
        double x2 = line.get(1).getX();
        double z2 = line.get(1).getZ();

        return (point.getX() - x1) * (z2 - z1) - (point.getZ() - z1) * (x2 - x1);
    }

    public static List<Vector> projectionMatrix(List<Vertex> face) {

        List<Vertex> triangle = new ArrayList<>();

        pointsNotInLine:
        for (int i = 1; i < face.size(); i++) {
            for (int j = 2; j < face.size(); j++) {
                triangle = Arrays.asList(face.get(0), face.get(i), face.get(j));
                double triangleArea = GeometryCalculator.calculateTriangleArea(triangle);
                if (triangleArea != 0) {
                    break pointsNotInLine;
                }
            }
        }

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

    public static List<Vertex> projectFace(List<Vertex> face) {
        List<Vector> pm = GeometryCalculator.projectionMatrix(face);
        List<Vertex> projectedFace = new ArrayList<>();

        for (Vertex vertex : face) {
            projectedFace.add(GeometryCalculator.projectVertex(pm, vertex));
        }
        return projectedFace;
    }

    public static Vertex projectVertex(List<Vector> matrix, Vertex point) {
        int vertexId = point.getId();
        Vector v = new Vector(point);
        return new Vertex(vertexId, Vector.dot(matrix.get(0), v), Vector.dot(matrix.get(1), v), Vector.dot(matrix.get(2), v));
    }

    /**
     * Static method that calculates the distance between the plane and a point,
     * using the normal vector of the plane.
     * The sign of the distance (negative or positive) indicates the relative
     * position of the point.
     * If it is positive it is above, in case of negative it is below the plane.
     * If it is 0, then it is on the plane
     *
     * @param normalVector of the plane
     * @param pointOnPlane a point on the plane
     * @param point        point in space
     * @return distance between the point and the plane
     */
    public static double pointDistanceFromPlane(Vector normalVector, Vertex pointOnPlane, Vertex point) {
        return Vector.dot(normalVector, Vector.subtract(point, pointOnPlane));
    }
}
