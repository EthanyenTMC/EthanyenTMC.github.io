// Get all child elements of the ".header" div
/* const headerChildren = document.querySelector(".header").children;
// Loop through each child element
for (let i = 0; i < headerChildren.length; i++) {
    const child = headerChildren[i];

    // Check if the child element has a value in "data-scroll-target"
    const scrollTarget = child.getAttribute("data-scroll-target");
    if (scrollTarget) {
        // Create a click event listener for the child element
        child.addEventListener("click", () => {
            // Scroll the window to the div with the class name given in "data-scroll-target"
            const targetElement = document.querySelector(`.${scrollTarget}`);
            if (targetElement) {
                const headerHeight =
                    document.querySelector(".header").offsetHeight;
                const targetOffset = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetOffset,
                    behavior: "smooth",
                });
            }
        });
    }
} */

document.addEventListener("DOMContentLoaded", () => {


    const menu = document.querySelector(".menu");
    const menu_button = document.querySelector(".menu-button");
    console.log(menu_button);
    const bg_dimmer = document.querySelector(".bg-dimmer");


    var playing = false;
    const openMenu = anime({
        targets: menu,
        translateX: ["-101%", "0%"],
        duration: 500,
        autoplay: false,
        easing: "easeInOutCirc",
        begin: function(anim) {
            playing = true;
        },
        complete: function(anim) {
            playing = false;
        }
    });

    const closeMenu = anime({
        targets: menu,
        translateX: ["0%", "-101%"],
        duration: 500,
        autoplay: false,
        easing: "easeInOutCirc",
        begin: function(anim) {
            playing = true;
        },
        complete: function(anim) {
            playing = false;
        }
    });

    if (menu.style.transform !== "translateX(-101%)") {
        menu.style.transform = "translateX(-101%)";
    }

    menu_button.addEventListener("click", () => {
        if(!playing){
            menu.classList.toggle("active");
            bg_dimmer.classList.toggle("bg-dimmer-on");
            if (menu.classList.contains("active")) {
                /* document.body.style.overflow = "hidden"; */
                openMenu.play();
            }else{
                closeMenu.play();
            }
        }
        console.log("pog");
    });

    bg_dimmer.addEventListener("click", () => {
        if(!playing){
            if(menu.classList.contains("active")){
                menu.classList.toggle("active");
                bg_dimmer.classList.remove("bg-dimmer-on");
                closeMenu.play();
            }
        }
    });

    const menuChildren = menu.children;
// Loop through each child element
for (let i = 0; i < menuChildren.length; i++) {
    const child = menuChildren[i];
    console.log("sog");
    // Check if the child element has a value in "data-scroll-target"
    const scrollTarget = child.getAttribute("data-scroll-target");
    if (scrollTarget) {
        // Create a click event listener for the child element
        child.addEventListener("click", () => {
            // Scroll the window to the div with the class name given in "data-scroll-target"
            const targetElement = document.querySelector(`.${scrollTarget}`);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
                if(menu.classList.contains("active")){
                    menu.classList.toggle("active");
                    bg_dimmer.classList.remove("bg-dimmer-on");
                    closeMenu.play();
                }
            }
        });
    }
}
});



// HEADER NAVIGATION SETUP /\/\/\/\/\/\/\

/* const circle = document.querySelector(".blurry-circle");

// Get the dimensions of the circle
const circleRect = circle.getBoundingClientRect();
const circleWidth = circleRect.width;
const circleHeight = circleRect.height;
 */
/* const trail = document.querySelectorAll(".trail");
console.log(trail);
let trailCoordinates = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
]; */
/* 
var mouseX = 0;
var mouseY = 0;
var screenWidth = window.innerWidth;
const startColor = [0, 157, 255]; // Red
const endColor = [234, 0, 255]; // Blue

window.addEventListener("resize", () => {
    screenWidth = window.innerWidth;
});

function moveBlurryCircle(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Get the scroll position of the document
    const scrollY = window.scrollY;

    const circleX = mouseX - circleWidth / 2;

    // Interpolate the color based on the percentage
    const interpolatedColor = startColor.map((startValue, index) => {
        const endValue = endColor[index];
        const interpolatedValue = Math.round(
            startValue + (endValue - startValue) * (circleX / screenWidth)
        );
        return interpolatedValue;
    });

    const rgbColor = `rgba(${interpolatedColor.join(",")}, 0.2)`;

    // Update the position of the circle
    requestAnimationFrame(() => {
        circle.style.transform = `translate(${mouseX - circleWidth / 2}px, ${
            mouseY - circleHeight / 2 + scrollY
        }px)`;
        circle.style.backgroundColor = rgbColor;
    });

    // Calculate the percentage of the circle's position across the screen
}

document.addEventListener("mousemove", (event) => {
    moveBlurryCircle(event);
}); */

// Add scroll event listener
/* document.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    circle.style.transform = `translate(${mouseX - circleWidth / 2}px, ${
        mouseY - circleHeight / 2 + scrollY
    }px)`;
});
 */
// Calculate the distance moved by the mouse
/* const distanceX = Math.abs(mouseX - trailCoordinates[0].x);
    const distanceY = Math.abs(mouseY - trailCoordinates[0].y);
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Check if the mouse has moved by at least 50px
    if (distance >= 25) {
        // Insert the current mouse coordinates at the beginning of the array
        trailCoordinates.unshift({ x: mouseX, y: mouseY });

        // Remove the last element of the array if it exceeds the desired size
        trailCoordinates.pop();
        console.log(trailCoordinates);
    }

    for (var i = 0; i < trail.length; i++) {
        trail[i].style.transform = `translate(${trailCoordinates[i].x}px, ${
            trailCoordinates[i].y + scrollY
        }px)`;
    } */
