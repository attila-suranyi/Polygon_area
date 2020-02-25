package com.atis.polygon_area.controller;

import com.atis.polygon_area.shapes.Cube;
import com.atis.polygon_area.shapes.Icosahedron;
import com.atis.polygon_area.shapes.Tetrahedron;
import com.atis.polygon_area.shapes.Triangle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class Controller {

    @Autowired
    private Triangle triangle;

    @Autowired
    private Tetrahedron tetrahedron;

    @Autowired
    private Cube cube;

    @Autowired
    private Icosahedron icosahedron;

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

    @GetMapping("/cube")
    public ResponseEntity getCubeGeometry() {
        Map<Object, Object> model = new HashMap<>();
        model.put("area", cube.getArea());
        model.put("triangles", cube.getOrderedTriangleCoordinates());

        return ResponseEntity.ok(model);
    }

    @GetMapping("/icosahedron")
    public ResponseEntity getDodecahedronGeometry() {
        Map<Object, Object> model = new HashMap<>();
        model.put("area", icosahedron.getArea());
        model.put("triangles", icosahedron.getOrderedTriangleCoordinates());

        return ResponseEntity.ok(model);
    }
}
