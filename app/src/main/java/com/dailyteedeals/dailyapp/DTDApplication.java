package com.dailyteedeals.dailyapp;

import android.app.Application;

import timber.log.Timber;

import static timber.log.Timber.DebugTree;

public class DTDApplication extends Application {
    @Override public void onCreate() {
        super.onCreate();

        if (BuildConfig.DEBUG) {
            Timber.plant(new DebugTree());
        }
    }
}
