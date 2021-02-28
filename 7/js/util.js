const getRandomFloat = (min, max, decimal) => {
  if (max > min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(decimal);
  }
  throw new Error('Input data error');
}

const getRandom = (min, max) => getRandomFloat(min, max, 0);

const getRandomArrayElement = (array) => array[getRandom(0, array.length - 1)];

const getRandomArrayLength = (array) => array.slice(Math.floor(Math.random() * (array.length)));

const removeChildElements = (item) => {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
}

export { getRandomFloat, getRandom, getRandomArrayElement, getRandomArrayLength, removeChildElements }
