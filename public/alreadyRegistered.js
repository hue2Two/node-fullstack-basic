let alreadyRegistered = document.querySelector("#alreadyRegistered");
console.log(`already registered: ${alreadyRegistered}`);

alreadyRegistered.style.display = "block";
setTimeout(() => {
    alreadyRegistered.style.display = "none";
  }, 1000); 