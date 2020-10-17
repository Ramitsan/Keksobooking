'use strict';

(function() {

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

  window.data = {
    getRandomInteger: getRandomInteger,
    shuffle: shuffle,
    getRandomArray: getRandomArray,
    getNumberAvatar: getNumberAvatar,
    getOfferTitle: getOfferTitle,
    getOfferType: getOfferType,
    getOfferDescription: getOfferDescription
  };

})();
