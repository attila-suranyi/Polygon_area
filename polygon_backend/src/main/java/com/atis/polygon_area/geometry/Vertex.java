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
    private float X;
    private float Y;
    private float Z;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Vertex> adjVertices = new ArrayList<>();

    public Vertex(float X, float Y, float Z, int id) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
        this.id = id;
    }

    public Vertex(float X, float Y, float Z) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }

    public List<Float> getCoordinates() {
        List<Float> coordinates = new ArrayList<>();
        coordinates.add(this.X);
        coordinates.add(this.Y);
        coordinates.add(this.Z);

        return coordinates;
    }

    public void addAdjVertex(Vertex vertex) {
        this.adjVertices.add(vertex);
    }
}
