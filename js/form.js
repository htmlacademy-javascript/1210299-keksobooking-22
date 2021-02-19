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

type.addEventListener('change', function () {
  price.setAttribute('placeholder', minPrices[type.value]);
  price.setAttribute('min', minPrices[type.value]);
  price.setAttribute('max', MAX_PRICE);
});

timein.addEventListener('change', function () {
  timeout.value = timein.value;
});

timeout.addEventListener('change', function () {
  timein.value = timeout.value;
});
