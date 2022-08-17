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

class Draggable{
    constructor(el, posx, posy){
        this.element = el;
        this.x = posx;
        this.y = posy
        this.drag = false;
    }

    
}


var highestLayer=1;
var activeLayer;
var projects, aboutMe;

function init(){
    projects = document.getElementById("projects");
    aboutMe = document.getElementById("aboutMe");``
}
document.addEventListener('wheel', handleScroll);
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
            ]
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
            ]
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
                case "canvasDrag":
                    return "canvasDrag";
            }
        }
    }else{
        return arr[0];
    }
    
}

var drawing;
var canvas = document.getElementById("canvas");
var canvasBackground = document.getElementsByClassName("experienceCanvas")[0];
var context = canvas.getContext("2d");
var canvasRect = canvas.getBoundingClientRect();

resizeCanvas();

setInterval(handleCanvas, 17)


function handleCanvas(){
    resizeCanvas();
    checkCanvasBounds();
}


function resizeCanvas(){
    var rect = canvasBackground.getBoundingClientRect();
    canvas.width = (rect.right - rect.left) * 0.8;
    canvas.height = (rect.bottom - rect.top) * 0.8;
    canvasRect = canvas.getBoundingClientRect();
}

function checkCanvasBounds(){
    var experienceRect = experience.getBoundingClientRect();
    for(var i = 0; i < canvasDraggable.length; i++){
        if(!canvasDraggable[i].drag){
            var temp = canvasDraggable[i].element.getBoundingClientRect();
            canvasDraggable[i].element.style.left = Math.max(Math.min(canvasDraggable[i].x, canvasRect.right-temp.width - experienceRect.left), canvasRect.left - experienceRect.left) + "px";
            canvasDraggable[i].element.style.top = Math.max(Math.min(canvasDraggable[i].y, canvasRect.bottom-temp.height - experienceRect.top), canvasRect.top - experienceRect.top) + "px";
              
        }
              
    }
    //console.log(bound.right + " " + canvasDraggable[0].element.getBoundingClientRect().right);
}

function onWindowResize(){
    
}

function handleDrawing(event){
    var target = event.target;
    var rect = target.getBoundingClientRect();
    context.fillStyle = "#FF0000";
    if(mouseDown){

        context.fillRect(event.clientX - rect.left, event.clientY - rect.top, 2, 2);
    }
}

var testDrag;

function returnDraggable(index){
    return new Draggable(document.getElementById("canvasDrag" + index), document.getElementById("canvasDrag" + index).getBoundingClientRect.x, document.getElementById("canvasDrag" + index).getBoundingClientRect.y);
}

var canvasDraggable = new Array();
canvasDraggable.length = 3;

for(var i = 0; i < 3; i++){
    canvasDraggable[i] = returnDraggable(i+1);
}

console.log(canvasDraggable.toString());

for(var i = 0; i < canvasDraggable.length;i++){
    canvasDraggable[i].element.ondragstart = returnFalse;
    canvasDraggable[i].x = -999;
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
        case "canvasDrag":
            for(var i = 0; i < canvasDraggable.length; i++){
                if(event.target.id === canvasDraggable[i].element.id){
                    canvasDraggable[i].drag = true;
                    if(canvasDraggable[i].x == -999){
                        canvasDraggable[i].x = canvasDraggable[i].element.getBoundingClientRect().left - experience.getBoundingClientRect().left;
                    
                        canvasDraggable[i].y = canvasDraggable[i].element.getBoundingClientRect().top - experience.getBoundingClientRect().top;
                    }
                }
            }
            break;
    }
}

function onMouseMove(event){
    mousePos = new Vector(event.clientX, event.clientY);
    var experienceRect = experience.getBoundingClientRect();
    if(mouseDown){
        mouseDragVector = mousePos.sub(beginPos);
        if(aboutMeDrag){
            aboutMe.style.left = aboutMePos.x+mouseDragVector.x + "px";
            aboutMe.style.top = aboutMePos.y+mouseDragVector.y + "px";
        }else if(projectsDrag){
            projects.style.left = projectsPos.x+mouseDragVector.x + "px";
            projects.style.top = projectsPos.y+mouseDragVector.y + "px";
        }else if(experienceDrag){
            experience.style.left = experiencePos.x+mouseDragVector.x + "px";
            experience.style.top = experiencePos.y+mouseDragVector.y + "px";
        }else if(testDrag){
            testDragElement.style.left = experiencePos.x+mouseDragVector.x + "px";
            testDragElement.style.top = experiencePos.x+mouseDragVector.y + "px";
        }else{
            for(var i = 0; i < canvasDraggable.length; i++){
                if(canvasDraggable[i].drag){
                    var temp = canvasDraggable[i].element.getBoundingClientRect();
                    
                    canvasDraggable[i].element.style.left = Math.max(Math.min(canvasDraggable[i].x+mouseDragVector.x, canvasRect.right-temp.width - experienceRect.left), canvasRect.left - experienceRect.left) + "px";
                    canvasDraggable[i].element.style.top = Math.max(Math.min(canvasDraggable[i].y+mouseDragVector.y, canvasRect.bottom-temp.height - experienceRect.top), canvasRect.top - experienceRect.top) + "px";
                }
            }
        }
        
    }
}

function onMouseUp(){
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
    }else{
        var experienceRect = experience.getBoundingClientRect();
        for(var i = 0; i < canvasDraggable.length; i++){
            if(canvasDraggable[i].drag){
                var temp = canvasDraggable[i].element.getBoundingClientRect();
                canvasDraggable[i].drag = false;
                canvasDraggable[i].x = Math.max(Math.min(canvasDraggable[i].x+mouseDragVector.x, canvasRect.right-temp.width - experienceRect.left), canvasRect.left - experienceRect.left);
                canvasDraggable[i].y = Math.max(Math.min(canvasDraggable[i].y+mouseDragVector.y, canvasRect.bottom-temp.height - experienceRect.top), canvasRect.top - experienceRect.top);
                break;
            }
        }
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
