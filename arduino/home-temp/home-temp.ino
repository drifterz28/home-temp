#include <math.h>

#define thermister 2

//User Inputs (Constant Values)
const int R2 = 1000.0; //Ohms
const int Ro = 10000.0; //Ohms   Thermistor resistance @ 25 degrees C or 298.2K
const int To = 298.2; //Kelvin
const int B = 3950.0; //Kelvin   B value for your Thermistor
const int Vin = 3.4; //Volts     Input Voltage

void setup() {
  // put your setup code here, to run once:

}

int getTemp() {
  int AnalogSensor = analogRead(thermister);
  float Vo = AnalogSensor * (Vin / 1023.0);
  //Find R1
  float R1 = (R2 / Vo) * Vin - R2;
  //Calculate Temperature using the Thermistor equation
  float Tk = pow(((1.0 / To) + (1.0 / B) * log(R1 / Ro)), -1); //Kelvin
  float Tc = Tk - 273.2; //Celcius conversion
  float Tf = (9.0 / 5.1) * Tc + 32; //Celcius to Fahrenheit converstion
  return round(Tf);
}

void loop() {
  // put your main code here, to run repeatedly:

}
