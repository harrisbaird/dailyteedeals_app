package com.dailyteedeals.dailyapp.ui.detail;

import android.animation.ArgbEvaluator;
import android.animation.ObjectAnimator;
import android.app.Fragment;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.v7.graphics.Palette;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.ScrollView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.Priority;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.animation.GlideAnimation;
import com.bumptech.glide.request.target.SimpleTarget;
import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.model.Price;
import com.dailyteedeals.dailyapp.io.model.Product;
import com.dailyteedeals.dailyapp.util.BitmapUtils;
import com.dailyteedeals.dailyapp.util.ColorUtils;
import com.dailyteedeals.dailyapp.util.Constants;
import com.dailyteedeals.dailyapp.util.ScreenUtils;
import com.readystatesoftware.systembartint.SystemBarTintManager;

import org.parceler.Parcels;

import butterknife.ButterKnife;
import butterknife.InjectView;
import me.grantland.widget.AutofitTextView;

public class DetailFragment extends Fragment {
    @InjectView(R.id.status_bar)         FrameLayout statusBarView;
    @InjectView(R.id.image_view)         ImageView imageView;
    @InjectView(R.id.background_image)   ImageView backgroundImageView;
    @InjectView(R.id.scroll_view)        ScrollView scrollView;
    @InjectView(R.id.info_layout)        FrameLayout topBox;
    @InjectView(R.id.bottom_box)         FrameLayout bottomBox;
    @InjectView(R.id.design_name_text)   AutofitTextView designNameText;
    @InjectView(R.id.more_artist)        TextView moreArtistText;
    @InjectView(R.id.artist_name_text)   AutofitTextView artistNameText;
    @InjectView(R.id.buy_button)         Button buyButton;
    @InjectView(R.id.progress_bar)       ProgressBar progressBar;

    private final int ANIMATION_DURATION = 1000;

    public static DetailFragment newInstance(Product product) {
        DetailFragment fragment = new DetailFragment();
        Bundle args = new Bundle();

        Parcelable productParcel = Parcels.wrap(Product.class, product);

        args.putParcelable(Constants.ARG_PRODUCT, productParcel);
        fragment.setArguments(args);

        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, final ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_detail, container, false);
        ButterKnife.inject(this, rootView);

        final Product product = Parcels.unwrap(getArguments().getParcelable(Constants.ARG_PRODUCT));

        designNameText.setText(product.design.name);
        artistNameText.setText(product.design.artist.name);
        moreArtistText.setText(String.format(getResources().getString(R.string.detail_more_artist), product.design.artist.name));

        // Move content below the status bar
        SystemBarTintManager tintManager = new SystemBarTintManager(getActivity());
        SystemBarTintManager.SystemBarConfig config = tintManager.getConfig();

        statusBarView.setPadding(0, config.getPixelInsetTop(false), config.getPixelInsetRight(), 0);

        if(ScreenUtils.isPortrait(getActivity())) {
            statusBarView.setVisibility(View.VISIBLE);
        } else {
            statusBarView.setVisibility(View.GONE);
            scrollView.setPadding(0, config.getPixelInsetTop(ScreenUtils.isLandscape(getActivity())), 0, 0);
        }

        progressBar.setVisibility(View.VISIBLE);

        Price price = product.priceFromLocale(getActivity());
        buyButton.setText(String.format(getResources().getString(R.string.detail_buy), price.formatted_value));

        Glide.with(this)
             .load(product.image.url)
             .asBitmap()
             .diskCacheStrategy(DiskCacheStrategy.SOURCE)
             .error(R.color.material_blue_grey_800)
             .priority(Priority.HIGH)
             .into(new SimpleTarget<Bitmap>(500, 500) {
                 @Override
                 public void onResourceReady(final Bitmap bitmap, GlideAnimation glideAnimation) {
                     imageView.setImageBitmap(bitmap);

                     if (ScreenUtils.isLandscape(getActivity()))
                         backgroundImageView.setImageBitmap(BitmapUtils.cropAndBlur(getActivity(), bitmap, 25));
                     animateFadeIn(backgroundImageView);


                     progressBar.setVisibility(View.GONE);
                     Palette.generateAsync(bitmap, new Palette.PaletteAsyncListener() {
                         @Override
                         public void onGenerated(Palette palette) {
                             int vibrantColor = palette.getVibrantColor(Color.BLACK);
                             int mutedColor = palette.getDarkMutedColor(Color.BLACK);
                             int placeholder = getResources().getColor(R.color.theme_alt);
                             int topBackground = getResources().getColor(R.color.theme_alt);
                             int bottomBackground = getResources().getColor(R.color.theme_alt);

                             animateBackgroundColor(statusBarView, placeholder, bitmap.getPixel(10, 10));
                             animateTextColor(buyButton, placeholder, ColorUtils.blackOrWhiteContrastingColor(vibrantColor));
                         }
                     });
                 }
             });


        return rootView;
    }

    private void animateBackgroundColor(Object obj, int fromColor, int toColor) {
        animateObject(obj, "backgroundColor", fromColor, toColor);
    }

    private void animateTextColor(Object obj, int fromColor, int toColor) {
        animateObject(obj, "textColor", fromColor, toColor);
    }

    private void animateFadeIn(Object obj) {
        ObjectAnimator.ofFloat(obj, "alpha", 0f, 1f)
                .setDuration(ANIMATION_DURATION)
                .start();
    }

    private void animateObject(Object obj, String propertyName, int fromValue, int toValue) {
        ObjectAnimator.ofObject(obj, propertyName, new ArgbEvaluator(), fromValue, toValue)
                      .setDuration(ANIMATION_DURATION)
                      .start();
    }
}
