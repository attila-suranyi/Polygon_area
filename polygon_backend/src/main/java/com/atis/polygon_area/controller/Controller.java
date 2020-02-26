package com.atis.polygon_area.controller;

import com.atis.polygon_area.geometry.GeometryCalculable;
import com.atis.polygon_area.shapes.Icosahedron;
import com.atis.polygon_area.shapes.Tetrahedron;
import com.atis.polygon_area.shapes.Triangle;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class Controller {

    @Autowired
    private Triangle triangle;

    @Autowired
    private Tetrahedron tetrahedron;

    @Autowired
    private Icosahedron icosahedron;


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
}
