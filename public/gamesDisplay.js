console.log(`running games display js file`);
let theTempi = null;
let timePlayedStuffDisplay = document.querySelector("#timePlayedStuffDisplay");
let timeUpdate = 0;

let timePlayedStuffDisplay1 = document.querySelector("#timePlayedStuffDisplay1");
let timePlayedStuffDisplay2 = document.querySelector("#timePlayedStuffDisplay2");
let timePlayedStuffDisplay3 = document.querySelector("#timePlayedStuffDisplay3");
let timePlayedStuffDisplay4 = document.querySelector("#timePlayedStuffDisplay4");

// let timeUpdateDisplay = [];
let timeUpdateDisplay = new Array(4);
let timeUpdateDisplay2 = new Array(4);

console.log(`checking time display: ${timePlayedStuffDisplay}`);

function recievePlayTimeData(timeToRecieve, gameTimeId) {
    timeUpdate = 0;
    fetch('http://localhost:5001/timerData')
        .then(response => response.json())
        .then(data => {
            // Log the data for debugging
            console.log('TIME TO RECIEVE JSON DATA:', JSON.stringify(data));
            
            console.log(`filtering time data`);

            for(let i = 0; i < data.data.length; i++) {
                // console.log(`test: ${i}`);
                if (data.data[i].game_name == gameTimeId) {
                    console.log(`game time to update: ${JSON.stringify(data.data[i])}`);

                    timeUpdate += data.data[i].time_played;
                }
            }

            console.log(`time to add: ${timeUpdate} for game: ${gameTimeId}`);

            if (gameTimeId == "agario") {
                timePlayedStuffDisplay1.textContent = `agario: ${timeUpdate}`;

                timeUpdateDisplay[0] = timeUpdate;
                console.log(`CHECKING PLAY TIME ARRAY: ${timeUpdateDisplay}`);
            }
            if (gameTimeId == "diepio") {
                timePlayedStuffDisplay2.textContent = `diepio: ${timeUpdate}`;

                timeUpdateDisplay[1] = timeUpdate;
                console.log(`CHECKING PLAY TIME ARRAY: ${timeUpdateDisplay}`);
            }
            if (gameTimeId == "slitherio") {
                timePlayedStuffDisplay3.textContent = `slitherio: ${timeUpdate}`;
                console.log(`CHECKING PLAY TIME ARRAY: ${timeUpdateDisplay}`);

                timeUpdateDisplay[2] = timeUpdate;
            }
            if (gameTimeId == "coolMathGames") {
                timePlayedStuffDisplay4.textContent = `coolMathGames: ${timeUpdate}`;

                timeUpdateDisplay[3] = timeUpdate;
                console.log(`CHECKING PLAY TIME ARRAY: ${timeUpdateDisplay}`);
            }

            console.log(`1TIMEUPDATE1: ${timeUpdateDisplay}`);
            // res.cookie("playTime", `${timeUpdateDisplay}`);

            // Serialize your array to a string
            var cookieValue = JSON.stringify(timeUpdateDisplay);

            // Set the cookie directly without an expiration date
            document.cookie = "playTime=" + cookieValue;
        })
}

console.log(`CHECKING TIMEUPDATEDISPLAY AFTER FETCH: ${timeUpdateDisplay}`);

document.addEventListener('DOMContentLoaded', () => {
    const gameItems = document.querySelectorAll('.game-item');

    gameItems.forEach(item => {
        let gameName = item.textContent.trim();
        let img = document.createElement('img');

        switch(gameName) {
            case 'agario':
                img.src = '/images/agario.png'; 
                break;
            case 'diepio':
                    img.src = '/images/diepio.jpg'; 
                    break;
            case 'slitherio':
                    img.src = '/images/slitherio.jpg'; 
                    break;
            case 'coolMathGames':
                    img.src = '/images/coolMathGames.jpg'; 
                    break;
            default:
                img.src = '/images/agario.png'; 
        }

        img.alt = gameName; // Set alt text for accessibility
        item.appendChild(img); // Append the image to the paragraph

        item.addEventListener("click", () => {
            document.querySelectorAll(".game-item").forEach(game => {
                game.style.border = "none";
            })
            console.log(`profile game item was clicked`);
            theTempi = gameName;

            item.classList.add('gameplayhelper');
            item.style.border = "solid pink 5px";

        })

        // console.log(`TIMEUPDATEDISPLAY: ${timeUpdateDisplay}`);
        // const cookies = req.headers.cookie.split('; ');
        // const playTimeCookie = cookies.find(cookie => cookie.startsWith('playTime='));

         // Split the entire document.cookie string into individual cookies
        const cookies = document.cookie.split('; ');

        // Find the specific cookie that starts with 'playTime='
        const playTimeCookie = cookies.find(cookie => cookie.startsWith('playTime='));

        // If the cookie is found, parse its value
        if (playTimeCookie) {
            const cookieValue = playTimeCookie.split('=')[1];
            timeUpdateDisplay = JSON.parse(cookieValue);

            timePlayedStuffDisplay1.textContent = `agario: ${timeUpdateDisplay[0]}`;

            timePlayedStuffDisplay2.textContent = `diepio: ${timeUpdateDisplay[1]}`;

            timePlayedStuffDisplay3.textContent = `slitherio: ${timeUpdateDisplay[2]}`;

            timePlayedStuffDisplay4.textContent = `coolMathGames: ${timeUpdateDisplay[3]}`;
        } else {
            // If the cookie doesn't exist, initialize timeUpdateDisplay as needed
            timeUpdateDisplay = new Array(4); // Or your default value
        }

    });

    fetch('http://localhost:5001/gameTimeRenew')
    .then(response => response.json())
    .then(data => {
        // console.log(`THE RENDER DATA: ${JSON.stringify(data.highestTime.gameTime)}`);
        console.log(`THE RENDER DATA: ${(data.highestTime.gameTime)}`);

        let gameTimeArray;
        gameTimeArray = JSON.parse(data.highestTime.gameTime);
        console.log(`GAMETIME ARRAY: ${gameTimeArray}`);

        timePlayedStuffDisplay1.textContent = `agario: ${gameTimeArray[0]}`;
        timeUpdateDisplay[0] = gameTimeArray[0];

        timePlayedStuffDisplay2.textContent = `diepio: ${gameTimeArray[1]}`;
        timeUpdateDisplay[1] = gameTimeArray[1];

        timePlayedStuffDisplay3.textContent = `slitherio: ${gameTimeArray[2]}`;
        timeUpdateDisplay[2] = gameTimeArray[2];

        timePlayedStuffDisplay4.textContent = `coolMathGames: ${gameTimeArray[3]}`;
        timeUpdateDisplay[3] = gameTimeArray[3];
    });

    
});

let removeBtn = document.querySelector("#removeBtn");
console.log(`targetting removeBtn: ${removeBtn}`);

removeBtn.addEventListener("click", () => {
    console.log(`remove btn was clicked`);
    console.log(`the tempi: ${theTempi}`);

    let gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
        console.log(`item to remove: ${item.textContent}`);

        if (item.textContent == theTempi) {
            console.log(`ITEM TO REMOVE FOUND: ${theTempi}`);
            item.classList.remove('gameplayhelper');
            item.remove(); //remove from dom

            fetch('http://localhost:5001/profile', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // "gameToAdd": gameToAdd
                    testData: "testing game to remove",
                    gameToRemove: theTempi 
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(`POST PROFILE RES DATA: ${data}`);

            // Update the DOM to display the confirmation message
            const confirmationMessageDiv = document.getElementById('confirmationMessageRemove');
            if (confirmationMessageDiv) {
                confirmationMessageDiv.innerHTML = `<h4>${data.message}</h4>`;

                setTimeout(() => {
                    confirmationMessageDiv.innerHTML = `<h4></h4>`;
                  }, 1000); 
            }
            })
        }
    })
})

let playingGame = true;

function playing(game) {
    if(playingGame) {
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
}

let playBtn = document.querySelector("#playBtn");
console.log(`playBtn: ${playBtn}`);

// playBtn.addEventListener("click", () => {
//     playingGame = true;
//     console.log(`playBtn was clicked`);
//     playBtn.textContent = "stop..."

//     let gameItems = document.querySelectorAll('.game-item');
//     gameItems.forEach(item => {
//         console.log(`item to play: ${item.textContent}`);

//         if (item.textContent == theTempi) {
//             console.log(`game to play: ${theTempi}`);

//             item.classList.remove('gameplayhelper');

//             playing(theTempi);
//         }
//     })

// })

let intervalID;
let timerCount = 0;
let timeDisplay = document.querySelector("#timeDisplay");

function theTime() {
    console.log("play time started");
    intervalID = setInterval(() => {
        timerCount++;
        timeDisplay.innerText = timerCount;
    }, 1000);

    timerCount = 0;
}

function theTimePause() {
    console.log("play time stopped");
    clearInterval(intervalID);
}

function sendPlayTimeData(timeToSend, gameTimeId) {
    fetch('http://localhost:5001/timerData', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                testData: "timer data to send to back",
                addedTime: timeToSend,
                gameTimeName: gameTimeId
            })
        })
        .then(response => response.json())
        .then(data => {
            // Log the data for debugging
            console.log('TIME TO ADD JSON DATA:', data);
            
        })
}

playBtn.addEventListener("click", () => {

    if(playingGame) {
        playBtn.textContent = "stop";

        if (playingGame) {
            let gameItems = document.querySelectorAll('.game-item');
            gameItems.forEach(item => {
                console.log(`item to play: ${item.textContent}`);
                if (item.textContent == theTempi) {
                    console.log(`game to play: ${theTempi}`);
                    item.classList.remove('gameplayhelper');
                    playing(theTempi);

                    theTime();
                }
            });

            playingGame = false;
        }
    } else {
        playBtn.textContent = "play";
        playingGame = true;
        console.log(`is remove running`);

        theTimePause();
        console.log(`TIME TO SEND: ${timeDisplay.textContent}, game: ${theTempi}`);

        sendPlayTimeData(timeDisplay.textContent, theTempi);
        recievePlayTimeData(timeDisplay.textContent, theTempi);
    }

    // timeUpdateDisplay2 = timeUpdateDisplay;
    // console.log(`TIMEUPDATEDISPLAY2" ${timeUpdateDisplay2}`)
})

let btnLogout = document.querySelector("#btnLogout");
console.log(`targetting btnLogout: ${btnLogout}`);

btnLogout.addEventListener("click", () => {
    console.log(`btnLogout was clicked`);
    console.log(`logout cookie value: ${document.cookie}`);

    let cookieLength = 0;
    for(let i = 0; i < document.cookie.length; i++) {
        cookieLength ++;
    }

    console.log(`logout cookie length: ${cookieLength}`);
    console.log(`logout btn split: ${document.cookie.split(";")}`);
    
    let splitLogoutCookieP1 = document.cookie.split(";");
    let splitLogoutCookieP2 = splitLogoutCookieP1[0].split("=");
    console.log(`split P1" ${splitLogoutCookieP1}`);
    // console.log(`split P2: ${splitLogoutCookieP2}`);

    splitLogoutCookieP1.forEach(cookie => {

        if(cookie.includes("playTime")) {
            console.log(`correct cookie found: ${cookie}`);

            let sendPlayTime = document.cookie.split(";");
            console.log(`SEND PLAYTIME DATA: ${sendPlayTime}`);

            fetch('http://localhost:5001/logout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                testData: "gameTime data test",
                sendPlayTime: sendPlayTime
            })
            })
            .then(response => response.json())
            .then(data => {
                console.log('PLAY TIME DATA SENT RES:', data);
             
            // document.cookie = splitLogoutCookieP2[0] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';

            document.cookie = data.cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
                
            })
        } else {
            console.log(`wrong cookie found: ${cookie}`)
        }
    })

    //expire/delete playTime cookie by name
    // document.cookie = splitLogoutCookieP2[0] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';


})
