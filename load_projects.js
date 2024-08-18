// Function to create a work div
/*

<div class="work">
    <div class="work-text">
        <h3>Work 3</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis scelerisque velit, blandit ultrices lectus.</p>
    </div>
    <img src="https://via.placeholder.com/200" alt="work3">
</div>
*/

var tags_color_array = ["tag-color1", "tag-color2", "tag-color3"];
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
    tagsDiv.appendChild(tag);
  }

  // Create the img element and set its attributes
  const img = document.createElement("img");
  img.src = element.image;

  // Create the button element

  // Append the button to the work di

  // Append the work-text div and img to the main work div
  workTextDiv.appendChild(tagsDiv);
  if (element.link != "") {
    const button = document.createElement("a");
    button.textContent = "Learn More";
    button.className = "project-link";
    button.addEventListener("click", () => {
      window.location.href = element.link;
    });
    workTextDiv.appendChild(button);
  }

  workDiv.appendChild(workTextDiv);
  workDiv.appendChild(img);

  // Return the constructed work div
  return workDiv;
}

// Function to load projects from a JSON file
async function loadProjects() {
  try {
    const response = await fetch("projects.json"); // Replace with your file path or URL
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const jsonData = await response.json();

    // Process the array of elements
    jsonData.forEach((element) => {
      const workDiv = createWorkDiv(element);
      document.querySelector(".works").appendChild(workDiv);
      console.log(element);
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Call the function to load projects
loadProjects();
