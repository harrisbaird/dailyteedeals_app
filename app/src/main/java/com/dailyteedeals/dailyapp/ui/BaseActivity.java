package com.dailyteedeals.dailyapp.ui;

import android.content.Intent;
import android.content.res.TypedArray;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.widget.Toolbar;
import android.util.TypedValue;
import android.view.MenuItem;

import com.bumptech.glide.Glide;
import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.ImageModelLoader;
import com.dailyteedeals.dailyapp.io.model.Product;
import com.dailyteedeals.dailyapp.util.AnalyticsManager;
import com.dailyteedeals.dailyapp.util.LUtils;

import java.io.InputStream;

public class BaseActivity extends ActionBarActivity {

    // Primary toolbar
    private Toolbar mActionBarToolbar;

    // Helper methods for Lollipop APIs
    private LUtils mLUtils;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mLUtils = LUtils.getInstance(this);

        Glide.get(this).register(Product.class, InputStream.class, new ImageModelLoader.Factory());

        AnalyticsManager.initializeAnalyticsTracker(getApplicationContext());
    }

    @Override
    public void setContentView(int layoutResID) {
        super.setContentView(layoutResID);
        getActionBarToolbar();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case R.id.menu_item_settings:
                startActivity(new Intent(this, SettingsActivity.class));
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @Override
    public void onTrimMemory(int level) {
        super.onTrimMemory(level);
        Glide.get(this).trimMemory(level);
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        Glide.get(this).clearMemory();
    }

    protected Toolbar getActionBarToolbar() {
        if (mActionBarToolbar == null) {
            mActionBarToolbar = (Toolbar) findViewById(R.id.toolbar_actionbar);
            if (mActionBarToolbar != null) {
                setSupportActionBar(mActionBarToolbar);
            }
        }
        return mActionBarToolbar;
    }

    protected int getActionBarSize() {
        TypedValue typedValue = new TypedValue();
        int[] textSizeAttr = new int[]{R.attr.actionBarSize};
        int indexOfAttrTextSize = 0;
        TypedArray a = obtainStyledAttributes(typedValue.data, textSizeAttr);
        int actionBarSize = a.getDimensionPixelSize(indexOfAttrTextSize, -1);
        a.recycle();
        return actionBarSize;
    }

    protected int getScreenHeight() {
        return findViewById(android.R.id.content).getHeight();
    }

    public LUtils getLUtils() {
        return mLUtils;
    }
}