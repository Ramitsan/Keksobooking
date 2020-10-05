'use strict';
// КОНСТАНТЫ
const OFFER_TITLE = ['Шикарное предложение!', 'Уютное гнездышко', 'Роскошные апартаменты', 'Дешево и сердито'];
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_DESCRIPTION = ['Великолепная квартира-студия в центре Токио', 'Подходит как туристам, так и бизнесменам', 'Квартира полностью укомплектована и недавно отремонтирована'];
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
const PHOTOS_AMOUNT = 3;

// переменные
const map = document.querySelector('.map');
const templatePin = document.querySelector('#pin').content;
const templateMapPin = templatePin.querySelector('.map__pin');
const mapPins = document.querySelector('.map__pins');

// генерация случайного числа в заданном интервале, включительно
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let swap = arr[j];
    arr[j] = arr[i];
    arr[i] = swap;
  }
  return arr;
}

function getRandomArray(arr) {
  const newArray = arr.slice();
  return shuffle(newArray).splice(0, getRandomInteger(0, newArray.length));
}

// генерируем номер аватара автора
function getNumberAvatar() {
  let numberAvatar = 'img/avatars/user0' + getRandomInteger(1, ANNOUNCEMENT_AMOUNT) + '.png';
  return numberAvatar;
}

// генерируем заголовок предложения
function getOfferTitle(arr) {
  let offerTitle = getRandomInteger(0, arr.length);
  return arr[offerTitle];
}

// генерируем тип жилья
function getOfferType(arr) {
  let offerType = getRandomInteger(0, arr.length);
  return arr[offerType];
}

// // генерируем features
// function getOfferFeatures(arr) {
//   let offerFeature = getRandomInteger(0, arr.length);
//   return arr[offerFeature];
// }

// генерируем описание оффера
function getOfferDescription(arr) {
  let offerDescription = getRandomInteger(0, arr.length);
  return arr[offerDescription];
}

// функция создания всего объявления
function createAnnouncement() {
  const location = {
    x: getRandomInteger(0, MAX_WIDHT_POINT),
    y: getRandomInteger(MIN_HEIGHT_POINT, MAX_HEIGHT_POINT)
  };
  const announcement = {
    author: {
      avatar: getNumberAvatar()
    },
    offer: {
      title: getOfferTitle(OFFER_TITLE),
      address: location.x + ', ' + location.y,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getOfferType(OFFER_TYPE),
      rooms: getRandomInteger(1, MAX_QUANTITY_ROOMS),
      guests: getRandomInteger(1, MAX_QUANTITY_GUESTS),
      checkin: getRandomInteger(MIN_HOUR, MAX_HOUR) + ':' + '00',
      checkout: getRandomInteger(MIN_HOUR, MAX_HOUR) + ':' + '00',
      features: getRandomArray(OFFER_FEATURES),
      description: getOfferDescription(OFFER_DESCRIPTION),
      photos: ['http://o0.github.io/assets/images/tokyo/hotel' + getRandomInteger(1, PHOTOS_AMOUNT) + '.jpg']
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

map.classList.remove('map--faded');

// Рендер DOM-элемента на основе объекта
function renderPin(announcement) {
  let clonedElement = templateMapPin.cloneNode(true);
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
function addPins() {
  let announcementElements = createAnnouncements(ANNOUNCEMENT_AMOUNT);
  mapPins.appendChild(renderPins(announcementElements));
}

addPins();

// дополнительное задание
const card = document.querySelector('#card').content;
const mapCard = card.querySelector('.map__card');
const mapFiltersContainer = map.querySelector('.map__filters-container');
const typesOfHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

function createCard() {
  const popup = mapCard.cloneNode(true);
  const announcement = createAnnouncement();

  popup.querySelector('.popup__title').textContent = announcement.offer.title;
  popup.querySelector('.popup__text--address').textContent = announcement.offer.address;
  popup.querySelector('.popup__text--price').textContent = `${announcement.offer.price}₽/ночь`;
  popup.querySelector('.popup__type').textContent = typesOfHousing[announcement.offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
  popup.querySelector('.popup__description').textContent = announcement.offer.description;
  popup.querySelector('.popup__avatar').src = announcement.author.avatar;

  //  Добавляем блок с удобствами
  if (announcement.offer.features.length === 0) {
    popup.querySelector(`.popup__features`).style.display = "none";
  } else {
    const featuresList = popup.querySelector('.popup__features');
    const featuresItem = featuresList.querySelector('.popup__feature');
    const features = announcement.offer.features;
    featuresList.innerHTML = '';
    const fragmentFeatures = document.createDocumentFragment();

    features.forEach(function (value) {
      const copyFeaturesItem = featuresItem.cloneNode(true);
      copyFeaturesItem.classList.add(`popup__feature--${value}`);
      fragmentFeatures.appendChild(copyFeaturesItem);
    });
    featuresList.appendChild(fragmentFeatures);
  }

  //  Добавляем блок с фотографиями
  if (announcement.offer.photos.length === 0) {
    popup.querySelector(`.popup__photos`).style.display = "none";
  } else {
    const photosList = popup.querySelector('.popup__photos');
    const photosItem = photosList.querySelector('.popup__photo');
    const photos = announcement.offer.photos;
    photosList.innerHTML = '';
    const fragmentPhotos = document.createDocumentFragment();

    photos.forEach(function (item) {
      const copyPhotosItem = photosItem.cloneNode(true);
      copyPhotosItem.src = item;
      fragmentPhotos.appendChild(copyPhotosItem);
    });

    photosList.appendChild(fragmentPhotos);
  }
  return popup;
}

function showCard() {
  map.insertBefore(createCard(createAnnouncements([0])), mapFiltersContainer);
}

showCard();
