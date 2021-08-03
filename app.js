var navBar = document.getElementById('navBar');


document.onmousemove=getCursorPos;
var output = document.getElementById('output');
function getCursorPos(a)
{
var posx = a.clientX;
var posy = a.clientY;
output.innerHTML="Position X: " + posx + "px & Position Y: " + posy + "px";
if(posy < 300){
        navBar.style.opacity = (300-posy)/200;
    }else{
        navBar.style.opacity = 0;
    }
} 








