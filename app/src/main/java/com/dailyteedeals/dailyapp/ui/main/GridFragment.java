package com.dailyteedeals.dailyapp.ui.main;

import android.app.Activity;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridView;
import android.widget.ProgressBar;

import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.ApiClient;
import com.dailyteedeals.dailyapp.io.model.Product;
import com.dailyteedeals.dailyapp.ui.widget.GridRecyclerView;
import com.dailyteedeals.dailyapp.util.Constants;
import com.dailyteedeals.dailyapp.util.PrefUtils;
import com.nispok.snackbar.Snackbar;
import com.nispok.snackbar.listeners.ActionClickListener;

import java.util.ArrayList;

import butterknife.ButterKnife;
import butterknife.InjectView;
import retrofit.Callback;
import retrofit.RetrofitError;
import retrofit.client.Response;
import timber.log.Timber;

public class GridFragment extends Fragment
                       implements SharedPreferences.OnSharedPreferenceChangeListener {

    private static class ActivityState {
        private ArrayList<Product> products = new ArrayList<Product>() {
        };
    }

    private GridProductAdapter mAdapter;
    private ActivityState mState = new ActivityState();
    private String mProductType;
    private long mLastDownloaded = 0;
    private boolean mCurrentlyDownloading = false;

    @InjectView(R.id.grid_view)     GridView gridView;
    @InjectView(R.id.progress_bar)  ProgressBar progressBar;

    /**
     * Returns a new instance of this fragment for the given section
     * number.
     */
    public static GridFragment newInstance(int sectionNumber, String queryType) {
        GridFragment fragment = new GridFragment();
        Bundle args = new Bundle();
        args.putString(Constants.ARG_QUERY_TYPE, queryType);
        fragment.setArguments(args);

        return fragment;
    }

    public GridFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mProductType = getArguments().getString(Constants.ARG_QUERY_TYPE);
        setHasOptionsMenu(true);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_grid, container, false);
        ButterKnife.inject(this, rootView);

        mAdapter = new GridProductAdapter(getActivity(), mState.products);

        int columnCount = getResources().getInteger(R.integer.grid_columns);
        int gridSpacing = getResources().getInteger(R.integer.grid_spacing);

        recyclerView.setAdapter(mAdapter);
        recyclerView.addItemDecoration(new SpacesItemDecoration(gridSpacing));

        final GridLayoutManager layoutManager = new GridLayoutManager(getActivity(), columnCount);
        layoutManager.setSmoothScrollbarEnabled(true);
//        layoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
//            @Override
//            public int getSpanSize(int position) {
//                return position == 0 ? layoutManager.getSpanCount() : 1;
//            }
//        });
        recyclerView.setLayoutManager(layoutManager);

        Activity parentActivity = getActivity();

        if (parentActivity instanceof ObservableScrollViewCallbacks) {
            recyclerView.setScrollViewCallbacks((ObservableScrollViewCallbacks) parentActivity);
            Timber.v("Setting callbacks");
        }

        return rootView;
    }

    @Override
    public void onResume() {
        super.onResume();

        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(getActivity());
        sp.registerOnSharedPreferenceChangeListener(this);

        if(isDataOld())
            downloadData();
    }

    private void downloadData() {
        if(mCurrentlyDownloading) return;

        recyclerView.setVisibility(View.GONE);
        mState.products.clear();
        setDownloading(true);

        ApiClient.getApiClient().getProducts(mProductType, new Callback<ArrayList<Product>>() {
            @Override
            public void success(ArrayList<Product> products, Response response) {
                mState.products.addAll(products);
                mLastDownloaded = System.currentTimeMillis();
                setDownloading(false);
                recyclerView.scheduleLayoutAnimation();
                recyclerView.setVisibility(View.VISIBLE);
                recyclerView.scrollToPosition(0);
            }

            @Override
            public void failure(RetrofitError error) {
                Timber.e(error.getMessage());
                setDownloading(false);
                displayErrorSnackbar();
            }
        });
    }

    // TODO: Retry after time on error
    private void displayErrorSnackbar() {
        if(isRemoving()) return;

        Snackbar.with(getActivity())
                .text("Unable to connect")
                .actionLabel("Retry")
                .actionColor(Color.YELLOW)
                .duration(9999)
                .dismissOnActionClicked(false)
                .swipeToDismiss(false)
                .actionListener(new ActionClickListener() {
                    @Override
                    public void onActionClicked() {
                        downloadData();
                    }
                })
                .show(getActivity());
    }

    private void setDownloading(boolean downloading) {
        mCurrentlyDownloading = downloading;
        progressBar.setVisibility(downloading ? View.VISIBLE : View.GONE);
        mAdapter.notifyDataSetChanged();
    }

    private boolean isDataOld() {
        long nextUpdate = mLastDownloaded + Constants.AUTO_REFRESH_MIN_INTERVAL;
        Timber.v("Next update: %s", String.valueOf(nextUpdate));
        return mLastDownloaded == 0 || System.currentTimeMillis() > nextUpdate;
    }

    @Override
    public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) {
        if(key.equals(PrefUtils.PREF_CURRENCY_CODE))
            downloadData();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case R.id.menu_item_refresh:
                downloadData();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}