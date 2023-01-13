const c = document.getElementById("backgroundCanvas");
var ctx = c.getContext("2d");
document.onmousemove = mouseMove;
window.onresize = resizeWindow;

c.width = window.innerWidth;
c.height = window.innerHeight;

var mouse = {
    x:0,
    y:0,
    moving: false
};
function mouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.moving = true;
    //bgp.src = imageSrc[clamp(Math.round((imageSrc.length) * calculateProgress()),1, 119)];
    console.log(clamp(Math.round((imageSrc.length) * progress.actual),1, 119));
    //tweenTime = new Date().getTime();
    //tweenInitial = progress.actual();
} 

var progress = {
    actual: 0.5,
    target: 0.5,
    raw:0.5
};

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

function draw(){

        //console.log(imageSrc[Math.floor((imageSrc.length) * calculateProgress())]);
        ctx.fillStyle = "#070709";
        ctx.fillRect(0,0,c.width, c.height);
        ctx.drawImage(bgp[239 - clamp(Math.round((imageSrc.length) * progress.actual),1, 239)], (1440-c.height)*9/16/2, 0, c.height*16/9, c.height);
        ctx.font = "20px Arial";
        ctx.fillText("Target: " + progress.target, 10, 10);
        ctx.fillText("actual: " + progress.actual, 10, 30);
        //ctx.fillStyle = "rgba(0,0,255,0.3)";
        //ctx.fillRect(20,20,500,300);
    
    

}

var title = document.getElementById("name");

function update(){
    mouse.moving = false;
    //console.log("translate(" + Math.round(calculateProgress()*300) + "px)");
    var words = document.getElementsByClassName("moving");
    for(var i = 0; i<words.length; i++){
        words[i].style.WebkitTransform = "translateX(" + (Math.round(progress.actual*+600)-300) + "px)";
    // HERE HERHEHRHEHR EHR EHREHHRHEH ERHH EHRHERHEH RHEH RHER HE
    //EBIFABOIAEB OFIAEBFOI UAEHFBIO UEAHFUIOAEBFOIUEABFOIEAUBFIUAEBF
    //OIAEUBF UIOAEFBIOU AEBFOIUEBAOIFU ABEOIUFBOIAEUBFOIAEUBFOIAEBF
    //you wanted to try to highlight the side words when the mouse hits a certain part
    }
    words[0].style.fontSize = Math.max(10, 10*(0.5+progress.raw)) +"rem";
    words[2].style.fontSize = Math.max(10, 10/(0.5+progress.raw)) +"rem";
    updateProgress();
    calculateProgress();
    
    //progress.actual += Math.pow((progress.target - progress.actual),3)/10;
}

var tweenLength = 1000;
var tweenTime = 0;
var tweenInitial = 0;
function updateProgress(){
    var time = new Date().getTime();
    //progress.actual = (progress.target - tweenInitial)*(1-Math.pow((time - tweenTime)/tweenLength, 2));
    if(Math.abs((progress.target-progress.actual)/8) > 0.0018){
    progress.actual += (progress.target-progress.actual)/4;
    }else{
        progress.target = progress.actual;
    }
}

var leftBorder = c.width * 0.33;
var rightBorder = c.width *0.66;
function calculateProgress(){
    progress.target = clamp((mouse.x - leftBorder)/(rightBorder - leftBorder), 0, 1);
    progress.raw = mouse.x/c.width;
    //return clamp((mouse.x - leftBorder)/(rightBorder - leftBorder), 0, 1);
}

function clamp(x, min, max){
    return Math.min(Math.max(x, min), max);
}