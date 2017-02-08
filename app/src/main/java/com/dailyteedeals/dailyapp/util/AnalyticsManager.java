package com.dailyteedeals.dailyapp.util;

import android.content.Context;

import com.dailyteedeals.dailyapp.BuildConfig;
import com.dailyteedeals.dailyapp.R;
import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Tracker;

import timber.log.Timber;

public class AnalyticsManager {
    private static Context sAppContext = null;

    private static Tracker mTracker;

    public static synchronized void setTracker(Tracker tracker) {
        mTracker = tracker;
    }

    private static boolean canSend() {
        return !BuildConfig.DEBUG;
    }

    public static void sendScreenView(String screenName) {
        if (canSend()) {
            mTracker.setScreenName(screenName);
            mTracker.send(new HitBuilders.AppViewBuilder().build());
            Timber.d("Screen View recorded: " + screenName);
        } else {
            Timber.d("Screen View NOT recorded (analytics disabled or not ready).");
        }
    }

    public static void sendEvent(String category, String action, String label, long value) {
        if (canSend()) {
            mTracker.send(new HitBuilders.EventBuilder()
                    .setCategory(category)
                    .setAction(action)
                    .setLabel(label)
                    .setValue(value)
                    .build());

            Timber.d("Event recorded:");
            Timber.d("\tCategory: " + category);
            Timber.d("\tAction: " + action);
            Timber.d("\tLabel: " + label);
            Timber.d("\tValue: " + value);
        } else {
            Timber.d("Analytics event ignored (analytics disabled or not ready).");
        }
    }

    public static void sendEvent(String category, String action, String label) {
        sendEvent(category, action, label, 0);
    }

    public Tracker getTracker() {
        return mTracker;
    }

    public static synchronized void initializeAnalyticsTracker(Context context) {
        sAppContext = context;
        if (mTracker == null) {
            mTracker = GoogleAnalytics.getInstance(context).newTracker(R.xml.app_tracker);
        }
    }
}