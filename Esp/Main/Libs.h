#include <PubSubClient.h>
#include <WiFiClient.h>  
#include <Preferences.h>
#include <WiFiManager.h>
#include <WebServer.h>
#include <WiFi.h>
#include <ESP32Servo.h>
#include "WiFiConnect.h" 

PubSubClient mqttClient;
Preferences preferences;
WiFiConnect wiFiConnect;
WiFiClient wifiClient;
Servo servo;

const char *brokerIP = "broker.hivemq.com";
const char *espSSID = "Glk NetWork";
const char *espPassword = "12345678";
const char *splitDelimiter = "@";
const char *prefix = "glksdev";
const int brokerPort = 1883;
bool leak = false;
int gasMeasurement = 0;
String DefaultTopicConfig = "";
