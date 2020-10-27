'use strict';

(function() {
  const mapPinMainElement = document.querySelector(`.map__pin--main`);
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 83; // высота с учетом "хвостика" 65 + 18;
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = -(MAIN_PIN_WIDTH / 2);
  const MAX_X = window.map.map.offsetWidth - (MAIN_PIN_WIDTH / 2);


  // получаем адрес большого пина при неактивной и активной карте
  const getAddressPin = () => {
    const mainPinPositionX = mapPinMainElement.offsetLeft;
    const mainPinPositionY = mapPinMainElement.offsetTop;

    let mainPinAddress = {};
    if (window.map.map.classList.contains(`map--faded`)) {
      mainPinAddress = {
        x: Math.round(mainPinPositionX + MAIN_PIN_WIDTH / 2),
        y: Math.round(mainPinPositionY + MAIN_PIN_WIDTH / 2)
      };
    } else {
      mainPinAddress = {
        x: Math.round(mainPinPositionX + MAIN_PIN_WIDTH / 2),
        y: Math.round(mainPinPositionY + MAIN_PIN_HEIGHT_ACTIVE)
      };
    }
    return mainPinAddress;
  };

  // получаем адрес большого пина при перемещении
  mapPinMainElement.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let CoordsMoveMainPin = {
        x: mapPinMainElement.offsetLeft - shift.x,
        y: mapPinMainElement.offsetTop - shift.y
      };

      if (CoordsMoveMainPin.x >= MIN_X && CoordsMoveMainPin.x <= MAX_X) {
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + `px`;
      }

      if (CoordsMoveMainPin.y >= MIN_Y && CoordsMoveMainPin.y <= MAX_Y) {
        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + `px`;
      }

      window.form.setAddressPin(moveEvt); // функция из модуля form
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.mainPin = {
    mapPinMainElement: mapPinMainElement,
    getAddressPin: getAddressPin
  };

})();
