let confirmRegister = document.querySelector("#confirmRegister");
console.log(`confirm register: ${confirmRegister}`);

confirmRegister.style.display = "block";
setTimeout(() => {
    confirmRegister.style.display = "none";
  }, 1000); 