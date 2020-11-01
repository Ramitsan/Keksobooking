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
    window.backend.load(window.map.addPins, window.message.showError);
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

  // отправка данных формы
  window.form.element.addEventListener(`submit`, function(evt) {
    evt.preventDefault();
    if (window.form.element.checkValidity()) {
      window.backend.save(new FormData(window.form.element), successHandler, errorHandler);
    }
  });

  const successHandler = () => {
    window.form.clear();
    window.map.removePins();
    deactivatePage();
    window.message.showSuccess();
  }

  const errorHandler = () => {
    window.message.showError();
  }


  window.mainPin.element.addEventListener(`mousedown`, clickLeftMouseButtonHandler);
  window.mainPin.element.addEventListener(`keydown`, pressEnterHandler);

})();
