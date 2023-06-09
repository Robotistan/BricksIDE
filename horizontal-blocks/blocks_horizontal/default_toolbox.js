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

'use strict';

goog.provide('Blockly.Blocks.defaultToolbox');

goog.require('Blockly.Blocks');

/**
 * @fileoverview Provide a default toolbox XML.
 */

Blockly.Blocks.defaultToolbox = '<xml id="toolbox-categories" style="display: none">' +


        '<block type="event_whenplayclicked"></block>' +

        '<block type="control_repeat">' +
        '   <value name="TIMES">' +
        '       <shadow type="math_whole_number">' +
        '           <field name="NUM">4</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +

        '<block type="control_wait">' +
        '   <value name="DURATION">' +
        '       <shadow type="math_positive_number">' +
        '           <field name="NUM">1</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +

        '<block type="forwarddrive">' +
        '   <value name="DURATION">' +
        '       <shadow type="math_positive_number">' +
        '           <field name="NUM">1</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +
        
        '<block type="backwarddrive">' +
        '   <value name="DURATION">' +
        '       <shadow type="math_positive_number">' +
        '           <field name="NUM">1</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +

        '<block type="leftdrive">' +
        '   <value name="DURATION">' +
        '       <shadow type="math_positive_number">' +
        '           <field name="NUM">1</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +

        '<block type="rightdrive">' +
        '   <value name="DURATION">' +
        '       <shadow type="math_positive_number">' +
        '           <field name="NUM">1</field>' +
        '       </shadow>' +
        '   </value>' +
        '</block>' +

        '<block type="stopdrive">' +
        '</block>' +

        '</xml>';
        