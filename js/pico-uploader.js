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
    
    await writeSerial("04");

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




let isConnectedBLE = false;
let connectedDeviceBLE = null;
let characteristic;

function OpenConnectionFormBLE(){
if(isConnectedBLE)
  showConfirmDialogBLE();
else
  connectBLE();  
}

function showConfirmDialogBLE(){
  $("#modalConfirmBLE").modal('show');
}

function ConnectedBLEPort(){
  isConnectedBLE = true;
  $("#btConnectBLE").removeClass("notConnectedButtonBLE");
  $("#btConnectBLE").addClass("connectedButtonBLE");
}
function DisconnectedBLEPort(){
  isConnectedBLE = false;
  $("#btConnectBLE").removeClass("connectedButtonBLE");
  $("#btConnectBLE").addClass("notConnectedButtonBLE");
}

async function sendBluetoothData(data) {
  try {
    const dataSize = 10;
    for (let i = 0; i < data.length; i += dataSize) {
      const newData = data.substring(i, i + dataSize);
      await characteristic.writeValue(new TextEncoder().encode(newData));
    }
  } catch (error) {
    console.error('Veri gönderme hatası:', error);
  }
}

async function connectBLE() {
if (navigator.bluetooth) {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e'],
    });

    connectedDeviceBLE = device;
    await device.gatt.connect();
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
    characteristic = await service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e');
    characteristic2 = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e');

    await characteristic2.startNotifications();

    characteristic2.addEventListener('characteristicvaluechanged', (event) => {
    const value = event.target.value;
    const decodedValue = new TextDecoder().decode(value);
    receiveBluetoothData(decodedValue);
    readValue += decodedValue;
    readTimer();
    });

    ConnectedBLEPort();
    //console.log('Cihaz adı:', device.name);
    //console.log('Cihaz ID:', device.id);
    isConnectedBLE= true;
  } catch (error) {
    console.error('Bluetooth cihazı bulma hatası:', error);
  }
}
}

async function runButtonBLE(){
  let key = 'EoChunk';
  pythoncode = editorPython.getValue();
  await sendBluetoothData(pythoncode + key);
}

async function disconnectBluetooth() {
  try {
    $("#modalConfirmBLE").modal('hide');
    if (connectedDeviceBLE && connectedDeviceBLE.gatt && connectedDeviceBLE.gatt.connected) {
      await connectedDeviceBLE.gatt.disconnect();
      isConnectedBLE = false;
      DisconnectedBLEPort();
      console.log('Bluetooth bağlantısı başarıyla sonlandırıldı.');
    } else {
      console.warn('Bluetooth cihazı zaten bağlı değil.');
    }
  } catch (error) {
    console.error('Bluetooth bağlantısı sonlandırma hatası:', error);
  }
}  

/*function checkConnectionStatus() {
  if (connectedDeviceBLE && connectedDeviceBLE.gatt && connectedDeviceBLE.gatt.connected) {
    console.log('Bluetooth bağlantısı devam ediyor.');
  } else {
    console.warn('Bluetooth bağlantısı kesildi veya yok.');
  }
}
setInterval(checkConnectionStatus, 2000);
*/
