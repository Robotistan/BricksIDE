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
 * @fileoverview Generating JavaScript for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.JavaScript.logic');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['controls_if'] = function(block) {

  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
        block);
  }
  do {
    conditionCode = Blockly.JavaScript.valueToCode(block, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
    branchCode = Blockly.JavaScript.statementToCode(block, 'DO' + n);
    if (Blockly.JavaScript.STATEMENT_SUFFIX) {
      branchCode = Blockly.JavaScript.prefixLines(
          Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
          block), Blockly.JavaScript.INDENT) + branchCode;
    }

    //branchCode = replaceAll(branchCode, "d-d", "");
    branchCode = replaceAll(branchCode, "$-$", "");

    code += (n > 0 ? ' \nelse ' : '') +
        '   if (' + conditionCode + ')\n' + 
        '   {loopstep();\n' + branchCode + '\n' +
        '   }\n';
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.JavaScript.STATEMENT_SUFFIX) {
    branchCode = Blockly.JavaScript.statementToCode(block, 'ELSE');
    if (Blockly.JavaScript.STATEMENT_SUFFIX) {
      branchCode = Blockly.JavaScript.prefixLines(
          Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
          block), Blockly.JavaScript.INDENT) + branchCode;
    }

    //branchCode = replaceAll(branchCode, "d-d", "");
    branchCode = replaceAll(branchCode, "$-$", "");

    code += '   else\n' + 
            '   {loopend();\n' + branchCode +
            '   }\n';
  }
  else
  {
    code += '   else\n' + 
            '   {loopend();' + '\n' +
            '   }\n';
    
  }

  return code + '\n';
};

Blockly.JavaScript['controls_ifelse'] = Blockly.JavaScript['controls_if'];

Blockly.JavaScript['logic_compare'] = function(block) {
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
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript['logic_compare_boolean'] = function(block) {
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
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
      Blockly.JavaScript.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
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

Blockly.JavaScript['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.JavaScript.valueToCode(block, 'IF',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.JavaScript.valueToCode(block, 'THEN',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.JavaScript.valueToCode(block, 'ELSE',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.JavaScript.ORDER_CONDITIONAL];
};

   Blockly.JavaScript['go_left'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "moveleft();";

    return code;
  };

  Blockly.JavaScript['go_right'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "moveright();";

    return code;
  };
  
  Blockly.JavaScript['go_up'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "moveup();";

    return code;
  };

  Blockly.JavaScript['go_down'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "movedown();";

    return code;
  };

  Blockly.JavaScript['turn_right'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "turnright();";

    return code;
  };

  Blockly.JavaScript['turn_left'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "turnleft();";

    return code;
  };

  Blockly.JavaScript['walk'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "walk();";

    return code;
  };

  Blockly.JavaScript['smash_stone'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "smashstone();";

    return code;
  };

  Blockly.JavaScript['collect_jewel'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "collectjewel();";

    return code;
  };

  Blockly.JavaScript['start'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "start();";

    return code;
  };

  Blockly.JavaScript['klavye_olay'] = function(block) {
    var dropdown_klavye = block.getFieldValue('klavye');
    var statements_klavye_basilinca = Blockly.JavaScript.statementToCode(block, 'klavye_basilinca');
    // TODO: Assemble JavaScript into code variable.
    var code = '';

    if(dropdown_klavye == "37")
    {
      code = 'document.addEventListener("keydown", function(event){if(event.keyCode == 37)' + statements_klavye_basilinca + '} );';
    }

    if(dropdown_klavye == "38")
    {
      code = 'document.addEventListener("keydown", function(event){if(event.keyCode == 38)' + statements_klavye_basilinca + '} );';
    }

    if(dropdown_klavye == "39")
    {
      code = 'document.addEventListener("keydown", function(event){if(event.keyCode == 39)' + statements_klavye_basilinca + '} );';
    }

    if(dropdown_klavye == "40")
    {
      code = 'document.addEventListener("keydown", function(event){if(event.keyCode == 40)' + statements_klavye_basilinca + '} );';
    }
    return code;
  };

  Blockly.JavaScript['for_dongusu'] = function(block) {
    // Repeat n times.
    if (block.getField('TIMES')) {
      // Internal number.
      var repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
      // External number.
      var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
          Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    }
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    var code = '';
    var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
        'count', Blockly.Variables.NAME_TYPE);
    var endVar = repeats;
    if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
      var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
          'repeat_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + repeats + ';\n';
    }
    code += 'for (var ' + loopVar + ' = 0; ' +
        loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {' 
        + branch + '}' + '\n'  
    return code;
  };

