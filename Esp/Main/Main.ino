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
  Serial.println("....");
  digitalWrite(BUILTIN_LED, 0);
  DefaultTopicConfig = getTopic();
}


void loop()
{ 
  gasMeasurement = map(analogRead(MQ2_S), 0, 4095, 0, 500);
  runInLoop();
  if(gasMeasurement > 180){
    leak = true;
    digitalWrite(LED_G, 0);
    digitalWrite(LED_Y, 0);
    digitalWrite(LED_R, 0);
    if(gasMeasurement > 180 && gasMeasurement < 360){
      digitalWrite(LED_Y, 1);
      digitalWrite(BUZZER, 1);
      servo.write(90);
      delay(2500);
      gasMeasurement = map(analogRead(MQ2_S), 0, 4095, 0, 500);
      if(gasMeasurement < 180){
        digitalWrite(LED_G, 0);
        digitalWrite(LED_Y, 0);
        digitalWrite(LED_R, 0);
        digitalWrite(LED_Y, 0);
        digitalWrite(BUZZER, 0);
      }
    }
    else if(gasMeasurement > 180 && gasMeasurement > 360){
      digitalWrite(LED_G, 0);
      digitalWrite(LED_Y, 0);
      digitalWrite(LED_R, 0);
      digitalWrite(BUZZER, 1);
      digitalWrite(LED_R, 1);
      digitalWrite(RELAY, 1);
      servo.write(90);
      delay(2500);
      gasMeasurement = map(analogRead(MQ2_S), 0, 4095, 0, 500);
    }
    if(leak && gasMeasurement < 180){
    digitalWrite(LED_G, 0);
    digitalWrite(LED_Y, 0);
    digitalWrite(LED_R, 0);
    digitalWrite(BUZZER, 0);
    servo.write(0);
    delay(2500);
    leak = false;
  }
  }
  if(!leak){
    digitalWrite(LED_G, 1);
  }
}
