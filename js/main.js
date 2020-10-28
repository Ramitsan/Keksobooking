'use strict';

(function() {

  const deactivatePage = () => {
    window.map.disable();
    window.form.disable();
    window.form.setAddressPin(window.mainPin.getAddressPin());
  };

  deactivatePage();

  const activatePage = () => {
    window.map.enable();
    window.form.enable();
    window.form.setAddressPin(window.mainPin.getAddressPin());
    window.backend.load(window.map.addPins, window.load.errorHandler);
  };

  const clickLeftMouseButtonHandler = (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  };

  const pressEnterHandler = (e) => {
    if (window.util.isEnterPress(e)) {
      activatePage();
    }
  };

  window.mainPin.mapPinMainElement.addEventListener(`mousedown`, clickLeftMouseButtonHandler);
  window.mainPin.mapPinMainElement.addEventListener(`keydown`, pressEnterHandler);

})();
