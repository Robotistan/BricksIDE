/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Generating Arduino for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Arduino.loops');

goog.require('Blockly.Arduino');

/*
Blockly.Arduino['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.Arduino.valueToCode(block, 'TIMES',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block);
  var code = '';
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.Arduino.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
  }

  code += 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.Arduino['controls_repeat'] =
    Blockly.Arduino['controls_repeat_ext'];

Blockly.Arduino['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL',
      until ? Blockly.Arduino.ORDER_LOGICAL_NOT :
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Arduino['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.Arduino.variableDB_.getName(
      block.getField('VAR').getText(), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.Arduino.valueToCode(block, 'BY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block);
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      startVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.Arduino.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.Arduino.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + '; ' +
        incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + '; ' +
        variable0 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.Arduino['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Arduino.variableDB_.getName(
      block.getField('VAR').getText(), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(block, 'LIST',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block);
  var code = '';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  var listVar = argument0;
  if (!argument0.match(/^\w+$/)) {
    listVar = Blockly.Arduino.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.Variables.NAME_TYPE);
    code += 'var ' + listVar + ' = ' + argument0 + ';\n';
  }
  var indexVar = Blockly.Arduino.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  branch = Blockly.Arduino.INDENT + variable0 + ' = ' +
      listVar + '[' + indexVar + '];\n' + branch;
  code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Arduino['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  var xfix = '';
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    xfix += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_PREFIX,
        block);
  }
  if (Blockly.Arduino.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the break/continue is triggered.
    xfix += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX,
        block);
  }
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    var loop = Blockly.Constants.Loops
        .CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(block);
    if (loop && !loop.suppressPrefixSuffix) {
      // Inject loop's statement prefix here since the regular one at the end
      // of the loop will not get executed if 'continue' is triggered.
      // In the case of 'break', a prefix is needed due to the loop's suffix.
      xfix += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_PREFIX,
          loop);
    }
  }
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return xfix + 'break;\n';
    case 'CONTINUE':
      return xfix + 'continue;\n';
  }
  throw Error('Unknown flow statement.');
};
*/
// PicoBricks

Blockly.Arduino['control_wait'] = function(block) {
  // TODO: Assemble Arduino into code variable.
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  
  var code = "";
  
  Blockly.Arduino.imports_['import_time'] = "import time";
  code = "time.sleep(" + duration +  ")\n";


  return code;
};

Blockly.Arduino['control_forever'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(block, 'DO') ;
    branch = Blockly.Arduino.addLoopTrap(branch, block);

    var code = "while True:\n" +
    branch + '\n';
    return code;
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

  var branch = Blockly.Arduino.statementToCode(block, 'DO') || Blockly.Arduino.PASS;
  branch = Blockly.Arduino.addLoopTrap(branch, block);

  var code = '';
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);

  if(repeats.indexOf(",") > 0)
  { 
      repeats = repeats.replace("(",  "");
      repeats = repeats.replace(")", "");

      code = "for count in range(" + repeats + "):\n" +
      branch + '\n' + 
      '\n';   
  }
  else
  {
      var endVar = repeats;
           
      code = "for count in range(" + endVar + "):\n" +
      branch + '\n' + 
      '\n';   
  }
  return code;
};

Blockly.Arduino['range1'] = function(block) {
  // TODO: Assemble Arduino into code variable.
  var start = Blockly.Arduino.valueToCode(block, 'START', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var stop = Blockly.Arduino.valueToCode(block, 'STOP', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

  var code = "";
  code = start + ", " + stop;

  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['range2'] = function(block) {
  // TODO: Assemble Arduino into code variable.
  var start = Blockly.Arduino.valueToCode(block, 'START', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var stop = Blockly.Arduino.valueToCode(block, 'STOP', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var step = Blockly.Arduino.valueToCode(block, 'STEP', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  
  var code = "";
  code = start + ", " + stop + ", " + step;

  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['for_loop'] = function(block) {
    // For loop.
    var variable0 = Blockly.Arduino.valueToCode(block, 'VAR',  Blockly.Arduino.ORDER_ASSIGNMENT);
    
    var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
        Blockly.Arduino.ORDER_NONE) || '0';
    var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
        Blockly.Arduino.ORDER_NONE) || '0';
    var increment = Blockly.Arduino.valueToCode(block, 'BY',
        Blockly.Arduino.ORDER_NONE) || '1';
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    branch = Blockly.Arduino.addLoopTrap(branch, block) || Blockly.Arduino.PASS;

    var code = '';
    var range;

    // Helper functions.
    var defineUpRange = function() {
      return Blockly.Arduino.provideFunction_(
          'upRange',
          ['def ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(start, stop, step):',
           '  while start <= stop:',
           '    yield start',
           '    start += abs(step)']);
    };
    var defineDownRange = function() {
      return Blockly.Arduino.provideFunction_(
          'downRange',
          ['def ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(start, stop, step):',
           '  while start >= stop:',
           '    yield start',
           '    start -= abs(step)']);
    };
    // Arguments are legal Arduino code (numbers or strings returned by scrub()).
    var generateUpDownRange = function(start, end, inc) {
      return '(' + start + ' <= ' + end + ') and ' +
          defineUpRange() + '(' + start + ', ' + end + ', ' + inc + ') or ' +
          defineDownRange() + '(' + start + ', ' + end + ', ' + inc + ')';
    };

    if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
        Blockly.isNumber(increment)) {
      // All parameters are simple numbers.
      argument0 = parseFloat(argument0);
      argument1 = parseFloat(argument1);
      increment = Math.abs(parseFloat(increment));
      if (argument0 % 1 === 0 && argument1 % 1 === 0 && increment % 1 === 0) {
        // All parameters are integers.
        if (argument0 <= argument1) {
          // Count up.
          argument1++;
          if (argument0 == 0 && increment == 1) {
            // If starting index is 0, omit it.
            range = argument1;
          } else {
            range = argument0 + ', ' + argument1;
          }
          // If increment isn't 1, it must be explicit.
          if (increment != 1) {
            range += ', ' + increment;
          }
        } else {
          // Count down.
          argument1--;
          range = argument0 + ', ' + argument1 + ', -' + increment;
        }
        range = 'range(' + range + ')';
      } else {
        // At least one of the parameters is not an integer.
        if (argument0 < argument1) {
          range = defineUpRange();
        } else {
          range = defineDownRange();
        }
        range += '(' + argument0 + ', ' + argument1 + ', ' + increment + ')';
      }
    } else {
      // Cache non-trivial values to variables to prevent repeated look-ups.
      var scrub = function(arg, suffix) {
        if (Blockly.isNumber(arg)) {
          // Simple number.
          arg = parseFloat(arg);
        } else if (arg.match(/^\w+$/)) {
          // Variable.
          arg = 'float(' + arg + ')';
        } else {
          // It's complicated.
          var varName = Blockly.Arduino.variableDB_.getDistinctName(
              variable0 + suffix, Blockly.Variables.NAME_TYPE);
          code += varName + ' = float(' + arg + ')\n';
          arg = varName;
        }
        return arg;
      };
      var startVar = scrub(argument0, '_start');
      var endVar = scrub(argument1, '_end');
      var incVar = scrub(increment, '_inc');

      if (typeof startVar == 'number' && typeof endVar == 'number') {
        if (startVar < endVar) {
          range = defineUpRange(startVar, endVar, increment);
        } else {
          range = defineDownRange(startVar, endVar, increment);
        }
      } else {
        // We cannot determine direction statically.
        range = generateUpDownRange(startVar, endVar, increment);
      }
    }
    code += 'for ' + variable0 + ' in ' + range + ':\n' + branch;
    return code;

};

Blockly.Arduino['for_loop2'] = function(block) {
  var variable0 = Blockly.Arduino.valueToCode(block, 'VAR',  Blockly.Arduino.ORDER_ASSIGNMENT);
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.Arduino.valueToCode(block, 'TIMES', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  }

  var branch = Blockly.Arduino.statementToCode(block, 'DO') || Blockly.Arduino.PASS;
  branch = Blockly.Arduino.addLoopTrap(branch, block);

  var code = '';
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);

  if(repeats.indexOf(",") > 0)
  { 
      repeats = repeats.replace("(",  "");
      repeats = repeats.replace(")", "");

      code = "for " + variable0 + " in range(" + repeats + "):\n" +
      branch + '\n' + 
      '\n';   
  }
  else
  {
      var endVar = repeats;
           
      code = "for " + variable0 + " in range(" + endVar + "):\n" +
      branch + '\n' + 
      '\n';   
  }
  return code;
};

Blockly.Arduino['while_loop'] = function(block) {
  // Repeat n times.
    var conditionCode = Blockly.Arduino.valueToCode(block, 'WHILE', Blockly.Arduino.ORDER_NONE) || 'False';
    var branchCode = Blockly.Arduino.statementToCode(block, 'DO') ||
        Blockly.Arduino.PASS;

    var code = "while " + conditionCode + ":\n" +
    branchCode + '\n';
    return code;
};

Blockly.Arduino['break'] = function(block) {
  // TODO: Assemble Arduino into code variable.
  
  var code = "break\n";
  return code;
};