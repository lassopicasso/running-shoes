import createNavbar from "./common/navbar.js";
import { productsInCart, addToCart } from "./common/storage.js";
import { cleanUrl, productsUrl } from "./constants/api.js";
import message from "./common/messages.js";

createNavbar();

let selectedProductsCart = productsInCart("productsInCart");
const selectedProducts = document.querySelector(".selected__products");
const sumContainer = document.querySelector(".selected__total-sum");
const productTotal = document.querySelector(".selected__total-products");

function messageEmptyCart() {
  if (selectedProductsCart.length === 0) {
    message("alert-info", "<p>There are no products in the shopping cart.</p>", ".cart-page");
  }
}
messageEmptyCart();

/*Create an unique array of the selected products, by using map (because its objects) and filter to extract the unique products*/
let uniqueProducts = [];
let products = [];

function removeDuplicats() {
  uniqueProducts = selectedProductsCart.map((product) => product.id).filter((value, index, self) => self.indexOf(value) === index);
}
removeDuplicats();

(async function () {
  try {
    const response = await fetch(productsUrl);
    products = await response.json();
    choseProducts();
  } catch (error) {
    message("alert error-info", `Following error occured: ${error}`, ".cart-page");
  }
})();

function choseProducts() {
  selectedProducts.innerHTML = "";
  uniqueProducts.forEach((uniqueProduct) => {
    products.forEach((product) => {
      if (parseInt(uniqueProduct) === product.id) {
        createHTML(product);
      }
    });
  });

  adjustAmount();
  removeFromCart();
  totalAmount();
}

function createHTML(product) {
  const amountOfProduct = selectedProductsCart.filter((oncurrance) => parseInt(oncurrance.id) === product.id);
  selectedProducts.innerHTML += `
                                <div class="selected__product">
                                    <a href="product-details.html?id=${product.id}" class="selected__product-img" style = "background-image: url('${product.image.url}'")></a>
                                    <div class="selected__product-details">
                                        <div class="product-details__column">
                                          <div>
                                            <h2>${product.title} </h2>
                                            <a href="product-details.html?id=${product.id}"  class="link view-product">View Product</a>
                                          </div>
                                          <span class="link remove-product" data-id="${product.id}">Remove Product</span>
                                        </div>
                                        <div>
                                            <div class="selected__product-amount">
                                                <i class="amount-symbol fas fa-minus fa-sm" data-id="${product.id}"></i>
                                                <input type="number" id="${product.id}" value="${amountOfProduct.length}" min="0"/>
                                                <i class="amount-symbol fas fa-plus fa-sm" data-id="${product.id}"></i>
                                            </div>
                                            <h3 class="selected__product-price">Kr ${product.price} </h3>
                                        </div>
                                    </div>
                                </div>
                            `;
}

function adjustAmount() {
  const amount = document.querySelectorAll(".amount-symbol");
  amount.forEach((symbol) => {
    symbol.addEventListener("click", (event) => {
      if (event.target.classList.contains("fa-plus")) {
        let inputAdded = document.getElementById(event.target.dataset.id);
        inputAdded.value = parseInt(inputAdded.value) + 1;
        selectedProductsCart.push({ id: inputAdded.id });
        choseProducts(selectedProductsCart);
      } else {
        let inputSubstracted = document.getElementById(event.target.dataset.id);
        inputSubstracted.value = parseInt(inputSubstracted.value) - 1;
        const index = selectedProductsCart.map((product) => product.id).indexOf(inputSubstracted.id);
        selectedProductsCart.splice(index, 1);
        if (selectedProductsCart.map((product) => product.id).indexOf(inputSubstracted.id) === -1) {
          removeDuplicats();
          choseProducts(selectedProductsCart);
        }
      }
      addToCart("productsInCart", selectedProductsCart);
      createNavbar();
      messageEmptyCart();
      totalAmount();
    });
  });
}

function totalAmount() {
  let sumProducts = 0;
  let sumProduct = 0;
  productTotal.innerHTML = "";
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    products.forEach((product) => {
      if (parseInt(input.id) === product.id) {
        sumProducts += product.price * input.value;
        sumProduct = product.price * input.value;
        sumProduct = parseFloat(sumProduct).toFixed(2);
        const sumProductDecimal = sumProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        productTotal.innerHTML += `<div>
                                      <p>${product.title}<p>
                                      <p>${sumProductDecimal}</p>
                                    </div>
                                  `;
      }
    });
  });
  /**Limit it to have only 2 decimals, using toFixed(2)**/
  sumProducts = parseFloat(sumProducts).toFixed(2);
  /**Thousand separator**/
  const sumProductsDecimal = sumProducts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  sumContainer.innerHTML = `
                          <h3>Sum</h3>
                          <h3>Kr ${sumProductsDecimal}</h3>
                          `;
}

function removeFromCart() {
  const removeProduct = document.querySelectorAll(".remove-product");
  removeProduct.forEach((product) => {
    product.addEventListener("click", (event) => {
      selectedProductsCart = selectedProductsCart.filter((element) => element.id !== event.target.dataset.id);
      uniqueProducts = uniqueProducts.filter((element) => element.id !== event.target.dataset.id);
      removeDuplicats();
      choseProducts();
      addToCart("productsInCart", selectedProductsCart);
      messageEmptyCart();
      createNavbar();
    });
  });
}

document.querySelector(".cart__cta").addEventListener("click", function () {
  alert("I'm sorry, but this is just a fictional e-commerce. We take no payment. :)");
});
