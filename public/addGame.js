console.log(`running addGame js`);

let add_btn = document.querySelector("#add_btn");
let agarioGame = document.querySelector("#agario");
let diepioGame = document.querySelector("#diepio");
let slitherioGame = document.querySelector("#slitherio");
let coolMathGamesGame = document.querySelector("#coolMathGames");
let gameToAdd = "";
let gamesList = [];

function isUserLoggedIn() {
    // Check presence of the JWT cookie and its value is not 'logout'
    return document.cookie.split(';').some(item => {
        const [key, value] = item.trim().split('=');
        return key === 'jwt' && value !== 'logout';
    });
}

function addedGameData(gameToAdd) {
    fetch('http://localhost:5001/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // "gameToAdd": gameToAdd
                testData: "testing data to send to back",
                addedGames: gameToAdd 
            })
        })
        .then(response => response.json())
        .then(data => {
            // Log the data for debugging
            console.log('GAME TO ADD JSON DATA:', data);
            
            const confirmationMessageDiv = document.getElementById('confirmationMessage');

            if (confirmationMessageDiv) {
                confirmationMessageDiv.innerHTML = '<h4>game was added to library</h4>';
                setTimeout(() => {
                    confirmationMessageDiv.innerHTML = '<h4></h4>';
                }, 1000);
            }
        })
}

agarioGame.addEventListener("click", () => {
    // agarioGame.style.border = "solid green 5px";
    gameToAdd = "agario";
    agarioGame.classList.add('cardClick');

    console.log(`agario was clicked in addGame`);
})

diepioGame.addEventListener("click", () => {
    // agarioGame.style.border = "solid green 5px";
    gameToAdd = "diepio";
    diepioGame.classList.add('cardClick');

    console.log(`diepio was clicked in addGame`);
})

slitherioGame.addEventListener("click", () => {
    // agarioGame.style.border = "solid green 5px";
    gameToAdd = "slitherio";
    slitherioGame.classList.add('cardClick');

    console.log(`slitherio was clicked in addGame`);
})

coolMathGamesGame.addEventListener("click", () => {
    // agarioGame.style.border = "solid green 5px";
    gameToAdd = "coolMathGames";
    coolMathGamesGame.classList.add('cardClick');

    console.log(`coolMathGames was clicked in addGame`);
})

add_btn.addEventListener("click", () => {
    console.log(`add to library was clicked`);
    agarioGame.classList.remove('cardClick');
    diepioGame.classList.remove('cardClick');
    slitherioGame.classList.remove('cardClick');
    coolMathGamesGame.classList.remove('cardClick');

    if (!isUserLoggedIn()) {
        // User is not logged in, display a message
        const confirmationMessageDiv = document.getElementById('confirmationMessage');
        // if (confirmationMessageDiv) {
        //     confirmationMessageDiv.innerHTML = '<h4>You must be logged in for this feature</h4>';
        // }

        if (confirmationMessageDiv) {
            confirmationMessageDiv.innerHTML = '<h4>You must be logged in for this feature</h4>';
            setTimeout(() => {
                confirmationMessageDiv.innerHTML = '<h4></h4>';
            }, 1000);
        }
        return; // Exit the function early
    }

    if(gameToAdd === "agario") {
        gamesList.push(gameToAdd);
        console.log(`games list: ${gamesList}`);

        addedGameData(gameToAdd);
    }

    if(gameToAdd === "diepio") {
        gamesList.push(gameToAdd);
        console.log(`games list: ${gamesList}`);

        addedGameData(gameToAdd);
    }

    if(gameToAdd === "slitherio") {
        gamesList.push(gameToAdd);
        console.log(`games list: ${gamesList}`);

        addedGameData(gameToAdd);
    }

    if(gameToAdd === "coolMathGames") {
        gamesList.push(gameToAdd);
        console.log(`games list: ${gamesList}`);

        addedGameData(gameToAdd);
    }
});
