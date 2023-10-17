module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./shim/horizontal.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/imports-loader/index.js?Blockly=../shim/blocks_compressed_horizontal,goog=../shim/blockly_compressed_horizontal.goog!./node_modules/exports-loader/index.js?Blockly!./msg/messages.js":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/imports-loader?Blockly=../shim/blocks_compressed_horizontal,goog=../shim/blockly_compressed_horizontal.goog!./node_modules/exports-loader?Blockly!./msg/messages.js ***!
  \******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*** IMPORTS FROM imports-loader ***/\nvar Blockly = __webpack_require__(/*! ../shim/blocks_compressed_horizontal */ \"./shim/blocks_compressed_horizontal.js\");\nvar goog = __webpack_require__(/*! ../shim/blockly_compressed_horizontal.goog */ \"./shim/blockly_compressed_horizontal.goog.js\");\n\n/**\n * @license\n * Visual Blocks Language\n *\n * Copyright 2012 Google Inc.\n * https://developers.google.com/blockly/\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n/**\n * @fileoverview English strings.\n * @author ascii@media.mit.edu (Andrew Sliwinski)\n *\n * After modifying this file, run `npm run translate` from the root directory\n * to regenerate `./msg/json/en.json`.\n * IMPORTANT:\n * All message strings must use single quotes for the scripts to work properly\n */\n'use strict';\n\ngoog.provide('Blockly.Msg.en');\n\ngoog.require('Blockly.Msg');\n\n// Control blocks\nBlockly.Msg.CONTROL_FOREVER = 'forever';\nBlockly.Msg.CONTROL_REPEAT = 'repeat %1';\nBlockly.Msg.CONTROL_IF = 'if %1 then';\nBlockly.Msg.CONTROL_ELSE = 'else';\nBlockly.Msg.CONTROL_STOP = 'stop';\nBlockly.Msg.CONTROL_STOP_ALL = 'all';\nBlockly.Msg.CONTROL_STOP_THIS = 'this script';\nBlockly.Msg.CONTROL_STOP_OTHER = 'other scripts in sprite';\nBlockly.Msg.CONTROL_WAIT = 'wait %1 seconds';\nBlockly.Msg.CONTROL_WAITUNTIL = 'wait until %1';\nBlockly.Msg.CONTROL_REPEATUNTIL = 'repeat until %1';\nBlockly.Msg.CONTROL_WHILE = 'while %1';\nBlockly.Msg.CONTROL_FOREACH = 'for each %1 in %2';\nBlockly.Msg.CONTROL_STARTASCLONE = 'when I start as a clone';\nBlockly.Msg.CONTROL_CREATECLONEOF = 'create clone of %1';\nBlockly.Msg.CONTROL_CREATECLONEOF_MYSELF = 'myself';\nBlockly.Msg.CONTROL_DELETETHISCLONE = 'delete this clone';\nBlockly.Msg.CONTROL_COUNTER = 'counter';\nBlockly.Msg.CONTROL_INCRCOUNTER = 'increment counter';\nBlockly.Msg.CONTROL_CLEARCOUNTER = 'clear counter';\nBlockly.Msg.CONTROL_ALLATONCE = 'all at once';\n\n// Data blocks\nBlockly.Msg.DATA_SETVARIABLETO = 'set %1 to %2';\nBlockly.Msg.DATA_CHANGEVARIABLEBY = 'change %1 by %2';\nBlockly.Msg.DATA_SHOWVARIABLE = 'show variable %1';\nBlockly.Msg.DATA_HIDEVARIABLE = 'hide variable %1';\nBlockly.Msg.DATA_ADDTOLIST = 'add %1 to %2';\nBlockly.Msg.DATA_DELETEOFLIST = 'delete %1 of %2';\nBlockly.Msg.DATA_DELETEALLOFLIST = 'delete all of %1';\nBlockly.Msg.DATA_INSERTATLIST = 'insert %1 at %2 of %3';\nBlockly.Msg.DATA_REPLACEITEMOFLIST = 'replace item %1 of %2 with %3';\nBlockly.Msg.DATA_ITEMOFLIST = 'item %1 of %2';\nBlockly.Msg.DATA_ITEMNUMOFLIST = 'item # of %1 in %2';\nBlockly.Msg.DATA_LENGTHOFLIST = 'length of %1';\nBlockly.Msg.DATA_LISTCONTAINSITEM = '%1 contains %2?';\nBlockly.Msg.DATA_SHOWLIST = 'show list %1';\nBlockly.Msg.DATA_HIDELIST = 'hide list %1';\nBlockly.Msg.DATA_INDEX_ALL = 'all';\nBlockly.Msg.DATA_INDEX_LAST = 'last';\nBlockly.Msg.DATA_INDEX_RANDOM = 'random';\n\n// Event blocks\nBlockly.Msg.EVENT_WHENFLAGCLICKED = 'when %1 clicked';\nBlockly.Msg.EVENT_WHENTHISSPRITECLICKED = 'when this sprite clicked';\nBlockly.Msg.EVENT_WHENSTAGECLICKED = 'when stage clicked';\nBlockly.Msg.EVENT_WHENTOUCHINGOBJECT = 'when this sprite touches %1';\nBlockly.Msg.EVENT_WHENBROADCASTRECEIVED = 'when I receive %1';\nBlockly.Msg.EVENT_WHENBACKDROPSWITCHESTO = 'when backdrop switches to %1';\nBlockly.Msg.EVENT_WHENGREATERTHAN = 'when %1 > %2';\nBlockly.Msg.EVENT_WHENGREATERTHAN_TIMER = 'timer';\nBlockly.Msg.EVENT_WHENGREATERTHAN_LOUDNESS = 'loudness';\nBlockly.Msg.EVENT_BROADCAST = 'broadcast %1';\nBlockly.Msg.EVENT_BROADCASTANDWAIT = 'broadcast %1 and wait';\nBlockly.Msg.EVENT_WHENKEYPRESSED = 'when %1 key pressed';\nBlockly.Msg.EVENT_WHENKEYPRESSED_SPACE = 'space';\nBlockly.Msg.EVENT_WHENKEYPRESSED_LEFT = 'left arrow';\nBlockly.Msg.EVENT_WHENKEYPRESSED_RIGHT = 'right arrow';\nBlockly.Msg.EVENT_WHENKEYPRESSED_DOWN = 'down arrow';\nBlockly.Msg.EVENT_WHENKEYPRESSED_UP = 'up arrow';\nBlockly.Msg.EVENT_WHENKEYPRESSED_ANY = 'any';\n\n// Looks blocks\nBlockly.Msg.LOOKS_SAYFORSECS = 'say %1 for %2 seconds';\nBlockly.Msg.LOOKS_SAY = 'say %1';\nBlockly.Msg.LOOKS_HELLO = 'Hello!';\nBlockly.Msg.LOOKS_THINKFORSECS = 'think %1 for %2 seconds';\nBlockly.Msg.LOOKS_THINK = 'think %1';\nBlockly.Msg.LOOKS_HMM = 'Hmm...';\nBlockly.Msg.LOOKS_SHOW = 'show';\nBlockly.Msg.LOOKS_HIDE = 'hide';\nBlockly.Msg.LOOKS_HIDEALLSPRITES = 'hide all sprites';\nBlockly.Msg.LOOKS_EFFECT_COLOR = 'color';\nBlockly.Msg.LOOKS_EFFECT_FISHEYE = 'fisheye';\nBlockly.Msg.LOOKS_EFFECT_WHIRL = 'whirl';\nBlockly.Msg.LOOKS_EFFECT_PIXELATE = 'pixelate';\nBlockly.Msg.LOOKS_EFFECT_MOSAIC = 'mosaic';\nBlockly.Msg.LOOKS_EFFECT_BRIGHTNESS = 'brightness';\nBlockly.Msg.LOOKS_EFFECT_GHOST = 'ghost';\nBlockly.Msg.LOOKS_CHANGEEFFECTBY = 'change %1 effect by %2';\nBlockly.Msg.LOOKS_SETEFFECTTO = 'set %1 effect to %2';\nBlockly.Msg.LOOKS_CLEARGRAPHICEFFECTS = 'clear graphic effects';\nBlockly.Msg.LOOKS_CHANGESIZEBY = 'change size by %1';\nBlockly.Msg.LOOKS_SETSIZETO = 'set size to %1 %';\nBlockly.Msg.LOOKS_SIZE = 'size';\nBlockly.Msg.LOOKS_CHANGESTRETCHBY = 'change stretch by %1';\nBlockly.Msg.LOOKS_SETSTRETCHTO = 'set stretch to %1 %';\nBlockly.Msg.LOOKS_SWITCHCOSTUMETO = 'switch costume to %1';\nBlockly.Msg.LOOKS_NEXTCOSTUME = 'next costume';\nBlockly.Msg.LOOKS_SWITCHBACKDROPTO = 'switch backdrop to %1';\nBlockly.Msg.LOOKS_GOTOFRONTBACK = 'go to %1 layer';\nBlockly.Msg.LOOKS_GOTOFRONTBACK_FRONT = 'front';\nBlockly.Msg.LOOKS_GOTOFRONTBACK_BACK = 'back';\nBlockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS = 'go %1 %2 layers';\nBlockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS_FORWARD = 'forward';\nBlockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS_BACKWARD = 'backward';\nBlockly.Msg.LOOKS_BACKDROPNUMBERNAME = 'backdrop %1';\nBlockly.Msg.LOOKS_COSTUMENUMBERNAME = 'costume %1';\nBlockly.Msg.LOOKS_NUMBERNAME_NUMBER = 'number';\nBlockly.Msg.LOOKS_NUMBERNAME_NAME = 'name';\nBlockly.Msg.LOOKS_SWITCHBACKDROPTOANDWAIT = 'switch backdrop to %1 and wait';\nBlockly.Msg.LOOKS_NEXTBACKDROP_BLOCK = 'next backdrop';\nBlockly.Msg.LOOKS_NEXTBACKDROP = 'next backdrop';\nBlockly.Msg.LOOKS_PREVIOUSBACKDROP = 'previous backdrop';\nBlockly.Msg.LOOKS_RANDOMBACKDROP = 'random backdrop';\n\n// Motion blocks\nBlockly.Msg.MOTION_MOVESTEPS = 'move %1 steps';\nBlockly.Msg.MOTION_TURNLEFT = 'turn %1 %2 degrees';\nBlockly.Msg.MOTION_TURNRIGHT = 'turn %1 %2 degrees';\nBlockly.Msg.MOTION_POINTINDIRECTION = 'point in direction %1';\nBlockly.Msg.MOTION_POINTTOWARDS = 'point towards %1';\nBlockly.Msg.MOTION_POINTTOWARDS_POINTER = 'mouse-pointer';\nBlockly.Msg.MOTION_POINTTOWARDS_RANDOM = 'random direction';\nBlockly.Msg.MOTION_GOTO = 'go to %1';\nBlockly.Msg.MOTION_GOTO_POINTER = 'mouse-pointer';\nBlockly.Msg.MOTION_GOTO_RANDOM = 'random position';\nBlockly.Msg.MOTION_GOTOXY = 'go to x: %1 y: %2';\nBlockly.Msg.MOTION_GLIDESECSTOXY = 'glide %1 secs to x: %2 y: %3';\nBlockly.Msg.MOTION_GLIDETO = 'glide %1 secs to %2';\nBlockly.Msg.MOTION_GLIDETO_POINTER = 'mouse-pointer';\nBlockly.Msg.MOTION_GLIDETO_RANDOM = 'random position';\nBlockly.Msg.MOTION_CHANGEXBY = 'change x by %1';\nBlockly.Msg.MOTION_SETX = 'set x to %1';\nBlockly.Msg.MOTION_CHANGEYBY = 'change y by %1';\nBlockly.Msg.MOTION_SETY = 'set y to %1';\nBlockly.Msg.MOTION_IFONEDGEBOUNCE = 'if on edge, bounce';\nBlockly.Msg.MOTION_SETROTATIONSTYLE = 'set rotation style %1';\nBlockly.Msg.MOTION_SETROTATIONSTYLE_LEFTRIGHT = 'left-right';\nBlockly.Msg.MOTION_SETROTATIONSTYLE_DONTROTATE = 'don\\'t rotate';\nBlockly.Msg.MOTION_SETROTATIONSTYLE_ALLAROUND = 'all around';\nBlockly.Msg.MOTION_XPOSITION = 'x position';\nBlockly.Msg.MOTION_YPOSITION = 'y position';\nBlockly.Msg.MOTION_DIRECTION = 'direction';\nBlockly.Msg.MOTION_SCROLLRIGHT = 'scroll right %1';\nBlockly.Msg.MOTION_SCROLLUP = 'scroll up %1';\nBlockly.Msg.MOTION_ALIGNSCENE = 'align scene %1';\nBlockly.Msg.MOTION_ALIGNSCENE_BOTTOMLEFT = 'bottom-left';\nBlockly.Msg.MOTION_ALIGNSCENE_BOTTOMRIGHT = 'bottom-right';\nBlockly.Msg.MOTION_ALIGNSCENE_MIDDLE = 'middle';\nBlockly.Msg.MOTION_ALIGNSCENE_TOPLEFT = 'top-left';\nBlockly.Msg.MOTION_ALIGNSCENE_TOPRIGHT = 'top-right';\nBlockly.Msg.MOTION_XSCROLL = 'x scroll';\nBlockly.Msg.MOTION_YSCROLL = 'y scroll';\nBlockly.Msg.MOTION_STAGE_SELECTED = 'Stage selected: no motion blocks';\n\n// Operators blocks\nBlockly.Msg.OPERATORS_ADD = '%1 + %2';\nBlockly.Msg.OPERATORS_SUBTRACT = '%1 - %2';\nBlockly.Msg.OPERATORS_MULTIPLY = '%1 * %2';\nBlockly.Msg.OPERATORS_DIVIDE = '%1 / %2';\nBlockly.Msg.OPERATORS_RANDOM = 'pick random %1 to %2';\nBlockly.Msg.OPERATORS_GT = '%1 > %2';\nBlockly.Msg.OPERATORS_LT = '%1 < %2';\nBlockly.Msg.OPERATORS_EQUALS = '%1 = %2';\nBlockly.Msg.OPERATORS_AND = '%1 and %2';\nBlockly.Msg.OPERATORS_OR = '%1 or %2';\nBlockly.Msg.OPERATORS_NOT = 'not %1';\nBlockly.Msg.OPERATORS_JOIN = 'join %1 %2';\nBlockly.Msg.OPERATORS_JOIN_APPLE = 'apple';\nBlockly.Msg.OPERATORS_JOIN_BANANA = 'banana';\nBlockly.Msg.OPERATORS_LETTEROF = 'letter %1 of %2';\nBlockly.Msg.OPERATORS_LETTEROF_APPLE = 'a';\nBlockly.Msg.OPERATORS_LENGTH = 'length of %1';\nBlockly.Msg.OPERATORS_CONTAINS = '%1 contains %2?';\nBlockly.Msg.OPERATORS_MOD = '%1 mod %2';\nBlockly.Msg.OPERATORS_ROUND = 'round %1';\nBlockly.Msg.OPERATORS_MATHOP = '%1 of %2';\nBlockly.Msg.OPERATORS_MATHOP_ABS = 'abs';\nBlockly.Msg.OPERATORS_MATHOP_FLOOR = 'floor';\nBlockly.Msg.OPERATORS_MATHOP_CEILING = 'ceiling';\nBlockly.Msg.OPERATORS_MATHOP_SQRT = 'sqrt';\nBlockly.Msg.OPERATORS_MATHOP_SIN = 'sin';\nBlockly.Msg.OPERATORS_MATHOP_COS = 'cos';\nBlockly.Msg.OPERATORS_MATHOP_TAN = 'tan';\nBlockly.Msg.OPERATORS_MATHOP_ASIN = 'asin';\nBlockly.Msg.OPERATORS_MATHOP_ACOS = 'acos';\nBlockly.Msg.OPERATORS_MATHOP_ATAN = 'atan';\nBlockly.Msg.OPERATORS_MATHOP_LN = 'ln';\nBlockly.Msg.OPERATORS_MATHOP_LOG = 'log';\nBlockly.Msg.OPERATORS_MATHOP_EEXP = 'e ^';\nBlockly.Msg.OPERATORS_MATHOP_10EXP = '10 ^';\n\n// Procedures blocks\nBlockly.Msg.PROCEDURES_DEFINITION = 'define %1';\n\n// Sensing blocks\nBlockly.Msg.SENSING_TOUCHINGOBJECT = 'touching %1?';\nBlockly.Msg.SENSING_TOUCHINGOBJECT_POINTER = 'mouse-pointer';\nBlockly.Msg.SENSING_TOUCHINGOBJECT_EDGE = 'edge';\nBlockly.Msg.SENSING_TOUCHINGCOLOR = 'touching color %1?';\nBlockly.Msg.SENSING_COLORISTOUCHINGCOLOR = 'color %1 is touching %2?';\nBlockly.Msg.SENSING_DISTANCETO = 'distance to %1';\nBlockly.Msg.SENSING_DISTANCETO_POINTER = 'mouse-pointer';\nBlockly.Msg.SENSING_ASKANDWAIT = 'ask %1 and wait';\nBlockly.Msg.SENSING_ASK_TEXT = 'What\\'s your name?';\nBlockly.Msg.SENSING_ANSWER = 'answer';\nBlockly.Msg.SENSING_KEYPRESSED = 'key %1 pressed?';\nBlockly.Msg.SENSING_MOUSEDOWN = 'mouse down?';\nBlockly.Msg.SENSING_MOUSEX = 'mouse x';\nBlockly.Msg.SENSING_MOUSEY = 'mouse y';\nBlockly.Msg.SENSING_SETDRAGMODE = 'set drag mode %1';\nBlockly.Msg.SENSING_SETDRAGMODE_DRAGGABLE = 'draggable';\nBlockly.Msg.SENSING_SETDRAGMODE_NOTDRAGGABLE = 'not draggable';\nBlockly.Msg.SENSING_LOUDNESS = 'loudness';\nBlockly.Msg.SENSING_LOUD = 'loud?';\nBlockly.Msg.SENSING_TIMER = 'timer';\nBlockly.Msg.SENSING_RESETTIMER = 'reset timer';\nBlockly.Msg.SENSING_OF = '%1 of %2';\nBlockly.Msg.SENSING_OF_XPOSITION = 'x position';\nBlockly.Msg.SENSING_OF_YPOSITION = 'y position';\nBlockly.Msg.SENSING_OF_DIRECTION = 'direction';\nBlockly.Msg.SENSING_OF_COSTUMENUMBER = 'costume #';\nBlockly.Msg.SENSING_OF_COSTUMENAME = 'costume name';\nBlockly.Msg.SENSING_OF_SIZE = 'size';\nBlockly.Msg.SENSING_OF_VOLUME = 'volume';\nBlockly.Msg.SENSING_OF_BACKDROPNUMBER = 'backdrop #';\nBlockly.Msg.SENSING_OF_BACKDROPNAME = 'backdrop name';\nBlockly.Msg.SENSING_OF_STAGE = 'Stage';\nBlockly.Msg.SENSING_CURRENT = 'current %1';\nBlockly.Msg.SENSING_CURRENT_YEAR = 'year';\nBlockly.Msg.SENSING_CURRENT_MONTH = 'month';\nBlockly.Msg.SENSING_CURRENT_DATE = 'date';\nBlockly.Msg.SENSING_CURRENT_DAYOFWEEK = 'day of week';\nBlockly.Msg.SENSING_CURRENT_HOUR = 'hour';\nBlockly.Msg.SENSING_CURRENT_MINUTE = 'minute';\nBlockly.Msg.SENSING_CURRENT_SECOND = 'second';\nBlockly.Msg.SENSING_DAYSSINCE2000 = 'days since 2000';\nBlockly.Msg.SENSING_USERNAME = 'username';\nBlockly.Msg.SENSING_USERID = 'user id';\n\n// Sound blocks\nBlockly.Msg.SOUND_PLAY = 'start sound %1';\nBlockly.Msg.SOUND_PLAYUNTILDONE = 'play sound %1 until done';\nBlockly.Msg.SOUND_STOPALLSOUNDS = 'stop all sounds';\nBlockly.Msg.SOUND_SETEFFECTO = 'set %1 effect to %2';\nBlockly.Msg.SOUND_CHANGEEFFECTBY = 'change %1 effect by %2';\nBlockly.Msg.SOUND_CLEAREFFECTS = 'clear sound effects';\nBlockly.Msg.SOUND_EFFECTS_PITCH = 'pitch';\nBlockly.Msg.SOUND_EFFECTS_PAN = 'pan left/right';\nBlockly.Msg.SOUND_CHANGEVOLUMEBY = 'change volume by %1';\nBlockly.Msg.SOUND_SETVOLUMETO = 'set volume to %1%';\nBlockly.Msg.SOUND_VOLUME = 'volume';\nBlockly.Msg.SOUND_RECORD = 'record...';\n\n// Category labels\nBlockly.Msg.CATEGORY_MOTION = 'Motion';\nBlockly.Msg.CATEGORY_LOOKS = 'Looks';\nBlockly.Msg.CATEGORY_SOUND = 'Sound';\nBlockly.Msg.CATEGORY_EVENTS = 'Events';\nBlockly.Msg.CATEGORY_CONTROL = 'Control';\nBlockly.Msg.CATEGORY_SENSING = 'Sensing';\nBlockly.Msg.CATEGORY_OPERATORS = 'Operators';\nBlockly.Msg.CATEGORY_VARIABLES = 'Variables';\nBlockly.Msg.CATEGORY_MYBLOCKS = 'My Blocks';\n\n// Context menus\nBlockly.Msg.DUPLICATE = 'Duplicate';\nBlockly.Msg.DELETE = 'Delete';\nBlockly.Msg.ADD_COMMENT = 'Add Comment';\nBlockly.Msg.REMOVE_COMMENT = 'Remove Comment';\nBlockly.Msg.DELETE_BLOCK = 'Delete Block';\nBlockly.Msg.DELETE_X_BLOCKS = 'Delete %1 Blocks';\nBlockly.Msg.DELETE_ALL_BLOCKS = 'Delete all %1 blocks?';\nBlockly.Msg.CLEAN_UP = 'Clean up Blocks';\nBlockly.Msg.HELP = 'Help';\nBlockly.Msg.UNDO = 'Undo';\nBlockly.Msg.REDO = 'Redo';\nBlockly.Msg.EDIT_PROCEDURE = 'Edit';\nBlockly.Msg.SHOW_PROCEDURE_DEFINITION = 'Go to definition';\nBlockly.Msg.WORKSPACE_COMMENT_DEFAULT_TEXT = 'Say something...';\n\n// Color\nBlockly.Msg.COLOUR_HUE_LABEL = 'Color';\nBlockly.Msg.COLOUR_SATURATION_LABEL = 'Saturation';\nBlockly.Msg.COLOUR_BRIGHTNESS_LABEL = 'Brightness';\n\n// Variables\n// @todo Remove these once fully managed by Scratch VM / Scratch GUI\nBlockly.Msg.CHANGE_VALUE_TITLE = 'Change value:';\nBlockly.Msg.RENAME_VARIABLE = 'Rename variable';\nBlockly.Msg.RENAME_VARIABLE_TITLE = 'Rename all \"%1\" variables to:';\nBlockly.Msg.RENAME_VARIABLE_MODAL_TITLE = 'Rename Variable';\nBlockly.Msg.NEW_VARIABLE = 'Make a Variable';\nBlockly.Msg.NEW_VARIABLE_TITLE = 'New variable name:';\nBlockly.Msg.VARIABLE_MODAL_TITLE = 'New Variable';\nBlockly.Msg.VARIABLE_ALREADY_EXISTS = 'A variable named \"%1\" already exists.';\nBlockly.Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE = 'A variable named \"%1\" already exists for another variable of type \"%2\".';\nBlockly.Msg.DELETE_VARIABLE_CONFIRMATION = 'Delete %1 uses of the \"%2\" variable?';\nBlockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE = 'Can\\'t delete the variable \"%1\" because it\\'s part of the definition of the function \"%2\"';\nBlockly.Msg.DELETE_VARIABLE = 'Delete the \"%1\" variable';\n\n// Custom Procedures\n// @todo Remove these once fully managed by Scratch VM / Scratch GUI\nBlockly.Msg.NEW_PROCEDURE = 'Make a Block';\nBlockly.Msg.PROCEDURE_ALREADY_EXISTS = 'A procedure named \"%1\" already exists.';\nBlockly.Msg.PROCEDURE_DEFAULT_NAME = 'block name';\nBlockly.Msg.PROCEDURE_USED = 'To delete a block definition, first remove all uses of the block';\n\n// Lists\n// @todo Remove these once fully managed by Scratch VM / Scratch GUI\nBlockly.Msg.NEW_LIST = 'Make a List';\nBlockly.Msg.NEW_LIST_TITLE = 'New list name:';\nBlockly.Msg.LIST_MODAL_TITLE = 'New List';\nBlockly.Msg.LIST_ALREADY_EXISTS = 'A list named \"%1\" already exists.';\nBlockly.Msg.RENAME_LIST_TITLE = 'Rename all \"%1\" lists to:';\nBlockly.Msg.RENAME_LIST_MODAL_TITLE = 'Rename List';\nBlockly.Msg.DEFAULT_LIST_ITEM = 'thing';\nBlockly.Msg.DELETE_LIST = 'Delete the \"%1\" list';\nBlockly.Msg.RENAME_LIST = 'Rename list';\n\n// Broadcast Messages\n// @todo Remove these once fully managed by Scratch VM / Scratch GUI\nBlockly.Msg.NEW_BROADCAST_MESSAGE = 'New message';\nBlockly.Msg.NEW_BROADCAST_MESSAGE_TITLE = 'New message name:';\nBlockly.Msg.BROADCAST_MODAL_TITLE = 'New Message';\nBlockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME = 'message1';\n\n\n/*** EXPORTS FROM exports-loader ***/\nmodule.exports = Blockly;\n\n\n//# sourceURL=webpack://ScratchBlocks/./msg/messages.js?./node_modules/imports-loader?Blockly=../shim/blocks_compressed_horizontal,goog=../shim/blockly_compressed_horizontal.goog!./node_modules/exports-loader?Blockly");

/***/ }),

/***/ "./node_modules/imports-loader/index.js?Blockly=../shim/blocks_compressed_horizontal-blockly_compressed_horizontal-messages,goog=../shim/blockly_compressed_horizontal.goog!./node_modules/exports-loader/index.js?Blockly!./msg/scratch_msgs.js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/imports-loader?Blockly=../shim/blocks_compressed_horizontal-blockly_compressed_horizontal-messages,goog=../shim/blockly_compressed_horizontal.goog!./node_modules/exports-loader?Blockly!./msg/scratch_msgs.js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),

/***/ "./node_modules/imports-loader/index.js?Blockly=./shim/blockly_compressed_horizontal-blocks_compressed!./node_modules/exports-loader/index.js?Blockly!./blocks_compressed_horizontal.js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/imports-loader?Blockly=./shim/blockly_compressed_horizontal-blocks_compressed!./node_modules/exports-loader?Blockly!./blocks_compressed_horizontal.js ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*** IMPORTS FROM imports-loader ***/\nvar Blockly = __webpack_require__(/*! ./shim/blockly_compressed_horizontal-blocks_compressed */ \"./shim/blockly_compressed_horizontal-blocks_compressed.js\");\n\n// Do not edit this file; automatically generated by build.py.\n'use strict';\n\n\n\n\n/*** EXPORTS FROM exports-loader ***/\nmodule.exports = Blockly;\n\n\n//# sourceURL=webpack://ScratchBlocks/./blocks_compressed_horizontal.js?./node_modules/imports-loader?Blockly=./shim/blockly_compressed_horizontal-blocks_compressed!./node_modules/exports-loader?Blockly");

/***/ }),

/***/ "./node_modules/imports-loader/index.js?Blockly=./shim/blockly_compressed_horizontal.Blockly!./node_modules/exports-loader/index.js?Blockly!./blocks_compressed.js":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/imports-loader?Blockly=./shim/blockly_compressed_horizontal.Blockly!./node_modules/exports-loader?Blockly!./blocks_compressed.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*** IMPORTS FROM imports-loader ***/\nvar Blockly = __webpack_require__(/*! ./shim/blockly_compressed_horizontal.Blockly */ \"./shim/blockly_compressed_horizontal.Blockly.js\");\n\n// Do not edit this file; automatically generated by build.py.\n'use strict';\n\n\n\n\n/*** EXPORTS FROM exports-loader ***/\nmodule.exports = Blockly;\n\n\n//# sourceURL=webpack://ScratchBlocks/./blocks_compressed.js?./node_modules/imports-loader?Blockly=./shim/blockly_compressed_horizontal.Blockly!./node_modules/exports-loader?Blockly");

/***/ }),

/***/ "./node_modules/imports-loader/index.js?this=>window!./node_modules/exports-loader/index.js?Blockly&goog!./blockly_compressed_horizontal.js":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/imports-loader?this=>window!./node_modules/exports-loader?Blockly&goog!./blockly_compressed_horizontal.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*** IMPORTS FROM imports-loader ***/\n(function() {\n\n// Do not edit this file; automatically generated by build.py.\n'use strict';\n\n\n\n\n/*** EXPORTS FROM exports-loader ***/\nexports[\"Blockly\"] = (Blockly);\nexports[\"goog\"] = (goog);\n}.call(window));\n\n//# sourceURL=webpack://ScratchBlocks/./blockly_compressed_horizontal.js?./node_modules/imports-loader?this=%3Ewindow!./node_modules/exports-loader?Blockly&goog");

/***/ }),

/***/ "./shim/blockly_compressed_horizontal-blocks_compressed.js":
/*!*****************************************************************!*\
  !*** ./shim/blockly_compressed_horizontal-blocks_compressed.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! imports-loader?Blockly=./shim/blockly_compressed_horizontal.Blockly!exports-loader?Blockly!../blocks_compressed */ \"./node_modules/imports-loader/index.js?Blockly=./shim/blockly_compressed_horizontal.Blockly!./node_modules/exports-loader/index.js?Blockly!./blocks_compressed.js\");\n\n\n//# sourceURL=webpack://ScratchBlocks/./shim/blockly_compressed_horizontal-blocks_compressed.js?");

/***/ }),

/***/ "./shim/blockly_compressed_horizontal.Blockly.js":
/*!*******************************************************!*\
  !*** ./shim/blockly_compressed_horizontal.Blockly.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./blockly_compressed_horizontal */ \"./shim/blockly_compressed_horizontal.js\").Blockly;\n\n\n//# sourceURL=webpack://ScratchBlocks/./shim/blockly_compressed_horizontal.Blockly.js?");

/***/ }),

/***/ "./shim/blockly_compressed_horizontal.goog.js":
/*!****************************************************!*\
  !*** ./shim/blockly_compressed_horizontal.goog.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./blockly_compressed_horizontal */ \"./shim/blockly_compressed_horizontal.js\").goog;\n\n\n//# sourceURL=webpack://ScratchBlocks/./shim/blockly_compressed_horizontal.goog.js?");

/***/ }),

/***/ "./shim/blockly_compressed_horizontal.js":
/*!***********************************************!*\
  !*** ./shim/blockly_compressed_horizontal.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! imports-loader?this=>window!exports-loader?Blockly&goog!../blockly_compressed_horizontal */ \"./node_modules/imports-loader/index.js?this=>window!./node_modules/exports-loader/index.js?Blockly&goog!./blockly_compressed_horizontal.js\");\n\n\n//# sourceURL=webpack://ScratchBlocks/./shim/blockly_compressed_horizontal.js?");

/***/ }),

/***/ "./shim/blocks_compressed_horizontal-blockly_compressed_horizontal-messages.js":
/*!*************************************************************************************!*\
  !*** ./shim/blocks_compressed_horizontal-blockly_compressed_horizontal-messages.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! imports-loader?Blockly=../shim/blocks_compressed_horizontal,goog=../shim/blockly_compressed_horizontal.goog!exports-loader?Blockly!../msg/messages */ \"./node_modules/imports-loader/index.js?Blockly=../shim/blocks_compressed_horizontal,goog=../shim/blockly_compressed_horizontal.goog!./node_modules/exports-loader/index.js?Blockly!./msg/messages.js\");\n\n\n//# sourceURL=webpack://ScratchBlocks/./shim/blocks_compressed_horizontal-blockly_compressed_horizontal-messages.js?");

/***/ }),

/***/ "./shim/blocks_compressed_horizontal.js":
/*!**********************************************!*\
  !*** ./shim/blocks_compressed_horizontal.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! imports-loader?Blockly=./shim/blockly_compressed_horizontal-blocks_compressed!exports-loader?Blockly!../blocks_compressed_horizontal */ \"./node_modules/imports-loader/index.js?Blockly=./shim/blockly_compressed_horizontal-blocks_compressed!./node_modules/exports-loader/index.js?Blockly!./blocks_compressed_horizontal.js\");\n\n\n//# sourceURL=webpack://ScratchBlocks/./shim/blocks_compressed_horizontal.js?");

/***/ }),

/***/ "./shim/horizontal.js":
/*!****************************!*\
  !*** ./shim/horizontal.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! imports-loader?Blockly=../shim/blocks_compressed_horizontal-blockly_compressed_horizontal-messages,goog=../shim/blockly_compressed_horizontal.goog!exports-loader?Blockly!../msg/scratch_msgs */ \"./node_modules/imports-loader/index.js?Blockly=../shim/blocks_compressed_horizontal-blockly_compressed_horizontal-messages,goog=../shim/blockly_compressed_horizontal.goog!./node_modules/exports-loader/index.js?Blockly!./msg/scratch_msgs.js\");\n\n\n//# sourceURL=webpack://ScratchBlocks/./shim/horizontal.js?");

/***/ })

/******/ });