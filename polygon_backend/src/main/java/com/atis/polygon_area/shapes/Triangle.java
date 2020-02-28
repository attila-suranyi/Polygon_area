package com.atis.polygon_area.shapes;

import com.atis.polygon_area.geometry.Polygon;
import com.atis.polygon_area.geometry.Vertex;
import org.springframework.stereotype.Component;

@Component
public class Triangle extends Polygon {

    public Triangle() throws Exception {
        super.addVertex(new Vertex(0d, 0, 0));
        super.addVertex(new Vertex(1d, 0, 0));
        super.addVertex(new Vertex(0.5d, 0.866d, 0));

        this.calculatePolygonGeometry();
    }
}
