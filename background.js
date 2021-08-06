const width  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
const height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;


var shapes = document.getElementsByClassName('shapes');
var squareSizeRange = 5;
var maxSquareSize = 10;
var squareSize;
var triangleSizeRange = 5;
var maxTriangleSize = 10;
var triangleSize;
var triangleColor = "rgb(129, 0, 214)";


for( var i = 0; i < shapes.length; i++){
    shapes[i].style.top = (Math.random()*100+1).toString() + "%";
    if(shapes[i].id.localeCompare("square") == 0){
        squareSize = (Math.random()*squareSizeRange+(maxSquareSize-squareSizeRange));
        shapes[i].style.height = squareSize.toString()+"em";
        shapes[i].style.width = squareSize.toString()+"em";
    }else if(shapes[i].id.localeCompare("triangle") == 0){
        triangleSize = (Math.random()*triangleSizeRange+(maxTriangleSize-triangleSizeRange));
        shapes[i].style.borderBottom = (Math.floor(triangleSize*0.866)).toString()+ "em solid " + triangleColor;
        shapes[i].style.borderLeft = (Math.floor(triangleSize/2)).toString()+ "em solid transparent";
        shapes[i].style.borderRight = (Math.floor(triangleSize/2)).toString()+ "em solid transparent";
    }
}

var background1 = anime({
    targets: '.shapes',
    translateX: [-(width*0.1), (width*1.1)],
    rotate: (Math.random() * 0.4 + 0.1) * 360,
    easing: "linear",
    delay: anime.stagger(Math.random()*2000+1000),
    loop: true,
    duration: (Math.random()*5000)+5000,
    //background: ['rgb(129, 0, 214)', 'rgb(0, 60, 255)'],
    //borderBottomColor: ['rgb(129, 0, 214)', 'rgb(0, 60, 255)']
})
//.add({ targets: 'squares',  background: ['rgb(129, 0, 214)', 'rgb(0, 60, 255)'], }, 0)

/*
var isScrolling = false;
var direction = 0;

window.onscroll = function (e) {  
    // called when the window is scrolled.  
    isScrolling = true;
    } 

    setInterval(() => {
        if(isScrolling && anime.get(background1, 'direction').localeCompare('normal') == 0){
            background1.reverse();
        }else if (!isScrolling && anime.get(background1, 'direction').localeCompare('reverse') == 0){
            background1.reverse();
        }
        isScrolling = false;
      }, 100);*/

      
/*

let currentPos = window.pageYOffset;
var shadowDisplace, x, y, angle;


setInterval(() => {
    const newPos = window.pageYOffset;
	const diff = newPos - currentPos;
	const speed = Math.floor(diff);
    document.getElementById("actual").innerHTML = parseInt(anime.get(shapes[1], 'rotate', 'deg'));

    if(speed > 0){
        shadowDisplace = -Math.sqrt(speed);
    }else{
        shadowDisplace = Math.sqrt(-speed);
    }
    
    for( var i = 0; i < shapes.length; i++){
        angle = parseInt(anime.get(shapes[i], 'rotate', 'deg'));
        x = shadowDisplace*(Math.sin(angle));
        y = shadowDisplace/(Math.cos(angle));
        //shapes[i].style.setProperty("filter", 'drop-shadow('+ x.toString() +'em ' + y.toString() + 'em 0.5em)');
        shapes[i].style.setProperty("filter", 'drop-shadow(0em ' + shadowDisplace + 'em 0.5em)');
    }
    
    
	currentPos = newPos;
  }, 16.6);

  */
