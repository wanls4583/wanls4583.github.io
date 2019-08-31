package com.example.myapplication;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

import android.os.IBinder;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements ServiceConnection, View.OnClickListener {
    private Intent serviceIntent;
    private MyService.MyBinder srvBinder = null;
    private MyReceiver myBc = new MyReceiver();
    private boolean hasRegister = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        System.out.println("acitvity onCreate");
        setContentView(R.layout.activity_main);
        serviceIntent = new Intent(this,MyService.class);
        Button startAtyBtn = findViewById(R.id.startAty1Btn);
        Button startSrvBtn = findViewById(R.id.startSrvBtn);
        Button stopSrvBtn = findViewById(R.id.stopSrvBtn);
        Button bindSrvBtn = findViewById(R.id.bindSrvBtn);
        Button unbindSrvBtn = findViewById(R.id.unbindSrvBtn);
        Button getCountBtn = findViewById(R.id.getCountBtn);
        Button sendBroadCastBtn = findViewById(R.id.sendBroadCastBtn);
        Button regRecieverBtn = findViewById(R.id.regRecieverBtn);
        Button unregRecieverBtn = findViewById(R.id.unregRecieverBtn);
        startAtyBtn.setOnClickListener(this);
        startSrvBtn.setOnClickListener(this);
        stopSrvBtn.setOnClickListener(this);
        bindSrvBtn.setOnClickListener(this);
        unbindSrvBtn.setOnClickListener(this);
        getCountBtn.setOnClickListener(this);
        sendBroadCastBtn.setOnClickListener(this);
        regRecieverBtn.setOnClickListener(this);
        unregRecieverBtn.setOnClickListener(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
        System.out.println("acitvity onStart");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        System.out.println("acitvity onRestart");
    }

    @Override
    protected void onPause() {
        super.onPause();
        System.out.println("acitvity onPause");
    }

    @Override
    protected void onStop() {
        super.onStop();
        System.out.println("acitvity onStop");
    }

    @Override
    protected void onResume() {
        super.onResume();
        System.out.println("acitvity onResume");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        System.out.println("acitvity onDestroy");
        if(srvBinder!=null) {
            unbindService(this);
        }
        if(hasRegister) {
            unregisterReceiver(myBc);
        }
    }

    @Override
    public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
        System.out.println("onServiceConnected");
        srvBinder = (MyService.MyBinder) iBinder;
    }

    @Override
    public void onServiceDisconnected(ComponentName componentName) {
        System.out.println("onServiceDisconnected");
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.startAty1Btn:
                Intent i = new Intent(MainActivity.this, Activity1.class);
                i.putExtra("txtName","this char is from main_aty");
                startActivity(i);
                break;
            case R.id.startSrvBtn:
                startService(serviceIntent);
                break;
            case R.id.stopSrvBtn:
                stopService(serviceIntent);
                break;
            case R.id.bindSrvBtn:
                bindService(serviceIntent,this, Context.BIND_AUTO_CREATE);
                break;
            case R.id.unbindSrvBtn:
                unbindService(this);
                break;
            case R.id.getCountBtn:
                System.out.println(srvBinder.getCurrentCount());
                break;
            case R.id.sendBroadCastBtn:
                //静态注册的广播接收器中指定的action其在android8.0以上无效
                //Intent tmp = new Intent("com.example.myapplication.intent.action.TestAction");
                //Intent tmp = new Intent(MainActivity.this,MyReceiver.class);
                Intent tmp = new Intent();
                //用来发生给静态注册的广播接收者
                tmp.setComponent(new ComponentName("com.example.myapplication","com.example.myapplication.MyReceiver"));
                tmp.putExtra("txtName","received broadcast txt");
                sendBroadcast(tmp);
                break;
            case R.id.regRecieverBtn:
                registerReceiver(myBc, new IntentFilter("com.example.myapplication.intent.action.TestAction"));
                hasRegister = true;
                System.out.println("registerReceiver");
                break;
            case R.id.unregRecieverBtn:
                unregisterReceiver(myBc);
                hasRegister = false;
                System.out.println("unregisterReceiver");
                break;
        }
    }
}
