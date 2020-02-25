package com.atis.polygon_area.shapes;

import com.atis.polygon_area.geometry.Polygon;
import com.atis.polygon_area.geometry.Vertex;
import org.springframework.stereotype.Component;

@Component
public class Dodecahedron extends Polygon {

    public Dodecahedron() {
        super.addVertex(new Vertex(0.0, 1.618033989, 4.236067977));
        super.addVertex(new Vertex(0.0, -1.618033989, 4.236067977));

        super.addVertex(new Vertex(2.618033989, 2.618033989, 2.618033989));
        super.addVertex(new Vertex(-2.618033989, 2.618033989, 2.618033989));
        super.addVertex(new Vertex(-2.618033989, -2.618033989, 2.618033989));
        super.addVertex(new Vertex(2.618033989, -2.618033989, 2.618033989));

        super.addVertex(new Vertex(4.236067977, 0.0, 1.618033989));
        super.addVertex(new Vertex(-4.236067977, 0.0, 1.618033989));
        super.addVertex(new Vertex(1.618033989, 4.236067977, 0.0));
        super.addVertex(new Vertex(-1.618033989, 4.236067977, 0.0));

        super.addVertex(new Vertex(-1.618033989, -4.236067977, 0.0));
        super.addVertex(new Vertex(1.618033989, -4.236067977, 0.0));
        super.addVertex(new Vertex(4.236067977, 0.0, -1.618033989));
        super.addVertex(new Vertex(-4.236067977, 0.0, -1.618033989));

        super.addVertex(new Vertex(2.618033989, 2.618033989, -2.618033989));
        super.addVertex(new Vertex(-2.618033989, 2.618033989, -2.618033989));
        super.addVertex(new Vertex(-2.618033989, -2.618033989, -2.618033989));
        super.addVertex(new Vertex(2.618033989, -2.618033989, -2.618033989));

        super.addVertex(new Vertex(0.0, 1.618033989, -4.236067977));
        super.addVertex(new Vertex(0.0, -1.618033989, -4.236067977));


    }
}
