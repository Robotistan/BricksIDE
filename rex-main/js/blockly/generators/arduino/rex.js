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

Blockly.Arduino['DirectionSpeed'] = function (block) {

    var direction = block.getFieldValue('Direction');
    var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_NONE) || '0';
    var code = '';
    
    var A1pin = Motor_A1_pin;
    var A2pin = Motor_A2_pin;
    var B1pin = Motor_B1_pin;
    var B2pin = Motor_B2_pin;
    var C1pin = Motor_C1_pin;
    var C2pin = Motor_C2_pin;
    var D1pin = Motor_D1_pin;
    var D2pin = Motor_D2_pin;

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';
    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';

    Blockly.Arduino.definitions_['define_direction_motorA'] = '#motorA\n' +
                                                              'motor_A1 = PWM(Pin('+ A1pin +'))\n' +
                                                              'motor_A1.duty_u16(0)\n' +
                                                              'motor_A2 = PWM(Pin('+ A2pin +'))\n' +
                                                              'motor_A2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorB'] = '#motorB\n' +
                                                              'motor_B1 = PWM(Pin('+ B1pin +'))\n' +
                                                              'motor_B1.duty_u16(0)\n' +
                                                              'motor_B2 = PWM(Pin('+ B2pin +'))\n' +
                                                              'motor_B2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorC'] = '#motorC\n' +
                                                              'motor_C1 = PWM(Pin('+ C1pin +'))\n' +
                                                              'motor_C1.duty_u16(0)\n' +
                                                              'motor_C2 = PWM(Pin('+ C2pin +'))\n' +
                                                              'motor_C2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorD'] = '#motorD\n' +
                                                              'motor_D1 = PWM(Pin('+ D1pin +'))\n' +
                                                              'motor_D1.duty_u16(0)\n' +
                                                              'motor_D2 = PWM(Pin('+ D2pin +'))\n' +
                                                              'motor_D2.duty_u16(0)\n\n';

    if (direction == "forward") {
        Blockly.Arduino.definitions_['define_direction_forward'] =
            'def ' + direction + '(speedForward):\n' +
            '   motor_A1.duty_u16(speedForward * 650)\n' +
            '   motor_A2.duty_u16(0 * 650)\n\n' +
            '   motor_B1.duty_u16(speedForward * 650)\n' +
            '   motor_B2.duty_u16(0 * 650)\n\n' +
            '   motor_C1.duty_u16(speedForward * 650)\n' +
            '   motor_C2.duty_u16(0 * 650)\n\n' +
            '   motor_D1.duty_u16(speedForward * 650)\n' +
            '   motor_D2.duty_u16(0 * 650)\n\n' +
            '   return\n\n';

    }
    else if (direction == "backward") {
        Blockly.Arduino.definitions_['define_direction_backward'] =
            'def ' + direction + '(speedBackward):\n' +
            '   motor_A1.duty_u16(0 * 650)\n' +
            '   motor_A2.duty_u16(speedBackward * 650)\n\n' +
            '   motor_B1.duty_u16(0 * 650)\n' +
            '   motor_B2.duty_u16(speedBackward * 650)\n\n' +
            '   motor_C1.duty_u16(0 * 650)\n' +
            '   motor_C2.duty_u16(speedBackward * 650)\n\n' +
            '   motor_D1.duty_u16(0 * 650)\n' +
            '   motor_D2.duty_u16(speedBackward * 650)\n\n' +
            '   return\n\n';

    }
    else if (direction == "left") {
        Blockly.Arduino.definitions_['define_direction_left'] =
            'def ' + direction + '(speedLeft):\n' +
            '   motor_A1.duty_u16(0 * 650)\n' +
            '   motor_A2.duty_u16(speedLeft * 650)\n\n' +
            '   motor_B1.duty_u16(0 * 650)\n' +
            '   motor_B2.duty_u16(speedLeft * 650)\n\n' +
            '   motor_C1.duty_u16(speedLeft * 650)\n' +
            '   motor_C2.duty_u16(0 * 650)\n\n' +
            '   motor_D1.duty_u16(speedLeft * 650)\n' +
            '   motor_D2.duty_u16(0 * 650)\n\n' +
            '   return\n\n';

    }

    else if (direction == "right") {
        Blockly.Arduino.definitions_['define_direction_right'] =
            'def ' + direction + '(speedRight):\n' +
            '   motor_A1.duty_u16(speedRight * 650)\n' +
            '   motor_A2.duty_u16(0 * 650)\n\n' +
            '   motor_B1.duty_u16(speedRight * 650)\n' +
            '   motor_B2.duty_u16(0 * 650)\n\n' +
            '   motor_C1.duty_u16(0 * 650)\n' +
            '   motor_C2.duty_u16(speedRight * 650)\n\n' +
            '   motor_D1.duty_u16(0 * 650)\n' +
            '   motor_D2.duty_u16(speedRight * 650)\n\n' +
            '   return\n\n';
            
    }

    code = direction + '(' + speed + ')\n';

    return code;
};

Blockly.Arduino['DirectionSpeedV5'] = function (block) {

    var direction = block.getFieldValue('Direction');
    var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_NONE) || '0';
    var code = '';
    
    var A1pin = Motor_A1_pin;
    var A2pin = Motor_A2_pin;
    var B1pin = Motor_B1_pin;
    var B2pin = Motor_B2_pin;
    var C1pin = Motor_C1_pin;
    var C2pin = Motor_C2_pin;
    var D1pin = Motor_D1_pin;
    var D2pin = Motor_D2_pin;

    var workspace = Blockly.getMainWorkspace();
    var bleAppBlocks = workspace.getAllBlocks().filter(function(b) {
        return b.type === 'BLE_App';
    });

    if (bleAppBlocks.length > 0) {
        Blockly.Arduino.definitions_['define_direction_pwm'] = 'motor_pwm = PWM(Pin(13))';
        var pwm_value1 = '';

    } else {
        var pwm_value1 = '   motor_pwm.value(1)\n';
        Blockly.Arduino.definitions_['define_direction_pwm'] = 'motor_pwm = Pin(13, Pin.OUT)';
    }

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';
    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';

    Blockly.Arduino.definitions_['define_direction_pwm'] = 'motor_pwm = Pin(13, Pin.OUT)\n';

    Blockly.Arduino.definitions_['define_direction_motorA'] = '#motorA\n' +
                                                              'motor_A1 = PWM(Pin('+ A1pin +'))\n' +
                                                              'motor_A1.duty_u16(0)\n' +
                                                              'motor_A2 = PWM(Pin('+ A2pin +'))\n' +
                                                              'motor_A2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorB'] = '#motorB\n' +
                                                              'motor_B1 = PWM(Pin('+ B1pin +'))\n' +
                                                              'motor_B1.duty_u16(0)\n' +
                                                              'motor_B2 = PWM(Pin('+ B2pin +'))\n' +
                                                              'motor_B2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorC'] = '#motorC\n' +
                                                              'motor_C1 = PWM(Pin('+ C1pin +'))\n' +
                                                              'motor_C1.duty_u16(0)\n' +
                                                              'motor_C2 = PWM(Pin('+ C2pin +'))\n' +
                                                              'motor_C2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorD'] = '#motorD\n' +
                                                              'motor_D1 = PWM(Pin('+ D1pin +'))\n' +
                                                              'motor_D1.duty_u16(0)\n' +
                                                              'motor_D2 = PWM(Pin('+ D2pin +'))\n' +
                                                              'motor_D2.duty_u16(0)\n\n';

    if (direction == "forward") {
        Blockly.Arduino.definitions_['define_direction_forward'] =
            'def ' + direction + '(speedForward):\n' +
            pwm_value1 +
            '   motor_A1.duty_u16(speedForward * 650)\n' +
            '   motor_A2.duty_u16(0 * 650)\n\n' +
            '   motor_B1.duty_u16(speedForward * 650)\n' +
            '   motor_B2.duty_u16(0 * 650)\n\n' +
            '   motor_C1.duty_u16(speedForward * 650)\n' +
            '   motor_C2.duty_u16(0 * 650)\n\n' +
            '   motor_D1.duty_u16(speedForward * 650)\n' +
            '   motor_D2.duty_u16(0 * 650)\n\n' +
            '   return\n\n';

    }
    else if (direction == "backward") {
        Blockly.Arduino.definitions_['define_direction_backward'] =
            'def ' + direction + '(speedBackward):\n' +
            pwm_value1 +
            '   motor_A1.duty_u16(0 * 650)\n' +
            '   motor_A2.duty_u16(speedBackward * 650)\n\n' +
            '   motor_B1.duty_u16(0 * 650)\n' +
            '   motor_B2.duty_u16(speedBackward * 650)\n\n' +
            '   motor_C1.duty_u16(0 * 650)\n' +
            '   motor_C2.duty_u16(speedBackward * 650)\n\n' +
            '   motor_D1.duty_u16(0 * 650)\n' +
            '   motor_D2.duty_u16(speedBackward * 650)\n\n' +
            '   return\n\n';

    }
    else if (direction == "left") {
        Blockly.Arduino.definitions_['define_direction_left'] =
            'def ' + direction + '(speedLeft):\n' +
            pwm_value1 +
            '   motor_A1.duty_u16(0 * 650)\n' +
            '   motor_A2.duty_u16(speedLeft * 650)\n\n' +
            '   motor_B1.duty_u16(0 * 650)\n' +
            '   motor_B2.duty_u16(speedLeft * 650)\n\n' +
            '   motor_C1.duty_u16(speedLeft * 650)\n' +
            '   motor_C2.duty_u16(0 * 650)\n\n' +
            '   motor_D1.duty_u16(speedLeft * 650)\n' +
            '   motor_D2.duty_u16(0 * 650)\n\n' +
            '   return\n\n';

    }

    else if (direction == "right") {
        Blockly.Arduino.definitions_['define_direction_right'] =
            'def ' + direction + '(speedRight):\n' +
            pwm_value1 +
            '   motor_A1.duty_u16(speedRight * 650)\n' +
            '   motor_A2.duty_u16(0 * 650)\n\n' +
            '   motor_B1.duty_u16(speedRight * 650)\n' +
            '   motor_B2.duty_u16(0 * 650)\n\n' +
            '   motor_C1.duty_u16(0 * 650)\n' +
            '   motor_C2.duty_u16(speedRight * 650)\n\n' +
            '   motor_D1.duty_u16(0 * 650)\n' +
            '   motor_D2.duty_u16(speedRight * 650)\n\n' +
            '   return\n\n';
            
    }

    else if (direction == "forward_right") {
        Blockly.Arduino.definitions_['define_appMotors_forward_right'] =
        'def ' + direction + '(speed_'+ direction +'):\n' +
        pwm_value1 +
        '   motor_A1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_A2.duty_u16(0 * 650)\n\n' +
        '   motor_B1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_B2.duty_u16(0 * 650)\n\n' +
        '   motor_C1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_C2.duty_u16(0 * 650)\n\n' +
        '   motor_D1.duty_u16(0 * 650)\n' +
        '   motor_D2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   return\n\n';
    }
    
    else if (direction == "forward_left") {
        Blockly.Arduino.definitions_['define_appMotors_forward_left'] =
        'def ' + direction + '(speed_'+ direction +'):\n' +
        pwm_value1 +
        '   motor_A1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_A2.duty_u16(0 * 650)\n\n' +
        '   motor_B1.duty_u16(0 * 650)\n' +
        '   motor_B2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_C1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_C2.duty_u16(0 * 650)\n\n' +
        '   motor_D1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_D2.duty_u16(0 * 650)\n\n' +
        '   return\n\n';
    }

    else if (direction == "backward_right") {
        Blockly.Arduino.definitions_['define_appMotors_backward_right'] =
        'def ' + direction + '(speed_'+ direction +'):\n' +
        pwm_value1 +
        '   motor_A1.duty_u16(0 * 650)\n' +
        '   motor_A2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_B1.duty_u16(0 * 650)\n' +
        '   motor_B2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_C1.duty_u16(0 * 650)\n' +
        '   motor_C2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_D1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_D2.duty_u16(0 * 650)\n\n' +
        '   return\n\n';
    }

    else if (direction == "backward_left") {
        Blockly.Arduino.definitions_['define_appMotors_backward_left'] =
        'def ' + direction + '(speed_'+ direction +'):\n' +
        pwm_value1 +
        '   motor_A1.duty_u16(0 * 650)\n' +
        '   motor_A2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_B1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_B2.duty_u16(0 * 650)\n\n' +
        '   motor_C1.duty_u16(0 * 650)\n' +
        '   motor_C2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_D1.duty_u16(0 * 650)\n' +
        '   motor_D2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   return\n\n';
    }

    code = direction + '(' + speed + ')\n';

    return code;
};

Blockly.Arduino['stopMotors'] = function (block) {
    var code = '';

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
    Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';

    Blockly.Arduino.definitions_['define_stop_motors'] =
        'def stop():\n' +
        '   motor_A1.duty_u16(0 * 650)\n' +
        '   motor_A2.duty_u16(0 * 650)\n\n' +
        '   motor_B1.duty_u16(0 * 650)\n' +
        '   motor_B2.duty_u16(0 * 650)\n\n' +
        '   motor_C1.duty_u16(0 * 650)\n' +
        '   motor_C2.duty_u16(0 * 650)\n\n' +
        '   motor_D1.duty_u16(0 * 650)\n' +
        '   motor_D2.duty_u16(0 * 650)\n\n';

    code = 'stop()\n';

    return code;
};

Blockly.Arduino['stopMotorsV5'] = function (block) {
    var code = '';

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
    Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';

    var workspace = Blockly.getMainWorkspace();
    var bleAppBlocks = workspace.getAllBlocks().filter(function(b) {
        return b.type === 'BLE_App';
    });

    if (bleAppBlocks.length > 0) {
        var pwm_value = '';

    } else {
        var pwm_value = '   motor_pwm.value(0)\n';
    }

    Blockly.Arduino.definitions_['define_stop_motorsV5'] =
        'def stop():\n' +
        pwm_value +
        '   motor_A1.duty_u16(0 * 650)\n' +
        '   motor_A2.duty_u16(0 * 650)\n\n' +
        '   motor_B1.duty_u16(0 * 650)\n' +
        '   motor_B2.duty_u16(0 * 650)\n\n' +
        '   motor_C1.duty_u16(0 * 650)\n' +
        '   motor_C2.duty_u16(0 * 650)\n\n' +
        '   motor_D1.duty_u16(0 * 650)\n' +
        '   motor_D2.duty_u16(0 * 650)\n\n';

    code = 'stop()\n';

    return code;
};

Blockly.Arduino['trackingThreshold'] = function(block){
    var colorTrackingLine = block.getFieldValue('COLOR');
    var code = '';

    if(colorTrackingLine === 'Black'){
    Blockly.Arduino.definitions_['define_trackingThreshould'] = 'THRESHOLD = 50000';}
    else if(colorTrackingLine === 'White'){
    Blockly.Arduino.definitions_['define_trackingThreshould'] = 'THRESHOLD = 10000';}

    return code;
};

Blockly.Arduino['trackingState'] = function (block) {
    var value = block.getFieldValue('VALUE');
    var code = '';
    var A0pin = IR_A0_pin;
    var A1pin = IR_A1_pin;
    
    Blockly.Arduino.imports_['import_machine'] = 'import machine';
    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';

    Blockly.Arduino.definitions_['define_stackingState'] = 'rightSensor = ADC(Pin('+A1pin+'))\n'+
                                                           'leftSensor = ADC(Pin('+A0pin+'))';
    
    var colorTrackingLine = block.workspace.trackingColor || 'Black';
    //console.log(colorTrackingLine);
    if(colorTrackingLine === 'Black'){
        if (value == "forward") {
            code = 'leftSensor.read_u16() >= THRESHOLD and rightSensor.read_u16() >= THRESHOLD'
        }
        else if (value == "right") {
            code = 'leftSensor.read_u16() < THRESHOLD and rightSensor.read_u16() > THRESHOLD'
        }
        else if (value == "left") {
            code = 'leftSensor.read_u16() > THRESHOLD and rightSensor.read_u16() < THRESHOLD'
        }
        else if (value == "backward") {
            code = 'leftSensor.read_u16() < THRESHOLD and rightSensor.read_u16() < THRESHOLD'
        }
    }
    else if(colorTrackingLine === 'White'){
        if (value == "forward") {
            code = 'leftSensor.read_u16() <= THRESHOLD and rightSensor.read_u16() <= THRESHOLD'
        }
        else if (value == "right") {
            code = 'leftSensor.read_u16() > THRESHOLD and rightSensor.read_u16() < THRESHOLD'
        }
        else if (value == "left") {
            code = 'leftSensor.read_u16() < THRESHOLD and rightSensor.read_u16() > THRESHOLD'
        }
        else if (value == "backward") {
            code = 'leftSensor.read_u16() > THRESHOLD and rightSensor.read_u16() > THRESHOLD'
        }
    }
    return [code, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['trackingSensor'] = function (block) {
    var value = block.getFieldValue('VALUE');
    var code = '';
    var A0pin = IR_A0_pin;
    var A1pin = IR_A1_pin;

    Blockly.Arduino.imports_['import_machine'] = 'import machine';
    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';

    if (value == 'left') {
        Blockly.Arduino.definitions_['define_tracking_sensor1'] =
           'leftSensor = ADC(Pin('+ A0pin +'))\n';
        code = 'leftSensor.read_u16()';
    }
    else if (value == 'right') {
        Blockly.Arduino.definitions_['define_tracking_sensor2'] =
           'rightSensor = ADC(Pin('+ A1pin +'))\n';
        code = 'rightSensor.read_u16()';
    }
    return [code, Blockly.Arduino.ORDER_NONE];
};
  
Blockly.Arduino['axisAcceleration'] = function (block) {

    var value = block.getFieldValue('VALUE');
    var code = '';
    var SDApin = I2C_SDA_pin;
    var SCLpin = I2C_SCL_pin;

    Blockly.Arduino.imports_['import_MPU6050'] = 'import mpu6050';
    Blockly.Arduino.imports_['import_I2C'] = 'from machine import I2C';
    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';

    Blockly.Arduino.definitions_['define_axis'] = 'i2c = I2C(scl=Pin('+ SCLpin +'), sda=Pin('+ SDApin +'))\n' +
        '#initializing the I2C method for ESP32\n' +
        'mpu = mpu6050.accel(i2c)\n';

    code = 'mpu.get_values()["Ac' + value + '"]';

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

Blockly.Arduino['readDistance'] = function (block) {
    var meter = block.getFieldValue('VALUE');
    var code = '';
    var trigPin = TrigPin;
    var echoPin = EchoPin;

    Blockly.Arduino.imports_['import_time_pulse_us'] = 'from machine import time_pulse_us';
    Blockly.Arduino.imports_['import_HCSR04'] = 'from rex import HCSR04';

    Blockly.Arduino.definitions_['define_distance'] = 'sensor = HCSR04(trigger_pin='+ trigPin +', echo_pin='+ echoPin +', echo_timeout_us=10000)';

    var code = 'sensor.distance_'+ meter +'()';

    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['servoMotor'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var angle =  Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_NONE) || '0';
    var code = "";
    var pin = 0;
    var servoM1 = ServoPin1;
    var servoM2 = ServoPin2;
    var servoM3 = ServoPin3;
    var servoM4 = ServoPin4;

    if(motor == "1")
        pin = servoM1;
    else if(motor == "2")
        pin = servoM2;
    else if(motor == "3")
        pin = servoM3;
    else
        pin = servoM4;

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
    Blockly.Arduino.imports_['import_fabs'] = 'from math import fabs';

    Blockly.Arduino.definitions_['define_angleFunc'] = 
                                                        'def CalculateAngle(angle):\n' +
                                                        '   angle = fabs((angle * (6000 / 180)) + 2000)\n' +
                                                        '   angle = round(angle)\n' +
                                                        '   return angle\n';
                                                        
    Blockly.Arduino.definitions_['define_servo1' + motor] = 'pwm_' + motor + ' = PWM(Pin(' + pin + '))';
    Blockly.Arduino.definitions_['define_servo2' + motor] = 'pwm_' + motor + '.freq(50)\n';
    
    code = 'pwm_' + motor + '.duty_u16(CalculateAngle(' + angle + '))\n';

    return code;
};

Blockly.Arduino['dcMotor'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var speed =  Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_NONE) || '0';
    var value = block.getFieldValue('VALUE');
    var code = "";
    var pin1 = 0;
    var pin2 = 0;
    
    var A1 = Motor_A1_pin;
    var A2 = Motor_A2_pin;
    var B1 = Motor_B1_pin;
    var B2 = Motor_B2_pin;
    var C1 = Motor_C1_pin;
    var C2 = Motor_C2_pin;
    var D1 = Motor_D1_pin;
    var D2 = Motor_D2_pin;

    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';

    if(motor == "A"){
        pin1 = A1;
        pin2 = A2;
        
        if(value == "forward"){
            Blockly.Arduino.definitions_['define_motorA1'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_' + motor + '1.duty_u16(' + speed + ')\n'+
               'motor_' + motor + '2.duty_u16(0)\n'; 
        }
        else if (value == "backward"){
            Blockly.Arduino.definitions_['define_motorA2'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_' + motor + '1.duty_u16(0)\n'+
               'motor_' + motor + '2.duty_u16(' + speed + ')\n';
        }
    }
    
    if(motor == "B"){
        pin1 = B1;
        pin2 = B2;
        
        if(value == "forward"){
            Blockly.Arduino.definitions_['define_motorB1'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_' + motor + '1.duty_u16(' + speed + ')\n'+
               'motor_' + motor + '2.duty_u16(0)\n'; 
        }
        else if (value == "backward"){
            Blockly.Arduino.definitions_['define_motorB2'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_' + motor + '1.duty_u16(0)\n'+
               'motor_' + motor + '2.duty_u16(' + speed + ')\n';
        }
    }
    if(motor == "C"){
        pin1 = C1;
        pin2 = C2;
        
        if(value == "forward"){
            Blockly.Arduino.definitions_['define_motorC1'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_' + motor + '1.duty_u16(' + speed + ')\n'+
               'motor_' + motor + '2.duty_u16(0)\n'; 
        }
        else if (value == "backward"){
            Blockly.Arduino.definitions_['define_motorC2'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_' + motor + '1.duty_u16(0)\n'+
               'motor_' + motor + '2.duty_u16(' + speed + ')\n';
        }
    }
    if(motor == "D"){
        pin1 = D1;
        pin2 = D2;
        
        if(value == "forward"){
            Blockly.Arduino.definitions_['define_motorD1'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_' + motor + '1.duty_u16(' + speed + ')\n'+
               'motor_' + motor + '2.duty_u16(0)\n'; 
        }
        else if (value == "backward"){
            Blockly.Arduino.definitions_['define_motorD2'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_' + motor + '1.duty_u16(0)\n'+
               'motor_' + motor + '2.duty_u16(' + speed + ')\n';
        }
    }
    
    
    return code;
};


Blockly.Arduino['dcMotorV5'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var speed =  Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_NONE) || '0';
    var value = block.getFieldValue('VALUE');
    var code = "";
    var pin1 = 0;
    var pin2 = 0;
    
    var A1 = Motor_A1_pin;
    var A2 = Motor_A2_pin;
    var B1 = Motor_B1_pin;
    var B2 = Motor_B2_pin;
    var C1 = Motor_C1_pin;
    var C2 = Motor_C2_pin;
    var D1 = Motor_D1_pin;
    var D2 = Motor_D2_pin;

    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';
    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';

    
    Blockly.Arduino.definitions_['define_direction_pwm'] = 'motor_pwm = Pin(13, Pin.OUT)\n';

    if(motor == "A"){
        pin1 = A1;
        pin2 = A2;
        
        if(value == "forward"){
            Blockly.Arduino.definitions_['define_motorA1'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
        code = 'motor_pwm.value(1)\n' +
               'motor_' + motor + '1.duty_u16(' + speed + ')\n'+
               'motor_' + motor + '2.duty_u16(0)\n'; 
        }
        else if (value == "backward"){
            Blockly.Arduino.definitions_['define_motorA2'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
            code = 'motor_pwm.value(1)\n' + 
               'motor_' + motor + '1.duty_u16(0)\n'+
               'motor_' + motor + '2.duty_u16(' + speed + ')\n';
        }
    }
    
    if(motor == "B"){
        pin1 = B1;
        pin2 = B2;
        
        if(value == "forward"){
            Blockly.Arduino.definitions_['define_motorB1'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
            code = 'motor_pwm.value(1)\n' +
               'motor_' + motor + '1.duty_u16(' + speed + ')\n'+
               'motor_' + motor + '2.duty_u16(0)\n'; 
        }
        else if (value == "backward"){
            Blockly.Arduino.definitions_['define_motorB2'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
            code = 'motor_pwm.value(1)\n' +
               'motor_' + motor + '1.duty_u16(0)\n'+
               'motor_' + motor + '2.duty_u16(' + speed + ')\n';
        }
    }
    if(motor == "C"){
        pin1 = C1;
        pin2 = C2;
        
        if(value == "forward"){
            Blockly.Arduino.definitions_['define_motorC1'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
            code = 'motor_pwm.value(1)\n' +
               'motor_' + motor + '1.duty_u16(' + speed + ')\n'+
               'motor_' + motor + '2.duty_u16(0)\n'; 
        }
        else if (value == "backward"){
            Blockly.Arduino.definitions_['define_motorC2'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
            code = 'motor_pwm.value(1)\n' +
               'motor_' + motor + '1.duty_u16(0)\n'+
               'motor_' + motor + '2.duty_u16(' + speed + ')\n';
        }
    }
    if(motor == "D"){
        pin1 = D1;
        pin2 = D2;
        
        if(value == "forward"){
            Blockly.Arduino.definitions_['define_motorD1'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
            code = 'motor_pwm.value(1)\n' + 
               'motor_' + motor + '1.duty_u16(' + speed + ')\n'+
               'motor_' + motor + '2.duty_u16(0)\n'; 
        }
        else if (value == "backward"){
            Blockly.Arduino.definitions_['define_motorD2'] = 'motor_' + motor + '1 = PWM(Pin(' + pin1 + '))\n'+
                                                        'motor_' + motor + '2 = PWM(Pin(' + pin2 + '))\n';
            code = 'motor_pwm.value(1)\n' +
               'motor_' + motor + '1.duty_u16(0)\n'+
               'motor_' + motor + '2.duty_u16(' + speed + ')\n';
        }
    }
    
    return code;
};

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


Blockly.Arduino['isButtonPressed'] = function(block) {

    var value = block.getFieldValue('VALUE');
  
    var code = "ir_data == " + value;

    return [code, Blockly.Arduino.ORDER_NONE];
};


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
};

Blockly.Arduino['variable_convert'] = function (block) {
    var variable = block.getFieldValue('VARIABLE');
    var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || '0';
    var code = '';

    code = variable + '(' + value + ')';

    return [code, Blockly.Arduino.ORDER_NONE];  
};


Blockly.Arduino['BLE_App'] = function (block) { 
    var code = '';
    var branchCode = Blockly.Arduino.statementToCode(block, 'DO') ||
        Blockly.Arduino.PASS;

    Blockly.Arduino.imports_['import_rex_App_BLE'] = 'from rex import ESP32_BLE';
    
    Blockly.Arduino.definitions_['define_trackingThreshould'] = 'ble_device = ESP32_BLE()';

    code = 'buffer = ble_device.get_data()\n';

    return code;
};

Blockly.Arduino['CheckBLE_App'] = function (block) {
    var code = '';

    Blockly.Arduino.imports_['import_rex_App_BLE'] = 'from rex import ESP32_BLE';

    code = 'buffer';

    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['clearBLE_App'] = function (block) {
    var code = '';

    Blockly.Arduino.imports_['import_rex_App_BLE'] = 'from rex import ESP32_BLE';
    
    Blockly.Arduino.definitions_['define_trackingThreshould'] = 'ble_device = ESP32_BLE()';

    code = 'ble_device.clear_data()\n';

    return code;
};

Blockly.Arduino['robotTypesApp'] = function (block) {

    var type = block.getFieldValue('RobotType');
    var code = '';

    if (type == "wibot_roverbot"){
        code = "buffer[1] == 1";
    }
    else if (type == "omnibot"){
        code = "buffer[1] == 2";
    }
    else if (type == "armbot"){
        code = "buffer[1] == 3";
    }
    
    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['ButtonsApp'] = function (block) {

    var type = block.getFieldValue('Direction');
    var code = '';

    if (type == "horn"){
        code = "buffer[2] == 2";
    }
    else if (type == "forward"){
        code = "buffer[2] == 3";
    }
    else if (type == "backward"){
        code = "buffer[2] == 7";
    }
    else if (type == "right"){
        code = "buffer[2] == 5";
    }
    else if (type == "left"){
        code = "buffer[2] == 9";
    }
    else if (type == "forward_right"){
        code = "buffer[2] == 4";
    }
    else if (type == "forward_left"){
        code = "buffer[2] == 10";
    }
    else if (type == "backward_right"){
        code = "buffer[2] == 6";
    }
    else if (type == "backward_left"){
        code = "buffer[2] == 8";
    }
    else if (type == "servo1_right"){
        code = "buffer[3] == 2";
    }
    else if (type == "servo1_right"){
        code = "buffer[3] == 2";
    }
    else if (type == "servo1_left"){
        code = "buffer[3] == 1";
    }
    else if (type == "servo2_up"){
        code = "buffer[3] == 3";
    }
    else if (type == "servo2_down"){
        code = "buffer[3] == 4";
    }
    else if (type == "servo3_up"){
        code = "buffer[3] == 6";
    }
    else if (type == "servo3_down"){
        code = "buffer[3] == 5";
    }
    else if (type == "servo4_open"){
        code = "buffer[3] == 7";
    }
    else if (type == "servo4_close"){
        code = "buffer[3] == 8";
    }
    else if (type == "servo_reset"){
        code = "buffer[2] == 1";
    }
    else if (type == "stop"){
        code = "buffer[2] == 99";
    }

    return [code, Blockly.Arduino.ORDER_NONE];
}

Blockly.Arduino['SelectApp'] = function (block) {
    
    var select = block.getFieldValue('Select');
    var code = '';
    if(select === 'joystick'){
        var code = 
        "buffer[2] == 1";
    }
    else if (select === 'dc_motor'){
        var code = 
        "buffer[2] == 3";
    }
    else if (select === 'servo_motor'){
        var code = 
        "buffer[2] == 4";
    }
    if (select == "header_byte"){
       var code = 
       "buffer[0] == 75";
    }

    return [code, Blockly.Arduino.ORDER_NONE];
}
Blockly.Arduino['Jotstick_Def_app'] = function (block) {
    var code = "";
    
    Blockly.Arduino.definitions_['define_JoystickDef'] = 'def custom_map(value, in_min, in_max, out_min, out_max):\n' +
                                                         '    return (value - in_min) * (out_max - out_min) // (in_max - in_min) + out_min\n\n' +
                                                         'def constrain(val, min_val, max_val):\n' +
                                                         '    return max(min_val, min(max_val, val))\n\n';
   
    code =  
    'xValue = buffer[3]\n' +
    'yValue = buffer[4]\n' +
    'centerX = 127\n' +
    'centerY = 127\n' +
    'deadZone = 20\n\n' +
    'xSpeed = custom_map(abs(xValue - centerX), 0, 127, 0, 255)\n' +
    'ySpeed = custom_map(abs(yValue - centerY), 0, 127, 0, 255)\n\n' +
    'xSpeed = constrain(xSpeed, 0, 100)\n' +
    'ySpeed = constrain(ySpeed, 0, 100)\n\n';    

    return code;
}
Blockly.Arduino['Joystick_Speed_App'] = function (block) {
    
    var select = block.getFieldValue('Select');
    var code = '';

    if(select === 'x'){
        var code = 'xSpeed';
    }
    else if (select === 'y'){
        var code = 'ySpeed';
    }

    return [code, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['Joystick_App_direction'] = function (block) {

    var type = block.getFieldValue('Direction');
    var code = '';

    Blockly.Arduino.definitions_['define_deadZone'] = 'deadZone = 20';

    if (type == "forward"){
        code = "(yValue < centerY - deadZone and abs(xValue - centerX) <= deadZone)";
    }
    else if (type == "backward"){
        code = "(yValue > centerY + deadZone and abs(xValue - centerX) <= deadZone)";
    }
    else if (type == "right"){
        code = "(xValue > centerX + deadZone and abs(yValue - centerY) <= deadZone)";
    }
    else if (type == "left"){
        code = "(xValue < centerX - deadZone and abs(yValue - centerY) <= deadZone)";
    }
    else if (type == "forward_right"){
        code = "(yValue < centerY - deadZone and xValue > centerX + deadZone)";
    }
    else if (type == "forward_left"){
        code = "(yValue < centerY - deadZone and xValue < centerX - deadZone)";
    }
    else if (type == "backward_right"){
        code = "(yValue > centerY + deadZone and xValue > centerX + deadZone)";
    }
    else if (type == "backward_left"){
        code = "(yValue > centerY + deadZone and xValue < centerX - deadZone)";
    }
    else if (type == "stop"){
        code = "(xValue == 0 and yValue == 0)";
    }

    return [code, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['Omni_direction_app'] = function (block) {

    var direction = block.getFieldValue('Direction');
    var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_NONE) || '0';
    var code = '';
    
    var A1pin = Motor_A1_pin;
    var A2pin = Motor_A2_pin;
    var B1pin = Motor_B1_pin;
    var B2pin = Motor_B2_pin;
    var C1pin = Motor_D1_pin;
    var C2pin = Motor_D2_pin;
    var D1pin = Motor_C1_pin;
    var D2pin = Motor_C2_pin;

    Blockly.Arduino.imports_['import_Pin'] = 'from machine import Pin';
    Blockly.Arduino.imports_['import_ADC'] = 'from machine import ADC';
    Blockly.Arduino.imports_['import_PWM'] = 'from machine import PWM';

    
    var pwm_value1 = '   motor_pwm.value(1)\n';
    Blockly.Arduino.definitions_['define_direction_pwm'] = 'motor_pwm = Pin(13, Pin.OUT)';

    Blockly.Arduino.definitions_['define_direction_motorA'] = '#motorA\n' +
                                                              'motor_A1 = PWM(Pin('+ A1pin +'))\n' +
                                                              'motor_A1.duty_u16(0)\n' +
                                                              'motor_A2 = PWM(Pin('+ A2pin +'))\n' +
                                                              'motor_A2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorB'] = '#motorB\n' +
                                                              'motor_B1 = PWM(Pin('+ B1pin +'))\n' +
                                                              'motor_B1.duty_u16(0)\n' +
                                                              'motor_B2 = PWM(Pin('+ B2pin +'))\n' +
                                                              'motor_B2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorC'] = '#motorC\n' +
                                                              'motor_C1 = PWM(Pin('+ C1pin +'))\n' +
                                                              'motor_C1.duty_u16(0)\n' +
                                                              'motor_C2 = PWM(Pin('+ C2pin +'))\n' +
                                                              'motor_C2.duty_u16(0)\n\n';

    Blockly.Arduino.definitions_['define_direction_motorD'] = '#motorD\n' +
                                                              'motor_D1 = PWM(Pin('+ D1pin +'))\n' +
                                                              'motor_D1.duty_u16(0)\n' +
                                                              'motor_D2 = PWM(Pin('+ D2pin +'))\n' +
                                                              'motor_D2.duty_u16(0)\n\n';

    if (direction == "backward") {
        Blockly.Arduino.definitions_['define_direction_backward_omni'] =
            'def ' + direction + '_omni (speedBackward):\n' +
            pwm_value1 +
            '   motor_A1.duty_u16(speedBackward * 650)\n' +
            '   motor_A2.duty_u16(0 * 650)\n\n' +
            '   motor_B1.duty_u16(speedBackward * 650)\n' +
            '   motor_B2.duty_u16(0 * 650)\n\n' +
            '   motor_C1.duty_u16(speedBackward * 650)\n' +
            '   motor_C2.duty_u16(0 * 650)\n\n' +
            '   motor_D1.duty_u16(speedBackward * 650)\n' +
            '   motor_D2.duty_u16(0 * 650)\n\n' +
            '   return\n\n';

    }
    else if (direction == "forward") {
        Blockly.Arduino.definitions_['define_direction_forward_omni'] =
            'def ' + direction + '_omni (speedForward):\n' +
            pwm_value1 +
            '   motor_A1.duty_u16(0 * 650)\n' +
            '   motor_A2.duty_u16(speedForward * 650)\n\n' +
            '   motor_B1.duty_u16(0 * 650)\n' +
            '   motor_B2.duty_u16(speedForward * 650)\n\n' +
            '   motor_C1.duty_u16(0 * 650)\n' +
            '   motor_C2.duty_u16(speedForward * 650)\n\n' +
            '   motor_D1.duty_u16(0 * 650)\n' +
            '   motor_D2.duty_u16(speedForward * 650)\n\n' +
            '   return\n\n';

    }
    else if (direction == "right") {
        Blockly.Arduino.definitions_['define_direction_right_omni'] =
            'def ' + direction + '_omni (speedRight):\n' +
            pwm_value1 +
            '   motor_A1.duty_u16(0 * 650)\n' +
            '   motor_A2.duty_u16(speedRight * 650)\n\n' +
            '   motor_B1.duty_u16(speedRight * 650)\n' +
            '   motor_B2.duty_u16(0 * 650)\n\n' +
            '   motor_C1.duty_u16(speedRight * 650)\n' +
            '   motor_C2.duty_u16(0 * 650)\n\n' +
            '   motor_D1.duty_u16(0 * 650)\n' +
            '   motor_D2.duty_u16(speedRight * 650)\n\n' +
            '   return\n\n';

    }

    else if (direction == "left") {
        Blockly.Arduino.definitions_['define_direction_left_omni'] =
            'def ' + direction + '_omni (speedLeft):\n' +
            pwm_value1 +
            '   motor_A1.duty_u16(speedLeft * 650)\n' +
            '   motor_A2.duty_u16(0 * 650)\n\n' +
            '   motor_B1.duty_u16(0 * 650)\n' +
            '   motor_B2.duty_u16(speedLeft * 650)\n\n' +
            '   motor_C1.duty_u16(0 * 650)\n' +
            '   motor_C2.duty_u16(speedLeft * 650)\n\n' +
            '   motor_D1.duty_u16(speedLeft * 650)\n' +
            '   motor_D2.duty_u16(0 * 650)\n\n' +
            '   return\n\n';
            
    }
    
    else if (direction == "forward_right") {
        Blockly.Arduino.definitions_['define_appMotors_forward_right_omni'] =
        'def ' + direction + '_omni (speed_'+ direction +'):\n' +
        pwm_value1 +
        '   motor_A1.duty_u16(0 * 650)\n' +
        '   motor_A2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_B1.duty_u16(0 * 650)\n' +
        '   motor_B2.duty_u16(0 * 650)\n\n' +
        '   motor_C1.duty_u16(0 * 650)\n' +
        '   motor_C2.duty_u16(0 * 650)\n\n' +
        '   motor_D1.duty_u16(0 * 650)\n' +
        '   motor_D2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   return\n\n';
    }
    
    else if (direction == "forward_left") {
        Blockly.Arduino.definitions_['define_appMotors_forward_left_omni'] =
        'def ' + direction + '_omni (speed_'+ direction +'):\n' +
        pwm_value1 +
        '   motor_A1.duty_u16(0 * 650)\n' +
        '   motor_A2.duty_u16(0 * 650)\n\n' +
        '   motor_B1.duty_u16(0 * 650)\n' +
        '   motor_B2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_C1.duty_u16(0 * 650)\n' +
        '   motor_C2.duty_u16(speed_'+ direction +' * 650)\n\n' +
        '   motor_D1.duty_u16(0 * 650)\n' +
        '   motor_D2.duty_u16(0 * 650)\n\n' +
        '   return\n\n';
    }
    else if (direction == "backward_right") {
        Blockly.Arduino.definitions_['define_appMotors_backward_right_omni'] =
        'def ' + direction + '_omni (speed_'+ direction +'):\n' +
        pwm_value1 +
        '   motor_A1.duty_u16(0 * 650)\n' +
        '   motor_A2.duty_u16(0 * 650)\n\n' +
        '   motor_B1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_B2.duty_u16(0 * 650)\n\n' +
        '   motor_C1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_C2.duty_u16(0 * 650)\n\n' +
        '   motor_D1.duty_u16(0 * 650)\n' +
        '   motor_D2.duty_u16(0 * 650)\n\n' +
        '   return\n\n';
    }
    else if (direction == "backward_left") {
        Blockly.Arduino.definitions_['define_appMotors_backward_left_omni'] =
        'def ' + direction + '_omni (speed_'+ direction +'):\n' +
        pwm_value1 +
        '   motor_A1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_A2.duty_u16(0 * 650)\n\n' +
        '   motor_B1.duty_u16(0 * 650)\n' +
        '   motor_B2.duty_u16(0 * 650)\n\n' +
        '   motor_C1.duty_u16(0 * 650)\n' +
        '   motor_C2.duty_u16(0 * 650)\n\n' +
        '   motor_D1.duty_u16(speed_'+ direction +' * 650)\n' +
        '   motor_D2.duty_u16(0 * 650)\n\n' +
        '   return\n\n';
    }

    code = direction + '_omni(' + speed + ')\n';

    return code;
};



Blockly.Arduino['dabbleDefinition'] = function(block) {
    var code = '';
    var branchCode = Blockly.Arduino.statementToCode(block, 'DO') ||
    Blockly.Arduino.PASS;

    Blockly.Arduino.imports_['import_REXbluetooth'] = 'from rex import BLESimplePeripheral, Servo';
    Blockly.Arduino.imports_['import_bluetooth'] = 'import bluetooth';
  
    Blockly.Arduino.definitions_['define_bluetooth'] = 'ble = bluetooth.BLE()\n';
    Blockly.Arduino.definitions_['define_REXbluetooth'] = 'sp = BLESimplePeripheral(ble)\n';
    Blockly.Arduino.definitions_['define_on_rx'] = '\ndef on_rx(data):\n' +
                                                   '    print("Data received: ", data)\n' +
                                                   branchCode + '\n';

    return code;
};



Blockly.Arduino['dabbleGiveCommand'] = function(block) {
    var code = '';
    var value = block.getFieldValue('VALUE');
  
    var code = "data == " + value ;

    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['dabbleRun'] = function(block) {  
    var code = '';

    code = 'sp.on_write(on_rx)\n';
    
    return code;
};

Blockly.Arduino['dabbleIsConnected'] = function (block) {
    var code = '';

    code = 'sp.is_connected()';

    return [code, Blockly.Arduino.ORDER_NONE];
}



Blockly.Arduino['ASCIItoInput'] = function(block) {
    var code = "";
    var value =  Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);

    code = 'chr('+ value +')';

    return [code, Blockly.Arduino.ORDER_NONE];
}

Blockly.Arduino['inputToASCII'] = function(block) {
    var code = "";
    var value =  Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);

    code = "[ord(text) for text in "+ value +"]";

    return [code, Blockly.Arduino.ORDER_NONE];
}

Blockly.Arduino['appendList'] = function(block) {
    var value =  Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);
    var list =  Blockly.Arduino.valueToCode(block, 'LIST', Blockly.Arduino.ORDER_NONE);
    var code = "";

    code =  list + '.append(' + value + ')\n';

    return code;
};

Blockly.Arduino['popList'] = function(block) {
    var value =  Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);
    var list =  Blockly.Arduino.valueToCode(block, 'LIST', Blockly.Arduino.ORDER_NONE);
    var code = "";

    code =  list + '.pop(' + value + ')\n';

    return code;
};

Blockly.Arduino['sortList'] = function(block) {
    
    var value = block.getFieldValue('VALUE');
    var list =  Blockly.Arduino.valueToCode(block, 'LIST', Blockly.Arduino.ORDER_NONE);
    var code = "";

    code =  list + '.sort(' + value + ')\n';

    return code;
};

Blockly.Arduino['insertList'] = function(block) {
    var index =  Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_NONE);
    var value =  Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);
    var list =  Blockly.Arduino.valueToCode(block, 'LIST', Blockly.Arduino.ORDER_NONE);
    var code = "";

    code =  list + '.insert(' + index + ',' + value + ')\n';

    return code;
};


Blockly.Arduino['globalVariables'] = function(block) {

    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
      elements[i] = Blockly.Arduino.valueToCode(block, 'ADD' + i,
          Blockly.Arduino.ORDER_NONE) || 'None';
    }
    var code = 'global ' + elements.join(', ') ;
    var codeLast = code + "\n";
    return codeLast;
  };