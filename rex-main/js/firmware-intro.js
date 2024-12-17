'use strict';
var block = true;

var Forward = "Forward";
var Back = "Back";
var Okey = "Okay";

function StartIntroFirmware() {
    introJs().setOptions(
        {
            steps:
                [
                    {
                        element: document.querySelector('#deneme'),
                        title: "Download RAR",
                        intro: '<div><p>After downloading the RAR, drag the REX_IDE_FW file to the desktop and open the "uploadFirmware" application</p><img src="images/gif1.gif" alt="Step 1 GIF"></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: "Enter COM",
                        intro: '<div><p>Type your COM port (for example: COM3). You can check your COM in Device Manager.</p><img src="images/gif2.gif" alt="Step 2 GIF"></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: "",
                        intro: '<div><p>The tool will automatically erase the flash and write MicroPython to your device.</p><p> - If you see the message “Failed to get PID of a device on COM*, using standard reset sequence.” <p>and the dots keep appearing on the screen (“....”),</p><p>try reinstalling the software by holding down the “BOOT” key on your device.</p></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: "Process Completed Successfully!",
                        intro: '<div"><p>When the process is complete, you will receive the message “process completed successfully. Press and key to continue” message. You can complete the process by pressing any button or closing the screen!</p><img src="images/gif3.gif" alt="Step 3 GIF"></div>',
                    },
                    
                ],
            tooltipClass: 'customTooltip',
            tooltipPosition: 'right',
            nextLabel: Forward,
            prevLabel: Back,
            doneLabel: Okey,
        }).start();

        var elements = document.querySelectorAll('.blzvQB');

        elements.forEach(function(element) {
            element.style.display = 'none';
        });
        
        var popup = document.getElementById('popup');
        popup.style.display = 'block';
}

