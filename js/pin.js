'use strict';

const PIN_WIDTH = 40;
const PIN_HEIGHT = 44;
const POINTER_PIN_HEIGHT = 5;

const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// Рендер пина
const renderPin = (announcement) => {
  let clonedElement = templatePin.cloneNode(true);
  let clonedElementImg = clonedElement.querySelector(`img`);

  clonedElement.style.top = announcement.location.y - PIN_HEIGHT - POINTER_PIN_HEIGHT + `px`;
  clonedElement.style.left = announcement.location.x - PIN_WIDTH / 2 + `px`;

  clonedElementImg.src = announcement.author.avatar;
  clonedElementImg.alt = announcement.offer.title;

  // добавляем класс активного пина при клике
  clonedElement.addEventListener(`click`, () => {
    let activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
    clonedElement.classList.add(`map__pin--active`);
  });

  return clonedElement;
};

window.pin = {
  render: renderPin
};
