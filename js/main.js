'use strict';

(function() {
  function deactivatePage() {
    window.map.disableMap();
    window.form.disableForm();
    window.form.setAddressPin(window.mainPin.address);
  }

  deactivatePage();

  function activatePage() {
    window.map.enableMap();
    window.form.enableForm();
    window.form.setAddressPin(window.mainPin.getAddressPin());
    window.pin.addPins(window.pin.announcementElements);
  }

  function clickLeftMouseButtonHandler(evt) {
    if (evt.button === 0) {
      activatePage();
    }
  }

  function pressEnterHandler() {
    if (window.util.isEnterPress) {
      activatePage();
    }
  }

  window.mainPin.mapPinMainElement.addEventListener('mousedown', clickLeftMouseButtonHandler);
  window.mainPin.mapPinMainElement.addEventListener('keydown', pressEnterHandler);


})();
