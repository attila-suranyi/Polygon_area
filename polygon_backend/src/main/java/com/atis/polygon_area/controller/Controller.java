package com.atis.polygon_area.controller;

import com.atis.polygon_area.geometry.GeometryCalculable;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class Controller {

    @Autowired
    @Qualifier("triangle")
    private GeometryCalculable triangle;

    @Autowired
    @Qualifier("tetrahedron")
    private GeometryCalculable tetrahedron;

    @Autowired
    @Qualifier("icosahedron")
    private GeometryCalculable icosahedron;


    @Qualifier("polygon")
    @Autowired
    private Polygon polygon;

    @GetMapping("/triangle")
    public ResponseEntity getTriangleGeometry() {
        Map<String, Object> model = triangle.getPolygonGeometry();

        return ResponseEntity.ok(model);
    }

    @GetMapping("/tetrahedron")
    public ResponseEntity getPyramidGeometry() {
        Map<String, Object> model = tetrahedron.getPolygonGeometry();

        return ResponseEntity.ok(model);
    }

    @GetMapping("/icosahedron")
    public ResponseEntity getDodecahedronGeometry() {
        Map<String, Object> model = icosahedron.getPolygonGeometry();

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
