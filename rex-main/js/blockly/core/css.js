/**
 * This file has been modified by Microsoft on Apr/2017.
 */
/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * @name Blockly.Css
 * @namespace
 */
goog.provide('Blockly.Css');

goog.require('Blockly.Colours');

goog.require('Blockly.utils.userAgent');

/**
 * List of cursors.
 * @enum {string}
 */
Blockly.Css.Cursor = {
  OPEN: 'handopen',
  CLOSED: 'handclosed',
  DELETE: 'handdelete'
};

/**
 * Current cursor (cached value).
 * @type {string}
 * @private
 */
Blockly.Css.currentCursor_ = '';

/**
 * Has CSS already been injected?
 * @type {boolean}
 * @private
 */
Blockly.Css.injected_ = false;

/**
 * Path to media directory, with any trailing slash removed.
 * @type {string}
 * @private
 */
Blockly.Css.mediaPath_ = '';

/**
 * Inject the CSS into the DOM.  This is preferable over using a regular CSS
 * file since:
 * a) It loads synchronously and doesn't force a redraw later.
 * b) It speeds up loading by not blocking on a separate HTTP transfer.
 * c) The CSS content may be made dynamic depending on init options.
 * @param {boolean} hasCss If false, don't inject CSS
 *     (providing CSS becomes the document's responsibility).
 * @param {string} pathToMedia Path from page to the Blockly media directory.
 */
Blockly.Css.inject = function(hasCss, pathToMedia) {
  // Only inject the CSS once.
  if (Blockly.Css.injected_) {
    return;
  }
  Blockly.Css.injected_ = true;
  // Placeholder for cursor rule.  Must be first rule (index 0).
  var text = '.blocklyDraggable {}\n';
  if (hasCss) {
    text += Blockly.Css.CONTENT.join('\n');
    Blockly.Css.CONTENT = null;  // Garbage collect 13 KB.
    if (Blockly.FieldDate) {
      text += Blockly.FieldDate.CSS.join('\n');
    }
  }
  // Strip off any trailing slash (either Unix or Windows).
  Blockly.Css.mediaPath_ = pathToMedia.replace(/[\\\/]$/, '');
  text = text.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
  // pxt-blockly: Scratch rendering. Dynamically replace colours in 
  // the CSS text, in case they have been set at run-time injection.
  for (var colourProperty in Blockly.Colours) {
    if (Blockly.Colours.hasOwnProperty(colourProperty)) {
      // Replace all
      text = text.replace(
        new RegExp('\\$colour\\_' + colourProperty, 'g'),
        Blockly.Colours[colourProperty]
      );
    }
  }

  // Inject CSS tag at start of head.
  var cssNode = document.createElement('style');
  var cssTextNode = document.createTextNode(text);
  cssNode.appendChild(cssTextNode);
  document.head.insertBefore(cssNode, document.head.firstChild);
};

/**
 * Set the cursor to be displayed when over something draggable.
 * See See https://github.com/google/blockly/issues/981 for context.
 * @param {Blockly.Css.Cursor} cursor Enum.
 * @deprecated April 2017.
 */
Blockly.Css.setCursor = function(cursor) {
  console.warn('Deprecated call to Blockly.Css.setCursor. ' +
      'See https://github.com/google/blockly/issues/981 for context');
};

/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Css.CONTENT = [
  '.blocklySvg {',
    'background-color: $colour_workspace;',
    'outline: none;',
    'overflow: hidden;',  /* IE overflows by default. */
    'position: absolute;',
    'display: block;',
    'touch-action: none;',
  '}',

  /* Necessary to position the drag surface */
  '.blocklyRelativeWrapper {',
    'position: relative;',
    'width: 100%;',
    'height: 100%;',
  '}',

  '.blocklyWidgetDiv {',
    'display: none;',
    'position: absolute;',
    'z-index: 99999;', /* big value for bootstrap3 compatibility */
  '}',

  '.injectionDiv {',
    'height: 100%;',
    'position: relative;',
    'overflow: hidden;', /* So blocks in drag surface disappear at edges */
    'touch-action: none;',
  '}',

  '.blocklyWidgetDiv.fieldTextInput {',
    'overflow: hidden;',
    'border: 1px solid;',
    'box-sizing: border-box;',
    'transform-origin: 0 0;',
    '-ms-transform-origin: 0 0;',
    '-moz-transform-origin: 0 0;',
    '-webkit-transform-origin: 0 0;',
  '}',

  '.blocklyTextDropDownArrow {',
    'position: absolute;',
  '}',

  '.blocklyNonSelectable {',
    'user-select: none;',
    '-moz-user-select: none;',
    '-ms-user-select: none;',
    '-webkit-user-select: none;',
  '}',

  '.blocklyWsDragSurface {',
    'display: none;',
    'position: absolute;',
    'top: 0;',
    'left: 0;',
    'touch-action: none;',
    'cursor: move;',
  '}',
  /* Added as a separate rule with multiple classes to make it more specific
     than a bootstrap rule that selects svg:root. See issue #1275 for context.
  */
  '.blocklyWsDragSurface.blocklyOverflowVisible {',
    'overflow: visible;',
  '}',
  /* Added as a separate rule with multiple classes to make it more specific
     than a bootstrap rule that selects svg:root. See issue #1275 for context.
  */
  '.blocklyWsDragSurface.blocklyOverflowVisible {',
    'overflow: visible;',
  '}',

  '.blocklyBlockDragSurface {',
    'display: none;',
    'position: absolute;',
    'top: 0;',
    'left: 0;',
    'right: 0;',
    'bottom: 0;',
    'overflow: visible !important;',
    'z-index: 50;', /* Display above the toolbox */
  '}',

  '.blocklyBlockCanvas.blocklyTransitioning {',
    'transition: all 0.5s ease-in-out;',
  '}',

  '.blocklyBlockCanvas.blocklyCanvasTransitioning,',
  '.blocklyBubbleCanvas.blocklyCanvasTransitioning {',
    'transition: transform .5s;',
  '}',

  '.blocklyTooltipDiv {',
    'background-color: #ffffc7;',
    'border: 1px solid #ddc;',
    'box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);',
    'color: #000;',
    'display: none;',
    'font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;',
    'font-size: 9pt;',
    'opacity: .9;',
    'padding: 2px;',
    'position: absolute;',
    'z-index: 100000;', /* big value for bootstrap3 compatibility */
  '}',

  '.blocklyDropDownDiv {',
    'position: fixed;',
    'left: 0;',
    'top: 0;',
    'z-index: 1000;',
    'display: none;',
    'border: 1px solid;',
    'border-radius: 2px;',
    'box-shadow: 0px 0px 8px 1px ' + Blockly.Colours.dropDownShadow + ';',
    'padding: 4px;',
    '-webkit-user-select: none;',
  '}',

  '.blocklyDropDownContent {',
    'max-height: 300px;', // @todo: spec for maximum height.
    'overflow: auto;',
    'overflow-x: hidden;',
  '}',

  '.blocklyDropDownArrow {',
    'position: absolute;',
    'left: 0;',
    'top: 0;',
    'width: 16px;',
    'height: 16px;',
    'z-index: -1;',
    'background-color: inherit;',
    'border-color: inherit;',
  '}',

  '.blocklyDropDownButton {',
    'display: inline-block;',
    'float: left;',
    'padding: 0;',
    'margin: 4px;',
    'border-radius: 4px;',
    'outline: none;',
    'border: 1px solid;',
    'transition: box-shadow .1s;',
    'cursor: pointer;',
  '}',

  '.blocklyDropDownButtonHover {',
    'box-shadow: 0px 0px 0px 4px ' + Blockly.Colours.fieldShadow + ';',
  '}',

  '.blocklyDropDownButton:active {',
    'box-shadow: 0px 0px 0px 6px ' + Blockly.Colours.fieldShadow + ';',
  '}',

  '.blocklyDropDownButton > img {',
    'width: 80%;',
    'height: 80%;',
    'margin-top: 5%',
  '}',

  '.blocklyDropDownPlaceholder {',
    'display: inline-block;',
    'float: left;',
    'padding: 0;',
    'margin: 4px;',
  '}',

  '.blocklyNumPadButton {',
    'display: inline-block;',
    'float: left;',
    'padding: 0;',
    'width: 48px;',
    'height: 48px;',
    'margin: 4px;',
    'border-radius: 4px;',
    'background: $colour_numPadBackground;',
    'color: $colour_numPadText;',
    'outline: none;',
    'border: 1px solid $colour_numPadBorder;',
    'cursor: pointer;',
    'font-weight: 600;',
    'font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;',
    'font-size: 12pt;',
    '-webkit-tap-highlight-color: rgba(0,0,0,0);',
  '}',

  '.blocklyNumPadButton > img {',
    'margin-top: 10%;',
    'width: 80%;',
    'height: 80%;',
  '}',

  '.blocklyNumPadButton:active {',
    'background: $colour_numPadActiveBackground;',
    '-webkit-tap-highlight-color: rgba(0,0,0,0);',
  '}',

  '.arrowTop {',
    'border-top: 1px solid;',
    'border-left: 1px solid;',
    'border-top-left-radius: 4px;',
    'border-color: inherit;',
  '}',

  '.arrowBottom {',
    'border-bottom: 1px solid;',
    'border-right: 1px solid;',
    'border-bottom-right-radius: 4px;',
    'border-color: inherit;',
  '}',

  '.valueReportBox {',
    'min-width: 50px;',
    'max-width: 300px;',
    'max-height: 200px;',
    'overflow: auto;',
    'word-wrap: break-word;',
    'text-align: center;',
    'font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;',
    'font-size: .8em;',
  '}',

  '.blocklyResizeSE {',
    'cursor: se-resize;',
    'fill: transparent;',
  '}',

  '.blocklyResizeSW {',
    'cursor: sw-resize;',
    'fill: transparent;',
  '}',

  '.blocklyResizeLine {',
    'stroke: #515A5A;',
    'stroke-width: 1;',
  '}',

  '.blocklyHighlightedConnectionPath {',
    'fill: none;',
    'stroke: #FFF200;',
    'stroke-width: 4px;',
  '}',

  '.blocklyPath {',
    'stroke-width: 1px;',
    'transition: stroke .4s;',
  '}',

  // pxtblockly: highlight reporter blocks on hover
  '.blocklyDraggable:not(.blocklySelected)>.blocklyPath.blocklyReporterHover {',
    'stroke-width: 2px;',
    'stroke: white;',
  '}',

  // pxtblockly: highlight fields on hover
  '.blocklyBlockBackground.blocklyFieldHover {',
    'stroke-width: 2px;',
    'stroke: white;',
  '}',

  '.blocklySelected>.blocklyPath {',
     //'stroke: #FFF200;',
     //'stroke-width: 1px;',
  '}',

  '.blocklyDraggable {',
    /* backup for browsers (e.g. IE11) that don't support grab */
    'cursor: url("<<<PATH>>>/handopen.cur"), auto;',
    'cursor: grab;',
    'cursor: -webkit-grab;',
    'touch-action: none;',
  '}',

  '.blocklyDragging {',
    /* backup for browsers (e.g. IE11) that don't support grabbing */
    'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
    'cursor: grabbing;',
    'cursor: -webkit-grabbing;',
    'touch-action: none;',
  '}',
  /* Changes cursor on mouse down. Not effective in Firefox because of
    https://bugzilla.mozilla.org/show_bug.cgi?id=771241 */
  '.blocklyDraggable:active {',
    /* backup for browsers (e.g. IE11) that don't support grabbing */
    'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
    'cursor: grabbing;',
    'cursor: -webkit-grabbing;',
  '}',
  /* Change the cursor on the whole drag surface in case the mouse gets
     ahead of block during a drag. This way the cursor is still a closed hand.
   */
  '.blocklyBlockDragSurface .blocklyDraggable {',
    /* backup for browsers (e.g. IE11) that don't support grabbing */
    'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
    'cursor: grabbing;',
    'cursor: -webkit-grabbing;',
  '}',

  '.blocklyDragging.blocklyDraggingDelete {',
    'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyToolboxDelete {',
    'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyToolboxGrab {',
    'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
    'cursor: grabbing;',
    'cursor: -webkit-grabbing;',
  '}',

  '.blocklyDragging>.blocklyPath {',
    'fill-opacity: 1.0;',
    'stroke-opacity: 1.0;',
  '}',

  '.blocklyDragging>.blocklyPath {',
  '}',

  '.blocklyDisabled>.blocklyPath {',
    'fill-opacity: .8;',
    'stroke-opacity: .8;',
  '}',
  '.blocklyDisabled .blocklyEditableText .blocklyBlockBackground,',
  '.blocklyDisabled .blocklyNonEditableText .blocklyBlockBackground,',
  '.blocklyDisabled g[data-argument-type="dropdown"] .blocklyBlockBackground {',
    'fill-opacity: 0.1 !important;',
  '}',

  '.blocklyInsertionMarker>.blocklyPath {',
    'stroke: none;',
  '}',

  '.blocklyInsertionMarker>.blocklyIconGroup {',
    'display: none;',
  '}',

  '.blocklyInsertionMarker>.blocklyPath,',
  '.blocklyInsertionMarker>.blocklyPathLight,',
  '.blocklyInsertionMarker>.blocklyPathDark {',
    'fill-opacity: .2;',
    'stroke: none',
  '}',

  '.blocklyReplaceable .blocklyPath {',
    'fill-opacity: 0.5;',
  '}',

  '.blocklyReplaceable .blocklyPathLight,',
  '.blocklyReplaceable .blocklyPathDark {',
    'display: none;',
  '}',

  '.blocklyText {',
    'font-weight: bold;',
    'cursor: default;',
    'fill: #fff;',
    'font-family: "Roboto",Geneva,Verdana,sans-serif;',
    'font-size: 12pt;',
  '}',

  '.blocklyTextTruncated {',
    'font-size: 11pt;',
  '}',

  '.blocklyNonEditableText>g>text {',
    'pointer-events: none;',
  '}',
  '.blocklyNonEditableText>text,',
  '.blocklyEditableText>text,',
  '.blocklyNonEditableText>g>text,',
  '.blocklyEditableText>g>text {',
    'fill: $colour_text;',
  '}',

  '.blocklyDropdownText {',
    'fill: #fff !important;',
  '}',

  '.blocklyBubbleText {',
    'fill: #fff;',
  '}',

  '.blocklyBubbleCanvas {',
    'user-select: none;',
    '-moz-user-select: none;',
    '-ms-user-select: none;',
    '-webkit-user-select: none;',
  '}',

  '.blocklyFlyout {',
    'position: absolute;',
    'z-index: 20;',
  '}',

  '.blocklyFlyout {',
    'position: absolute;',
    'z-index: 20;',
  '}',
  '.blocklyFlyoutButton {',
    'fill: #F4F4F4;',
  '}',

  '.blocklyFlyoutButtonBackground {',
      'stroke: #fff;',
  '}',

  '.blocklyFlyoutButton .blocklyText {',
    'fill: $colour_text;',
  '}',

  '.blocklyFlyoutButtonShadow {',
    'fill: none;',
  '}',

  '.blocklyFlyoutButton:hover {',
    'fill: #EAEAEA;',
    'cursor: pointer;',
  '}',

  '.blocklyFlyoutLabel {',
    'cursor: default;',
  '}',

  '.blocklyFlyoutLabelBackground {',
    'opacity: 0;',
  '}',

  '.blocklyFlyoutLabelText {',
    'font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;',
    'font-size: 14pt;',
    'fill: $colour_text;',
    'font-weight: bold;',
  '}',
  

  /*
    Don't allow users to select text.  It gets annoying when trying to
    drag a block and selected text moves instead.
  */
  '.blocklySvg text, .blocklyBlockDragSurface text, .blocklyFlyout text, .blocklyToolboxDiv text {',
    'user-select: none;',
    '-moz-user-select: none;',
    '-ms-user-select: none;',
    '-webkit-user-select: none;',
    'cursor: inherit;',
  '}',

  '.blocklyHidden {',
    'display: none;',
  '}',

  '.blocklyFieldDropdown:not(.blocklyHidden) {',
    'display: block;',
  '}',

  '.blocklyIconGroup,',
  '.blocklyBreakpointIconGroup {',
    'cursor: default;',
  '}',

  '.blocklyIconGroup:not(:hover),',
  '.blocklyIconGroupReadonly {',
    'opacity: .6;',
  '}',

  '.blocklyBreakpointIconGroup:hover,',
  '.blocklyBreakpointIconGroupReadonly {',
    'fill-opacity: .6;',
  '}',

  '.blocklyIconShape {',
    'fill: #000;',
    'stroke-width: 1px;',
    'stroke: #fff;',
    'cursor: pointer;',
  '}',

  '.blocklyIconSymbol {',
    'fill: #fff;',
  '}',

  '.blocklyMinimalBody {',
    'margin: 0;',
    'padding: 0;',
    'background-color: #FAF6BD;',
  '}',

  // pxtblockly: workspace comment background in IE
  '.blocklyUneditableMinimalBody {',
    'fill: #FAF6BD;',
  '}',

  '.blocklyCommentForeignObject {',
    'position: relative;',
    'z-index: 0;',
  '}',

  '.blocklyComment > image {',
    'cursor: pointer',
  '}',

  '.blocklyCommentRect {',
    'fill: #FAF6BD;',
    'stroke: #F9F3A1;',
    'stroke-width: 1px',
  '}',

  '.blocklyCommentTarget {',
    'fill: transparent;',
    'stroke: #F9F3A1;',
  '}',

  '.blocklyCommentTargetFocused {',
    'fill: none;',
  '}',

  '.blocklyCommentText {',
    'fill: #000;',
    'pointer-events: none;',
  '}',

  '.blocklyCommentHandleTarget {',
    'fill: none;',
  '}',

  '.blocklyCommentHandleTargetFocused {',
    'fill: transparent;',
  '}',

  '.blocklyFocused>.blocklyCommentRect {',
    'fill: #FFB900;',
    'stroke: #B9B272;',
  '}',

  '.blocklySelected>.blocklyCommentTarget {',
    'stroke: #FFB900;',
    'stroke-width: 1px;',
  '}',

  '.blocklyCommentForeignObject {',
    'position: relative;',
    'z-index: 0;',
  '}',

  '.blocklyCommentRect {',
    'fill: #FAF6BD;',
    'stroke: #F9F3A1;',
    'stroke-width: 1px',
  '}',

  '.blocklyCommentTarget {',
    'fill: transparent;',
    'stroke: #F9F3A1;',
  '}',

  '.blocklyCommentTargetFocused {',
    'fill: none;',
  '}',

  '.blocklyCommentHandleTarget {',
    'fill: none;',
  '}',

  '.blocklyCommentHandleTargetFocused {',
    'fill: transparent;',
  '}',

  '.blocklyCommentTextarea {',
    'background-color: #FAF6BD;',
    'border: 0;',
    'outline: 0;',
    'margin: 0;',
    'padding: 3px;',
    'resize: none;',
    'display: block;',
    'color: $colour_text;',
    'overflow: hidden;',
    'font-size: 12pt;',
    'line-height: 22px;',
  '}',

  '.blocklyUneditableComment {',
    'fill: $colour_text;',
  '}',

  '.blocklyCommentDeleteIcon {',
    'cursor: pointer;',
    'fill: #000;',
    'display: none',
  '}',

  '.blocklyFocused > .blocklyCommentDeleteIcon, .blocklyCommentBubble > .blocklyCommentDeleteIcon {',
    'display: block',
  '}',

  '.blocklyDeleteIconShape.blocklyDeleteIconHighlighted {',
    'fill: rgba(255, 255, 255, 0.20);',
  '}',

  '.blocklyCommentDeleteIcon {',
    'cursor: pointer;',
    'fill: #000;',
    'display: none',
  '}',

  '.blocklySelected > .blocklyCommentDeleteIcon {',
    'display: block',
  '}',

  '.blocklyHtmlInput {',
    'border: none;',
    'font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;',
    'font-size: 12pt;',
    'height: 100%;',
    'margin: 0;',
    'outline: none;',
    'box-sizing: border-box;',
    'width: 100%;',
    'text-align: center;',
    'color: $colour_text;',
    'font-weight: bold;',
  '}',

  '.blocklyMainBackground {',
    'stroke-width: 1;',
    'stroke: #c6c6c6;',  /* Equates to #ddd due to border being off-pixel. */
    'touch-action: none;',
  '}',

  '.blocklyMutatorBackground {',
    'fill: #fff;',
    'stroke: #ddd;',
    'stroke-width: 1;',
  '}',

  '.blocklyFlyoutBackground {',
    'fill: #e4e4e4;',
  '}',

  '.blocklyTransparentBackground {',
    'opacity: 0;',
  '}',

  '.blocklyMainWorkspaceScrollbar {',
    'z-index: 20;',
  '}',

  '.blocklyFlyoutScrollbar {',
    'z-index: 30;',
  '}',

  '.blocklyScrollbarHorizontal, .blocklyScrollbarVertical {',
    'position: absolute;',
    'outline: none;',
    'touch-action: none;',
  '}',

  '.blocklyScrollbarBackground {',
    'opacity: 0;',
  '}',

  '.blocklyScrollbarHandle {',
    'fill: $colour_scrollbar;',
  '}',

  '.blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyScrollbarHandle:hover {',
    'fill: $colour_scrollbarHover;',
  '}',

  '.blocklyZoom>image {',
    'opacity: 1;',
  '}',

  /* Darken flyout scrollbars due to being on a grey background. */
  /* By contrast, workspace scrollbars are on a white background. */
  '.blocklyFlyout .blocklyScrollbarHandle {',
    'fill: #bbb;',
  '}',

  '.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyFlyout .blocklyScrollbarHandle:hover {',
    'fill: #aaa;',
  '}',

  '.blocklyInvalidInput {',
    'background: #faa;',
  '}',

   '.blocklyAngleCircle {',
     'stroke: #fff;',
     'stroke-width: 1;',
     'fill: #000;',
   '}',

  '.blocklyAngleCenterPoint {',
    'stroke: #fff;',
    'stroke-width: 1;',
    'fill: #fff;',
  '}',

  '.blocklyAngleDragHandle {',
    'stroke: #fff;',
    'stroke-width: 5;',
    'stroke-opacity: 0.25;',
    'fill: #fff;',
    'cursor: pointer;',
  '}',


  '.blocklyAngleMarks {',
    'stroke: #fff;',
    'stroke-width: 1;',
    'stroke-opacity: 0.5;',
  '}',

  '.blocklyAngleGauge {',
    'fill: #fff;',
    'fill-opacity: 0.20;',
  '}',

  '.blocklyAngleLine {',
    'stroke: #fff;',
    'stroke-width: 1;',
    'stroke-linecap: round;',
    'pointer-events: none;',
  '}',

  '.blocklyContextMenu {',
    'border-radius: 4px;',
    'max-height: 100%;',
  '}',

  '.blocklyDropdownMenu {',
    'padding: 0 !important;',
  '}',

  '.blocklyDropDownNumPad {',
    'background-color: $colour_numPadBackground;',
  '}',

  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
    'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px;',
  '}',

  /* Category tree in Toolbox. */
  '.blocklyToolboxDiv {',
    'background-color: $colour_toolbox;',
    'color: $colour_toolboxText;',
    'overflow-x: visible;',
    'overflow-y: auto;',
    'position: absolute;',
    'font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;',
    'user-select: none;',
    '-moz-user-select: none;',
    '-ms-user-select: none;',
    '-webkit-user-select: none;',
    'z-index: 40;', /* so blocks go over toolbox when dragging */
    //'z-index: 70;', /* so blocks go under toolbox when dragging */
    '-webkit-tap-highlight-color: transparent;', /* issue #1345 */
  '}',

  '.blocklyTreeRoot {',
    'padding: 4px 0;',

  '}',

  '.blocklyTreeRoot:focus {',
    'outline: none;',
  '}',

  '.blocklyTreeRow {',
    'height: 22px;',
    'line-height: 22px;',
    'margin-bottom: 3px;',
    'padding-right: 8px;',
    'white-space: nowrap;',
  '}',

  '.blocklyHorizontalTree {',
    'float: left;',
    'margin: 1px 5px 8px 0;',
  '}',

  '.blocklyHorizontalTreeRtl {',
    'float: right;',
    'margin: 1px 0 8px 5px;',
  '}',

  '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',
    'margin-left: 8px;',
  '}',

  '.blocklyTreeRow:not(.blocklyTreeSelected):hover {',
    'background-color: #e4e4e4;',
  '}',

  '.blocklyTreeSeparator {',
    'border-bottom: solid #e5e5e5 1px;',
    'height: 0;',
    'margin: 5px 0;',
  '}',

  '.blocklyTreeSeparatorHorizontal {',
    'border-right: solid #e5e5e5 1px;',
    'width: 0;',
    'padding: 5px 0;',
    'margin: 0 5px;',
  '}',

  '.blocklyTreeIcon {',
    'background-image: url(<<<PATH>>>/sprites.png);',
    'height: 16px;',
    'vertical-align: middle;',
    'width: 16px;',
  '}',

  '.blocklyTreeIconClosedLtr {',
    'background-position: -32px -1px;',
  '}',

  '.blocklyTreeIconClosedRtl {',
    'background-position: 0 -1px;',
  '}',

  '.blocklyTreeIconOpen {',
    'background-position: -16px -1px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedLtr {',
    'background-position: -32px -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedRtl {',
    'background-position: 0 -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconOpen {',
    'background-position: -16px -17px;',
  '}',

  '.blocklyTreeIconNone,',
  '.blocklyTreeSelected>.blocklyTreeIconNone {',
    'background-position: -48px -1px;',
  '}',

  '.blocklyTreeLabel {',
    'cursor: default;',
    'font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;',
    'font-size: 16px;',
    'font-weight: bold;',
    'padding: 0 3px;',
    'vertical-align: middle;',
  '}',

  '.blocklyToolboxDelete .blocklyTreeLabel {',
    'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyTreeSelected .blocklyTreeLabel {',
    'color: #fff;',
  '}',

  '.blocklyTreeSelected .blocklyTreeIcon {',
    'color: #fff;',
  '}',

  '.blocklyTreeSelected .blocklyTreeIcon {',
  'background-image: url("images/pico_logo_beyaz.svg");',
  '}',



  /* Colour Picker Field */

  /* Copied from: goog/css/colorpicker-simplegrid.css */
  /*
   * Copyright 2007 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /* Author: pupius@google.com (Daniel Pupius) */

  /*
    Styles to make the colorpicker look like the old gmail color picker
    NOTE: without CSS scoping this will override styles defined in palette.css
  */
 '.blocklyColourTable {',
    'outline: none;',
    'border-radius: 11px;',
    'margin-bottom: 20px;',
    'border-collapse: collapse;',
  '}',

  '.blocklyColourTable > tr > td {',
    'height: 22px;',
    'width: 22px;',
    'margin: 0;',
    'padding: 2px;',
    'border: 0;',
    'text-align: center;',
    'cursor: pointer;',
  '}',

  '.blocklyColourTable > tr > td > div {',
    'position: relative;',
    'height: 22px;',
    'width: 22px;',
    'border-radius: 4px;',
    'border: 2px solid rgba(0,0,0,.1);',
  '}',

  '.blocklyColourTable > tr > td:hover > div {',
    'border: 1px solid #FFF;',
    'box-sizing: border-box;',
  '}',

  '.blocklyColourTable > tr > td > .blocklyColourSelected {',
    'border: 1px solid #000;',
    'box-sizing: border-box;',
    'color: #fff;',
  '}',

  /* Copied from: goog/css/menu.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menu {',
    'background: #fff;',
    'cursor: default;',
    'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
    'margin: 0;',
    'outline: none;',
    'padding: 4px 0;',
    'position: absolute;',
    'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
    'box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);',
  '}',

  '.blocklyDropDownDiv .goog-menu {',
    'cursor: default;',
    'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
    'outline: none;',
    'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
  '}',

  '.blocklyDropDownDiv .goog-menu {',
    'cursor: default;',
    'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
    'outline: none;',
    'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
  '}',

  /* Copied from: goog/css/menuitem.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuItemRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  /**
   * State: resting.
   *
   * NOTE(mleibman,chrishenry):
   * The RTL support in Closure is provided via two mechanisms -- "rtl" CSS
   * classes and BiDi flipping done by the CSS compiler.  Closure supports RTL
   * with or without the use of the CSS compiler.  In order for them not to
   * conflict with each other, the "rtl" CSS classes need to have the #noflip
   * annotation.  The non-rtl counterparts should ideally have them as well,
   * but, since .goog-menuitem existed without .goog-menuitem-rtl for so long
   * before being added, there is a risk of people having templates where they
   * are not rendering the .goog-menuitem-rtl class when in RTL and instead
   * rely solely on the BiDi flipping by the CSS compiler.  That's why we're
   * not adding the #noflip to .goog-menuitem.
   */
  '.blocklyWidgetDiv .goog-menuitem, ',
  '.blocklyDropDownDiv .goog-menuitem {',
    'color: #000;',
    'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
    'list-style: none;',
    'margin: 0;',
     /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
    'padding: 5px 7em 5px 28px;',
    'white-space: nowrap;',
  '}',

  '.blocklyDropDownDiv .goog-menuitem {',
    'color: #fff;',
    'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
    'font-weight: bold;',
    'list-style: none;',
    'margin: 0;',
     /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
    'min-width: 7em;',
    'padding: 5px 5px 5px 28px;',
    'white-space: nowrap;',
  '}',

  /* BiDi override for the resting state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl, ',
  '.blocklyDropDownDiv .goog-menuitem.goog-menuitem-rtl {',
     /* Flip left/right padding for BiDi. */
    'padding-left: 5px;',
    'padding-right: 28px;',
  '}',

  /* If a menu doesn't have checkable items or items with icons,
   * remove padding.
   */
  '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem, ',
  '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem, ',
  '.blocklyDropDownDiv .goog-menu-nocheckbox .goog-menuitem, ',
  '.blocklyDropDownDiv .goog-menu-noicon .goog-menuitem { ',
    'padding-left: 12px;',
  '}',

  /* If a menu doesn't have items with shortcuts, leave just enough room for
   * submenu arrows, if they are rendered.
   */
  '.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem, ',
  '.blocklyDropDownDiv .goog-menu-noaccel .goog-menuitem {',
    'padding-right: 20px;',
  '}',

  /* State: disabled. */
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel, ',
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content, ',
  '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-accel, ',
  '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-content {',
    'color: #ccc !important;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon, ',
  '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-icon {',
    'opacity: 0.3;',
    'filter: alpha(opacity=30);',
  '}',

  /* State: hover. */
  '.blocklyWidgetDiv .goog-menuitem-highlight, ',
  '.blocklyWidgetDiv .goog-menuitem-hover {',
    'background-color: #d6e9f8;',
     /* Use an explicit top and bottom border so that the selection is visible',
      * in high contrast mode. */
    'border-color: #d6e9f8;',
    'border-style: dotted;',
    'border-width: 1px 0;',
    'padding-bottom: 4px;',
    'padding-top: 4px;',
  '}',

  '.blocklyDropDownDiv .goog-menuitem-highlight, ',
  '.blocklyDropDownDiv .goog-menuitem-hover {',
    'background-color: rgba(0, 0, 0, 0.2);',
  '}',

  /* State: selected/checked. */
  '.blocklyWidgetDiv .goog-menuitem-checkbox, ',
  '.blocklyWidgetDiv .goog-menuitem-icon, ',
  '.blocklyDropDownDiv .goog-menuitem-checkbox, ',
  '.blocklyDropDownDiv .goog-menuitem-icon {',
    'background-repeat: no-repeat;',
    'height: 16px;',
    'left: 6px;',
    'position: absolute;',
    'right: auto;',
    'vertical-align: middle;',
    'width: 16px;',
  '}',

  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-icon {',
     /* Client apps may override the URL at which they serve the sprite. */
    'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;',
    'position: static;', /* Scroll with the menu. */
    'float: left;',
    'margin-left: -24px;',
  '}',

  /* BiDi override for the selected/checked state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {',
     /* Flip left/right positioning. */
     'float: right;',
     'margin-left: 6px;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox, ',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon, ',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox, ',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {',
    'float: right;',
    'margin-right: -24px;',
  '}',


  /* Keyboard shortcut ("accelerator") style. */
  '.blocklyWidgetDiv .goog-menuitem-accel, ',
  '.blocklyDropDownDiv .goog-menuitem-accel {',
    'color: #999;',
     /* Keyboard shortcuts are untranslated; always left-to-right. */
     /* #noflip */
    'direction: ltr;',
    'left: auto;',
    'padding: 0 6px;',
    'position: absolute;',
    'right: 0;',
    'text-align: right;',
  '}',

  /* BiDi override for shortcut style. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel, ',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-accel {',
     /* Flip left/right positioning and text alignment. */
    'left: 0;',
    'right: auto;',
    'text-align: left;',
  '}',

  /* Mnemonic styles. */
  '.blocklyWidgetDiv .goog-menuitem-mnemonic-hint, ',
  '.blocklyDropDownDiv .goog-menuitem-mnemonic-hint {',
    'text-decoration: underline;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-mnemonic-separator, ',
  '.blocklyDropDownDiv .goog-menuitem-mnemonic-separator {',
    'color: #999;',
    'font-size: 12px;',
    'padding-left: 4px;',
  '}',

  /* Copied from: goog/css/menuseparator.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuSeparatorRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menuseparator, ',
  '.blocklyDropDownDiv .goog-menuseparator {',
    'border-top: 1px solid #ccc;',
    'margin: 4px 0;',
    'padding: 0;',
  '}',

  /* pxtblockly: Field slider. */
  '.blocklyDropDownDiv .goog-slider-horizontal {',
    'margin: 8px;',
    'height: 22px;',
    'width: 150px;',
    'position: relative;',
    'outline: none;',
    'border-radius: 11px;',
    'margin-bottom: 20px;',
    'background: #547AB2',
  '}',
  '.blocklyDropDownDiv .goog-slider-horizontal .goog-slider-thumb {',
     'width: 26px;',
     'height: 26px;',
     'margin-top: -1px;',
     'position: absolute;',
     'background-color: white;',
     'border-radius: 100%;',
     '-webkit-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
     '-moz-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
     'box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
     'cursor: pointer',
  '}',
  '.blocklyFieldSliderLabel {',
    'font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;',
    'font-size: 0.65rem;',
    'color: $colour_toolboxText;',
    'margin: 8px;',
  '}',
  '.blocklyFieldSliderLabelText {',
    'font-weight: bold;',
  '}',
  '.blocklyFieldSliderReadout {',
    'margin-left: 10px;',
  '}',

  // pxtblockly: Adding blocklyHighlighted CSS classes for outlining blocks
  '.blocklyHighlighted>.blocklyPath {',
    'stroke: #ff8b27;',
    'stroke-width: 5px;',
  '}',

  // pxt-blockly: Argument editor
  '.argumentEditorRemoveIcon {',
    'position: absolute;',
    'width: 24px;',
    'height: 24px;',
    'top: -40px;',
    'left: 50%;',
    'margin-left: -12px;',
    'cursor: pointer;',
  '}',

  '.functioneditor i.argumentEditorTypeIcon {',
    'position: absolute;',
    'width: 24px;',
    'height: 24px;',
    'top: 40px;',
    'left: 50%;',
    'margin-left: -12px;',
  '}',

  '.blocklyWidgetDiv.fieldTextInput.argumentEditorInput {',
    'overflow: visible;',
  '}',

  // pxt-blockly: Bold function names
  '.functionNameText {',
    'font-weight: bold;',
  '}',

  // Quote for string field
  '.field-text-quote {',
    'fill: #a31515 !important;',
  '}',

  ''
];
