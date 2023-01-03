const c = document.getElementById("backgroundCanvas");
console.log(c);
var ctx = c.getContext("2d");
document.onmousemove = mouseMove;

c.width = window.innerWidth;
c.height = window.innerHeight;
console.log(c.width);

var mouse = {
    x:0,
    y:0
};
function mouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
} 

setInterval(run, 16);

function run(){
    update();
    draw();
}

function draw(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(mouse.x, mouse.y, 10, 10);
    for(var i = 0; i < lines.length; i++){
        lines[i].draw();
    }
}
let time;
const singleDot = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    color: "#FF0000",
    offset: 0,
    update: function(t){
        //this.dy = Math.cos(t/500+this.offset);
        this.x+=this.dx;
        this.y=100*Math.cos(t/750+this.offset)+window.innerHeight/2;
    },
    setup: function(x, y, dx, dy, offset){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.offset = offset;
    }
};

const line = {
    dots: [],
    num: 0,
    color: "#FFFFFF",
    offset: 0,
    setup: function(num, color, offset){
        for(var i = 0; i<num;i++){
            this.dots.push(Object.create(singleDot));
            this.dots[this.dots.length-1].setup(window.innerWidth/num*i, window.innerHeight/2, 0, 0, i/100+offset);
            console.log(this.dots[i].offset);
        }
        this.color = color;
    },
    update: function(time){
        for(var i = 0; i < this.dots.length; i++){
            this.dots[i].update(time);
        }
    },
    draw: function(){
        /*for(var i = 0; i < this.dots.length; i++){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.dots[i].x, this.dots[i].y, 1, 1);
    
        }*/
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.dots[0].x, this.dots[0].y);
        for(var i = 1; i < this.dots.length;i++){
            ctx.lineTo(this.dots[i].x, this.dots[i].y);
        }
        
    }

};

let lines = [];
lines.push(Object.create(line));
lines[lines.length-1].setup(192, "#00dbff", Math.PI);
lines.push(Object.create(line));
lines[lines.length-1].setup(192, "#6cb4ff", 1);
lines.push(Object.create(line));
lines[lines.length-1].setup(192, "#e54cff", 0);

function update(){
    time = new Date().getTime();
    for(var i = 0; i < lines.length;i++){
        lines[i].update(time);
    }
}