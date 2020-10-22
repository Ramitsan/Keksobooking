'use strict';

(function() {
  const adFormElement = document.querySelector(`.ad-form`);
  const adFormFieldsetElements = adFormElement.querySelectorAll(`.ad-form__element`);
  const addressInputElement = adFormElement.querySelector(`#address`);

  const enableFormFieldsets = () => {
    window.util.enableElements(adFormFieldsetElements);
  }

  const disableForm = () => {
    adFormElement.classList.add(`ad-form--disabled`);
    window.util.disableElements(adFormFieldsetElements);
  }

  const enableForm = () => {
    adFormElement.classList.remove(`ad-form--disabled`);
    enableFormFieldsets();
  }

  const setAddressPin = (pinCoordinates) => {
    addressInputElement.value = `${pinCoordinates.x}, ${pinCoordinates.y}`;
  }

  // установка соответствия количества комнат и количества гостей
  const roomsQuantityElement = adFormElement.querySelector(`#room_number`);
  const guestsQuantityElement = adFormElement.querySelector(`#capacity`);
  const adFormSubmitButton = adFormElement.querySelector(`.ad-form__submit`);

  const selectRoomsHandler = () => {
    if (roomsQuantityElement.value === `100`) {
      roomsQuantityElement.setCustomValidity(`100 комнат - только для королей!`);
    } else if (roomsQuantityElement.value > guestsQuantityElement.value) {
      roomsQuantityElement.setCustomValidity(`Комнат больше, чем гостей`);
    } else if (roomsQuantityElement.value < guestsQuantityElement.value) {
      roomsQuantityElement.setCustomValidity(`Комнат меньше, чем гостей`);
    } else {
      roomsQuantityElement.setCustomValidity(``);
    }
  }

  adFormSubmitButton.addEventListener(`click`, selectRoomsHandler);

  // проверка заголовка объявления
  const titleInputElement = adFormElement.querySelector(`#title`);
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const checkTitleHandler = () => {
    const titleValueLength = titleInputElement.value.length;
    if (titleValueLength < MIN_TITLE_LENGTH) {
      titleInputElement.setCustomValidity(`Минимальная длина заголовка - ${MIN_TITLE_LENGTH} символов. Наберите еще ${MIN_TITLE_LENGTH - titleValueLength} символов`);
    } else if (titleValueLength > MAX_TITLE_LENGTH) {
      titleInputElement.setCustomValidity(`Максимальная длина заголовка - ${MAX_TITLE_LENGTH} символов. Удалите ${titleValueLength - MIN_TITLE_LENGTH} символов`);
    } else {
      titleInputElement.setCustomValidity(``);
    }
  }

  titleInputElement.addEventListener(`input`, checkTitleHandler);

  // устанавливаем соответствие типа жилья и минимальной цены за ночь
  const typeInputElement = adFormElement.querySelector(`#type`);
  const priceInputElement = adFormElement.querySelector(`#price`);

  const selectTypeAndPriceHandler = () => {
    switch (typeInputElement.value) {
      case `bungalow`:
        priceInputElement.min === `0`;
        priceInputElement.placeholder = `0`;
        break;
      case `flat`:
        priceInputElement.min === `1000`;
        priceInputElement.placeholder = `1 000`;
        break;
      case `house`:
        priceInputElement.min === `5000`;
        priceInputElement.placeholder = `5 000`;
        break;
      case `palace`:
        priceInputElement.min === `10000`;
        priceInputElement.placeholder = `10 000`;
        break;
    }
  }

  typeInputElement.addEventListener(`change`, selectTypeAndPriceHandler);

  // устанавливаем соответствие времени заезда и выезда
  const timeInInputElement = adFormElement.querySelector(`#timein`);
  const timeOutInputElement = adFormElement.querySelector(`#timeout`);

  const selectTimeHandler = () => {
    timeOutInputElement.value = timeInInputElement.value;
  }

  timeInInputElement.addEventListener(`change`, selectTimeHandler);

  window.form = {
    adFormElement: adFormElement,
    disableForm: disableForm,
    enableForm: enableForm,
    setAddressPin: setAddressPin
  };

})();