package com.dailyteedeals.dailyapp.ui.main;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.DrawableRequestBuilder;
import com.bumptech.glide.GenericRequestBuilder;
import com.bumptech.glide.Glide;
import com.bumptech.glide.ListPreloader;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.model.Price;
import com.dailyteedeals.dailyapp.io.model.Product;
import com.dailyteedeals.dailyapp.ui.detail.DetailActivity;
import com.dailyteedeals.dailyapp.ui.widget.SquareFrameLayout;

import java.util.ArrayList;
import java.util.List;

import butterknife.ButterKnife;
import butterknife.InjectView;

public class GridProductAdapter extends RecyclerView.Adapter<GridProductAdapter.ViewHolder>
                                implements ListPreloader.PreloadModelProvider<Product> {
    private ArrayList<Product> mProducts;
    private DrawableRequestBuilder<Product> mThumbnailRequest;
    private Context mContext;

    public GridProductAdapter(Context context, ArrayList<Product> objects) {
        mProducts = objects;
        mContext = context;

        mThumbnailRequest = Glide.with(context)
                .from(Product.class)
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .override(250, 250);
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View itemView = LayoutInflater.from(viewGroup.getContext())
                                      .inflate(R.layout.list_item_product, viewGroup, false);

        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, final int position) {
        Product product = mProducts.get(position);

        mThumbnailRequest
                .load(product)
                .into(holder.imageView);

        holder.designNameText.setText(product.design.name);
        holder.siteNameText.setText(product.site.name);
        holder.container.setBackgroundColor(product.image.backgroundColor());

        Price price = product.priceFromLocale(mContext);

        holder.priceText.setText(price.formatted_value);
        holder.priceApproximateText.setVisibility(price.approximate ? View.VISIBLE : View.GONE);

        holder.container.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DetailActivity.launch((MainActivity) mContext, view, mProducts, position);
            }
        });
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public int getItemCount() {
        return mProducts.size();
    }

    @Override
    public List<Product> getPreloadItems(int position) {
        return mProducts.subList(position, position + 1);
    }

    @Override
    public GenericRequestBuilder getPreloadRequestBuilder(Product product) {
        return mThumbnailRequest.load(product);
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        @InjectView(R.id.background_container)   SquareFrameLayout container;
        @InjectView(R.id.image_view)             ImageView imageView;
        @InjectView(R.id.design_name_text)       TextView designNameText;
        @InjectView(R.id.site_name_text)         TextView siteNameText;
        @InjectView(R.id.price_text)             TextView priceText;
        @InjectView(R.id.price_approximate_text) TextView priceApproximateText;

        public ViewHolder(View itemView) {
            super(itemView);
            ButterKnife.inject(this, itemView);
        }
    }
}