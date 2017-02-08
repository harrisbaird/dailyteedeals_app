package com.dailyteedeals.dailyapp.util;

import android.content.Context;
import android.content.res.Configuration;

/**
 * Created by daniel on 06/02/2015.
 */
public class ScreenUtils {
    public static boolean isLandscape(Context context) {
        return getOrientation(context) == Configuration.ORIENTATION_LANDSCAPE;
    }

    public static boolean isPortrait(Context context) {
        return getOrientation(context) == Configuration.ORIENTATION_PORTRAIT;
    }

    private static int getOrientation(Context context) {
        return context.getResources().getConfiguration().orientation;
    }
}
