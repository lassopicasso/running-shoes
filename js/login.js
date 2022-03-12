import navbar from "./common/navbar.js";
import { authUrl } from "./constants/api.js";
import { saveToken, saveUser } from "./common/storage.js";
import message from "./common/messages.js";

navbar();

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitForm = document.querySelector("form");

const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

submitForm.addEventListener("submit", validateInputs);

/*Validate inputs*/

function validateInputs(event) {
  event.preventDefault();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  emailError.style.display = checkEmail(emailValue) ? "none" : "block";
  passwordError.style.display = passwordValue.length > 2 ? "none" : "block";

  if (checkEmail(emailValue) && passwordValue.length > 2) {
    proceedLogin(emailValue, passwordValue);
  }
}

function checkEmail(email) {
  const regularExpression = /\S+@\S+\.\S+/;
  const matchExpressionString = regularExpression.test(email);
  return matchExpressionString;
}

async function proceedLogin(email, password) {
  const data = JSON.stringify({
    identifier: email,
    password: password,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(authUrl, options);
    const json = await response.json();

    if (json.user) {
      let username = json.user.username;
      username = username.charAt(0).toUpperCase() + username.slice(1);
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/";
    } else {
      message("alert-info", "<p>Wrong email or password, please try again.</p>", ".form__error-message");
    }
  } catch (error) {
    message("alert-info", `Following error has occured: ${error}`, ".form__error-message");
  }
}
