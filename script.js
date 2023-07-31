import anime from '/animejs/index.js';

var title2 = document.getElementById("title2");

//test
anime({
    targets: title2,
    height: "100%",
    duration: 1000,
    easing: 'easeInSine'
});


var icons = document.getElementsByClassName("icon");






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

