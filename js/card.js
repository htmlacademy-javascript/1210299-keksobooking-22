import { apartments } from './data.js';
import { removeChild } from './util.js';

const PROPERTY_TYPES_KEY = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');

function addTextContent(place, elem, objField, text) {
  const item = place.querySelector(elem);
  if (objField) {
    if (text) {
      return item.textContent = objField + text;
    }
    return item.textContent = objField;
  }
  return place.removeChild(item);
}

function addAvatar(place, elem, objField) {
  const item = place.querySelector(elem);
  if (objField) {
    return item.src = objField;
  }
  return place.removeChild(item);
}

function addType(place, elem, objField) {
  const item = place.querySelector(elem);
  if (objField) {
    return item.textContent = PROPERTY_TYPES_KEY[objField];
  }
  return place.removeChild(item);
}

function addFeatures(place, elem, objField) {
  const item = place.querySelector(elem);
  if (objField) {
    removeChild(item);
    for (let j = 0; j < objField.length; j++) {
      const createElem = `<li class="popup__feature popup__feature--${objField[j]}"></li>`
      item.insertAdjacentHTML('beforeend', createElem);
    }
    return;
  }
  return place.removeChild(item);
}

function addPhotos(place, elem, objField) {
  const item = place.querySelector(elem);
  if (objField) {
    removeChild(item);
    for (let j = 0; j < objField.length; j++) {
      const createElem = `<img src="${objField[j]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
      item.insertAdjacentHTML('beforeend', createElem);
    }
    return;
  }
  return place.removeChild(item);
}

function addTime(place, elem, checkin, checkout) {
  const item = place.querySelector(elem);
  if (checkin && checkout) {
    return item.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else if (checkin) {
    return item.textContent = `Заезд после ${checkin}`;
  } else if (checkout) {
    return item.textContent = `Выезд до ${checkout}`;
  }
  return place.removeChild(item);
}

function addCapacity(place, elem, objRooms, objGuests) {
  const item = place.querySelector(elem);
  const lastSymbol = objRooms.toString().slice(-1);
  const penultSymbol = objRooms.toString().slice(-2, -1);
  const lastTwoSymbols = objRooms.toString().slice(-2);
  let summaSymbols = 0;
  if (penultSymbol) {
    summaSymbols = parseInt(lastSymbol) + parseInt(penultSymbol);
  }
  let textRoom = 'комнат';
  if (lastSymbol == '1' && summaSymbols !== 2) {
    textRoom = 'комната';
  } else if (lastSymbol >= 2 && lastSymbol <= 4 && !(lastTwoSymbols >= 10 && lastTwoSymbols <= 20)) {
    textRoom = 'комнаты';
  }
  if (objRooms && objGuests) {
    return item.textContent = `${objRooms} ${textRoom} для ${objGuests} гостей`;
  } else if (objRooms) {
    return item.textContent = `${objRooms} ${textRoom}`;
  } else if (objGuests) {
    return item.textContent = `Для ${objGuests} гостей`;
  }
  return place.removeChild(item);
}

function createCard(count, obj) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const cardTemplateClone = cardTemplate.cloneNode(true);
    addTextContent(cardTemplateClone, '.popup__title', obj[i].offer.title);
    addTextContent(cardTemplateClone, '.popup__text--address', obj[i].offer.address);
    addTextContent(cardTemplateClone, '.popup__description', obj[i].offer.description);
    addTextContent(cardTemplateClone, '.popup__text--price', obj[i].offer.price, ' ₽/ночь');
    addAvatar(cardTemplateClone, '.popup__avatar', obj[i].author.avatar);
    addType(cardTemplateClone, '.popup__type', obj[i].offer.type);
    addFeatures(cardTemplateClone, '.popup__features', obj[i].offer.features);
    addCapacity(cardTemplateClone, '.popup__text--capacity', obj[i].offer.rooms, obj[i].offer.guests);
    addTime(cardTemplateClone, '.popup__text--time', obj[i].offer.checkin, obj[i].offer.checkout);
    addPhotos(cardTemplateClone, '.popup__photos', obj[i].offer.photos);
    fragment.appendChild(cardTemplateClone);
  }
  return fragment;
}

mapCanvas.appendChild(createCard(1, apartments));
