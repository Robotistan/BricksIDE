function UploadFirmware()
{
  $("#modalFirmware").modal('show');
}

function UploadMobile()
{
    showProgressPanel(true);

    $.get('pythonFiles/mobil.txt', function(data) {
      saveCode(data, "main.py");
    });
}

async function RexFirmware()
{
  fetch('pythonFiles/flash_download_tool_3.9.5.zip')
    .then(res => res.blob())
    .then(async blob => { await saveFile(blob, "flash_download_tool_3.9.5.zip"); });

    $("#modalFirmware").modal('hide');
}

function Upload_MPU60_Library()
{
  if(isConnected)
  {
    showProgressPanel(true);

    $.get('pythonFiles/mpu6050_.txt', function(data) {
      saveCode(data, "mpu6050.py");
    });
  }
  else{
    showModalDialog();
  }
}

function library_Modal(){
  $("#modalLibrary").modal('show');
}

function Upload_REX_Library()
{
  if(isConnected)
  {
    showProgressPanel(true);

    $.get('pythonFiles/REX.txt', function(data) {
      saveCode(data, "rex.py");
    });
  }
  else{
    showModalDialog();
  }
}

function LoadCode(code)
{
  xmlText = code;
  var dom = Blockly.Xml.textToDom(xmlText);
  Blockly.Xml.domToWorkspace(workspace, dom);
    
  if(window.localStorage.getItem("Page") == "Vertical")
      loadCode();
}

function loadCode() {
    latestCode = Blockly.Arduino.workspaceToCode(workspace);
    editorBlockPython.setValue(latestCode);  
}

function dispFile(contents) {
  if(block)
  {
    xmlText = contents;
    var dom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(workspace, dom);
    
    if(window.localStorage.getItem("Page") == "Vertical")
      loadCode();
  }
  else
  {
    editorPython.setValue(contents);
  }
}

function clickElem(elem) {
  // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
  var eventMouse = document.createEvent("MouseEvents")
  eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  elem.dispatchEvent(eventMouse)
}

function NewProject()
{
  if(block)
  {
      if(xmlText != undefined)
        $("#modalNewProjectConfirm").modal('show');  
  }
  else
  { 
      if(editorPython.getValue() != "")
        $("#modalNewProjectConfirm").modal('show');  
  }

  $("#projectName").text("RexProject");
}

function NewProjectConfirm()
{
  if(block)
  {
     $("#modalNewProjectConfirm").modal('hide');  

      workspace.clear();
        
      if(window.localStorage.getItem("Page") == "Vertical")
          editorBlockPython.setValue(""); 
  }
  else
  { 
    $("#modalNewProjectConfirm").modal('hide');  
      editorPython.setValue(""); 
  }
}

function OpenProject(func) {
  readFile = function(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      fileInput.func(contents)
      document.body.removeChild(fileInput)
    }
    reader.readAsText(file)

    var fileName = file.name;
    fileName = fileName.replace(".rex", "");
    fileName = fileName.replace(".py", "");
    $("#projectName").text(fileName);
  }
  fileInput = document.createElement("input")
  fileInput.type = 'file'
  fileInput.style.display = 'none'
  fileInput.onchange = readFile
  fileInput.func = func
  document.body.appendChild(fileInput)
  clickElem(fileInput);
}

async function SaveProject()
{
  if(block)
  {
    if(xmlText == '<xml xmlns="https://developers.google.com/blockly/xml"/>' || '')
      return;

    const fileHandle = await window.self.showSaveFilePicker({
                                      suggestedName: 'RexProject.rex',
                                      types: [{
                                        description: 'rexblocks',
                                        accept: {
                                          'text/plain': ['.rex'],
                                        },
                                      }],
                                    })

    const fileStream = await fileHandle.createWritable();
    await fileStream.write(new Blob([xmlText], {type: "text/plain"}));
    await fileStream.close();

    var fileName = fileHandle.name;
    fileName = fileName.replace(".rex", "");
    $("#projectName").text(fileName);
  }
  else
  {
    if(latestCode == "")
      return;

    const fileHandle = await window.self.showSaveFilePicker({
                                    suggestedName: 'RexProject.py',
                                    types: [{
                                        description: 'Python',
                                        accept: {
                                          'text/plain': ['.py'],
                                        },
                                      }],
                                    })

    const fileStream = await fileHandle.createWritable();
    await fileStream.write(new Blob([latestCode], {type: "text/plain"}));
    await fileStream.close();

    var fileName = fileHandle.name;
    fileName = fileName.replace(".py", "");
    $("#projectName").text(fileName);
  }
}

const saveFile = async (blob, suggestedName) => {
  // Feature detection. The API needs to be supported
  // and the app not run in an iframe.
  const supportsFileSystemAccess =
    'showSaveFilePicker' in window &&
    (() => {
      try {
        return window.self === window.top;
      } catch {
        return false;
      }
    })();
  // If the File System Access API is supported…
  if (supportsFileSystemAccess) {
    try {
      // Show the file save dialog.
      const handle = await showSaveFilePicker({
        suggestedName,
      });
      // Write the blob to the file.
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err) {
      // Fail silently if the user has simply canceled the dialog.
      if (err.name !== 'AbortError') {
        console.error(err.name, err.message);
        return;
      }
    }
  }
};