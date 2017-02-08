package com.dailyteedeals.dailyapp.io.model;

import org.parceler.Parcel;
import org.parceler.Transient;

@Parcel
public class Price {
    @Transient
    public static final String[] VALID_CODES = new String[]{"USD", "EUR", "GBP"};

    public String currency_code;
    public String formatted_value;
    public boolean approximate;
}
