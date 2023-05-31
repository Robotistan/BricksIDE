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
 * @fileoverview Variable blocks for Arduino.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.variables');

goog.require('Blockly.Arduino');

Blockly.Arduino.data_variable = function() {
  //TODO: settype to variable
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('VARIABLE').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
      Blockly.Arduino.definitions_['define_' + varName] = 'float ' + varName + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else if(editorType == "Simulator")
  {
      //Blockly.Arduino.definitions_['define_' + varName] = 'var ' + varName + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else
  {
      //Blockly.Arduino.definitions_['define_' + varName] = varName + ' = ' + value + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
};

Blockly.Arduino.variables_declare = function() {
  //TODO: settype to variable
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('VARIABLE').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
      Blockly.Arduino.definitions_['define_' + varName] = 'float ' + varName + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else if(editorType == "Simulator")
  {
      //Blockly.Arduino.definitions_['define_' + varName] = 'var ' + varName + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else
  {
      //Blockly.Arduino.definitions_['define_' + varName] = varName + ' = ' + value + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
};

Blockly.Arduino.data_setvariableto = function() {
  // Variable setter.
  var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('VARIABLE').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
      return varName + ' = ' + value + ';\n';
  }
  else if(editorType == "Simulator")
  {
      return varName + ' = ' + value + ';\nloopstep();\n';
  }
  else
  {
      return varName + ' = ' + value + '\n';
  }
};

Blockly.Arduino.data_changevariableby = function() {
  // Variable setter.
  var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('VARIABLE').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
      if(value < 0)
        return varName + ' -= ' + Math.abs(value) + ';\n'
      else
        return varName + ' += ' + value + ';\n'
  }
  else if(editorType == "Simulator")
  {
      if(value < 0)
        return varName + ' -= ' + Math.abs(value) + ';\nloopstep();';
      else
        return varName + ' += ' + value + ';\nloopstep();';
  }
  else
  {
      if(value < 0)
        return varName + ' -= ' + Math.abs(value) + '\n'
      else
        return varName + ' += ' + value + '\n'
  }
};

Blockly.Arduino.variables_declare = function() {
  //TODO: settype to variable
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('VARIABLE').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
      //Blockly.Arduino.definitions_['define_' + varName] = 'float ' + varName + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else if(editorType == "Simulator")
  {
      //Blockly.Arduino.definitions_['define_' + varName] = 'var ' + varName + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else
  {
      //Blockly.Arduino.definitions_['define_' + varName] = varName + ' = ' + value + ';\n';
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
};

Blockly.Arduino.data_definelist = function() {
  // Variable setter.
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
 
  }
  else if(editorType == "Simulator")
  {
      return varName + ' = []' + ';\n loopstep();\n';
  }
  else
  {
      return varName + ' = [] \n';
  }
};

Blockly.Arduino.data_listcontents = function() {
  //TODO: settype to variable
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
  }
  else if(editorType == "Simulator")
  {
      var code = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else
  {
      var code  = varName;
      return [code, Blockly.Arduino.ORDER_NONE];
  }
};

Blockly.Arduino.data_addtolist = function() {
  // Variable setter.
  var item = Blockly.Arduino.valueToCode(this, 'ITEM', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
  }
  else if(editorType == "Simulator")
  {
      return varName + ".push(" + item + "); \n loopstep();\n";
  }
  else
  {
      return varName + ".append(" + item + ")\n";
  }
};


Blockly.Arduino.data_deleteoflist = function() {
  // Variable setter.
  var index = Blockly.Arduino.valueToCode(this, 'INDEX', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
  index -= 1;
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
  }
  else if(editorType == "Simulator")
  {
      return varName + ".splice(" + index + " , 1); \nloopstep();\n";
  }
  else
  {
      return varName + ".pop(" + index + ")\n";
  }
};

Blockly.Arduino.data_deletealloflist = function() {
  // Variable setter.
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
  }
  else if(editorType == "Simulator")
  {
      return varName + "= []; \n";
  }
  else
  {
      return varName + ".clear() \n";
  }
};

Blockly.Arduino.data_insertatlist = function() {
  // Variable setter.
  var index = Blockly.Arduino.valueToCode(this, 'INDEX', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
  index -= 1;
  var item = Blockly.Arduino.valueToCode(this, 'ITEM', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
  }
  else if(editorType == "Simulator")
  {
      return varName + ".splice(" + index + ", 0, " + item + "); \n loopstep();\n";
  }
  else
  {
      return varName + ".insert(" + index + "," + item + ") \n";
  }
};


Blockly.Arduino.data_itemoflist = function() {
  //TODO: settype to variable
  var index = Blockly.Arduino.valueToCode(this, 'INDEX', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
  index -= 1;
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
      
  }
  else if(editorType == "Simulator")
  {
      //Blockly.Arduino.definitions_['define_' + varName] = 'var ' + varName + ';\n';
      var code = varName + "[" + index +"]";
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else
  {
      //Blockly.Arduino.definitions_['define_' + varName] = varName + ' = ' + value + ';\n';
      var code = varName + "[" + index +"]";
      return [code, Blockly.Arduino.ORDER_NONE];
  }
};

Blockly.Arduino.data_itemnumoflist = function() {
  //TODO: settype to variable
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
      
  }
  else if(editorType == "Simulator")
  {
      //Blockly.Arduino.definitions_['define_' + varName] = 'var ' + varName + ';\n';
      var index = Blockly.Arduino.valueToCode(this, 'INDEX', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
      index -= 1;
      var code = varName + "indexOf(" + index + ")";
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else
  {
      //Blockly.Arduino.definitions_['define_' + varName] = varName + ' = ' + value + ';\n';
      var code = varName + "index(" + index + ")";
      return [code, Blockly.Arduino.ORDER_NONE];
  }
};


Blockly.Arduino.data_lengthoflist = function() {
  //TODO: settype to variable
  var varName = Blockly.Arduino.variableDB_.getName(this.getField('LIST').getText(), Blockly.Variables.NAME_TYPE);

  if(editorType == "CPP")
  {
      
  }
  else if(editorType == "Simulator")
  {
      //Blockly.Arduino.definitions_['define_' + varName] = 'var ' + varName + ';\n';
      var code = varName + "length";
      return [code, Blockly.Arduino.ORDER_NONE];
  }
  else
  {
      //Blockly.Arduino.definitions_['define_' + varName] = varName + ' = ' + value + ';\n';
      var code = "len(" + varName + ")";
      return [code, Blockly.Arduino.ORDER_NONE];
  }
};
