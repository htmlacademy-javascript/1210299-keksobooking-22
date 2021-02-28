const filterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const filterFormsElements = Array.from(filterForm.children).concat(Array.from(adForm.children));

const setDisabledForms = () => {
  filterForm.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');
  filterFormsElements.forEach((item) => {
    item.disabled = true;
  });
}

const setEnabledForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');
  filterFormsElements.forEach((item) => {
    item.disabled = false;
  });
}

setDisabledForms();

export { setEnabledForms }
