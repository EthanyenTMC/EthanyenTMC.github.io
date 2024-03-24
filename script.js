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



let lastScroll = 0;

document.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    //console.log(panels)
    if(isElementInViewport(panels[0]) == -1)
    {
        scrollWrapper.append(panels[0]);
        [panels[0], panels[1]] = [panels[1], panels[0]];
    }
    else if(panels[0].getBoundingClientRect().top == 0)
    {
        scrollWrapper.insertBefore(panels[1], panels[0]);
        [panels[0], panels[1]] = [panels[1], panels[0]];
        panels[1].scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    /* for(let i = 0; i < panels.length; i++){
        let temp = isElementInViewport(panels[i])
        if(temp == -1 && currentScroll > lastScroll){
            scrollWrapper.appendChild(panels[i]);
        }else if(temp == 1  && currentScroll < lastScroll){
            scrollWrapper.insertBefore(panels[i], scrollWrapper.firstChild);
        }
    } */

    
    lastScroll = currentScroll;
});

