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
 * @fileoverview Helper functions for generating JavaScript blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.JavaScript.pinoo');

goog.require('Blockly.JavaScript');

var isLiveMode = false;

Blockly.JavaScript['setLedValue'] = function(block) {

    var value = Blockly.JavaScript.valueToCode(this, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "";
    var pin = LedPin;

    code = "setLedValue(" + value + ");\n";
    
    return code;
};

Blockly.JavaScript['ledStates'] = function(block) {

    var value = block.getFieldValue('VALUE');

    return [value, Blockly.JavaScript.ORDER_NONE]; 
};

Blockly.JavaScript['setRelayValue'] = function(block) {

    var value = block.getFieldValue('VALUE');

    var code = "";
    var pin = RelayPin;

    code = "setRelayValue(" + value + ");\n";

    return code;
};

Blockly.JavaScript['readButton'] = function(block) {
 
    var pin = ButtonPin;

    var code = "readButton1()";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['playBuzzer'] = function(block) {

    var frequency =  Blockly.JavaScript.valueToCode(block, 'FREQUENCY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var noteTime = "1";

    var code = "";
    var pin = BuzzerPin;
    var interval = 0;

    code = 'soundBuzzer(' + frequency + ',' + noteTime + ');\n';

    return code;
};

Blockly.JavaScript['servoMotor1'] = function(block) {
    var angle =  Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

    var code = "";
    var pin = ServoPin1;

    code = 'setServo1Value();\n';

    return code;
};

Blockly.JavaScript['servoMotor2'] = function(block) {
    var angle =  Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

    var code = "";
    var pin = ServoPin1;

    code = 'setServo2Value();\n';

    return code;
};

Blockly.JavaScript['motor1'] = function(block) {

    var direction = block.getFieldValue('MOTOR');
    var speed =  100;

    var code = "";
    var pin = pin = MotorPin1;

    code = 'setMotor1Value();\n';

    return code;
};

Blockly.JavaScript['motor1'] = function(block) {

    var direction = block.getFieldValue('MOTOR');
    var speed =  100;

    var code = "";
    var pin = pin = MotorPin1;

    code = 'setMotor2Value();\n';

    return code;
};