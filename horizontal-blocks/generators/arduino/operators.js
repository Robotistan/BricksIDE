/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Generating Arduino for math blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.operators');

goog.require('Blockly.Arduino');

Blockly.Arduino.operator_add = function() {
    var NUM1 =  Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var NUM2 =  Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    if(NUM1 == 'NaN') NUM1 = 0;
    if(NUM2 == 'NaN') NUM2 = 0;

    var code = "(".concat(NUM1, " + ").concat(NUM2, ")");
    
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_subtract = function() {
    var NUM1 =  Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var NUM2 =  Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    
    if(NUM1 == 'NaN') NUM1 = 0;
    if(NUM2 == 'NaN') NUM2 = 0;

    var code =  "(".concat(NUM1, " - ").concat(NUM2, ")");
  
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_multiply = function() {
    var NUM1 =  Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
    var NUM2 =  Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;

    if(NUM1 == 'NaN') NUM1 = 0;
    if(NUM2 == 'NaN') NUM2 = 0;

    var code =  "(".concat(NUM1, " * ").concat(NUM2, ")");
       
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_divide = function() {
    var NUM1 =  Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var NUM2 =  Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    if(NUM1 == 'NaN') NUM1 = 0;
    if(NUM2 == 'NaN') NUM2 = 0;

    var code =  "(".concat(NUM1, " / ").concat(NUM2, ")");

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_random = function() {
    var FROM =  Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var TO =  Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    if(FROM == 'NaN') FROM = 0;
    if(TO == 'NaN') TO = 0;

    var code = "";

    if(editorType == "CPP")
    {
        code = "random(".concat(FROM, ", ").concat(TO, ");");
    }
    else if(editorType == "Simulator")
    {
        code = "Math.random(".concat(FROM, ", ").concat(TO, ")");
    }
    else
    {
        Blockly.Arduino.imports_['import_random'] = "import random";
        code = "random.randint(".concat(FROM, ", ").concat(TO, ")");
    }

    var order = Blockly.Arduino.ORDER_ATOMIC;
    return [code, order];
}

Blockly.Arduino.operator_lt = function() {
    var OPERAND1 =  Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ASSIGNMENT);
    var OPERAND2 =  Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ASSIGNMENT);

    if(OPERAND1 == 'NaN') OPERAND1 = 0;
    if(OPERAND2 == 'NaN') OPERAND2 = 0;

    var code =  "(".concat(OPERAND1, " < ").concat(OPERAND2, ")");
    
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_equals = function() {
    var OPERAND1 =  Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ASSIGNMENT);
    var OPERAND2 =  Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ASSIGNMENT);

    if(OPERAND1 == 'NaN') OPERAND1 = 0;
    if(OPERAND2 == 'NaN') OPERAND2 = 0;

    var code =  "(".concat(OPERAND1, " == ").concat(OPERAND2, ")");
    
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_gt = function() {
    var OPERAND1 =  Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ASSIGNMENT);
    var OPERAND2 =  Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ASSIGNMENT);

    if(OPERAND1 == 'NaN') OPERAND1 = 0;
    if(OPERAND2 == 'NaN') OPERAND2 = 0;

    var code =  "(".concat(OPERAND1, " > ").concat(OPERAND2, ")");
    
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_and = function() {
    var OPERAND1 =  Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ASSIGNMENT);
    var OPERAND2 =  Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ASSIGNMENT);

    if(editorType == "CPP")
    {
        if(OPERAND1 == 'NaN') OPERAND1 = false;
        if(OPERAND2 == 'NaN') OPERAND2 = false;
    }
    else if(editorType == "Simulator")
    {
        if(OPERAND1 == 'NaN') OPERAND1 = false;
        if(OPERAND2 == 'NaN') OPERAND2 = false;
    }
    else
    {
        if(OPERAND1 == 'NaN') OPERAND1 = "False";
        if(OPERAND2 == 'NaN') OPERAND2 = "False";
    }

    var code = "";

    if(editorType == "CPP")
        code =  "(".concat(OPERAND1, ") && (").concat(OPERAND2, ")");
    else if(editorType == "Simulator")
        code =  "(".concat(OPERAND1, ") && (").concat(OPERAND2, ")");
    else
        code =  "(".concat(OPERAND1, ") and (").concat(OPERAND2, ")");

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}


Blockly.Arduino.operator_or = function() {
    var OPERAND1 =  Blockly.Arduino.valueToCode(this, 'OPERAND1', Blockly.Arduino.ORDER_ASSIGNMENT);
    var OPERAND2 =  Blockly.Arduino.valueToCode(this, 'OPERAND2', Blockly.Arduino.ORDER_ASSIGNMENT);

    if(editorType == "CPP")
    {
        if(OPERAND1 == 'NaN') OPERAND1 = false;
        if(OPERAND2 == 'NaN') OPERAND2 = false;
    }
    else if(editorType == "Simulator")
    {
        if(OPERAND1 == 'NaN') OPERAND1 = false;
        if(OPERAND2 == 'NaN') OPERAND2 = false;
    }
    else
    {
        if(OPERAND1 == 'NaN') OPERAND1 = "False";
        if(OPERAND2 == 'NaN') OPERAND2 = "False";
    }

    var code = "";

    if(editorType == "CPP")
        code =  "(".concat(OPERAND1, ") || (").concat(OPERAND2, ")");
    else if(editorType == "Simulator")
        code =  "(".concat(OPERAND1, ") || (").concat(OPERAND2, ")");
    else
        code =  "(".concat(OPERAND1, ") or (").concat(OPERAND2, ")");

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_not = function() {
    var OPERAND =  Blockly.Arduino.valueToCode(this, 'OPERAND', Blockly.Arduino.ORDER_ASSIGNMENT);

    if(editorType == "CPP")
        if(OPERAND == 'NaN') OPERAND1 = false;
    if(editorType == "Simulator")
        if(OPERAND == 'NaN') OPERAND1 = false;
    else
        if(OPERAND == 'NaN') OPERAND1 = "False";

    var code = "";

    if(editorType == "CPP")
        code = "!(" + OPERAND + ")";
    else if(editorType == "Simulator")
        code = "!(" + OPERAND + ")";
    else
        code = "not(" + OPERAND + ")";

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_join = function() {
    var STRING1 =  Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_ASSIGNMENT) || "";
    var STRING2 =  Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_ASSIGNMENT) || "";

    if(STRING1 == 'NaN') STRING1 = "";
    if(STRING2 == 'NaN') STRING2 = "";

    var code = "";

    if(editorType == "CPP")
      code = "String(".concat(STRING1, ") + String(").concat(STRING2, ")");
    if(editorType == "Simulator")
      code = "".concat(STRING1, " + ").concat(STRING2, "");
    else
      code = "str(".concat(STRING1, ") + str(").concat(STRING2, ")");

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_letter_of = function() {
    var LETTER =  Blockly.Arduino.valueToCode(this, 'LETTER', Blockly.Arduino.ORDER_ASSIGNMENT) || "";
    var STRING =  Blockly.Arduino.valueToCode(this, 'STRING', Blockly.Arduino.ORDER_ASSIGNMENT) || "";

    if(LETTER == 'NaN') LETTER = "";
    if(STRING == 'NaN') STRING = "";

    var code = "";

    if(editorType == "CPP")
      code = "String(".concat(STRING, ").charAt(").concat(LETTER, " - 1)");
    if(editorType == "Simulator")
      code = "".concat(STRING, ".charAt(").concat(LETTER, " - 1)");
    else
      code = "str(".concat(STRING, ")[").concat(LETTER, " - 1]");  

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_length = function() {
    var STRING =  Blockly.Arduino.valueToCode(this, 'STRING', Blockly.Arduino.ORDER_ASSIGNMENT) || "";

    if(STRING == 'NaN') STRING = "";

    var code = "";

    if(editorType == "CPP")
      code = "String(".concat(STRING, ").length()");
    if(editorType == "Simulator")
      code = "".concat(STRING, ".length");
    else
      code = "len(str(".concat(STRING, "))");

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//operator_contains

Blockly.Arduino.operator_contains = function() {
    var STRING1 =  Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_ASSIGNMENT) || "";
    var STRING2 =  Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_ASSIGNMENT) || "";

    if(STRING1 == 'NaN') STRING1 = "";
    if(STRING2 == 'NaN') STRING2 = "";

    var code = "";

    if(editorType == "CPP")
      code = "(".concat(STRING1, ".indexOf(").concat(STRING2, ") >= 0");
   if(editorType == "Simulator")
      code = "(".concat(STRING1, ".indexOf(").concat(STRING2, ") >= 0)");
    else
      code = "(str(".concat(STRING1, ").index(").concat(STRING2, ") >= 0)");  

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//operator_mod

Blockly.Arduino.operator_mod = function() {
    var NUM1 =  Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var NUM2 =  Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    if(NUM1 == 'NaN') NUM1 = 0;
    if(NUM2 == 'NaN') NUM2 = 0;

    var code = "(".concat(NUM1, " % ").concat(NUM2, ")");
    
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.operator_round = function() {
    var NUM =  Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    if(NUM == 'NaN') NUM = 0;

    var code = "round(".concat(NUM, ")");
    
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}