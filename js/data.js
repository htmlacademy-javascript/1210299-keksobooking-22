import { getRandomFloat, getRandom, getRandomArrayElement, getRandomArrayLength } from './util.js';

const PROPERTY_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const CHECK_IN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const PROPERTY_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const APARTMENTS_COUNT = 10;

function createApartmentAd() {
  let locationX = getRandomFloat(35.65000, 36.70000, 5);
  let locationY = getRandomFloat(35.65000, 36.70000, 5);
  return {
    author: {
      avatar: `img/avatars/user0${getRandom(1, 8)}.png`,
    },
    offer: {
      title: `Объявление №${getRandom(1, 500)}`,
      address: `${locationX}, ${locationY}`,
      price: getRandom(0, 5000),
      type: getRandomArrayElement(PROPERTY_TYPES),
      rooms: getRandom(0, 100),
      guests: getRandom(0, 500),
      checkin: getRandomArrayElement(CHECK_IN_TIMES),
      checkout: getRandomArrayElement(CHECK_OUT_TIMES),
      features: getRandomArrayLength(FEATURES),
      description: 'Этот отель расположен в тихом уголке рядом с рекой, в историческом центре города',
      photos: getRandomArrayLength(PROPERTY_PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
}

function createListAd(count, ad) {
  let listAd = [];
  for (let i = 0; i < count; i++) {
    listAd.push(ad());
  }
  return listAd;
}

createListAd(APARTMENTS_COUNT, createApartmentAd);
