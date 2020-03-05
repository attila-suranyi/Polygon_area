package com.atis.polygon_area.geometry;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.paukov.combinatorics3.Generator;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;
import static java.lang.Math.sqrt;


@Data
@Service
public class Polygon {
    @Setter(AccessLevel.PRIVATE)
    private double area = 0;

    @Setter(AccessLevel.PRIVATE)
    private Set<List<Vertex>> faces = new HashSet<>();

    private int vertexId = 0;
    @Setter(AccessLevel.PRIVATE)
    private List<Vertex> vertices = new ArrayList<>();

    @Setter(AccessLevel.PRIVATE)
    private Set<List<Vertex>> triangles = new HashSet<>();


    public void calculatePolygonGeometry() throws Exception {
        this.findFaces();
        this.triangulateFaces();

        for (List<Vertex> triangle : triangles) {
            this.area += this.calculateTriangleArea(triangle);
        }
    }

    /**
     * Static method that finds the faces of a polygon by
     * determining whether points are lying both sides of a plane.
     * If there are points on both sides of the given plane,
     * then the plane is not a face of the polygon.
     */
    private void findFaces() {
        List<List<Vertex>> planes = this.generateVertexCombinations(this.vertices, 3);

        for (List<Vertex> plane : planes) {

            boolean pointsAbove = false;
            boolean pointsBelow = false;

            Vector normalVector = Vector.normalVector(plane.get(0), plane.get(1), plane.get(2));

            if (normalVector.getZ() == 0 && normalVector.getY() == 0 && normalVector.getX() == 0) {
                continue;
            }

            for (Vertex vertex : this.getVertices()) {
                if (!plane.contains(vertex)) {
                    double distance = pointDistanceFromPlane(normalVector, vertex, plane.get(0));

                    if (distance > 0) {
                        pointsAbove = true;
                    } else if (distance < 0) {
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
                addFace(plane);
            }
        }
    }

    //TODO put faces with three vertices directly to triangles
    private void triangulateFaces() throws Exception {

        Set<List<Vertex>> projectedTriangles = new HashSet<>();

        List<List<Vertex>> projectedFaces = this.faces.stream()
                //.filter(face -> face.size() > 3)
                .map(x -> Polygon.projectFace(this, x))
                .map(this::findEdges)
                .map(this::orderVertices)
                .collect(Collectors.toList());

        for (List<Vertex> face : projectedFaces) {

            // the number of necessary new edges is: the number of vertices of the face - 3
            for (int i=0; i < face.size() - 3; i++) {
                List<Vertex> triangle = new ArrayList<>(Arrays.asList(face.get(0), face.get( 1 + i ),face.get( 2 + i )));
                projectedTriangles.add(triangle);
            }
            List<Vertex> triangle = new ArrayList<>(Arrays.asList(face.get(0), face.get(face.size() - 2), face.get(face.size() - 1)));
            projectedTriangles.add(triangle);
        }
        this.projectTrianglesBackTo3D(projectedTriangles);
    }

    private void projectTrianglesBackTo3D(Set<List<Vertex>> projectedTriangles) throws Exception {
        for (List<Vertex> projectedTriangle :projectedTriangles) {
            List<Vertex> triangle = new ArrayList<>();

            for (Vertex projectedVertex : projectedTriangle) {
                for (Vertex vertex : this.vertices) {
                    if (vertex.getId() == projectedVertex.getId()) {
                        triangle.add(vertex);
                    }
                }
            }
            this.addTriangle(triangle);
        }
    }

    /**
     * Orders the vertices of the given edges of a face, so
     * iterating through the vertices we only traverse through
     * the edges.
     * Example: edges of the plane: 1-3, 2-5, 5-4, 1-2, 4-3
     * The correct order: 1-3-4-5-2
     * @param edges of the face
     * @return the ordered vertex sequence
     */
    private List<Vertex> orderVertices(List<List<Vertex>> edges) {
        List<List<Vertex>> optimizedEdges = this.eliminateCollinearVertices(edges);

        List<Vertex> orderedVertices = edges.get(0);

        //this condition will work after elimination
        while (orderedVertices.size() < edges.size()) {
            for (List<Vertex> edge : edges) {
                if (edge.contains(orderedVertices.get(orderedVertices.size() - 1)) && !edge.contains(orderedVertices.get(orderedVertices.size() - 2))) {
                    edge.stream()
                            .filter(x -> !orderedVertices.get(orderedVertices.size() - 1).equals(x))
                            .findFirst()
                            .ifPresent(orderedVertices::add);
                }
                if (orderedVertices.size() == edges.size()) {
                    break;
                }
            }
        }
        return orderedVertices;
    }

    private List<List<Vertex>> eliminateCollinearVertices(List<List<Vertex>> edges) {
        List<Vertex> points = new ArrayList<>();

        for (List<Vertex> edge : edges) {
            for (Vertex point : edge) {
                if (!points.contains(point)) {
                    points.add(point);
                }
            }
        }
        List<List<Vertex>> possibleTriangles = this.generateVertexCombinations(points, 3);

        Set<Vertex> collinearPoints = new HashSet<>();

        for (List<Vertex> triangle : possibleTriangles) {
            if (this.calculateTriangleArea(triangle) == 0) {
                double a = triangle.get(0).getX() + triangle.get(0).getZ();
                double b = triangle.get(1).getX() + triangle.get(1).getZ();
                double c = triangle.get(2).getX() + triangle.get(2).getZ();

                if (a > b) {
                    if (b > c) {
                        collinearPoints.add(triangle.get(1));
                    } else if (a > c) {
                        collinearPoints.add(triangle.get(2));
                    } else {
                        collinearPoints.add(triangle.get(0));
                    }
                } else {
                    if (a > c) {
                        collinearPoints.add(triangle.get(0));
                    } else if (b > c) {
                        collinearPoints.add(triangle.get(2));
                    } else {
                        collinearPoints.add(triangle.get(1));
                    }
                }
            }
        }
        List<List<Vertex>> removeEdges = new ArrayList<>();
        for (List<Vertex> edge : edges) {
            for (Vertex collinearPoint : collinearPoints) {
                if (edge.contains(collinearPoint)) {
                    removeEdges.add(edge);
                }
            }
        }
        edges.removeAll(removeEdges);
        return edges;
    }

    private List<List<Vertex>> findEdges(List<Vertex> face) {
        List<List<Vertex>> possibleEdges = this.generateVertexCombinations(face, 2);
        List<List<Vertex>> edges = new ArrayList<>();

        for (List<Vertex> possibleEdge : possibleEdges) {

            boolean pointsOnOneSide = false;
            boolean pointsOnOtherSide = false;

            for (Vertex vertex : face) {
                if (!possibleEdge.contains(vertex)) {
                    double distance = pointDistanceFromLine(possibleEdge, vertex);

                    if (distance > 0) {
                        pointsOnOneSide = true;
                    } else if (distance < 0) {
                        pointsOnOtherSide = true;
                    }
                }
                if (pointsOnOneSide && pointsOnOtherSide) {
                    break;
                }
            }
            if (!(pointsOnOneSide && pointsOnOtherSide)) {
                edges.add(possibleEdge);
            }
        }
        return edges;
    }

    /**
     * Determines which side of a straight line a point is located.
     * @param line which is a possible edge of the face
     * @param point a vertex of the face
     * @return the shortest distance between the line and the point,
     * the sign of the distance indicates which side the point is
     */
    private double pointDistanceFromLine(List<Vertex> line, Vertex point) {
        double x1 = line.get(0).getX();
        double z1 = line.get(0).getZ();
        double x2 = line.get(1).getX();
        double z2 = line.get(1).getZ();

        return (point.getX() - x1) * (z2 - z1) - (point.getZ() - z1) * (x2 - x1);
    }

    // TODO move static methods
    private List<Vertex> projectFace(Polygon polygon, List<Vertex> face) {
        List<Vector> pm = projectionMatrix(polygon, face);
        List<Vertex> projectedFace = new ArrayList<>();

        for (Vertex vertex : face) {
            projectedFace.add(projectVertex(pm, vertex));
        }
        return projectedFace;
    }

    private static List<Vector> projectionMatrix(Polygon polygon, List<Vertex> face) {

        List<Vertex> triangle = new ArrayList<>();

        pointsNotInLine:
        for (int i = 1; i < face.size(); i++) {
            for (int j = 2; j < face.size(); j++) {
                triangle = Arrays.asList(face.get(0), face.get(i), face.get(j));
                double triangleArea = polygon.calculateTriangleArea(triangle);
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

    private static Vertex projectVertex(List<Vector> matrix, Vertex point) {
        int vertexId = point.getId();
        Vector v = new Vector(point);
        return new Vertex(vertexId, Vector.dot(matrix.get(0), v), Vector.dot(matrix.get(1), v), Vector.dot(matrix.get(2), v));
    }

    /**
     * Generates given number of possible vertices
     *
     * @param vertices          the possible combinations
     * @param combinationNumber the number of vertices the combination consists
     * @return the possible combinations
     */
    private List<List<Vertex>> generateVertexCombinations(List<Vertex> vertices, int combinationNumber) {
        List<List<Vertex>> combinations = new ArrayList<>();

        Generator.combination(vertices)
                .simple(combinationNumber)
                .stream()
                .forEach(combinations::add);

        return combinations;
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
    private static double pointDistanceFromPlane(Vector normalVector, Vertex pointOnPlane, Vertex point) {
        return Vector.dot(normalVector, Vector.subtract(point, pointOnPlane));
    }

    /**
     * Calculates the area of the polygon iterating through the found
     * triangles, using Heron's formula
     */
    private double calculateTriangleArea(List<Vertex> triangle) {

        double sideA = this.calculateSideLength(triangle.get(0), triangle.get(1));
        double sideB = this.calculateSideLength(triangle.get(0), triangle.get(2));
        double sideC = this.calculateSideLength(triangle.get(1), triangle.get(2));

        //Heron's formula
        double s = (sideA + sideB + sideC) / 2;
        return (sqrt(s * (s - sideA) * (s - sideB) * (s - sideC)));
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

    //TODO send back some notification if this exception occurs
    private void addTriangle(List<Vertex> triangle) throws Exception {
        if (triangle.size() > 3) {
            throw new Exception("Not a triangle");
        }
        triangle.sort(Comparator.comparing(Vertex::getId));
        this.triangles.add(triangle);
    }

    private void addFace(List<Vertex> face) {
        face.sort(Comparator.comparing(Vertex::getId));
        this.faces.add(face);
    }
}
