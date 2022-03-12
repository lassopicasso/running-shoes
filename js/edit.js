import { getToken } from "./common/storage.js";
import createNavBar from "./common/navbar.js";
import { productsUrl } from "./constants/api.js";
import { inputImageHandler, handleDrop, handleClick } from "./components/formImageInput.js";
import { checkLength, checkPrice } from "./components/formValidator.js";
import { deleteProduct, updateProduct } from "./components/addOrEdit.js";
import message from "./common/messages.js";

//If user is not signed in, the user will be redirected to homepage.
const token = getToken();

if (!token) {
  location.href = "/";
}
createNavBar();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const productUrl = `${productsUrl}?id=${id}`;

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const featureBtn = document.querySelectorAll(".feature__cta");
const description = document.querySelector("#product__description");
const imgTitle = document.querySelector(".img-text");

let imageEdited = false;

(async function getProductDetails() {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    title.value = details[0].title;
    price.value = details[0].price;
    description.value = details[0].description;
    imgTitle.innerHTML = details[0].image.name;
    imageFile = details[0].image;
    featured = details[0].featured;
    if (featured) {
      document.querySelector(".feature__cta-yes").classList.add("feature__cta--active");
    } else {
      document.querySelector(".feature__cta-no").classList.add("feature__cta--active");
    }
  } catch (error) {
    message("error-info", `<p>Oh no! Something went wrong. ${error}. Please try again later.</p>`, ".edit-message");
  }
})();
let featured;
featureBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    featureBtn.forEach((oldState) => {
      oldState.classList.remove("feature__cta--active");
    });
    btn.classList.add("feature__cta--active");
    if (btn.classList.contains("feature__cta-yes")) {
      featured = true;
    } else {
      featured = false;
    }
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
  imageEdited = true;
}
function collectClickImageFile() {
  imageFile = handleClick(this.files);
  imageEdited = true;
}

/*Handle submit*/
const btnEdit = document.querySelectorAll(".edit-btn");
btnEdit.forEach((btn) => {
  btn.addEventListener("click", handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault();
  document.querySelector(".edit-message").innerHTML = "";
  if (event.target.classList.contains("update-btn")) {
    if (checkLength(title, 2) & checkPrice(price) & checkLength(description, 10)) {
      updateProduct(title.value.trim(), price.value.trim(), description.value.trim(), featured, imageFile, id, imageEdited);
    }
  } else if (event.target.classList.contains("delete-btn")) {
    deleteProduct(id);
  }
}
