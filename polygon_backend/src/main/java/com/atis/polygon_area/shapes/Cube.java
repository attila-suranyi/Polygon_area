package com.atis.polygon_area.shapes;

import com.atis.polygon_area.geometry.Polygon;
import com.atis.polygon_area.geometry.Vertex;
import org.springframework.stereotype.Component;

@Component
public class Cube extends Polygon {

    public Cube() {
        super.addVertex(new Vertex(0d, 0, 0));  //0
        super.addVertex(new Vertex(1d, 0, 0));  //1
        super.addVertex(new Vertex(1d, 1, 0));  //2
        super.addVertex(new Vertex(0d, 1, 0));  //3


        super.addVertex(new Vertex(0d, 1, 1));  //4
        super.addVertex(new Vertex(0d, 0, 1));  //5
        super.addVertex(new Vertex(1d, 0, 1));  //6
        super.addVertex(new Vertex(1d, 1, 1));  //7

        this.calculatePolygonGeometry();
    }
}
