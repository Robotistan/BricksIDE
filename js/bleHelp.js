'use strict';
var block = true;

var Forward = "Forward";
var Back = "Back";
var Okey = "Okay";

function StartBleHelp() {
    introJs().setOptions(
        {
            steps:
                [
                    {
                        element: document.querySelector('#bleIntro'),
                        title: "Download LightBlue App",
                        intro: '<div><img src="images/bleHelp1Gif.gif" alt="BLEHelpGif1"></div>',
                    },
                    {
                        element: document.querySelector('#bleIntro'),
                        title: "Connecting the board to the App",
                        intro: '<div><img src="images/bleHelp2Gif.gif" alt="BLEHelpGif2"></div>',
                    },
                    {
                        element: document.querySelector('#bleIntro'),
                        title: "Select Readable",
                        intro: '<div><img src="images/bleHelp3Gif.gif" alt="BLEHelpGif3"></div>',},
                    {
                        element: document.querySelector('#bleIntro'),
                        title: "Select Writable",
                        intro: '<div><img src="images/bleHelp4Gif.gif" alt="BLEHelpGif4"></div>',
                    },
                ],
            tooltipClass: 'customTooltip',
            tooltipPosition: 'right',
            nextLabel: Forward,
            prevLabel: Back,
            doneLabel: Okey,
        }).start();
}

function bleHelp(button) {
    $("#bleHelpModal").modal('show');
}

function registerButtonCallbacks() { 
    var workspace = Blockly.getMainWorkspace();
    workspace.registerButtonCallback("myFirstButtonPressed", function(button) {
        if (button.callbackKey_ === 'myFirstButtonPressed') {
            bleHelp(button);
        }
    });
}

window.addEventListener('load', registerButtonCallbacks);



function bleHelpSample(button) {
  LoadWorkspaceCode(anonymouseLightingCode);
}

function registerButtonCallbacksSample() { 
  var workspace = Blockly.getMainWorkspace();
  workspace.registerButtonCallback("myFirstButtonPressedSample", function(button) {
      if (button.callbackKey_ === 'myFirstButtonPressedSample') {
          bleHelpSample(button);
      }
  });
}

window.addEventListener('load', registerButtonCallbacksSample);
