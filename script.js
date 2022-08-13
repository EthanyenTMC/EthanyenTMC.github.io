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

class Window{
    constructor(el, startPos){
        this.element = el;
        this.pos = startPos;
        this.visible = false;
    }

    toggleVisible(){
        this.visible = true;

        if(aboutV){ // hide
            anime({
                targets: this.element.id,
                keyframes:[
                    {   
                        translateY: this.pos.y-(3*window.innerHeight/100),
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
            highestLayer++;
            this.element.style.zIndex = highestLayer.toString();
            activeLayer = this.element.id;
            anime({
                targets:this.element.id,
                keyframes:[
                    {   
                        
                        translateY:this.pos.y-(3*window.innerHeight/100),
                        translateX:this.pos.x, 
                        duration:1
                    },
                    {   
                        opacity:100,
                        translateY:this.pos.y,
                        duration:250,
                        easing:'easeOutQuint'
                    }
                ]
            });
        }
        this.isVisible = !this.isVisible;

    }
}


var highestLayer=1;
var activeLayer;
var projects, aboutMe;

function init(){
    projects = document.getElementById("projects");
    aboutMe = document.getElementById("aboutMe");
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
    }else{ // show
        setHighest(aboutMe);
        activeLayer = "aboutMe";
        if(aboutMePos.x === -999){
            aboutMePos = new Vector(aboutMe.getBoundingClientRect().left,aboutMe.getBoundingClientRect().top);
        }
        console.log(aboutMe.style.zIndex);
        anime({
            targets:'#aboutMe',
            keyframes:[
                {   
                    
                    translateY:'-94vh',
                    translateX:'15vw', 
                    duration:1
                },
                {   
                    opacity:100,
                    translateY:'-97vh',
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

function setHighest(thing){
    highestLayer++;
    thing.style.zIndex = highestLayer.toString();
}

const aboutMeText = document.getElementById("aboutMeText");
var aboutMeBaseText = aboutMeText.innerHTML;
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
            aboutMeProgress = Math.min(aboutMeBaseText.length, aboutMeProgress+10*delta);
            aboutMeText.innerHTML = aboutMeBaseText.substring(0, aboutMeBaseText.indexOf(" ", aboutMeProgress-1));
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
    for(var i = 0; i < arr.length; i++){
        switch(arr[i]){
            case "aboutMeDraggable":
                return "aboutMeDraggable";
            case "projectsDraggable":
                return "projectsDraggable";
            case "experienceDraggable":
                return "experienceDraggable";
        }
    }
}

function onMouseDown(event){
    mouseDown = true;
    activeClick = event.target;
    console.log(returnRelevantClassName(activeClick.className));
    beginPos = new Vector(event.clientX, event.clientY);
    switch(returnRelevantClassName(activeClick.className)){
        case "aboutMeDraggable":
            aboutMeDrag = true;
            break;
        case "projectsDraggable":
            projectsDrag = true;
            break;
        case "experienceDraggable":
            experienceDrag = true;
            break;
    }
    console.log(mousePos);
}

function onMouseMove(event){
    mousePos = new Vector(event.clientX, event.clientY);
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
    }
}
