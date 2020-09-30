'use strict';
//КОНСТАНТЫ
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_CHECKIN = [12, 13, 14];
const OFFER_CHECKOUT = [12, 13, 14];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ANNOUNCEMENT_AMOUNT = 8;
const PHOTOS_AMOUNT = 3;

//переменные
const map = document.querySelector('.map');

// генерация случайного числа в заданном интервале, включительно
function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

//генерируем номер аватара автора
function getNumberAvatar() {
  let numberAvatar = 'img/avatars/user0' + getRandomIndex(0, ANNOUNCEMENT_AMOUNT) + '.png';
  return numberAvatar;
}

//генерируем тип жилья
function getOfferType(arr) {
  let offerType = getRandomIndex(0, arr.length);
  return arr[offerType];
};

//генерируем checkin
function getOfferCheckin(arr) {
  let offerCheckin = getRandomIndex(0, arr.length);
  return arr[offerCheckin];
}

//генерируем checkout
function getOfferCheckout(arr) {
  let offerCheckout = getRandomIndex(0, arr.length);
  return arr[offerCheckout];
}

//генерируем features
function getOfferFeatures(arr) {
  let offerFeature = getRandomIndex(0, arr.length);
  return arr[offerFeature];
}

//функция генерации одного оффера
function createOffer(_type, _checkin, _checkout, _features, _photos) {
  let offer = {
    type: _type,
    checkin: _checkin,
    checkout: _checkout,
    features: _features,
    photos: _photos
  };
  return offer;
}

//функция генерации массива оферов
function createOffers(length) {
  let offers = [];
  for (let i = 0; i <= length; i++) {
    let typeOffer = getOfferType(OFFER_TYPE);
    let checkinOffer = getOfferCheckin(OFFER_CHECKIN);
    let checkoutOffer = getOfferCheckout(OFFER_CHECKOUT);
    let featuresOffer = getOfferFeatures(OFFER_FEATURES);
    let photosOffer = 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomIndex(1, PHOTOS_AMOUNT) + '.jpg';

    offers[i] = createOffer(typeOffer, checkinOffer, checkoutOffer, featuresOffer, photosOffer);
  }
  return offers;
}

let arrOffers = createOffers(ANNOUNCEMENT_AMOUNT);

// функция генерации случайного офера из массива оферов
function getRandomOffer(arr) {
  let randomOffer = getRandomIndex(0, arr.length);
  return arr[randomOffer];
};

// функция создания одного обяъвления с офером
function createAnnouncementObject(_author, _offer) {
  let announcementObject = {
    author: _author,
    offer: _offer
  };
  return announcementObject;
};

// функция создания массива объектов с объявлениями
function createAnnouncementObjects(length) {
  let announcements = [];
  for (let i = 0; i < length; i++) {
    let authorAvatar = getNumberAvatar(ANNOUNCEMENT_AMOUNT);
    let offer = getRandomOffer(arrOffers);

    announcements[i] = createAnnouncementObject(authorAvatar, offer);
  }
  // return announcements;
  console.log(announcements);
};

//получаем массив объектов с объявлениями
createAnnouncementObjects(ANNOUNCEMENT_AMOUNT);


map.classList.remove('map--faded');
