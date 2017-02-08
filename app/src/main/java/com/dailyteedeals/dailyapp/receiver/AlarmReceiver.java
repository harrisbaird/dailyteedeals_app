package com.dailyteedeals.dailyapp.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.dailyteedeals.dailyapp.service.NotificationService;
import com.dailyteedeals.dailyapp.util.UnobtrusiveNotificationsUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

import timber.log.Timber;

public class AlarmReceiver extends BroadcastReceiver
{
    @Override
    public void onReceive(Context context, Intent intent)
    {
        Log.v("AlarmReceiver", "Got alarm");
        Intent service1 = new Intent(context, NotificationService.class);
        context.startService(service1);

        Date now = new Date();
        SimpleDateFormat ft = new SimpleDateFormat ("hh:mm:ss");
        Timber.v(ft.format(now));

        // Reset alarm for tomorrow
        UnobtrusiveNotificationsUtils.trySetAlarm(context);
    }
}