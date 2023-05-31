/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2018 Google Inc.
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
 * @fileoverview Classic theme.
 * Contains multi-coloured border to create shadow effect.
 */
'use strict';

goog.provide('Blockly.Themes.Classic');

goog.require('Blockly.Colours');
goog.require('Blockly.Theme');


// Temporary holding object.
Blockly.Themes.Classic = {};

Blockly.Themes.Classic.defaultBlockStyles = {
  "colour_blocks": {
    "colourPrimary": "#1E90FF"
  },
  "field_blocks": {
    "colourPrimary": Blockly.Colours.textField,
    "colourSecondary": Blockly.Colours.textField,
    "colourTertiary": Blockly.Colours.textField,
  },
  "list_blocks": {
    "colourPrimary": "#D400D4"
  },
  "logic_blocks": {
    "colourPrimary": "#00AA00"
  },
  "loop_blocks": {
    "colourPrimary": "#ffab19 "
  },
  "math_blocks": {
    "colourPrimary": "#E3008C"
  },
  "procedure_blocks": {
    "colourPrimary": "#E63022"
  },
  "text_blocks": {
    "colourPrimary": "#9400D3"
  },
  "variable_blocks": {
    "colourPrimary": "#00A4A6"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "#DC143C"
  },
  "hat_blocks": {
    "colourPrimary": "330",
    "hat": "cap"
  },
  "move_blocks": {
    "colourPrimary": "#1E90FF"
  },
  "sensor_blocks": {
    "colourPrimary": "#D400D4"
  },
  "sound_blocks": {
    "colourPrimary": "#D400D4"
  }
};

Blockly.Themes.Classic.categoryStyles = {
  "colour_category": {
    "colour": "#1E90FF"
  },
  "list_category": {
    "colour": "#D400D4"
  },
  "logic_category": {
    "colour": "#00AA00"
  },
  "loop_category": {
    "colour": "#5C2D91"
  },
  "math_category": {
    "colour": "#E3008C"
  },
  "procedure_category": {
    "colour": "#E63022"
  },
  "text_category": {
    "colour": "#9400D3"
  },
  "variable_category": {
    "colour": "#00A4A6"
  },
  "variable_dynamic_category": {
    "colour": "#DC143C"
  },
  "move_category": {
    "colour": "#1E90FF"
  },
  "sensor_category": {
    "colour": "#D400D4"
  },
  "sound_category": {
    "colour": "#D400D4"
  }


};

Blockly.Themes.Classic =
    new Blockly.Theme(Blockly.Themes.Classic.defaultBlockStyles,
        Blockly.Themes.Classic.categoryStyles);
