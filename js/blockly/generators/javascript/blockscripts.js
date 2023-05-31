Blockly.JavaScript['setup_comm'] = function(block) {
  var dropdown_item = block.getFieldValue('Item');
  var dropdown_speed = block.getFieldValue('Speed');
  // TODO: Assemble JavaScript into code variable.
  var code = '$-$' + dropdown_item + '.begin('+ dropdown_speed +');' + '$-$'
  return code;
};

Blockly.Blocks['print_comm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["serial","Serial"]]), "Item")
        .appendField("yazdır");
    this.appendValueInput("Value")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4aa587");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['print_comm'] = function(block) {
  var dropdown_item = block.getFieldValue('Item');
  var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.

  if(value_value == '')
  	value_value = 0;

  var code = dropdown_item + '.print('+ value_value + ')';
  return code;
};


Blockly.Blocks['println_comm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["serial","Serial"]]), "Item")
        .appendField("yeni satır yazdır");
    this.appendValueInput("Value")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4aa587");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['println_comm'] = function(block) {
  var dropdown_item = block.getFieldValue('Item');
  var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.

  if(value_value == '')
  	value_value = 0;

  var code = dropdown_item + '.println('+ value_value + ')';
  return code;
};

Blockly.Blocks['prompttext_comm'] = {
  init: function() {
    this.appendValueInput("Value")
        .setCheck(null)
        .appendField("metin komut girişi - mesaj:");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour("#4aa587");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['prompttext_comm'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 
  'getUserInputPromptText("' + value_value +'")' +

  '$-$' + 'Serial.begin(9600);' + '$-$' +
  'h-h' +
  ' String getUserInputPromptText(String msg) { ' +
  ' Serial.println(msg);' +
  ' boolean stringComplete = false;' +
  ' String content = "";' +
  ' while (stringComplete == false) {' +
  '  if (Serial.available()) {' +
  '    char readChar = (char)Serial.read();' +
  '    if (readChar == "\n" || readChar == "\r") {' +
  '      stringComplete = true;' +
  '    } else {' +
  '      content += readChar;' +
  '    }' +
  '  }' +
  '}' +
  ' ' +
  ' ' +
  ' // Empty incoming serial buffer' +
  ' while(Serial.available()) { Serial.read(); };' +
  ' return content;' +
  ' }' +
  'h-h';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['promptnumber_comm'] = {
  init: function() {
    this.appendValueInput("Value")
        .setCheck(null)
        .appendField("sayı komut girişi - mesaj:");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour("#4aa587");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['promptnumber_comm'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 
  'getUserInputPromptNumber("' + value_value +'")' +

  '$-$' + 'Serial.begin(9600);' + '$-$' +
  'h-h' +
  ' int getUserInputPromptNumber(String msg) { '+
  ' Serial.println(msg); '+
  ' boolean stringComplete = false; '+
  ' int content = 0; '+
  ' while (stringComplete == false) { '+
  '   if (Serial.available()) { '+
  '     content = Serial.parseInt(); '+
  '     stringComplete = true; '+
  '   } '+
  ' } '+
  ' // Empty incoming serial buffer '+
  ' while(Serial.available()) { Serial.read(); }; '+
  ' return content; '+
  ' } '+
  'h-h';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['setup_spi'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("kur")
        .appendField(new Blockly.FieldDropdown([["SPI","SPI"]]), "item")
        .appendField("konfigürasyon:");
    this.appendDummyInput()
        .appendField("data shift")
        .appendField(new Blockly.FieldDropdown([["MSBFIRST","MSBFIRST"], ["LSBFIRST","LSBFIRST"]]), "dataShift");
    this.appendDummyInput()
        .appendField("clock divide")
        .appendField(new Blockly.FieldDropdown([["2 (8MHz)","SPI_CLOCK_DIV2"], ["4 (4MHz)","SPI_CLOCK_DIV4"], ["8 (2MHz)","SPI_CLOCK_DIV8"], ["16 (1MHz)","SPI_CLOCK_DIV16"], ["32 (500KHz)","SPI_CLOCK_DIV32"], ["64 (250KHz)","SPI_CLOCK_DIV64"], ["128 (125KHz)","SPI_CLOCK_DIV128"]]), "clockDivide");
    this.appendDummyInput()
        .appendField("SPI mode (idle-edge)")
        .appendField(new Blockly.FieldDropdown([["0 (Low-Falling)","SPI_MODE0"], ["1 (Low-Rising)","SPI_MODE1"], ["2 (High-Falling)","SPI_MODE2"], ["2 (High-Rising)","SPI_MODE3"]]), "spiMode");
    this.setColour("#4aa587");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['setup_spi'] = function(block) {
  var dropdown_item = block.getFieldValue('item');
  var dropdown_datashift = block.getFieldValue('dataShift');
  var dropdown_clockdivide = block.getFieldValue('clockDivide');
  var dropdown_spimode = block.getFieldValue('spiMode');
  // TODO: Assemble JavaScript into code variable.
  var code = 
  '$-$' + dropdown_item + '.setBitOrder(' + dropdown_datashift + '); ' + '$-$' + 
  '$-$' + dropdown_item + '.setDataMode(' + dropdown_spimode + '); ' + '$-$' + 
  '$-$' + dropdown_item + '.setClockDivider(' + dropdown_clockdivide + '); ' + '$-$' + 
  '$-$' + dropdown_item + '.begin(); ' + '$-$' + 

   'h-h' + '#include <SPI.h>'+ 'h-h';
  return code;
};

Blockly.Blocks['set_spi_transfer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["SPI","SPI"]]), "item")
        .appendField("transfer");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .appendField("pin")
        .appendField(new Blockly.FieldDropdown([["none","none"], ["0","0"], ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"], 
          ["9","9"], ["10","10"], ["11","11"], ["12","12"], ["13","13"], ["A0","A0"], ["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"]]), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4aa587");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['set_spi_transfer'] = function(block) {
  var dropdown_item = block.getFieldValue('item');
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('PIN');
  // TODO: Assemble JavaScript into code variable.
  var code = '';

  if(value_value == '')
  	value_value = 0;

  if(dropdown_pin == "none")
  {
  	code = 
  	dropdown_item + '.transfer('+ value_value +');' + 
  	'$-$' + dropdown_item + '.begin();' + '$-$' +
  	'h-h' + '#include <SPI.h>' + 'h-h';
  }
  else
  {
  	code = 
  	'digitalWrite(' + dropdown_pin + ', HIGH);' +
     dropdown_item + '.transfer('+ value_value +');' +
    'digitalWrite(' + dropdown_pin + ', LOW);' +

    '$-$' + dropdown_item +'.begin();' + '$-$' +
  	'$-$' + 'pinMode(' + dropdown_pin +', OUTPUT);' + '$-$' +
  	
  	'h-h' + '#include <SPI.h>' + 'h-h';
  }

  return code;
};

Blockly.Blocks['get_spi_transfer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["SPI","SPI"]]), "item")
        .appendField("transfer");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .appendField("pin")
        .appendField(new Blockly.FieldDropdown([["none","none"], ["0","0"], ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"], 
          ["9","9"], ["10","10"], ["11","11"], ["12","12"], ["13","13"], ["A0","A0"], ["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"]]), "PIN");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour("#4aa587");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.JavaScript['get_spi_transfer'] = function(block) {

  var dropdown_item = block.getFieldValue('item');
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('PIN');
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  
  if(value_value == '')
  	value_value = 0;

  if(dropdown_pin == "none")
  {
  	code = 
  	dropdown_item + '.transfer('+ value_value +')' + 

  	'$-$' + dropdown_item + '.begin();' + '$-$' +
  	'h-h' + '#include <SPI.h>' + 'h-h';
  }
  else
  {
  	code = 
  	'spiReturnSlave'+ dropdown_pin +'()' +

  	'$-$' + dropdown_item + '.begin();' + '$-$' +
  	'$-$' + 'pinMode(' + dropdown_pin +', OUTPUT);' + '$-$' +

  	'h-h' + '#include <SPI.h>' + 
  	' int spiReturnSlave'+ dropdown_pin +'() { ' +
  	' int spiReturn = 0; ' +
  	' digitalWrite('+ dropdown_pin +', HIGH); ' +
    ' spiReturn = ' + dropdown_item + '.transfer('+ value_value +'); ' +
  	' digitalWrite('+ dropdown_pin +', LOW); ' +
  	' return spiReturn; ' +
	' } ' +
  	'h-h';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//---------------------------------------------------------------------

Blockly.Blocks['for_loop1'] = {
    init: function() {
      this.appendValueInput("TIMES")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField("tekrarla");
      this.setInputsInline(true);
      this.appendStatementInput("DO")
          .setCheck(null)
          .appendField("yap");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#5ba55b");
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


  Blockly.JavaScript['for_loop1'] = function(block) {
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
      code += 'var ' + endVar + ' = ' + repeats + ';';
    }

    code += 'for (' + loopVar + ' = 0; ' +
        loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {' 
        + ''
        + branch + '}'
        + '' 
        + 'h-h' + 'int ' + loopVar + ';' + 'h-h';
    return code;
  };

Blockly.Blocks['for_loop2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("tekrarla")
        .appendField(new Blockly.FieldVariable("i"), "INDEX");
    this.appendValueInput("IndexValue")
        .setCheck("Number");
    this.appendValueInput("ToValue")
        .setCheck("Number")
        .appendField("'den");
    this.appendValueInput("IncrementValue")
        .setCheck("Number")
        .appendField("'e kadar");
    this.appendDummyInput()
        .appendField("artır");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("yap");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5ba55b");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['for_loop2'] = function(block) {
  var variable_index = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INDEX'), Blockly.Variables.NAME_TYPE);
  var value_indexvalue = Blockly.JavaScript.valueToCode(block, 'IndexValue', Blockly.JavaScript.ORDER_ATOMIC);
  var value_tovalue = Blockly.JavaScript.valueToCode(block, 'ToValue', Blockly.JavaScript.ORDER_ATOMIC);
  var value_incrementvalue = Blockly.JavaScript.valueToCode(block, 'IncrementValue', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  // TODO: Assemble JavaScript into code variable.

  var increment = "";
  newincrementvalue = value_incrementvalue.replace("(","").replace(")","").replace("-","");

if(value_incrementvalue == 0)
    increment = variable_index + '+=0)'

  if(value_incrementvalue == 1)
    increment = variable_index + '++)'

  else if(value_incrementvalue == "-1")
    increment = variable_index + '--)'

  else if(value_incrementvalue > 1)
    increment = variable_index + '=+ '+ value_incrementvalue +')' 

  else if(value_incrementvalue < "-1")
    increment = variable_index + '=- '+ newincrementvalue +')' 

  code = 'for (' + variable_index + ' = ' + value_indexvalue + '; '
        + variable_index + ' < ' + value_tovalue + '; '
        + increment
        + '{' 
        + ''
        + statements_do + '}'
        + 'h-h' + 'int ' + variable_index + ';' + 'h-h';

  return code;
};