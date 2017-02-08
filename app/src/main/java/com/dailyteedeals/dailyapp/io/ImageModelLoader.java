package com.dailyteedeals.dailyapp.io;


import android.content.Context;

import com.bumptech.glide.load.model.GenericLoaderFactory;
import com.bumptech.glide.load.model.GlideUrl;
import com.bumptech.glide.load.model.ModelCache;
import com.bumptech.glide.load.model.ModelLoader;
import com.bumptech.glide.load.model.ModelLoaderFactory;
import com.bumptech.glide.load.model.stream.BaseGlideUrlLoader;
import com.dailyteedeals.dailyapp.io.model.Product;

import java.io.InputStream;

public class ImageModelLoader extends BaseGlideUrlLoader<Product> {

    public static class Factory implements ModelLoaderFactory<Product, InputStream> {
        private final ModelCache<Product, GlideUrl> modelCache = new ModelCache<Product, GlideUrl>(500);

        @Override
        public ModelLoader<Product, InputStream> build(Context context, GenericLoaderFactory factories) {
            return new ImageModelLoader(context, modelCache);
        }

        @Override
        public void teardown() {
        }
    }

    public ImageModelLoader(Context context, ModelCache<Product, GlideUrl> modelCache) {
        super(context, modelCache);
    }

    @Override
    protected String getUrl(Product model, int width, int height) {
        return model.image.url;
    }
}