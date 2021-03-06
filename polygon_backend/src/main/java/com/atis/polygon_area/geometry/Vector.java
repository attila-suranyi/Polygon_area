package com.atis.polygon_area.geometry;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class Vector {
    private double X;
    private double Y;
    private double Z;

    public Vector(Vertex v) {
        this.X = v.getX();
        this.Y = v.getY();
        this.Z = v.getZ();
    }

    public static Vector subtract(Vertex v1, Vertex v2) {
        return new Vector (v1.getX() - v2.getX(), v1.getY() - v2.getY(), v1.getZ() - v2.getZ());
    }

    /**
     * Static cross product methods that creates a new vector with the
     * cross product of the two given vectors.
     * @param v1 the first vector to cross with
     * @param v2 the second vector to cross with
     * @return a new vector containing the cross product
     */
    public static Vector cross(Vector v1, Vector v2) {
        return new Vector ((v1.Y*v2.Z) - (v1.Z*v2.Y),
                (v1.Z*v2.X) - (v1.X*v2.Z),
                (v1.X*v2.Y) - (v1.Y*v2.X));
    }

    /**
     * Static method that returns the dot product of the two given *
     * vectors.
     * @param v1 the first vector of the dot product
     * @param v2 the second vector of the dot product
     * @return the dot product
     */
    public static double dot(Vector v1, Vector v2) {
        return (v1.X * v2.X) + (v1.Y * v2.Y) + (v1.Z * v2.Z);
    }

    /**
     * Static method that calculates the normal vector from three points
     * @param v1 first point
     * @param v2 second point
     * @param v3 third point
     * @return the normal vector
     */
    public static Vector normalVector(Vertex v1, Vertex v2, Vertex v3) {
        Vector v1v2 = Vector.subtract(v2, v1);
        Vector v1v3 = Vector.subtract(v3, v1);

        return Vector.cross(v1v2, v1v3);
    }

    public static Vector normalise(Vector v1) {
        double dotProduct = Vector.dot(v1, v1);
        double magnitude = Math.sqrt(dotProduct);
        return new Vector(v1.getX() / magnitude, v1.getY() / magnitude, v1.getZ() / magnitude);
    }
}
