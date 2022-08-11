var highestLayer=1;
var activeLayer;
var projects, aboutMe;

function init(){
    projects = document.getElementById("projects");
    aboutMe = document.getElementById("aboutMe");
}
document.addEventListener('wheel', handleScroll);

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
            aboutMeProgress = Math.min(aboutMeBaseText.length, aboutMeProgress+10*event.deltaY/Math.abs(event.deltaY));
            aboutMeText.innerHTML = aboutMeBaseText.substring(0, aboutMeProgress);
            break;
    }

}