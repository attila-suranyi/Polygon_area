package com.atis.polygon_area.geometry;

import org.springframework.stereotype.Component;

@Component
public class Triangle extends Polygon {

    public Triangle() {
        super.addVertex(new Vertex(0d, 0, 0));
        super.addVertex(new Vertex(1d, 0, 0));
        super.addVertex(new Vertex(0.5d, 0.866d, 0));
    }
}
