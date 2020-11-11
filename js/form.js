'use strict';

// минимальная цена в зависимости от типа жилья
const MinimumPrice = {
  bungalow: `0`,
  house: `5000`,
  flat: `1000`,
  palace: `10000`
};
// Соответствие количества комнат количеству гостей
const roomsToGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

// Сообщение при несоответствии количества комнат количеству гостей
const mismatchMessage = {
  1: `1 комната — для 1 гостя`,
  2: `2 комнаты — для 1 или 2 гостей`,
  3: `3 комнаты — для 1 или 2 или 3 гостей`,
  100: `100 комнат — не для гостей`
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adFormElement = document.querySelector(`.ad-form`);
const adFormFieldsetElements = adFormElement.querySelectorAll(`.ad-form__element`);
const addressInputElement = adFormElement.querySelector(`#address`);
const formResetButtonElement = adFormElement.querySelector(`.ad-form__reset`);
const roomsQuantityElement = adFormElement.querySelector(`#room_number`);
const guestsQuantityElement = adFormElement.querySelector(`#capacity`);
const adFormSubmitButton = adFormElement.querySelector(`.ad-form__submit`);
const titleInputElement = adFormElement.querySelector(`#title`);
const typeInputElement = adFormElement.querySelector(`#type`);
const priceInputElement = adFormElement.querySelector(`#price`);
const adFormTimeElement = adFormElement.querySelector(`.ad-form__element--time`);
const timeInInputElement = adFormElement.querySelector(`#timein`);
const timeOutInputElement = adFormElement.querySelector(`#timeout`);


const enableFormFieldsets = () => {
  window.util.enableElements(adFormFieldsetElements);
};

const disableForm = () => {
  adFormElement.classList.add(`ad-form--disabled`);
  clearFormHandler();
  window.util.disableElements(adFormFieldsetElements);
};

const enableForm = () => {
  adFormElement.classList.remove(`ad-form--disabled`);
  enableFormFieldsets();
};

// функция очистки полей формы
const clearFormHandler = () => {
  adFormElement.reset();
  window.chooserImage.remove();
};

const setAddressPin = (coordinates) => {
  addressInputElement.value = `${coordinates.x}, ${coordinates.y}`;
};

// Проверяем заголовок объявления
const checkTitleHandler = () => {
  const titleValueLength = titleInputElement.value.length;
  if (titleValueLength < MIN_TITLE_LENGTH) {
    titleInputElement.setCustomValidity(`Минимальная длина заголовка - ${MIN_TITLE_LENGTH} символов. Наберите еще ${MIN_TITLE_LENGTH - titleValueLength} символов`);
  } else if (titleValueLength > MAX_TITLE_LENGTH) {
    titleInputElement.setCustomValidity(`Максимальная длина заголовка - ${MAX_TITLE_LENGTH} символов. Удалите ${titleValueLength - MIN_TITLE_LENGTH} символов`);
  } else {
    titleInputElement.setCustomValidity(``);
  }
};

// Устанавливаем соответствие типа жилья и минимальной цены за ночь
const selectTypeAndPriceHandler = () => {
  const minPrice = MinimumPrice[typeInputElement.value];
  priceInputElement.placeholder = minPrice;
  priceInputElement.min = minPrice;
};

// Устанавливаем соответствие времени заезда и выезда
const selectTimeHandler = (evt) => {
  timeInInputElement.value = evt.target.value;
  timeOutInputElement.value = evt.target.value;
};

// Сопоставляем количество комнат с количеством гостей
const matchRoomsAndGuests = () => {
  const mismatch = mismatchMessage[roomsQuantityElement.value];
  return roomsToGuests[roomsQuantityElement.value].includes(guestsQuantityElement.value) ? `` : mismatch;
};
const selectRoomsHandler = () => {
  guestsQuantityElement.setCustomValidity(matchRoomsAndGuests());
};


titleInputElement.addEventListener(`input`, checkTitleHandler);
typeInputElement.addEventListener(`change`, selectTypeAndPriceHandler);
adFormTimeElement.addEventListener(`change`, selectTimeHandler);
adFormSubmitButton.addEventListener(`click`, selectRoomsHandler);

window.form = {
  element: adFormElement,
  resetElement: formResetButtonElement,
  disable: disableForm,
  enable: enableForm,
  setAddress: setAddressPin
};
