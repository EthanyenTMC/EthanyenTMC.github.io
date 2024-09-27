// Function to create a work div
/*

<div class="work">
    <div class="work-text">
        <h3>Work 3</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis scelerisque velit, blandit ultrices lectus.</p>
    </div>
    <img src="https://via.placeholder.com/200" alt="work3">
</div>

<!-- <button class="filter-btn" data-filter="all">All</button>
                <button class="filter-btn" data-filter="2024">2024</button>
                <button class="filter-btn" data-filter="2023">2023</button> -->
*/

const tags_filters = document.querySelector(".dropdown-content-tags");
const years_filters = document.querySelector(".dropdown-content-years");

var tags_color_array = ["tag-color1", "tag-color2", "tag-color3"];

var all_works = [];
var all_years = [];
var all_tags = [];

function fancy_contains(array, element_array) {
    for (var i in element_array) {
        if (element_array[i] == "all") {
            continue;
        } else if (!array.contains(element_array[i])) {
            return false;
        }
    }
    return true;
}

function createWorkDiv(element) {
    // Create the main div with class 'work'
    const workDiv = document.createElement("div");
    workDiv.className = "work";

    // Create the nested div with class 'work-text'
    const workTextDiv = document.createElement("div");
    workTextDiv.className = "work-text";

    const tagsDiv = document.createElement("div");
    tagsDiv.className = "work-tags";

    // Create the h3 element and set its text content
    const h3 = document.createElement("h3");
    h3.textContent = element.title;

    // Create the p element and set its text content
    const p = document.createElement("p");
    p.textContent = element.description;

    // Append h3 and p to the work-text div
    workTextDiv.appendChild(h3);
    workTextDiv.appendChild(p);

    for (var i in element.tags) {
        const tag = document.createElement("span");
        tag.textContent = element.tags[i];
        tag.className = "tag";
        tag.className += " " + tags_color_array[Math.floor(Math.random() * 3)];
        var thing = element.tags[i].replace(" ", "-");
        workDiv.className += " " + thing;
        if (all_tags.indexOf(thing) == -1) {
            all_tags.push(thing);
        }
        tagsDiv.appendChild(tag);
    }

    workDiv.className += " " + element.year;
    if (all_years.indexOf(element.year) == -1) {
        all_years.push(element.year);
    }
    // Create the img element and set its attributes
    const img_div = document.createElement("div");
    img_div.className = "work-img";

    const img = document.createElement("img");
    img.src = element.image;

    img_div.appendChild(img);

    // Create the button element

    // Append the button to the work di

    // Append the work-text div and img to the main work div
    workTextDiv.appendChild(tagsDiv);
    if (element.link != "") {
        const button = document.createElement("a");
        button.textContent = "Learn More";
        button.className = "project-link";
        /* button.addEventListener("click", () => {
            window.location.href = element.link;
        }); */
        button.href = element.link;
        workTextDiv.appendChild(button);
    }

    workDiv.appendChild(workTextDiv);
    workDiv.appendChild(img_div);

    workDiv.addEventListener("click", () => {
        const headerHeight = document.querySelector(".header").offsetHeight;
        /* const targetOffset =
            workDiv.offsetTop +
            headerHeight -
            (window.innerHeight - headerHeight) / 2; */
        const targetOffset =
            workDiv.offsetTop - headerHeight - window.innerHeight / 55;
        window.scrollTo({
            top: targetOffset,
            behavior: "smooth",
        });
    });

    // Return the constructed work div
    return workDiv;
}

// Function to load projects from a JSON file
export async function loadProjects() {
    try {
        const response = await fetch("projects.json"); // Replace with your file path or URL
        if (!response.ok) {
            throw new Error(
                "Network response was not ok " + response.statusText
            );
        }
        const jsonData = await response.json();

        // Process the array of elements
        jsonData.forEach((element) => {
            const workDiv = createWorkDiv(element);
            document.querySelector(".works").appendChild(workDiv);
            all_works.push(workDiv);
        });
    } catch (error) {
        console.error(
            "There has been a problem with your fetch operation:",
            error
        );
    }
}

// Call the function to load projects
const work_section = document.querySelector(".works");
const more_btn = document.querySelector(".more-btn");


function goAway(link) {
    const bodyChildren = document.querySelector(".wrapper").children;
    console.log(bodyChildren);
    var aniList = [];
    /* console.log("------------------------");
    console.log(window.scrollY + " " + (window.scrollY + window.innerHeight));
    console.log("------------------------"); */
    for (let i = 0; i < bodyChildren.length; i++) {
        const child = bodyChildren[i];
        const rect = child.getBoundingClientRect();
        /* console.log(child.className + " " + rect.top + " " + rect.bottom); */
        if (
            (rect.top > 0 && rect.top < window.innerHeight) ||
            (rect.bottom > 0 && rect.bottom < window.innerHeight) ||
            (rect.top < 0 && rect.bottom > window.innerHeight)
        ) {
            console.log(child.className);
            if (child.className == "works-section") {
                const works = child.querySelector(".works");
                aniList.push(child.querySelector("h2"));
                aniList.push(document.querySelector(".filter-wrapper"));
                for (let j = 0; j < works.children.length; j++) {
                    //console.log(child);
                    aniList.push(works.children[j]);
                }
            } else if (
                child.className != "header" &&
                aniList.indexOf(child.className) == -1
            ) {
                aniList.push("." + child.className);
            }
        }
    }
    //console.log(aniList);
    anime({
        targets: aniList,
        opacity: [1, 0],
        duration: 500,
        easing: "linear",
        delay: anime.stagger(100),
        begin: function (anim) {
            console.log("targets " + anim.targets);
        },
        /* update: function (anim) {
            console.log("progress : " + Math.round(anim.progress) + "%");
        }, */
        complete: function () {
            window.location.href = link;
        },
    });
}

var curr_filters = ["all", "all"];

loadProjects().then(() => {
    // Code to run after loadProjects() is completed
    // Add your code here
    for (var i in all_tags) {
        const button = document.createElement("button");
        button.className = "tags-filter-btn";
        button.setAttribute("data-filter", all_tags[i]);
        button.textContent = all_tags[i];
        document.querySelector(".dropdown-content-tags").appendChild(button);
    }

    for (var i in all_years) {
        const button = document.createElement("button");
        button.className = "years-filter-btn";
        button.setAttribute("data-filter", all_years[i]);
        button.textContent = all_years[i];
        document.querySelector(".dropdown-content-years").appendChild(button);
    }

    const work_section = document.querySelector(".works");
    const more_btn = document.querySelector(".more-btn");

    const yearsFilterButtons = document.querySelectorAll(".years-filter-btn");
    /* console.log(all_works); */

    yearsFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            curr_filters = [filter, curr_filters[1]];
            document.querySelector(".years-btn").textContent = `x ${filter} x`;
            more_btn.style.display = "none";
            work_section.classList.add("show-more");
            all_works.forEach((work) => {
                console.log(work.classList);
                if (fancy_contains(work.classList, curr_filters)) {
                    work.style.display = "flex";
                } else {
                    work.style.display = "none";
                }
            });
        });
    });

    const tagsFilterButtons = document.querySelectorAll(".tags-filter-btn");

    tagsFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            curr_filters = [curr_filters[0], filter];
            document.querySelector(".tags-btn").textContent = `x ${filter} x`;
            more_btn.style.display = "none";
            work_section.classList.add("show-more");
            all_works.forEach((work) => {
                console.log(work.classList);
                if (fancy_contains(work.classList, curr_filters)) {
                    work.style.display = "flex";
                } else {
                    work.style.display = "none";
                }
            });
        });
    });
    const event = new CustomEvent("projectsLoaded");
    window.dispatchEvent(event);

    const button_links = document.querySelectorAll(".project-link");
    console.log(button_links);

    for (let i = 0; i < button_links.length; i++) {
        const button = button_links[i];

        button.addEventListener("click", (event) => {
            event.preventDefault();
            goAway(button.href);
        });
    }
});

/* document.addEventListener("click", () => {
  console.log(curr_filters);
}); */
// Ensure that all_tags and all_years arrays are populated before running the loops

document.addEventListener("DOMContentLoaded", () => {
    function configureDropdown(key, dropdownBtn, dropdownContent) {
        dropdownBtn.addEventListener("click", () => {
            if (key == "years") {
                if (curr_filters[0] == "all") {
                    years_filters.classList.toggle("show");
                } else {
                    curr_filters = ["all", curr_filters[1]];
                    document.querySelector(".years-btn").textContent = "Date";
                    more_btn.style.display = "block";
                    work_section.classList.remove("show-more");
                }
                all_works.forEach((work) => {
                    console.log(work.classList);
                    if (fancy_contains(work.classList, curr_filters)) {
                        work.style.display = "flex";
                    } else {
                        work.style.display = "none";
                    }
                });
            } else if (key == "tags") {
                if (curr_filters[1] == "all") {
                    tags_filters.classList.toggle("show");
                } else {
                    curr_filters = [curr_filters[0], "all"];
                    document.querySelector(".tags-btn").textContent =
                        "Category";
                    more_btn.style.display = "block";
                    work_section.classList.remove("show-more");
                }
                all_works.forEach((work) => {
                    console.log(work.classList);
                    if (fancy_contains(work.classList, curr_filters)) {
                        work.style.display = "flex";
                    } else {
                        work.style.display = "none";
                    }
                });
            }
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener("click", (event) => {
            if (!event.target.matches(".dropdown-btn")) {
                if (dropdownContent.classList.contains("show")) {
                    dropdownContent.classList.remove("show");
                }
            }
        });
    }
    const buttons = ["years", "tags"];
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");
    const dropdownContents = document.querySelectorAll(".dropdown-content");

    dropdownBtns.forEach((dropdownBtn, index) => {
        const dropdownContent = dropdownContents[index];
        configureDropdown(buttons[index], dropdownBtn, dropdownContent);
    });
});
