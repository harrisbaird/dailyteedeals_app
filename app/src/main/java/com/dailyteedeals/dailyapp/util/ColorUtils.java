package com.dailyteedeals.dailyapp.util;

import android.graphics.Color;

/**
 * Created by daniel on 03/01/2015.
 */
public class ColorUtils {
    public static int darkenColor(int color, float amount) {
        float[] hsv = new float[3];
        Color.colorToHSV(color, hsv);
        hsv[2] *= Math.max(0, 1f - amount);
        return Color.HSVToColor(hsv);
    }

    public static int parseColor(String color) {
        try {
            return Color.parseColor(color);
        } catch (IllegalArgumentException e) {
            return Color.BLACK;
        }
    }

    public static int blackOrWhiteContrastingColor(int color) {
        int[] rgbaArray = new int[]{Color.red(color), Color.green(color), Color.blue(color)};
        double a = 1 - ((0.00299 * (double) rgbaArray[0]) + (0.00587 * (double) rgbaArray[1]) + (0.00114 * (double) rgbaArray[2]));
        return a < 0.5 ? Color.BLACK : Color.WHITE;
    }
}
