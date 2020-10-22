'use strict';

(function () {

  const deactivatePage = () => {
    window.map.disableMap();
    window.form.disableForm();
    window.form.setAddressPin(window.mainPin.getAddressPin());
  };

  deactivatePage();

  const activatePage = () => {
    window.map.enableMap();
    window.form.enableForm();
    window.form.setAddressPin(window.mainPin.getAddressPin());
    window.map.addPins(window.data);
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

  // let announcementElements = window.data;

  // function showCard(announcement) {
  //   window.map.map.insertBefore(window.card.createCard(announcement), window.map.mapFiltersContainer);
  // }

  // showCard(announcementElements[0]);


  window.mainPin.mapPinMainElement.addEventListener(`mousedown`, clickLeftMouseButtonHandler);
  window.mainPin.mapPinMainElement.addEventListener(`keydown`, pressEnterHandler);

})();
