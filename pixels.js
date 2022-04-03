//HTML canvas setup
//Add canvas element to body/content
const content = document.getElementById('content')
const canvas  = document.createElement("canvas");

//Set canvas identifier
canvas.id = "canvas"

//Nest canvas element -> body/content
content.appendChild(canvas)

//Set canvas width and height
const width   = 1000
const height  = 1000
canvas.width  = width
canvas.height = height

var context = canvas.getContext('2d');

//Set canvas variables
context.lineWidth = 2;
context.strokeStyle = 'black';

//Storage Array
var pixels = []

window.onload = init

function init(){
  //build empty 1000x1000 array with nested objects
  buildArray()
  // Start the first frame request
  // display any existing pixel data
  window.requestAnimationFrame(displayArray);
}
//End setup

//Draw and display functionality
var click = false

function displayArray(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var h = 0; h < height; h++){
      for(var w = 0; w < width; w++){
        if(pixels[h][w].color === 1)
          context.fillRect(h,w,1,1)
      }
    }
}

function paintIt(){
  if(click && inFrameCheck(event.clientX,event.clientY)){
    pixels[coorX(event).toFixed(0)][coorY(event).toFixed(0)].color = 1
    window.requestAnimationFrame(displayArray)
  }
}

//mouse events
document.body.onmousedown = function(){
  click = true
  paintIt()
}

document.body.onmouseup   = function(){
  click = false
}

document.body.onmousemove = function(){
  paintIt()
}

//Helper Functions`
function inFrameCheck(x,y){return x <= width && y <= height}

function coorX(e){
    offsetX = document.getElementById('canvas').offsetLeft
    return e.clientX - offsetX
}
function coorY(e){
    offsetY = document.getElementById('canvas').offsetTop
            - window.pageYOffset
    return e.clientY - offsetY
}

function buildArray(){
  //build row array
  for(var h = 0; h < height; h++){
    pixels.push([])
  }

  //add column object for each pixel
  pixels.forEach(function(currentValue, index, arr){
    for(var w = 0; w < width; w++){
      pixels[index].push({
        //pixel object
        //to be refined
        owner: 'abc',
        color: 0
      })
    }
  })
}