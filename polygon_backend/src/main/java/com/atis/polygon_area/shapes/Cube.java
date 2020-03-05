package com.atis.polygon_area.shapes;

import com.atis.polygon_area.geometry.GeometryCalculable;
import com.atis.polygon_area.geometry.Polygon;
import com.atis.polygon_area.geometry.Vertex;

public class Cube extends Polygon implements GeometryCalculable {

    public Cube() throws Exception{
        super.addVertex(new Vertex(0, 0, 0));
        super.addVertex(new Vertex(1, 0, 0));
        super.addVertex(new Vertex(2, 0, 0));
        super.addVertex(new Vertex(0, 2, 0));
        super.addVertex(new Vertex(1, 2, 0));
        super.addVertex(new Vertex(2, 2, 0));

        super.addVertex(new Vertex(0, 0, 2));
        super.addVertex(new Vertex(1, 0, 2));
        super.addVertex(new Vertex(2, 0, 2));
        super.addVertex(new Vertex(0, 2, 2));
        super.addVertex(new Vertex(1, 2, 2));
        super.addVertex(new Vertex(2, 2, 2));

        this.calculatePolygonGeometry();
    }
}
