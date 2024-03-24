function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();

    if(rect.bottom >= 0){
        return 1;
    }else if (rect.top <= (window.innerHeight || document.documentElement.clientHeight)){
        return -1;
    }
}



//const rightPanel = document.getElementById('rightPanel');
const scrollWrapper = document.getElementById("infiniteScroll")
const rightPanel = document.getElementById("right1")
console.log(rightPanel)
var dupe = rightPanel.cloneNode(true);
dupe.id = "right2";
scrollWrapper.appendChild(dupe);
var panels = [rightPanel, dupe]

//rightPanel.scrollIntoView();

/* function update(){
    window.scrollBy({
        top: 1, // vertical scroll amount
        left: 0, // horizontal scroll amount
        behavior: 'smooth' // smooth scroll
      });
    requestAnimationFrame(update);
}
requestAnimationFrame(update); */


let lastScroll = 0;

document.addEventListener('scroll', () => {
    //console.log(panels)
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if(isElementInViewport(panels[0]) == -1)
    {
        scrollWrapper.append(panels[0]);
        [panels[0], panels[1]] = [panels[1], panels[0]];
    }
    else if(panels[0].getBoundingClientRect().top >= -50)
    {
        scrollWrapper.insertBefore(panels[1], panels[0]);
        [panels[0], panels[1]] = [panels[1], panels[0]];
        panels[1].scrollIntoView({ behavior: 'instant', block: 'start' });
        document.scrollTop = -panels[0].getBoundingClientRect().top + 100;
    }

    console.log(panels[0].getBoundingClientRect().top);
    lastScroll = currentScrollPosition

});


/* autoScroll = setInterval(() => {
    // Check if the user has taken over the scrolling
    window.scrollBy(0, 1); // Scroll down 1 pixel; adjust as needed
    console.log("pog")
}, 17); // Adjust the interval for faster or slower scrolling */

var emptyDiv = document.createElement("div");
emptyDiv.style.height = "100%";
emptyDiv.style.width = "100%";


document.querySelectorAll('.img-square').forEach(item => {
    item.addEventListener('click', function() {
      // Check if the item is already expanded
      if (this.classList.contains('expanded')) {
        this.classList.remove('expanded'); // Shrink back
        this.parentElement.removeChild(emptyDiv);
      } else {
        // Remove expanded class from any item that has it
        const expandedItem = document.querySelector('.expanded');
        if (expandedItem) {
          expandedItem.classList.remove('expanded');
          this.parentElement.removeChild(emptyDiv);
        }
        this.classList.add('expanded'); // Expand this item
        this.parentElement.insertBefore(emptyDiv, this);
      }
    });
  });