'use strict';

(function() {


  function deactivatePage() {
    window.map.disableMap();
    window.form.disableForm();
    window.form.setAddressPin(window.mainPin.getAddressPin());
  }

  deactivatePage();

  function activatePage() {
    window.map.enableMap();
    window.form.enableForm();
    window.form.setAddressPin(window.mainPin.getAddressPin());
    window.map.addPins(window.data);
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

  let announcementElements = window.data;

  function showCard(announcement) {
    window.map.map.insertBefore(window.card.createCard(announcement), window.map.mapFiltersContainer);
  }
  // showCard(announcementElements[0]);

  window.mainPin.mapPinMainElement.addEventListener('mousedown', clickLeftMouseButtonHandler);
  window.mainPin.mapPinMainElement.addEventListener('keydown', pressEnterHandler);

})();
