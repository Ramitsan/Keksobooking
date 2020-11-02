'use strict';

(function() {

  const mapFiltersForm = document.querySelector(`.map__filters`);
  const filterHouseTypeElement = mapFiltersForm.querySelector(`#housing-type`);
  const filterHousePriceElement = mapFiltersForm.querySelector(`#housing-price`);
  const filterHouseRoomsElement = mapFiltersForm.querySelector(`#housing-rooms`);
  const filterHouseGuestsElement = mapFiltersForm.querySelector(`#housing-guests`);
  const filterFeaturesElements = Array.from(document.querySelector(`#housing-features`).querySelectorAll(`input[type="checkbox"]`));

  const PIN_COUNT = 5;
  const defaultOptionValue = `any`;


})();
