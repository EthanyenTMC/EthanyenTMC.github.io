class Vector{
    constructor(xLoc,yLoc){
        this.x = xLoc;
        this.y = yLoc;
        this.isVector = true;
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
var aboutMeDrag = false;

function onMouseDown(event){
    mouseDown = true;
    activeClick = event.target;
    switch(activeClick.id){
        case "aboutMeTop":
            beginPos = new Vector(event.clientX, event.clientY);
            aboutMeDrag = true;
            break;
        case "draggableAboutMe":
            beginPos = new Vector(event.clientX, event.clientY);
            aboutMeDrag = true;
            break;
    }
    console.log(mousePos);
}

function onMouseMove(event){
    mousePos = new Vector(event.clientX, event.clientY);
    if(mouseDown){
        mouseDragVector = mousePos.sub(beginPos);
        switch(activeClick.id){
            case "aboutMeTop": //15 97
            
                aboutMe.style.left = aboutMePos.x+mouseDragVector.x + "px";
                aboutMe.style.top = aboutMePos.y+mouseDragVector.y + "px";
                break;
            case "draggableAboutMe":
                aboutMe.style.left = aboutMePos.x+mouseDragVector.x + "px";
                aboutMe.style.top = aboutMePos.y+mouseDragVector.y + "px";
                break;
        }
    }
}

function onMouseUp(){
    mouseDown = false;
    beginPos = null;
    if(aboutMeDrag){
        aboutMeDrag = false;
        aboutMePos = new Vector(aboutMePos.x+mouseDragVector.x, aboutMePos.y+mouseDragVector.y);
    }
}
