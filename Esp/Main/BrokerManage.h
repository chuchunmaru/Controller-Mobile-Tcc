void brokerCallback(const char *topic, byte *payload, unsigned int length)
{
  
  String message = "";
  String receivedTokens[5];
  char *token;
  unsigned int i; 
  unsigned int counter;

  for (i = 0; i < length; i++)
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
    
  if (receivedTokens[0] == ConfigDevice)
  {
      mqttClient.publish(((String)topicPrefix + WiFi.SSID()).c_str(), ((String)"URLCONFIG:" + WiFi.localIP().toString()).c_str());
  }

  else if (receivedTokens[0] == configWorld)
  {
    recordData(receivedTokens);
  }

  else if (receivedTokens[0] == getDevice){
    mqttClient.publish(((String)topicPrefix + WiFi.SSID()).c_str(), deviceModel);
  }
}

void mqttConfig()
{

  mqttClient.setClient(wifiClient);
  mqttClient.setServer(brokerIP, brokerPort);
  mqttClient.setCallback(brokerCallback);
  while (!mqttClient.connected())
  {

    (!mqttClient.connect("ESP")) ? Serial.println((String) "Error: " + mqttClient.state()) : Serial.print("Broker Connect!!!");

    delay(500);
  }
  Serial.println();

  mqttClient.subscribe(((String)topicPrefix + WiFi.SSID()).c_str());
}
