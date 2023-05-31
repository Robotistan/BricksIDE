/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.pinoo');

goog.require('Blockly.Arduino');

var isLiveMode = false;

Blockly.Arduino['writeTextScreen'] = function(block) {

    var writeValue =  Blockly.Arduino.valueToCode(block, 'WriteValue', Blockly.Arduino.ORDER_ASSIGNMENT);
    var xPos =  Blockly.Arduino.valueToCode(block, 'XPos', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var yPos =  Blockly.Arduino.valueToCode(block, 'YPos', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var code = "";

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    { 
        code = 'writeTextScreen(' + xPos + ', ' + yPos + ', ' + writeValue + ');\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = "from machine import Pin";
        Blockly.Arduino.imports_['import_I2C'] = "from machine import I2C";
        Blockly.Arduino.imports_['import_SSD1306_I2C'] = "from picobricks import SSD1306_I2C";

        Blockly.Arduino.definitions_['define_oled1'] ='i2c = I2C(0, scl=Pin(5), sda=Pin(4), freq=200000)';
        Blockly.Arduino.definitions_['define_oled2'] ='oled = SSD1306_I2C(128, 64, i2c, addr=0x3c)'; 

        code += 'oled.text("{}".format(' + writeValue + '), ' + xPos + ', ' + yPos + ')\n' + 
                'oled.show()\n';
    }

    return code;
};

Blockly.Arduino['clearScreen'] = function(block) {

    var writeValue =  Blockly.Arduino.valueToCode(block, 'WriteValue', Blockly.Arduino.ORDER_ASSIGNMENT);
    var xPos =  Blockly.Arduino.valueToCode(block, 'XPos', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var yPos =  Blockly.Arduino.valueToCode(block, 'YPos', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var code = "";

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    { 
        code = 'clearScreen();\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = "from machine import Pin";
        Blockly.Arduino.imports_['import_I2C'] = "from machine import I2C";
        Blockly.Arduino.imports_['import_SSD1306_I2C'] = "from picobricks import SSD1306_I2C";

        Blockly.Arduino.definitions_['define_oled1'] ='i2c = I2C(0, scl=Pin(5), sda=Pin(4), freq=200000)';
        Blockly.Arduino.definitions_['define_oled2'] ='oled = SSD1306_I2C(128, 64, i2c, addr=0x3c)'; 

        code += 'oled.fill(0)\n';
    }

    return code;
};

Blockly.Arduino['print'] = function(block) {

    var writeValue =  Blockly.Arduino.valueToCode(block, 'WriteValue', Blockly.Arduino.ORDER_ASSIGNMENT);

    var code = "";

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {
        code = '\n';
    }
    else
    {
        code += 'print(' + writeValue + ')\n';
    }

    return code;
};

Blockly.Arduino['setDigitalPinValue'] = function(block) {

    var pin =  Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var value = block.getFieldValue('VALUE');

    var code = '';

    if(editorType == "CPP")
    {
      code = '';
    }
    else if(editorType == "Simulator")
    {
        code = '';
    }
    else
    {
        Blockly.Arduino.imports_['import_machine'] = "import machine";
        Blockly.Arduino.definitions_['define_digital_pin' + pin] ='digital_pin' + pin + ' = machine.Pin(' + pin + ', machine.Pin.OUT)';   

        code += 'digital_pin' + pin + '.value(' + value + ')\n';
    }

    return code;
};

Blockly.Arduino['readDigitalPinValue'] = function(block) {
 
    var pin =  Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var code = '';

    if(editorType == "CPP")
    {
        return [code, Blockly.Arduino.ORDER_NONE]; 
    }
    else if(editorType == "Simulator")
    {
        return [code, Blockly.Arduino.ORDER_NONE];
    }
    else
    {
        Blockly.Arduino.imports_['import_machine'] = "import machine";
        Blockly.Arduino.definitions_['define_button' + pin] = 'digital_pin' + pin + ' = machine.Pin(' + pin + ', machine.Pin.IN)';  
        
        code = 'digital_pin' + pin + '.value()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};

Blockly.Arduino['setAnalogPinValue'] = function(block) {

    var pin =  block.getFieldValue('PIN');
    var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var code = '';

    if(editorType == "CPP")
    {
      code = '';
    }
    else if(editorType == "Simulator")
    {
        code = '';
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = "from machine import Pin";
        Blockly.Arduino.imports_['import_PWM'] = "from machine import PWM";

        Blockly.Arduino.definitions_['defini_analog_pin' + pin] = 'analog_pin' + pin + ' = Pin(' + pin +')';   
        Blockly.Arduino.definitions_['defini_pwm' + pin] = 'pwm' + pin + ' = PWM(analog_pin' + pin + ')';   
        Blockly.Arduino.definitions_['defini_pwmFreq' + pin] = 'pwm' + pin + '.freq(1000)';   

        code += 'pwm' + pin + '.duty_u16(' + value + ')\n';
    }

    return code;
};

Blockly.Arduino['readAnalogPinValue'] = function(block) {
 
    var pin =  block.getFieldValue('PIN');
    var code = '';

    if(editorType == "CPP")
    {
        return [code, Blockly.Arduino.ORDER_NONE]; 
    }
    else if(editorType == "Simulator")
    {
        return [code, Blockly.Arduino.ORDER_NONE];
    }
    else
    {
        Blockly.Arduino.imports_['import_machine'] = "import machine";
        Blockly.Arduino.definitions_['define_adc' + pin] = 'adc' + pin + ' = machine.ADC(' + pin + ')';  
        
        code = 'adc' + pin + '.read()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};

Blockly.Arduino['setLedValue'] = function(block) {

    var value = block.getFieldValue('VALUE');
  
    var code = "";
    var pin = LedPin;

    if(editorType == "CPP")
    {
      Blockly.Arduino.setups_['setup_led'] = 'pinMode(' + pin + ', OUTPUT);';
      code = 'digitalWrite(' + pin + ',' + value + ');\n';
    }
    else if(editorType == "Simulator")
    {
        code = "setLedValue(" + value + ");\n";
    }
    else
    {
        Blockly.Arduino.imports_['import_machine'] = "import machine";
        Blockly.Arduino.definitions_['define_led'] ='pin_led = machine.Pin(' + pin + ', machine.Pin.OUT)';   

        if(value == '1')
          code += 'pin_led.on()\n';
        else
          code += 'pin_led.off()\n';
    }

    return code;
};

Blockly.Arduino['setRelayValue'] = function(block) {

    var value = block.getFieldValue('VALUE');

    var code = "";
    var pin = RelayPin;

    if(editorType == "CPP")
    {
      Blockly.Arduino.setups_['setup_relay'] = 'pinMode(' + pin + ', OUTPUT);';
      code = 'digitalWrite(' + pin + ',' + value + ');\n';
    }
    else if(editorType == "Simulator")
    {
        code = "setRelayValue(" + value + ");\n";
    }
    else
    {
        Blockly.Arduino.imports_['import_machine'] = 'import machine';
        Blockly.Arduino.definitions_['define_relay'] ='pin = machine.Pin(' + pin + ', machine.Pin.OUT)';   

        if(value == '1')
          code += 'pin.on()\n';
        else
          code += 'pin.off()\n';
    }

    return code;
};

Blockly.Arduino['readButton'] = function(block) {
 
    var pin = ButtonPin;

    if(editorType == "CPP")
    {
        Blockly.Arduino.setups_['setup_button'] = 'pinMode(' + pin + ', INPUT);\n';
        var code = 'digitalRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_NONE]; 
    }
    else if(editorType == "Simulator")
    {
        var code = "readButton1()";
        return [code, Blockly.Arduino.ORDER_NONE];
    }
    else
    {
        Blockly.Arduino.imports_['import_machine'] = "import machine";
        Blockly.Arduino.definitions_['define_button'] = 'pin_button = machine.Pin(' + pin + ', machine.Pin.IN)';  
        var code = 'pin_button.value()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};

Blockly.Arduino['playBuzzer'] = function(block) {

    var frequency =  Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var code = "";
    var pin = BuzzerPin;

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {
        code = 'soundBuzzer(' + frequency + ');\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
        Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
        Blockly.Arduino.definitions_['define_buzzer1'] = 'buzzer = PWM(Pin(' + pin + '))\n';
        code = 
                'buzzer.freq(' + frequency + ')\n' +
                'buzzer.duty_u16(100)\n';
    }

    return code;
};

Blockly.Arduino['buzzerInterval'] = function(block) {

    var noteTime = block.getFieldValue('INTERVAL');
    var code = "";
    var interval = 0;

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {
        code = 'buzzerInterval(' + noteTime + ');\n';
    }
    else
    {
        if(noteTime == "1")
            interval = 0.250;
        else if(noteTime == "2")
            interval = 0.500;
        else if(noteTime == "3")
            interval = 1;

        code =  'sleep(' + interval + ')\n' +
                'buzzer.duty_u16(0)\n';
    }

    return code;
};

Blockly.Arduino['readPotentiometer'] = function(block) {
 
    var pin = PotentiometerPin;

    if(editorType == "CPP")
    {
        Blockly.Arduino.setups_['setup_pot'] = 'pinMode(' + pin + ', INPUT);\n';
        
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
    else if(editorType == "Simulator")
    {
        var code = 'readPotentiometer()';
        return [code, Blockly.Arduino.ORDER_NONE];
    }
    else
    {
        Blockly.Arduino.imports_['import_machine'] = 'import machine';           
        Blockly.Arduino.setups_['setup_pot1'] = 'pot = machine.ADC(' + pin + ')';

        var code = 'pot.read_u16()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};

Blockly.Arduino['readIR'] = function(block) {
 
    var pin = ButtonPin;

    if(editorType == "CPP")
    {
        var code = '';
        return [code, Blockly.Arduino.ORDER_NONE]; 
    }
    else if(editorType == "Simulator")
    {
        var code = "readIR()";
        return [code, Blockly.Arduino.ORDER_NONE];
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = "from machine import Pin";
        Blockly.Arduino.imports_['import_UART'] = "from machine import UART";
        Blockly.Arduino.imports_['import_NEC_16'] = "from picobricks import NEC_16";
        Blockly.Arduino.imports_['import_IR_RX'] = "from picobricks import IR_RX";

        Blockly.Arduino.definitions_['define_ir1'] = 'uart = UART(0, 9600)';   

        var code = 'uart.readline()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};  

Blockly.Arduino['readLightSersor'] = function(block) {
 
    var pin = LightSersorPin;

    if(editorType == "CPP")
    {
        Blockly.Arduino.setups_['setup_pot'] = 'pinMode(' + pin + ', INPUT);\n';
        
        var code = 'analogRead()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
    else if(editorType == "Simulator")
    {
        var code = 'readLightSersor()';
        return [code, Blockly.Arduino.ORDER_NONE];
    }
    else
    {
        Blockly.Arduino.imports_['import_machine'] = 'import machine';            
        Blockly.Arduino.setups_['setup_lightsersor'] = 'ldr = machine.ADC(' + pin + ')';

        var code = 'ldr.read_u16()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};

Blockly.Arduino['readTemperature'] = function(block) {
 
    var pin = TemperaturePin;

    if(editorType == "CPP")
    {
        Blockly.Arduino.imports_['import_temperature']= '#include "DHT.h"\n';
        Blockly.Arduino.definitions_['define_temperature'] = 'DHT dhtpico(' + pin + ', 11);\n';
        
        var code = 'dhtpico.readTemperature()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
    else if(editorType == "Simulator")
    {
        var code = 'readTemperature()';
        return [code, Blockly.Arduino.ORDER_NONE];
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin']= 'from machine import Pin';
        Blockly.Arduino.imports_['import_DHT11'] = 'from picobricks import DHT11';
        Blockly.Arduino.imports_['import_time'] = "import time";
        
        Blockly.Arduino.definitions_['define_temperature1'] = 'dht_sensor = DHT11(Pin(' + pin + '))\n';
        Blockly.Arduino.definitions_['define_temperature2'] = 'dht_read_time = time.time()\n';
        Blockly.Arduino.definitions_['define_temperature3'] = 'temp = 0\n';

        Blockly.Arduino.definitions_['define_temperature4'] =   'def getTemp():\n' + 
                                                                '   global dht_read_time\n' +
                                                                '   global temp\n' +
                                                                '   if time.time() - dht_read_time >= 3:\n' +
                                                                '       dht_read_time = time.time()\n' +
                                                                '       try:\n' +
                                                                '           dht_sensor.measure()\n' +
                                                                '           temp = dht_sensor.temperature\n' +
                                                                '       except Exception as e:\n' +
                                                                '           pass\n' +
                                                                '   return temp\n';

        var code = 'getTemp()'; 

        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};

Blockly.Arduino['readHumidity'] = function(block) {
 
    var pin = HumidityPin;

    if(editorType == "CPP")
    {
        Blockly.Arduino.imports_['import_humidity']= '#include "DHT.h"\n';
        Blockly.Arduino.definitions_['define_humidity'] = 'DHT dhtpico(' + pin + ', 11);\n';
        
        var code = 'dhtpico.readHumidity()';

        return [code, Blockly.Arduino.ORDER_NONE];  
    }
    else if(editorType == "Simulator")
    {
        var code = "readHumidity()";
        return [code, Blockly.Arduino.ORDER_NONE];
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin']= 'from machine import Pin';
        Blockly.Arduino.imports_['import_DHT11'] = 'from picobricks import DHT11';
        Blockly.Arduino.imports_['import_time'] = "import time";
        
        Blockly.Arduino.definitions_['define_humidity1'] = 'dht_sensor = DHT11(Pin(' + pin + '))\n';
        Blockly.Arduino.definitions_['define_humidity2'] = 'dht_read_time = time.time()\n';
        Blockly.Arduino.definitions_['define_humidity3'] = 'humidity = 0\n';

        Blockly.Arduino.definitions_['define_humidity4'] =   'def getHumidity():\n' + 
                                                                '   global dht_read_time\n' +
                                                                '   global humidity\n' +
                                                                '   if time.time() - dht_read_time >= 3:\n' +
                                                                '       dht_read_time = time.time()\n' +
                                                                '       try:\n' +
                                                                '           dht_sensor.measure()\n' +
                                                                '           humidity = dht_sensor.humidity\n' +
                                                                '       except Exception as e:\n' +
                                                                '           pass\n' +
                                                                '   return humidity\n';

        var code = 'getHumidity()';

        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};

Blockly.Arduino['servoMotor'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var angle =  Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var code = "";
    var pin = 0;

    if(motor == "1")
        pin = ServoPin1;
    else
        pin = ServoPin2;

    if(editorType == "CPP")
    {
        code = ''
    }
    else if(editorType == "Simulator")
    {
        if(motor == "1")
            code = 'setServo1Value();\n';
        else
            code = 'setServo2Value();\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
        Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';

        Blockly.Arduino.definitions_['define_servo1' + motor] = 'pwm_' + motor + ' = PWM(Pin(' + pin + '))';
        Blockly.Arduino.definitions_['define_servo2' + motor] = 'pwm_' + motor + '.freq(50)';

        angle = Math.abs((angle * (6000 / 180)) + 2000);
        angle = Math.round(angle);
        code = 'pwm_' + motor + '.duty_u16(' + angle + ')\n';
    }

    return code;
};

Blockly.Arduino['dcMotor'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var speed =  Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var code = "";
    var pin = 0;

    if(motor == "1")
        pin = MotorPin1;
    else
        pin = MotorPin2;

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {
        if(motor == "1")
            code = 'setMotor1Value(' + speed + ');\n';
        else
            code = 'setMotor2Value(' + speed + ');\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
        Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
        Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';

        Blockly.Arduino.definitions_['define_motor1' + motor] = 'motor_' + motor + ' = PWM(Pin(' + pin + '))';
        Blockly.Arduino.definitions_['define_motor2' + motor] = 'motor_' + motor + '.duty_u16(0)';

        code = 'motor_' + motor + '.duty_u16(' + speed + ')\n';
    }

    return code;
};

Blockly.Arduino['neoPixelColour'] = function(block) {

    var colourValue = Blockly.Arduino.valueToCode(block, 'ColourValue', Blockly.Arduino.ORDER_ATOMIC);
    var code = "";
    var pin = NeoPixelPin;

    var hexRed, hexGreen, hexBlue;
    var red, green, blue;
    var colourValueTemp = colourValue.replace("#", "").replace("'", "").replace("\"", "");;

    hexRed = colourValueTemp.substring(0, 2);
    hexGreen = colourValueTemp.substring(2, 4);
    hexBlue = colourValueTemp.substring(4, 6);

    red = parseInt(hexRed, 16);
    green = parseInt(hexGreen, 16);
    blue = parseInt(hexBlue, 16);

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {   console.log(colourValue);
        code = 'neoPixelColour(' + colourValue + ');\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
        Blockly.Arduino.imports_['import_WS2812'] = 'from picobricks import WS2812';

        Blockly.Arduino.definitions_['define_neo1'] = 'ws2812 = WS2812(' + pin + ', brightness = 1)';

        code = 'ws2812.pixels_fill((' + red + ', ' + green + ', ' + blue + '))\n' +
               'ws2812.pixels_show()\n';
    }

    return code;
};

Blockly.Arduino['neoPixelColourRGB'] = function(block) {

    var code = "";
    var pin = NeoPixelPin;

    var red = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var green =  Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var blue = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';


    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {
        var redHex = parseInt(red).toString(16);
        var greenHex = parseInt(green).toString(16);
        var blueHex = parseInt(blue).toString(16);

        if(redHex.length == 1)
           redHex = "0" + redHex; 
      
        if(greenHex.length == 1)
           greenHex = "0" + greenHex; 

        if(blueHex.length == 1)
           blueHex = "0" + blueHex; 

        var colourValue = "#" + redHex + greenHex + blueHex;
        code = 'neoPixelColour("' + colourValue + '");\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
        Blockly.Arduino.imports_['import_WS2812'] = 'from picobricks import WS2812';

        Blockly.Arduino.definitions_['define_neo1'] = 'ws2812 = WS2812(' + pin + ', brightness = 1)';

        code = 'ws2812.pixels_fill((' + red + ', ' + green + ', ' + blue + '))\n' +
               'ws2812.pixels_show()\n';
    }

    return code;
};

Blockly.Arduino['neoPixelClear'] = function(block) {

    var code = "";
    var pin = NeoPixelPin;

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {
        code = 'neoPixelClear();\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
        Blockly.Arduino.imports_['import_WS2812'] = 'from picobricks import WS2812';

        Blockly.Arduino.definitions_['define_neo1'] = 'ws2812 = WS2812(' + pin + ', brightness = 1)';

        code = 'ws2812.pixels_fill((0 ,0 ,0 ))\n' +
               'ws2812.pixels_show()\n';
    }

    return code;
}