function getRandom(min, max) {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  throw new Error('Input data error');
}

function getRandomFloat(min, max, decimal) {
  if (max > min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(decimal);
  }
  throw new Error('Input data error');
}

getRandom(10, 20);
getRandomFloat(10, 20, 2);
