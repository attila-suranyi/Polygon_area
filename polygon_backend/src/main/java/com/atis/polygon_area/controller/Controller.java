package com.atis.polygon_area.controller;

import com.atis.polygon_area.geometry.Cube;
import com.atis.polygon_area.geometry.Pyramid;
import com.atis.polygon_area.geometry.Triangle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class Controller {

    @Autowired
    private Triangle triangle;

    @Autowired
    private Pyramid pyramid;

    @Autowired
    private Cube cube;

    @GetMapping("/triangle")
    public ResponseEntity getTriangleGeometry() {
        Map<Object, Object> model = new HashMap<>();
        model.put("area", triangle.getArea());
        model.put("vertexCoordinates", triangle.getOrderedVertexCoordinates());

        return ResponseEntity.ok(model);
    }

    @GetMapping("/pyramid")
    public ResponseEntity getPyramidGeometry() {
        Map<Object, Object> model = new HashMap<>();
        model.put("area", pyramid.getArea());
        model.put("vertexCoordinates", pyramid.getOrderedVertexCoordinates());

        return ResponseEntity.ok(model);
    }

    @GetMapping("/cube")
    public ResponseEntity getCubeGeometry() {
        Map<Object, Object> model = new HashMap<>();
        model.put("area", cube.getArea());
        model.put("vertexCoordinates", cube.getOrderedVertexCoordinates());

        return ResponseEntity.ok(model);
    }
}
