const MAX_PRICE = 1000000;
const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');

function validatePrice() {
  price.setAttribute('placeholder', minPrices[type.value]);
  price.setAttribute('min', minPrices[type.value]);
  price.setAttribute('max', MAX_PRICE);
}

function validateTimeIn() {
  timeout.value = timein.value;
}

function validateTimeOut() {
  timein.value = timeout.value;
}

type.addEventListener('change', validatePrice);
timein.addEventListener('change', validateTimeIn);
timeout.addEventListener('change', validateTimeOut);
validatePrice();
