const c = document.getElementById("backgroundCanvas");
var ctx = c.getContext("2d");
document.onmousemove = mouseMove;
window.onresize = resizeWindow;

c.width = window.innerWidth;
c.height = window.innerHeight;

var mouse = {
    x:0,
    y:0
};
function mouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    //bgp.src = imageSrc[clamp(Math.round((imageSrc.length) * calculateProgress()),1, 119)];
    console.log(clamp(Math.round((imageSrc.length) * calculateProgress()),1, 119));
} 

function resizeWindow(e){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    bgoffset = -(1440-c.height)/2;
    leftBorder = c.width * 0.25;
    rightBorder = c.width *0.75;
    console.log("resized?");
    run();
}

let imageSrc = [];
let bgp = [];
for(var i = 0; i < 240; i++){
    imageSrc[i] = "frames/"+((i+1).toString()).padStart(4, "0")+".webp";
    bgp[i] = new Image();
    bgp[i].src = imageSrc[i];
    //bg[i].setAttribute("src", "frames/0001.webp");
    //console.log("frames/"+i.toString().padStart(4, "0")+".webp");
}
//bg[0] = new Image();
//bg[0].src = "frames/0001.webp";
var bgoffset = -(1440-c.height);
console.log(c.height);

setInterval(run, 16);

function run(){
    update();
    draw();
}
//socket.on(`updateCanvasImage`, src => {update = false; bg.src = src});

var progress = 50;
function draw(){

        //console.log(imageSrc[Math.floor((imageSrc.length) * calculateProgress())]);
        ctx.fillStyle = "#070709";
        ctx.fillRect(0,0,c.width, c.height);
        ctx.drawImage(bgp[clamp(Math.round((imageSrc.length) * progress),1, 239)], (1440-c.height)*9/16/2, 0, c.height*16/9, c.height);
        //ctx.fillStyle = "rgba(0,0,255,0.3)";
        //ctx.fillRect(20,20,500,300);
    
    

}

var title = document.getElementById("name");

function update(){
    //console.log("translate(" + Math.round(calculateProgress()*300) + "px)");
    document.getElementById("title").style.WebkitTransform = "translateX(" + (Math.round(calculateProgress()*-600)+300) + "px)";
}

var leftBorder = c.width * 0.25;
var rightBorder = c.width *0.75;
function calculateProgress(){
    var progress = mouse.x - leftBorder;
    return clamp(progress/(rightBorder - leftBorder), 0, 1);
}

function clamp(x, min, max){
    return Math.min(Math.max(x, min), max);
}