document.querySelectorAll('.nav').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

        anime({
            targets: { scrollPosition: window.scrollY },
            scrollPosition: targetPosition,
            round: 1,
            easing: 'easeInOutQuad',
            duration: 1000,
            update: function(anim) {
                window.scroll(0, anim.animations[0].currentValue);
            }
        });
    });
});