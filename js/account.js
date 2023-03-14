//loading page
window.addEventListener("load", () =>{
  const loader = document.querySelector(".loader-section");
  loader.classList.add("hidden");
});
////////////////////
//account functions
// ////////////////
//variables
let containFormLogin = document.querySelector(".contain-form.login");
let containFormSign = document.querySelector(".contain-form.sign");
let faEye = document.querySelectorAll(".input-field .fa-eye");
let faEyeSlash = document.querySelectorAll(".input-field .fa-eye-slash");

// toggle form show & hide sign-login
let toggleAccount = () => {
  containFormLogin.classList.toggle("hide")
  containFormSign.classList.toggle("active")
}
// toggle eye & eye-slash in password
faEye.forEach((i) => {
  i.onclick = (e) => {
    e.target.classList.toggle("show");
    ((e.target).parentNode.querySelector(".fa-eye-slash")).classList.toggle("hide");
    //show and hidden text password
    let myPass = (e.target).parentNode.querySelector(".password");
    if (myPass.type === "password") {
      myPass.type = "text";
    } else {
      myPass.type = "password";
    }
  }
})

//////////////
//function to make optins for select gender & city
let selectCityArray = [
  "Alexandria", "Aswan", "Asyut",
  "Beni Suef", "Beheira", "Cairo",
  "Dakahlia", "Damietta", "Damietta",
  "Faiyum", "Gharbia", "Giza", "Ismailia",
  "Kafr El Sheikh", "Luxor", "Port Said",
  "qena", "Sharqia", "sohag", "seuz"
];
selectCityArray.sort();

let selectGenderArray = ["male", "female"];
let selectCity = document.getElementById("select-city");
let selectGender = document.getElementById("select-gender")
function selectOptions(selectArray, select) {
  selectArray.forEach((x, y) => {
  let option = document.createElement("option")
    option.value = y + 1;
    option.innerHTML = x;
    select.appendChild(option);
  })
}
selectOptions(selectGenderArray, selectGender)
selectOptions(selectCityArray, selectCity)

////////////////////////////////////
//CREATE VALIDATION FORM
//////////////////////////////////////
//var login
const login = document.getElementById("login");
const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-pass");

//var sign
const sign = document.getElementById("signup");
const signUser = document.getElementById("sign-user");
const signEmail = document.getElementById("sign-email");
const signPass1 = document.getElementById("sign-pass");
const signPass2 = document.getElementById("confirm-pass");

// funcion form login key up & submit
login.addEventListener('keyup', (e) => {
  e.preventDefault();
  checkInputsLogin();
})
login.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputsLogin();
})
// funcion form sign key up & submit
sign.addEventListener('keyup', (e) => {
  e.preventDefault();
  checkInputsSign();
})
sign.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputsSign();
})
//create login checkInputs 
let checkInputsLogin = () => {
  let loginEmailValue = loginEmail.value.trim();
  let loginPassValue = loginPass.value.trim();
  let mailRe = /\w+@\w+\.\w+/i;
  let mailMatch = mailRe.test(loginEmailValue)

  // email input
  if (loginEmailValue === "") {
    errorMessage(loginEmail, "Email  is required.")
  } else if (mailMatch === false) {
    errorMessage(loginEmail, "Email must be valid.")
  } else {
    success(loginEmail)
  }

  //password input
  if (loginPassValue === "") {
    errorMessage(loginPass, "Password  is required.")
  } else if (loginPassValue.length < 8) {
    errorMessage(loginPass, "Password must be at least 8 letter.")
  } else {
    success(loginPass)
  }
}
//////////////////////
//create sign checkInputs 
let checkInputsSign = () => {
  let signUserValue = signUser.value.trim();
  let signEmailValue = signEmail.value.trim();
  let signPass1Value = signPass1.value.trim();
  let signPass2Value = signPass2.value.trim();
  let mailRe = /\w+@\w+\.\w+/i;
  let mailMatch = mailRe.test(signEmailValue)

  // username input
  if (signUserValue === "") {
    errorMessage(signUser, "Username  is required.")
  } else if (signUserValue.length < 5 || signUserValue.length > 15) {
    errorMessage(signUser, "Username must consist of 5 to 15 letters.")
  } else {
    success(signUser)
  }
  // email input
  if (signEmailValue === "") {
    errorMessage(signEmail, "Email  is required.")
  } else if (mailMatch === false) {
    errorMessage(signEmail, "Email must be valid.")
  } else {
    success(signEmail)
  }
  //password input
  if (signPass1Value === "") {
    errorMessage(signPass1, "Password  is required.")
  } else if (signPass1Value.length < 8) {
    errorMessage(signPass1, "Password must be at least 8 letter.")
  } else {
    success(signPass1)
  }

  //password confirm input
  if (signPass2Value === "") {
    errorMessage(signPass2, "Password  is required.")
  } else if (signPass2Value.length < 8) {
    errorMessage(signPass2, "Password must be at least 8 letter.")
  }else if (signPass2Value !== signPass1Value) {
    errorMessage(signPass2, "Password must match confirm password.")
  } else {
    success(signPass2)
  }
  //select city input
  if (selectCity.value === "") {
    errorMessage(selectCity, "This Field is required.")
  }else {
    success(selectCity)
  }
  //select gender input
  if (selectGender.value === "") {
    errorMessage(selectGender, "This Field is required.")
  }else {
    success(selectGender)
  }
}
// create message error
let errorMessage = (input, message) => {
  let containFeild = (input.parentNode).parentNode;
  let small = containFeild.querySelector("small");
  small.innerHTML = message;
  containFeild.className = "contain false";
}
let success = (input) => {
  let containFeild = (input.parentNode).parentNode;
  containFeild.className = "contain true";
}
