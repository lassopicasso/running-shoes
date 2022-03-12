import { getUsername, productsInCart } from "./storage.js";

export default function createNavbar() {
  const navBarLinks = document.querySelector(".navbar__links");
  const navBarHamburger = document.querySelector(".navbar__hamburger");
  const page = document.querySelector("html");
  const username = JSON.parse(getUsername());
  const numberOfProducts = productsInCart("productsInCart").length;
  const { pathname } = document.location;

  /*When opening the website from index.html, then the pathname will be "/index.html" before navigating somewhere else*/
  const pages = pathname === "/" || pathname === "/index.html" ? "pages/" : "";

  let loginOrAddAndLogout = `<a href = "${pages}login.html" class="hamburger__link ${pathname === "/pages/login.html" ? "active" : ""}">Login</a>`;

  if (username) {
    loginOrAddAndLogout = `
      <a href = "${pages}add.html" class="hamburger__link ${pathname === "/pages/add.html" ? "active" : ""}">Add Products</a>
      <span class="hamburger__link signout">Logout</a>
      `;
  }
  page.addEventListener("click", dropdownMenu);

  navBarLinks.innerHTML = `
                      <div class="navbar__links">
                        <a href = "/" class="navbar__link ${pathname === "/" || pathname === "/index.html" ? "navbar__link--active" : ""}">Home</a>
                        <a href = "${pages}products.html" class="navbar__link ${pathname === "/pages/products.html" || pathname === "/pages/product-details.html" ? "navbar__link--active" : ""}">Products</a>
                        <a href = "${pages}cart.html" class="navbar__cart  ${pathname === "/pages/cart.html" ? "navbar__cart--active" : ""}"><i class="fas fa-shopping-cart"></i></a>
                        <span class="badge" id="lblCartCount">${numberOfProducts}</span>
                      </div> 
  `;
  if (numberOfProducts === 0) {
    document.querySelector(".badge").style.display = "none";
  }
  navBarHamburger.innerHTML = `
            <i class="fas fa-bars"></i>
            <div class="hamburger__links hamburger__links--hide">
              <a href = "/" class="hamburger__link ${pathname === "/" ? "active" : ""}">Home</a>
              <a href = "${pages}products.html" class="hamburger__link ${pathname === "/pages/products.html" || pathname === "/pages/product-details.html" ? "active" : ""}">Products</a>
              ${loginOrAddAndLogout}
            </div>`;
  username ? signOut(username) : "";
}

function dropdownMenu(event) {
  const menu = document.querySelector(".hamburger__links");
  if (event.target.classList.contains("fa-bars") || !menu.classList.contains("hamburger__links--hide")) {
    menu.classList.toggle("hamburger__links--hide");
  }
}

function signOut(username) {
  const logOut = document.querySelector(".signout");
  logOut.addEventListener("click", function () {
    const confirmSignOut = confirm(`${username.username}, are you sure you want to sign out?`);
    if (confirmSignOut) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      location.href = "/";
    }
  });
}
