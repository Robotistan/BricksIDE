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

Blockly.Arduino['Robotistan_Start'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "";

  return code;
}

Blockly.Arduino['writeTextScreen'] = function(block) {

    var writeValue =  Blockly.Arduino.valueToCode(block, 'WriteValue', Blockly.Arduino.ORDER_NONE);
    var xPos =  Blockly.Arduino.valueToCode(block, 'XPos', Blockly.Arduino.ORDER_NONE) || '0';
    var yPos =  Blockly.Arduino.valueToCode(block, 'YPos', Blockly.Arduino.ORDER_NONE) || '0';

    var code = "";
    
    Blockly.Arduino.imports_['import_Pin'] = "from machine import Pin";
    Blockly.Arduino.imports_['import_I2C'] = "from machine import I2C";
    Blockly.Arduino.imports_['import_SSD1306_I2C'] = "from picobricks import SSD1306_I2C";

    Blockly.Arduino.definitions_['define_oled1'] ='i2c = I2C(0, scl=Pin(5), sda=Pin(4), freq=200000)';
    Blockly.Arduino.definitions_['define_oled2'] ='oled = SSD1306_I2C(128, 64, i2c, addr=0x3c)'; 

    code += 'oled.text("{}".format(' + writeValue + '), ' + xPos + ', ' + yPos + ')\n';
    
    return code;
};

Blockly.Arduino['clearScreen'] = function(block) {

    var code = 'oled.fill(0)\n';

    return code;
};

Blockly.Arduino['showScreen'] = function(block) {

    var code = 'oled.show()\n';

    return code;
};

Blockly.Arduino['print'] = function(block) {

    var writeValue =  Blockly.Arduino.valueToCode(block, 'WriteValue', Blockly.Arduino.ORDER_NONE);

    var code = "";

    code += 'print(' + writeValue + ')\n';

    return code;
};

Blockly.Arduino['setDigitalPinValue'] = function(block) {

    var pin =  Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_NONE) || '0';
    var value = block.getFieldValue('VALUE');

    var code = '';

    Blockly.Arduino.imports_['import_machine'] = "import machine";
    Blockly.Arduino.definitions_['define_digital_pin' + pin] ='digital_pin_' + pin + ' = machine.Pin(' + pin + ', machine.Pin.OUT)';   

    code += 'digital_pin_' + pin + '.value(' + value + ')\n';

    return code;
};

Blockly.Arduino['readDigitalPinValue'] = function(block) {
 
    var pin =  Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_NONE) || '0';
    var code = '';

    Blockly.Arduino.imports_['import_machine'] = "import machine";
    Blockly.Arduino.definitions_['define_digital_pin' + pin] = 'digital_pin_' + pin + ' = machine.Pin(' + pin + ', machine.Pin.IN)';  
    
    code = 'digital_pin_' + pin + '.value()';
    return [code, Blockly.Arduino.ORDER_NONE];  
};

Blockly.Arduino['setAnalogPinValue'] = function(block) {

    var pin =  block.getFieldValue('PIN');
    var freq = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_NONE) || '0';
    var duty = Blockly.Arduino.valueToCode(block, 'DUTY', Blockly.Arduino.ORDER_NONE) || '0';

    var code = '';

    Blockly.Arduino.imports_['import_Pin'] = "from machine import Pin";
    Blockly.Arduino.imports_['import_PWM'] = "from machine import PWM";

    Blockly.Arduino.definitions_['define_analog_pin' + pin] = 'analog_pin_' + pin + ' = Pin(' + pin +')';   
    Blockly.Arduino.definitions_['define_pwm' + pin] = 'pwm_' + pin + ' = PWM(analog_pin_' + pin + ')';   
    Blockly.Arduino.definitions_['define_pwmFreq' + pin] = 'pwm_' + pin + '.freq(1000)';   

    code += 'pwm_' + pin + '.duty_u16((' + freq + ' * 65535) / ' + duty + ')';

    return code;
};

Blockly.Arduino['readAnalogPinValue'] = function(block) {
 
    var pin =  block.getFieldValue('PIN');
    var code = '';

    Blockly.Arduino.imports_['import_machine'] = "import machine";
    Blockly.Arduino.imports_['import_ADC']  = "from machine import ADC";

    Blockly.Arduino.definitions_['define_adc' + pin] = 'adc_' + pin + ' = machine.ADC(' + pin + ')';  
    
    code = 'adc_' + pin + '.read_u16()';
    return [code, Blockly.Arduino.ORDER_NONE];  
};

Blockly.Arduino['pinControl'] = function (block) {

    var value = block.getFieldValue('VALUE');
    var pin = Blockly.Arduino.valueToCode(block, 'INPUT', Blockly.Arduino.ORDER_NONE) || '0';
    var code = '';

    if (value === "PWM") {
        Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
    } else {
        Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';
    }

    code = value + '(Pin(' + pin + '))';

    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['setLedValue'] = function(block) {

    var value = block.getFieldValue('VALUE');
  
    var code = "";
    var pin = LedPin;

    Blockly.Arduino.imports_['import_machine'] = "import machine";
    Blockly.Arduino.definitions_['define_led'] ='pin_led = machine.Pin(' + pin + ', machine.Pin.OUT)';   

    if(value == '1')
      code += 'pin_led.on()\n';
    else
      code += 'pin_led.off()\n';

    return code;
};

Blockly.Arduino['setRelayValue'] = function(block) {

    var value = block.getFieldValue('VALUE');

    var code = "";
    var pin = RelayPin;

    Blockly.Arduino.imports_['import_machine'] = 'import machine';
    Blockly.Arduino.definitions_['define_relay'] ='pin = machine.Pin(' + pin + ', machine.Pin.OUT)';   

    if(value == '1')
      code += 'pin.on()\n';
    else
      code += 'pin.off()\n';

    return code;
};

Blockly.Arduino['readButton'] = function(block) {
 
    var pin = ButtonPin;

    Blockly.Arduino.imports_['import_machine'] = "import machine";
    Blockly.Arduino.definitions_['define_button'] = 'pin_button = machine.Pin(' + pin + ', machine.Pin.IN)';  
    var code = 'pin_button.value()';
    return [code, Blockly.Arduino.ORDER_NONE];  
};

Blockly.Arduino['playBuzzer'] = function(block) {

    var frequency =  Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_NONE) || '0';

    var code = "";
    var pin = BuzzerPin;

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
    Blockly.Arduino.definitions_['define_buzzer1'] = 'buzzer = PWM(Pin(' + pin + '))\n';
    code = 
            'buzzer.freq(' + frequency + ')\n' +
            'buzzer.duty_u16(100)\n';

    return code;
};

Blockly.Arduino['buzzerInterval'] = function(block) {

    var noteTime = block.getFieldValue('INTERVAL');
    var code = "";
    var interval = 0;

    if(noteTime == "1")
        interval = 0.250;
    else if(noteTime == "2")
        interval = 0.500;
    else if(noteTime == "3")
        interval = 1;

    code =  'sleep(' + interval + ')\n' +
            'buzzer.duty_u16(0)\n';

    return code;
};

Blockly.Arduino['readPotentiometer'] = function(block) {
 
    var pin = PotentiometerPin;

    Blockly.Arduino.imports_['import_machine'] = 'import machine';           
    Blockly.Arduino.definitions_['definitions_pot'] = 'pot = machine.ADC(' + pin + ')';

    var code = 'pot.read_u16()';
    return [code, Blockly.Arduino.ORDER_NONE];  
};

Blockly.Arduino['readLightSersor'] = function(block) {
 
    var pin = LightSersorPin;

    Blockly.Arduino.imports_['import_machine'] = 'import machine';            
    Blockly.Arduino.definitions_['definitions_lightsersor'] = 'ldr = machine.ADC(' + pin + ')';

    var code = 'ldr.read_u16()';
    return [code, Blockly.Arduino.ORDER_NONE];  
};

Blockly.Arduino['readIR'] = function(block) {
 
    var pin = ButtonPin;

    Blockly.Arduino.imports_['import_Pin'] = "from machine import Pin";
    Blockly.Arduino.imports_['import_UART'] = "from machine import UART";
    Blockly.Arduino.imports_['import_NEC_16'] = "from picobricks import NEC_16";
    Blockly.Arduino.imports_['import_IR_RX'] = "from picobricks import IR_RX";

    Blockly.Arduino.definitions_['define_ir1'] = 'uart = UART(0, 9600)';   

    var code = 'uart.readline()';
    return [code, Blockly.Arduino.ORDER_NONE];  
};  

Blockly.Arduino['readTemperature'] = function(block) {
 
    var pin = TemperaturePin;

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
};

Blockly.Arduino['readHumidity'] = function(block) {
 
    var pin = HumidityPin;

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
};

Blockly.Arduino['readDistance'] = function(block) {
    
    var trig =  Blockly.Arduino.valueToCode(block, 'TRIG', Blockly.Arduino.ORDER_NONE) || '0';
    var echo =  Blockly.Arduino.valueToCode(block, 'ECHO', Blockly.Arduino.ORDER_NONE) || '0';

    Blockly.Arduino.imports_['import_Pin']= 'from machine import Pin';
    Blockly.Arduino.imports_['import_PWM']= 'from machine import PWM';
    Blockly.Arduino.imports_['import_utime']= 'import utime';

    Blockly.Arduino.definitions_['define_distance_trig' + trig] = 'trigger = Pin(' + trig + ', Pin.OUT)';
    Blockly.Arduino.definitions_['define_distance_echo' + echo] = 'echo = Pin(' + echo + ', Pin.IN)';

    Blockly.Arduino.definitions_['define_distance_func'] = 
                                                       '\n' +
                                                       'def getDistance(): \n' +
                                                       '   trigger.low() \n' +
                                                       '   utime.sleep_us(2) \n' +
                                                       '   trigger.high() \n' +
                                                       '   utime.sleep_us(5) \n' +
                                                       '   trigger.low() \n' +
                                                       '   while echo.value() == 0: \n' +
                                                       '      signaloff = utime.ticks_us() \n' +
                                                       '   while echo.value() == 1: \n' +
                                                       '      signalon = utime.ticks_us() \n' +
                                                       '   timepassed = signalon - signaloff \n' +
                                                       '   distance = (timepassed * 0.0343) / 2 \n' +
                                                       '   print("The distance from object is ",distance,"cm") \n' +
                                                       '   return distance \n';

    var code = 'getDistance()';

    return [code, Blockly.Arduino.ORDER_NONE];  
}

Blockly.Arduino['servoMotor'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var angle =  Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_NONE) || '0';
    var code = "";
    var pin = 0;

    if(motor == "1")
        pin = ServoPin1;
    else
        pin = ServoPin2;

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
     Blockly.Arduino.imports_['import_fabs'] = 'from math import fabs';

    Blockly.Arduino.definitions_['define_servo1' + motor] = 'pwm_' + motor + ' = PWM(Pin(' + pin + '))';
    Blockly.Arduino.definitions_['define_servo2' + motor] = 'pwm_' + motor + '.freq(50)';

    Blockly.Arduino.definitions_['define_angleFunc'] = 
                                                        'def CalculateAngle(angle): \n' +
                                                        '   angle = fabs((angle * (6000 / 180)) + 2000) \n' +
                                                        '   angle = round(angle) \n' +
                                                        '   return angle \n';
    
    code = 'pwm_' + motor + '.duty_u16(CalculateAngle(' + angle + '))\n';

    return code;
};

Blockly.Arduino['dcMotor'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var speed =  Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_NONE) || '0';

    var code = "";
    var pin = 0;

    if(motor == "1")
        pin = MotorPin1;
    else
        pin = MotorPin2;

    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';

    Blockly.Arduino.definitions_['define_motor1' + motor] = 'motor_' + motor + ' = PWM(Pin(' + pin + '))';
    Blockly.Arduino.definitions_['define_motor2' + motor] = 'motor_' + motor + '.freq(10)';
    Blockly.Arduino.definitions_['define_motor3' + motor] = 'motor_' + motor + '.duty_u16(0)';

    code = 'motor_' + motor + '.duty_u16(' + speed + ' * 650) \n';

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

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_WS2812'] = 'from picobricks import WS2812';

    Blockly.Arduino.definitions_['define_neo1'] = 'ws2812 = WS2812(' + pin + ', brightness = 1)';

    code = 'ws2812.pixels_fill((' + red + ', ' + green + ', ' + blue + '))\n' +
           'ws2812.pixels_show()\n';

    return code;
};

Blockly.Arduino['neoPixelColourRGB'] = function(block) {

    var code = "";
    var pin = NeoPixelPin;

    var red = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var green =  Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var blue = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_WS2812'] = 'from picobricks import WS2812';

    Blockly.Arduino.definitions_['define_neo1'] = 'ws2812 = WS2812(' + pin + ', brightness = 1)';

    code = 'ws2812.pixels_fill((' + red + ', ' + green + ', ' + blue + '))\n' +
           'ws2812.pixels_show()\n';

    return code;
};

Blockly.Arduino['neoPixelClear'] = function(block) {

    var code = "";
    var pin = NeoPixelPin;

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_WS2812'] = 'from picobricks import WS2812';

    Blockly.Arduino.definitions_['define_neo1'] = 'ws2812 = WS2812(' + pin + ', brightness = 1)';

    code = 'ws2812.pixels_fill((0 ,0 ,0 ))\n' +
           'ws2812.pixels_show()\n';

    return code;
}

Blockly.Arduino['timer'] = function(block) {

    var code = "";
    Blockly.Arduino.imports_['import_Timer'] = 'from machine import Timer';
    Blockly.Arduino.imports_['import_utime'] = 'import utime';
    
    code = 'utime.ticks_ms()';

    return [code, Blockly.Arduino.ORDER_NONE];  
}

Blockly.Arduino['resettimer'] = function(block) {

    var timer =  Blockly.Arduino.valueToCode(block, 'Timer', Blockly.Arduino.ORDER_ASSIGNMENT);

    var code = "";
    Blockly.Arduino.imports_['import_Timer'] = 'from machine import Timer';
    Blockly.Arduino.imports_['import_utime'] = 'import utime';

    code = 'tm_react = utime.ticks_diff(utime.ticks_ms(), ' + timer + ')\n';

    return code;
}

Blockly.Arduino['connect_wifi'] = function(block) {

    var ssid =  Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_NONE);
    var password =  Blockly.Arduino.valueToCode(block, 'Password', Blockly.Arduino.ORDER_NONE);
    
    ssid = ssid.replaceAll("\"", "");
    password = password.replaceAll("\"", "");

    var code = "";
    Blockly.Arduino.imports_['import_network'] = 'import network';
    Blockly.Arduino.imports_['import_socket'] = 'import socket';

    code = 
            "ssid = '" + ssid + "'\n" +
            "password = '" + password + "' \n" +
            "wlan = network.WLAN(network.STA_IF) \n" +
            "wlan.active(True) \n" +
            "wlan.connect(ssid, password) \n";

    return code;
}

Blockly.Arduino['html_input'] = function(block) {
 
    var html =  Blockly.Arduino.valueToCode(block, 'HTML', Blockly.Arduino.ORDER_NONE);
    var code = '';

    code = '\"\"' + html + '\"\"';
    return [code, Blockly.Arduino.ORDER_NONE];  
};

Blockly.Arduino['ip_address'] = function(block) {
    return ["status[0]", Blockly.Arduino.ORDER_NONE];  
};

Blockly.Arduino['show_ip'] = function(block) {

    var ipadress =  Blockly.Arduino.valueToCode(block, 'IP_Address', Blockly.Arduino.ORDER_NONE);

    ipadress = ipadress.replaceAll("\"", "");

    var code = "";

    code = 
            "if wlan.status() != 3: \n" +
            "   raise RuntimeError('network connection failed') \n" +
            "else: \n" +
            "   print('Connected') \n" +
            "   status = wlan.ifconfig() \n" +
            "   print( 'ip = ' + " + ipadress + " ) \n";

    return code;
}

Blockly.Arduino['open_socket'] = function(block) {

    var ipadress =  Blockly.Arduino.valueToCode(block, 'IP_Address', Blockly.Arduino.ORDER_NONE);
    var port =  Blockly.Arduino.valueToCode(block, 'Port', Blockly.Arduino.ORDER_NONE);
    
    ipadress = ipadress.replaceAll("\"", "");

    var code = "";

    code = 
            "addr = socket.getaddrinfo('" + ipadress + "', " + port + ")[0][-1] \n" +
            "s = socket.socket() \n" +
            "s.bind(addr) \n" +
            "s.listen(1) \n";

    return code;
}

Blockly.Arduino['wait_for_connection'] = function(block) {

    var time =  Blockly.Arduino.valueToCode(block, 'Time', Blockly.Arduino.ORDER_NONE);

    Blockly.Arduino.imports_['import_utime'] = "import utime";
    Blockly.Arduino.imports_['import_time'] = "import time";
    var code = "";
    code = 
            "max_wait = " + time + " \n" +
            "while max_wait > 0: \n" +
            "    if wlan.status() < 0 or wlan.status() >= 3: \n" +
            "        break \n" +
            "    max_wait -= 1 \n" +
            "    print('waiting for connection...') \n" +
            "    time.sleep(1) \n";

    return code;
}

Blockly.Arduino['accept_connection'] = function(block) {

    var html =  Blockly.Arduino.valueToCode(block, 'HTML', Blockly.Arduino.ORDER_NONE);

    var code = "";
    
    code = 
            "cl, addr = s.accept() \n" +
            "cl.send('HTTP/1.0 200 OK\\r\\nContent-type: text/html\\r\\n\\r\\n') \n" +
            "cl.send(" + html + ") \n" +
            "cl.close() \n";

    return code;
}

Blockly.Arduino['request'] = function(block) {

    var code = "";
    
    code = 
            "cl, addr = s.accept() \n" +
            "request = cl.recv(1024) \n" +
            "request = str(request) \n";

    return code;
}

Blockly.Arduino['request_find'] = function(block) {

    var find =  Blockly.Arduino.valueToCode(block, 'Find', Blockly.Arduino.ORDER_NONE);
    
    var code = "request.find(" + find + ")"

    return [code, Blockly.Arduino.ORDER_NONE];  
}

Blockly.Arduino['onIRReceiving'] = function(block) {

    var branch = Blockly.Arduino.statementToCode(block, 'DO') ;
    branch = Blockly.Arduino.addLoopTrap(branch, block);

    Blockly.Arduino.imports_['import_Pin'] = "from machine import Pin";
    Blockly.Arduino.imports_['import_NEC_16'] = "from picobricks import NEC_16";
    Blockly.Arduino.imports_['import_IR_RX'] = "from picobricks import IR_RX";

    Blockly.Arduino.definitions_['define_ir_callback'] =         
                                                "def ir_callback(data, addr, ctrl): \n" +
                                                "    global ir_data \n" +
                                                "    global ir_addr, data_rcvd \n" +
                                                "    if data > 0: \n" +
                                                "        ir_data = data \n" +
                                                "        ir_addr = addr \n" +
                                                "        print('Data {:02x} Addr {:04x}'.format(data, addr)) \n" +
                                                "        data_rcvd = True \n" +
                                                "ir = NEC_16(Pin(0, Pin.IN), ir_callback) \n" +
                                                "ir_data = 0 \n" +
                                                "data_rcvd = False \n";

    var code = 
               "if data_rcvd == True: \n" +
               "    data_rcvd = False \n" +
               branch;
    
    return code;
}

Blockly.Arduino['isButtonPressed'] = function(block) {

    var value = block.getFieldValue('VALUE');
  
    var code = "ir_data == " + value;

    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['RFIDActivated'] = function(block) {

    var branch = Blockly.Arduino.statementToCode(block, 'DO') ;
    branch = Blockly.Arduino.addLoopTrap(branch, block);

    Blockly.Arduino.imports_['import_MFRC522'] = 'from picobricks import MFRC522';
    Blockly.Arduino.definitions_['define_reader'] = 'reader = MFRC522(spi_id=0, sck=18, miso=16, mosi=19, cs=17, rst=0)';

    Blockly.Arduino.definitions_['define_activated'] =         
                                                'def activated(): \n' +
                                                '   print("Card ID: " + str(card) + " PASS: Activated") \n';

    var code = 
                'reader.init() \n' +
                '(stat, tag_type) = reader.request(reader.REQIDL) \n' +
                '(stat, uid) = reader.SelectTagSN() \n' +
                'card = int.from_bytes(bytes(uid), "little", False) \n' +
                'activated() \n';
    
    return code;
}

Blockly.Arduino['RFIDCode'] = function(block) {
    var code = 'card'; 

    return [code, Blockly.Arduino.ORDER_NONE];  
}

Blockly.Arduino['while_times'] = function (block) {

    var value = block.getFieldValue('VALUE');
    var times = Blockly.Arduino.valueToCode(block, 'TIMES', Blockly.Arduino.ORDER_NONE) || '0';
    var branchCode = Blockly.Arduino.statementToCode(block, 'DO') ||
        Blockly.Arduino.PASS;

    Blockly.Arduino.imports_['import_Timer'] = 'from machine import Timer';
    Blockly.Arduino.imports_['import_utime'] = 'import utime';

    Blockly.Arduino.definitions_['define_while_times'] =
        'currentTime = 0\n' +
        'previousTime = 0\n' +
        'elapsedTime = 0\n';

    if (value == "s") {
        var code =
            "elapsedTime = 0\n" +
            "previousTime = currentTime\n" +
            "while elapsedTime < (" + times + "):\n" +
            "    currentTime = utime.ticks_ms()\n" +
            "    elapsedTime = (currentTime - previousTime) / 1000\n" +
            branchCode + "\n";
    }

    else if (value == "ms") { 
        var code =
            "elapsedTime = 0\n" +
            "previousTime = currentTime\n" +
            "while elapsedTime < (" + times + "):\n" +
            "    currentTime = utime.ticks_ms()\n" +
            "    elapsedTime = currentTime - previousTime\n" +
            branchCode + "\n";
    }

    return code;
}

Blockly.Arduino['variable_convert'] = function (block) {
    var variable = block.getFieldValue('VARIABLE');
    var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || '0';
    var code = '';

    code = variable + '(' + value + ')';

    return [code, Blockly.Arduino.ORDER_NONE];  
}