#include "Libs.h"
#include "Connect.h"
#include "BrokerManage.h"
#include "Pinout.h"

void setup(){ 
  pinMode(BUILTIN_LED, OUTPUT);
  pinMode(LED_Y, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_R, OUTPUT); 
  pinMode(BUZZER, OUTPUT);
  pinMode(RELAY, OUTPUT);
  pinMode(MQ2_S, INPUT);
  servo.attach(SERVO);
  servo.write(0);
  delay(1500);
  
  digitalWrite(BUILTIN_LED, 1);
    Serial.begin(115200);
  while (!Serial) {
    delay(100);
  }
  Serial.println("....");
  startWiFi();
  delay(1500);
  mqttConfig();
  Serial.println(getTopic());
  Serial.println("....");
  digitalWrite(BUILTIN_LED, 0);
  digitalWrite(LED_G, 1);
}


void loop()
{ 
  gasMeasurement = map(analogRead(MQ2_S), 0, 4095, 0, 1000);
  
  mqttClient.loop();
  if (WiFi.status() != WL_CONNECTED)
  {
    startWiFi();
  }
}
