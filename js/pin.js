'use strict';

(function () {
  const mapPinMainElement = document.querySelector('.map__pin--main');
  const addressInputElement = window.form.adFormElement.querySelector('#address');
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 83; // высота с учетом "хвостика" 65 + 18;

  const address = getAddressPin();

  function setAddressPin(pinCoordinates) {
    addressInputElement.value = `${pinCoordinates.x}, ${pinCoordinates.y}`;
  }

  function getAddressPin() {
    const mainPinPositionX = mapPinMainElement.offsetLeft;
    const mainPinPositionY = mapPinMainElement.offsetTop;

    let mainPinAddress = {};
    if (window.map.map.classList.contains('map--faded')) {
      mainPinAddress = {
        x: Math.round(mainPinPositionX + MAIN_PIN_WIDTH / 2),
        y: Math.round(mainPinPositionY + MAIN_PIN_WIDTH / 2)
      };
    } else {
      mainPinAddress = {
        x: Math.round(mainPinPositionX + MAIN_PIN_WIDTH / 2),
        y: Math.round(mainPinPositionY + MAIN_PIN_HEIGHT_ACTIVE)
      };
    }
    return mainPinAddress;
  }

  function clickLeftMouseButtonHandler(evt) {
    if (evt.button === 0) {
      window.main.activatePage();
    }
  }

  function pressEnterHandler() {
    if (window.util.pressEnter) {
      window.main.activatePage();
    }
  }

  mapPinMainElement.addEventListener('mousedown', clickLeftMouseButtonHandler);
  mapPinMainElement.addEventListener('keydown', pressEnterHandler);

  window.pin = {
    mapPinMainElement: mapPinMainElement,
    address: address,
    setAddressPin: setAddressPin,
    getAddressPin: getAddressPin
  };

})();
