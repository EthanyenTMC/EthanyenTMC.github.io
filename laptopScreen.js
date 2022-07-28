import { Component } from "/classes.js";
import { Vector2, Vector3 } from 'three';
import { defaultView } from '/script.js';
import { getCameraPos, getCameraTarget } from "./script";
// screen size is 1620 1080
var canvas, drawingContext, backButton;
var click, hover;
var test;
function init(){
    canvas = document.getElementById("aboutMe");
    drawingContext = canvas.getContext( '2d' );


    
    click = new Component(0,0, 15, 15);
    hover = new Component(0,0, 10, 10);
    hover.setColor("#0000FF");
    test = new Component(300, 300, 500, 500);
    test.setColor("#FF00FF");

    backButton = new Component(50, 950, 150, 75);
    backButton.setColor("#0000FF");
    updateCanvas(0);
}

 
export function mouseMove(clickPos){
    hover.x = clickPos.x*canvas.width;
    hover.y = clickPos.y*canvas.height;
}

function drawSquare(pos){
    //drawingContext.fillStyle = '#FFFFFF';
    //drawingContext.fillRect( clickPos.x*canvas.width, clickPos.y*canvas.height, 20, 20 );
    
    //console.log(clickPos.x*canvas.width + "hi" + clickPos.y*canvas.height);
}

export function onCanvasClick(clickPos){
    click.x = clickPos.x*canvas.width;
    click.y = clickPos.y*canvas.height;
    drawSquare(clickPos);
    if(backButton.touches(new Vector2(hover.x, hover.y))){
        back();
    }
}

function back(){
    defaultView(getCameraPos(), getCameraTarget());

}

export function updateCanvas(time){
    drawingContext.fillStyle = "#15286B";
    drawingContext.fillRect(0,0,canvas.width, canvas.height);

    if(backButton.touches(new Vector2(hover.x, hover.y))){
        backButton.setColor("#FF00FF");
    }else{
        backButton.setColor("#FF0000");
    }
    test.draw(drawingContext);
    click.draw(drawingContext);
    hover.draw(drawingContext);
    backButton.draw(drawingContext);
    //console.log(click.x + "      " + click.y);
    
}

init();













