export function priceSlider() {
  const priceInput = document.querySelector(".input-max");
  const rangeInput = document.querySelector(".range-max");
  const maxPriceTag = document.querySelector(".infinity");
  /*Start with No Limit*/
  document.querySelector(".infinity").innerHTML = `<span> No Limit </span>`;

  rangeInput.addEventListener("input", priceSliderInput);
  function priceSliderInput() {
    priceInput.value = rangeInput.value;
    maxPriceTag.innerHTML = parseInt(priceInput.value) === 500 ? `<span> No Limit </span>` : `Kr <input type="number" class="input-max" value="${priceInput.value}" max="500" step="100" />`;
    /*add color difference*/
    var value = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
    rangeInput.style.background = "linear-gradient(to right, #49dc99 0%, #49dc99 " + value + "%, #0c7eca " + value + "%, #0c7eca 100%)";
  }
}

/**Filter based on search */
export function searchProducts(searchInput, products, filteredProducts) {
  const titleValue = searchInput.value.trim().toLowerCase();
  filteredProducts = products.filter((product) => product.title.toLowerCase().includes(titleValue));
  return filteredProducts;
}

/**Fitler based on price **/
export function maxPrice(filteredProducts, rangeInput) {
  const priceValue = rangeInput.value;
  /*When it hits value 500, there is no limit in price*/
  if (parseInt(priceValue) <= 480) {
    filteredProducts = filteredProducts.filter((product) => product.price <= priceValue);
  }
  return filteredProducts;
}

/*Sort products based on which sort button is active*/
export function sortProducts(products, sortButton) {
  let sortedProducts;
  if (sortButton.classList.contains("sort__newest")) {
    sortedProducts = products.sort(function (a, b) {
      return new Date(b.published_at) - new Date(a.published_at);
    });
  } else if (sortButton.classList.contains("sort__oldest")) {
    sortedProducts = products.sort(function (b, a) {
      return new Date(b.published_at) - new Date(a.published_at);
    });
  } else if (sortButton.classList.contains("sort__high-price")) {
    sortedProducts = products.sort(function (b, a) {
      return a.price - b.price;
    });
  } else {
    sortedProducts = products.sort(function (b, a) {
      return b.price - a.price;
    });
  }
  return sortedProducts;
}
