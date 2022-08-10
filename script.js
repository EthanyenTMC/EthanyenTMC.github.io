


function showAboutMe(){
    anime({
        targets:'.aboutMe',
        keyframes:[
            {   
                
                translateY:'-88vh',
                translateX:'15vw',
                duration:1
            },
            {   
                opacity:100,
                translateY:'-91vh',
                duration:500,
                easing:'easeOutQuint'
            }
        ]
    });
}