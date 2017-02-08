package com.dailyteedeals.dailyapp.service;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.app.TaskStackBuilder;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;

import com.dailyteedeals.dailyapp.R;
import com.dailyteedeals.dailyapp.io.ApiClient;
import com.dailyteedeals.dailyapp.io.model.Product;
import com.dailyteedeals.dailyapp.ui.main.MainActivity;
import com.dailyteedeals.dailyapp.util.Constants;

import java.util.ArrayList;
import java.util.Collections;

import retrofit.Callback;
import retrofit.RetrofitError;
import retrofit.client.Response;
import timber.log.Timber;

public class NotificationService extends Service {
    public NotificationService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate(){
        Timber.v("Service running");
        downloadProducts();
        stopSelf();
    }

    private void downloadProducts() {
        ApiClient.getApiClient().getProducts("daily", new Callback<ArrayList<Product>>() {
            @Override
            public void success(ArrayList<Product> products, Response response) {
                if(products.size() >= 2) {
                    createNotification(products);
                }
            }

            @Override
            public void failure(RetrofitError error) {

            }
        });
    }

    private void createNotification(ArrayList<Product> products) {
        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(this)
                        .setSmallIcon(R.drawable.ic_stat_notify)
                        .setContentTitle(getTitle(products))
                        .setContentText(getText(products))
                        .setColor(getResources().getColor(R.color.theme_green))
                        .setAutoCancel(true);

        Intent resultIntent = new Intent(this, MainActivity.class);

        TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
        stackBuilder.addParentStack(MainActivity.class);
        stackBuilder.addNextIntent(resultIntent);
        PendingIntent resultPendingIntent =
                stackBuilder.getPendingIntent(
                        0,
                        PendingIntent.FLAG_UPDATE_CURRENT
                );
        mBuilder.setContentIntent(resultPendingIntent);
        NotificationManager mNotificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        mNotificationManager.notify(Constants.NOTIFICATION_ID, mBuilder.build());
    }

    private String getTitle(ArrayList<Product> products) {

        return String.format(getResources().getString(R.string.notification_daily_title),
                products.size());
    }

    private String getText(ArrayList<Product> products) {
        Collections.shuffle(products);
        return String.format(getResources().getString(R.string.notification_daily_text),
                products.get(0).design.name,
                products.get(1).design.name);
    }
}
