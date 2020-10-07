'use strict';
// КОНСТАНТЫ
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
  return shuffle(newArray).splice(0, getRandomInteger(0, newArray.length + 1));
}

// генерируем номер аватара автора
function getNumberAvatar(index) {
  let numberAvatar = 'img/avatars/user0' + index + '.png';
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

// генерируем описание оффера
function getOfferDescription(arr) {
  let offerDescription = getRandomInteger(0, arr.length);
  return arr[offerDescription];
}

// функция создания всего объявления
function createAnnouncement(index) {
  const location = {
    x: getRandomInteger(0, MAX_WIDHT_POINT),
    y: getRandomInteger(MIN_HEIGHT_POINT, MAX_HEIGHT_POINT)
  };
  const announcement = {
    author: {
      avatar: getNumberAvatar(index + 1)
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
      photos: getRandomArray(OFFER_PHOTOS)
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
let announcementElements = createAnnouncements(ANNOUNCEMENT_AMOUNT);

function addPins(announcements) {
  mapPins.appendChild(renderPins(announcements));
}

addPins(announcementElements);

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

const popup = mapCard.cloneNode(true);

function createCard(announcement) {
  popup.querySelector('.popup__title').textContent = announcement.offer.title;
  popup.querySelector('.popup__text--address').textContent = announcement.offer.address;
  popup.querySelector('.popup__text--price').textContent = `${announcement.offer.price}₽/ночь`;
  popup.querySelector('.popup__type').textContent = typesOfHousing[announcement.offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
  popup.querySelector('.popup__description').textContent = announcement.offer.description;
  popup.querySelector('.popup__avatar').src = announcement.author.avatar;

  createFeaturesBlock(announcement);
  createPhotosBlock(announcement);

  return popup;
}

// Добавляем блок с удобствами
function createFeaturesBlock(announcement) {
  if (announcement.offer.features.length === 0) {
    popup.querySelector(`.popup__features`).style.display = "none";
  } else {
    const featuresList = popup.querySelector('.popup__features');
    const features = announcement.offer.features;
    featuresList.innerHTML = '';

    features.forEach(function (value) {
      const copyFeaturesItem = document.createElement('li');

      copyFeaturesItem.classList.add(`popup__feature`);
      copyFeaturesItem.classList.add(`popup__feature--${value}`);
      featuresList.append(copyFeaturesItem);
    });
  }
}

//  Добавляем блок с фотографиями
function createPhotosBlock(announcement) {
  if (announcement.offer.photos.length === 0) {
    popup.querySelector(`.popup__photos`).style.display = "none";
  } else {
    const photosList = popup.querySelector('.popup__photos');
    const photos = announcement.offer.photos;
    photosList.innerHTML = '';

    photos.forEach(function (item) {
      const copyPhotosItem = document.createElement('img');

      copyPhotosItem.classList.add('popup__photo');
      copyPhotosItem.style.width = '45px';
      copyPhotosItem.style.height = '40px';
      copyPhotosItem.src = item;
      photosList.append(copyPhotosItem);
    });
  }
}

function showCard(announcement) {
  map.insertBefore(createCard(announcement), mapFiltersContainer);
}

showCard(announcementElements[0]);
