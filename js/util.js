'use strict';

const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;

window.util = {
  ESC_KEYCODE,
  ENTER_KEYCODE,

  isEscPress: (evt) => {
    return evt.keyCode === window.util.ESC_KEYCODE;
  },

  isEnterPress: (evt) => {
    return evt.keyCode === window.util.ENTER_KEYCODE;
  },

  disableElements: (items) => {
    items.forEach((item) => {
      item.disabled = true;
    });
  },

  enableElements: (items) => {
    items.forEach((item) => {
      item.disabled = false;
    });
  }
};
