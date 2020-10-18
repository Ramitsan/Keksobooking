'use strict';

(function() {

  const map = document.querySelector('.map');
  // const mapFiltersContainer = map.querySelector('.map__filters-container');
  const mapFiltersForm = document.querySelector('.map__filters');
  const mapFilterElements = mapFiltersForm.querySelectorAll('.map__filter');
  const mapFeaturesFieldset = mapFiltersForm.querySelector('.map__features');


  // управление активностью и неактивности карты
  function disableMap() {
    map.classList.add('map--faded');
    disableMapFilters();
  }

  function enableMap() {
    map.classList.remove('map--faded');
    enableMapFilters();
  }

  // управление активностью и неактивностью фильтров на карте
  function disableMapFilters() {
    mapFiltersForm.classList.add('ad-form--disabled');
    window.form.disableElements(mapFilterElements);
    mapFeaturesFieldset.disabled = true;
  }

  function enableMapFilters() {
    mapFiltersForm.classList.remove('ad-form--disabled');
    showMapFilterElements();
    showMapFeaturesFieldset();
  }

  function showMapFilterElements() {
    window.form.enableElements(mapFilterElements);
  }

  function showMapFeaturesFieldset() {
    mapFeaturesFieldset.removeAttribute("disabled");
  }

  window.map = {
    map: map,
    disableMap: disableMap,
    enableMap: enableMap
  };

})();
