const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  addToCart(tokenKey, token);
}
export function saveUser(user) {
  addToCart(userKey, user);
}

export function getUsername() {
  return localStorage.getItem(userKey);
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function productsInCart(key) {
  let products = localStorage.getItem(key);
  if (products === null) {
    return [];
  }
  return JSON.parse(products);
}

export function addToCart(key, addedProducts) {
  localStorage.setItem(key, JSON.stringify(addedProducts));
}
