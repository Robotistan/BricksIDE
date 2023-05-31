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
 * @fileoverview Generating Arduino for control blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.loops');

goog.require('Blockly.Arduino');

Blockly.Arduino.controls_for = function() {
  // For loop.
  var variable0 = Blockly.Arduino.variableDB_.getName(
      this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
      argument1.match(/^-?\d+(\.\d+)?$/)) {
    // Both arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0 + (up ? '++' : '--') + ') {\n' +
        branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
      var startVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'int ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
      var endVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'int ' + endVar + ' = ' + argument1 + ';\n';
    }
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '    (' + startVar + ' <= ' + endVar + ') ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '    ' + variable0 + ' += (' + startVar + ' <= ' + endVar +
            ') ? 1 : -1) {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.Arduino.controls_whileUntil = function() {
  // Do while/until loop.
  var until = this.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL',
      until ? Blockly.Arduino.ORDER_LOGICAL_NOT :
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
}

Blockly.Arduino['control_wait'] = function(block) {
  // TODO: Assemble Arduino into code variable.
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  
  var code = "";
  
  if(editorType == "CPP")
  {
    code = "delay(" + duration + " * 1000);\n";
  }
  else if(editorType == "Simulator")
  {
    code = "delaySecond(" + duration + ");\n";
  }
  else
  {
    Blockly.Arduino.imports_['import_time'] = "import time";
    code = "time.sleep(" + duration +  ")\n";
  }

  return code;
};


Blockly.Arduino['control_forever'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block);

    if(editorType == "Simulator")
    {
      var code = 'while(isProgramRunning() == true) {' +
      'loopstep();' +
        branch + 
      '}'+ 
      'loopend();';  
    
      return code;
    }
    else
    {
        var code = "while True:\n" +
        branch + '\n';
        return code;
    }
}

Blockly.Arduino['control_repeat'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.Arduino.valueToCode(block, 'TIMES', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  }

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block);

  var code = '';
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);

  if(repeats.indexOf(",") > 0)
  {
      if(editorType == "CPP")
      {
        code = '';
      }
      else if(editorType == "Simulator")
      {
        repeats = repeats.replace("(",  "");
        repeats = repeats.replace(")", "");
        var params = repeats.split(",")

        if(params.length == 2)
        {
          code = 
              '   ' + ' for (' + loopVar + ' = ' + params[0] + '; ' +
              '   ' + loopVar + ' < ' + params[1] + '; ' +
              '   ' + loopVar + '++) {\n' +
              '   ' + 'loopstep();\n' +
              '   ' + branch + 
              '  }\n' +
              '   ' + 'loopend();\n';
        }
        else if(params.length == 3)
        {
          if(params[2] < 0)
          {
            code = 
              '   ' + ' for (' + loopVar + ' = ' + params[0] + '; ' +
              '   ' + loopVar + ' < ' + params[1] + '; ' +
              '   ' + loopVar + ' = ' + loopVar + params[2] +') {\n' +
              '   ' + 'loopstep();\n' +
              '   ' + branch + 
              '  }\n' +
              '   ' + 'loopend();\n';
          }
          else
          {
            code = 
              '   ' + ' for (' + loopVar + ' = ' + params[0] + '; ' +
              '   ' + loopVar + ' < ' + params[1] + '; ' +
              '   ' + loopVar + ' = ' + loopVar + ' + ' +  params[2] +') {\n' +
              '   ' + 'loopstep();\n' +
              '   ' + branch + 
              '  }\n' +
              '   ' + 'loopend();\n';
          }
        }
      }
      else
      {   
        repeats = repeats.replace("(",  "");
        repeats = repeats.replace(")", "");

        code = "for count in range(" + repeats + "):\n" +
        branch + '\n' + 
        '\n';   
      }
  }
  else
  {
      var endVar = repeats;
     
      if(editorType == "CPP")
      {
        code = '';
      }
      else if(editorType == "Simulator")
      {
          code = 
              '   ' + ' for (' + loopVar + ' = 0; ' +
              '   ' + loopVar + ' < ' + endVar + '; ' +
              '   ' + loopVar + '++) {\n' +
              '   ' + 'loopstep();\n' +
              '   ' + branch + 
              '  }\n' +
              '   ' + 'loopend();\n';
      }
      else
      {
           code = "for count in range(" + endVar + "):\n" +
            branch + '\n' + 
            '\n';   
      }
  }
  return code;
};

Blockly.Arduino['range1'] = function(block) {
  // TODO: Assemble Arduino into code variable.
  var start = Blockly.Arduino.valueToCode(block, 'START', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var stop = Blockly.Arduino.valueToCode(block, 'STOP', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

  var code = "";
  
  if(editorType == "CPP")
  {
    //code = "delay(" + duration + " * 1000);\n";
  }
  else if(editorType == "Simulator")
  {
    code = start + ", " + stop;
  }
  else
  {
    code = start + ", " + stop;
  }

  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['range2'] = function(block) {
  // TODO: Assemble Arduino into code variable.
  var start = Blockly.Arduino.valueToCode(block, 'START', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var stop = Blockly.Arduino.valueToCode(block, 'STOP', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var step = Blockly.Arduino.valueToCode(block, 'STEP', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  
  var code = "";
  
  if(editorType == "CPP")
  {
    //code = "delay(" + duration + " * 1000);\n";
  }
  else if(editorType == "Simulator")
  {
    code = start + ", " + stop + ", " + step;
  }
  else
  {
    code = start + ", " + stop + ", " + step;
  }

  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = Blockly.Arduino.ORDER_ATOMIC;
              
  return [code, order];
};

Blockly.Arduino['math_whole_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.Arduino.ORDER_ATOMIC :
              Blockly.Arduino.ORDER_UNARY_NEGATION;
  return [code, order];
};


Blockly.Arduino['math_positive_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.Arduino.ORDER_ATOMIC :
              Blockly.Arduino.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.Arduino['text'] = function(block) {
  // Numeric value.
  var code = block.getFieldValue('TEXT');
  var order = Blockly.Arduino.ORDER_ATOMIC;
              
  return [code, order];
};