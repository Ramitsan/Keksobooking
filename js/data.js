'use strict';

(function() {
  const OFFER_TITLE = [`Шикарное предложение!`, `Уютное гнездышко`, `Роскошные апартаменты`, `Дешево и сердито`];
  const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const OFFER_DESCRIPTION = [`Великолепная квартира-студия в центре Токио`, `Подходит как туристам, так и бизнесменам`, `Квартира полностью укомплектована и недавно отремонтирована`];
  const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const MIN_HOUR = 12;
  const MAX_HOUR = 14;
  const MAX_WIDHT_POINT = 1200;
  const MIN_HEIGHT_POINT = 130;
  const MAX_HEIGHT_POINT = 630;
  const MIN_PRICE = 150;
  const MAX_PRICE = 1000;
  const MAX_QUANTITY_ROOMS = 5;
  const MAX_QUANTITY_GUESTS = 10;



  // генерация случайного числа в заданном интервале, включительно
  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let swap = arr[j];
      arr[j] = arr[i];
      arr[i] = swap;
    }
    return arr;
  };

  const getRandomArray = (arr) => {
    const newArray = arr.slice();
    return shuffle(newArray).splice(0, getRandomInteger(0, newArray.length + 1));
  };

  // генерируем номер аватара автора
  const getNumberAvatar = (index) => {
    let numberAvatar = `img/avatars/user0` + index + `.png`;
    return numberAvatar;
  };

  // генерируем заголовок предложения
  const getOfferTitle = (arr) => {
    let offerTitle = getRandomInteger(0, arr.length);
    return arr[offerTitle];
  };

  // генерируем тип жилья
  const getOfferType = (arr) => {
    let offerType = getRandomInteger(0, arr.length);
    return arr[offerType];
  };

  // генерируем описание оффера
  const getOfferDescription = (arr) => {
    let offerDescription = getRandomInteger(0, arr.length);
    return arr[offerDescription];
  };

  // функция создания всего объявления
  const createAnnouncement = (index) => {
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
        address: location.x + `, ` + location.y,
        price: getRandomInteger(MIN_PRICE, MAX_PRICE),
        type: getOfferType(OFFER_TYPE),
        rooms: getRandomInteger(1, MAX_QUANTITY_ROOMS),
        guests: getRandomInteger(1, MAX_QUANTITY_GUESTS),
        checkin: getRandomInteger(MIN_HOUR, MAX_HOUR) + `:` + `00`,
        checkout: getRandomInteger(MIN_HOUR, MAX_HOUR) + `:` + `00`,
        features: getRandomArray(OFFER_FEATURES),
        description: getOfferDescription(OFFER_DESCRIPTION),
        photos: getRandomArray(OFFER_PHOTOS)
      },
      location: location
    };
    return announcement;
  };

  // функция создания массива объектов с объявлениями
  const createAnnouncements = (length) => {
    let announcements = [];
    for (let i = 0; i < length; i++) {
      announcements[i] = createAnnouncement(i);
    }
    return announcements;
  };

  window.data = createAnnouncements(ANNOUNCEMENT_AMOUNT);
})();
