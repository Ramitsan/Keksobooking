'use strict';

(function () {
  const adFormElement = document.querySelector('.ad-form');
  const adFormFieldsetElements = adFormElement.querySelectorAll('.ad-form__element');
  const addressInputElement = adFormElement.querySelector('#address');


  function enableFormFieldsets() {
    window.util.enableElements(adFormFieldsetElements);
  }

  function disableForm() {
    adFormElement.classList.add('ad-form--disabled');
    window.util.disableElements(adFormFieldsetElements);
  }

  function enableForm() {
    adFormElement.classList.remove('ad-form--disabled');
    enableFormFieldsets();
  }

  function setAddressPin(pinCoordinates) {
    addressInputElement.value = `${pinCoordinates.x}, ${pinCoordinates.y}`;
  }

  // установка соответствия количества комнат и количества гостей
  const roomsQuantity = adFormElement.querySelector('#room_number');
  const guestsQuantity = adFormElement.querySelector('#capacity');
  const adFormSubmitButton = adFormElement.querySelector('.ad-form__submit');

  function selectRooms() {
    if (roomsQuantity.value === '100') {
      roomsQuantity.setCustomValidity('100 комнат - только для королей!');
    } else if (roomsQuantity.value > guestsQuantity.value) {
      roomsQuantity.setCustomValidity('Комнат больше, чем гостей');
    } else if (roomsQuantity.value < guestsQuantity.value) {
      roomsQuantity.setCustomValidity('Комнат меньше, чем гостей');
    } else {
      roomsQuantity.setCustomValidity('');
    }
  }

  adFormSubmitButton.addEventListener('click', selectRooms);

  window.form = {
    adFormElement: adFormElement,
    disableForm: disableForm,
    enableForm: enableForm,
    setAddressPin: setAddressPin
  };

})();