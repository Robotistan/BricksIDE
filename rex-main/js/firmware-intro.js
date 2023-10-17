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
                        intro: '<div><p>After downloading the RAR, drag the flash_download_tool_3.9.5 file to the desktop and open the application</p><img src="images/gif1.gif" alt="Step 1 GIF"></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: "Select ESP32",
                        intro: '<div><p>Select ESP32 from screen DOWNLOAD TOOL MODE</p><img src="images/gif2.gif" alt="Step 2 GIF"></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: ".bin file",
                        intro: '<div"><p>Select bin file by pressing 3 dots in SPIDownload</p><img src="images/gif3.gif" alt="Step 3 GIF"></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: "0x1000",
                        intro: '<div><p>Enter the value 0x1000 on the box, then click checkbox</p><img src="images/gif4.gif" alt="Step 4 GIF"></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: "COM",
                        intro: '<div><p>Select your device from the dropdown COM field</p><img src="images/gif5.gif" alt="Step 5 GIF"></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: "ERASE",
                        intro: '<div><p>Click ERASE and wait for it to download</p><img src="images/gif6.gif" alt="Step 6 GIF"></div>',
                    },
                    {
                        element: document.querySelector('#deneme'),
                        title: "START",
                        intro: '<div><p>click START and wait for it to download then you can close and start your project</p><img src="images/gif7.gif" alt="Step 7 GIF"></div>',
                    }
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

