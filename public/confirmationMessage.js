console.log(`running confirmation message js file`);

// let btnLogin = document.querySelector("#btnLogin");
let incorrectCredentials = document.querySelector("#incorrectCredentials");
let incorrectCredentials2 = document.querySelector("#incorrectCredentials2");
let btnLogin = document.querySelector("#btnLogin");
console.log(`testing btnlogin: ${btnLogin}`);

console.log(`incorrect credentials: ${incorrectCredentials}`)
// console.log(`incorrect credentials2: ${incorrectCredentials2}`)

incorrectCredentials.style.display = "block";
// incorrectCredentials2.style.display = "block";

setTimeout(() => {
    incorrectCredentials.style.display = "none";
  }, 1000); 

//   setTimeout(() => {
//     incorrectCredentials2.style.display = "none";
//   }, 1000); 

// btnLogin.addEventListener("click", () => {
//     incorrectCredentials = document.createElement("p");
//     incorrectCredentials2 = document.createElement("p");

//     incorrectCredentials2.style.display = "block";
//     setTimeout(() => {
//             incorrectCredentials2.style.display = "none";
//           }, 1000); 
// })

let confirmRegister = document.querySelector("#confirmRegister");
console.log(`confirm register: ${confirmRegister}`);