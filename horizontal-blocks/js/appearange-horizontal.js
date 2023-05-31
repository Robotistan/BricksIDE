'use strict';

var isRunCode = true;
var latestCode = "";
var myInterpreter = null;
var highlightPause = false;
var hasMoreCode = false;
var highlightblockid = "";
var exhighlightblockid = "";
var startCode = false;
var workspace = null;
var startXmlDom;
var startXmlText;
var xmlText;
var isLiveMode = true;
var StartBlockId = "";
var isShowDocumentsPanel = false;
var storage = window.localStorage;   
var editorType = "Python";
var block = true;

function fadeOutEffect() {
    var fadeTarget = document.querySelector('#preloader');
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            document.querySelector('#preloader').style.display = "none";
        }
    }, 50);
}

function PageLoad() {
  window.localStorage.setItem("Page", "Horizontal");
  setAppearance();
  window.localStorage.setItem('editorType', editorType);
}

function setAppearance() {
    setTimeout(function() {
        fadeOutEffect();
    }, 500);

    var availWidth = window.screen.availWidth;
    var myStartScale = 0.8 + ((availWidth - 1000) / 300) * 0.1;

    var height = innerHeight * 0.9;

    $("#BlocksPannel").height(height);
    $("#blocklyDiv").height(height);

    var toolbox = document.getElementById("toolbox");

    workspace = Blockly.inject('blocklyDiv', {
      comments: false,
      disable: true,
      collapse: false,
      media: 'media/',
      readOnly: false,
      scrollbars: true,
      toolbox: false,
      trashcan: true,
      horizontalLayout: true,
      oneBasedIndex : true,  
      css : true, 
      toolboxPosition: 'end',
      toolbox: toolbox,
      toolboxOptions: {
        color: true,
        inverted: true
      },
      sounds: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: myStartScale,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
      },
      colours: {
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
      },
      scrollbars: {
        horizontal: true,
        vertical: false
      },

      grid:
      {
          spacing: 20,
          length: 2,
          colour: '#ccc',
          snap: true
      }
    });

    workspace.addChangeListener(change);
}

function change(event) {
  var output = document.getElementById('importExport');
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  xmlText = Blockly.Xml.domToText(xmlDom);
  
  if(event.type == "ui")
  {
    var id = event.blockId;

    if(id != null && workspace.getBlockById(id) != null)
    {
      var block = workspace.getBlockById(id);

      if(block.childBlocks_ != null && block.type == "event_whenplayclicked")
      {
          StartBlockId = id;
      }
    }
  }
  else
  {
    var id = StartBlockId;

    if(id == null || id == "")
    {
      id = findwhenplayclickedID(xmlText);
    }

    if(id != null && workspace.getBlockById(id) != null)
    {
      var block = workspace.getBlockById(id);

      if(block.childBlocks_ != null && block.type == "event_whenplayclicked")
      {
          startCode = Blockly.Arduino.blockToCode(block.childBlocks_[0]);
      }
    }
  }

  if (startXmlText != xmlText) {
    if(xmlText.indexOf("event_whenplayclicked") >= 0)
    {
      latestCode = Blockly.Arduino.workspaceToCode(workspace);
    }
    else
    {
      latestCode = "";
    }
  }
}

function findwhenplayclickedID(xml) {

    var startIndex = xml.indexOf('<block type="event_whenplayclicked" id="');
    startIndex = startIndex + 40;

    var tmp = xml.substring(startIndex);

    var endIndex = tmp.indexOf('"');

    var id = tmp.substring(0, endIndex);

    return id;
}

function ShowDocumentsPanel()
{
  if(isShowDocumentsPanel)
    closeDocumentsPanel();
  else
    openDocumentsPanel();
}

function openDocumentsPanel() {
  isShowDocumentsPanel = true;
  document.getElementById("documentsPanel").style.width = "50vw";
}

function closeDocumentsPanel() 
{
  isShowDocumentsPanel = false;
  document.getElementById("documentsPanel").style.width = "0";
}

function connectButtonClick()
{
    OpenConnectionForm();
}