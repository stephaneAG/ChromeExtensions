const int LEDpin = 13; // LED pin constant
//var LEDpinState = 0; // off

char inData[20]; // Allocate some space for the string
char inChar; // Where to store the character read
byte index = 0; // Index into array; where to store the character

void setup(){
  Serial.begin(9600); // open the serial port at the default baudrate
  pinMode(LEDpin, OUTPUT);
  delay(4000);
  Serial.println("Hello Chrome !");
}

void loop(){
  if(Serial.available() > 0){
    int cmd  = 1;
    
    /* -- test code -- */
    //String myString = String("123");
    //int myStringLength = myString.length()+1;
  
    //char myChar[myStringLength];
    
    //myString.toCharArray(myChar,myStringLength);
  
    //int result = atoi(myChar);
    //int serialRcv = Serial.read();

    
    inChar = Serial.read(); // Read a character
    inData[index] = inChar; // Store it
    index++; // Increment where to write next
    inData[index] = '\0'; // Null terminate the string

    int result = atoi(inData);

    //int result = serialRcv;
    //int result = (Serial.read()).toInt;
    Serial.print("Received: ");
    Serial.print(result);
    Serial.print(" -> x2 = ");
    Serial.println(result*2);
    
    if( result == 1){
      digitalWrite(LEDpin, HIGH);
      Serial.println("LED toggled HIGH !");
    } else if (result == 0) {
      digitalWrite(LEDpin, LOW);
      Serial.println("LED toggled LOW !");
    }

    // reset our tiny buffer
    result = -1;
    index = 0;
    /* --------------- */

    /*
    Serial.print("Received: ");
    Serial.println( Serial.read() );
    */
  }
  delay(500);
  //Serial.println("Still alive ..");
}
