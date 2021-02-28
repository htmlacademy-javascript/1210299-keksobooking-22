import { MAX_ROOMS_NUMBER } from './data.js';

const MAX_PRICE = 1000000;
const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const address = form.querySelector('#address');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

address.readOnly = true;

const validatePrice = () => {
  price.setAttribute('placeholder', minPrices[type.value]);
  price.setAttribute('min', minPrices[type.value]);
  price.setAttribute('max', MAX_PRICE);
}

const validateTimeIn = () => {
  timeout.value = timein.value;
}

const validateTimeOut = () => {
  timein.value = timeout.value;
}

const validateTitle = (item) => {
  const valueLength = item.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    item.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    item.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    item.setCustomValidity('');
  }
  item.reportValidity();
}


const validateRoomNumber = () => {
  if (parseInt(roomNumber.value) === MAX_ROOMS_NUMBER) {
    capacity.value = 0;
    for (let i = 0; i < capacity.options.length; i++) {
      let capacityOptions = capacity.options[i];
      if (parseInt(roomNumber.value) > parseInt(capacityOptions.value) && parseInt(capacityOptions.value) !== 0) {
        capacityOptions.disabled = true;
      } else {
        capacityOptions.disabled = false;
      }
    }
  } else {
    capacity.value = roomNumber.value;
    for (let i = 0; i < capacity.options.length; i++) {
      let capacityOptions = capacity.options[i];
      if (parseInt(roomNumber.value) < parseInt(capacityOptions.value) || parseInt(capacityOptions.value) === 0) {
        capacityOptions.disabled = true;
      } else {
        capacityOptions.disabled = false;
      }
    }
  }
}

type.addEventListener('change', validatePrice);
timein.addEventListener('change', validateTimeIn);
timeout.addEventListener('change', validateTimeOut);
title.addEventListener('input', () => validateTitle(title));
roomNumber.addEventListener('change', validateRoomNumber);

validatePrice();
validateRoomNumber();

export { address };
