package com.example.myapplication;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;

import java.util.Timer;
import java.util.TimerTask;

public class MyService extends Service {
    private Integer count = 0;
    private Timer timer = null;
    private TimerTask task = null;
    public MyService() {
    }

    @Override
    public void onCreate() {
        super.onCreate();
        startTimer();
        System.out.println("service onCreate");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        stopTimer();
        System.out.println("service onDestroy");
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        System.out.println("service onBind");
        return new MyBinder();
    }

    @Override
    public boolean onUnbind(Intent intent) {
        System.out.println("service onUnbind");
        return super.onUnbind(intent);
    }

    public class MyBinder extends Binder {
        public Integer getCurrentCount(){
            return MyService.this.count;
        }
    }

    public void startTimer(){
        if(timer == null){
            timer = new Timer();
            task = new TimerTask() {
                @Override
                public void run() {
                    count++;
                }
            };
            timer.schedule(task,1000,1000);
        }
    }
    public void stopTimer() {
        if(timer!=null) {
            timer.cancel();
            task.cancel();
        }
    }
}
