console.log(`running addGame js`);

let add_btn = document.querySelector("#add_btn");
let agarioGame = document.querySelector("#agario");
let diepioGame = document.querySelector("#diepio");
let slitherioGame = document.querySelector("#slitherio");
let gameToAdd = "";
let gamesList = [];

// function isUserLoggedIn() {
//     // Check for the presence of the JWT cookie
//     return document.cookie.split(';').some((item) => item.trim().startsWith('jwt='));
// }

function isUserLoggedIn() {
    // Check for the presence of the JWT cookie and its value is not 'logout'
    return document.cookie.split(';').some(item => {
        const [key, value] = item.trim().split('=');
        return key === 'jwt' && value !== 'logout';
    });
}

agarioGame.addEventListener("click", () => {
    // agarioGame.style.border = "solid green 5px";
    gameToAdd = "agario";

    console.log(`agario was clicked in addGame`);
})

diepioGame.addEventListener("click", () => {
    // agarioGame.style.border = "solid green 5px";
    gameToAdd = "diepio";

    console.log(`diepio was clicked in addGame`);
})

slitherioGame.addEventListener("click", () => {
    // agarioGame.style.border = "solid green 5px";
    gameToAdd = "slitherio";

    console.log(`slitherio was clicked in addGame`);
})

add_btn.addEventListener("click", () => {
    console.log(`add to library was clicked`);

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

        // setTimeout(() => {
        //     agarioGame.style.border = "solid grey 5px";
        // }, 1000);

        agarioGame.style.border = "solid purple 5px"; // work on hover back to normal

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
    
            // Update the DOM to display the confirmation message
            const confirmationMessageDiv = document.getElementById('confirmationMessage');
            if (confirmationMessageDiv) {
                confirmationMessageDiv.innerHTML = `<h4>${data.message}</h4>`;
            }
        })

        const confirmationMessageDiv = document.getElementById('confirmationMessage');

        if (confirmationMessageDiv) {
            confirmationMessageDiv.innerHTML = '<h4>game was added to library</h4>';
            setTimeout(() => {
                confirmationMessageDiv.innerHTML = '<h4></h4>';
            }, 1000);
        }

        // .finally(() => {
        //     console.log(`FINALLY RUN GAME ADD`);
        // })

        // .then(data => console.log(`GAME TO ADD JSON DATA: ${JSON.stringify(data)}`))

        // .then(data => console.log('GAME TO ADD JSON DATA:', data))
    }

    if(gameToAdd === "diepio") {
        gamesList.push(gameToAdd);
        console.log(`games list: ${gamesList}`);

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
    
            // Update the DOM to display the confirmation message
            const confirmationMessageDiv = document.getElementById('confirmationMessage');
            if (confirmationMessageDiv) {
                confirmationMessageDiv.innerHTML = `<h4>${data.message}</h4>`;
            }
        })

        const confirmationMessageDiv = document.getElementById('confirmationMessage');

        if (confirmationMessageDiv) {
            confirmationMessageDiv.innerHTML = '<h4>game was added to library</h4>';
            setTimeout(() => {
                confirmationMessageDiv.innerHTML = '<h4></h4>';
            }, 1000);
        }

        // .then(data => console.log(`GAME TO ADD JSON DATA: ${JSON.stringify(data)}`))

        // .then(data => console.log('GAME TO ADD JSON DATA:', data))
    }

    if(gameToAdd === "slitherio") {
        gamesList.push(gameToAdd);
        console.log(`games list: ${gamesList}`);

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
    
            // Update the DOM to display the confirmation message
            const confirmationMessageDiv = document.getElementById('confirmationMessage');
            if (confirmationMessageDiv) {
                confirmationMessageDiv.innerHTML = `<h4>${data.message}</h4>`;
            }
        })

        const confirmationMessageDiv = document.getElementById('confirmationMessage');

        if (confirmationMessageDiv) {
            confirmationMessageDiv.innerHTML = '<h4>game was added to library</h4>';
            setTimeout(() => {
                confirmationMessageDiv.innerHTML = '<h4></h4>';
            }, 1000);
        }

        // .then(data => console.log(`GAME TO ADD JSON DATA: ${JSON.stringify(data)}`))

        // .then(data => console.log('GAME TO ADD JSON DATA:', data))
    }
});
