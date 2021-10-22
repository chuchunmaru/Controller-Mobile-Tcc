void configModeCallback(WiFiManager *myWiFiManager) 
{  
  Serial.println(WiFi.softAPIP());
  Serial.println(myWiFiManager->getConfigPortalSSID());
}


void saveConfigCallback () 
{
  Serial.println("Configuração Salva");
  Serial.println(WiFi.softAPIP()); 
} 


void wifiSetup()
{
  wifiManager.setAPCallback(configModeCallback); 
  wifiManager.setSaveConfigCallback(saveConfigCallback); 
  wifiManager.autoConnect(espSSID , espPassword); 
  wifiManager.setMinimumSignalQuality(10);
  
 while (WiFi.status() != WL_CONNECTED) {
    delay(200);
    Serial.print(WiFi.status());
  }
}
