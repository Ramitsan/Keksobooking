'use strict';

(function () {
  const adFormElement = document.querySelector(`.ad-form`);
  const adFormFieldsetElements = adFormElement.querySelectorAll(`.ad-form__element`);
  const addressInputElement = adFormElement.querySelector(`#address`);

  const enableFormFieldsets = () => {
    window.util.enableElements(adFormFieldsetElements);
  };

  const disableForm = () => {
    adFormElement.classList.add(`ad-form--disabled`);
    window.util.disableElements(adFormFieldsetElements);
  };

  const enableForm = () => {
    adFormElement.classList.remove(`ad-form--disabled`);
    enableFormFieldsets();
  };

  const setAddressPin = (pinCoordinates) => {
    addressInputElement.value = `${pinCoordinates.x}, ${pinCoordinates.y}`;
  };

  // установка соответствия количества комнат и количества гостей
  const roomsQuantityElement = adFormElement.querySelector(`#room_number`);
  const guestsQuantityElement = adFormElement.querySelector(`#capacity`);
  const adFormSubmitButton = adFormElement.querySelector(`.ad-form__submit`);

  const selectRoomsHandler = () => {
    switch (roomsQuantityElement.value) {
      case `100`:
        if (guestsQuantityElement.value !== `0`) {
          roomsQuantityElement.setCustomValidity(`100 комнат — не для гостей`);
        } else {
          roomsQuantityElement.setCustomValidity(``);
        }
        break;
      case `1`:
        if (guestsQuantityElement.value !== `1`) {
          roomsQuantityElement.setCustomValidity(`1 комната — для 1 гостя`);
        } else {
          roomsQuantityElement.setCustomValidity(``);
        }
        break;
      case `2`:
        if (guestsQuantityElement.value !== `1` || guestsQuantityElement.value !== `2`) {
          roomsQuantityElement.setCustomValidity(`2 комнаты — для 1 или 2 гостей`);
        } else {
          roomsQuantityElement.setCustomValidity(``);
        }
        break;
      case `3`:
        if (guestsQuantityElement.value === `0`) {
          roomsQuantityElement.setCustomValidity(`3 комнаты — для 1 или 2 или 3 гостей`);
        } else {
          roomsQuantityElement.setCustomValidity(``);
        }
        break;
    }
  };

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
  };

  titleInputElement.addEventListener(`input`, checkTitleHandler);

  // устанавливаем соответствие типа жилья и минимальной цены за ночь
  const typeInputElement = adFormElement.querySelector(`#type`);
  const priceInputElement = adFormElement.querySelector(`#price`);

  const selectTypeAndPriceHandler = () => {
    if (typeInputElement.value === `bungalow`) {
      priceInputElement.min === `0`;
      priceInputElement.placeholder = `0`;
    }
    if (typeInputElement.value === `flat`) {
      priceInputElement.min === `1000`;
      priceInputElement.placeholder = `1 000`;
    }
    if (typeInputElement.value === `house`) {
      priceInputElement.min === `5000`;
      priceInputElement.placeholder = `5 000`;
    }
    if (typeInputElement.value === `palace`) {
      priceInputElement.min === `10000`;
      priceInputElement.placeholder = `10 000`;
    }
  };

  typeInputElement.addEventListener(`change`, selectTypeAndPriceHandler);

  // устанавливаем соответствие времени заезда и выезда
  const adFormTimeElement = adFormElement.querySelector(`.ad-form__element--time`);
  const timeInInputElement = adFormElement.querySelector(`#timein`);
  const timeOutInputElement = adFormElement.querySelector(`#timeout`);

  const selectTimeHandler = (evt) => {
    timeInInputElement.value = evt.target.value;
    timeOutInputElement.value = evt.target.value;
  };

  adFormTimeElement.addEventListener('change', selectTimeHandler);

  window.form = {
    adFormElement: adFormElement,
    disable: disableForm,
    enable: enableForm,
    setAddressPin: setAddressPin
  };

})();
