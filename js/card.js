'use strict';

const typesOfHousing = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};
const NO_VALUE = `no value`;
const card = document.querySelector(`#card`).content.querySelector(`.map__card`);

const documentEscapePressHandler = (e) => {
  if (window.util.isEscPress(e)) {
    removeCard();
  }
};

const createCard = (announcement) => {
  const popup = card.cloneNode(true);

  popup.querySelector(`.popup__title`).textContent = announcement.offer.title || NO_VALUE;
  popup.querySelector(`.popup__text--address`).textContent = announcement.offer.address || NO_VALUE;
  popup.querySelector(`.popup__text--price`).textContent = `${announcement.offer.price}₽/ночь` || NO_VALUE;
  popup.querySelector(`.popup__type`).textContent = typesOfHousing[announcement.offer.type] || NO_VALUE;
  popup.querySelector(`.popup__text--capacity`).textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей` || NO_VALUE;
  popup.querySelector(`.popup__text--time`).textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}` || NO_VALUE;
  popup.querySelector(`.popup__description`).textContent = announcement.offer.description || NO_VALUE;
  popup.querySelector(`.popup__avatar`).src = announcement.author.avatar || NO_VALUE;

  createFeaturesBlock(popup, announcement);
  createPhotosBlock(popup, announcement);

  // проверка на наличие данных, если данных нет, блок скрывается
  const popupItems = popup.querySelectorAll(`:scope > *`);
  popupItems.forEach((item) => {
    if (item.textContent === NO_VALUE || item.src === NO_VALUE) {
      item.remove();
    }
  });

  popup.querySelector(`.popup__close`).addEventListener(`click`, () => {
    removeCard();
  });

  // добавляем закрытие карточки по клику на Esc
  document.addEventListener(`keydown`, documentEscapePressHandler);

  return popup;
};

// Добавляем блок с удобствами
const createFeaturesBlock = (popup, announcement) => {
  if (!announcement.offer.features) {
    popup.querySelector(`.popup__features`).style.display = `none`;
  } else {
    const featuresList = popup.querySelector(`.popup__features`);
    featuresList.style.display = `block`;
    const features = announcement.offer.features;
    featuresList.innerHTML = ``;

    features.forEach((value) => {
      const copyFeaturesItem = document.createElement(`li`);

      copyFeaturesItem.classList.add(`popup__feature`);
      copyFeaturesItem.classList.add(`popup__feature--${value}`);
      featuresList.append(copyFeaturesItem);
    });
  }
};

//  Добавляем блок с фотографиями
const createPhotosBlock = (popup, announcement) => {
  if (!announcement.offer.photos) {
    popup.querySelector(`.popup__photos`).style.display = `none`;
  } else {
    const photosList = popup.querySelector(`.popup__photos`);
    photosList.style.display = `block`;
    const photos = announcement.offer.photos;
    photosList.innerHTML = ``;

    photos.forEach((item) => {
      const copyPhotosItem = document.createElement(`img`);

      copyPhotosItem.classList.add(`popup__photo`);
      copyPhotosItem.style.width = `45px`;
      copyPhotosItem.style.height = `40px`;
      copyPhotosItem.src = item;

      photosList.append(copyPhotosItem);
    });
  }
};

// добавляем закрытие карточки по клику на "крестик"
const removeCard = () => {
  const mapCardElement = window.map.element.querySelector(`.map__card`);
  if (mapCardElement) {
    window.pin.removeActive();
    mapCardElement.remove();
    document.removeEventListener(`keydown`, documentEscapePressHandler);
  }
};

window.card = {
  create: createCard,
  remove: removeCard
};
