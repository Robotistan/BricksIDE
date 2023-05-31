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

Blockly.JavaScript['Robotistan_Start'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
    var code = "";
  
    code = "PicoBricksStart();\n";

    return code;
}

Blockly.JavaScript['writeTextScreen'] = function(block) {

    var writeValue =  Blockly.JavaScript.valueToCode(block, 'WriteValue', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var xPos =  Blockly.JavaScript.valueToCode(block, 'XPos', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var yPos =  Blockly.JavaScript.valueToCode(block, 'YPos', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

    var code = "";
    code = 'writeTextScreen(' + xPos + ', ' + yPos + ', ' + writeValue + ');\n';

    return code;
};

Blockly.JavaScript['showScreen'] = function(block) {
    var code = 'showScreen();\n';

    return code;
};

Blockly.JavaScript['clearScreen'] = function(block) {
    var code = 'clearScreen();\n';

    return code;
};

Blockly.JavaScript['print'] = function(block) {

    var writeValue =  Blockly.JavaScript.valueToCode(block, 'WriteValue', Blockly.JavaScript.ORDER_ASSIGNMENT);

    var code = "";
    code = '\n';

    return code;
};

Blockly.JavaScript['setDigitalPinValue'] = function(block) {

    var pin =  Blockly.JavaScript.valueToCode(block, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var value = block.getFieldValue('VALUE');

    var code = '';
    code = '';

    return code;
};

Blockly.JavaScript['readDigitalPinValue'] = function(block) {
 
    var pin =  Blockly.JavaScript.valueToCode(block, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var code = '';

    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['setAnalogPinValue'] = function(block) {

    var pin =  block.getFieldValue('PIN');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

    var code = '';

    code = '';

    return code;
};

Blockly.JavaScript['readAnalogPinValue'] = function(block) {
 
    var pin =  block.getFieldValue('PIN');
    var code = '';

    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['setLedValue'] = function(block) {

    var value = block.getFieldValue('VALUE');
  
    var code = "";
    var pin = LedPin;

    code = "setLedValue(" + value + ");\n";

    return code;
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

    var code = "";
    var pin = BuzzerPin;

    code = 'soundBuzzer(' + frequency + ');\n';

    return code;
};

Blockly.JavaScript['buzzerInterval'] = function(block) {

    var noteTime = block.getFieldValue('INTERVAL');
    var code = "";
    var interval = 0;

    code = 'buzzerInterval(' + noteTime + ');\n';

    return code;
};

Blockly.JavaScript['readPotentiometer'] = function(block) {
 
    var pin = PotentiometerPin;

    var code = 'readPotentiometer()';
    return [code, Blockly.JavaScript.ORDER_NONE];

};

Blockly.JavaScript['readIR'] = function(block) {
 
    var pin = ButtonPin;

    var code = "readIR()";
    return [code, Blockly.JavaScript.ORDER_NONE];
};  

Blockly.JavaScript['readLightSersor'] = function(block) {
 
    var pin = LightSersorPin;

    var code = 'readLightSersor()';
    return [code, Blockly.JavaScript.ORDER_NONE];

};

Blockly.JavaScript['readTemperature'] = function(block) {
 
    var pin = TemperaturePin;

    var code = 'readTemperature()';
    return [code, Blockly.JavaScript.ORDER_NONE];

};

Blockly.JavaScript['readHumidity'] = function(block) {
 
    var pin = HumidityPin;

    var code = "readHumidity()";
    return [code, Blockly.JavaScript.ORDER_NONE];

};

Blockly.JavaScript['servoMotor'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var angle =  Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var code = "";
    var pin = 0;

    if(motor == "1")
        pin = ServoPin1;
    else
        pin = ServoPin2;

    if(motor == "1")
        code = 'setServo1Value();\n';
    else
        code = 'setServo2Value();\n';

    return code;
};

Blockly.JavaScript['dcMotor'] = function(block) {

    var motor = block.getFieldValue('MOTOR');
    var speed =  Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

    var code = "";
    var pin = 0;

    if(motor == "1")
        pin = MotorPin1;
    else
        pin = MotorPin2;

    if(motor == "1")
        code = 'setMotor1Value(' + speed + ');\n';
    else
        code = 'setMotor2Value(' + speed + ');\n';

    return code;
};

Blockly.JavaScript['neoPixelColour'] = function(block) {

    var colourValue = Blockly.JavaScript.valueToCode(block, 'ColourValue', Blockly.JavaScript.ORDER_ATOMIC);
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

    code = 'neoPixelColour(' + colourValue + ');\n';

    return code;
};

Blockly.JavaScript['neoPixelColourRGB'] = function(block) {

    var code = "";
    var pin = NeoPixelPin;

    var red = Blockly.JavaScript.valueToCode(block, 'RED', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var green =  Blockly.JavaScript.valueToCode(block, 'GREEN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var blue = Blockly.JavaScript.valueToCode(block, 'BLUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

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

    return code;
};

Blockly.JavaScript['neoPixelClear'] = function(block) {

    var code = "";
    var pin = NeoPixelPin;

    code = 'neoPixelClear();\n';

    return code;
}