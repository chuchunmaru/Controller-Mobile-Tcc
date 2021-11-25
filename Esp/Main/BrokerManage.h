String getTopic()
{
  preferences.begin("espConfig", true);
  String topic = preferences.getString("topic");
  preferences.end();
  return (topic == "") ? ((String)prefix + WiFi.SSID()) : topic;
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
      delay(100);
      ESP.restart();
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

  Serial.println((String)"Mensagem [\"" + message + "\"] recebida no topico " + topic);


  token = strtok(strstr(message.c_str(), ""), splitDelimiter);
  while (token != NULL)
  {
    receivedTokens[counter] = token;
    token = strtok(NULL, splitDelimiter);
    counter++;
  }

  if (receivedTokens[0] == "setTopic")
  {
    recordData(receivedTokens[1]);
  }

  else if(message == "getStatus"){
    String Status = ((String) "STATUS" + gasMeasurement + "|" + digitalRead(12) + "|" + digitalRead(13) + "|" + digitalRead(14) + "|" + digitalRead(27) + "|" + digitalRead(26) + "|" + servo.read());
    mqttClient.publish(DefaultTopicConfig.c_str(), Status.c_str());
    Serial.println((String) "Tópico: " + DefaultTopicConfig);
    Serial.println((String) "Device Status: " + Status);
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
  mqttClient.subscribe((getTopic()).c_str());
}

void runInLoop(){
  mqttClient.loop();
  if (WiFi.status() != WL_CONNECTED )
  {
    startWiFi();
  }
  if(!mqttClient.loop() || !mqttClient.connected()){
    mqttConfig();
  }
}
