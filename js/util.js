'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

window.util = {
  ESC_KEYCODE: ESC_KEYCODE,
  ENTER_KEYCODE: ENTER_KEYCODE,

  isEscPress: function (evt) {
    return evt.keyCode === window.util.ESC_KEYCODE;
  },

  isEnterPress: function (evt) {
    return evt.keyCode === window.util.ENTER_KEYCODE;
  },

  disableElements: function (items) {
    items.forEach(function (item) {
      item.disabled = true;
    });
  },

  enableElements: function (items) {
    items.forEach(function (item) {
      item.disabled = false;
    });
  }
};
