package com.dailyteedeals.dailyapp.ui.main;


import android.content.Context;
import android.content.res.Resources;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.view.ViewGroup;

import com.bumptech.glide.Glide;
import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.model.Product;


public class MainPagerAdapter extends FragmentPagerAdapter {

    private final Context mContext;
    private int mLastPosition = -1;
    private Fragment mLastFragment;
    private static final int[] TITLES = new int[] { R.string.tab_today,
                                                    R.string.tab_week};

    public MainPagerAdapter(FragmentManager fm, Context context) {
        super(fm);
        mContext = context;
    }


    @Override
    public android.support.v4.app.Fragment getItem(int position) {
        return GridFragment.newInstance(position, Product.TYPES[position]);
    }

    @Override
    public int getCount() {
        return TITLES.length;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        Resources resources = mContext.getResources();
        return resources.getString(TITLES[position]);
    }

    @Override
    public void setPrimaryItem(ViewGroup container, int position, Object object) {
        super.setPrimaryItem(container, position, object);
        if (position != mLastPosition) {
            if (mLastPosition >= 0) {
                Glide.with(mLastFragment).pauseRequests();
            }
            Fragment current = (Fragment) object;
            mLastPosition = position;
            mLastFragment = current;
            if (current.isAdded()) {
                Glide.with(current).resumeRequests();
            }
        }
    }
}