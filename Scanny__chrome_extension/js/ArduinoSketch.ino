const int LEDpin = 13; // LED pin constant

void setup(){
  Serial.begin(9600); // open the serial port at the default baudrate
  pinMode(LEDpin, OUTPUT);
  Serial.println("Hello Chrome !");
}

void loop(){
  if(Serial.available() > 0){
    int cmd  = 1;
    Serial.print("Received: ");
    Serial.println(Serial.read());
    if( cmd == 1){
      digitalWrite(LEDpin, HIGH);
    } else {
      digitalWrite(LEDpin, LOW);
    }
  }
  delay(3000);
  Serial.println("Still alive ..");
}