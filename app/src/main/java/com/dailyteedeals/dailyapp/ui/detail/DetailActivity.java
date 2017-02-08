package com.dailyteedeals.dailyapp.ui.detail;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.v4.view.ViewPager;
import android.view.MenuItem;
import android.view.View;

import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.model.Product;
import com.dailyteedeals.dailyapp.ui.BaseActivity;
import com.dailyteedeals.dailyapp.util.AnalyticsManager;
import com.dailyteedeals.dailyapp.util.Constants;

import org.parceler.Parcels;

import java.util.ArrayList;

import butterknife.ButterKnife;
import butterknife.InjectView;

public class DetailActivity extends BaseActivity {

    private DetailPagerAdapter mDetailPagerAdapter;
    private ArrayList<Product> mProducts;
    private static final String SCREEN_LABEL = "Detail";

    @InjectView(R.id.view_pager) ViewPager mViewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE);


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

//        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//        getSupportActionBar().setDisplayShowHomeEnabled(true);
//        getSupportActionBar().setDisplayShowTitleEnabled(false);

        ButterKnife.inject(this);

        Intent intent = this.getIntent();
        Bundle bundle = intent.getExtras();
        mProducts = Parcels.unwrap(bundle.getParcelable(Constants.EXTRA_PRODUCTS));
        int position = bundle.getInt(Constants.EXTRA_POSITION);

        mDetailPagerAdapter = new DetailPagerAdapter(getFragmentManager(), mProducts);
        mViewPager.setAdapter(mDetailPagerAdapter);
        mViewPager.setCurrentItem(position);
        mViewPager.setOffscreenPageLimit(3);
        mViewPager.setPageMargin(2);
        mViewPager.setPageMarginDrawable(R.color.theme_divider);
        mViewPager.setPageTransformer(true, new ParallaxViewTransformer());
        AnalyticsManager.sendScreenView(SCREEN_LABEL);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case android.R.id.home:
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public static void launch(Activity activity, View view, ArrayList<Product> products, int position) {
        Intent intent = new Intent(activity, DetailActivity.class);
        Parcelable wrappedAutoValue = Parcels.wrap(ArrayList.class, products);

        intent.putExtra(Constants.EXTRA_PRODUCTS, wrappedAutoValue);
        intent.putExtra(Constants.EXTRA_POSITION, position);

        activity.startActivity(intent);
    }
}



