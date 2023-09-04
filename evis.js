import anime from '/animejs/index.js';
import {setup} from '/script.js';

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
        left: "5%",
        easing: 'easeOutQuad',
        duration: 750,
        autoplay: false,
    }),
    back: document.getElementById("evisBack"),
    tl: anime.timeline({
        easings: 'linear',
        duration: 750
    }),
}
/*
evis.anim.update = function(anim){
    evis.el.style.left = Math.min(0, evis.panel.getBoundingClientRect().left - evis.origPos.left + evis.el.width + 20);
    console.log(evis.panel.getBoundingClientRect().left);
}*/
setup(evis);

console.log(window.innerHeight);
var postit = document.getElementById("postit");

window.onclick = function(e){
    console.log(e.x + " " + e.y );
}
var evisImages = document.getElementById("evisImages");
var evisContent = document.getElementById("evisContent");
resize();

window.onresize = function(e){
    console.log(window.innerHeight + " poggers " + window.innerWidth);
    resize();
};

function resize(){
    if(window.innerHeight > window.innerWidth*0.8){
        evisContent.style.flexDirection = "column";
        postit.style.height = evis.panel.clientWidth * 0.4 + "px";
        postit.style.width = evis.panel.clientWidth * 0.4 + "px";
        evisImages.style.width = evis.panel.clientHeight * 0.6 + "px";
        evisImages.style.height = evis.panel.clientHeight * 0.6 + "px";
        postit.style.width = evis.panel.clientWidth*0.9;
    }else{
        evisContent.style.flexDirection = "row";
        postit.style.height = evis.panel.clientHeight * 0.6 + "px";
        postit.style.width = evis.panel.clientHeight * 0.6 + "px";
        evisImages.style.width = evis.panel.clientWidth * 0.4 + "px";
        evisImages.style.height = evis.panel.clientWidth * 0.4 + "px";
    }
}

