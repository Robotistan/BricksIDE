'use strict';

goog.provide('Blockly.Blocks.sensor');  // Deprecated
goog.provide('Blockly.Constants.Sensor');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.PXTBlockly.Extensions');




Blockly.JavaScript['distance_sensor'] = function(block) {
  var condition = block.getFieldValue('CONDITION');
  var distance = block.getFieldValue('DISTANCE');
  var code = '...;\n';
  return code;
};



Blockly.defineBlocksWithJsonArray([
  {
    "type": "bump_sensor",
    "message0": "%1 çarpma sensörü tetiklendiğinde",
    "args0": [
    {
      "type": "field_dropdown",
      "name": "sensor",
      "options": [
        [
          "Sol",
          "left"
        ],
        [
          "Sağ",
          "right"
        ],
        [
          "Sağ+Sol",
          "right_left"
        ]
      ]
    }
    ],
    "message1": "yap %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO0"
      }
    ],
    "style": "sensor_blocks",
    "tooltip": "Çarpma Sensörü",
    "helpUrl": ""
  },

  {
    "type": "distance_sensor",
    "message0": "Mesafe sensör değeri %1 %2 cm ise",
    "args0": [
    {
      "type": "field_dropdown",
      "name": "CONDITION",
      "options": 
        [
          ["=", "EQ"],
          ["\u2260", "NEQ"],
          ["\u200F<", "LT"],
          ["\u200F\u2264", "LTE"],
          ["\u200F>", "GT"],
          ["\u200F\u2265", "GTE"]
        ]

    },
    {
      "type": "input_value",
      "name": "DISTANCE",
      "check": "Number",
      "value": 1,
      "max": 100,
      "min": 1,
      "precision": 1
    }    
    
    ],
    "message1": "yap %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO0"
      }
    ],
    "style": "sensor_blocks",
    "tooltip": "Mesafe Sensörü",
    "helpUrl": ""
  },


])

