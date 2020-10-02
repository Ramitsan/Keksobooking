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
const PHOTOS_AMOUNT = 3;

// переменные
const map = document.querySelector('.map');

// генерация случайного числа в заданном интервале, включительно
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

// генерируем features
function getOfferFeatures(arr) {
  let offerFeature = getRandomInteger(0, arr.length);
  return arr[offerFeature];
}

// генерируем описание оффера
function getOfferDescription(arr) {
  let offerDescription = getRandomInteger(0, arr.length);
  return arr[offerDescription];
}

// функция создания всего объявления
function createAnnouncement() {
  let announcement = {
    author: {
      avatar: getNumberAvatar(ANNOUNCEMENT_AMOUNT)
    },
    offer: {
      title: getOfferTitle(OFFER_TITLE),
      address: location.x + ', ' + location.y, // не работает!
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getOfferType(OFFER_TYPE),
      rooms: getRandomInteger(1, MAX_QUANTITY_ROOMS),
      guests: getRandomInteger(1, MAX_QUANTITY_GUESTS),
      checkin: getRandomInteger(MIN_HOUR, MAX_HOUR) + ':' + '00',
      checkout: getRandomInteger(MIN_HOUR, MAX_HOUR) + ':' + '00',
      features: getOfferFeatures(OFFER_FEATURES),
      description: getOfferDescription(OFFER_DESCRIPTION),
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomInteger(1, PHOTOS_AMOUNT) + '.jpg'
    },
    location: {
      x: getRandomInteger(0, MAX_WIDHT_POINT),
      y: getRandomInteger(MIN_HEIGHT_POINT, MAX_HEIGHT_POINT)
    }
  };
  return announcement;
}

// функция создания массива объектов с объявлениями
function createAnnouncements(length) {
  let announcements = [];
  for (let i = 0; i < length; i++) {
    announcements[i] = createAnnouncement();
  }
  return announcements;
}

// получаем массив объектов с объявлениями
createAnnouncements(ANNOUNCEMENT_AMOUNT);

map.classList.remove('map--faded');
