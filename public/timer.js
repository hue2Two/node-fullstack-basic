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