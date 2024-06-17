const projects = document.querySelectorAll('.pannable');
let currentIndex = 0;
console.log(projects);

document.querySelectorAll('.pan-button').forEach(function(button) {
    button.addEventListener('click', function() {
        console.log("button clicked");
        const buttonId = button.id;
        if (buttonId === 'left-button') {
            if (currentIndex > 0) {
                currentIndex--;
            }
            anime({
                targets: document.getElementById('pannables'),
                scrollLeft: projects[currentIndex].offsetLeft,
                duration: 750, // Duration in milliseconds
                easing: 'easeInOutQuad' // Easing function
            });

            anime({
                targets: projects[currentIndex+1].children[0].children,
                opacity: [1, 0.5],
                translateY: ["0vh", "-10vh"],
                delay: anime.stagger(75),
                duration: 1000,
                easing: 'easeOutQuint'
            });

            anime({
                targets: projects[currentIndex].children[0].children,
                opacity: [0.5, 1],
                translateY: ["-10vh","0vh"],
                delay: anime.stagger(75, {start: 500}),
                duration: 1000,
                easing: 'easeOutQuint'
            });

            anime({
                targets: { scrollPosition: window.scrollY },
                scrollPosition: document.getElementById('pannables').getBoundingClientRect().top + window.scrollY,
                round: 1,
                easing: 'easeInOutQuad',
                duration: 750,
                update: function(anim) {
                    window.scroll(0, anim.animations[0].currentValue);
                }
            });
        } else if (buttonId === 'right-button') {
            if (currentIndex < projects.length - 1) {
                currentIndex++;
            }
            anime({
                targets: document.getElementById('pannables'),
                scrollLeft: projects[currentIndex].offsetLeft,
                duration: 750, // Duration in milliseconds
                easing: 'easeInOutQuad' // Easing function
            });

            anime({
                targets: projects[currentIndex-1].children[0].children,
                opacity: [1, 0.5],
                translateY: ["0vh", "-10vh"],
                delay: anime.stagger(75),
                duration: 1000,
                easing: 'easeOutQuint'
            });

            anime({
                targets: projects[currentIndex].children[0].children,
                opacity: [0.5, 1],
                translateY: ["-10vh","0vh"],
                delay: anime.stagger(75, {start: 500}),
                duration: 1000,
                easing: 'easeOutQuint'
            });

            anime({
                targets: { scrollPosition: window.scrollY },
                scrollPosition: document.getElementById('pannables').getBoundingClientRect().top + window.scrollY,
                round: 1,
                easing: 'easeInOutQuad',
                duration: 750,
                update: function(anim) {
                    window.scroll(0, anim.animations[0].currentValue);
                }
            });
        }
    });
});


