#include <Preferences.h>

Preferences preferences;

void recordData(String userData[3])
{
  preferences.begin("userData", false);
  preferences.putString("email", userData[1]); 
  preferences.putString("telefone", userData[2]);
}
