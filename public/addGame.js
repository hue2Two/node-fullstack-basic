console.log(`running addGame js`);

let add_btn = document.querySelector("#add_btn");
let agarioGame = document.querySelector("#agario");
let gameToAdd = "";
let gamesList = [];

agarioGame.addEventListener("click", () => {
    agarioGame.style.border = "solid green 5px";
    gameToAdd = "agario";
})

add_btn.addEventListener("click", () => {
    console.log(`add to library was clicked`);

    if(gameToAdd === "agario") {
        gamesList.push(gameToAdd);
        console.log(`games list: ${gamesList}`);

        fetch('http://localhost:5001/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // "gameToAdd": gameToAdd
                testData: "testing data to send to back"
            })
        })
        .then(response => response.json())
        .then(data => console.log(`GAME TO ADD JSON DATA: ${data}`))
    }
});
