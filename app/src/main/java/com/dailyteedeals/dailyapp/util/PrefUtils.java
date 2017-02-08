package com.dailyteedeals.dailyapp.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.model.Price;

import java.util.Calendar;

public class PrefUtils {
    public static final String PREF_NOTIFICATIONS_ENABLED = "pref_notifications_enabled";
    public static final String PREF_FEEDBACK_SHOWN = "pref_feedback_shown";
    public static final String PREF_DETAIL_TUTORIAL_SHOWN = "pref_detail_tutorial_shown";
    public static final String PREF_DEFAULT_CURRENCY_CODE_SET = "pref_default_currency_set";
    public static final String PREF_CURRENCY_CODE = "pref_currency_code";
    public static final String PREF_LAST_OPENED = "pref_last_opened";

    public static void appLaunched(Context context) {
        PreferenceManager.setDefaultValues(context, R.xml.preferences, false);
        PrefUtils.updateLastOpened(context);
    }

    public static void markDetailTutorialShown(Context context) {
        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(context);
        sp.edit().putBoolean(PREF_DETAIL_TUTORIAL_SHOWN, true).commit();
    }

    public static boolean wasDetailTutorialShown(Context context) {
        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(context);
        return sp.getBoolean(PREF_DETAIL_TUTORIAL_SHOWN, false);
    }

    public static void markDefaultCurrecyCodeSet(Context context) {
        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(context);
        sp.edit().putBoolean(PREF_DEFAULT_CURRENCY_CODE_SET, true).commit();
    }

    public static boolean wasDefaultCurrecyCodeSet(Context context) {
        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(context);
        return sp.getBoolean(PREF_DEFAULT_CURRENCY_CODE_SET, false);
    }

    public static String getCurrencyCode(Context context) {
        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(context);
        return sp.getString(PREF_CURRENCY_CODE, Price.VALID_CODES[0]);
    }

    public static void putCurrencyCode(Context context, String currencyCode) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(PREF_CURRENCY_CODE, currencyCode);
        editor.commit();
    }

    public static void updateLastOpened(Context context) {
        Calendar today = Calendar.getInstance();

        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(context);
        sp.edit().putLong(PREF_LAST_OPENED, today.getTimeInMillis()).commit();
    }

    public static long getLastOpened(Context context) {
        Calendar today = Calendar.getInstance ();

        SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(context);
        return sp.getLong(PREF_LAST_OPENED, today.getTimeInMillis());
    }

}
