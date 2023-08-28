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
 * @fileoverview Generating Arduino for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Arduino.procedures');

goog.require('Blockly.Arduino');


Blockly.Arduino['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  // First, add a 'global' statement for every variable that is not shadowed by
  // a local parameter.
  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    if (block.arguments_.indexOf(varName) == -1) {
      globals.push(Blockly.Arduino.variableDB_.getName(varName,
          Blockly.Variables.NAME_TYPE));
    }
  }
  // Add developer variables.
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    globals.push(Blockly.Arduino.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  globals = globals.length ?
      Blockly.Arduino.INDENT + 'global ' + globals.join(', ') + '\n' : '';
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var xfix1 = '';
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    xfix1 += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_PREFIX, block);
  }
  if (Blockly.Arduino.STATEMENT_SUFFIX) {
    xfix1 += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX, block);
  }
  if (xfix1) {
    xfix1 = Blockly.Arduino.prefixLines(xfix1, Blockly.Arduino.INDENT);
  }
  var loopTrap = '';
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.Arduino.prefixLines(
        Blockly.Arduino.injectId(Blockly.Arduino.INFINITE_LOOP_TRAP, block),
        Blockly.Arduino.INDENT);
  }
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN',
      Blockly.Arduino.ORDER_NONE) || '';
  var xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Blockly.Arduino.INDENT + 'return ' + returnValue + '\n';
  } else if (!branch) {
    branch = Blockly.Arduino.PASS;
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Arduino.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = '\n' + 'def ' + funcName + '(' + args.join(', ') + '):\n' +
      globals + xfix1 + loopTrap + branch + xfix2 + returnValue;
  code = Blockly.Arduino.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Arduino.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Arduino['procedures_defnoreturn'] =
    Blockly.Arduino['procedures_defreturn'];

Blockly.Arduino['procedures_callreturn'] = function(block) {

  // Call a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Arduino.valueToCode(block, 'ARG' + i,
        Blockly.Arduino.ORDER_NONE) || 'None';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  // Generated code is for a function call as a statement is the same as a
  // function call as a value, with the addition of line ending.
  var tuple = Blockly.Arduino['procedures_callreturn'](block);
  return tuple[0] + '\n';
};

Blockly.Arduino['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'False';
  var code = 'if ' + condition + ':\n';
  if (Blockly.Arduino.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the return is triggered.
    code += Blockly.Arduino.prefixLines(
        Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX, block),
        Blockly.Arduino.INDENT);
  }
  if (block.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || 'None';
    code += Blockly.Arduino.INDENT + 'return ' + value + '\n';
  } else {
    code += Blockly.Arduino.INDENT + 'return\n';
  }
  return code;
};
