void ServerWrite(){

  WiFiClient client = server.available();
  if (client)
  {
    Serial.println("New Client.");
    String currentLine = "";
    while (client.connected())
    {
      if (client.available())
      {
        char c = client.read();
        Serial.write(c);
        if (c == '\n')
        {

          if (currentLine.length() == 0)
          {
            client.println("HTTP/1.1 200 OK");
            client.println("application/json");
            client.println();
            client.println();
            client.print("{\"chipid\":");
            client.print(ESP.getEfuseMac());
            client.print(",");
            client.print("\"sensvalue\":");
            client.print(hallRead());
            client.print(", \"chipcores\":");
            client.print(ESP.getChipCores());
            client.print(",\"heapsize\":");
            client.print("\"");
            client.print(ESP.getHeapSize());
            client.print("\"");
            client.print(",\"freeheap\":");
            client.print("\"");
            client.print(ESP.getFreeHeap());
            client.print("\"");
            client.print(",\"minfreeheap\":");
            client.print("\"");
            client.print(ESP.getMinFreeHeap());
            client.print("\"");
            client.print(",\"maxallocheap\":");
            client.print("\"");
            client.print(ESP.getMaxAllocHeap());
            client.print("\"");
            client.print(",\"chipmodel\":");
            client.print("\"");
            client.print(ESP.getChipModel());
            client.print("\"");
            client.print(",\"chiprevision\":");
            client.print("\"");
            client.print(ESP.getChipRevision());
            client.print("\"");
            client.print(",\"flashchipsize\":");
            client.print("\"");
            client.print(ESP.getFlashChipSize());
            client.print("\"");
            client.print(",\"flashchipspeed\":");
            client.print("\"");
            client.print(ESP.getFlashChipSpeed());
            client.print("\"");
            client.print(",\"flashchipmode\":");
            client.print("\"");
            client.print(ESP.getFlashChipMode());
            client.print("\"");
            client.print(",\"cpufreq\":");
            client.print("\"");
            client.print(ESP.getCpuFreqMHz());
            client.print("\"");
            client.print(",\"cyclecount\":");
            client.print("\"");
            client.print(ESP.getCycleCount());
            client.print("\"");
            client.print(",\"sketchsize\":");
            client.print("\"");
            client.print(ESP.getSketchSize());
            client.print("\"");
            client.print(",\"freesketchsize\":");
            client.print("\"");
            client.print(ESP.getFreeSketchSpace());
            client.print("\"");
            client.print(",\"sketchmd5\":");
            client.print("\"");
            client.print(ESP.getSketchMD5());
            client.print("\"");
            client.print(",\"sdkversion\":");
            client.print("\"");
            client.print(ESP.getSdkVersion());
            client.print("\"");

            client.print("}");
            client.println();
            break;
          }
          else
          {
            currentLine = "";
          }
        }
        else if (c != '\r')
        {
          currentLine += c;
        }
      }
    }
    client.stop();
    Serial.println("Client Disconnected.");
  }
}
