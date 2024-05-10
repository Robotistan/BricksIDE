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