var navBar = document.getElementById('navBar');


document.onmousemove=getCursorPos;
var output = document.getElementById('output');
function getCursorPos(a)
{
var posx = a.clientX;
var posy = a.clientY;
//output.innerHTML="Position X: " + posx + "px & Position Y: " + posy + "px";
if(posy < 300){
        navBar.style.opacity = (300-posy)/200;
    }else{
        navBar.style.opacity = 0;
    }
} 

var fonts = ["MonteCarlo", "Lobster Two", "Rajdhani", "Oswald"];
var currentFont = 1;
var myNameIs = document.getElementById("typewriter");
myNameIs.style.fontFamily = fonts[currentFont];

function switchFont(){
    currentFont++;
    if(currentFont > 3){
        currentFont = 0;
    }
    if(currentFont == 0){
        myNameIs.style.top = "28%";
    }else{
        myNameIs.style.top = "30%";
    }
    myNameIs.style.fontFamily = fonts[currentFont];
    
}

//typewriter effect

document.addEventListener('DOMContentLoaded',function(event){
    // array with texts to type in typewriter
    var dataText = [ "My Name is"];
    
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
       document.getElementById('typewriter').innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 75);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
            switchFont();
            StartTextAnimation(0);
          }, 2000);
       }
       // check if dataText[i] exists
      if (i < dataText[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation(i + 1);
       });
      }
    }
    // start the text animation
    StartTextAnimation(0);
  });








