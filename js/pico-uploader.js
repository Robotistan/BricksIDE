let port;
let writer;
let reader;
let textDecoder;
let readableStreamClosed;
let isConnected;
var readValue = "";

var i = 0;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function connectSerial() {
  
  if (navigator.serial) {
    
      try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        writer = port.writable.getWriter();

        textDecoder = new TextDecoderStream();
        readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        reader = textDecoder.readable.getReader();
        
        ConnectedSerialPort();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          
          console.log(value);
          readValue += value;

          setInterval(readTimer, 500);
        }
        
      } 
      catch (err) {
        showModalDialog(err);
        DisconnectedSerialPort();
      }

  } else {
    alert('Web Serial API not supported.');
  }
}

function colorChange(){
  let id = "robotistanStart";

  var block = Blockly.getMainWorkspace().getAllBlocks().find(function(b) {
    return b.customId === id;
  });

  if (block) {
    block.setColour('#FF0000');
    
    setTimeout(function () {
      block.setColour('#ffbf00');
    }, 2000);

    readValue = "";
  }
}

function readTimer()
{
    
    readValue = replaceAll(readValue, "raw REPL; CTRL-B to exit\r\n>", "");
    readValue = replaceAll(readValue, ">", "");
    readValue = replaceAll(readValue, "", "");
    readValue = replaceAll(readValue, "\r\n", "");
    readValue = replaceAll(readValue, "OK", "");
    readValue = replaceAll(readValue, "MPY: soft reboot", "");
    readValue = replaceAll(readValue, "Traceback (most recent call last):  File \"<stdin>\", line 4, in <module>KeyboardInterrupt: ", "");
    //console.log(readValue);
    if(readValue.trim() != "" && readValue.trim() != ">")
    {
      readValue = ">> " + readValue;
      document.querySelector('#txtConsole').value = readValue + "\n" + document.querySelector('#txtConsole').value;
      
      if (readValue.includes("Error") || readValue.includes("error")) {
        colorChange();
      }
      
      readValue = "";
    }
}

async function disConnectSerial() {
  try
  {
    $("#modalConfirm").modal('hide');

    await writeSerial("04");
    reader.cancel();
    reader.releaseLock();
    await readableStreamClosed.catch(() => {  });

    writer.releaseLock();
    await port.close();

    DisconnectedSerialPort();
  }
  catch(err)
  {
    //console.log(err);
  }
}

async function writeSerial(send) {
  let data;
  if(send == "01")
    data = new Uint8Array([0x01]);
  else if(send == "02")
    data = new Uint8Array([0x02]); 
  else if(send == "03")
    data = new Uint8Array([0x03]);
  else if(send == "04")
    data = new Uint8Array([0x04]);

  await writer.write(data);
  await wait(10);
}

async function sendCommand(pythoncode)
{
  try
  {
    await writeSerial("03");

    await writeSerial("03");
    
    for (var i = 0; i < 5; i++ ) {
      await writeSerial("01");
      
    }

    await writeSerial("04");

    await writeSerial("03");
    
    await writeSerial("03");
 
    await exec_raw_no_follow(pythoncode);
    
    //await writeSerial("04");

    hideProgressPanel();
    ClearConsole();
  }
  catch(err)
  {
    console.log("Error: " + err.message)
  }
}

async function saveCode(pythoncode, filename)
{
  await writeSerial("03");
  await writeSerial("03");
  
  for (var i = 0; i < 5; i++ ) {
    await writeSerial("01");
  }
  await writeSerial("04");
  await writeSerial("03");
  await writeSerial("03");

  var command = "f = open('" + filename + "', 'wb')";
  await exec_raw_no_follow(command);

  
  //await writeSerial("04");
  pythoncode = pythoncode.replace(/(\r\n|\n|\r)/gm, '£');
  pythoncode = pythoncode.replace(/"/g, '\\"');
  
  //console.log(pythoncode);

  var elem = document.getElementById("progressBar"); 
  var width = 0;
  var parts = pythoncode.length / 256;
  var incrament = 100 / parts;

  for (var i = 0, s = pythoncode.length; i < s; i += 256) {
    var subcommand = pythoncode.slice(i, Math.min(i + 256, pythoncode.length));
    subcommand = subcommand.replace(/£/g, '\\n');
    //console.log(subcommand);
    await exec_raw_no_follow('f.write("' + subcommand + '")');
    await wait(10);

    width += incrament; 
    console.log(width);
    if(Math.round(width) <= 100)
    {
      elem.innerHTML = Math.round(width) * 1  + '%';
      elem.style.width = Math.round(width) + '%'; 
    }
  }

  await exec_raw_no_follow("f.close()");
  await writeSerial("02");
  hideProgressPanel();

  $("#modalDownload").modal('show');

  ClearConsole();
  setTimeout(ClearConsole, 500);
}

async function exec_raw_no_follow(command) {
  var enc = new TextEncoder(); // always utf-8
  let command_bytes = enc.encode(command);
  //document.querySelector('#txtConsole').value = command + "\n" + document.querySelector('#txtConsole').value;
  // write command
  for (var i = 0, s = command_bytes.length; i < s; i += 256) {
	 let dataToSend = command_bytes.slice(i, Math.min(i + 256, command_bytes.length))
     await writer.write(dataToSend);
     await wait(10);
  }

  await writeSerial("04");
}