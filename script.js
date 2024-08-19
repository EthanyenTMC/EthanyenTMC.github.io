// Get all child elements of the ".header" div
const headerChildren = document.querySelector(".header").children;
console.log(headerChildren);
// Loop through each child element
for (let i = 0; i < headerChildren.length; i++) {
    const child = headerChildren[i];

    // Check if the child element has a value in "data-scroll-target"
    const scrollTarget = child.getAttribute("data-scroll-target");
    console.log(scrollTarget);
    if (scrollTarget) {
        // Create a click event listener for the child element
        child.addEventListener("click", () => {
            console.log("pog");
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
}
