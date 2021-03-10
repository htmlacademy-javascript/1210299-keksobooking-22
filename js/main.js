import { disableForms } from './settings.js';
import './form.js';
import { getData } from './api.js';
import { mapLoad, renderPinsOnMap } from './map.js';
import { showAlert } from './util.js';

disableForms();
mapLoad();

getData(
  (ads) => renderPinsOnMap(ads),
  () => showAlert('Ошибка загрузки данных'),
);
