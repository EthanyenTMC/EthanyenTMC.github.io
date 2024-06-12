var scrollAnimation;
var isUserScrolling = false;

document.querySelectorAll('.nav').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        isUserScrolling = false;
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

        scrollAnimation = anime({
            targets: { scrollPosition: window.scrollY },
            scrollPosition: targetPosition,
            round: 1,
            easing: 'easeInOutQuad',
            duration: 1000,
            update: function(anim) {
                if (isUserScrolling) {
                    scrollAnimation.pause();
                    isUserScrolling = false;
                } else {
                    window.scroll(0, anim.animations[0].currentValue);
                }
            },
            complete: function() {
                isUserScrolling = false;
            }
        });
    });
});

window.addEventListener('wheel', function() {
    isUserScrolling = true;
});

const projects = document.querySelectorAll('.project');
let currentIndex = 0;

document.getElementById('left-arrow').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
    }
    anime({
        targets: document.getElementById('projects'),
        scrollLeft: projects[currentIndex].offsetLeft,
        duration: 1000, // Duration in milliseconds
        easing: 'easeInOutQuad' // Easing function
    });

    anime({
        targets: { scrollPosition: window.scrollY },
        scrollPosition: document.getElementById('projects').getBoundingClientRect().top + window.scrollY,
        round: 1,
        easing: 'easeInOutQuad',
        duration: 750,
        update: function(anim) {
            window.scroll(0, anim.animations[0].currentValue);
        }
    });
});

document.getElementById('right-arrow').addEventListener('click', function() {
    if (currentIndex < projects.length - 1) {
        currentIndex++;
    }
    anime({
        targets: document.getElementById('projects'),
        scrollLeft: projects[currentIndex].offsetLeft,
        duration: 1000, // Duration in milliseconds
        easing: 'easeInOutQuad' // Easing function
    });

    anime({
        targets: { scrollPosition: window.scrollY },
        scrollPosition: document.getElementById('projects').getBoundingClientRect().top + window.scrollY,
        round: 1,
        easing: 'easeInOutQuad',
        duration: 750,
        update: function(anim) {
            window.scroll(0, anim.animations[0].currentValue);
        }
    });
});

const sections = [
    document.querySelector('.centered-wrapper'),
    document.querySelector('#projects-container'),
    document.querySelector('#aboutme'),
    document.querySelector('#experience')
];

