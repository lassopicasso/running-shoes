export function inputImageHandler() {
  /* Drag or click customized input */
  const fileArea = document.querySelector(".file-uploader");

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    fileArea.addEventListener(eventName, preventDefaults);
  });

  /**Highlight drop area when item is dragged over it **/
  ["dragenter", "dragover"].forEach((eventName) => {
    fileArea.addEventListener(eventName, highlight, false);
  });
  ["dragleave", "drop"].forEach((eventName) => {
    fileArea.addEventListener(eventName, unhighlight, false);
  });
  function highlight(e) {
    fileArea.classList.add("highlight");
  }
  function unhighlight(e) {
    fileArea.classList.remove("highlight");
  }

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}

export function handleDrop(e) {
  let dt = e.dataTransfer;
  let file = dt.files;
  let imageFile = file;
  document.querySelector(".img-text").innerHTML = file[0].name;
  return imageFile;
}

export function handleClick(files) {
  const textContainer = files[0].name;
  let imageFile = files;
  document.querySelector(".img-text").innerHTML = textContainer;
  return imageFile;
}
