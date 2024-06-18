const projects = document.querySelectorAll(".pannable");
let currentIndex = 0;
console.log(projects);

var animations = {
    panning: "",
    fadeout: "",
    fadein: "",
    scroll: "",
};

function stopAnimations() {
    for (var key in animations) {
        if (animations.hasOwnProperty(key)) {
            if (animations[key] && animations[key].paused === false) {
                animations[key].pause();
            }
        }
    }
}


function do_animation(direction) {
    stopAnimations();

    previous_index = currentIndex;
    if (direction == 1){
        if (currentIndex < projects.length - 1) {
            currentIndex++;
        }else{
            currentIndex = 0; 
        }
    }else{
        if (currentIndex > 0) {
            currentIndex--;
        }else{
            currentIndex = projects.length - 1;
        }
    }
    console.log(currentIndex);
    animations["panning"] = anime({
        targets: document.getElementById("pannables"),
        scrollLeft: projects[currentIndex].offsetLeft,
        duration: 750, // Duration in milliseconds
        easing: "easeInOutQuad", // Easing function
    });

    animations["fadeout"] = anime({
        targets: projects[previous_index].children[0].children,
        opacity: [1, 0],
        translateY: ["0vh", "-10vh"],
        delay: anime.stagger(75),
        duration: 1000,
        easing: "easeOutQuint",
    });

    animations["fadein"] = anime({
        targets: projects[currentIndex].children[0].children,
        opacity: [0, 1],
        translateY: ["-10vh", "0vh"],
        delay: anime.stagger(75, { start: 500 }),
        duration: 1000,
        easing: "easeOutQuint",
    });

    animations["scroll"] = anime({
        targets: { scrollPosition: window.scrollY },
        scrollPosition:
            document.getElementById("pannables").getBoundingClientRect().top +
            window.scrollY,
        round: 1,
        easing: "easeInOutQuad",
        duration: 750,
        update: function (anim) {
            window.scroll(0, anim.animations[0].currentValue);
        },
    });
}

document.querySelectorAll(".pan-button").forEach(function (button) {
    button.addEventListener("click", function () {
        console.log("button clicked");
        const buttonId = button.id;
        if (buttonId === "left-button") {
            do_animation(-1);
        } else if (buttonId === "right-button") {
            do_animation(1);
        }
    });
});
