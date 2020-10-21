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
  const roomsQuantity = adFormElement.querySelector(`#room_number`);
  const guestsQuantity = adFormElement.querySelector(`#capacity`);
  const adFormSubmitButton = adFormElement.querySelector(`.ad-form__submit`);

  const selectRooms = () => {
    if (roomsQuantity.value === `100`) {
      roomsQuantity.setCustomValidity(`100 комнат - только для королей!`);
    } else if (roomsQuantity.value > guestsQuantity.value) {
      roomsQuantity.setCustomValidity(`Комнат больше, чем гостей`);
    } else if (roomsQuantity.value < guestsQuantity.value) {
      roomsQuantity.setCustomValidity(`Комнат меньше, чем гостей`);
    } else {
      roomsQuantity.setCustomValidity(``);
    }
  }

  adFormSubmitButton.addEventListener(`click`, selectRooms);

  // проверка заголовка объявления
  const titleInputElement = adFormElement.querySelector(`#title`);
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  titleInputElement.addEventListener(`input`, () => {
    const titleValueLength = titleInputElement.value.length;
    if (titleValueLength < MIN_TITLE_LENGTH) {
      titleInputElement.setCustomValidity(`Минимальная длина заголовка - ${MIN_TITLE_LENGTH} символов. Наберите еще ${MIN_TITLE_LENGTH - titleValueLength} символов`);
    } else if (titleValueLength > MAX_TITLE_LENGTH) {
      titleInputElement.setCustomValidity(`Максимальная длина заголовка - ${MAX_TITLE_LENGTH} символов. Удалите ${titleValueLength - MIN_TITLE_LENGTH} символов`);
    } else {
      titleInputElement.setCustomValidity(``);
    }
  })

  // устанавливаем соответствие типа жилья и минимальной цены за ночь
  const typeInputElement = adFormElement.querySelector(`#type`);
  const priceInputElement = adFormElement.querySelector(`#price`);

  const selectTypeAndPrice = () => {
    if (typeInputElement.value === `bungalow`) {
      priceInputElement.min === `0`;
      priceInputElement.placeholder = `0`;
    } else if (typeInputElement.value === `flat`) {
      priceInputElement.min === `1000`;
      priceInputElement.placeholder = `1 000`;
    } else if (typeInputElement.value === `house`) {
      priceInputElement.min === `5000`;
      priceInputElement.placeholder = `5 000`;
    } else if (typeInputElement.value === `palace`) {
      priceInputElement.min === `10000`;
      priceInputElement.placeholder = `10 000`;
    }
  }

  typeInputElement.addEventListener(`change`, selectTypeAndPrice);

  window.form = {
    adFormElement: adFormElement,
    disableForm: disableForm,
    enableForm: enableForm,
    setAddressPin: setAddressPin
  };

})();
