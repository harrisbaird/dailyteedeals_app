package com.dailyteedeals.dailyapp.io.model;

import com.dailyteedeals.dailyapp.util.ColorUtils;

import org.parceler.Parcel;

@Parcel
public class Image {
    public String url;
    public String background_color;
    public String dominant_color;

    /**
     *
     * @return
     */
//    public int backgroundOrDominant() {
//        return ColorUtils.isDark(backgroundColor()) ? dominantColor() : backgroundColor();
//    }

    public int dominantColor() {
        return ColorUtils.parseColor(dominant_color);
    }

    public int backgroundColor() {
        return ColorUtils.parseColor(background_color);
    }

    public int darkDominantColor() {
        return ColorUtils.darkenColor(dominantColor(), 0.4f);
    }

    public int darkBackgroundColor() {
        return ColorUtils.darkenColor(backgroundColor(), 0.4f);
    }
}