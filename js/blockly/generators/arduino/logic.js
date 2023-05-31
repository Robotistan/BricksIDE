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
 * @fileoverview Generating Arduino for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Arduino.logic');

goog.require('Blockly.Arduino');


Blockly.Arduino['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_PREFIX, block);
  }
  do {
    conditionCode = Blockly.Arduino.valueToCode(block, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'False';
    branchCode = Blockly.Arduino.statementToCode(block, 'DO' + n) ||
        Blockly.Arduino.PASS;
    if (Blockly.Arduino.STATEMENT_SUFFIX) {
      branchCode = Blockly.Arduino.prefixLines(
          Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX, block),
          Blockly.Arduino.INDENT) + branchCode;
    }
    code += (n == 0 ? 'if ' : 'elif ' ) + conditionCode + ':\n' + branchCode;
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.Arduino.STATEMENT_SUFFIX) {
    branchCode = Blockly.Arduino.statementToCode(block, 'ELSE') ||
        Blockly.Arduino.PASS;
    if (Blockly.Arduino.STATEMENT_SUFFIX) {
      branchCode = Blockly.Arduino.prefixLines(
          Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX, block),
          Blockly.Arduino.INDENT) + branchCode;
    }
    code += 'else:\n' + branchCode;
  }
  return code;
};

Blockly.Arduino['controls_ifelse'] = Blockly.Arduino['controls_if'];

Blockly.Arduino['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.Arduino.ORDER_LOGICAL_AND :
      Blockly.Arduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order);
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'False';
    argument1 = 'False';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == 'and') ? 'True' : 'False';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL',
      Blockly.Arduino.ORDER_LOGICAL_NOT) || 'True';
  var code = 'not ' + argument0;
  return [code, Blockly.Arduino.ORDER_LOGICAL_NOT];
};

Blockly.Arduino['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['logic_null'] = function(block) {
  // Null data type.
  return ['None', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Arduino.valueToCode(block, 'IF',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'False';
  var value_then = Blockly.Arduino.valueToCode(block, 'THEN',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'None';
  var value_else = Blockly.Arduino.valueToCode(block, 'ELSE',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'None';
  var code = value_then + ' if ' + value_if + ' else ' + value_else;
  return [code, Blockly.Arduino.ORDER_CONDITIONAL];
};
