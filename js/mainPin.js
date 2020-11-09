'use strict';

const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT_ACTIVE = 83; // высота с учетом "хвостика" 65 + 18;
const MAP_MIN_Y = 130;
const MAP_MAX_Y = 630;
const MAIN_PIN_MIN_Y = MAP_MIN_Y - MAIN_PIN_HEIGHT_ACTIVE;
const MAIN_PIN_MAX_Y = MAP_MAX_Y - MAIN_PIN_HEIGHT_ACTIVE;
const MAIN_PIN_MIN_X = -(MAIN_PIN_WIDTH / 2);
const MAIN_PIN_MAX_X = window.map.element.offsetWidth - (MAIN_PIN_WIDTH / 2);

const mapPinMainElement = document.querySelector(`.map__pin--main`);
const mainPinStartLeft = mapPinMainElement.style.left;
const mainPinStartTop = mapPinMainElement.style.top;


// получаем адрес большого пина при неактивной и активной карте
const getAddressPin = () => {
  const mainPinPositionX = mapPinMainElement.offsetLeft;
  const mainPinPositionY = mapPinMainElement.offsetTop;

  let mainPinAddress = {};
  if (window.map.element.classList.contains(`map--faded`)) {
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

    let coordsMoveMainPin = {
      x: mapPinMainElement.offsetLeft - shift.x,
      y: mapPinMainElement.offsetTop - shift.y
    };

    if (coordsMoveMainPin.x >= MAIN_PIN_MIN_X && coordsMoveMainPin.x <= MAIN_PIN_MAX_X) {
      mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + `px`;
    }

    if (coordsMoveMainPin.y >= MAIN_PIN_MIN_Y && coordsMoveMainPin.y <= MAIN_PIN_MAX_Y) {
      mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + `px`;
    }

    window.form.setAddress(getAddressPin());
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

const resetMainPin = () => {
  mapPinMainElement.style.left = mainPinStartLeft;
  mapPinMainElement.style.top = mainPinStartTop;
};

window.mainPin = {
  element: mapPinMainElement,
  getAddress: getAddressPin,
  reset: resetMainPin
};
