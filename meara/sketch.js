var score = 0;
var spawnTimer = 0;
var started = false;
var ended = false;
var flyCount = 0;
var dragonCount = 0;
var timeLeft = 3600;
const food = {
    id: "",
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    vx: 0,
    vy: 0,
    angle: 0,
    diffX: 0,
    diffY: 0,
    stuck: false,
    draw:function () {
        //image(frog, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        if(this.id =="fly"){
            fill(color(255, 204, 0));
            circle(this.x, this.y, this.h);
        }else if (this.id == "dragonfly"){
            fill(color(255, 15, 0));
            circle(this.x, this.y, this.h);
        }
        
        

    },
    setup:function(id,x,y,w,h){
        this.id = id;
      this.angle = random(Math.PI*-2,Math.PI*2);
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    },
    update:function(){
        if(Math.abs((this.x+this.w) - (tongue.x +tongue.w)) < 5 && Math.abs((this.y+this.h) - (tongue.y +tongue.w)) < 5){
            this.stick();
        }
        if(!this.stuck){
            if(this.id == "fly"){
                this.angle += random(-0.2,0.2);
                this.vy = Math.sin(this.angle)+(300-this.y)/150;
                this.vx = Math.cos(this.angle)+(360-this.x)/300;
            }else if(this.id == "dragonfly"){
                var dodge = 0;
                this.angle += random(-0.4,0.4);
                
                if(Math.abs((this.x+this.w) - (tongue.x +tongue.w)) < 75 && Math.abs((this.y+this.h) - (tongue.y +tongue.w)) < 75){
                    dodge = 10/(this.x - tongue.x);
                }
                this.vy = Math.min(Math.sin(this.angle)+(300-this.y)/150, 10);
                this.vx = Math.min(Math.cos(this.angle)+(360-this.x)/300 + dodge, 10);
            }
            
            this.y += this.vy;
            this.x += this.vx;
        }else{
            this.x = tongue.x + this.diffX;
            this.y = tongue.y + this.diffY;
        }
        
    },
    stick:function(){
        this.stuck = true;
        this.diffX = this.x - tongue.x;
        this.diffY = this.y - tongue.y;
    }


  };

  const button = {
    id: "button",
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    pressFunction: null,
    pressed: false,
    draw:function () {
        //image(frog, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        fill(30,200,30);
        rect(this.x,this.y,this.w, this.h)
    },
    setup:function(x,y,w,h,press){
      this.x = x-w/2;
      this.y = y-h/2;
      this.w = w;
      this.h = h;
      this.pressFunction = press;
    },
    update:function(){
        if(tongue.x > this.x && tongue.x < this.x + this.w && tongue.y > this.y && tongue.y < this.y +this.h){
            this.pressFunction();
            this.pressed = true;
        }
    }

  };

  const trash = {
    id: "trash",
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    vx: 0,
    draw:function () {
        //image(frog, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        rect(this.x,this.y,this.w, this.h)
    },
    setup:function(x,y,w,h,vx){
      this.x = x-w/2;
      this.y = y-h/2;
      this.w = w;
      this.h = h;
      this.vx = vx;
    },
    update:function(){
        this.x += this.vx;
        if(tongue.x > this.x && tongue.x < this.x + this.w && tongue.y > this.y && tongue.y < this.y +this.h){
            tongue.reset();
            timeLeft-=600;
        }
    }

  };
  let objects = [];


function setup(){
    let c = createCanvas(720,480);
    c.parent("canvasContainer");
    c.mouseClicked(onMouseClick);
    frameRate(60);
    textSize(20);
    textAlign(CENTER);
    objects.push(Object.create(button))
    objects[0].setup(360,240, 100, 30, function(){
            started = true;
            score = 0;
            pressed = true;
            console.log("game started");
    });
}

var frogX = 355;
var frogY = 20;

function draw(){
    
    background(0,0,0);
    
    fill(245,181,181);
    circle(frogX, frogY, 10);
    fill(255,255,255);
    circle(mouseX, mouseY, 10);
    tongue.update();
    tongue.draw();
    stroke(0);
    strokeWeight(1);
    for(var i = 0; i < objects.length; i++){
        objects[i].update();
        objects[i].draw();
        if(objects[i].id == "fly" && objects[i].stuck && !tongue.shooting){
            objects.splice(i, 1);
            i--;
            score++;
            flyCount--;
        }else if(objects[i].id == "dragonfly" && objects[i].stuck && !tongue.shooting){
            objects.splice(i, 1);
            i--;
            score+=5;
            dragonCount--;
        }else if(objects[i].id == "button" && objects[i].pressed){
            objects.splice(i, 1);
            i--;
        }
    }
    if(started){
        spawnStuff();
        timeLeft--;
        if(timeLeft < 0){
            endGame();
        }
        fill(255,255,255);
        text("Time left: " + Math.round(timeLeft/60), 60, 20);
        text("Score: " + score, 665, 20);
    }else if(ended){
        fill(255,255,255);
        text("You ended with a score of "+score,360, 200);
        text("Play again?",360, 245);
    }else{
        fill(255,255,255);
        text("Play?",360, 245);
    }
}

function spawnStuff(){
    spawnTimer++;
    if(spawnTimer % 60 == 0 && flyCount < 20){
        makeFood("fly");
    }
    if(spawnTimer % 240 == 0 && dragonCount < 5){
        makeFood("dragonfly");
    }
    if(spawnTimer % 120 == 0){
        makeTrash();
    }
}

function keyPressed(){
    if(keyCode === LEFT_ARROW){
        for(var i = 0; i< 10; i++){
            makeFood("fly");

        }
    }else if (keyCode === RIGHT_ARROW){
        for(var i = 0; i< 10; i++){
            makeFood("dragonfly");

        }
    }


}

function endGame(){
    objects = [];
    started = false;
    ended = true;
    timeLeft = 3600;
    flyCount = 0;
    dragonCount = 0;
    objects.push(Object.create(button))
    objects[0].setup(360,240, 125, 30, function(){
            started = true;
            score = 0;
            pressed = true;
            console.log("game started");
    });
    tongue.reset();
}

function makeFood(id){
    objects.push(Object.create(food));
    if(random(0,1) > 0.5){
    objects[objects.length - 1].setup(id,0,240+random(-100,100),10,10);
    }else{
    objects[objects.length - 1].setup(id,720,240+random(-100,100),10,10);
    }
    if(id == "fly"){
        flyCount++;
    }else{
        dragonCount++;
    }
}

function makeTrash(){
    objects.push(Object.create(trash));
    if(random(0,1) > 0.5){
    objects[objects.length - 1].setup(0,240+random(-100,100),50,50,7);
    }else{
    objects[objects.length - 1].setup(720,240+random(-100,100),50,50,-7);
    }
}

const tongue = {
    x: frogX,
    y: frogY,
    w: 10,
    vx: 0,
    vy: 0,
    angle: 0,
    shooting: false,
    canShoot: true,
    targetX: 0,
    targetY: 0,
    draw:function () {
        //image(frog, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        fill(245,181,181);
        circle(this.x, this.y, this.h);
        stroke(245,181,181);
        strokeWeight(10);
        line(this.x, this.y, frogX, frogY);
        
    },
    reset:function(){
      this.x = frogX;
      this.y = frogY;
      this.vx = 0;
      this.vy = 0;
      this.shooting = false;
      this.canShoot = true;
    },
    update:function(){
        if(this.shooting){
            if(Math.abs(this.x-this.targetX) < 5 && Math.abs(this.y-this.targetY) < 5){
                this.retract();
            }else if(this.y < frogY){
                this.reset();
                
            }
            this.vy = Math.sin(this.angle)*5;
            this.vx = Math.cos(this.angle)*5;
            this.y += this.vy;
            this.x += this.vx;
        }
    },
    shoot:function(){
        if(this.canShoot){
            this.targetX = mouseX;
        this.targetY = mouseY;
        if(frogX > this.targetX){
            this.angle = Math.atan((mouseY-frogY)/(this.targetX-frogX))+Math.PI;
        }else{
            this.angle = Math.atan((mouseY-frogY)/(this.targetX-frogX));
        }
        this.shooting = true;
        }

    },

    retract:function(){
        this.angle += Math.PI;
    }


  };


function onMouseClick(){
    console.log("click");
    if(!tongue.shooting){
        tongue.reset();
        tongue.shoot();
        console.log("shoot");
    }
}