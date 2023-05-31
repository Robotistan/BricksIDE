	 Blockly.Python['go_left'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "moveleft()\n";

	  return code;
	};

	Blockly.Python['go_right'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "moveright()\n";

	  return code;
	};
	
 	Blockly.Python['go_up'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "moveup()\n";

	  return code;
	};

	Blockly.Python['go_down'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "movedown()\n";

	  return code;
	};

	Blockly.Python['turn_right'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "turnright()\n";

	  return code;
	};

	Blockly.Python['turn_left'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "turnleft()\n";

	  return code;
	};

	Blockly.Python['walk'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "walk()\n";

	  return code;
	};

	Blockly.Python['smash_stone'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "smashstone()\n";

	  return code;
	};

	Blockly.Python['collect_jewel'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "collectjewel()\n";

	  return code;
	};

	Blockly.Python['start'] = function(block) {
	  // TODO: Assemble Python into code variable.
	  var code = "start()\n";

	  return code;
	};

	Blockly.Python['klavye_olay'] = function(block) {
	  var dropdown_klavye = block.getFieldValue('klavye');
	  var statements_klavye_basilinca = Blockly.Python.statementToCode(block, 'klavye_basilinca');
	  // TODO: Assemble Python into code variable.
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


	Blockly.Python['for_dongusu'] = function(block) {
	  // Repeat n times.
	  if (block.getField('TIMES')) {
	    // Internal number.
	    var repeats = String(parseInt(block.getFieldValue('TIMES'), 10));
	  } else {
	    // External number.
	    var repeats = Blockly.Python.valueToCode(block, 'TIMES',
	        Blockly.Python.ORDER_NONE) || '0';
	  }
	  if (Blockly.isNumber(repeats)) {
	    repeats = parseInt(repeats, 10);
	  } else {
	    repeats = 'int(' + repeats + ')';
	  }
	  var branch = Blockly.Python.statementToCode(block, 'DO');
	  branch = Blockly.Python.addLoopTrap(branch, block.id) ||
	      Blockly.Python.PASS;
	  var loopVar = Blockly.Python.variableDB_.getDistinctName(
	      'count', Blockly.Variables.NAME_TYPE);
	  var code = 'for ' + loopVar + ' in range(' + repeats + '):\n' + branch;
	  return code;
	};
