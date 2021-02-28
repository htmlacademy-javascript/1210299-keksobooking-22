import { removeChildElements } from './util.js';

const PROPERTY_TYPES_KEY = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
};
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const fragment = document.createDocumentFragment();

const addTextContent = (place, elem, objField, text) => {
  const item = place.querySelector(elem);
  if (objField) {
    if (text) {
      return item.textContent = objField + text;
    }
    return item.textContent = objField;
  }
  return place.removeChild(item);
}

const addAvatar = (place, elem, objField) => {
  const item = place.querySelector(elem);
  if (objField) {
    return item.src = objField;
  }
  return place.removeChild(item);
}

const addType = (place, elem, objField) => {
  const item = place.querySelector(elem);
  if (objField) {
    return item.textContent = PROPERTY_TYPES_KEY[objField];
  }
  return place.removeChild(item);
}

const addFeatures = (place, elem, objField) => {
  const item = place.querySelector(elem);
  if (objField) {
    removeChildElements(item);
    for (let i = 0; i < objField.length; i++) {
      const createElem = `<li class="popup__feature popup__feature--${objField[i]}"></li>`
      item.insertAdjacentHTML('beforeend', createElem);
    }
    return;
  }
  return place.removeChild(item);
}

const addPhotos = (place, elem, objField) => {
  const item = place.querySelector(elem);
  if (objField) {
    removeChildElements(item);
    for (let i = 0; i < objField.length; i++) {
      const createElem = `<img src="${objField[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
      item.insertAdjacentHTML('beforeend', createElem);
    }
    return;
  }
  return place.removeChild(item);
}

const addTime = (place, elem, checkin, checkout) => {
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

const addCapacity = (place, elem, objRooms, objGuests) => {
  const item = place.querySelector(elem);
  const lastSymbol = parseInt(objRooms.slice(-1));
  const penultSymbol = parseInt(objRooms.slice(-2, -1));
  const lastTwoSymbols = parseInt(objRooms.slice(-2));
  let summaSymbols = 0;
  if (penultSymbol) {
    summaSymbols = lastSymbol + penultSymbol;
  }
  let textRoom = 'комнат';
  if (lastSymbol === 1 && summaSymbols !== 2) {
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

const createCard = (obj) => {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  addTextContent(cardTemplateClone, '.popup__title', obj.offer.title);
  addTextContent(cardTemplateClone, '.popup__text--address', obj.offer.address);
  addTextContent(cardTemplateClone, '.popup__description', obj.offer.description);
  addTextContent(cardTemplateClone, '.popup__text--price', obj.offer.price, ' ₽/ночь');
  addAvatar(cardTemplateClone, '.popup__avatar', obj.author.avatar);
  addType(cardTemplateClone, '.popup__type', obj.offer.type);
  addFeatures(cardTemplateClone, '.popup__features', obj.offer.features);
  addCapacity(cardTemplateClone, '.popup__text--capacity', obj.offer.rooms, obj.offer.guests);
  addTime(cardTemplateClone, '.popup__text--time', obj.offer.checkin, obj.offer.checkout);
  addPhotos(cardTemplateClone, '.popup__photos', obj.offer.photos);
  return fragment.appendChild(cardTemplateClone);
}

export { createCard }
