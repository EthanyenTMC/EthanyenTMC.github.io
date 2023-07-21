import anime from '/animejs/index.js';

var screen = document.getElementById("screen");

var squareSize = window.innerHeight * 0.04; //percent of height (vh) when changed, change tiles AND row size in css
console.log(window.innerHeight + " " + squareSize);

var numCols;
var numRows;

console.log(window.innerWidth);

numRows = Math.floor(window.innerHeight/squareSize);
numCols = Math.floor(window.innerWidth/squareSize)+1;

screen.style.setProperty("--columns", numCols);
screen.style.setProperty("--rows", numRows);
    
console.log("hi" + numCols);
for(var i = 0; i < numRows; i++){
    for(var j = 0; j < numCols; j++){
        var tile = document.createElement("div");
        tile.setAttribute("class", "tiles");
        tile.setAttribute("id", j+(i*numCols));
        screen.appendChild(tile);
    }
}

//console.log(window.innerWidth + " " + window.innerHeight);
var clickAnim = anime({
    targets:'#screen .tiles',
    duration: 1,
    autoplay: true,
});

var colorShift = ["#000b4b", "#2a004b"];

document.onclick = function(e){
    console.log(e.target.id);
    console.log("start");
    console.log(document.elementsFromPoint(e.x,e.y));
    var clickedElements = document.elementsFromPoint(e.x, e.y);
    var clickedTile = null;
    for(var i = 0; i < clickedElements.length; i++){
        if(clickedElements[i].classList.contains("tiles")){
            clickedTile = clickedElements[i];
        }
    }

    if(clickAnim.completed && clickedTile != null){
        clickAnim = anime({
            targets:'#screen .tiles',
            /*scale:[{value: 0.1}, {value: 1}],
            backgroundColor: colorShift,*/
            keyframes: [
                {
                    scale: 0.1,
                    backgroundColor: colorShift[0]
                },
                {
                    scale: 1,
                    backgroundColor: colorShift[1]
                }
            ],
            duration: 100,
            easing:'easeInQuad',
            delay: anime.stagger(15, {grid: [numCols, numRows], from: clickedTile.id}),
            autoplay: true,
        });
        var temp = colorShift[0];
        colorShift[0] = colorShift[1];
        colorShift[1] = temp;
    }

    //var clicked = findTileCord(e.x, e.y);
    //flipTileToggle(clicked, true);
    //clicked.style.backgroundColor = "red";
    
}

/*
var downAnim = anime({
    targets:'#screen .tiles',
    //rotateY: {value: 180, easing: 'linear', duration:1000},
    rotateY: 180,
    duration: 750,
    easing:'linear',
    delay:anime.stagger(50, {grid: [numCols, numRows], axis: 'y'}),
    autoplay: true,
});*/

var leftAnim = anime({
    targets:'#screen .tiles',
    //rotateY: {value: 180, easing: 'linear', duration:1000},
    keyframes: [{scale: 0}, {scale:1}],
    duration: 500,
    easing:'easeInSine',
    delay:anime.stagger(50, {grid: [numCols, numRows], axis: 'x'}),
    autoplay: false,
});

