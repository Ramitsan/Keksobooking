'use strict';

(function() {

  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const mapFilterElements = mapFiltersForm.querySelectorAll(`.map__filter`);
  const mapFeaturesFieldset = mapFiltersForm.querySelector(`.map__features`);

  // управление активностью и неактивности карты
  const disableMap = () => {
    map.classList.add(`map--faded`);
    disableMapFilters();
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
    showMapFeaturesFieldset();
  };

  const showMapFilterElements = () => {
    window.util.enableElements(mapFilterElements);
  };

  const showMapFeaturesFieldset = () => {
    mapFeaturesFieldset.disable = false;
  };

  // Заполнение DOM-элемента на основе массива
  const renderPins = (аnnouncements) => {
    let fragment = document.createDocumentFragment();
    let pinItem;
    for (let j = 0; j < аnnouncements.length; j++) {
      pinItem = window.pin.render(аnnouncements[j]);
      pinItem.addEventListener(`click`, function() {
        renderCard(window.card.create(аnnouncements[j]));
      });
      fragment.appendChild(pinItem);
    }
    return fragment;
  };

  const addPins = (announcements) => {
    mapPins.appendChild(renderPins(announcements));
  };

  const renderCard = (cardItem) => {
    window.card.remove();
    map.insertBefore(cardItem, mapFiltersContainer);
  };

  window.map = {
    map: map,
    disable: disableMap,
    enable: enableMap,
    addPins: addPins
  };

})();
