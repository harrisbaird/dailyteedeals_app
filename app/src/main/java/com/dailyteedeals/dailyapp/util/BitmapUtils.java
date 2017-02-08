package com.dailyteedeals.dailyapp.util;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.support.v8.renderscript.Allocation;
import android.support.v8.renderscript.Element;
import android.support.v8.renderscript.RenderScript;
import android.support.v8.renderscript.ScriptIntrinsicBlur;

import timber.log.Timber;

public class BitmapUtils {
    private static int BITMAP_MULTIPLE = 4;

    public static Bitmap cropAndBlur(Context context, Bitmap bitmap, int radius) {
        Bitmap cropped = centerCrop(bitmap, 0.5f);

        long startTime = System.currentTimeMillis();
        Bitmap returned = renderscriptBlur(context, cropped, radius);
        long stopTime = System.currentTimeMillis();
        long elapsedTime = stopTime - startTime;
        Timber.v("Renderscript took: %sms", elapsedTime);
        return returned;
    }

    public static Bitmap centerCrop(Bitmap bitmap, float scale) {
        return centerCrop(bitmap, scale, scale);
    }

    public static Bitmap centerCrop(Bitmap bitmap, float scaleX, float scaleY) {
        int newWidth = roundToMultiple((int) (bitmap.getWidth() * scaleX));
        int newHeight = roundToMultiple((int) (bitmap.getHeight() * scaleY));

        Matrix matrix = new Matrix();
        matrix.postScale(scaleX, scaleY);
        return Bitmap.createBitmap(bitmap, newWidth / 2, newHeight / 2, newWidth, newHeight, matrix, true);
    }

    public static Bitmap renderscriptBlur(Context context, Bitmap source, int radius) {
        Bitmap bitmap = source.copy(Bitmap.Config.ARGB_8888, true);
        Bitmap newBitmap = Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), Bitmap.Config.ARGB_8888);

        RenderScript rs = RenderScript.create(context);
        rs.setPriority(RenderScript.Priority.LOW);
        Allocation input = Allocation.createFromBitmap(rs, bitmap, Allocation.MipmapControl.MIPMAP_NONE, (Allocation.USAGE_SCRIPT | Allocation.USAGE_SHARED));
        Allocation output = Allocation.createTyped(rs, input.getType());

        try {
            final ScriptIntrinsicBlur script = ScriptIntrinsicBlur.create(rs, Element.U8_4(rs));
            script.setRadius(radius);
            script.setInput(input);
            script.forEach(output);
            output.copyTo(newBitmap);
        } catch (Exception e) {
            newBitmap = bitmap;
        } finally {
            rs.destroy();
            input.destroy();
            output.destroy();
        }

        return newBitmap;
    }

    private static int roundToMultiple(int i) {
        return Math.round(i/BITMAP_MULTIPLE) * BITMAP_MULTIPLE;
    }
}
