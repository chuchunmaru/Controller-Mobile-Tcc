#include <DNSServer.h>
#include <PubSubClient.h>
#include <WiFiManager.h>
#include <stdio.h>
#include <string.h>
#include <iostream>
#include <cstring>

#if defined(ESP8266)
#include "Esp8266DataManager.h"   
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>  
#else
#include "Esp32DataManager.h"
#include <WebServer.h>
#include <WiFi.h> 
#endif



WiFiClient wifiClient;
PubSubClient mqttClient;
WiFiManager wifiManager;
WiFiServer server(80);



const char* configWorld       = "espConfig";
const char* getDevice         = "getDeviceModel";
const char* ConfigDevice      = "ConfigString";
const char* brokerIP          = "broker.hivemq.com";
const char* espSSID           = "Device Config NetWork";
const char* espPassword       = "12345678";
const char* splitDelimiter    = "::";
const int brokerPort          = 1883;

#if defined(ESP8266)
const char* deviceModel       = "DEVICE:ESP8266";
const byte highValue          = 0;   
const byte lowValue           = 1;
const char* topicPrefix       = "CHUCHUNMARU:ESP8266:"; 
#else
const char* deviceModel       = "DEVICE:ESP32";
const byte BUILTIN_LED        = 2; 
const byte highValue          = 1;  
const byte lowValue           = 0;  
const char* topicPrefix       = "CHUCHUNMARU:ESP32:";
#endif
