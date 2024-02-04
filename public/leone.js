let leone = document.querySelector("#leone");
let navUL = document.querySelector("#navUL");
console.log(`leone: ${leone}`);

leone.addEventListener("click", () => {
    console.log(`leone was clicked`);

    leone.style.animationPlayState = 'running';

    // Set a timeout to pause the animation after 1 second
    setTimeout(() => {
        leone.style.animationPlayState = 'paused';
    }, 476);

    // Toggle the display of the navUL element
    if (navUL.style.display === "block") {
        navUL.style.display = "none";
    } else {
        navUL.style.display = "block";
    }
})

