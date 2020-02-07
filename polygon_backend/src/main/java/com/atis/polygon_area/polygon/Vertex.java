package com.atis.polygon_area.polygon;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Vertex {
    private float xCoord;
    private float yCoord;
    private float zCoord;
    private List<Vertex> adjVertices = new ArrayList<>();

    public Vertex(float xCoord, float yCoord, float zCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.zCoord = zCoord;
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
