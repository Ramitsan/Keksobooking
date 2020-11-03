'use strict';

(function () {

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

    window.backend.load(function (data) {
      let correctData = data.filter(function (item) {
        return 'offer' in item;
      });
      window.filters.setFilteredPins(correctData, function (filteredData) {
        window.map.removePins();
        window.card.remove();
        window.map.addPins(filteredData);
      });
    }, errorHandler);
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
  window.form.element.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    if (window.form.element.checkValidity()) {
      window.backend.save(new FormData(window.form.element), successHandler, errorHandler);
    }
  });

  // обработчик кнопки очистки формы
  window.form.resetElement.addEventListener('click', function () {
    updatePage();
  });

  const updatePage = () => {
    window.form.clear();
    window.filters.clear();
    window.card.remove();
    window.map.removePins();
    deactivatePage();
  };

  const successHandler = () => {
    window.message.showSuccess();
    updatePage();
  };

  const errorHandler = () => {
    window.message.showError();
  };


  window.mainPin.element.addEventListener(`mousedown`, clickLeftMouseButtonHandler);
  window.mainPin.element.addEventListener(`keydown`, pressEnterHandler);

})();
