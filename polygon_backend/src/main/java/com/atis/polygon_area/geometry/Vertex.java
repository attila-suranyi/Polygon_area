package com.atis.polygon_area.geometry;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Vertex {
    public int id;
    private double X;
    private double Y;
    private double Z;

    /*@EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Vertex> adjVertices = new ArrayList<>();*/

    public Vertex(double X, double Y, double Z, int id) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
        this.id = id;
    }

    public Vertex(double X, double Y, double Z) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }

    public List<Double> getCoordinates() {
        List<Double> coordinates = new ArrayList<>();
        coordinates.add(this.X);
        coordinates.add(this.Y);
        coordinates.add(this.Z);

        return coordinates;
    }

    /*public void addAdjVertex(Vertex vertex) {
        this.adjVertices.add(vertex);
    }*/
}
