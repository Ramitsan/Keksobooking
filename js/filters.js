'use strict';

(function() {

  const mapFiltersForm = document.querySelector(`.map__filters`);
  const filterHouseTypeElement = mapFiltersForm.querySelector(`#housing-type`);
  const filterHousePriceElement = mapFiltersForm.querySelector(`#housing-price`);
  const filterHouseRoomsElement = mapFiltersForm.querySelector(`#housing-rooms`);
  const filterHouseGuestsElement = mapFiltersForm.querySelector(`#housing-guests`);
  const filterFeaturesElements = Array.from(mapFiltersForm.querySelector(`#housing-features`).querySelectorAll(`input[type="checkbox"]`));

  const PIN_MAX_COUNT = 5;
  const defaultOptionValue = `any`;

  // фильтр количества отрисованных пинов на карте
  const filterByPinsCount = (arr) => {
    return arr.slice(0, PIN_MAX_COUNT);
  };

  const filterByHouseType = (аnnouncement) => {
    return (filterHouseTypeElement.value === defaultOptionValue || аnnouncement.offer.type === filterHouseTypeElement.value);
  };

  const filterByHousePrice = (аnnouncement) => {
    return (filterHousePriceElement.value === defaultOptionValue ||
      (аnnouncement.offer.price < 10000 && filterHousePriceElement.value === `low`) ||
      (аnnouncement.offer.price > 50000 && filterHousePriceElement.value === `high`) ||
      (аnnouncement.offer.price >= 10000 && аnnouncement.offer.price <= 50000 && filterHousePriceElement.value === `middle`));
  };

  const filterByNumberOfRooms = (аnnouncement) => {
    return filterHouseRoomsElement.value === defaultOptionValue ||
      (аnnouncement.offer.rooms === parseInt(filterHouseRoomsElement.value, 10));
  };

  const filterByNumberOfGuests = (аnnouncement) => {
    return filterHouseGuestsElement.value === defaultOptionValue ||
      аnnouncement.offer.guests === parseInt(filterHouseGuestsElement.value, 10);
  };

  // фильтрация объявлений по всем фильтрам
  const filterAnnouncements = (аnnouncements) => {
    return filterByPinsCount(аnnouncements.filter(function(аnnouncement) {
      return filterByHouseType(аnnouncement) && filterByHousePrice(аnnouncement) && filterByNumberOfRooms(аnnouncement) && filterByNumberOfGuests(аnnouncement);
    }));
  };

  // заполнение карты пинами в соответсвии с фильтрами
  const setFilteredPins = (data, callback) => {
    let renderingWidthDebounce = window.debounce(function() {
      callback(filterAnnouncements(data));
    });
    mapFiltersForm.addEventListener('change', function() {
      renderingWidthDebounce();
    });
    callback(filterAnnouncements(data));
  };

  // функция очистки фильтров
  const clearFiltersFormHandler = () => {
    mapFiltersForm.reset();
  }

  window.filters = {
    setFilteredPins: setFilteredPins,
    clear: clearFiltersFormHandler
  };

})();
