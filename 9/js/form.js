import { sendData } from './api.js';
import { successPopup, errorPopup } from './popup.js';
import { setAddress, resetMainMarker } from './map.js';

const MAX_PRICE = 1000000;
const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOMS_NUMBER = 100;

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const address = form.querySelector('#address');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const buttonReset = form.querySelector('.ad-form__reset');

const validatePrice = () => {
  price.setAttribute('placeholder', minPrices[type.value]);
  price.setAttribute('min', minPrices[type.value]);
  price.setAttribute('max', MAX_PRICE);
}

const validateTimeIn = () => {
  timeOut.value = timeIn.value;
}

const validateTimeOut = () => {
  timeIn.value = timeOut.value;
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

type.addEventListener('change', () => validatePrice());
timeIn.addEventListener('change', () => validateTimeIn());
timeOut.addEventListener('change', () => validateTimeOut());
title.addEventListener('input', () => validateTitle(title));
roomNumber.addEventListener('change', () => validateRoomNumber());

validatePrice();
validateRoomNumber();
address.readOnly = true;

const setAdFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => { successPopup(), form.reset(), setAddress(), validatePrice(), validateRoomNumber(), resetMainMarker() },
      () => errorPopup(),
      new FormData(evt.target),
    );
  });
};

const setAdFormReset = () => {
  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    form.reset();
    setAddress();
    validatePrice();
    validateRoomNumber();
    resetMainMarker();
  })
};

setAdFormSubmit();
setAdFormReset();

export { address };
