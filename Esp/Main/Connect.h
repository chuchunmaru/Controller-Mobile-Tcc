void configModeCallback(WiFiConnect *mWiFiConnect) {
  Serial.println("Entering Access Point");
}


void startWiFi(boolean showParams = false) {
 
  wiFiConnect.setDebug(true);
  
  wiFiConnect.setAPCallback(configModeCallback);


    if (!wiFiConnect.autoConnect()) {
      wiFiConnect.startConfigurationPortal(AP_WAIT);
    }
}
