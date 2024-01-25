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
            }
            })
        }
    })
})
