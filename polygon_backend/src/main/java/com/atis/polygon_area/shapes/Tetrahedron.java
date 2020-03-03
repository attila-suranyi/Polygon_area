package com.atis.polygon_area.shapes;

import com.atis.polygon_area.geometry.Polygon;
import com.atis.polygon_area.geometry.Vertex;
import com.atis.polygon_area.geometry.GeometryCalculable;
import org.springframework.stereotype.Component;

@Component("tetrahedron")
public class Tetrahedron extends Polygon implements GeometryCalculable {

    public Tetrahedron() throws Exception {
        super.addVertex(new Vertex(0d, 0, 0));
        super.addVertex(new Vertex(1d, 0, 0));
        super.addVertex(new Vertex(0.5f, 0.866f, 0));
        super.addVertex(new Vertex(0.5f, 0.5f, 1));

        this.calculatePolygonGeometry();
    }
}
