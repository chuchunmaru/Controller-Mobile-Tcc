const char *getTopic()
{
  preferences.begin("espConfig", true);
  String topic = preferences.getString("topic");
  preferences.end();
  return (topic == "") ? ((String)prefix + WiFi.SSID()).c_str() : topic.c_str();
}

void recordData(String topic)
{
    preferences.begin("espConfig", false);
    String hTopic = preferences.getString("topic");
    if (hTopic == "")
    {
    preferences.putString("topic", topic);
    preferences.end();
    mqttClient.publish(((String)prefix + WiFi.SSID()).c_str(), ((String)"newTopic" + topic).c_str() );
    }
      preferences.end();
    return;
}

void brokerCallback(const char *topic, byte *payload, unsigned int length){

  String message = "";
  String receivedTokens[2];
  char *token;
  unsigned int counter;

  for (unsigned int i = 0; i < length; i++)
  {
    message += (char)payload[i];
  }


  token = strtok(strstr(message.c_str(), ""), splitDelimiter);
  while (token != NULL)
  {
    receivedTokens[counter] = token;
    token = strtok(NULL, splitDelimiter);
    counter++;
  }
  
  Serial.println(message);

  if (receivedTokens[0] == "setTopic")
  {
    recordData(receivedTokens[1]);
  }

  else if (message == "RST")
  {
    ESP.restart();
  }

  else if(message == "RESET"){
      preferences.begin("espConfig", false);
      preferences.remove("topic");
      preferences.end();
      ESP.restart();
  }
  else if(message == "status"){
    mqttClient.publish(getTopic(), ((String) "STATUS" + gasMeasurement + "|" + digitalRead(12) + "|" + digitalRead(13) + "|" + digitalRead(14) + "|" + digitalRead(27) + "|" + digitalRead(26) + "|" + servo.read()).c_str());
  }
}

void mqttConfig(){

  mqttClient.setClient(wifiClient);
  mqttClient.setServer(brokerIP, brokerPort);
  mqttClient.setCallback(brokerCallback);
  while (!mqttClient.connected())
  {
    
    (!mqttClient.connect("ESP")) ? Serial.println((String) "Error: " + mqttClient.state()) : NULL;
    delay(500);
  }
  mqttClient.subscribe(getTopic());
}
