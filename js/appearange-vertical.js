'use strict';

var StartBlockId = ""
var selectedTheme = "chrome";
var selectedFontSize = 16;
var lang = "tr"; 
var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var startCode = false;
var workspace = null;
var startXmlDom;
var startXmlText;
var xmlText;
var storage;   
var isRunCode = true;
var latestCode = "";
var myInterpreter = null;
var highlightPause = false;
var hasMoreCode = false;
var highlightblockid = "";
var exhighlightblockid = "";
var editorType = "Python";
var editorBlockPython;
var editorPython;
var isShowEditorBlockPython = false;
var isShowDocumentsPanel = false;
var block = true; 
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

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

  if (isSafari || isFirefox) {
  $("#modalSafari").modal('show');
  }

  storage = window.localStorage;
  storage.setItem("Page", "Vertical");
  setAppearance();
  setEditor();

  Panel.init();
   
  $(document).on('click', '.tab-controller', function() {
    Panel.togglePanel();
  });

  Panel.hidePanel();

  document.querySelector('#txtConsole').value = ">";

  let editor = String(window.location).split("?")[1];
  if(editor == "1")
    OpenPythonEditor();

    var storage = window.localStorage;
    
    if(block == true)
    {
      if(storage.getItem("isFirstTime") != "false")
      {
          storage.setItem("isFirstTime", "false");
          StartIntro();
      }
    }
}

function setEditor()
{
    let height = window.innerHeight * 0.85;
    let width = window.innerWidth * 0.98;

    // editorBlockPython
    editorBlockPython = ace.edit("editorBlockPython");
    editorBlockPython.session.setMode("ace/mode/python");
    editorBlockPython.setTheme("ace/theme/" + selectedTheme);
    editorBlockPython.setFontSize(selectedFontSize);
    editorBlockPython.setHighlightActiveLine(true);
    editorBlockPython.session.setUseWorker(false);
    editorBlockPython.setShowPrintMargin(false);
    editorBlockPython.setReadOnly(true);

    editorBlockPython.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        fontFamily: "Source_Code_Pro",
    });

    document.querySelector("#editorBlockPython").style.height = height + "px";
    document.querySelector("#editorBlockPython").style.width = width + "px";
    editorBlockPython.resize();

    // editorPython
    editorPython = ace.edit("editorPython");
    editorPython.session.setMode("ace/mode/python");
    editorPython.setTheme("ace/theme/" + selectedTheme);
    editorPython.setFontSize(selectedFontSize);
    editorPython.setHighlightActiveLine(true);
    editorPython.session.setUseWorker(false);
    editorPython.setShowPrintMargin(false);

    editorPython.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    document.querySelector("#editorPython").style.height = height + "px";
    document.querySelector("#editorPython").style.width = width + "px";
    editorPython.resize();
}

function setAppearance() {
  setTimeout(function() {
      fadeOutEffect();
  }, 500);

  //var availHeight = window.screen.availHeight;
  var availWidth = window.screen.availWidth;
  var myStartScale = 0.5 + ((availWidth - 1000) / 300) * 0.1;

  var height = innerHeight * 0.9;

  $("#BlocksPannel").height(height);
  $("#blocklyDiv").height(height);

  var toolbox = document.getElementById("toolbox");

  var options = { 
      collapse : false, 
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
          startScale: myStartScale,
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
  xmlText = Blockly.Xml.domToText(xmlDom);
  
  if(event.type == "ui")
  {
    var id = event.blockId;

    if(id != null && workspace.getBlockById(id) != null)
    {
      var block = workspace.getBlockById(id);

      if(block.childBlocks_ != null && block.type == "Robotistan_Start")
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

      if(block.childBlocks_ != null && block.type == "Robotistan_Start")
      {
          startCode = Blockly.Arduino.blockToCode(block.childBlocks_[0]);
      }
    }
  }

  if (startXmlText != xmlText) {

    if(xmlText.indexOf("Robotistan_Start") >= 0)
    {
      latestCode = Blockly.Arduino.workspaceToCode(workspace);
      editorBlockPython.setValue(latestCode);  
      editorPython.setValue(latestCode);
    }
    else
    {
      latestCode = "";
      editorBlockPython.setValue(latestCode); 
      editorPython.setValue(latestCode);
    }
  }
}

function OpenPythonEditor()
{
  block = false;
  $("#panelPython").css("display", "block");
  $("#panelBlock").css("display", "none");
  $("#btCode").css('visibility', 'hidden');
  $("#chEditorToogle").attr("checked", true);
}

function OnToogleClick()
{
    if(isShowDocumentsPanel)
      closeDocumentsPanel();

    if(block == true)
    {
      block = false;
      $("#panelPython").css("display", "block");
      $("#panelBlock").css("display", "none");
      $("#btCode").css('visibility', 'hidden');
      $("#editorType").text("Python");
      
      if(isShowEditorBlockPython)
        closeEditorPythonPanel();
    }
    else
    {
      block = true;
      $("#panelPython").css("display", "none");
      $("#panelBlock").css("display", "block");
      $("#btCode").css('visibility', 'visible');
      $("#editorType").text("Block");
    }
}

function ShowDocumentsPanel()
{
  if(isShowDocumentsPanel)
    closeDocumentsPanel();
  else
    openDocumentsPanel();

  if(isShowEditorBlockPython)
    closeEditorPythonPanel();
}

function openDocumentsPanel() {
  isShowDocumentsPanel = true;
  document.getElementById("documentsPanel").style.width = "50vw";

  if(block)
    $("#documentsFrame").attr('src', "examplesblockly/examplesblockly.html");
  else
    $("#documentsFrame").attr('src', "examples/examples.html");
}

function closeDocumentsPanel() 
{
  isShowDocumentsPanel = false;
  document.getElementById("documentsPanel").style.width = "0";
}

function ShowEditorBlockPython()
{
  if(isShowEditorBlockPython)
    closeEditorPythonPanel();
  else
    openEditorPythonPanel();

  if(isShowDocumentsPanel)
    closeDocumentsPanel();
}

function openEditorPythonPanel() {
  isShowEditorBlockPython = true;
  document.getElementById("editorPythonPanel").style.width = "37.5vw";
}

function closeEditorPythonPanel() 
{
  isShowEditorBlockPython = false;
  document.getElementById("editorPythonPanel").style.width = "0";
}

function findwhenplayclickedID(xml) {
  var startIndex = xml.indexOf('<block type="event_whenflagclicked" id="');
  startIndex = startIndex + 40;

  var tmp = xml.substring(startIndex);
  var endIndex = tmp.indexOf('"');
  var id = tmp.substring(0, endIndex);

  return id;
}

var title1 = "Welcome to PicoBricks Code Editor.";
var intro1 = "This is a Block and Python based programming editor.";

var title2 = "Workspace";
var intro2 = "You can write your program with blocks.";

var title3 = "Connect Button";
var intro3 = "Connect Pico Board via Serial Port.";

var title4 = "Run Button";
var intro4 = "Runs your code on Pico Board.";

var title5 = "Stop Button";
var intro5 = "Stops the code from running.";

var title6 = "Python Button";
var intro6 = "Opens the panel showing the python code generated by the block code.";

var title7 = "Documents Button";
var intro7 = "Opens the documents panel"

var Forward = "Forward";
var Back = "Back";
var Okey = "Okay";

function StartIntro() {

    introJs().setOptions(
    {
    steps: 
    [
        {
            title: title1,
            intro: intro1
        }, 
        {
            element: document.querySelector('#blocklyDiv'),
            title: title2,
            intro: intro2
        },
        {
            element: document.querySelector('#btConnect'),
            title: title3,
            intro: intro3
        },
        {
            element: document.querySelector('#btRun'),
            title: title4,
            intro: intro4
        },
        {
            element: document.querySelector('#btStopCode'),
            title: title5,
            intro: intro5
        },
        {
            element: document.querySelector('#btCode'),
            title: title6,
            intro: intro6
        },
        {
            element: document.querySelector('#btDocuments'),
            title: title7,
            intro: intro7
        }
    ],

    tooltipClass: 'customTooltip',

    nextLabel: Forward, 
    prevLabel: Back, 
    doneLabel: Okey,
  }).start();  
}