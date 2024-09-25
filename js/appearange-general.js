function OpenConnectionForm()
{
  if(isConnected)
    showConfirmDialog();
  else
    connectSerial();  
}

function GotoEditor()
{
  document.querySelector("#modalConnection").style.display = 'none';
}

function showProgressPanel(isSave)
{
  $("#btSaving").css("visibility", "visible");
  
  if(isSave)
    $("#progressBarDiv").css("visibility", "visible");
}

function hideProgressPanel()
{
  $("#btSaving").css("visibility", "hidden");
  $("#progressBarDiv").css("visibility", "hidden");
}

function closeProgressPanel()
{
    document.querySelector("#modalProgress").style.display = "none";
}

function showModalDialog()
{
  $("#modalDialog").modal('show');
}

function showConfirmDialog()
{
  $("#modalConfirm").modal('show');
}

function ConnectedSerialPort()
{
  isConnected = true;
  $("#btConnect").removeClass("notConnectedButton");
  $("#btConnect").addClass("connectedButton");
}

function DisconnectedSerialPort()
{
  isConnected = false;
  $("#btConnect").removeClass("connectedButton");
  $("#btConnect").addClass("notConnectedButton");
}

function RunCode()
{
  if(isConnected)
  {
    showProgressPanel(false);
    ClearConsole();

    var pythoncode = "";
    if(block)
      pythoncode = latestCode;
    else
      pythoncode =  editorPython.getValue();

    if(pythoncode != "")
    {
      sendCommand(pythoncode);
    }
  } 
  else if(blueTooth && blueTooth.isConnected()){
    var pythoncode = "";
    
    if(block)
      pythoncode = latestCode;
    else
      pythoncode = editorPython.getValue();

    if(pythoncode != "")
    {
      saveCodeBLE(pythoncode, "code.py");
    }
  }
  else
  {
    showModalDialog();
  }
}

function SaveCode()
{
  if(isConnected)
  {
    showProgressPanel(true);

    var pythoncode = "";
    if(block)
      pythoncode = latestCode;
    else
      pythoncode = editorPython.getValue();

    if(pythoncode != "")
    {
      saveCode(pythoncode, "main.py");
    }
  }
  else
  {
    showModalDialog();
  }
}

async function StopCode()
{
  if(isConnected)
  {
      await writeSerial("04");
      writeSerial("03");
      ClearConsole();
      setTimeout(ClearConsole, 200);
  }
  else if(blueTooth && blueTooth.isConnected()){
        
    let stopCodeBLE = "import machine\nfrom machine import Pin\nfrom machine import PWM\nfrom machine import I2C\nfrom machine import ADC\nfrom picobricks import SSD1306_I2C\nfrom picobricks import WS2812\nfrom math import fabs\n"+

    "i2c = I2C(0, scl=Pin(5), sda=Pin(4))\n"+
    "oled = SSD1306_I2C(128, 64, i2c, addr=0x3c)\n"+
    "oled.fill(0)\n"+

    "ws2812 = WS2812(6, brightness = 1)\n"+
    "ws2812.pixels_fill((0 ,0 ,0 ))\nws2812.pixels_show()\n"+

    "def CalculateAngle(angle):\n"+
    "\tangle = fabs((angle * (6000 / 180)) + 2000)\n"+
    "\tangle = round(angle)\n"+
    "\treturn angle\n\n"+

    "motor_1 = PWM(Pin(21))\n"+
    "motor_1.freq(50)\n"+
    "motor_1.duty_u16(0)\n"+
    "motor_1.duty_u16(0)\n"+

    "pwm_1 = PWM(Pin(21))\n"+
    "pwm_1.freq(50)\n"+
    "pwm_1.duty_u16(CalculateAngle(0))\n"+

    "motor_2 = PWM(Pin(22))\n"+
    "motor_2.freq(50)\n"+
    "motor_2.duty_u16(0)\n"+
    "motor_2.duty_u16(0)\n"+

    "pwm_2 = PWM(Pin(22))\n"+
    "pwm_2.freq(50)\n"+
    "pwm_2.duty_u16(CalculateAngle(0))\n"+

    "buzzer = PWM(Pin(20))\n"+
    "buzzer.duty_u16(0)\n"+

    "print('')\n"+

    "pin_led = machine.Pin(7, machine.Pin.OUT)\n"+
    "pin_led.off()\n"+

    "pin = machine.Pin(12, machine.Pin.OUT)\n"+
    "pin.off()\n";

    saveCodeBLE(stopCodeBLE, "code.py");
    
  }
  else
  {
    showModalDialog();
  }
}

function ClearConsole()
{
  if(window.localStorage.getItem("Page") == "Vertical")
    document.querySelector('#txtConsole').value = ">";
}

function GotoBugReport()
{
    window.location.href = "https://form.jotform.com/231364479275969";
}