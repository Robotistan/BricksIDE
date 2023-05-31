/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
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
 * @fileoverview Wedo blocks for Scratch (Horizontal)
 * @author ascii@media.mit.edu <Andrew Sliwinski>
 */
'use strict';

goog.provide('Blockly.Blocks.pinoo');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

Blockly.Blocks['ledStates'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/led-off.svg',
                value: '0', width: 72, height: 72, alt: 'off'},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/led-on.svg',
                value: '1', width: 72, height: 72, alt: 'on'}
            ]), 'VALUE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.motion.primary,
        Blockly.Colours.motion.secondary,
        Blockly.Colours.motion.tertiary
    );
  }
};

Blockly.Blocks['motor1States'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/m1forward.svg',
                value: '0', width: 72, height: 72, alt: 'forward'},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/m1backward.svg',
                value: '1', width: 72, height: 72, alt: 'backward'}
            ]), 'VALUE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.looks.primary,
        Blockly.Colours.looks.secondary,
        Blockly.Colours.looks.tertiary
    );
  }
};

Blockly.Blocks['motor2States'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/m2forward.svg',
                value: '0', width: 72, height: 72, alt: 'forward'},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/m2backward.svg',
                value: '1', width: 72, height: 72, alt: 'backward'}
            ]), 'VALUE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.looks.primary,
        Blockly.Colours.looks.secondary,
        Blockly.Colours.looks.tertiary
    );
  }
};

Blockly.Blocks['setLedValue'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "setLedValue",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/led-off.svg",
          "width": 40,
          "height": 40,
          "alt": "value"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['playBuzzer'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "playBuzzer",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/play-on.svg",
          "width": 40,
          "height": 40,
          "alt": "Play"
        },
        {
          "type": "input_value",
          "name": "FREQUENCY",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['motor1'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "motor1",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/motor1forward.svg",
          "width": 50,
          "height": 50,
          "alt": "value"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": Blockly.Colours.looks.primary,
      "colourSecondary": Blockly.Colours.looks.secondary,
      "colourTertiary": Blockly.Colours.looks.tertiary
    });
  }
};

Blockly.Blocks['motor2'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "motor2",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/motor2forward.svg",
          "width": 50,
          "height": 50,
          "alt": "value"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": Blockly.Colours.looks.primary,
      "colourSecondary": Blockly.Colours.looks.secondary,
      "colourTertiary": Blockly.Colours.looks.tertiary
    });
  }
};

Blockly.Blocks['servoMotor1'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "servoMotor1",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/servo1.svg",
          "width": 50,
          "height": 50,
          "alt": "servo"
        },
        {
          "type": "input_value",
          "name": "ANGLE",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": Blockly.Colours.looks.primary,
      "colourSecondary": Blockly.Colours.looks.secondary,
      "colourTertiary": Blockly.Colours.looks.tertiary
    });
  }
};

Blockly.Blocks['servoMotor2'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "servoMotor1",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/servo2.svg",
          "width": 50,
          "height": 50,
          "alt": "servo"
        },
        {
          "type": "input_value",
          "name": "ANGLE",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": Blockly.Colours.looks.primary,
      "colourSecondary": Blockly.Colours.looks.secondary,
      "colourTertiary": Blockly.Colours.looks.tertiary
    });
  }
};

Blockly.Blocks['neoPixelColour'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "playBuzzer",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/set-led_white.svg",
          "width": 40,
          "height": 40,
          "alt": "NeoPixel"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};