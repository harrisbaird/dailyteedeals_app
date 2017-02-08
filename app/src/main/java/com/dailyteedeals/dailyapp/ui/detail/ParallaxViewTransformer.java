package com.dailyteedeals.dailyapp.ui.detail;

import android.support.v4.view.ViewPager;
import android.view.View;
import android.widget.ImageView;

import com.dailyteedeals.dailyapp.R;

public class ParallaxViewTransformer implements ViewPager.PageTransformer {

    private int mImageId;

    public ParallaxViewTransformer() {
        this.mImageId = R.id.background_image;
    }

    @Override
    public void transformPage(View pageView, float position) {
        int pageWidth = pageView.getWidth();

        ImageView imageView = (ImageView) pageView.findViewById(mImageId);

        if (position <= 0) { // [-1,0]
            if (imageView.getId() == mImageId) {
                imageView.setTranslationX(pageWidth * -position / 1.4f);
            } else {
                // Use the default slide transition when moving to the left page if the target view
                // is not found.
                imageView.setTranslationX(0);
            }

        } else if (position <= 1) { // (0,1]
            // Counteract the default slide transition
            imageView.setTranslationX(pageWidth * -position / 1.4f);
        }


    }
}