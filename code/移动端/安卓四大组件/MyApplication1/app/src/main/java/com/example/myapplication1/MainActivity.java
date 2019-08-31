package com.example.myapplication1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button btn = findViewById(R.id.sendBroadCastBtn);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent();
                //用来发生给静态注册的广播接收者
                //i.setComponent(new ComponentName("com.example.myapplication","com.example.myapplication.MyReceiver"));
                i.setAction("com.example.myapplication.intent.action.TestAction");
                i.putExtra("txtName","this txt is from another app");
                sendBroadcast(i);
            }
        });
    }
}
