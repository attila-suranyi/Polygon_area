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
    private float xCoord;
    private float yCoord;
    private float zCoord;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Vertex> adjVertices = new ArrayList<>();

    public Vertex(float xCoord, float yCoord, float zCoord, int id) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.zCoord = zCoord;
        this.id = id;
    }

    public List<Float> getCoordinates() {
        List<Float> coordinates = new ArrayList<>();
        coordinates.add(this.xCoord);
        coordinates.add(this.yCoord);
        coordinates.add(this.zCoord);

        return coordinates;
    }

    public void addAdjVertex(Vertex vertex) {
        this.adjVertices.add(vertex);
    }
}
