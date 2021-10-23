#include "LibsAndVars.h"
#include "Connect.h"
#include "BrokerManage.h"
#include "Pinout.h"

#if defined(ESP8266)
#include "ESP8266SERVER.h"
#else
#include "ESP32SERVER.h"
#endif

void setup()
{
  digitalWrite(BUILTIN_LED, lowValue);
  Serial.begin(115200);
  pinMode(BUILTIN_LED, OUTPUT);
  wifiSetup();
  mqttConfig();
  server.begin();
  Serial.println(getTopic());
  digitalWrite(BUILTIN_LED, highValue);
}

void loop()
{
  mqttClient.loop();
  if (WiFi.status() != WL_CONNECTED)
  {
    wifiSetup();
  }
  ServerWrite();
}
