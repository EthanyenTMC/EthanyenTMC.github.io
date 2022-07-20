import { Component } from "/classes.js";
import { Vector2 } from 'three';

var canvas, drawingContext;
var click, hover;
var test;
function init(){
    canvas = document.getElementById("aboutMe");
    drawingContext = canvas.getContext( '2d' );

    
    drawingContext.fillStyle = '#FF00FF';
    drawingContext.font = "50px Arial";
    drawingContext.fillText("PISS YOURSELF", 100, 100);
    
    click = new Component(0,0, 15, 15);
    hover = new Component(0,0, 10, 10);
    hover.setColor("#0000FF");
    test = new Component(300, 300, 500, 500);
    test.setColor("#FF00FF");
}


export function mouseMove(clickPos){
    hover.x = clickPos.x*canvas.width;
    hover.y = clickPos.y*canvas.height;
}

export function drawSquare(clickPos){
    //drawingContext.fillStyle = '#FFFFFF';
    //drawingContext.fillRect( clickPos.x*canvas.width, clickPos.y*canvas.height, 20, 20 );
    click.x = clickPos.x*canvas.width;
    click.y = clickPos.y*canvas.height;
    //console.log(clickPos.x*canvas.width + "hi" + clickPos.y*canvas.height);
}



export function updateCanvas(time){
    drawingContext.clearRect(0,0,canvas.width, canvas.height);

    if(test.touches(new Vector2(hover.x, hover.y))){
        test.setColor("#FF00FF");
    }else{
        test.setColor("#FF0000");
    }
    test.draw(drawingContext);
    click.draw(drawingContext);
    hover.draw(drawingContext);
    console.log(click.x + "      " + click.y);
    
}

init();













