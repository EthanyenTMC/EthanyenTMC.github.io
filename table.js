import anime from '/animejs/index.js';
import {setup} from '/script.js';

var table = {
    el: document.getElementById("table"),
    origPos: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    panel: document.getElementById("tablePanel"),
    anim: anime.timeline({
        easing: 'easeOutQuad',
        autoplay: false
    }),
    back:document.getElementById("tableBack"),
}

var children = table.panel.children;

table.anim.add({
    targets: "#tablePanel",
    top: ["100%", "3%"],
    easing: 'easeOutQuart',
    opacity: [.1, 1],
    duration: 750
}, 200);

for(var i = 0; i < children.length; i++){
    if(children[i].id == "tree"){
        table.anim.add({
            targets: children[i],
            translateY:[75, 0],
            opacity: [0, .3],
            duration: 750
        }, 250+100*i);
    }else{
        table.anim.add({
            targets: children[i],
            translateY:[75, 0],
            opacity: [.1, 1],
            duration: 750
        }, 250+100*i);
    }
}

setup(table);