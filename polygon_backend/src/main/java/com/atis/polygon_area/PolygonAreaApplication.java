package com.atis.polygon_area;

import com.atis.polygon_area.geometry.Triangle;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PolygonAreaApplication {

    public static void main(String[] args) {
        SpringApplication.run(PolygonAreaApplication.class, args);
        Triangle t = new Triangle();
        System.out.println(t.getArea());
    }

}
