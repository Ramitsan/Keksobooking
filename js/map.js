'use strict';

(function() {
  const OFFER_TITLE = ['Шикарное предложение!', 'Уютное гнездышко', 'Роскошные апартаменты', 'Дешево и сердито'];
  const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
  const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const OFFER_DESCRIPTION = ['Великолепная квартира-студия в центре Токио', 'Подходит как туристам, так и бизнесменам', 'Квартира полностью укомплектована и недавно отремонтирована'];
  const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const MIN_HOUR = 12;
  const MAX_HOUR = 14;
  const MAX_WIDHT_POINT = 1200;
  const MIN_HEIGHT_POINT = 130;
  const MAX_HEIGHT_POINT = 630;
  const MIN_PRICE = 150;
  const MAX_PRICE = 1000;
  const MAX_QUANTITY_ROOMS = 5;
  const MAX_QUANTITY_GUESTS = 10;
  const ANNOUNCEMENT_AMOUNT = 8;
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 44;
  const POINTER_PIN_HEIGHT = 5;
  const map = document.querySelector('.map');
  // const mapFiltersContainer = map.querySelector('.map__filters-container');

  const templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  const mapPins = document.querySelector('.map__pins');

  const mapFiltersForm = document.querySelector('.map__filters');
  const mapFilterElements = mapFiltersForm.querySelectorAll('.map__filter');
  const mapFeaturesFieldset = mapFiltersForm.querySelector('.map__features');

  // функция создания всего объявления
  function createAnnouncement(index) {
    const location = {
      x: window.data.getRandomInteger(0, MAX_WIDHT_POINT),
      y: window.data.getRandomInteger(MIN_HEIGHT_POINT, MAX_HEIGHT_POINT)
    };
    const announcement = {
      author: {
        avatar: window.data.getNumberAvatar(index + 1)
      },
      offer: {
        title: window.data.getOfferTitle(OFFER_TITLE),
        address: location.x + ', ' + location.y,
        price: window.data.getRandomInteger(MIN_PRICE, MAX_PRICE),
        type: window.data.getOfferType(OFFER_TYPE),
        rooms: window.data.getRandomInteger(1, MAX_QUANTITY_ROOMS),
        guests: window.data.getRandomInteger(1, MAX_QUANTITY_GUESTS),
        checkin: window.data.getRandomInteger(MIN_HOUR, MAX_HOUR) + ':' + '00',
        checkout: window.data.getRandomInteger(MIN_HOUR, MAX_HOUR) + ':' + '00',
        features: window.data.getRandomArray(OFFER_FEATURES),
        description: window.data.getOfferDescription(OFFER_DESCRIPTION),
        photos: window.data.getRandomArray(OFFER_PHOTOS)
      },
      location: location
    };
    return announcement;
  }

  // функция создания массива объектов с объявлениями
  function createAnnouncements(length) {
    let announcements = [];
    for (let i = 0; i < length; i++) {
      announcements[i] = createAnnouncement(i);
    }
    return announcements;
  }

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
  let announcementElements = createAnnouncements(ANNOUNCEMENT_AMOUNT);

  function addPins(announcements) {
    mapPins.appendChild(renderPins(announcements));
  }

  // управление активностью и неактивности карты
  function disableMap() {
    map.classList.add('map--faded');
  }

  function enableMap() {
    map.classList.remove('map--faded');
  }

  // управление активностью и неактивностью фильтров на карте
  function disableMapFilters() {
    mapFiltersForm.classList.add('ad-form--disabled');
    window.form.disableElements(mapFilterElements);
    mapFeaturesFieldset.disabled = true;
  }

  function enableMapFilters() {
    mapFiltersForm.classList.remove('ad-form--disabled');
    showMapFilterElements();
    showMapFeaturesFieldset();
  }

  function showMapFilterElements() {
    window.form.enableElements(mapFilterElements);
  }

  function showMapFeaturesFieldset() {
    mapFeaturesFieldset.removeAttribute("disabled");
  }

  window.map = {
    map: map,
    // mapFiltersContainer: mapFiltersContainer,
    createAnnouncement: createAnnouncement,
    createAnnouncements: createAnnouncements,
    renderPin: renderPin,
    renderPins: renderPins,
    announcementElements: announcementElements,
    addPins: addPins,
    disableMap: disableMap,
    enableMap: enableMap,
    disableMapFilters: disableMapFilters,
    enableMapFilters: enableMapFilters
  };


})();
