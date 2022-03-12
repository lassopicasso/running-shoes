import { getToken } from "./common/storage.js";
import createNavBar from "./common/navbar.js";
import { checkLength, checkImg, checkFeatured, checkPrice } from "./components/formValidator.js";
import { inputImageHandler, handleDrop, handleClick } from "./components/formImageInput.js";
import { addNewProduct } from "./components/addOrEdit.js";

createNavBar();

//If user is not signed in, the user will be redirected to homepage.
const token = getToken();
if (!token) {
  location.href = "/";
}

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const featureBtn = document.querySelectorAll(".feature__cta");
const description = document.querySelector("#product__description");
const submitBtn = document.querySelector(".submit-btn");

/*Deactivate the button that was active then activate the one that was clicked on */
featureBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    featureBtn.forEach((oldState) => {
      oldState.classList.remove("feature__cta--active");
    });
    btn.classList.add("feature__cta--active");
  });
});

/*Handle image input*/
inputImageHandler();
const fileInput = document.querySelector(".image-input");
const fileArea = document.querySelector(".file-uploader");
let imageFile;
fileArea.addEventListener("drop", collectDropImageFile);
fileInput.addEventListener("input", collectClickImageFile);
function collectDropImageFile(event) {
  imageFile = handleDrop(event);
}
function collectClickImageFile() {
  imageFile = handleClick(this.files);
}
/*Inputvalidator*/
submitBtn.addEventListener("click", inputValidator);
function inputValidator(event) {
  document.querySelector(".add-message").innerHTML = "";
  event.preventDefault();
  const inputValueTitle = title.value.trim();
  const inputValuePrice = price.value.trim();
  const inputValueDescription = description.value.trim();
  const inputValueImg = imageFile;
  const featured = checkFeatured();
  if (checkLength(title, 2) & checkPrice(price) & checkLength(description, 10) & checkImg(inputValueImg) & (featured !== undefined)) {
    addNewProduct(inputValueTitle, inputValuePrice, inputValueDescription, inputValueImg, featured);
  }
}
