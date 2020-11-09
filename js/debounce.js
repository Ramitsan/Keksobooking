'use strict';

var DEBOUNCE_INTERVAL = 300; // ms

window.debounce = (cb) => {
  var lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
