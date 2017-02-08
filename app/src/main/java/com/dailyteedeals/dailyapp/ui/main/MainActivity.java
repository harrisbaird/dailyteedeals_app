package com.dailyteedeals.dailyapp.ui.main;

import android.animation.ValueAnimator;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.model.Price;
import com.dailyteedeals.dailyapp.ui.BaseActivity;
import com.dailyteedeals.dailyapp.util.AnalyticsManager;
import com.dailyteedeals.dailyapp.util.PrefUtils;
import com.dailyteedeals.dailyapp.util.UnobtrusiveNotificationsUtils;
import com.github.ksoichiro.android.observablescrollview.ObservableScrollViewCallbacks;
import com.github.ksoichiro.android.observablescrollview.ScrollState;
import com.github.ksoichiro.android.observablescrollview.Scrollable;
import com.github.ksoichiro.android.observablescrollview.TouchInterceptionFrameLayout;
import com.google.samples.apps.iosched.ui.widget.SlidingTabLayout;

import java.util.Arrays;
import java.util.Currency;
import java.util.Locale;

import butterknife.ButterKnife;
import butterknife.InjectView;
import timber.log.Timber;


public class MainActivity extends BaseActivity
                       implements ObservableScrollViewCallbacks {

    @InjectView(R.id.sliding_tabs)      SlidingTabLayout mSlidingTabLayout;
    @InjectView(R.id.pager_wrapper)     FrameLayout mPageWrapper;
    @InjectView(R.id.view_pager)        ViewPager mViewPager;
    @InjectView(R.id.header)            LinearLayout mHeaderView;
    @InjectView(R.id.toolbar_actionbar) Toolbar mToolbarView;
    @InjectView(R.id.container)         TouchInterceptionFrameLayout mInterceptionLayout;

    private MainPagerAdapter mMainPagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.inject(this);

        getLUtils().setStatusBarColor(getResources().getColor(R.color.theme_alt));

        // Set the default preferences
        PrefUtils.appLaunched(this);

        mMainPagerAdapter = new MainPagerAdapter(getSupportFragmentManager(), this);
        mViewPager.setAdapter(mMainPagerAdapter);
        mViewPager.setOffscreenPageLimit(1);

        mSlidingTabLayout.setCustomTabView(R.layout.tab_indicator, android.R.id.text1);
        mSlidingTabLayout.setSelectedIndicatorColors(getResources().getColor(R.color.tab_selected_indicator));
        mSlidingTabLayout.setViewPager(mViewPager);

        final int tabHeight = getResources().getDimensionPixelSize(R.dimen.tab_height);
        mPageWrapper.setPadding(0, getActionBarSize() + tabHeight, 0, 0);

        AnalyticsManager.sendScreenView("Grid");

        setDefaultCurrencyOnFirstLaunch();
    }

    private Scrollable getCurrentScrollable() {
        Fragment fragment = getCurrentFragment();
        if (fragment == null) {
            return null;
        }
        View view = fragment.getView();
        if (view == null) {
            return null;
        }
        return (Scrollable) view.findViewById(R.id.recycler_view);
    }

    private void adjustToolbar(ScrollState scrollState) {
        int toolbarHeight = mToolbarView.getHeight();
        final Scrollable scrollable = getCurrentScrollable();
        if (scrollable == null) {
            return;
        }
        int scrollY = scrollable.getCurrentScrollY();
        if (scrollState == ScrollState.DOWN) {
            showToolbar();
        } else if (scrollState == ScrollState.UP) {
            if (toolbarHeight <= scrollY) {
                hideToolbar();
            } else {
                showToolbar();
            }
        } else if (!toolbarIsShown() && !toolbarIsHidden()) {
            // Toolbar is moving but doesn't know which to move:
            // you can change this to hideToolbar()
            showToolbar();
        }
    }

    private Fragment getCurrentFragment() {
        return mMainPagerAdapter.getItemAt(mViewPager.getCurrentItem());
    }

    private boolean toolbarIsShown() {
        return mInterceptionLayout.getTranslationY() == 0;
    }

    private boolean toolbarIsHidden() {
        return mInterceptionLayout.getTranslationY() == -mToolbarView.getHeight();
    }

    private void showToolbar() {
        animateToolbar(0);
    }

    private void hideToolbar() {
        animateToolbar(-mToolbarView.getHeight());
    }

    private void animateToolbar(final float toY) {
        float layoutTranslationY = mInterceptionLayout.getTranslationY();
        if (layoutTranslationY != toY) {
            ValueAnimator animator = ValueAnimator.ofFloat(mInterceptionLayout.getTranslationY(), toY).setDuration(200);
            animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animation) {
                    float translationY = (float) animation.getAnimatedValue();
                    mInterceptionLayout.setTranslationY(translationY);
                    if (translationY < 0) {
                        FrameLayout.LayoutParams lp = (FrameLayout.LayoutParams) mInterceptionLayout.getLayoutParams();
                        lp.height = (int) (-translationY + getScreenHeight());
                        mInterceptionLayout.requestLayout();
                    }
                }
            });
            animator.start();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        UnobtrusiveNotificationsUtils.trySetAlarm(this);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    private void setDefaultCurrencyOnFirstLaunch() {
        if(!PrefUtils.wasDefaultCurrecyCodeSet(this)) {
            Currency currency = Currency.getInstance(Locale.getDefault());

            String systemCurrency = currency.getCurrencyCode();
            Timber.i("Currency: System locale is " + systemCurrency);

            if(Arrays.asList(Price.VALID_CODES).contains(systemCurrency)) {
                PrefUtils.putCurrencyCode(this, systemCurrency);
                Timber.i("Currency: Using system locale");
            } else {
                PrefUtils.putCurrencyCode(this, Price.VALID_CODES[0]);
                Timber.i("Currency: Defaulting to USD");
            }

            PrefUtils.markDefaultCurrecyCodeSet(this);
        }
    }

    @Override
    public void onScrollChanged(int i, boolean b, boolean b2) {

    }

    @Override
    public void onDownMotionEvent() {

    }

    @Override
    public void onUpOrCancelMotionEvent(ScrollState scrollState) {
        adjustToolbar(scrollState);
    }
}


