const width  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
const height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;


var shapes = document.getElementsByClassName('shapes');
var squareSizeRange = 3;
var maxSquareSize = 6;
var squareSize;
var triangleSizeRange = 3;
var maxTriangleSize = 6;
var triangleSize;


for( var i = 0; i < shapes.length; i++){
    shapes[i].style.top = (Math.random()*100+1).toString() + "%";
    if(shapes[i].id.localeCompare("square") == 0){
        squareSize = (Math.random()*squareSizeRange+(maxSquareSize-squareSizeRange));
        shapes[i].style.height = (squareSize*2).toString()+"%";
        shapes[i].style.width = squareSize.toString()+"%";
    }else if(shapes[i].id.localeCompare("triangle") == 0){
        triangleSize = (Math.random()*triangleSizeRange+(maxTriangleSize-triangleSizeRange));
        shapes[i].style.borderBottom = (Math.floor(triangleSize*0.866)).toString()+ "% solid rgb(66, 66, 66)";
        shapes[i].style.borderLeft = (Math.floor(triangleSize/2)).toString()+ "% solid transparent";
        shapes[i].style.borderRight = (Math.floor(triangleSize/2)).toString()+ "% solid transparent";
    }
}

anime({
    targets: '.shapes',
    translateX: width + (width*0.1),
    rotate: (Math.random() * 0.4 + 0.1) * 360,
    easing: "linear",
    delay: anime.stagger(2000),
    loop: true,
    duration: (Math.random()*2000)+3000
});

