package com.dailyteedeals.dailyapp.ui.detail;

import android.app.Fragment;
import android.app.FragmentManager;
import android.support.v13.app.FragmentStatePagerAdapter;

import com.dailyteedeals.dailyapp.io.model.Product;

import java.util.ArrayList;

/**
* Created by daniel on 23/11/2014.
*/
public class DetailPagerAdapter extends FragmentStatePagerAdapter {

    private ArrayList<Product> mProducts;

    public DetailPagerAdapter(FragmentManager fm, ArrayList<Product> products) {
        super(fm);
        mProducts = products;
    }

    @Override
    public Fragment getItem(int position) {
        // getItem is called to instantiate the fragment for the given page.
        // Return a PlaceholderFragment (defined as a static inner class below).
        return DetailFragment.newInstance(mProducts.get(position));
    }

    @Override
    public int getCount() {
        return mProducts.size();
    }

}

