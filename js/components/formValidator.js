export function checkLength(input, length) {
  if (input === undefined || input.value.trim().length < length) {
    document.querySelector(`.${input.id}-error`).style.display = "block";
    return false;
  } else {
    document.querySelector(`.${input.id}-error`).style.display = "none";
    return true;
  }
}

export function checkPrice(input) {
  if (input === undefined || input.value < 10) {
    document.querySelector(`.${input.id}-error`).style.display = "block";
    return false;
  } else {
    document.querySelector(`.${input.id}-error`).style.display = "none";
    return true;
  }
}

export function checkImg(input) {
  if (input === undefined) {
    document.querySelector(".image-error").style.display = "block";
    return false;
  } else {
    document.querySelector(".image-error").style.display = "none";
    return true;
  }
}

export function checkFeatured() {
  const featureBtn = document.querySelectorAll(".feature__cta");
  let featured;
  featureBtn.forEach((btn) => {
    if (btn.classList.contains("feature__cta--active")) {
      featured = false;
      if (btn.classList.contains("feature__cta-yes")) {
        featured = true;
      }
    }
  });
  if (featured === undefined) {
    document.querySelector(".feature-error").style.display = "block";
  } else {
    document.querySelector(".feature-error").style.display = "none";
  }
  return featured;
}
