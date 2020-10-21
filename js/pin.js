'use strict';

(function() {
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

    clonedElement.addEventListener(`click`, function() {
      window.card.renderCard(window.card.createCard(announcement));
    });

    return clonedElement;
  }

  window.pin = {
    renderPin: renderPin
  };

})();
