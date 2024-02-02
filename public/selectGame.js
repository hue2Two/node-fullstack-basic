console.log(`running selectGame.js`);

let agario = document.querySelector("#agario");
let diepio = document.querySelector("#diepio");
let slitherio = document.querySelector("#slitherio");
let coolMathGames = document.querySelector("#coolMathGames");
let gameClicked;
let clicked = false;
let play_btn = document.querySelector("#play_btn");

function playing(game) {
    console.log(`playing game: ${game}`);

    if (game === "agario") {
        window.open("https://agar.io", "_blank");
    } else if (game === "diepio") {
        window.open("https://diep.io/", "_blank");
    }  else if (game === "slitherio") {
        window.open("https://slither.io/", "_blank");
    }  else if (game === "coolMathGames") {
        window.open("https://www.coolmathgames.com/0-run", "_blank");
    } 
}

agario.addEventListener("click", () => {
    console.log(`agario was clicked`);

    document.querySelectorAll(".card").forEach(c => {
        c.style.border = "none";
    })

    clicked = true;
    if(clicked) {
        agario.style.border = "solid green 5px";
        gameClicked = "agario";
    }
});

diepio.addEventListener("click", () => {
    console.log(`diepio was clicked`);

    document.querySelectorAll(".card").forEach(c => {
        c.style.border = "none";
    })

    clicked = true;
    if(clicked) {
        diepio.style.border = "solid green 5px";
        gameClicked = "diepio";
    }
})


slitherio.addEventListener("click", () => {
    console.log(`slitherio was clicked`);

    document.querySelectorAll(".card").forEach(c => {
        c.style.border = "none";
    })

    clicked = true;
    if(clicked) {
        slitherio.style.border = "solid green 5px";
        gameClicked = "slitherio";
    }
})


coolMathGames.addEventListener("click", () => {
    console.log(`coolMathGames was clicked`);

    document.querySelectorAll(".card").forEach(c => {
        c.style.border = "none";
    })

    clicked = true;
    if(clicked) {
        coolMathGames.style.border = "solid green 5px";
        gameClicked = "coolMathGames";
    }
})

console.log(`testing game clicked: ${gameClicked}`);

play_btn.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => {
        c.style.border = "none";
    })

    console.log(`testing game clicked: ${gameClicked}`);
    if (gameClicked === "agario" || gameClicked === "diepio" || gameClicked === "slitherio" || gameClicked === "coolMathGames") {
        playing(gameClicked);
        // agario.style.border = "solid purple 5px";
        // diepio.style.border = "solid purple 5px";
        // slitherio.style.border = "solid purple 5px";
        // coolMathGames.style.border = "solid purple 5px";
    }
});



