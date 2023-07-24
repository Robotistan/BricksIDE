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

Blockly.Arduino['setLedValue'] = function(block) {

    var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

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
        Blockly.Arduino.imports_['import_led'] = "import machine";
        Blockly.Arduino.definitions_['define_led'] ='pin_led = machine.Pin(' + pin + ', machine.Pin.OUT)';   
   
        if(value == '(1)')
          code += 'pin_led.on()\n';
        else
          code += 'pin_led.off()\n';
    }

    return code;
};

Blockly.Arduino['ledStates'] = function(block) {

    var value = block.getFieldValue('VALUE');

    return [value, Blockly.Arduino.ORDER_NONE]; 
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
        Blockly.Arduino.definitions_['import_relay'] = 'import machine';
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
        Blockly.Arduino.definitions_['import_button'] = "import machine";
        Blockly.Arduino.definitions_['define_button'] = 'pin_button = machine.Pin(' + pin + ', machine.Pin.IN)';  
        var code = 'pin_button.value()';
        return [code, Blockly.Arduino.ORDER_NONE];  
    }
};

Blockly.Arduino['playBuzzer'] = function(block) {

    var frequency =  Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var noteTime = "1";

    var code = "";
    var pin = BuzzerPin;
    var interval = 0;

    if(editorType == "CPP")
    {
        if(noteTime == "1")
            interval = 250;
        else if(noteTime == "2")
            interval = 500;
        else if(noteTime == "3")
            interval = 1000;

        code =  
                'pinMode(' + pin + ', OUTPUT); \n' +
                'tone(' + pin + ', ' + frequency + ', ' + interval + '); \n' +
                'delay(' + interval + '); \n';
    }
    else if(editorType == "Simulator")
    {
        code = 'soundBuzzer(' + frequency + ',' + noteTime + ');\n';
    }
    else
    {
        if(noteTime == "1")
            interval = 0.250;
        else if(noteTime == "2")
            interval = 0.500;
        else if(noteTime == "3")
            interval = 1;

        Blockly.Arduino.imports_['import_buzzer1'] = 'from machine import Pin, PWM';

        code = 
                'buzzer = PWM(Pin(' + pin + '))\n' +
                'buzzer.freq(' + frequency + ')\n' +
                'buzzer.duty_u16(100)\n' +
                'sleep(' + interval + ')\n' +
                'buzzer.duty_u16(0)\n';
    }

    return code;
};

Blockly.Arduino['servoMotor1'] = function(block) {
    var angle =  Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var code = "";
    var pin = ServoPin1;

    if(editorType == "CPP")
    {
        Blockly.Arduino.imports_['import_servo'] = '#include <Servo.h>';
        Blockly.Arduino.imports_['define_servo'] = 'Servo servo_1';
        Blockly.Arduino.setups_['setup_servo'] = 'servo_1.attach(' + pin + ')';

        code = 'servo_1.write(' + angle + ')'
    }
    else if(editorType == "Simulator")
    {
        code = 'setServo1Value();\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_servo1'] = 'from time import sleep';
        Blockly.Arduino.imports_['import_servo2'] = 'from machine import Pin, PWM';

        Blockly.Arduino.imports_['define_servo1'] = 'pwm_1 = PWM(Pin(' + pin + '))';
        Blockly.Arduino.imports_['define_servo2'] = 'pwm_1.freq(50)';

        angle = Math.abs((angle * (6000 / 180)) + 2000);
        code = 'pwm_1.duty_u16(' + angle + ')'
    }

    return code;
};

Blockly.Arduino['servoMotor2'] = function(block) {
    var angle =  Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var code = "";
    var pin = ServoPin1;

    if(editorType == "CPP")
    {
        Blockly.Arduino.imports_['import_servo'] = '#include <Servo.h>';
        Blockly.Arduino.imports_['define_servo'] = 'Servo servo_2';
        Blockly.Arduino.setups_['setup_servo'] = 'servo_2.attach(' + pin + ')';

        code = 'servo_2.write(' + angle + ')'
    }
    else if(editorType == "Simulator")
    {
        code = 'setServo2Value();\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_servo1'] = 'from time import sleep';
        Blockly.Arduino.imports_['import_servo2'] = 'from machine import Pin, PWM';

        Blockly.Arduino.imports_['define_servo1'] = 'pwm_2 = PWM(Pin(' + pin + '))';
        Blockly.Arduino.imports_['define_servo2'] = 'pwm_2.freq(50)';

        angle = Math.abs((angle * (6000 / 180)) + 2000);
        code = 'pwm_2.duty_u16(' + angle + ')'
    }

    return code;
};

Blockly.Arduino['motor1'] = function(block) {

    var direction = block.getFieldValue('MOTOR');
    var speed =  100;

    var code = "";
    var pin = pin = MotorPin1;

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {
        code = 'setMotor1Value();\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_motor1'] = 'from machine import PWM, Pin, ADC';

        Blockly.Arduino.imports_['define_motor1'] = 'motor_1 = PWM(Pin(' + pin + '))';
        Blockly.Arduino.imports_['define_motor2'] = 'motor_1.duty_u16(0)';

        code = 'motor_1.duty_u16(' + speed + ')';
    }

    return code;
};

Blockly.Arduino['motor2'] = function(block) {

    var direction = block.getFieldValue('MOTOR');
    var speed =  100;

    var code = "";
    var pin = pin = MotorPin2;

    if(editorType == "CPP")
    {
        code = '';
    }
    else if(editorType == "Simulator")
    {
        code = 'setMotor2Value();\n';
    }
    else
    {
        Blockly.Arduino.imports_['import_motor1'] = 'from machine import PWM, Pin, ADC';

        Blockly.Arduino.imports_['define_motor1'] = 'motor_2 = PWM(Pin(' + pin + '))';
        Blockly.Arduino.imports_['define_motor2'] = 'motor_2.duty_u16(0)';

        code = 'motor_2.duty_u16(' + speed + ')';
    }

    return code;
};

Blockly.Arduino['neoPixelColour'] = function(block) {

    var colourValue = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);
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