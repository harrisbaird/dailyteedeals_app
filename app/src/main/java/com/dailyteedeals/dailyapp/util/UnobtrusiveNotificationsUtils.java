package com.dailyteedeals.dailyapp.util;

import android.app.AlarmManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.dailyteedeals.dailyapp.receiver.AlarmReceiver;

import java.util.Calendar;

import timber.log.Timber;

public class UnobtrusiveNotificationsUtils {
    public static void trySetAlarm(Context context) {
        if(canSetNotification(context)) {
            Timber.v("Setting Alarm");
            setAlarm(context);
        } else {
            cancelAlarm(context);
        }

        cancelNotification(context, Constants.NOTIFICATION_ID);
    }

    public static boolean canSetNotification(Context context) {
        Calendar cutoff = Calendar.getInstance();
        cutoff.add(Calendar.DAY_OF_YEAR, -Constants.UNOBTRUSIVE_CUTOFF_DAYS);

        return PrefUtils.getLastOpened(context) > cutoff.getTimeInMillis();
    }

    private static void cancelNotification(Context ctx, int notifyId) {
        String ns = Context.NOTIFICATION_SERVICE;
        NotificationManager nMgr = (NotificationManager) ctx.getSystemService(ns);
        nMgr.cancel(notifyId);
    }

    private static void setAlarm(Context context) {
        cancelAlarm(context);

        Calendar tomorrow = getTomorrow();

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(context.ALARM_SERVICE);

        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(context);
        Boolean notificationsEnabled = prefs.getBoolean(PrefUtils.PREF_NOTIFICATIONS_ENABLED, false);

        if(notificationsEnabled) {
            alarmManager.set(AlarmManager.RTC_WAKEUP, tomorrow.getTimeInMillis(), pendingIntent(context));
            Timber.v("Notifications are enabled and alarm is set to: %s", tomorrow.getTime());
        } else {
            Timber.v("Notifications are disabled");
        }
    }

    private static void cancelAlarm(Context context) {
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(context.ALARM_SERVICE);
        alarmManager.cancel(pendingIntent(context));
    }

    private static PendingIntent pendingIntent(Context context) {
        Intent myIntent = new Intent(context, AlarmReceiver.class);
        return PendingIntent.getBroadcast(context, 0, myIntent,0);
    }

    private static Calendar getTomorrow() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.set(Calendar.HOUR_OF_DAY, 11);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.add(Calendar.DAY_OF_YEAR, 1);
        return calendar;
    }
}
