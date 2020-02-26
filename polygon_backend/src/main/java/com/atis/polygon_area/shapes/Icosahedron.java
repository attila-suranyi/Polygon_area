package com.atis.polygon_area.shapes;

import com.atis.polygon_area.geometry.Polygon;
import com.atis.polygon_area.geometry.Vertex;
import org.springframework.stereotype.Component;

@Component
public class Icosahedron extends Polygon {

    public Icosahedron() throws Exception {
        super.addVertex(new Vertex(-0.26286500f, 0.0000000f, 0.42532500f));
        super.addVertex(new Vertex(0.26286500f, 0.0000000f, 0.42532500f));
        super.addVertex(new Vertex(-0.26286500f, 0.0000000f, -0.42532500f));
        super.addVertex(new Vertex(0.26286500f, 0.0000000f, -0.42532500f));
        super.addVertex(new Vertex(0.0000000f, 0.42532500f, 0.26286500f));
        super.addVertex(new Vertex(0.0000000f, 0.42532500f, -0.26286500f));

        super.addVertex(new Vertex(0.0000000f, -0.42532500f, 0.26286500f));
        super.addVertex(new Vertex(0.0000000f, -0.42532500f, -0.26286500f));
        super.addVertex(new Vertex(0.42532500f, 0.26286500f, 0.0000000f));
        super.addVertex(new Vertex(-0.42532500f, 0.26286500f, 0.0000000f));
        super.addVertex(new Vertex(0.42532500f, -0.26286500f, 0.0000000f));
        super.addVertex(new Vertex(-0.42532500f, -0.26286500f, 0.0000000f));

        this.calculatePolygonGeometry();
    }
}
