package com.atis.polygon_area.geometry;

import lombok.Data;
import org.paukov.combinatorics3.Generator;
import java.util.*;
import static java.lang.Math.sqrt;

@Data
public class Polygon {
    private float area = 0;

    private Set<List<Vertex>> faces = new HashSet<>();
    private Set<List<Vertex>> triangles = new HashSet<>();
    protected List<Vertex> vertices = new ArrayList<>();


    public void dividePolygonFaceToTriangles() {
        for (List<Vertex> face : this.faces) {

            // the number of necessary new edges is: the number of vertices of the face - 3
            for (int i=0; i < face.size() - 3; i++) {
                face.get(0).addAdjVertex(face.get( 2 + i ));
                face.get( 2 + i ).addAdjVertex(face.get(0));
            }

            // all the possible triangles can be generated from Vertex0 of the face,
            // because all the new edges were generated from it
            this.generatePossibleTriangleCombinations(face.get(0));
        }
    }

    protected void generatePossibleTriangleCombinations(Vertex vertex) {
        List<Vertex> adjVertices = vertex.getAdjVertices();
        List<List<Vertex>> possibleTriangleCombinations = new ArrayList();

        // generates the possible pair combinations of the adjacent vertices
        Generator.combination(adjVertices)
                .simple(2)
                .stream()
                .forEach(possibleTriangleCombinations::add);

        // adds the starting vertex to the end of the list
        for (List<Vertex> triangle: possibleTriangleCombinations) {
            triangle.add(vertex);
            if (this.isTriangleValid(triangle)) {
                this.addTriangle(triangle);
            }
        }
    }

    // examines if the other two vertices are adjacent to each other, not just to the starting vertex
    private boolean isTriangleValid(List<Vertex> triangle) {
        return triangle.get(0).getAdjVertices().contains(triangle.get(1)) && triangle.get(0).getAdjVertices().contains(triangle.get(2));
    }

    private void addTriangle(List<Vertex> triangle) {
        triangle.sort(Comparator.comparing(Vertex::getId));
        this.triangles.add(triangle);
    }

    protected void calculatePolygonArea() {
        for (List<Vertex> triangle : this.triangles) {

            float sideA = this.calculateSideLength(triangle.get(0), triangle.get(1));
            float sideB = this.calculateSideLength(triangle.get(0), triangle.get(2));
            float sideC = this.calculateSideLength(triangle.get(1), triangle.get(2));

            //Heron's formula
            float s = (sideA + sideB + sideC) / 2;
            this.area += (float) (sqrt(s * (s - sideA) * (s - sideB) * (s - sideC)));
        }
    }

    private float calculateSideLength(Vertex pointA, Vertex pointB) {
        return (float) Math.sqrt((Math.pow((pointA.getXCoord() - pointB.getXCoord()), 2) +
                Math.pow((pointA.getYCoord() - pointB.getYCoord()), 2) +
                Math.pow((pointA.getZCoord() - pointB.getZCoord()), 2)));
    }

    // the layers are: triangle, vertices in a triangle, coordinates of the vertices
    public List<List<List<Float>>> getOrderedVertexCoordinates() {
        List<List<Vertex>> sortedTriangles = new ArrayList<>(this.getTriangles());
        sortedTriangles.sort(Comparator.comparing((l1) -> l1.get(0).getId()));

        List<List<List<Float>>> sortedCoordinates = new ArrayList<>();

        for (List<Vertex> triangle : sortedTriangles) {
            List<List<Float>> triangleCoordinates = new ArrayList<>();
            for (Vertex vertex : triangle) {
                triangleCoordinates.add(vertex.getCoordinates());
            }
            sortedCoordinates.add(triangleCoordinates);
        }

        return sortedCoordinates;
    }
}
