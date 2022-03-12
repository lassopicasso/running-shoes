export default function priceSlider() {
  const priceInput = document.querySelector(".input-max");
  // const range = document.querySelector(".price__progress");
  const rangeInput = document.querySelector(".range-max");

  /*Start with No Limit*/
  document.querySelector(".infinity").innerHTML = `
  <span> No Limit </span>                  
    `;

  rangeInput.addEventListener("input", priceSliderInput);
  function priceSliderInput() {
    priceInput.value = rangeInput.value;
    if (parseInt(priceInput.value) === 500) {
      document.querySelector(".infinity").innerHTML = `
                      <span> No Limit </span>                  
                        `;
    } else if (parseInt(priceInput.value) < 1000) {
      document.querySelector(".infinity").innerHTML = ` <div class="price__text infinity">Kr <input type="number" class="input-max" value="${priceInput.value}" max="5000" step="100" /></div>`;
    }

    /*add color difference*/
    var value = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
    rangeInput.style.background = "linear-gradient(to right, #49dc99 0%, #49dc99 " + value + "%, #0c7eca " + value + "%, #0c7eca 100%)";
  }
}
