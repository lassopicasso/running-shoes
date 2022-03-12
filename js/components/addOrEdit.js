import { getToken, productsInCart, addToCart } from "../common/storage.js";
import { productsUrl } from "../constants/api.js";
import message from "../common/messages.js";

/* ------ Add Product ------ */
export async function addNewProduct(title, price, description, image, featured) {
  let formData = new FormData();
  formData.append("files.image", image[0], image[0].name);
  const data = JSON.stringify({
    title: title,
    description: description,
    price: price,
    featured: featured,
  });
  formData.append("data", data);
  const token = JSON.parse(getToken());
  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await fetch(productsUrl, options);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    message("confirm-info", `<p>You have added the product ${title}.</p>`, ".add-message");
    cleanForm();
  } catch (error) {
    message("error-info", `<p>Oh no! Something went wrong. ${error}. Please try again later.</p>`, ".add-message");
  }
}

function cleanForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#product__description").value = "";
  /*Uncheck active featured button*/
  document.querySelector(".feature__cta--active").classList.remove("feature__cta--active");
  /*Get rid of any data from file/image input, and replace the text with default*/
  // imageFile = "";
  document.querySelector(".img-text").innerHTML = "or drag & drop an image in this area.";
}

/* ------ Update Product ------ */
export async function updateProduct(title, price, description, featured, image, id, imageEdited) {
  let formData = new FormData();
  if (imageEdited) {
    formData.append("files.image", image[0], image[0].name);
  }
  const data = JSON.stringify({
    title: title,
    description: description,
    price: price,
    featured: featured,
  });
  const url = `${productsUrl}/${id}`;
  formData.append("data", data);
  const token = JSON.parse(getToken());

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await fetch(url, options);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    message("confirm-info", `<p>You have updated the product ${title}.</p>`, ".edit-message");
  } catch (error) {
    message("error-info", `<p>Oh no! Something went wrong. ${error}. Please try again later.</p>`, ".edit-message");
  }
}

/* ------ Delete Product ------ */
export async function deleteProduct(id) {
  const url = `${productsUrl}/${id}`;
  const confirmDelete = confirm("Are you sure you want to delete it?");
  if (confirmDelete) {
    const token = JSON.parse(getToken());

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await fetch(url, options);
      removeProductInCart(id);
      location.href = "/";
    } catch (error) {
      message("error-info", `<p>Oh no! Something went wrong. ${error}. Please try again later.</p>`, ".edit-message");
    }
  }
}

function removeProductInCart(id) {
  const addedProducts = productsInCart("productsInCart");
  const remainingProducts = addedProducts.filter((product) => product.id !== id);
  addToCart("productsInCart", remainingProducts);
}
