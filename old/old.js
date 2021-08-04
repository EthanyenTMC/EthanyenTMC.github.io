const intro = document.querySelector('.intro');
const video = intro.querySelector('video');

const section = document.querySelector('section');
const end = section.querySelector('h1');
var profPic = document.getElementById('pfp');

//scroll stuff
const controller = new ScrollMagic.Controller();
//scene
const scene = new ScrollMagic.Scene({
    duration: 3100,
    triggerElemnt: intro,
    triggerHook: 0
})
.addIndicators()
.setPin(intro)
.addTo(controller);


//video animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;
let imgOpacity = 0;

scene.on('update', e => {
    scrollpos = e.scrollPos / 1033; //scrollPos is scrollMagic thing not my variable DO NOT CONFUSE
});

setInterval(() => {
    delay += (scrollpos - delay) * accelamount;
    video.currentTime = delay;
    //0.76 - 2.88
    imgOpacity = (delay - 0.76) / 2.88;
    profPic.style.opacity = imgOpacity.toString();

}, 33.3)




