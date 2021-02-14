function getRandomFloat(min, max, decimal) {
  if (max > min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(decimal);
  }
  throw new Error('Input data error');
}

function getRandom(min, max) {
  return getRandomFloat(min, max, 0);
}

function getRandomArrayElement(array) {
  let item;
  item = array[getRandom(0, array.length - 1)];
  return item;
}

function getRandomArrayLength(array) {
  return array.slice(Math.floor(Math.random() * (array.length - 1)));
}

export { getRandomFloat, getRandom, getRandomArrayElement, getRandomArrayLength }
