'use strict';

goog.provide('Blockly.Blocks.move');  // Deprecated
goog.provide('Blockly.Constants.Move');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.PXTBlockly.Extensions');




Blockly.JavaScript['forward'] = function(block) {
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['turn'] = function(block) {
  var dropdown_name = block.getFieldValue('turn_direction');
  var angle_degrees = block.getFieldValue('ANGLE');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};


Blockly.defineBlocksWithJsonArray([

{
  "type": "west",
  "message0": "B %1",
  "args0": [{
      "type": "field_image",
      "src": "images/left.png",
      "width": 60,
      "height": 60,
      "alt": "*"
    }],
  "previousStatement": null,
  "nextStatement": null,
  "style": "move_blocks",
  "tooltip": "Batı",
  "helpUrl": ""
},

{
  "type": "east",
  "message0": "D %1",
  "args0": [{
      "type": "field_image",
      "src": "images/right.png",
      "width": 60,
      "height": 60,
      "alt": "*"
    }],
  "previousStatement": null,
  "nextStatement": null,
  "style": "move_blocks",
  "tooltip": "Doğu",
  "helpUrl": ""
},

{
  "type": "north",
  "message0": "K %1",
  "args0": [{
      "type": "field_image",
      "src": "images/up.png",
      "width": 60,
      "height": 60,
      "alt": "*"
    }],
  "previousStatement": null,
  "nextStatement": null,
  "style": "move_blocks",
  "tooltip": "Kuzey",
  "helpUrl": ""
},

{
  "type": "south",
  "message0": "G %1",
  "args0": [{
      "type": "field_image",
      "src": "images/down.png",
      "width": 60,
      "height": 60,
      "alt": "*"
    }],
  "previousStatement": null,
  "nextStatement": null,
  "style": "move_blocks",
  "tooltip": "Güney",
  "helpUrl": ""
},

{
  "type": "forward",
  "message0": "İleriye %1 cm git",
  "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": "Number",
      "value": 1,
      "max": 100,
      "min": 1,
      "precision": 1
    }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#1E90FF",
  "tooltip": "İlerle",
  "helpUrl": ""
},
{
  "type": "backward",
  "message0": "Geriye %1 cm git",
  "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": "Number",
      "value": 1,
      "max": 100,
      "min": 1,
      "precision": 1
    }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#1E90FF",
  "tooltip": "İlerle",
  "helpUrl": ""
},
{
  "type": "turn_angle",
  "message0": "%1 %2 dön",
   "args0": [
    {
      "type": "field_dropdown",
      "name": "turn_direction",
      "options": [
        [
          "Sola",
          "left"
        ],
        [
          "Sağa",
          "right"
        ]
      ]
    },
    {
      "type": "field_angle",
      "name": "ANGLE",
      "angle": 90
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#1E90FF",
  "tooltip": "Dön",
  "helpUrl": ""
},
{
  "type": "turn_quarter",
  "message0": "%1 %2 tur dön",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "direction",
      "options": [
        [
          "Sola",
          "left"
        ],
        [
          "Sağa",
          "right"
        ]
      ]
    },
   {
      "type": "field_dropdown",
      "name": "quarter",
      "options": [
        [
          "Çeyrek",
          "90"
        ],
        [
          "Yarım",
          "180"
        ],
        [
          "Tam tur",
          "360"
        ]
      ]
    }
   ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#1E90FF",
  "tooltip": "İlerle",
  "helpUrl": ""
},
{
  "type": "pen_down",
  "message0": "Yazmaya başla",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#1E90FF",
  "tooltip": "İlerle",
  "helpUrl": ""
},
{
  "type": "pen_up",
  "message0": "Yazmayı bırak",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#1E90FF",
  "tooltip": "İlerle",
  "helpUrl": ""
}

])

