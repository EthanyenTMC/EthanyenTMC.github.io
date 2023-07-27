import anime from '/animejs/index.js';

var title2 = document.getElementById("title2");


anime({
    targets: title2,
    height: "100%",
    duration: 1000,
    easing: 'easeInSine'
});


var icons = document.getElementsByClassName("icon");

var evis = {
    el: document.getElementById("evis"),
    origPos: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    panel: document.getElementById("evisPanel"),
    anim: anime({
        targets: "#evisPanel",
        left: "3%",
        easing: 'easeOutQuad',
        duration: 750,
        autoplay: false,
    }),
    back: document.getElementById("evisBack"),
    tl: anime.timeline({
        easings: 'linear',
        duration: 750
    })
}
/*
evis.anim.update = function(anim){
    evis.el.style.left = Math.min(0, evis.panel.getBoundingClientRect().left - evis.origPos.left + evis.el.width + 20);
    console.log(evis.panel.getBoundingClientRect().left);
}*/
setup(evis);
console.log(evis.origPos.left);





var grid = document.getElementById("grid");
grid.style.setProperty("--columns", icons.length);
console.log(document.getElementsByClassName("icon").length);



export function setup(proj){
    var rect = proj.el.getBoundingClientRect()
    proj.origPos.left = rect.left;
    proj.origPos.right = rect.right;
    proj.origPos.top = rect.top;
    proj.origPos.bottom = rect.bottom;

    proj.el.onclick = function(){
        console.log("clicked");
        //proj.el.classList.add("ontop");
        proj.anim.complete = null;
        if(proj.anim.reversed){
            proj.anim.reverse();
        }
        proj.anim.play();

    }
    proj.back.onclick = function(){
        proj.anim.reverse();
        proj.anim.play();
        /*
        proj.anim.complete = function(anim){
            console.log("thing");
            proj.el.classList.remove("ontop");
        }*/
    }
}

document.onresize = function(e){
    setup(evis);
    setup(table);
}

