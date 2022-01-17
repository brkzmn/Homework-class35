'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-4-whats-the-time

1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
const watch = document.createElement("div");
function addCurrentTime() {
  
  watch.style.border = "3px solid green";
  watch.style.display = "inline-block";
  watch.style.padding = "10px";
  watch.style.margin = "20px";
  watch.style.fontSize = "40px";
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); 
  watch.textContent = currentTime;
  document.body.appendChild(watch);
}

window.addEventListener("DOMContentLoaded", () => {
  window.setInterval(addCurrentTime, 1000);
});
