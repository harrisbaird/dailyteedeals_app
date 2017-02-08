package com.dailyteedeals.dailyapp.io.model;

import android.content.Context;

import com.dailyteedeals.dailyapp.util.PrefUtils;

import org.parceler.Parcel;
import org.parceler.Transient;

import java.util.ArrayList;

@Parcel
public class Product {
    @Transient
    public static final String[] TYPES = new String[]{"daily", "weekly", "discover"};

    public Image  image;
    public Site   site;
    public Design design;
    public ArrayList<Price> prices;
    public String buy_url;
    public String display_price;
    public boolean last_chance;

    public Price priceFromCurrency(String currency) {
        for(Price price : prices) {
            if (price.currency_code.equals(currency)) {
                return price;
            }
        }

        return null;
    }

    public Price priceFromLocale(Context context) {
        return priceFromCurrency(PrefUtils.getCurrencyCode(context));
    }
}