'use strict';

(function () {

  function deactivatePage() {
    window.map.disableMap();
    window.form.disableForm();
    window.map.disableMapFilters();
    window.pin.setAddressPin(window.pin.address);
  }

  deactivatePage();

  function activatePage() {
    window.map.enableMap();
    window.form.enableForm();
    window.form.enableFormFieldsets();
    window.map.enableMapFilters();
    window.pin.setAddressPin(window.pin.getAddressPin());
    window.map.addPins(window.map.announcementElements);
  }

  window.main = {
    deactivatePage: deactivatePage,
    activatePage: activatePage
  };

})();
