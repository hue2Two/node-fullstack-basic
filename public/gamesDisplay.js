console.log(`running games display js file`);
let theTempi = null;

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
            default:
                img.src = '/images/agario.png'; 
        }

        img.alt = gameName; // Set alt text for accessibility
        item.appendChild(img); // Append the image to the paragraph

        item.addEventListener("click", () => {
            console.log(`profile game item was clicked`);
            theTempi = gameName;

            item.classList.add('gameplayhelper');

        })
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

let playBtn = document.querySelector("#playBtn");
console.log(`playBtn: ${playBtn}`);

playBtn.addEventListener("click", () => {
    console.log(`playBtn was clicked`);

    let gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
        console.log(`item to play: ${item.textContent}`);

        if (item.textContent == theTempi) {
            console.log(`game to play: ${theTempi}`);

            item.classList.remove('gameplayhelper');

            playing(theTempi);
        }
    })

})
