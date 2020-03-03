package com.atis.polygon_area.util;

public class Util {

    public static double generateRandomDoubleBetween(int min, int max) {
        return min + (int)(Math.random() * ((max - min) + 1));
    }
}
