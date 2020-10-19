'use strict';

(function() {
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 44;
  const POINTER_PIN_HEIGHT = 5;
  const ANNOUNCEMENT_AMOUNT = 8;

  const templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  const mapPins = document.querySelector('.map__pins');

  // Рендер DOM-элемента на основе объекта
  function renderPin(announcement) {
    let clonedElement = templatePin.cloneNode(true);
    let clonedElementImg = clonedElement.querySelector('img');

    clonedElement.style.top = announcement.location.y - PIN_HEIGHT - POINTER_PIN_HEIGHT + 'px';
    clonedElement.style.left = announcement.location.x - PIN_WIDTH / 2 + 'px';

    clonedElementImg.src = announcement.author.avatar;
    clonedElementImg.alt = announcement.offer.title;
    return clonedElement;
  }

  // Заполнение DOM-элемента на основе массива
  function renderPins(аnnouncements) {
    let fragment = document.createDocumentFragment();
    for (let j = 0; j < аnnouncements.length; j++) {
      fragment.appendChild(renderPin(аnnouncements[j]));
    }
    return fragment;
  }

  // Отрисовка сгенерированных DOM-элементов
  let announcementElements = window.data.createAnnouncements(ANNOUNCEMENT_AMOUNT);

  function addPins(announcements) {
    mapPins.appendChild(renderPins(announcements));
  }

  function showCard(announcement) {
    window.map.map.insertBefore(window.card.createCard(announcement), window.map.mapFiltersContainer);
  }

  showCard(announcementElements[0]);

  window.pin = {
    mapPins: mapPins,
    announcementElements: announcementElements,
    addPins: addPins
  };

})();
