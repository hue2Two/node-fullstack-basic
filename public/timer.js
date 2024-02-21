console.log("running timer js");

let timerCount = 0;
let intervalID;
let btnStart = document.querySelector("#btn-start");
let btnPause = document.querySelector("#btn-pause");
let btnReset = document.querySelector("#btn-reset");
let timerDisplay = document.querySelector("#timerDisplay");

btnStart.addEventListener("click", () => {
    console.log("start button was clicked");
    intervalID = setInterval(() => {
        timerCount++;
        timerDisplay.innerText = timerCount;
    }, 1000);
});

btnPause.addEventListener("click", () => {
    console.log("pause button was clicked");
    clearInterval(intervalID);
});

btnReset.addEventListener("click", () => {
    console.log("reset button was clicked");
    timerCount = 0;
    timerDisplay.innerText = timerCount;
    clearInterval(intervalID);
});

// slide show add on -------------------------------------------

var i = 0; // Current image index
var image1 = "/images/image1.png";
var image2 = "/images/image2.jpg";
var image3 = "/images/image3.jpg";

var images = [image1, image2, image3]; // Image array
var time = 1500; // Time between slides in milliseconds

function changeImg() {
    var slideShowInner = document.getElementById('slideShowInner');

    // Clear current image
    slideShowInner.innerHTML = '';

    // Create new image element
    var img = document.createElement('img');
    img.src = images[i];
    img.width = 500; // Set desired width
    img.height = 300; // Set desired height

    // Append new image to the <p> tag
    slideShowInner.appendChild(img);

    // Increment i to the next image
    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }

    // Schedule the next change
    setTimeout(changeImg, time);
}

// Start the slideshow when the window loads
window.onload = changeImg;

