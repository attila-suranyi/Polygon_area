package com.atis.polygon_area.geometry;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.paukov.combinatorics3.Generator;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import static java.lang.Math.sqrt;

@Data
@Component("polygon")
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
            this.area += GeometryCalculator.calculateTriangleArea(triangle);
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
                    double distance = GeometryCalculator.pointDistanceFromPlane(normalVector, vertex, plane.get(0));

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
                .map(GeometryCalculator::projectFace)
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
            if (GeometryCalculator.calculateTriangleArea(triangle) == 0) {
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
                    double distance = GeometryCalculator.pointDistanceFromLine(possibleEdge, vertex);

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
     * Generates given number of possible vertices
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
     * @return the ordered list of triangles
     * the layers are: triangle, vertices in a triangle, coordinates of the vertices
     */
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

    public void addVertex(Vertex vertex) {
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
