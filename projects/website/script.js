document.addEventListener("DOMContentLoaded", (event) => {
    console.log("pog");
    anime({
        targets: ".wrapper > *",
        opacity: [0, 1],
        duration: 3000,
    });
});
