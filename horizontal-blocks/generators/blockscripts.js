Blockly.JavaScript['event_whenplayclicked'] = function(block) {
  // TODO: Assemble JavaScript into code variable.

  var code = "Start();\n";

  return code;
};


Blockly.JavaScript['control_wait'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var duration = Blockly.JavaScript.valueToCode(block, 'DURATION',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code = "Delay(" + duration + ");\n";

  return code;
};


Blockly.JavaScript['forwarddrive'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var duration = Blockly.JavaScript.valueToCode(block, 'DURATION',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code = "ForwardDrive(" + duration + ");\n";

  return code;
};

Blockly.JavaScript['backwarddrive'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var duration = Blockly.JavaScript.valueToCode(block, 'DURATION',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code = "BackwardDrive(" + duration + ");\n";

  return code;
};


Blockly.JavaScript['leftdrive'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var duration = Blockly.JavaScript.valueToCode(block, 'DURATION',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code = "LeftDrive(" + duration + ");\n";

  return code;
};


Blockly.JavaScript['rightdrive'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var duration = Blockly.JavaScript.valueToCode(block, 'DURATION',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code = "RightDrive(" + duration + ");\n";

  return code;
};


Blockly.JavaScript['stopdrive'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "StopDrive();\n";

  return code;
};



Blockly.JavaScript['control_repeat'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
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
      loopVar + '++) {' +
      'loopstep();' +
      branch + '}' + 
      'loopend();' + 
      '\n';  
  return code;
};

Blockly.JavaScript['math_whole_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
              Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};


Blockly.JavaScript['math_positive_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
              Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};