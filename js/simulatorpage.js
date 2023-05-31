var storage = window.localStorage;   
var lang = "en";  
var readStringData = "";
var isCodeRun = false;

var potRightDown = false;
var potLeftDown = false;

var encRightDown = false;
var encLeftDown = false;

var potValue = 0;
var potAnim = false;

var button1Value = 0;
var resetButtonValue = 0; 

var ir_value = '0';

var tick = new Audio('tick.wav');
tick.volume = 1;

document.getElementById("LDRLabel").innerHTML =      "☀️ Light: ";
document.getElementById("tempLabel").innerHTML =     "🔥 Temperature: ";
document.getElementById("humodityLabel").innerHTML = "💧 Humidity: ";
document.getElementById("potLabel").innerHTML =      "🔘 Potentiometer: ";
document.getElementById("irLabel").innerHTML =       "⛒ Infrared: ";

function IRButtonClick(value)
{
    ir_value = value;
}

let height = window.innerHeight * 0.90;
let width = window.innerWidth * 0.90;

document.querySelector("#simulatorColumn").style.height = height + "px";

/* Define function for escaping user input to be treated as 
a literal string within a regular expression */
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
 
/* Define functin to find and replace specified term with replacement string */
function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

var screenBuffer = "";
var gXPos = 0;
var gYPos = 0;

function writeTextScreen(xPos, yPos, value)
{
    xPos += 75;
    yPos += 25;

    gXPos = xPos;
    gYPos = yPos;
    screenBuffer = value;

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function showScreen()
{
    text(gXPos, gYPos, screenBuffer);

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function clearScreen()
{
    text(0, 0, "");
    screenBuffer = "";
    gXPos = 0;
    gYPos = 0;

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function readIR()
{
    return ir_value;
}

function readButton1()
{	
	return button1Value;
}

function resetButton()
{	
	return resetButtonValue;
}

function readLightSersor()
{
	var slider = document.getElementById("lightSourceInput");
    return slider.value;
}

function readPotentiometer()
{
	var slider = document.getElementById("potSourceInput");
    return slider.value;
}

function readTemperature()
{
	var slider = document.getElementById("tempSourceInput");
    return slider.value;
}

function readHumidity()
{
	var slider = document.getElementById("humoditySourceInput");
    return slider.value;
}

function delaySecond(time)
{
    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, time * 1000);
    }
}

var myPlayer;

function soundBuzzer(note)
{
    var canvasBuzzer = document.getElementById("canvasBuzzer");
    canvasBuzzer.style.backgroundColor = "#ffffff97";

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audio = new AudioContext();

    myPlayer = new SoundPlayer(audio);
    myPlayer.play(note, 0.8, "sine");

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function buzzerInterval(noteTime)
{
    var canvasBuzzer = document.getElementById("canvasBuzzer");

    // Notes
    var interval = 0;

    if (noteTime == 1)
        interval = 0.250;
    else if (noteTime == 2)
        interval = 0.500;
    else if (noteTime == 3)
        interval = 1;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audio = new AudioContext();

    myPlayer.stop(interval);

    setTimeout(function() {
        canvasBuzzer.style.backgroundColor = "transparent";
    }, 1000 * interval);

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 1000);
    }
}

function setLedValue(value)
{
    var canvasRedLed = document.getElementById("canvasRedLed");
    if (value == 0) {
        canvasRedLed.style.backgroundColor = "#683939";
    } else {
        canvasRedLed.style.backgroundColor = "#ff000099";
    }

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function setRelayValue(value)
{
    var relayCanvas = document.getElementById("canvasRelay");
  
    if (value == 0) {
        relayCanvas.style.backgroundColor = "black";
    } else {
        relayCanvas.style.backgroundColor = "red";
    }

    tick.play();

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function setPicoLedValue(value)
{
    if(value == 1)
    {
        $("#picoLed").style.fill = "yellow";
    }
    else
    {
        $("#picoLed").style.fill = "transparent";
    }

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function setServo1Value()
{
    var canvasMotor = document.getElementById("canvasMotor1");
    canvasMotor.style.backgroundColor = "#88cc00aa";

    setTimeout(function() {  
        canvasMotor.style.backgroundColor = "transparent";
    }, 500);

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function setServo2Value()
{
    var canvasMotor = document.getElementById("canvasMotor2");
    canvasMotor.style.backgroundColor = "#88cc00aa";

    setTimeout(function() {  
        canvasMotor.style.backgroundColor = "transparent";
    }, 500);

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function setMotor1Value(speed)
{   
    var canvasMotor = document.getElementById("canvasMotor1");

    if(speed > 0)
        canvasMotor.style.backgroundColor = "#88cc00aa";
    else
        canvasMotor.style.backgroundColor = "transparent";

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function setMotor2Value(speed)
{   
    var canvasMotor = document.getElementById("canvasMotor2");

    if(speed > 0)
        canvasMotor.style.backgroundColor = "#88cc00aa";
    else
        canvasMotor.style.backgroundColor = "transparent";

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}


function neoPixelColour(value){

    var canvasRgbLed = document.getElementById("canvasRgbLed");

    if(value == "#000000")
        canvasRgbLed.style.backgroundColor = "transparent";
    else
        canvasRgbLed.style.backgroundColor = value;

    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }
}

function neoPixelClear()
{
    var canvasRgbLed = document.getElementById("canvasRgbLed");
    canvasRgbLed.style.backgroundColor = "transparent";
    
    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() {  
            StateControl();
            StepCode();  
        }, 50);
    }  
}

function PicoBricksStart()
{   
    if(hasMoreCode == true && isRunCode == true)
    {
        setTimeout(function() { 
            StateControl(); 
            StepCode();  
        }, 50);
    }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// button1
var button1 = document.getElementById("canvasButton1");

button1.addEventListener("mousedown", function() {
    button1Value = 1;
    button1.style.backgroundColor = "yellow";
});

button1.addEventListener("mouseup", function() {
    button1Value = 0;
    button1.style.backgroundColor = "black";
});

// button2
var button2 = document.getElementById("canvasResetButton");

button2.addEventListener("mousedown", function() {
    resetButtonValue = 1;
    button2.style.backgroundColor = "yellow";
});

button2.addEventListener("mouseup", function() {
    resetButtonValue = 0;
    button2.style.backgroundColor = "black";
});
