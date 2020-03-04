package com.atis.polygon_area.model;

import com.atis.polygon_area.geometry.Vertex;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class UserPolygon {

    public List<Vertex> vertices;
}
