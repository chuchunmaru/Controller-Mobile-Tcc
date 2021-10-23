#include <Preferences.h>

Preferences preferences;

void recordData(String userData[3], int type)
{
  if (type == 1)
  {
    preferences.begin("userData", false);
    preferences.putString("email", userData[1]);
    preferences.putString("telefone", userData[2]);
  }
  else if (type == 2)
  {
    preferences.begin("espConfig", false);
    preferences.remove("topic");
    preferences.putString("topic", userData[1]);
    preferences.end();
    ESP.restart();
  }
}

const char *getTopic()
{
  preferences.begin("espConfig", true);
  const char *topic = preferences.getString("topic").c_str();
  preferences.end();
  return topic;
}
