package com.dailyteedeals.dailyapp.io;

import com.dailyteedeals.dailyapp.util.Constants;
import com.dailyteedeals.dailyapp.io.model.Product;

import java.util.ArrayList;

import retrofit.Callback;
import retrofit.RequestInterceptor;
import retrofit.RestAdapter;
import retrofit.http.GET;
import retrofit.http.Query;

import static retrofit.RestAdapter.Builder;

public class ApiClient {
    private static ApiInterface sApiService;
    private static String mHost = "api.dailyteedeals.com";
    private static String mApiVersion = "v1";

    public static ApiInterface getApiClient() {
        if (sApiService == null) {
            RestAdapter restAdapter = new Builder()
                    .setRequestInterceptor(new BasicRequestInterceptor())
                    .setEndpoint("https://"+ mHost + "/" + mApiVersion)
                    .build();

            sApiService = restAdapter.create(ApiInterface.class);
        }

        return sApiService;
    }

    public interface ApiInterface {
        @GET("/products.json")
        void getProducts(@Query("type") String type,
                         Callback<ArrayList<Product>> callback);
    }

    private static class BasicRequestInterceptor implements RequestInterceptor {
        @Override
        public void intercept(RequestFacade requestFacade) {
            requestFacade.addQueryParam("key", Constants.API_KEY);
        }
    }
}