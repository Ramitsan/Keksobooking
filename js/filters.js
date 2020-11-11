'use strict';

const PricesRatio = {
  LOW: {
    INPUT_VALUE: `low`,
    MAX_PRICE: 10000
  },
  MIDDLE: {
    INPUT_VALUE: `middle`,
    MIN_PRICE: 10000,
    MAX_PRICE: 50000
  },
  HIGH: {
    INPUT_VALUE: `high`,
    MIN_PRICE: 50000
  }
};
const PIN_MAX_COUNT = 5;
const defaultOptionValue = `any`;

const mapFiltersForm = document.querySelector(`.map__filters`);
const filterHouseTypeElement = mapFiltersForm.querySelector(`#housing-type`);
const filterHousePriceElement = mapFiltersForm.querySelector(`#housing-price`);
const filterHouseRoomsElement = mapFiltersForm.querySelector(`#housing-rooms`);
const filterHouseGuestsElement = mapFiltersForm.querySelector(`#housing-guests`);

// фильтр количества отрисованных пинов на карте
const filterByPinsCount = (arr) => {
  return arr.slice(0, PIN_MAX_COUNT);
};

const filterByHouseType = (аnnouncement) => {
  return (filterHouseTypeElement.value === defaultOptionValue || аnnouncement.offer.type === filterHouseTypeElement.value);
};

const filterByHousePrice = (аnnouncement) => {
  return (filterHousePriceElement.value === defaultOptionValue ||
    (аnnouncement.offer.price < PricesRatio.LOW.MAX_PRICE && filterHousePriceElement.value === PricesRatio.LOW.INPUT_VALUE) ||
    (аnnouncement.offer.price > PricesRatio.HIGH.MIN_PRICE && filterHousePriceElement.value === PricesRatio.HIGH.INPUT_VALUE) ||
    (аnnouncement.offer.price >= PricesRatio.MIDDLE.MIN_PRICE && аnnouncement.offer.price <= PricesRatio.MIDDLE.MAX_PRICE &&
      filterHousePriceElement.value === PricesRatio.MIDDLE.INPUT_VALUE));
};

const filterByNumberOfRooms = (аnnouncement) => {
  return filterHouseRoomsElement.value === defaultOptionValue ||
    (аnnouncement.offer.rooms === parseInt(filterHouseRoomsElement.value, 10));
};

const filterByNumberOfGuests = (аnnouncement) => {
  return filterHouseGuestsElement.value === defaultOptionValue ||
    аnnouncement.offer.guests === parseInt(filterHouseGuestsElement.value, 10);
};

const filterByFeatures = (features) => {
  const featuresCheckedElements = Array.from(mapFiltersForm.querySelectorAll(`input[type="checkbox"]:checked`));
  return featuresCheckedElements.every((feature) => features.includes(feature.value));
};

// фильтрация объявлений по всем фильтрам
const filterAnnouncements = (announcements) => {
  return filterByPinsCount(announcements.filter((announcement) => {
    return filterByHouseType(announcement) &&
      filterByHousePrice(announcement) &&
      filterByNumberOfRooms(announcement) &&
      filterByNumberOfGuests(announcement) &&
      filterByFeatures(announcement.offer.features);
  }));
};

// заполнение карты пинами в соответсвии с фильтрами
const setFilteredPins = (data, callback) => {
  let renderingWidthDebounce = window.debounce(() => {
    callback(filterAnnouncements(data));
  });
  mapFiltersForm.addEventListener(`change`, () => {
    renderingWidthDebounce();
  });
  callback(filterAnnouncements(data));
};

// функция очистки фильтров
const clearFiltersFormHandler = () => {
  mapFiltersForm.reset();
};

window.filters = {
  setFilteredPins: setFilteredPins,
  clear: clearFiltersFormHandler
};
