#include "DHT.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// change these values
const char* ssid = "empire-2.4";
const char* pass = "5038038883";
String url = "http://home.drifterz28.com/api/temp";
int main_delay = 30; // delay in min for the loop
bool isFahrenheit = true;
// no change past here

#define DHTPIN 2     // sensor pin connected to
#define DHTTYPE DHT22   // DHT 22 sensor
DHT dht(DHTPIN, DHTTYPE);
void setup() {
  Serial.begin(115200);
  Serial.println("WiFi temp link");
  Serial.println();
  delay(4000);
  dht.begin();
  WiFi.begin(ssid, pass);
  Serial.print("Wait for WiFi... ");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  WiFi.softAPdisconnect();
  Serial.println(WiFi.localIP());
  delay(500);
}

float getHumidity() {
  float humidity = dht.readHumidity();
  if (isnan(humidity)) {
    Serial.println("bad humidity, re-run");
    delay(5000);
    humidity = getHumidity();
  }
  Serial.print("Humidity: ");
  Serial.println(humidity);
  return humidity;
}

float getTemp() {
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float temp_f = dht.readTemperature(isFahrenheit);
  if (isnan(temp_f)) {
    Serial.println("bad temp, rerun");
    delay(5000);
    temp_f = getTemp();
  }
  Serial.print("Temperature: ");
  Serial.println(temp_f);
  return temp_f;
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    String ipAddress = WiFi.localIP().toString();
    String fullUrl = url + "?ip=" + ipAddress + "&temp=" + String(getTemp()) + "&hum=" + String(getHumidity());
    Serial.print("Send to server: ");
    Serial.println(fullUrl);
    HTTPClient http;
    http.begin(fullUrl);
    int httpCode = http.GET();
    if (httpCode != -1) {
      Serial.println("data sent to server");
      delay(1000 * 60 * main_delay);
    } else {
      Serial.println("fail");
      delay(50000); // run in 5 min on fail
    }
  }
}
