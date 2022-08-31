class Vector{
    constructor(xLoc,yLoc){
        this.x = xLoc;
        this.y = yLoc;
    }

    add(other){
        return new Vector(this.x + other.x, this.y + other.y);
    }

    sub(other){
        return new Vector(this.x - other.x, this.y - other.y);
    }

}




var highestLayer=1;
var activeLayer;
var projects, aboutMe;

function init(){
    projects = document.getElementById("projects");
    aboutMe = document.getElementById("aboutMe");
}
document.addEventListener('mousewheel', handleScroll);
//document.addEventListener('onmousedown', onClick);


var aboutV = false;

function toggleAboutMe(){
    if(aboutV){ // hide
        anime({
            targets:'#aboutMe',
            keyframes:[
                {   
                    translateY:'-92vh',
                    duration:100,
                    easing:'easeOutQuad'
                },
                {   
                    
                    translateY:'30vh',
                    translateX:'30vw',
                    duration:1
                }
            ]
        });
    }else{ // show
        setHighest(aboutMe);
        activeLayer = "aboutMe";
        if(aboutMePos.x === -999){
            aboutMePos = new Vector(aboutMe.getBoundingClientRect().left,aboutMe.getBoundingClientRect().top);
        }
        anime({
            targets:'#aboutMe',
            keyframes:[
                {   
                    
                    translateY:'-92vh',
                    translateX:'15vw', 
                    duration:1
                },
                {   
                    opacity:100,
                    translateY:'-95vh',
                    duration:250,
                    easing:'easeOutQuint'
                }
            ]
        });
    }
    aboutV = !aboutV;
}

var projectsV = false;

function toggleProjects(){
    if(projectsV){ //hide

        anime({
            targets:'#projects',
            keyframes:[
                {   
                    translateY:'-87vh',
                    duration:100,
                    easing:'easeOutQuad'
                },
                {   
                    
                    translateY:'30vh',
                    translateX:'30vw',
                    duration:1
                }
            ]
        });
    }else{ //show
        setHighest(projects);
        activeLayer="projects";
        if(projectsPos.x === -999){
            projectsPos = new Vector(projects.getBoundingClientRect().left,projects.getBoundingClientRect().top);
        }
        console.log(projects.style.zIndex);
        anime({
            targets:'#projects',
            keyframes:[
                {   
                    
                    translateY:'-87vh',
                    translateX:'5vw',
                    duration:1
                },
                {   
                    opacity:100,
                    translateY:'-90vh',
                    duration:250,
                    easing:'easeOutQuint'
                }
            ]
        });
    }
    projectsV = !projectsV;
}

var expV = false;

function toggleExperience(){
    if(expV){ //hide

        anime({
            targets:'#experience',
            keyframes:[
                {   
                    translateY:'-94vh',
                    duration:100,
                    easing:'easeOutQuad'
                },
                {   
                    
                    translateY:'30vh',
                    translateX:'30vw',
                    duration:1
                }
            ],
            
            complete:resizeCanvas
        });
    }else{ //show
        setHighest(experience);
        activeLayer = "experience";
        if(experiencePos.x === -999){
            experiencePos = new Vector(experience.getBoundingClientRect().left,experience.getBoundingClientRect().top);
        }
        console.log(experience.style.zIndex);
        
        anime({
            targets:'#experience',
            keyframes:[
                {   
                    
                    translateY:'-92vh',
                    translateX:'2vw',
                    duration:1
                },
                {   
                    opacity:100,
                    translateY:'-95vh',
                    duration:250,
                    easing:'easeOutQuint'
                }
            ],
        });
    }
    expV = !expV;
}

function hideAllWindows(){
    expV = true;
    projectsV = true;
    aboutV = true;
    toggleAboutMe();
    toggleExperience();
    toggleProjects();
}

var taskbar = document.getElementsByClassName("taskbar");
taskbar = taskbar[0];

function setHighest(thing){
    highestLayer++;
    thing.style.zIndex = highestLayer.toString();
    taskbar.style.zIndex = (highestLayer+1).toString();
}


const aboutMeText = document.getElementById("aboutMeTextScroll");
var aboutMeBaseText = aboutMeText.innerHTML.split(" ");
aboutMeText.innerHTML = "";
var aboutMeProgress = 0;

function handleScroll(event){
    console.log(aboutMeProgress);
    event.preventDefault();
    switch(activeLayer){
        case "aboutMe":
            var delta = event.deltaY/Math.abs(event.deltaY);
            if(aboutMeProgress < 0){
                aboutMeProgress = 0;
                delta = 0;
            }
            aboutMeProgress = Math.min(aboutMeBaseText.length, aboutMeProgress+2*delta);
            aboutMeText.innerHTML = "";
            for(var i = 0; i < aboutMeProgress; i++){
                if(i == aboutMeProgress -1){     
                    aboutMeText.innerHTML += aboutMeBaseText[i];
                }else{
                    aboutMeText.innerHTML += aboutMeBaseText[i]+ " ";
                }
            }
            break;
    }

}

var mouseDown = false;

document.body.onmousedown = onMouseDown;
document.body.onmousemove = onMouseMove;
document.body.onmouseup = onMouseUp;

var activeClick;
var beginPos;
var mousePos;
var mouseDragVector;
var aboutMePos = new Vector(-999,0);
var projectsPos = new Vector(-999,0);
var experiencePos = new Vector(-999,0);
var aboutMeDrag = false;
var projectsDrag = false;
var experienceDrag = false;

function returnRelevantClassName(classes){
    const arr = classes.split(" ");
    if(arr.length > 1){
        for(var i = 0; i < arr.length; i++){
            switch(arr[i]){
                case "aboutMeDraggable":
                    return "aboutMeDraggable";
                case "projectsDraggable":
                    return "projectsDraggable";
                case "experienceDraggable":
                    return "experienceDraggable";
                case "drawing":
                    return "drawing";

            }
        }
    }else{
        return arr[0];
    }
    
}

function wrapText(text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
}

var drawing;
var canvas = document.getElementById("canvas");

var context = canvas.getContext('2d');
canvas.addEventListener('pointermove', handleDrawing);
var canvasBackground = document.getElementsByClassName("experienceCanvas")[0];
var canvasRect = canvas.getBoundingClientRect();
window.onresize = resizeCanvas;

//setInterval(handleCanvas, 17);
resizeCanvas();
function resizeCanvas(){
    canvas.width = canvasBackground.getBoundingClientRect().width * 0.8;
    canvas.height = canvasBackground.getBoundingClientRect().height * 0.8;
    
    context.fillStyle = "#FF0000";
    wrapText("hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ",10, 10, canvas.width, 30);

    console.log(canvasBackground.getBoundingClientRect().height);
}

function handleCanvas(){
    resizeCanvas();
    
    
}



function handleDrawing(event){
    context.fillStyle = "#FF0000";
    var rect = canvas.getBoundingClientRect();
    const events = event.getCoalescedEvents();
    for(var i = 0; i < events.length; i++){
        if(mouseDown){
            console.log(rect.left);
            if(i > 0){
                /*if(events[i].clientX - events[i-1].clientX > 2 || events[i].clientY - events[i-1].clientY > 2){
                    var difference = new Vector(events[i].clientX-events[i-1].clientX, events[i].clientY-events[i-1].clientY);
                    for(var j = 0; j <= 2; j++){
                        context.fillRect(events[i].clientX-(j*difference.x) - rect.left , events[i].clientY-(j*difference.y) - rect.top, 3, 3);
                    }
                }*/
                var difference = new Vector(events[i].clientX-events[i-1].clientX, events[i].clientY-events[i-1].clientY);
                    for(var j = 0; j <= 10; j++){
                        context.fillRect(events[i].clientX-(j*difference.x/5) - rect.left , events[i].clientY-(j*difference.y/5) - rect.top, 3, 3);
                    }
            }
            context.fillRect(events[i].clientX-  rect.left , events[i].clientY - rect.top, 3, 3);
            
        }
    }
}

function draw(prevX, prevY, currX, currY) {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = 3;
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
}

function returnFalse(){
    return false;
}

function onMouseDown(event){
    mouseDown = true;
    activeClick = event.target;
    console.log(returnRelevantClassName(activeClick.className));
    beginPos = new Vector(event.clientX, event.clientY);
    switch(returnRelevantClassName(activeClick.className)){
        case "aboutMeDraggable":
            aboutMeDrag = true;
            setHighest(aboutMe);
            break;
        case "projectsDraggable":
            projectsDrag = true;
            setHighest(projects);
            break;
        case "experienceDraggable":
            experienceDrag = true;
            setHighest(experience);
            break;

    }
}

function onMouseMove(event){
    mousePos = new Vector(event.clientX, event.clientY);
    if(mouseDown){
        mouseDragVector = mousePos.sub(beginPos);
        if(mouseDragVector.x > 10 || mouseDragVector.y > 10){
            if(aboutMeDrag){
                aboutMe.style.left = aboutMePos.x+mouseDragVector.x + "px";
                aboutMe.style.top = aboutMePos.y+mouseDragVector.y + "px";
            }else if(projectsDrag){
                projects.style.left = projectsPos.x+mouseDragVector.x + "px";
                projects.style.top = projectsPos.y+mouseDragVector.y + "px";
            }else if(experienceDrag){
                experience.style.left = experiencePos.x+mouseDragVector.x + "px";
                experience.style.top = experiencePos.y+mouseDragVector.y + "px";
            }
        }
       
    }
}

function onMouseUp(event){
    mouseDown = false;
    beginPos = null;
    if(aboutMeDrag){
        aboutMeDrag = false;
        aboutMePos = new Vector(aboutMePos.x+mouseDragVector.x, aboutMePos.y+mouseDragVector.y);
    }else if(projectsDrag){
        projectsDrag = false;
        projectsPos = new Vector(projectsPos.x +mouseDragVector.x, projectsPos.y+mouseDragVector.y);
    }else if(experienceDrag){
        experienceDrag = false;
        experiencePos = new Vector(experiencePos.x +mouseDragVector.x, experiencePos.y+mouseDragVector.y);
    }
}


var projectTitle = document.getElementById("projectTitle");
var projectImage = document.getElementById("projectImage");
var projectDescription = document.getElementById("projectDescription");
var activeProject = document.getElementById("currentWebsite");
updateProjectView(activeProject);

function updateProjectView(element){
    var title, projectI, projectD;
    switch(element.id){

        case "currentWebsite":
            title = "This Website";
            projectI = "icons/website.png";
            projectD = "This project was very cool, I used html, css and javascript. I made this website to have a centralized location where I can display my projects, talk about my experience, and post general information about myself to potential employers or to those who are just curious.";
            break;

        case "game":
                title = "Game";
                projectI = "test2.png";
                projectD = "I love league of legends";
            break;

    }

    projectTitle.innerHTML = title;
    projectImage.src = projectI;
    projectDescription.innerHTML = projectD;
    activeProject.classList.remove("highlighted");
    activeProject = element;
    activeProject.classList.add("highlighted");
}
