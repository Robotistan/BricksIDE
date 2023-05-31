'use strict';

var isRunCode = false;
var latestCode = "";
var myInterpreter = null;
var highlightPause = false;
var hasMoreCode = false;
var highlightblockid = "";
var exhighlightblockid = "";
var isLiveMode = true;
var StartBlockId = ""
var selectedTheme = "chrome";
var selectedFontSize = 18;
var lang = "tr"; 
var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var startCode = false;
var workspace = null;
var startXmlDom;
var startXmlText;
var editorType = "Simulator";
var storage = window.localStorage;   
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

var ActionsList = ["PicoBricksStart", "isProgramRunning", "loopstep", "loopend", "readButton1", "resetButton", 
                    "readLightSersor", "readPotentiometer", "readTemperature", "readHumidity", 
                    "setServo1Value", "setServo2Value", "readIR", "neoPixelClear", "showScreen", "clearScreen"];
                    
var ActionsListWithParam = ["setLedValue", "setRelayValue", "delaySecond", "neoPixelColour","writeTextScreen", "setMotor1Value", "setMotor2Value", "soundBuzzer", "buzzerInterval"];

function PageLoad() {
  storage.setItem("Page", "Simulator");
  setAppearance();
  generateCodeAndLoadIntoInterpreter();
}

function runCode(){  

  if(latestCode.length > 0 && isRunCode == false)
  { 
    latestCode = RemoveHighLight(latestCode);
    
    if(latestCode.indexOf("PicoBricksStart") < 0)
        return;
    console.log(latestCode);
    isRunCode = true;
    $("#btRunCode").toggleClass("runButton runButton-d");
    $("#btStopCode").toggleClass("stopButton-d stopButton");

    $("#btRunCode").prop('disabled', true);

    CreateInterpreter();
    StepCode();
           
    setTimeout(function() {
      StepCode();
    }, 50);     
  }
}

function restart()
{
  if(isRunCode == true)
  {
    isRunCode = false;
    $("#btRunCode").toggleClass("runButton-d runButton");
    $("#btStopCode").toggleClass("stopButton stopButton-d");
    generateCodeAndLoadIntoInterpreter();
  }
}

function isProgramRunning()
{
    return isRunCode;
}

function RemoveHighLight(code)
{
    var result = code;
    
    result = replaceAll(result,"\n", "");
    var tmp = result;
    var lastIndex = 0;
    var arrayIndex = [];

    var count = (result.match(new RegExp("highlightBlock", "g")) || []).length;
    
    for(var i = 0; i < count; i++)
    {
        var index = tmp.indexOf("highlightBlock");

        if((tmp.substring(index + 39, index + 55).indexOf("if") >= 0))
        {
            arrayIndex.push(lastIndex + index);
        }

        tmp = tmp.substring(index + 39, tmp.length);

        lastIndex += index + 39;
    }

    for(var i = 0; i < arrayIndex.length; i++)
    {
        var removeIndex = arrayIndex[i];

        result = result.substring(0, removeIndex) + result.substring(removeIndex + 39, result.length);

        for (var j = 0; j < arrayIndex.length; j++) {
            arrayIndex[j] = arrayIndex[j] - 39;
        }
    }

    return result;
}

function setAppearance() {
  setTimeout(function() {
      fadeOutEffect();
  }, 500);

  var height = innerHeight * 0.9;

  $("#BlocksPannel").height(height);
  $("#blocklyDiv").height(height);

  var toolbox = document.getElementById("toolbox");

  var options = { 
      collapse : true, 
      comments : true, 
      disable : true, 
      maxBlocks : Infinity, 
      trashcan : true, 
      horizontalLayout : false, 
      toolboxPosition : 'start', 
      css : true, 
      media: 'media/',
      rtl : false, 
      scrollbars : true, 
      sounds : true, 
      oneBasedIndex : true, 
      move: {
              scrollbars: true,
              drag: true,
              wheel: true,
            },
      toolbox: toolbox,
      toolboxOptions: {
          color: true,
          inverted: true
        },
      zoom : {
          controls: true,
          wheel: true,
          startScale: 0.80,
          maxScale: 4,
          minScale: 0.25,
          scaleSpeed: 1.1
      },

      grid:
      {
          spacing: 20,
          length: 2,
          colour: '#ccc',
          snap: true
      }
  };

  /* Inject your workspace */ 
  workspace = Blockly.inject('blocklyDiv', options);
  workspace.addChangeListener(change);
}

function change(event) {
  var output = document.getElementById('importExport');
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToText(xmlDom);
  
  if(event.type == "ui")
  {
    var id = event.blockId;

    if(id != null && workspace.getBlockById(id) != null)
    {
      var block = workspace.getBlockById(id);

      if(block.childBlocks_ != null && block.type == "event_whenflagclicked")
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

      if(block.childBlocks_ != null && block.type == "event_whenflagclicked")
      {
          startCode = Blockly.JavaScript.blockToCode(block.childBlocks_[0]);
      }
    }
  }

  if (startXmlText != xmlText) {
      latestCode = Blockly.JavaScript.workspaceToCode(workspace);
  }
}

function findwhenplayclickedID(xml) {

    var startIndex = xml.indexOf('<block type="event_whenflagclicked" id="');
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