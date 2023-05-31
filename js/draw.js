var c = document.getElementById("canvasScreen");
var ctx = c.getContext("2d");
                   

function line(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(x, y);
    ctx.lineTo(300, 150);
    ctx.stroke();
};

function rectangle(x,y,w,h) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.rect(x, y, w, h);
    ctx.stroke();
};

function square(x,y,w,h) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.rect(x, y, w, h);
    ctx.stroke();
};

function circle(x,y,r) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
};

function text(xPos, yPos, value) {
    ctx.font = "2rem Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillText(value, xPos, yPos);
};
