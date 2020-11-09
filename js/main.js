'use strict';

const deactivatePage = () => {
  window.filters.clear();
  window.map.disable();
  window.form.disable();
  window.form.setAddress(window.mainPin.getAddress());
};

const activatePage = () => {
  window.map.enable();
  window.form.enable();
  window.form.setAddress(window.mainPin.getAddress());

  window.backend.load((data) => {
    let correctData = data.filter((item) => {
      return 'offer' in item;
    });
    window.filters.setFilteredPins(correctData, addFilteredPins);
  }, errorHandler);
};

const addFilteredPins = (filteredData) => {
  window.map.removePins();
  window.card.remove();
  window.map.addPins(filteredData);
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
window.form.element.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  if (window.form.element.checkValidity()) {
    window.backend.save(new FormData(window.form.element), successHandler, errorHandler);
  }
});

// обработчик кнопки очистки формы
window.form.resetElement.addEventListener('click', () => {
  deactivatePage();
});

const successHandler = () => {
  window.message.showSuccess();
  deactivatePage();
};

const errorHandler = (textMessage) => {
  window.message.showError(textMessage);
};


window.mainPin.element.addEventListener(`mousedown`, clickLeftMouseButtonHandler);
window.mainPin.element.addEventListener(`keydown`, pressEnterHandler);

deactivatePage();
