'use strict';

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFilterElements = mapFiltersForm.querySelectorAll(`.map__filter`);
const mapFeaturesFieldset = mapFiltersForm.querySelector(`.map__features`);

// управление активностью и неактивности карты
const disableMap = () => {
  map.classList.add(`map--faded`);
  window.card.remove();
  window.map.removePins();
  disableMapFilters();
  window.mainPin.reset();
};

const enableMap = () => {
  map.classList.remove(`map--faded`);
  enableMapFilters();
};

// управление активностью и неактивностью фильтров на карте
const disableMapFilters = () => {
  mapFiltersForm.classList.add(`ad-form--disabled`);
  window.util.disableElements(mapFilterElements);
  mapFeaturesFieldset.disabled = true;
};

const enableMapFilters = () => {
  mapFiltersForm.classList.remove(`ad-form--disabled`);
  showMapFilterElements();
  mapFeaturesFieldset.disabled = false;
};

const showMapFilterElements = () => {
  window.util.enableElements(mapFilterElements);
};

// Заполнение DOM-элемента на основе массива
const renderPins = (announcements) => {
  let fragment = document.createDocumentFragment();

  announcements.forEach((announcement) => {
    let pinItem = window.pin.render(announcement);

    pinItem.addEventListener(`click`, () => {
      window.card.remove();
      renderCard(window.card.create(announcement));
      pinItem.classList.add(`map__pin--active`);
    });

    fragment.appendChild(pinItem);
  });

  return fragment;
};

const addPins = (announcements) => {
  mapPins.appendChild(renderPins(announcements));
};

const renderCard = (cardItem) => {
  window.card.remove();
  map.insertBefore(cardItem, mapFiltersContainer);
};

const removePins = () => {
  mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((announcement) => {
    mapPins.removeChild(announcement);
  });
};

window.map = {
  element: map,
  mapFiltersForm: mapFiltersForm,
  disable: disableMap,
  enable: enableMap,
  addPins: addPins,
  removePins: removePins
};
