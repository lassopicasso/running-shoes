import navbar from "./common/navbar.js";
import { cleanUrl, homeUrl, productsUrl } from "./constants/api.js";
import message from "./common/messages.js";

navbar();

const banner = document.querySelector(".homepage-banner");
const carousel = document.querySelector(".carousel__wrapper");

/*Welcome message*/
if (localStorage.getItem("firstTime") == null) {
  alert("Welcome! Currently having some trouble with API. Give it 30-60 seconds and then refresh. :) The website also offers admin tools: lars.walderhaug@hotmail.com");
  localStorage.setItem("firstTime", "done");
}

/*Banner*/
(async function () {
  try {
    const response = await fetch(homeUrl);
    const details = await response.json();
    banner.style.backgroundImage = `url('${details.hero_banner.url}')`;
  } catch (error) {
    message("alert error-info", `Following error occured: ${error}`, ".homepage-banner");
  }
})();

/* Carousel */
(async function () {
  let count = 0;
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    products.forEach((product) => {
      if (product.featured) {
        count += 1;
        carousel.innerHTML += ` 
                                <div class="carousel__product">
                                <a href="pages/product-details.html?id=${product.id}">
                                  <div class="carousel__image" style = "background-image: url('${product.image.url}'")></div> 
                                  <span class="carousel__title"> ${product.title} </span>
                                </a>
                                </div>  
                                `;
      }
    });
  } catch (error) {
    message("alert error-info", `Following error occured: ${error}`, ".carousel");
  }
  carouselSwing(count);
})();

function carouselSwing(quantity) {
  const carouselWrapper = document.querySelector(".carousel__wrapper");
  const carouselArrowLeft = document.querySelector(".fa-chevron-circle-left");
  const carouselArrowRight = document.querySelector(".fa-chevron-circle-right");

  setWidth();
  window.onresize = setWidth;
  function setWidth() {
    /*setting the default margin position that is being added or substracted based on which arrow is clicked*/
    let marginPosition = 0;

    /*Set the width of each image based on width of viewport*/
    let imageWidth = 50;
    imageWidth = window.innerWidth <= 600 ? 100 : 50;

    /*Setting the width of the wrapper based on amount of feature products */
    let carouselWidth = quantity * imageWidth;
    carouselWrapper.style.width = carouselWidth + "%";

    /* Calculate when right arrow will display none */
    const maxMarginLeft = carouselWidth - 100;

    /* No carousel if there is less than 2 featured products in desktop view */
    if (maxMarginLeft < imageWidth) {
      carouselArrowRight.style.display = "none";
    }

    /*Based on left or right arrow is clicked on, it will call a function that checks if this arrow shall be displayed or not*/
    carouselArrowRight.addEventListener("click", function swingRight() {
      marginPosition -= imageWidth;
      carouselWrapper.style.marginLeft = marginPosition + "%";
      checkMarginPoistion(marginPosition, maxMarginLeft, carouselArrowLeft, carouselArrowRight);
    });
    carouselArrowLeft.addEventListener("click", function swingRight() {
      marginPosition += imageWidth;
      carouselWrapper.style.marginLeft = marginPosition + "%";
      checkMarginPoistion(marginPosition, maxMarginLeft, carouselArrowLeft, carouselArrowRight);
    });
  }
}

function checkMarginPoistion(marginPosition, maxMarginLeft, arrowLeft, arrowRight) {
  arrowLeft.style.display = marginPosition === 0 ? "none" : "inline-block";
  arrowRight.style.display = marginPosition === -maxMarginLeft ? "none" : "inline-block";
}
