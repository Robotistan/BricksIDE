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

goog.provide('Blockly.Blocks.wedo');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

/*
Blockly.Blocks['dropdown_setdirection'] = {

  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
              {type: 'placeholder', width: 48, height: 48},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/forward.svg',
                value: 'forward', width: 48, height: 48, alt: 'Go forward'},

              {type: 'placeholder', width: 48, height: 48},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/turnleft.svg',
                value: 'turnleft', width: 48, height: 48, alt: 'Turn left'},

              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/control_stop.svg',
                value: 'stop', width: 48, height: 48, alt: 'Stop'},

              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/turnright.svg',
                value: 'turnright', width: 48, height: 48, alt: 'Turn right'},

              {type: 'placeholder', width: 48, height: 48},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/backward.svg',
                value: 'backward', width: 48, height: 48, alt: 'Go backward'}
            ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.looks.primary,
        Blockly.Colours.looks.secondary,
        Blockly.Colours.looks.tertiary
    );
  }
};
*/

/*
Blockly.Blocks['go_direction'] = {

  init: function() {
    this.jsonInit({
      "id": "wedo_setcolor",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/forward.svg",
          "width": 40,
          "height": 40,
          "alt": "Set Direction"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
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
*/

Blockly.Blocks['forwarddrive'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "forwarddrive",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/forwarddrive.svg",
          "width": 40,
          "height": 40,
          "alt": "İleri"
        },
        {
          "type": "input_value",
          "name": "DURATION",
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

Blockly.Blocks['backwarddrive'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "backwarddrive",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/backwarddrive.svg",
          "width": 40,
          "height": 40,
          "alt": "Geri"
        },
        {
          "type": "input_value",
          "name": "DURATION",
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


Blockly.Blocks['rightdrive'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "rightdrive",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/rightdrive.svg",
          "width": 40,
          "height": 40,
          "alt": "Sağ"
        },
        {
          "type": "input_value",
          "name": "DURATION",
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


Blockly.Blocks['leftdrive'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "leftdrive",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/leftdrive.svg",
          "width": 40,
          "height": 40,
          "alt": "Sol"
        },
        {
          "type": "input_value",
          "name": "DURATION",
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

Blockly.Blocks['stopdrive'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "stopdrive",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/stopdrive.svg",
          "width": 40,
          "height": 40,
          "alt": "Dur"
        },
        {
          "type": "input_value",
          "name": "DURATION",
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

Blockly.Blocks['wedo_motorcounterclockwise'] = {
  /**
   * Block to spin motor counter-clockwise.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_motorcounterclockwise",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/wedo_motor-counterclockwise.svg",
          "width": 40,
          "height": 40,
          "alt": "Turn motor counter-clockwise"
        },
        {
          "type": "input_value",
          "name": "DURATION",
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

Blockly.Blocks['dropdown_wedo_motorspeed'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_motor-speed_slow.svg',
                value: 'slow', width: 48, height: 48, alt: 'Slow'},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_motor-speed_med.svg',
                value: 'medium', width: 48, height: 48, alt: 'Medium'},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_motor-speed_fast.svg',
                value: 'fast', width: 48, height: 48, alt: 'Fast'}
            ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.motion.primary,
        Blockly.Colours.motion.secondary,
        Blockly.Colours.motion.tertiary
    );
  }
};

Blockly.Blocks['wedo_motorspeed'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_motorspeed",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/wedo_motor-speed_fast.svg",
          "width": 40,
          "height": 40,
          "alt": "Motor Speed"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
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

Blockly.Blocks['dropdown_wedo_whentilt'] = {
  /**
   * Block for when tilt drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
              {type: 'placeholder', width: 48, height: 48},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt-forward.svg',
                value: 'forward', width: 48, height: 48, alt: 'Tilt forward'},
              {type: 'placeholder', width: 48, height: 48},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt-left.svg',
                value: 'left', width: 48, height: 48, alt: 'Tilt left'},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt.svg',
                value: 'any', width: 48, height: 48, alt: 'Tilt any'},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt-right.svg',
                value: 'right', width: 48, height: 48, alt: 'Tilt right'},
              {type: 'placeholder', width: 48, height: 48},
              {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/wedo_when-tilt-backward.svg',
                value: 'backward', width: 48, height: 48, alt: 'Tilt backward'}
            ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
        Blockly.Colours.event.secondary,
        Blockly.Colours.event.tertiary
    );
  }
};

Blockly.Blocks['wedo_whentilt'] = {
  /**
   * Block for when tilted.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_whentilt",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/wedo_when-tilt.svg",
          "width": 40,
          "height": 40,
          "alt": "When tilted"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['wedo_whendistanceclose'] = {
  /**
   * Block for when distance sensor is close.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_whendistanceclose",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/wedo_when-distance_close.svg",
          "width": 40,
          "height": 40,
          "alt": "When distance close"
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};
