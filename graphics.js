/**************************************
 TITLE: graphics.js
 AUTHOR: Caleb Landis (CL)
 CREATE DATE: 9/28/2022
 PURPOSE: Provide functionality for index.html 2D graphic demo
 LAST MODIFIED ON: 9/28/2022
 LAST MODIFIED BY: Caleb Landis (CL)
 Modification History:
 28 September 2022: Original Build (CL)
 ***************************************/

// Variable Initialization

var drawing;
var con;
var canvasH = 600;
var canvasW = 900;
var image = document.getElementById("image");

var startX = 0;
var startY = 0;
var x = 1800;
var y = 1200;

var strColor = "#000000";
var strBackgroundColor = "#FFFFFF";
var textColor = "#000000"
var size = 20;
var textSize = 20;
var textInput = "Text!";
var mouseDown = false;

// Event Handlers

$("#penBtn").click(function() {
  document.onmousedown = startDrawing;
  document.onmouseup = endDrawing;
  document.onmousemove = draw;
});

$("#lineBtn").click(function() {
  document.onmousedown = startLine;
  document.onmouseup = endLine;
  document.onmousemove = drawLine;
});

$("#rectBtn").click(function() {
  document.onmousedown = startRect;
  document.onmouseup = endRect;
  document.onmousemove = drawRect;
});

$("#circleBtn").click(function() {
  document.onmousedown = startCircle;
  document.onmouseup = endCircle;
  document.onmousemove = drawCircle;
});

$("#textBtn").click(function() {
  document.onmousedown = startText;
  document.onmouseup = endText;
  document.onmousemove = drawText;
});


$("#clear").click(function() {
  //clear screen
  con.clearRect(0, 0, canvasW, canvasH);
});

$("#imageBtn").click(function() {
  drawImage();
});

// Init Function

function init () {
  drawing = document.getElementById("canvas");
  drawing.style.backgroundColor = "white";
  con = drawing.getContext("2d");
  con.imageSmoothingEnabled = true;

  // event handlers

  document.onmousedown = startDrawing;
  document.onmouseup = endDrawing;
  document.onmousemove = draw;

  //setInterval(draw, 100);
}

// gets current coordinates of mouse position
function getCoords(e) {
  //pageX and pageY are page position
  x = e.pageX;
  y = e.pageY;
} // end getCoords

// Pen Tool

function startDrawing(e) {
  mouseDown = true;
  con.beginPath();
  draw(e);
}

function endDrawing(e) {
  mouseDown = false
  con.closePath();
}

function draw(e) {
  // set background color
  strBackgroundColor = new String($("#backgroundColor").val());
  drawing.style.backgroundColor = strBackgroundColor;

  if (mouseDown) {
    strColor = new String($("#color").val());
    size = $("#size").val();
    con.strokeStyle = strColor;
    con.fillStyle = strColor;
    con.lineWidth = size;
    con.lineCap = "round";

    getCoords(e);

    con.lineTo(x,y);
    con.stroke();
    con.closePath();

    con.beginPath();
    con.moveTo(x,y);
  }
} // end draw

// Line tool

function startLine(e) {
  mouseDown = true;

  strColor = new String($("#color").val());
  size = $("#size").val();
  con.strokeStyle = strColor;
  con.fillStyle = strColor;
  con.lineWidth = size;

  // full circle filled to show where line started
  getCoords(e);
  con.beginPath();
  con.arc(x, y, size / 2, 0, Math.PI*2, true);
  con.closePath();
  con.fill();

  // start drawing line
  con.beginPath();
  con.moveTo(x, y);
} // end startLine

function endLine(e) {
  mouseDown = false

  // draw line to this point
  getCoords(e);
  con.lineTo(x, y);
  con.stroke();
  con.closePath();

  // full circle filled to show where line started
  con.beginPath();
  con.arc(x, y, size / 2, 0, Math.PI*2, true);
  con.closePath();
  con.fill();
} // end endLine

// changes semantics of onmousemove; makes sure that drawing doesn't follow mouse for creating lines
// otherwise it would make a splatter effect while the user is mid-drawing a line.
// also handles if background color changes
function drawLine(e) {
  // set background color
  strBackgroundColor = new String($("#backgroundColor").val());
  drawing.style.backgroundColor = strBackgroundColor;
} // end drawLine

// Rectangle Tool

function startRect(e) {
  mouseDown = true;

  strColor = new String($("#color").val());
  size = $("#size").val();
  con.strokeStyle = strColor;
  con.fillStyle = strColor;
  con.lineWidth = size;

  // get starting points for rectangle
  getCoords(e);
  startX = x;
  startY = y;

  /* removed because it makes rectangle look like it has a weird corner
  // tiny full circle filled to show where rectangle started
  con.beginPath();
  con.arc(x, y, size / 20, 0, Math.PI*2, true);
  con.closePath();
  con.fill();
  */
} // end startRect

function endRect(e) {
  mouseDown = false

  // fill rectangle to this coordinate set
  getCoords(e);
  con.fillRect(startX, startY, x - startX, y - startY);
} // end endRect

// changes semantics of onmousemove; makes sure that drawing doesn't follow mouse for creating rectangles
// otherwise it would make a splatter effect while the user is mid-drawing a rectangle.
// also handles if background color changes
function drawRect(e) {
  // set background color
  strBackgroundColor = new String($("#backgroundColor").val());
  drawing.style.backgroundColor = strBackgroundColor;
} // end drawRect

// Circle Tool

function startCircle(e) {
  mouseDown = true;
  con.beginPath();
  draw(e);
} // end startCircle

function endCircle(e) {
  mouseDown = false
  con.closePath();
} // end endCircle

function drawCircle(e) {
  // set background color
  strBackgroundColor = new String($("#backgroundColor").val());
  drawing.style.backgroundColor = strBackgroundColor;

  if (mouseDown) {
    strColor = new String($("#color").val());
    size = $("#size").val();
    con.strokeStyle = strColor;
    con.fillStyle = strColor;

    getCoords(e);

    con.beginPath();
    con.arc(x, y, size, 0, Math.PI*2, true);
    con.closePath();
    con.fill();
  }
} // end drawCircle

// Text Tool

function startText(e) {
  mouseDown = true;
  // draw font in red

  textColor = $("#textColor").val()
  textInput = $("#textInput").val();
  textSize = $("#textSize").val();
  con.fillStyle = textColor;
  con.font = textSize + "pt sans-serif";
  getCoords(e);

  con.fillText(textInput, x - textSize, y);
  //con.strokeText(textInput, 5, 130);
} // end startText

function endText(e) {
  mouseDown = false
} // end endText

function drawText(e) {
  // set background color
  strBackgroundColor = new String($("#backgroundColor").val());
  drawing.style.backgroundColor = strBackgroundColor;
} // end drawText

function drawImage() {
  var image = new Image();
  image.src = "jags.png";

  // Make sure the image is loaded first otherwise nothing will draw.
  image.onload = function(){
    con.drawImage(image,0,0);
  } // end onload
} // end drawImage

// UI
//$("#controlgroup").controlgroup();
$("#size").spinner();
$("#radioset").buttonset();
$("#clear").button();
$("#imageBtn").button();
$("#textSize").spinner();
