import navbar from "./common/navbar.js";
import { addToCart, productsInCart } from "./common/storage.js";
import { cleanUrl, productsUrl } from "./constants/api.js";
import message from "./common/messages.js";

navbar();
const banner = document.querySelector(".product-banner");
const titlePage = document.querySelector("title");
const heading1 = document.querySelector("h1");
const productImage = document.querySelector(".product-view__img");
const productDetails = document.querySelector(".product-view__details");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
console.log(params);
const id = params.get("id");
const productUrl = `${productsUrl}?id=${id}`;

const currentAdded = productsInCart("productsInCart");

(async function () {
  try {
    const response = await fetch(productUrl);
    const product = await response.json();
    /*create product details*/
    createHTML(product);
  } catch (error) {
    message("alert error-info", `Following error occured: ${error}`, ".product-view__content");
  }
})();
let title;
let image;
function createHTML(product) {
  image = `${product[0].image.url}`;
  banner.style.backgroundImage = `url("${image}")`;
  title = `${product[0].title}`;
  titlePage.innerHTML = title;
  heading1.innerHTML = title;

  productImage.style.backgroundImage = `url("${image}")`;
  productDetails.innerHTML = `<div>
                                <div class="product__header">
                                  <h2>${product[0].title}</h2>
                                  <a href="products.html" class="cta-return">Return to Products</a>
                                </div>
                                <p>${product[0].description}</p>
                              </div>
                              <div class="product__elements-bottom">
                                <div class="product__priceAndSocialMedia">
                                  <div class="product__price">
                                    <span>Kr ${product[0].price}</span>
                                    <div class="product__quantity">
                                    <select>
                                        <option value="default-option">Quantity</option>
                                        <option value=1>1</option>
                                        <option value=2>2</option>
                                        <option value=3>3</option>
                                        <option value=4>4</option>
                                        <option value=5>5</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="product__social-media">
                                      <a href=""><i class="fab fa-facebook-square"></i></a>
                                      <a href=""><i class="fab fa-twitter-square"></i></a>
                                      <a href=""><i class="fab fa-instagram-square"></i></a>
                                  </div>
                                </div>
                                <p class="select-error">You have to select quantity.</p>
                                <div class="product__cta-wrapper">
                                  <a class="cta product__cta">Add to cart</a>
                                </div>
                              </div>
                              `;

  const addToCartButton = document.querySelector(".product__cta");
  addToCartButton.addEventListener("click", validateInput);
}

function validateInput() {
  const addToCartButton = document.querySelector(".product__cta");
  if (addToCartButton.innerHTML === "Add to cart") {
    const selectError = document.querySelector(".select-error");
    let quantity = document.querySelector("select");
    if (quantity.value === "default-option") {
      selectError.style.display = "block";
    } else {
      selectError.style.display = "none";
      const quantityNumber = parseInt(quantity.value);
      ctaCart(quantityNumber, quantity, addToCartButton);
    }
  }
}

function ctaCart(quantityNumber, quantity, addToCartButton) {
  for (let i = 0; i < quantityNumber; i++) {
    currentAdded.push({ id: id });
    addToCart("productsInCart", currentAdded);
    navbar();
  }

  addToCartButton.innerHTML = `<i class="fas fa-check"></i>`;
  addToCartButton.style.backgroundColor = "#49dc99";
  addToCartButton.style.cursor = "default";

  quantity.addEventListener("click", function () {
    addToCartButton.innerHTML = "Add to cart";
    addToCartButton.style.backgroundColor = "#0c7eca";
    addToCartButton.style.cursor = "pointer";
  });
  const select = document.querySelector("select");
  select.value = "default-option";
  responseWhenAdded(quantityNumber);
}

function responseWhenAdded(quantityNumber) {
  const addedToCart = document.querySelector(".add-response");
  addedToCart.innerHTML = `<p>${quantityNumber} of ${title} was added to cart</p>`;
  addedToCart.style.display = "block";
  setTimeout(function () {
    addedToCart.style.display = "none";
  }, 1500);
}

/* Focus Image */
const disableScroll = document.querySelector("body");
productImage.addEventListener("click", largeImg);

const footerImg = document.querySelector("footer");
function largeImg(event) {
  disableScroll.style.overflow = "hidden";

  footerImg.innerHTML += ` 
                        <div class ="focus-img-container">
                                <div class="focus-img-background"></div>
                                <div class="focus-img border" style= 'background-image: url("${image}")'>
                                <i class="far fa-times-circle"></i></div>
                        </div>
                        `;

  let cross = document.querySelector(".fa-times-circle");
  const wrapper = document.querySelector(".focus-img-background");
  cross.addEventListener("click", unfocus);
  wrapper.addEventListener("click", unfocus);
}

/* Unfocus Image */
function unfocus() {
  disableScroll.style.overflow = "visible";
  const imgFocus = document.querySelector(".focus-img-container");
  imgFocus.remove();
}
