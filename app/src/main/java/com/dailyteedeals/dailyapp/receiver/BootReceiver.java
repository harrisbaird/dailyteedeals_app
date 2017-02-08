package com.dailyteedeals.dailyapp.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.dailyteedeals.dailyapp.util.UnobtrusiveNotificationsUtils;

import timber.log.Timber;

public class BootReceiver extends BroadcastReceiver
{
    @Override
    public void onReceive(Context context, Intent intent)
    {
        Timber.v("Got boot");
        UnobtrusiveNotificationsUtils.trySetAlarm(context);
    }
}