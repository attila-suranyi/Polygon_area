package com.atis.polygon_area.controller;

import com.atis.polygon_area.geometry.Polygon;
import com.atis.polygon_area.geometry.Vertex;
import com.atis.polygon_area.shapes.Icosahedron;
import com.atis.polygon_area.shapes.Tetrahedron;
import com.atis.polygon_area.shapes.Triangle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class Controller {

    @Autowired
    private Triangle triangle;

    @Autowired
    private Tetrahedron tetrahedron;

    @Autowired
    private Icosahedron icosahedron;

    @Qualifier("polygon")
    @Autowired
    private Polygon polygon;

    @GetMapping("/triangle")
    public ResponseEntity getTriangleGeometry() {
        Map<Object, Object> model = new HashMap<>();
        model.put("area", triangle.getArea());
        model.put("triangles", triangle.getOrderedTriangleCoordinates());

        return ResponseEntity.ok(model);
    }

    @GetMapping("/tetrahedron")
    public ResponseEntity getPyramidGeometry() {
        Map<Object, Object> model = new HashMap<>();
        model.put("area", tetrahedron.getArea());
        model.put("triangles", tetrahedron.getOrderedTriangleCoordinates());

        return ResponseEntity.ok(model);
    }

    @GetMapping("/icosahedron")
    public ResponseEntity getDodecahedronGeometry() {
        Map<Object, Object> model = new HashMap<>();
        model.put("area", icosahedron.getArea());
        model.put("triangles", icosahedron.getOrderedTriangleCoordinates());

        return ResponseEntity.ok(model);
    }

    @PostMapping
    public ResponseEntity userPolygon(@RequestBody List<Vertex> points) throws Exception {
        points.forEach(polygon :: addVertex);
        polygon.calculatePolygonGeometry();

        Map<Object, Object> model = new HashMap<>();
        model.put("area", polygon.getArea());
        model.put("triangles", polygon.getOrderedTriangleCoordinates());

        return ResponseEntity.ok(model);
    }
}
