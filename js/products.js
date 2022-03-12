import navbar from "./common/navbar.js";
import { cleanUrl, productsUrl } from "./constants/api.js";
import { priceSlider, searchProducts, maxPrice, sortProducts } from "./components/filterSort.js";
import message from "./common/messages.js";
import { getToken } from "./common/storage.js";
navbar();
priceSlider();

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".product-search");
const rangeInput = document.querySelector(".range-max");
const sortCtas = document.querySelectorAll(".sort__cta");

let products = [];

(async function () {
  try {
    const response = await fetch(productsUrl);
    products = await response.json();
    /*Start with sort products to newest when visiting the page*/
    let sortedProducts = products.sort(function (lars, wald) {
      return new Date(wald.published_at) - new Date(lars.published_at);
    });
    /*create productlist*/
    createProductList(sortedProducts);
  } catch (error) {
    message("alert error-info", `Following error occured: ${error}`, ".search-message");
  }
})();

/* Target sort button that is active */
(function sortButtons() {
  sortCtas.forEach((cta) => {
    cta.addEventListener("click", function sort(event) {
      sortButton = event.target;
      sortCtas.forEach((cta1) => {
        if (cta1.classList.contains("sort__cta--active")) {
          cta1.classList.remove("sort__cta--active");
        }
      });
      sortButton.classList.add("sort__cta--active");
      filterAndSort();
    });
  });
})();

/* Filter and sort based on 3 criteria: text-input, price-range and sort-type */
let filteredProducts;
let sortButton = document.querySelector(".sort__cta--active");

searchInput.onkeyup = filterAndSort;
rangeInput.addEventListener("input", filterAndSort);

function filterAndSort() {
  filteredProducts = searchProducts(searchInput, products, filteredProducts);
  filteredProducts = maxPrice(filteredProducts, rangeInput);
  createProductList(sortProducts(filteredProducts, sortButton));
}

/* Create Product List */

function createProductList(products) {
  productsContainer.innerHTML = "";
  productsContainer.classList.remove("loader");
  if (products.length === 0) {
    message("alert-info", "<p>Sorry, we dont have any products with these search criteria at the moment.</p>", ".search-message");
  } else {
    document.querySelector(".search-message").innerHTML = "";
  }
  products.forEach((product) => {
    let editLink = "";
    const token = getToken();
    if (token) {
      editLink = `<a class="edit-link" href="edit.html?id=${product.id}">Edit Product <i class="fas fa-cog"></i></a>`;
      productsContainer.style.gridAutoRows = window.innerWidth <= 600 ? "370px" : "430px";
    } else {
      productsContainer.style.gridAutoRows = window.innerWidth <= 600 ? "350px" : "";
    }
    productsContainer.innerHTML += `
                <div class="product-wrapper product-wrapper-${product.id}">
                <a href="product-details.html?id=${product.id}">
                  <div class="img-wrapper">
                    <div class="product__img" style="background-image: url('${product.image.url}')">
                  </div>
                  </div>                
                  <div class="product__text"> 
                    <h2>${product.title}</h2>
                  <span>KR ${product.price}</span>
                  </div>
                </a>
                ${editLink}
                </div>
                `;
  });
}
